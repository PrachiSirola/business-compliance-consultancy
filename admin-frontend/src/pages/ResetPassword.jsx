import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import PasswordField from "../components/common/PasswordField";

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,18}$/;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("This reset link is invalid or has expired. Please request a new one.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!PASSWORD_RULE.test(newPassword)) {
      setError(
        "Password must be 8–18 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character."
      );
      return;
    }

    setBusy(true);
    try {
      await api.resetPassword(token, newPassword, confirmPassword);
      navigate("/login", { replace: true, state: { justReset: true } });
    } catch (err) {
      // Covers invalid, expired, and already-used links (the backend can't
      // tell these apart once the token no longer matches a live reset),
      // plus password-reuse and policy errors from the server.
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-card__brand">Suits Admin</div>
        <div className="login-card__tag">Set a new password</div>

        {!token && (
          <div className="login-error">
            This reset link is invalid or has expired. Please request a new one.
          </div>
        )}
        {token && error && <div className="login-error">{error}</div>}

        <form onSubmit={onSubmit}>
          <PasswordField
            id="newPassword"
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <p className="login-hint">
            8–18 characters, with at least one lowercase letter, one uppercase letter, one number,
            and one special character.
          </p>
          <button
            className="btn btn--primary"
            type="submit"
            disabled={busy || !token}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {busy ? "Updating…" : "Update password"}
          </button>
          <Link className="login-back" to="/forgot-password">
            Request a new link
          </Link>
        </form>
      </div>
    </div>
  );
}