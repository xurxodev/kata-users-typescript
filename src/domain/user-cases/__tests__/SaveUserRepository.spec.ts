import { Either } from "../../types/Either";
import { SaveUserUserCase } from "../SaveUserUseCase";
import { User } from "../../entities/User";

const users = [
    User.create("Jorge Sánchez Fernández", "xurxodev@gmail.com", "12345678A").get(),
    User.create("David Sánchez Fernández", "nonexisted@gmail.com", "12345678B").get(),
];

describe("SaveUserRepository", () => {
    it("should save successfully a new valid user", async () => {
        const useCase = givenThereAreNoUsers();

        const result = await useCase.execute(users[0]);

        expect(result.isRight()).toEqual(true);
    });
    it("should return an duplicate resource error", async () => {
        const useCase = givenThereAreUsers();

        const result = await useCase.execute(
            User.create("test", users[0].email.value, "12345678A").get()
        );

        result.fold(
            error => {
                expect(error.kind).toEqual("DuplicateResourceError");
            },
            () => fail("Should be fail")
        );
    });
});

function givenThereAreNoUsers(): SaveUserUserCase {
    return new SaveUserUserCase({
        getUsers: () => Promise.resolve(Either.right([])),
        save: () => Promise.resolve(Either.right(undefined)),
        getGetByEmail: () =>
            Promise.resolve(
                Either.left({
                    kind: "ResourceNotFound",
                    message: "User not found",
                })
            ),
    });
}

function givenThereAreUsers(): SaveUserUserCase {
    return new SaveUserUserCase({
        getUsers: () => Promise.resolve(Either.right(users)),
        save: () => Promise.resolve(Either.right(undefined)),
        getGetByEmail: () => Promise.resolve(Either.right(users[0])),
    });
}
