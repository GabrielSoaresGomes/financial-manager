import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AppLoggerModule } from './common/logger/logger.module';
import {PrismaService} from "./infra/database/prisma/prisma.service";

@Module({
  imports: [AppLoggerModule, UsersModule, PrismaService],
  controllers: [],
  providers: [],
})
export class AppModule {}
