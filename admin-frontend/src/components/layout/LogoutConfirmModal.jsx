export default function LogoutConfirmModal({ onConfirm, onCancel }) {
  function onOverlayClick(e) {
    if (e.target === e.currentTarget) onCancel();
  }

  return (
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal modal--message">
        <div className="modal__head">
          <h3 style={{ margin: 0 }}>Log out?</h3>
          <button className="modal__close" aria-label="Close" onClick={onCancel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <p style={{ margin: "0 0 24px", color: "var(--stone)" }}>
          Are you sure you want to log out of Suits Admin?
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button className="btn btn--ghost btn--sm" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--primary btn--sm" onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}