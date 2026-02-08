import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  if (!tasks.length) {
    return <p className="empty">No tasks found 😶</p>;
  }

  return (
    <div className="tasklist">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
