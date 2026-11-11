
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";

import AuthCard from "./AuthCard";
import api from "./Api.jsx";

// Yup validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must contain at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .trim()
    .min(2, "Last name must contain at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required("Last name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),

  acceptTerms: Yup.boolean()
    .oneOf([true], "Please accept the Terms and Conditions")
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  };

  // Register user
  async function handleRegister(
    values,
    { resetForm, setSubmitting }
  ) {
    setError("");
    setSuccess("");

    try {
      // Remove frontend-only checkbox before sending to backend
      const { acceptTerms, ...registrationData } = values;

      const response = await api.post(
        "/auth/register",
        registrationData
      );

      setSuccess(
        response.data.message ||
        "Account created successfully. You can now log in."
      );

      // Clear form after successful registration
      resetForm();

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      eyebrow="GET STARTED"
      title="Create your free account."
      description="Start shortening links and understanding every click."
      wide
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form className="auth-form">

            {/* First Name and Last Name */}
            <div className="form-two">

              <label>
                First Name

                <Field
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  autoComplete="given-name"
                  maxLength={50}
                />

                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="field-error"
                />
              </label>

              <label>
                Last Name

                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  autoComplete="family-name"
                  maxLength={50}
                />

                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="field-error"
                />
              </label>

            </div>

            {/* Email */}
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

            {/* Password */}
            <label>
              Password

              <div className="password-input">

                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
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
                name="password"
                component="p"
                className="field-error"
              />
            </label>

            {/* Confirm Password */}
            <label>
              Confirm Password

              <div className="password-input">

                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>

              </div>

              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="field-error"
              />
            </label>

            {/* Terms and Conditions */}
            <label className="checkbox-label">

              <Field
                type="checkbox"
                name="acceptTerms"
              />

              I agree to the Terms and Privacy Policy.

            </label>

            <ErrorMessage
              name="acceptTerms"
              component="p"
              className="field-error"
            />

            {/* API Error */}
            {error && (
              <p className="api-error" role="alert">
                {error}
              </p>
            )}

            {/* Registration Success */}
            {success && (
              <div className="register-success" role="status">

                <strong>Registration successful!</strong>

                <p>{success}</p>

                <p>
                  Your account is ready. You can now log in.
                </p>

                <Link to="/login">
                  Go to Login
                </Link>

              </div>
            )}

            {/* Submit Button */}
            <button
              className="btn btn-primary full-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </Form>
        )}
      </Formik>

      {/* Login Link */}
      <p className="auth-switch">
        Already have an account?
        <Link to="/login"> Log in</Link>
      </p>

    </AuthCard>
  );
}
