import { Injectable, Logger } from "@nestjs/common";
import { HashService } from "src/common/crypto/hash.service";
import { CreateUserInput } from "../interfaces/create-user-input.interface";
import { User } from "../entities/user.entity";
import {IUsersRepository} from "../repositories/users.repository";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor (
        private readonly usersRepository: IUsersRepository,
        private readonly hashService: HashService
    ) {}

    async createUser(body: CreateUserInput): Promise<User> {
        const safeBody = {
            ...body,
            password: '***MASKED***',
        };
        const userEmail = body.email;
        try {
            this.logger.debug(`[${userEmail}] Iniciando processo de criação de usuário com o body: ${JSON.stringify(safeBody)}`);

            this.logger.debug(`[${userEmail}] Criptografando senha do usuário`);
            const passwordHash = await this.hashService.hash(body.password);
            this.logger.debug(`[${userEmail}] Hash da senha gerado, criando entidade User`);
            const user = User.createNew({
                name: body.name,
                email: body.email,
                passwordHash
            });
            this.logger.debug(`[${userEmail}] Entidade criada com sucesso, persistindo dado`);
            const userSaved: User = await this.usersRepository.save(user);
            this.logger.debug(`[${userEmail}] Usuário criado com sucesso com o ID: ${userSaved.id}`);

            return userSaved;
        } catch (error) {
            this.logger.error(`[${userEmail}] Falha ao criar um usuário com o body: ${JSON.stringify(safeBody)}`, error.stack);
            throw error;
        }
    }
}