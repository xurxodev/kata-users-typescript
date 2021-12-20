import { User } from "../entities/User";
import { Either } from "../types/Either";
import { Email } from "../value-objects/Email";

export type UnexpectedError = {
    kind: "UnexpectedError";
    error: Error;
};

export type DuplicateResourceError = {
    kind: "DuplicateResourceError";
    message: string;
};

export type ResourceNotFoundError = {
    kind: "ResourceNotFound";
    message: string;
};

export interface UserRepository {
    getGetByEmail(email: Email): Promise<Either<UnexpectedError | ResourceNotFoundError, User>>;
    getUsers(): Promise<Either<UnexpectedError, User[]>>;
    save(user: User): Promise<Either<UnexpectedError | DuplicateResourceError, void>>;
}
