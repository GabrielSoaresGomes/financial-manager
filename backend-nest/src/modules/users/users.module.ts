import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { CryptoModule } from "src/common/crypto/crypto.module";
import { UsersService } from "./services/users.service";
import {IUsersRepository} from "./repositories/users.repository";
import {PrismaUsersRepository} from "./repositories/prisma-users.repository";

@Module({
    imports: [CryptoModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: IUsersRepository,
            useClass: PrismaUsersRepository
        }
    ]
})
export class UsersModule {}