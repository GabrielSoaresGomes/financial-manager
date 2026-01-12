export interface CreateUserProps {
    name: string;
    email: string;
    passwordHash: string;
}

export interface PersistedUserProps extends CreateUserProps {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

export class User {
    constructor(
        public readonly id: number,
        public name: string,
        public email: string,
        public passwordHash: string,
        public readonly createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date | null = null
    ) {
    }

    static createNew(props: CreateUserProps): User {
        const now = new Date();
        return new User(
            0,
            props.name,
            props.email,
            props.passwordHash,
            now,
            now,
            null
        );
    }

    static fromPersistence(props: PersistedUserProps): User {
        return new User(
            props.id,
            props.name,
            props.email,
            props.passwordHash,
            props.createdAt,
            props.updatedAt,
            props.deletedAt ?? null,
        );
    }

    markAsDeleted() {
        this.deletedAt = new Date();
    }

    changeName(newName: string) {
        this.name = newName.trim();
        this.touch();
    }

    changeEmail(newEmail: string) {
        this.email = newEmail.toLowerCase();
        this.touch();
    }

    changePasswordHash(newPasswordHash: string) {
        this.passwordHash = newPasswordHash.trim();
        this.touch()
    }

    private touch() {
        this.updatedAt = new Date();
    }
}