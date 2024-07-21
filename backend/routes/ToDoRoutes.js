const { Router } = require("express");
const {
  getToDos,
  saveToDo,
  deleteToDo,
  updateToDo,
  patchToDo,
} = require("../controllers/ToDoController");

const router = Router();

// Route for fetching todos
router.get("/get", getToDos);

// Route for creating a new todo
router.post("/save", saveToDo);

// Route for updating a todo by ID
router.put("/update/:id", updateToDo);

// Route for partial update of a todo by ID
router.patch("/update/:id", patchToDo);

// Route for deleting a todo by ID
router.delete("/delete/:id", deleteToDo);

module.exports = router;

