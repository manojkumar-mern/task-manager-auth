# MERN Auth Dashboard 🔐

A full-stack **MERN Authentication & Task Management Dashboard** with secure login, signup, protected routes, and JWT-based authentication.

This project demonstrates **real-world authentication flow** and clean project structure suitable for interviews and production use.

---

## 🚀 Features

- User Signup & Login
- JWT Authentication
- Protected Dashboard Route
- Persistent Login (Token-based)
- Logout functionality
- Task Management (Add / Delete / Update)
- Axios Interceptor for Auth Token
- Clean UI Dashboard

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- CSS / Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

---

## 📂 Project Structure


---

## 🔗 API Endpoints

| Method | Endpoint              | Description            |
|------|----------------------|------------------------|
| POST | /api/auth/register   | Register user          |
| POST | /api/auth/login      | Login user             |
| GET  | /api/auth/me         | Get logged-in user     |
| POST | /api/tasks           | Create task            |
| GET  | /api/tasks           | Get all tasks          |
| PUT  | /api/tasks/:id       | Update task            |
| DELETE | /api/tasks/:id     | Delete task            |

---

## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
