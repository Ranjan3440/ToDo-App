
const ToDoModel = require("../models/ToDo");

module.exports.getToDos = async (req, res) => {
  const { email } = req.body;
  try {
    const toDos = await ToDoModel.find({ email });
    res.send(toDos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.saveToDo = (req, res) => {
  const { title, description, status, email } = req.body;
  ToDoModel.create({ title, description, status, email })
    .then((data) => {
      console.log("Saved...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;
  ToDoModel.findByIdAndDelete(id.trim())
    .then(() => {
      console.log("Deleted");
      res.send("Deleted");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { title, description, status, email } = req.body;
  ToDoModel.findByIdAndUpdate(
    id.trim(),
    { title, description, status, email },
    { new: true }
  )
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ message: "ToDo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

// New patchToDo function
module.exports.patchToDo = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  ToDoModel.findByIdAndUpdate(id.trim(), updateData, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ message: "ToDo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};


