import { useState, useEffect } from "react";
import axios from "axios";
import Link from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter Username"
            value={username}
            onChange={() => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            required
            id="email"
            placeholder="Enter Email address"
            value={email}
            onChange={() => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            required
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={() => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="text"
            required
            id="confirmpassword"
            placeholder="Please confirm the password"
            value={confirmpassword}
            onChange={() => setconfirmpassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          login
        </button>

        <span className="login-screen__subtext">
          Don't have an account yet? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
