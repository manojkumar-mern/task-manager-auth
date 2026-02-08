import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import API from "../api";
import "./auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post("/auth/forgot-password", { email });

      const token = res.data.resetToken;

      //  navigate to reset password page
      navigate(`/reset-password/${token}`);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth">
      {/*  page-specific class to avoid shrink */}
      <div className="auth__card auth__card--forgot">
        <h2 className="auth__title">Forgot Password</h2>

        <p className="auth__subtext">Enter your email to reset your password</p>

        {msg && <p className="auth__error">{msg}</p>}

        <form onSubmit={handleSubmit} className="auth__form">
          <input
            type="email"
            className="auth__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
