import { User } from "../User";

describe("User", () => {
    describe("create validations", () => {
        it("should not return errors if all fields are valid", () => {
            const result = User.create(
                "Jorge Sanchéz Fernández",
                "xurxodev@gmail.com",
                "12345678A"
            );

            result.fold(
                () => fail("should be success"),
                feed => expect(feed).toBeTruthy()
            );
        });
        it("should return invalid field error for empty name", () => {
            const result = User.create("", "xurxodev@gmail.com", "12345678A");

            result.fold(
                errors =>
                    expect(errors.find(error => error.property === "name")?.errors[0]).toBe(
                        "field_cannot_be_blank"
                    ),
                () => fail("should be error")
            );
        });
        it("should return cannot be blank error for empty email", () => {
            const result = User.create("Jorge Sanchéz Fernández", "", "12345678A");

            result.fold(
                errors =>
                    expect(errors.find(error => error.property === "email")?.errors[0]).toBe(
                        "field_cannot_be_blank"
                    ),
                () => fail("should be error")
            );
        });
        it("should return cannot be blank error for empty password", () => {
            const result = User.create("Jorge Sanchéz Fernández", "xurxodev@gmail.com", "");

            result.fold(
                errors =>
                    expect(errors.find(error => error.property === "password")?.errors[0]).toBe(
                        "field_cannot_be_blank"
                    ),
                () => fail("should be error")
            );
        });
        it("should return invalid error for non valid email", () => {
            const result = User.create("Jorge Sanchéz Fernández", "xurxodevgmail", "12345678A");

            result.fold(
                errors =>
                    expect(errors.find(error => error.property === "email")?.errors[0]).toBe(
                        "invalid_field"
                    ),
                () => fail("should be error")
            );
        });
        it("should return invalid error for non valid password", () => {
            const result = User.create("Jorge Sanchéz Fernández", "xurxodevgmail", "1234");

            result.fold(
                errors =>
                    expect(errors.find(error => error.property === "email")?.errors[0]).toBe(
                        "invalid_field"
                    ),
                () => fail("should be error")
            );
        });
    });
});
