import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

   try {
  await createUserWithEmailAndPassword(auth, email, password);

  navigate("/");
 } 
 catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-brand">
          <div className="login-logo">💧</div>

          <h1>HydraTrack</h1>

          <p>
            AI-Powered Smart Hydration & Wellness Assistant
          </p>
        </div>

        <div className="login-card">

          <h2>Create your account</h2>

          <p className="login-subtitle">
            Start your personalized hydration journey.
          </p>

          <form
            className="login-form"
            onSubmit={handleSignup}
          >

            <div className="login-field">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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

            <button
              type="submit"
              className="login-button"
            >
              Create Account
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-button">
            Continue with Google
          </button>

          <p className="signup-text">
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Signup;