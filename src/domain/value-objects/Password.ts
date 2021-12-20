import { ValueObject } from "./ValueObject";
import { Either } from "../types/Either";
import { ValidationErrorKey } from "../types/Errors";
import { validateRegexp, validateRequired } from "../utils/validations";

export interface PasswordProps {
    value: string;
}

//Minimum eight characters, at least one letter and one number
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export class Password extends ValueObject<PasswordProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: PasswordProps) {
        super(props);
    }

    public static create(password: string): Either<ValidationErrorKey[], Password> {
        const requiredError = validateRequired(password);
        const regexpErrors = validateRegexp(password, PASSWORD_PATTERN);

        if (requiredError.length > 0) {
            return Either.left(requiredError);
        } else if (regexpErrors.length > 0) {
            return Either.left(regexpErrors);
        } else {
            return Either.right(new Password({ value: password }));
        }
    }
}
