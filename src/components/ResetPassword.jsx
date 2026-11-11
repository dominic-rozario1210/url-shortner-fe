
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

import AuthCard from "./AuthCard";
import api from "./Api.jsx";

// Yup validation
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "Passwords do not match"
    )
    .required("Please confirm your password")
});

export default function ResetPassword() {
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [tokenStatus, setTokenStatus] = useState("checking");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Check reset token when page loads
  useEffect(() => {
    let active = true;

    async function verifyResetToken() {
      try {
        await api.get(
          `/auth/reset-password/${encodeURIComponent(token)}/verify`
        );

        if (active) {
          setTokenStatus("valid");
        }

      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
            "Your reset link is invalid or has expired."
          );

          setTokenStatus("invalid");
        }
      }
    }

    verifyResetToken();

    return () => {
      active = false;
    };
  }, [token]);

  const initialValues = {
    newPassword: "",
    confirmPassword: ""
  };

  // Submit new password
  async function handleResetPassword(values) {
    setError("");

    try {
      await api.patch(
        `/auth/reset-password/${encodeURIComponent(token)}`,
        values
      );

      setDone(true);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to reset password. Please try again."
      );
    }
  }

  // Checking token
  if (tokenStatus === "checking") {
    return (
      <AuthCard
        eyebrow="SECURE YOUR ACCOUNT"
        title="Checking your link..."
        description="Please wait while we verify your password reset link."
      >
        <p className="auth-description">
          Verifying reset token...
        </p>
      </AuthCard>
    );
  }

  // Invalid or expired token
  if (tokenStatus === "invalid") {
    return (
      <AuthCard
        eyebrow="PASSWORD RECOVERY"
        title="Invalid reset link."
        description={error}
      >
        <Link
          className="btn btn-primary full-btn"
          to="/forgot-password"
        >
          Request a New Reset Link
        </Link>

        <p className="auth-switch">
          <Link to="/login">Back to login</Link>
        </p>
      </AuthCard>
    );
  }

  // Successful password reset
  if (done) {
    return (
      <AuthCard
        eyebrow="SECURE YOUR ACCOUNT"
        title="Password updated!"
        description="Your password has been changed successfully. You can now log in."
      >
        <div className="reset-success">
          <CheckCircle />

          <Link
            className="btn btn-primary full-btn"
            to="/login"
          >
            Back to Login
          </Link>
        </div>
      </AuthCard>
    );
  }

  // Reset password form
  return (
    <AuthCard
      eyebrow="SECURE YOUR ACCOUNT"
      title="Create a new password."
      description="Choose a strong password to secure your Snip account."
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">

            <label>
              New Password

              <div className="password-input">

                <Field
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  autoComplete="new-password"
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
                name="newPassword"
                component="p"
                className="field-error"
              />
            </label>

            <label>
              Confirm New Password

              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                autoComplete="new-password"
              />

              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="field-error"
              />
            </label>

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
              {isSubmitting
                ? "Updating Password..."
                : "Update Password"}
            </button>

          </Form>
        )}
      </Formik>

    </AuthCard>
  );
}
