import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");

    if (password !== confirm) {
      return setMsg("Passwords do not match");
    }

    try {
      await API.post(`/auth/reset-password/${token}`, { password });

      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2 className="auth__title">Reset Password</h2>

        {msg && <p className="auth__error">{msg}</p>}

        <form onSubmit={handleReset} className="auth__form">
          <input
            type="password"
            placeholder="New Password"
            className="auth__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="auth__input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button className="auth__btn">Reset Password</button>
        </form>

        <div className="auth-footer">
          <Link to="/login" className="back-link">
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
