# Tocos Take Home Task

## API Documentation
### **OverView**
  The Tocos Take Home Task API provides REST API endpoints for simple actions for a users and transactions collection. This document provides an overview of the available endpoints and their functionality
### **Base Url**
    http://localhost:8000/api/v1
### **Responses**
  All responses are returned in the JSON format - `application/json`.
### **Endpoints**
  - `GET /users`

    Get all users information.  

    **Response**

      Code: `200` Returns an array of users with all details

        {
          "message": "Success",
          "result": [
            {
              "id": "64950150ec01a410b209df69",
              "balance": 100
            },
            {
              "id": "6495010aec01a410b209df65",
              "balance": 200
            }
          ]
        }

  - `GET /users/:id`

    Get a single user by userId

    **Response**

      Code `200`: Returns a correspondent user information

        {
          "message": "Success",
          "result": {
            "id": "64950150ec01a410b209df69",
            "balance": 100
          }
        }

      Code `404`: User not found

        {
          "message": "User not found"
        }

  - `POST /users`

    Create a new user

    **Request**

      |      Field      |       Type      |    Validation   |     Comment     |
      |-----------------|-----------------|-----------------|-----------------|
      | balance         | number          |                 | required        |

        {
          "balance": 100
        }
    
    **Response**

      Code `200`: A new user create success and returns created user information

          {
            "message": "Success",
            "result": {
              "balance": 100,
              "id": "649507877fb6569a867a930e"
            }
          }

      Code `400`: Bad request error and returns reason
        
        {
          "message": [
            "Balance is required"
          ]
        }

  - `GET /transactions`

    Get all transactions information.  

    **Response**

      Code: `200` Returns an array of transactions with all details

        {
          "message": "Success",
          "result": [
            {
                "senderId": "65114f144c2e38b75e5c6a40",
                "receiverId": "65114eed4c2e38b75e5c6a11",
                "amount": 100,
                "id": "65114f1d4c2e38b75e5c6a47"
            },
            {
                "senderId": "65114f144c2e38b75e5c6a40",
                "receiverId": "65114eed4c2e38b75e5c6a11",
                "amount": 100,
                "id": "65114f2b4c2e38b75e5c6a4e"
            }
          ]
        }

  - `POST /transactions`

    Create a new transaction.

    **Request**

      |      Field      |       Type      |            Validation           |     Comment     |
      |-----------------|-----------------|---------------------------------|-----------------|
      | senderId        | string          |          shoule be exist        |    required     |
      | receiverId      | string          |          shoule be exist        |    required     |
      | amount          | number          | sender should has enough amount |    required     |

        {
          "senderId": "65114f144c2e38b75e5c6a40",
          "receiverId": "65114eed4c2e38b75e5c6a11",
          "amount": 100
        }
    
    **Response**

      Code `200`: A new user create success and returns created user information

          {
            "message": "Success",
            "result": {
              "id": "649507877fb6569a867a930e",
              "senderId": "65114f144c2e38b75e5c6a40",
              "receiverId": "65114eed4c2e38b75e5c6a11",
              "amount": 100
            }
          }

      Code `400`: Bad request error and returns reason
        
        {
          "message": [
            "Sender is not exist!"
          ]
        }

      Errors Messages
      - "SenderId is required"
      - "ReceiverId is required"
      - "Amount is required"
      - "Sender is not exist!"
      - "Receiver is not exist!"
      -  "SenderId and ReceiverId should not be the same!"
      -  "Amount should not be less than 0!"
      -  "Sender has not enough balance!"

## Run the project

  ### Start Backend

    cd backend
    docker-compose up --build

  ### Start Frontend
  
    cd frontend
    docker-compose up --build

## Development

  ### Clone the repo

    git clone https://github.com/superstar0106/.git
    cd 

  ### Backend

    cd backend

  Make sure run MongoDB server on your local

  Environment Variables

    copy .env.example .env && ren .env.example .env

  Replace `CONNECTION_URI` in `.env` with your local MonogoDB Server Uri.

    npm install
    npm start

  ### Frontend

    cd frontend

  Environment Variables

    copy .env.example .env && ren .env.example .env

  Please make sure you have the right server Uri in your `.env` file

  Start frontend

    npm install
    npm start

## Technical Documentation

  ### Backend
  ### **Technologies**
  - TypeScript
  - Node.js
  - Express
  - MongoDB

  ### **Infrastructure**
    |- src
      |- config
      |- consts
      |- controllers                  // endpoint handlers
        |- users                      // users endpoint handlers
          |- getUsers                 // handler for getting all users
          |- getUser                  // handler for getting a single user
          |- createUser               // handler for creating a new user
        |- transactions
          |- getTransactions          // handler for getting all transactions
          |- createTransaction        // handler for creating a new transaction
      |- errors                       // customize errors
      |- middlewares
        |- errorHandlerMiddleware     // a middleware to handle errors
      |- models
        |- userModel                  // userSchema for DB
        |- transactionModel           // transactionSchema for DB
      |- routes                       // endpoint routes
        |- userRouter                 // routes for user endpoints
        |- transactionRouter          // routes for transaction endpoints
      |- services                     // the service directly interacts with DB
        |- userService                // userService contains proper actions for user collection
        |- transactionService         // transactionService contains proper actions for transaction collection
      |- setup
        |- backendSetup               // run backend server
        |- databaseSetup              // connect database
      |- types
      |- utils
    |- tests
      |- transactions                 // all tests related transactions
      |- users                        // alltests related users

  ### Technical Approaches

  ### Implemented routers, controllers, services to handle each of endpoints

  Router uses router middleware provided from `express`. It specifies the url of individual endpoints and call a controller as callback.
  
  
  Controller is a API handler which takes `request` and `response` as params. It validates the endpoint and calls a service function to perform one of CURD operations with DB. 
  
  Finally it returns the response.
  Service is a functions that directly access to the DB and handles simple operations with DB like CRUD.

  ### Used `express-validator` for simple validations

  In the project's approah, it uses `express-validator` to validate simple inputs for the endpoints.

  ### Implemented a robust error handling approach
  Used a Error-handling Middleware: This middleware is used to handle errors in the application and is defined like any other middleware, except it takes an additional argument to handle errors. `src/middlewares/errorHandler.middleware.ts`.
  
  In `backend.setup.ts`, 
  
    ...
    app.use(errorHandlerMiddleware);
    ...

  And each handler in controller is wrapped with an errorHandlerWrapper (`src/errorHandler.wrapper.ts`). It catches errors and hands over to the next function. It is passed into error-handling middleware and returns response the with the status by Error type.

  Defined custom errors mainly uas 2 variables (errorCode and reasonCode)

  ### Implemented Unit Test with code coverage for functionalities
  
  Used `jest` and `supertest` to test the endpoints correctness.


  ### Frontend

  It is a simple frontend just used for visualize the users and transactions data and perform some API calls.
  Validation in frontend is not provide as it is used to check the robust of backend server.

  ### **Technologies**
  - TypeScript
  - React
  - Redux, Saga
  - styled-component

  ### Technical Approaches

  ### Implemented state management using Redux

  Used `@reduxjs/toolkit` library to establish global state management in the FE project.

  Used Saga middlware in redux for calling BE endpoints and update the states in store.
