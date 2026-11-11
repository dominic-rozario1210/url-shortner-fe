
export default function AuthCard({
  eyebrow,
  title,
  description,
  children,
  wide = false
}) {
  return (
    <main className={`auth-card ${wide ? "auth-card-wide" : ""}`}>

      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}

      <h1>{title}</h1>

      <p className="auth-description">
        {description}
      </p>

      {children}

    </main>
  );
}
