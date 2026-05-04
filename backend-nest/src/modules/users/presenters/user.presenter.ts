import { User } from '../entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export class UserPresenter {
    static toHTTP(user: User): UserResponseDto {
        return {
            id: user.id!,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt!,
        };
    }

    static toHTTPList(users: User[]): UserResponseDto[] {
        return users.map(UserPresenter.toHTTP);
    }
}
