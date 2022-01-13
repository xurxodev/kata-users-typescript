import { notDeepEqual } from "assert";
import { Email } from "../Email";

describe("Email", () => {
    it("should return success reponse if email is valid", () => {
        const emailValue = "info@karatestarsapp.com";
        const emailResult = Email.create(emailValue);

        emailResult.fold(
            error => fail(error),
            email => expect(email.value).toEqual(emailValue)
        );
    });

    it("should return email cannot be blank error if value argument is empty", () => {
        const emailResult = Email.create("");

        emailResult.fold(
            errors => {
                expect(errors.length).toBe(1);
                expect(errors[0]).toBe("field_cannot_be_blank");
            },
            () => fail("should be fail")
        );
    });

    it("should return invalid email error if value argument is invalid", () => {
        const emailResult = Email.create("infokaratestarsapp.com");

        emailResult.fold(
            errors => {
                expect(errors.length).toBe(1);
                expect(errors[0]).toBe("invalid_field");
            },
            () => fail("should be fail")
        );
    });

    it("should be equals two instances of email if it has the same property values", () => {
        const email1 = Email.create("info@karatestarsapp.com").get();
        const email2 = Email.create("info@karatestarsapp.com").get();

        expect(email1.equals(email2)).toBe(true);
    });

    it("should not be equals two instances of email if it has the same property values", () => {
        const email1 = Email.create("info@karatestarsapp.com").get();
        const email2 = Email.create("hello@karatestarsapp.com").get();

        expect(email1.equals(email2)).toBe(false);
    });
});
