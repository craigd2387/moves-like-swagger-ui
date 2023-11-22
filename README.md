
# moves-like-swagger-ui

  

This is designed to provide an online job application that serves both Kainos employees and recruitment admin to retrieve and update job roles and their relevant information. This serves as the user interface component.

  

## Table of Contents

  

- [Section 1](#section-1) - Application Setup

- [Section 2](#section-2) - Testing

- [Section 3](#section-3) - Linting

  

## Section 1 - Application Setup

  

This application provides a frontend for the REST API in the following repository: https://github.com/eoinmcbennett/moves-like-swagger-api

  ---

#### Running the REST API

1. Complete the steps in the following link to run the REST API: https://github.com/eoinmcbennett/moves-like-swagger-api
---

  

#### Setting environment variables
Follow the steps below to set the necessary environment variables for this project:
1.  Create a `.env` file in the root directory of the project and add the following lines:

  API_URL="http://localhost:8080"
  UI_URL="http://localhost:3000"
  CACHE_SECRET={INSERT YOUR SECRET HERE}

---

  

#### How to start the moves-like-swagger-ui application


  

1. Run `npm install` to build your application

2. Start application with `npm start`

3. To check that your application is running enter url `http://localhost:3000`

  

## Section 2 - Testing

  

In this section, we outline the methods for testing the moves-like-swagger-ui application.

  

### Test Commands

 `npm run test` -> Run unit tests
 `npm run test-pa11y` -> Run accessibility tests
 `npm run test-ui` -> Run UI tests

**Any new routes which are added to the project must also be added to the `.pa11yci` file to allow accessibility testing.**

---

## Section 3 - Linting

  

This project uses ESLINT to enforce coding standards set out in the AirBNB typescript ruleset. The `eslintrc.json` file contains the linter configuration settings. 

The following commands can be used to run the linter:

  

### Linter Commands

 `npm run lint` -> Run the linter and identify any violations
 `npm run lint-fix` -> Run the linter and fix any violations

---