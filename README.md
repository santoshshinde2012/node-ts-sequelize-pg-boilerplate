# [Node-TS-Sequelize-pg-Boilerplate](https://blog.santoshshinde.com/skeleton-for-node-js-apps-written-in-typescript-444fa1695b30)  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=santoshshinde2012_node-ts-sequelize-pg-boilerplate&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=santoshshinde2012_node-ts-sequelize-pg-boilerplate)![Github action workflow status](https://github.com/santoshshinde2012/node-ts-sequelize-pg-boilerplate/actions/workflows/node.js.yml/badge.svg?branch=main)![CodeQL](https://github.com/santoshshinde2012/node-ts-sequelize-pg-boilerplate/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)![njsscan Analysis](https://github.com/santoshshinde2012/node-ts-sequelize-pg-boilerplate/actions/workflows/njsscan.yml/badge.svg?branch=main)

Skeleton for Node.js applications written in TypeScript with Sequelize ORM

![Introductions](https://i.ibb.co/3d1rL0n/nodejs-1.png)

## Core NPM Module

- [x] `express`, `@types/express`
- [x] `@types/node`
- [x] `typescript`
- [x] `dotenv`
- [x] `cors`
- [x] `helmet`
- [x] `http-status-codes`
- [x] `winston`, `@types/winston`
- [x] `sequelize`, `pg`, `pg-hstore`

## Start The application in Development Mode

- Clone the Application `git clone https://github.com/santoshshinde2012/node-ts-sequelize-pg-boilerplate.git`
- Install the dependencies `npm install`
- Start the application `npm run dev`
- To run the test cases `npm run test`

### Pre requisite 

- To run this app on a local machine, make sure the PostgreSQL database is set up and running. If not, you can use Docker and execute the following command to run the database:
    `npm run db:up`

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


## Refrences 
- [Skeleton for Node.js Apps written in TypeScript (with Setup Instructions for ESLint, Prettier, and Husky)](https://blog.santoshshinde.com/skeleton-for-node-js-apps-written-in-typescript-444fa1695b30)
- [Global Error and Response Handler in Node JS with Express and Typescript](https://blog.santoshshinde.com/global-error-and-response-handler-in-node-js-with-express-and-typescript-913ec06d74b3)
- [Testing with Jest in TypeScript and Node.js for Beginners](https://blog.santoshshinde.com/beginners-guide-to-testing-jest-with-node-typescript-1f46a1b87dad)
- [Static Code Analysis for Node.js and TypeScript Project using SonarQube](https://blog.santoshshinde.com/static-code-analysis-for-node-js-and-typescript-project-using-sonarqube-8f90799add06)
- [Visualization of Node.js Event Emitter](https://blog.santoshshinde.com/visualization-of-node-js-event-emitter-4f7c9fe3a477)

<hr/>

### Connect with me on
<div id="badges">
  <a href="https://twitter.com/shindesan2012">
    <img src="https://img.shields.io/badge/shindesan2012-black?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter Badge"/>
  </a>
  <a href="https://www.linkedin.com/in/shindesantosh/">
    <img src="https://img.shields.io/badge/shindesantosh-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
   <a href="https://blog.santoshshinde.com/">
    <img src="https://img.shields.io/badge/Blog-black?style=for-the-badge&logo=medium&logoColor=white" alt="Medium Badge"/>
  </a>
</div>