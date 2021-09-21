import useState from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const ForgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotpasswordHandler}
        className="Forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}

        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you registered your account with in
            order to receive the password reset link, thank you!
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            required
            id="email"
            placeholder="Enter Email address"
            value={email}
            onChange={() => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};
export default ForgotPasswordScreen;
