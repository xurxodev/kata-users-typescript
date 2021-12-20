import { User } from "../entities/User";
import { UserRepository, UnexpectedError } from "../repositories/UserRepository";
import { Either } from "../types/Either";

export class GetUsersUserCase {
    constructor(private userRepository: UserRepository) {}

    execute(): Promise<Either<UnexpectedError, User[]>> {
        return this.userRepository.getUsers();
    }
}
