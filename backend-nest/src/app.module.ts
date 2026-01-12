import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppLoggerModule } from './common/logger/logger.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';

@Module({
    imports: [AppLoggerModule, UsersModule, PrismaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
