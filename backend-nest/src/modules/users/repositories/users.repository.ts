import { User } from "../entities/user.entity";

export abstract class IUsersRepository {
    abstract save(user: User): Promise<User>;
    abstract findById(id: number): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findAll(): Promise<User[]>;
    abstract update(user: User): Promise<User | null>;
    abstract delete(id: number): void;
}