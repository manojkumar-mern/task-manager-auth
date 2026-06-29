import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./auth.css";

export default function Login({ setUserInfo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", { email, password });

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUserInfo(res.data);
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2 className="auth__title">Log in</h2>

        {msg && <p className="auth__error">{msg}</p>}

        <form onSubmit={handleLogin} className="auth__form">
          <input
            className="auth__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth__btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="auth__signup">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="auth__signup-link"
            >
              Sign Up
            </Link>
          </p>

          <p className="auth__forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
