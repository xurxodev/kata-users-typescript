# Kata users written in TypeScript ![CI](https://github.com/xurxodev/kata-users-typescript/actions/workflows/main.yml/badge.svg)

- We are here to practice Clean Architecture Development.
- Clean Architecture is a way of structuring code.
- We are going to practice pair programming.

---

## Product requirements - Users App

- I want to be able to list my users.
- I want to be able to add users.
- The user must to contain name, email and password as mandatory
- The email must to be a valid email
- The password must to be minimum eight characters, at least one letter and one number
- The app should show an error if we try add two users with the same email.
- Two different email instances but with the same properties should be equal in a comparison
- Two different email instances but with the same properties should be equal in a comparison
- Two different user instances but with the same id should be equal in a comparison

---

## Development platform

 - UI will be the command line.
 - All data is local.
 - The data origin will change in the future to consume a remote API.
 - There is no persistence between execution.
 - The dependencies in testing will be replaced by manual fake dependencies without to use any library
 - The business rules must to be validate it using tests
 - Define entities, value objects and use cases
 - Use MVP in the presentation layer

---

## Setup

```
$ yarn install
```

## Development

Start app:

```
$ yarn start
```

## Tests

Run unit tests:

```
$ yarn test
```

## Resources


# License

Copyright 2022 Jorge Sánchez Fernández

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
