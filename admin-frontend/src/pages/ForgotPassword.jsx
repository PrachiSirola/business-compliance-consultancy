import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api.forgotPassword(email.trim());
      // The backend always returns the same generic message whether or not
      // the email exists — we just show it.
      setSent(true);
    } catch (err) {
      // Only reachable for actual request errors (e.g. missing email) —
      // never reveals whether the account exists.
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-card__brand">Suits Admin</div>
        <div className="login-card__tag">Reset your password</div>

        {sent ? (
          <>
            <div className="login-info">
              If an account exists with this email address, a password reset link has been sent.
            </div>
            <Link className="btn btn--ghost" to="/login" style={{ width: "100%", justifyContent: "center" }}>
              Back to sign in
            </Link>
          </>
        ) : (
          <>
            {error && <div className="login-error">{error}</div>}
            <form onSubmit={onSubmit}>
              <div className="login-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                className="btn btn--primary"
                type="submit"
                disabled={busy}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {busy ? "Sending…" : "Send reset link"}
              </button>
              <Link className="login-back" to="/login">
                Back to sign in
              </Link>
            </form>
          </>
        )}
      </div>
    </div>
  );
}