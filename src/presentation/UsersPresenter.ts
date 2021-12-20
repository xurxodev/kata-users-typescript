import { User } from "../domain/entities/User";
import { DuplicateResourceError } from "../domain/repositories/UserRepository";
import { validationErrorMessages } from "../domain/types/Errors";
import { GetUsersUserCase } from "../domain/user-cases/GetUsersUserCase";
import { SaveUserUserCase } from "../domain/user-cases/SaveUserUseCase";

export interface UsersView {
    showError(message: string): void;

    showEmptyCase(): void;

    showWelcomeMessage(): void;

    showGoodbyeMessage(): void;

    showUsers(users: User[]): void;

    requestUsername(): Promise<string>;

    requestEmail(): Promise<string>;

    requestPassword(): Promise<string>;
}

export class UsersPresenter {
    constructor(
        private view: UsersView,
        private getUsersUserCase: GetUsersUserCase,
        private saveUserUserCase: SaveUserUserCase
    ) {}

    async onInitialize() {
        this.view.showWelcomeMessage();
        await this.loadUsersListAndRequestNew();
    }

    onStop() {
        this.view.showGoodbyeMessage();
    }

    async onAddUserOptionSelected() {
        const name = await this.view.requestUsername();
        const email = await this.view.requestEmail();
        const passwword = await this.view.requestPassword();

        const userValidation = User.create(name, email, passwword);

        userValidation.fold(
            errors =>
                this.showErrorAndShowListAndRequestNew(
                    errors
                        .map(error =>
                            error.errors.map(err =>
                                validationErrorMessages[err](error.property as string)
                            )
                        )
                        .flat()
                        .join("\n")
                ),
            user => this.saveUser(user)
        );
    }

    async saveUser(user: User) {
        const saveResult = await this.saveUserUserCase.execute(user);

        saveResult.fold(
            failure => {
                switch (failure.kind) {
                    case "UnexpectedError": {
                        this.showErrorAndShowListAndRequestNew(failure.error.message);
                    }
                    case "DuplicateResourceError": {
                        this.showErrorAndShowListAndRequestNew(
                            (failure as DuplicateResourceError).message
                        );
                    }
                }
            },
            () => {
                this.loadUsersListAndRequestNew();
            }
        );
    }

    private async showErrorAndShowListAndRequestNew(message: string) {
        this.view.showError(message);
        this.loadUsersListAndRequestNew();
    }

    private async loadUsersListAndRequestNew() {
        const result = await this.getUsersUserCase.execute();

        result.fold(
            error => this.view.showError(error.error.message),
            users => {
                if (users.length === 0) {
                    this.view.showEmptyCase();
                } else {
                    this.view.showUsers(users);
                }
            }
        );

        this.onAddUserOptionSelected();
    }
}
