
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";

import AuthCard from "./AuthCard";
import api from "./Api.jsx";
import { useAuth } from "../context/AuthContext";

// Yup validation
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: ""
  };

  async function handleLogin(values) {
    setError("");

    try {
      const response = await api.post("/auth/login", values);

      // Update shared authentication state and persist the session.
      login(response.data);

      // Return users to the protected page they originally requested.
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  }

  return (
    <AuthCard
      eyebrow="WELCOME BACK"
      title="Welcome back."
      description="Log in to manage your links and track your performance."
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">

            <label>
              Email Address

              <Field
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
              />

              <ErrorMessage
                name="email"
                component="p"
                className="field-error"
              />
            </label>

            <label>
              Password

              <div className="password-input">

                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>

              </div>

              <ErrorMessage
                name="password"
                component="p"
                className="field-error"
              />
            </label>

            <div className="form-between">
              <span></span>

              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="api-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="btn btn-primary full-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>

          </Form>
        )}
      </Formik>

      <p className="auth-switch">
        Don't have an account?
        <Link to="/register"> Sign up</Link>
      </p>

    </AuthCard>
  );
}
