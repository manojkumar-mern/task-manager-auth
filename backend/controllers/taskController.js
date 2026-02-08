const Task = require("../models/Task");

// GET all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority || "medium",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE task (safe update)
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, completed } = req.body;

    const updateData = {};

    // update only if values exist in req.body
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    if (dueDate !== undefined) {
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    }

    if (priority !== undefined) updateData.priority = priority;

    if (completed !== undefined) {
      updateData.completed = completed;
      updateData.completedAt = completed ? new Date() : null;
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: updateData }, 
      { new: true },
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
