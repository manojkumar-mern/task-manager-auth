import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./auth.css";

export default function SignUp({ setUserInfo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await API.post("/api/auth/signup", { name, email, password });

      localStorage.setItem("userInfo", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUserInfo(res.data); //  updates navbar instantly
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2 className="auth__title">Sign up</h2>

        {msg && <p className="auth__error">{msg}</p>}

        <form onSubmit={handleRegister} className="auth__form">
          <input
            className="auth__input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="auth__input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth__input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth__btn">Sign up</button>

          <p className="auth__login">
            Already have an account?{" "}
            <Link
              to="/login"
              className="auth__login-link"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
