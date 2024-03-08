## Documentation

### Define Requirements

- Need to develop node js an app that offers common functionality for digital agriculture apps.
- Create REST API

### Technogy Stack Selection and Engineering Practice

- Primary
    - Node JS and Expreess JS
    - Typescript
    - Logger
        - Winston
- Testing
    - Jest
- Dtabase
    - PostgreSQL
    - ORM - Sequelize
- Git
    - Github
    - Github Action
- Code Quality and Vulnerability Scan
    - Snyk (Local snyk CLI)
    - Sonarqube (Local sonarlint)

### Database Design
- Entity
    - Enquiry
- Mapping

- ER Diagram

    ![ ER Diagram](./assets/er-diagram.png)

### Design API endpoints

- Organization:
    - An organization is a master entity that has a set of properties. It groups and controls all the resources involved in agriculture, such as crops and seasons.
    - GET `/v1/enquiries` Get a list of all enquiries.
    - POST `/v1/enquiries` Create a new organization.
    - GET `/v1/enquiries/{id}` Get details of a specific organization.
    - PUT `/v1/enquiries/{id}` Update details of a specific organization.
    - DELETE `/v1/enquiries/{id}` Delete a specific organization.

### Develop an API server

- Database
    - Created a Models folder to place the database model, and it is based on sequelize.
    - Extracted config from the .env variable and exported from the `index.ts` file
- Components
    - Components are divided into two parts: `Controller` and `Service`.
    - The service is responsible for communicating with the respective database model.
- Routes
    - Register the controller and its register method for REST endpoints.
- Common Services
    - This service is accountable for performing common operations between multiple database models.
    - We can inject this into the component service and access its method in the controller from the component service.
- Unit Test Cases
    - Created unit test cases using Jest with 90+ code coverage.
    - Tried to cover positive and negative scenerio
    - Code Coverage Report
    - Sonar Cloud Scan [nodejs-assessment](https://sonarcloud.io/project/configuration/GitHubActions?id=santoshshinde2012_node-ts-sequelize-pg-boilerplate)
      ![ Sonar Cloud Scan Report](./assets/sonar.png)
