import { Entity, EntityData } from "./Entity";
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { Id } from "../value-objects/Id";
import { Either } from "../types/Either";
import { ValidationError } from "../types/Errors";
import { validateRequired } from "../utils/validations";

interface UserData extends EntityData {
    name: string;
    email: Email;
    password: Password;
}

export class User extends Entity {
    public readonly name: string;
    public readonly email: Email;
    public readonly password: Password;

    constructor(data: UserData) {
        super(data.id);

        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }

    public static create(name: string, email: string, password: string) {
        return this.validateAndCreate(name, email, password);
    }

    private static validateAndCreate(
        name: string,
        email: string,
        password: string
    ): Either<ValidationError<User>[], User> {
        const emailValidation = Email.create(email);
        const passwordValidation = Password.create(password);

        const errors: ValidationError<User>[] = [
            {
                property: "email" as const,
                errors: emailValidation
                    ? emailValidation.fold(
                          errors => errors,
                          () => []
                      )
                    : [],
                value: email,
            },
            {
                property: "password" as const,
                errors: passwordValidation
                    ? passwordValidation.fold(
                          errors => errors,
                          () => []
                      )
                    : [],
                value: email,
            },
            { property: "name" as const, errors: validateRequired(name), value: name },
        ].filter(validation => validation.errors.length > 0);

        if (errors.length === 0) {
            return Either.right(
                new User({
                    id: Id.generateId(),
                    name,
                    email: emailValidation.get(),
                    password: passwordValidation.get(),
                })
            );
        } else {
            return Either.left(errors);
        }
    }
}
