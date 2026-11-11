
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthCard from "../components/AuthCard";

export default function Register() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <AuthCard
      eyebrow="GET STARTED"
      title="Create your free account."
      description="Start shortening links and understanding every click."
      wide
    >

      <form
        className="auth-form"
        onSubmit={e => {
          e.preventDefault();
          setDone(true);
        }}
      >

        <div className="form-two">
          <label>
            First Name
            <input required placeholder="First name" />
          </label>

          <label>
            Last Name
            <input required placeholder="Last name" />
          </label>
        </div>

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
              minLength="8"
              type={show ? "text" : "password"}
              placeholder="Create a password"
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
          Confirm Password
          <input
            required
            minLength="8"
            type="password"
            placeholder="Confirm your password"
          />
        </label>

        <label className="checkbox-label">
          <input required type="checkbox" />
          I agree to the Terms and Privacy Policy.
        </label>

        <button className="btn btn-primary full-btn">
          {done ? "Submitted" : "Create Account"}
        </button>

      </form>

      <p className="auth-switch">
        Already have an account?
        <Link to="/login"> Log in</Link>
      </p>

    </AuthCard>
  );
}
