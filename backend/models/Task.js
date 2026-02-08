const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // Each task belongs to one user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Task title
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    // Optional description
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    // NEW: Due date
    dueDate: {
      type: Date,
      default: null,
    },

    // NEW: Priority
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // Task completion
    completed: {
      type: Boolean,
      default: false,
    },

    // NEW: track completed time (optional)
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  },
);

module.exports = mongoose.model("Task", taskSchema);
