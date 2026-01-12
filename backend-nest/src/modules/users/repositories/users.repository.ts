import { User } from "../entities/user.entity";

export abstract class IUsersRepository {
    abstract save(user: User): Promise<User>;
    abstract findById(id: number): Promise<User>;
    abstract findByEmail(email: string): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract update(user: User): Promise<User>;
    abstract delete(id: number): void;
}