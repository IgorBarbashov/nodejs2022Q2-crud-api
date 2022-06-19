# RS School - NodeJS Course - 2022 Q2

## CRUD API

### About
CRUD API using in-memory database underneath on pure Node.js
- [Task page - CRUD API](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## How to install
- Install Node.js 16 LTS
- Clone this repository
- Switch to **develop** branch
- Install dependencies by command `npm i`

## How to use and run tests
- Command string for start HTTP server:
  - in development mode: `npm run start:dev`
  - in production mode: `npm run start:prod`
- HTTP server will start on the port defined in the `.env` file as variable `PORT`
- Command string for tests:
  - run tests: `npm run test`
  - run tests in watch mode: `npm run test:watch`

## Supported routes and HTTP-methods
API path `api/users`:
- **GET** `api/users` or `api/users/${userId}` should return all users or user with corresponding userId
- **POST** `api/users` is used to create record about new user and store it in database
- **PUT** `api/users/${userId}` is used to update record about existing user
- **DELETE** `api/users/${userId}` is used to delete record about existing user from database

## Entity interface
Users are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side
- `name` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

## Developer environment and instruments
- Node 16.13.0
- Npm 8.1.0
- Webpack 5.64.4
- Jest 27.3.1
- Supertest 6.1.6
- ESLint 8.3.0