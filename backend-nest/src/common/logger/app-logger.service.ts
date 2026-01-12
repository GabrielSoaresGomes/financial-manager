import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLoggerService extends ConsoleLogger implements LoggerService {
  constructor() {
    super();
  }

  override log(message: any, context?: string) {
    super.log(message, context);
  }

  override error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
  }

  override warn(message: any, context?: string) {
    super.warn(message, context);
  }

  override debug(message: any, context?: string) {
    super.debug?.(message, context);
  }

  override verbose(message: any, context?: string) {
    super.verbose?.(message, context);
  }
}
