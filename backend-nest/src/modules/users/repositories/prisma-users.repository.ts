import { User } from "../entities/user.entity";
import { IUsersRepository } from "./users.repository";
import {PrismaService} from "../../../infra/database/prisma/prisma.service";
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async save(user: User): Promise<User> {
        const record = await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash
            }
        });

        return User.fromPersistence(record);
    }

    async findById(id: number): Promise<User | null> {
        const record = await this.prisma.user.findFirst({
            where: { id, deletedAt: null },
        });

        if (!record) {
            return null;
        }

        return User.fromPersistence(record);
    }

    async findByEmail(email: string): Promise<User | null> {
        const record = await this.prisma.user.findFirst({
            where: { email, deletedAt: null },
        });

        if (!record) {
            return null;
        }

        return User.fromPersistence(record);
    }

    async findAll(): Promise<User[]> {
        const records = await this.prisma.user.findMany({
            where: { deletedAt: null }
        });

        if (records.length === 0) {
            return [];
        }

        return records.map((record) => User.fromPersistence(record));
    }

    async update(user: User): Promise<User | null> {
        if (user.id === null) {
            return null;
        }
        const record = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                deletedAt: user.deletedAt,
            }
        });
        return User.fromPersistence(record);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
}