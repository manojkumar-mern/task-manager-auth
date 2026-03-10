const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Allow Vercel + localhost
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      /\.vercel\.app$/, // allow all vercel deployments
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
