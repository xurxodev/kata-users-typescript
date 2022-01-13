import * as readline from "readline";
import { User } from "../domain/entities/User";
import { serviceLocator } from "../serviceLocator";
import { UsersView } from "./UsersPresenter";

export class UsersTerminalView implements UsersView {
    private presenter = serviceLocator.getUsersPresenter(this);

    constructor(private rl: readline.Interface) {}

    async show() {
        await this.presenter.onInitialize();
        this.presenter.onAddUserOptionSelected();

        this.rl.addListener("close", () => this.presenter.onStop());
    }

    showError(message: string): void {
        console.log("Ups, something went wrong :(");
        console.log(message);
        console.log("Try again!");
    }
    showEmptyCase(): void {
        console.log("Users is empty! :(");
    }
    showUsers(users: User[]): void {
        console.log("Users!:");
        users.forEach(user => {
            console.log(`${user.name} - ${user.email.value}`);
        });
    }

    requestUsername(): Promise<string> {
        return new Promise((resolve, _) => {
            this.rl.question("Creating new user.\nName? ", answer => resolve(answer));
        });
    }
    requestEmail(): Promise<string> {
        return new Promise((resolve, _) => {
            this.rl.question("Email? ", answer => resolve(answer));
        });
    }
    requestPassword(): Promise<string> {
        return new Promise((resolve, _) => {
            this.rl.question("Password? ", answer => resolve(answer));
        });
    }

    showWelcomeMessage() {
        console.clear();
        console.log("Welcome to your users kata typescript :)");
    }

    showGoodbyeMessage() {
        console.log("\nSee you soon!");
    }
}
