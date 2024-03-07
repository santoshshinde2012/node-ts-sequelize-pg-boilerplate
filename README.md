# Node JS Assessment

## Pre requisite 

- To run this app on local machine, make sure the PostgreSQL database is set up and running. If not, you can use Docker and run the following command to run the database:
    `npm run db:up`

## Core NPM Module

- [x] `express`, `@types/express`
- [x] `@types/node`
- [x] `typescript`
- [x] `dotenv`
- [x] `cors`
- [x] `sequelize mysql2`
- [x] `helmet`
- [x] `http-status-codes`
- [x] `winston`, `@types/winston`
- [x] `sequelize`, `pg`, `pg-hstore`

## Start The application in Development Mode

- Clone the Application `git clone https://github.com/santoshshinde2012/node-boilerplate.git`
- Install the dependencies `npm install`
- Start the application `npm run dev`
- To run the test cases `npm run test`

## Start The application in Production Mode

- Install the dependencies `npm install`
- Create the build `npm run build`
- Start the application `npm run start`
- Before starting make sure to update your `.env` values for your refrence just check `.env.example`


## Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **docker/**                       | Docker related config for postgresql db     |
| **wiki/**                         | You can add project documentation and insructions file here |
| **src/**                          | Source files |
| **src/abstractions**              | Abstarct classes and Interfaces  |
| **src/components**                | REST API Components & Controllers  |
| **src/database**                  | Database config and models  |
| **src/lib**                       | Reusable utilises and library source code like a logger|
| **src/middleware/**               | Express Middlewares like error handler feature |
| **build/**                        | Compiled source files will be placed here |
| **tests/**                        | Test cases will be placed here |
| **tests/helpers/**                | Helpers for test cases will be placed here  |
| **tests/unit-tests/**             | Unit Test cases will be placed here  |
| **tests/integration-tests/**      | API routes (Integration) Test cases will be placed here|

## Postman Collections

The [Postman Collections](wiki/postman/assessment.postman_collection.json) is available in wiki/postman folder.

## Swagger API Documentation

The swagger documentation is available at the following url `${host}/docs`:  

[http://localhost:8080/docs](http://localhost:8080/docs)

