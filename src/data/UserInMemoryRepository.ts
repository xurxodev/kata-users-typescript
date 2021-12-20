import { User } from "../domain/entities/User";
import {
    DuplicateResourceError,
    ResourceNotFoundError,
    UnexpectedError,
    UserRepository,
} from "../domain/repositories/UserRepository";
import { Either } from "../domain/types/Either";
import { Email } from "../domain/value-objects/Email";

export class UserInMemoryRepository implements UserRepository {
    private users: User[] = [];

    getGetByEmail(email: Email): Promise<Either<UnexpectedError | ResourceNotFoundError, User>> {
        const user = this.users.find(u => u.email.equals(email));

        if (!user) {
            return Promise.resolve(
                Either.left({ kind: "ResourceNotFound", message: `User by email ${email.value}` })
            );
        } else {
            return Promise.resolve(Either.right(user));
        }
    }
    getUsers(): Promise<Either<UnexpectedError, User[]>> {
        return Promise.resolve(Either.right(this.users));
    }
    save(user: User): Promise<Either<UnexpectedError | DuplicateResourceError, void>> {
        this.users.push(user);
        return Promise.resolve(Either.right(undefined));
    }
}
