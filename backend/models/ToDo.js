
// const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "completed"],
//     default: "pending",
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     match: [/.+\@.+\..+/, "Please enter a valid email address"],
//   },
// });

// // Adding a method to the schema to facilitate updating todos
// todoSchema.statics.updateTodo = async function (id, updatedData) {
//   try {
//     const updatedTodo = await this.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });
//     return updatedTodo;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// module.exports = mongoose.model("ToDo", todoSchema);
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
});

todoSchema.statics.updateTodo = async function (id, updatedData) {
  try {
    const updatedTodo = await this.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedTodo;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default mongoose.model("ToDo", todoSchema);




