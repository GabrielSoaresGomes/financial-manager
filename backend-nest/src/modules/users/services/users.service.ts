import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { HashService } from "src/common/crypto/hash.service";
import { CreateUserInput } from "../interfaces/create-user-input.interface";
import { User } from "../entities/user.entity";
import {IUsersRepository} from "../repositories/users.repository";
import {UpdateUserInput} from "../interfaces/update-user-input.interface";

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

        if (!userSaved || !userSaved.id) {
            this.logger.error(`[${userEmail}] Falha ao criar usuário`);
            throw new InternalServerErrorException("Falha ao criar usuário");
        }

        this.logger.debug(`[${userEmail}] Usuário criado com sucesso com o ID: ${userSaved.id}`);

        return userSaved;
    }

    async getAllUsers(): Promise<User[]> {
        this.logger.debug(`Iniciando processo de busca de todos os usuários`);
        return this.usersRepository.findAll();
    }

    async getUserById(id: number): Promise<User> {
        this.logger.debug(`[${id}] Iniciando processo de busca de usuário por ID`);
        const user = await this.usersRepository.findById(id);

        if (!user) {
            this.logger.warn(`[${id}] Usuário não encontrado`);
            throw new NotFoundException("Usuário não encontrado");
        }
        this.logger.debug(`[${id}] Usuário encontrado com sucesso`);
        return user;
    }

    async updateUser(data: UpdateUserInput): Promise<User> {
        const {id, ...body} = data;
        this.logger.debug(`[${id}] Iniciando processo de atualização de usuário com o body: ${JSON.stringify(body)}`);
        const user = await this.usersRepository.findById(id);

        if (!user) {
            this.logger.warn(`[${id}] Usuário não encontrado para atualização`);
            throw new NotFoundException("Usuário não encontrado");
        }

        user.passwordHash = await this.hashService.hash(body.password);
        user.name = body.name;

        this.logger.debug(`[${id}] Atualizando usuário no repositório`);
        const updatedUser = await this.usersRepository.update(user);

        if (!updatedUser) {
            this.logger.error(`[${id}] Falha ao atualizar usuário`);
            throw new InternalServerErrorException("Falha ao atualizar usuário");
        }

        this.logger.debug(`[${id}] Usuário atualizado com sucesso`);
        return updatedUser;
    }

    async deleteUserById(id: number): Promise<void> {
        this.logger.debug(`[${id}] Iniciando processo de exclusão de usuário`);
        const user = await this.usersRepository.findById(id);

        if (!user) {
            this.logger.warn(`[${id}] Usuário não encontrado para exclusão`);
            throw new NotFoundException("Usuário não encontrado");
        }

        await this.usersRepository.delete(id);
        this.logger.debug(`[${id}] Usuário excluído com sucesso`);
    }
}