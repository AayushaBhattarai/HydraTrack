import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

function Login() {
      const navigate = useNavigate();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-brand">
          <div className="login-logo">💧</div>
          <h1>HydraTrack</h1>
          <p>AI-Powered Smart Hydration & Wellness Assistant</p>
        </div>

        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="login-subtitle">
            Sign in to continue your hydration journey.
          </p>

        <form className="login-form" onSubmit={handleLogin}>

            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
            {error && (
                <p
                style={{
                    color: "crimson",
                    fontSize: "13px",
                    margin: "0"
                 }}
                  >
                    {error}
                     </p>
                    )}
            <button type="submit" className="login-button">
              Sign In
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-button">
            Continue with Google
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
          <Link to="/signup">Create an account</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;