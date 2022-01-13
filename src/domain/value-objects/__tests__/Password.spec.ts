import { Password } from "../Password";

describe("Password", () => {
    it("should return success reponse if value argument is valid", () => {
        const passwordValue = "12345678A";
        const passwordResult = Password.create(passwordValue);

        passwordResult.fold(
            error => fail(error),
            email => expect(email.value).toEqual(passwordValue)
        );
    });

    it("should return InvalidEmptyPassword error if value argument is empty", () => {
        const passwordResult = Password.create("");

        passwordResult.fold(
            errors => {
                expect(errors.length).toBe(1);
                expect(errors[0]).toBe("field_cannot_be_blank");
            },
            () => fail("should be fail")
        );
    });

    it("should be equals two instances of password if it has the same property values", () => {
        const password1 = Password.create("12345678A").get();
        const password2 = Password.create("12345678A").get();

        expect(password1).toEqual(password2);
    });

    it("should not be equals two instances of email if it has the same property values", () => {
        const password1 = Password.create("12345678A").get();
        const password2 = Password.create("87654321A").get();

        expect(password1).not.toEqual(password2);
    });
});
