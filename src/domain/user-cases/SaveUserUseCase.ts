import { User } from "../entities/User";
import {
    UserRepository,
    DuplicateResourceError,
    UnexpectedError,
} from "../repositories/UserRepository";
import { Either } from "../types/Either";

export class SaveUserUserCase {
    constructor(private userRepository: UserRepository) {}

    async execute(user: User): Promise<Either<UnexpectedError | DuplicateResourceError, void>> {
        const userResult = await this.userRepository.getGetByEmail(user.email);

        return userResult.fold(
            error => {
                switch (error.kind) {
                    case "UnexpectedError": {
                        Either.left(error);
                    }
                    case "ResourceNotFound": {
                        return this.userRepository.save(user);
                    }
                }
            },
            async () => {
                return Either.left({
                    kind: "DuplicateResourceError",
                    message: `There is already a user with email ${user.email.value}`,
                });
            }
        );
    }
}
