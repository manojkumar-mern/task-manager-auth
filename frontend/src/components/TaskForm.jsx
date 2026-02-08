import { useEffect, useState } from "react";

const TaskForm = ({ onAddTask, onUpdateTask, editTask, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
      setPriority(editTask.priority || "medium");

      if (editTask.dueDate) {
        const d = new Date(editTask.dueDate);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        setDueDate(`${yyyy}-${mm}-${dd}`);
      } else {
        setDueDate("");
      }
    }
  }, [editTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? dueDate : null,
      priority,
    };

    if (editTask) {
      onUpdateTask(editTask._id, payload);
    } else {
      onAddTask(payload);
    }

    resetForm();
  };

  return (
    <div className="taskform">
      <div className="taskform__header">
        <h3 className="taskform__title">
          {editTask ? "Edit Task ✏️" : "Add Task ✅"}
        </h3>

        {editTask && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              resetForm();
              onCancelEdit();
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <form className="taskform__form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input textarea"
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="taskform__row">
          <div className="taskform__field">
            <label className="label">Due Date</label>
            <input
              className="input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="taskform__field">
            <label className="label">Priority</label>
            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <button className="btn btn--primary" type="submit">
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
