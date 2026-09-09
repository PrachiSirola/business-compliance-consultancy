import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutConfirmModal from "./LogoutConfirmModal";

const TITLES = {
  "/": "Overview",
  "/enquiries": "Enquiries",
};

export default function Topbar({ onToggleSidebar }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const title = TITLES[location.pathname] || "Suits Admin";
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  function onConfirmLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="topbar">
      <button className="sidebar__toggle" aria-label="Toggle menu" onClick={onToggleSidebar}>
        <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      <h1 className="topbar__title">{title}</h1>
      <div className="topbar__spacer" />
      <span className="topbar__admin">{admin?.name || admin?.email}</span>
      <button className="btn btn--ghost btn--sm" onClick={() => setConfirmingLogout(true)}>
        Log out
      </button>

      {confirmingLogout && (
        <LogoutConfirmModal
          onConfirm={onConfirmLogout}
          onCancel={() => setConfirmingLogout(false)}
        />
      )}
    </div>
  );
}