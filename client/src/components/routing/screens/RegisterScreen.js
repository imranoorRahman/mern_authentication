import { useState, useEffect } from "react";
import axios from "axios";
import Link from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "Application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword();
      setConfirmPassword();
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password don't match!");
    }
    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
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
    <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            require
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
            require
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
            require
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
            require
            id="confirmpassword"
            placeholder="Please confirm the password"
            value={confirmpassword}
            onChange={() => setconfirmpassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
