
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, CheckCircle } from "lucide-react";

import AuthCard from "./AuthCard";
import api from "./Api.jsx";

// Yup validation
const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required")
});

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const initialValues = {
    email: ""
  };

  async function handleForgotPassword(values) {
    setError("");
    setMessage("");

    try {
      const response = await api.post(
        "/auth/forgot-password",
        values
      );

      setMessage(response.data.message);
      setSent(true);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to process your request. Please try again."
      );
    }
  }

  return (
    <AuthCard
      eyebrow="ACCOUNT RECOVERY"
      title={sent ? "Check your inbox." : "Forgot your password?"}
      description={
        sent
          ? "If a verified account exists with this email, you'll receive instructions to reset your password."
          : "No worries. Enter your registered email address and we'll send you a password reset link."
      }
    >

      <div className="mail-icon">
        {sent ? <CheckCircle /> : <Mail />}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleForgotPassword}
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

            {error && (
              <p className="api-error" role="alert">
                {error}
              </p>
            )}

            {sent && (
              <div className="api-success" role="status">
                {message}

                <p>
                  Check your inbox and spam folder.
                </p>
              </div>
            )}

            <button
              className="btn btn-primary full-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending..."
                : sent
                  ? "Send Again"
                  : "Send Reset Link"}
            </button>

          </Form>
        )}
      </Formik>

      <p className="auth-switch">
        <Link to="/login">← Back to login</Link>
      </p>

    </AuthCard>
  );
}
