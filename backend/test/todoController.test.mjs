// const mongoose = require("mongoose");
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../server"); // Ensure you export your Express app from server.js
// const ToDoModel = require("../models/ToDo");
// const should = chai.should();

// chai.use(chaiHttp);

// describe("ToDo API", () => {
//   before((done) => {
//     // Connect to the test database before running tests
//     mongoose.connect(
//       process.env.MONGO_URI,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       () => done()
//     );
//   });

//   beforeEach((done) => {
//     // Clear the database before each test
//     ToDoModel.deleteMany({}, (err) => done());
//   });

//   describe("GET /api/get", () => {
//     it("should get all todos for a specific email", (done) => {
//       const todo = new ToDoModel({
//         title: "Test ToDo",
//         description: "Test description",
//         status: "pending",
//         email: "test@example.com",
//       });
//       todo.save((err, todo) => {
//         chai
//           .request(server)
//           .get("/api/get")
//           .send({ email: "test@example.com" })
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("array");
//             res.body.length.should.be.eql(1);
//             done();
//           });
//       });
//     });
//   });

//   describe("POST /api/save", () => {
//     it("should create a new todo", (done) => {
//       const todo = {
//         title: "Test ToDo",
//         description: "Test description",
//         status: "pending",
//         email: "test@example.com",
//       };
//       chai
//         .request(server)
//         .post("/api/save")
//         .send(todo)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a("object");
//           res.body.should.have.property("title").eql(todo.title);
//           done();
//         });
//     });
//   });

//   describe("DELETE /api/delete/:id", () => {
//     it("should delete a todo by its ID", (done) => {
//       const todo = new ToDoModel({
//         title: "Test ToDo",
//         description: "Test description",
//         status: "pending",
//         email: "test@example.com",
//       });
//       todo.save((err, todo) => {
//         chai
//           .request(server)
//           .delete(`/api/delete/${todo._id}`)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.text.should.equal("Deleted");
//             done();
//           });
//       });
//     });
//   });

//   describe("PUT /api/update/:id", () => {
//     it("should fully update a todo by its ID", (done) => {
//       const todo = new ToDoModel({
//         title: "Test ToDo",
//         description: "Test description",
//         status: "pending",
//         email: "test@example.com",
//       });
//       todo.save((err, todo) => {
//         chai
//           .request(server)
//           .put(`/api/update/${todo._id}`)
//           .send({
//             title: "Updated ToDo",
//             description: "Updated description",
//             status: "completed",
//             email: "test@example.com",
//           })
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("title").eql("Updated ToDo");
//             done();
//           });
//       });
//     });
//   });

//   describe("PATCH /api/update/:id", () => {
//     it("should partially update a todo by its ID", (done) => {
//       const todo = new ToDoModel({
//         title: "Test ToDo",
//         description: "Test description",
//         status: "pending",
//         email: "test@example.com",
//       });
//       todo.save((err, todo) => {
//         chai
//           .request(server)
//           .patch(`/api/update/${todo._id}`)
//           .send({ status: "completed" })
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a("object");
//             res.body.should.have.property("status").eql("completed");
//             done();
//           });
//       });
//     });
//   });

//   after((done) => {
//     // Close the database connection after all tests are done
//     mongoose.connection.close(() => done());
//   });
// });

//

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js"; // Adjust the path if necessary
import ToDoModel from "../models/ToDo.js"; // Adjust the path if necessary

const { expect } = chai;
chai.use(chaiHttp);

describe("ToDo API", () => {
  // Variable to hold the ID of a created ToDo for update/delete tests
  let todoId = "";

  // Test for creating a new ToDo
  it("should create a new ToDo", async () => {
    const response = await chai.request(app).post("/api/todos/save").send({
      title: "Test ToDo",
      description: "Test Description",
      status: "pending",
      email: "test@example.com",
    });
    expect(response).to.have.status(201);
    expect(response.body).to.have.property("_id");
    expect(response.body.title).to.equal("Test ToDo");
    todoId = response.body._id; // Save the ID for later tests
  });

  // Test for fetching all ToDos
  it("should get all ToDos", async () => {
    const response = await chai
      .request(app)
      .get("/api/todos/get")
      .send({ email: "test@example.com" });
    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
  });

  // Test for updating a ToDo by ID
  it("should update a ToDo by ID", async () => {
    const response = await chai
      .request(app)
      .put(`/api/todos/update/${todoId}`)
      .send({
        title: "Updated Test ToDo",
        description: "Updated Description",
        status: "completed",
        email: "test@example.com",
      });
    expect(response).to.have.status(200);
    expect(response.body.title).to.equal("Updated Test ToDo");
  });

  // Test for partially updating a ToDo by ID
  it("should partially update a ToDo by ID", async () => {
    const response = await chai
      .request(app)
      .patch(`/api/todos/update/${todoId}`)
      .send({ status: "pending" });
    expect(response).to.have.status(200);
    expect(response.body.status).to.equal("pending");
  });

  // Test for deleting a ToDo by ID
  it("should delete a ToDo by ID", async () => {
    const response = await chai
      .request(app)
      .delete(`/api/todos/delete/${todoId}`);
    expect(response).to.have.status(200);
    expect(response.text).to.equal("Deleted");
  });
});
