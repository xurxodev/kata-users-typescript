import { UserInMemoryRepository } from "./data/UserInMemoryRepository";
import { GetUsersUserCase } from "./domain/user-cases/GetUsersUserCase";
import { SaveUserUserCase } from "./domain/user-cases/SaveUserUseCase";
import { UsersPresenter, UsersView } from "./presentation/UsersPresenter";

function getUsersPresenter(view: UsersView) {
    const userRepository = new UserInMemoryRepository();
    const getUsers = new GetUsersUserCase(userRepository);
    const saveUser = new SaveUserUserCase(userRepository);

    return new UsersPresenter(view, getUsers, saveUser);
}

export const serviceLocator = {
    getUsersPresenter,
};
