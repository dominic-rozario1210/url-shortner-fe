
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthCard from "../components/AuthCard";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <AuthCard
      eyebrow="ACCOUNT RECOVERY"
      title={sent ? "Check your inbox." : "Forgot your password?"}
      description={
        sent
          ? "If an account exists with this email, you'll receive instructions to reset your password."
          : "No worries. Enter your registered email address and we'll send you a password reset link."
      }
    >

      <div className="mail-icon">
        <Mail />
      </div>

      <form
        className="auth-form"
        onSubmit={e => {
          e.preventDefault();
          setSent(true);
        }}
      >

        <label>
          Email Address
          <input
            required
            type="email"
            placeholder="you@example.com"
          />
        </label>

        <button className="btn btn-primary full-btn">
          {sent ? "Send again" : "Send Reset Link"}
        </button>

      </form>

      <p className="auth-switch">
        <Link to="/login">← Back to login</Link>
      </p>

    </AuthCard>
  );
}
