const express = require("express");
const cors = require("cors");
const storage = require("node-persist");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());

// Initialize Node-persist
storage.init()
  .then(() => {
    console.log('Node-persist initialized');
  })
  .catch((err) => {
    console.error('Error initializing Node-persist:', err);
  });

app.use(express.json());

// Get all tasks
app.get("/todos", async (req, res) => {
  const tasks = await storage.getItem('tasks') || [];
  res.status(200).json(tasks);
});

// Add a task
app.post("/add/todo", async (req, res) => {
  const task = await storage.setItem('tasks', [...(await storage.getItem('tasks') || []), req.body.task]);
  res.status(200).json({ message: "Task added successfully!" });
});

// Clear all tasks
app.get("/clear", async (req, res) => {
  await storage.removeItem('tasks');
  res.status(200).json({ message: "Tasks cleared successfully!" });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server Running ${process.env.PORT || 8080}`);
});
