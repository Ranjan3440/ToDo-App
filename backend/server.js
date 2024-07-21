
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes/ToDoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api", routes);

// Example Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the Server
app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
