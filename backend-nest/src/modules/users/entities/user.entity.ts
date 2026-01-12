export interface CreateUserProps {
    name: string;
    email: string;
    passwordHash: string;
}

export interface PersistedUserProps extends CreateUserProps {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export class User {
    constructor(
        public readonly id: number | null,
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
            null,
            props.name.trim(),
            props.email.trim().toLowerCase(),
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
        this.email = newEmail.trim().toLowerCase();
        this.touch();
    }

    changePasswordHash(newPasswordHash: string) {
        this.passwordHash = newPasswordHash;
        this.touch()
    }

    private touch() {
        this.updatedAt = new Date();
    }
}