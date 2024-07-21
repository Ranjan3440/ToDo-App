# ToDo Application Backend

## Overview

This is the backend for a ToDo application built with Node.js and Express.js. It provides a RESTful API to perform CRUD operations on ToDo items.


## Features

- **Create To-Do:** Add a new to-do item with a title, description, and completion status.
- **Read To-Do:** Retrieve all to-do items or a single item by its ID.
- **Update To-Do:** Modify an existing to-do item's details.
- **Delete To-Do:** Remove a to-do item by its ID.
## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will get you a copy of the backend project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js
- npm (Node package manager)
- MongoDB (for the database)
- Express

## Installation

1. Clone the repository:
   
    git clone https://github.com/Ranjan3440/Todo-app.git
  

2. Move to the todo-app directory:
   
    cd todo-app
   

3. Install the dependencies:
    
    npm install
    npm install express mongoose dotenv cors nodemon
    npm install swagger-jsdoc swagger-ui-express
    

4. Create a `.env` file in the root of the project and add your MongoDB URI:
   
    PORT=5000
    MONGO_URI=your_mongo_uri_here
    

## Running the Server

1. Move to the backend folder:
  
    cd backend
   

2. Start the backend server with the following command:
    
    npm start
    

3. The server will start on `http://localhost:5000`.

## API Endpoints

- **GET /api/get**: Retrieve all ToDo items for a given email.
- **POST /api/save**: Create a new ToDo item.
- **PUT /api/update/:id**: Update a ToDo item by ID.
- **PATCH /api/update/:id**: Partially update a ToDo item by ID.
- **DELETE /api/delete/:id**: Delete a ToDo item by ID.

## Running Tests

To run the tests using Mocha or Chai, follow these steps:

1. Install Mocha/Chai:
   
    npm install --save-dev mocha chai supertest
    

2. Write your tests in the `test` directory. Ensure your test files have the `.test.js` extension.

3. Run the tests:
    
    cd backend
    npx mocha tests/todo.test.js
  
4. The test command should be specified in the `package.json` file as follows:
    ```json
    "scripts": {
        "test": "mocha"
    }
    ```

- **controllers/todoController.js:** Defines the logic for handling CRUD operations for todos, including fetching all todos, creating a new todo, updating an existing todo, and deleting a todo.
- **models/Todo.js:** Mongoose schema and model for todos.
- **routes/todoRoutes.js:** Express routes for the todo API.
- **tests/todo.test.js:** Mocha tests for the todo API.
- **.env:** Environment variables.
- **app.js:** Entry point for the backend server.
- **package.json:** Contains the project dependencies and scripts.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add some new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

