import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            this.logger.error(
                `Prisma error code=${exception.code} meta=${JSON.stringify(exception.meta)}`
            );
        }

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const isHttpException = exception instanceof HttpException;

        const status = isHttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse = isHttpException
            ? exception.getResponse()
            : {
                  statusCode: status,
                  message: 'Internal server error',
              };

        // Log com contexto (sem vazar dados sensíveis)
        const safeBody = this.sanitizeBody(request.body);

        const message =
            typeof errorResponse === 'string'
                ? errorResponse
                : ((errorResponse as any).message ?? 'Error');

        const stack = exception instanceof Error ? exception.stack : undefined;

        this.logger.error(
            `[${request.method}] ${request.url} | status=${status} | message=${JSON.stringify(message)} | body=${JSON.stringify(
                safeBody,
            )}`,
            stack,
        );

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: isHttpException
                ? (errorResponse as any).error
                : 'Internal Server Error',
            message: (errorResponse as any).message ?? 'Internal server error',
        });
    }

    private sanitizeBody(body: any): any {
        if (!body || typeof body !== 'object') return body;

        const copy = { ...body };
        if ('password' in copy) copy.password = '[REDACTED]';
        if ('passwordHash' in copy) copy.passwordHash = '[REDACTED]';

        return copy;
    }
}
