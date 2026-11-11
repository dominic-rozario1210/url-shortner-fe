
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "./AuthCard";

export default function Login() {
  const [show, setShow] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    alert("Login demo. Backend integration will be added later.");
  }

  return (
    <AuthCard
      eyebrow="WELCOME BACK"
      title="Welcome back."
      description="Log in to manage your links and track your performance."
    >
      <form className="auth-form" onSubmit={handleLogin}>
        <label>
          Email Address
          <input
            required
            type="email"
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <div className="password-input">
            <input
              required
              type={show ? "text" : "password"}
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </label>

        <div className="form-between">
          <label className="checkbox-label">
            <input type="checkbox" />
            Remember me
          </label>

          <Link to="/forgot-password">
            Forgot password?
          </Link>
        </div>

        <button
          className="btn btn-primary full-btn"
          type="submit"
        >
          Log In
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account?
        <Link to="/register"> Sign up</Link>
      </p>
    </AuthCard>
  );
}
