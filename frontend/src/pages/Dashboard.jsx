import { useEffect, useMemo, useState } from "react";
import axios from "../api/axios"; // your axios instance
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "./dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [editTask, setEditTask] = useState(null);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  //  Fetch user + tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("/api/auth/me");
        setUser(userRes.data.user);

        const taskRes = await axios.get("/api/tasks");
        setTasks(taskRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //  Add Task
  const addTask = async (payload) => {
    try {
      const res = await axios.post("/api/tasks", payload);
      setTasks([res.data, ...tasks]);
    } catch (err) {
      console.log(err);
    }
  };

  //  Update Task
  const updateTask = async (id, payload) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, payload);
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditTask(null);
    } catch (err) {
      console.log(err);
    }
  };

  //  Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  //  Toggle Complete
  const toggleComplete = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task._id}`, {
        completed: !task.completed,
      });

      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = useMemo(() => {
  let result = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) =>
      priorityFilter === "all" ? true : t.priority === priorityFilter,
    )
    .filter((t) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "completed") return t.completed;
      if (statusFilter === "pending") return !t.completed;
      return true;
    });

  //  SORTING
  result = result.sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "dueDate") {
      // tasks without dueDate should go bottom
      const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return aDue - bDue; // nearest first
    }

    if (sortBy === "priority") {
      const rank = { high: 1, medium: 2, low: 3 };
      return (rank[a.priority] || 99) - (rank[b.priority] || 99);
    }

    return 0;
  });

  return result;
  }, [tasks, search, priorityFilter, statusFilter, sortBy]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <h2 className="dashboard__heading">Dashboard (Protected)</h2>

        {/* USER CARD */}
        <div className="card">
          <h3 className="card__title">Welcome {user?.name || "User"} </h3>
          <p className="card__sub">Email: {user?.email}</p>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stats__card">
            <h4>Total</h4>
            <p>{total}</p>
          </div>
          <div className="stats__card">
            <h4>Completed</h4>
            <p>{completed}</p>
          </div>
          <div className="stats__card">
            <h4>Pending</h4>
            <p>{pending}</p>
          </div>
        </div>

        {/* ADD TASK */}
        <div className="card">
          <TaskForm
            onAddTask={addTask}
            onUpdateTask={updateTask}
            editTask={editTask}
            onCancelEdit={() => setEditTask(null)}
          />
        </div>

        {/* FILTERS */}
        <div className="card">
          <h3 className="section-title">Your Tasks</h3>

          <div className="filters">
            <input
              className="input"
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="input"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            {/* SORT DROPDOWN */}
            <select
              className="input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority (High → Low)</option>
              <option value="title">Title (A → Z)</option>
            </select>
          </div>

          <p className="count">
            Showing {filteredTasks.length} / {tasks.length}
          </p>
        </div>

        {/* TASK LIST */}
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => setEditTask(task)}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
