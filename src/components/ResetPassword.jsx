
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import AuthCard from "../components/AuthCard";

export default function ResetPassword() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <AuthCard
      eyebrow="SECURE YOUR ACCOUNT"
      title={done ? "Password updated!" : "Create a new password."}
      description={
        done
          ? "Your password has been changed successfully. You can now log in."
          : "Choose a strong password to secure your Snip account."
      }
    >

      {done ? (

        <div className="reset-success">
          <CheckCircle />

          <Link
            className="btn btn-primary full-btn"
            to="/login"
          >
            Back to Login
          </Link>
        </div>

      ) : (

        <form
          className="auth-form"
          onSubmit={e => {
            e.preventDefault();
            setDone(true);
          }}
        >

          <label>
            New Password

            <div className="password-input">
              <input
                required
                minLength="8"
                type={show ? "text" : "password"}
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </label>

          <label>
            Confirm New Password
            <input
              required
              minLength="8"
              type="password"
              placeholder="Confirm new password"
            />
          </label>

          <button className="btn btn-primary full-btn">
            Update Password
          </button>

        </form>

      )}

    </AuthCard>
  );
}
