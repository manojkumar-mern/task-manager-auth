const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0);

  return (
    <div className={`taskitem ${task.completed ? "taskitem--done" : ""}`}>
      <div className="taskitem__top">
        <div>
          <h4 className="taskitem__title">{task.title}</h4>

          {task.description && (
            <p className="taskitem__desc">{task.description}</p>
          )}
        </div>

        <div className="taskitem__badges">
          <span className={`badge badge--${task.priority}`}>
            {task.priority?.toUpperCase()}
          </span>

          {task.dueDate && (
            <span className="badge badge--due">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}

          {isOverdue && <span className="badge badge--overdue">OVERDUE</span>}
        </div>
      </div>

      <div className="taskitem__actions">
        <button className="btn btn--ghost" disabled={task.completed} onClick={() => onEdit(task)}>
          Edit
        </button>

        <button
          className="btn btn--primary"
          onClick={() => onToggleComplete(task)}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button className="btn btn--danger" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
