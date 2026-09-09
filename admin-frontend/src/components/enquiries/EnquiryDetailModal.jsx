import { useState } from "react";
import StatusBadge from "../common/StatusBadge";
import { mailtoLink, whatsappLink, telLink } from "../../lib/contactActions";

const STATUSES = ["new", "contacted", "in-progress", "converted", "closed"];

export default function EnquiryDetailModal({ enquiry, onClose, onUpdate, onAddNote, onArchiveToggle, onDelete }) {
  const [assignedTo, setAssignedTo] = useState(enquiry.assignedTo || "");
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  function onOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  async function saveAssignment() {
    if (assignedTo === (enquiry.assignedTo || "")) return;
    await onUpdate(enquiry, { assignedTo });
  }

  async function submitNote(e) {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSavingNote(true);
    try {
      await onAddNote(enquiry, noteText.trim());
      setNoteText("");
    } finally {
      setSavingNote(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal">
        <div className="modal__head">
          <div>
            <h2 style={{ marginBottom: 4 }}>{enquiry.name}</h2>
            <StatusBadge status={enquiry.status} />
          </div>
          <button className="modal__close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Email</span>
          <span className="detail-row__val">{enquiry.email || "—"}</span>
        </div>
        <div className="detail-row">
          <span className="detail-row__label">Phone</span>
          <span className="detail-row__val">{enquiry.phone || "—"}</span>
        </div>
        <div className="detail-row">
          <span className="detail-row__label">Source</span>
          <span className="detail-row__val">{enquiry.source}</span>
        </div>
        {enquiry.service && (
          <div className="detail-row">
            <span className="detail-row__label">Service</span>
            <span className="detail-row__val">{enquiry.service}</span>
          </div>
        )}
        {enquiry.preferredTime && (
          <div className="detail-row">
            <span className="detail-row__label">Preferred time</span>
            <span className="detail-row__val">{enquiry.preferredTime}</span>
          </div>
        )}
        {enquiry.rating && (
          <div className="detail-row">
            <span className="detail-row__label">Rating</span>
            <span className="detail-row__val">{enquiry.rating}</span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-row__label">Message</span>
          <span className="detail-row__val" style={{ whiteSpace: "pre-wrap" }}>
            {enquiry.message || "—"}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-row__label">Received</span>
          <span className="detail-row__val">{new Date(enquiry.createdAt).toLocaleString()}</span>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Status</span>
          <span className="detail-row__val">
            <select
              className="status-select"
              value={enquiry.status}
              onChange={(e) => onUpdate(enquiry, { status: e.target.value })}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Assigned to</span>
          <span className="detail-row__val" style={{ display: "flex", gap: 8 }}>
            <input
              style={{
                flex: 1,
                fontFamily: "inherit",
                fontSize: ".88rem",
                border: "1px solid var(--line-strong)",
                borderRadius: "var(--radius)",
                padding: "7px 10px",
              }}
              value={assignedTo}
              placeholder="e.g. Deepika"
              onChange={(e) => setAssignedTo(e.target.value)}
              onBlur={saveAssignment}
            />
          </span>
        </div>

        <div style={{ display: "flex", gap: 8, margin: "18px 0" }}>
          {enquiry.email && (
            <a className="btn btn--ghost btn--sm" href={mailtoLink(enquiry)}>
              Email
            </a>
          )}
          {enquiry.phone && (
            <>
              <a className="btn btn--ghost btn--sm" href={whatsappLink(enquiry)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a className="btn btn--ghost btn--sm" href={telLink(enquiry)}>
                Call
              </a>
            </>
          )}
          <div style={{ flex: 1 }} />
          <button className="btn btn--ghost btn--sm" onClick={() => onArchiveToggle(enquiry)}>
            {enquiry.archived ? "Unarchive" : "Archive"}
          </button>
          <button
            className="btn btn--danger btn--sm"
            onClick={() => {
              if (window.confirm("Delete this enquiry permanently? This cannot be undone.")) {
                onDelete(enquiry);
              }
            }}
          >
            Delete
          </button>
        </div>

        <h3>Notes & follow-ups</h3>
        {enquiry.notes && enquiry.notes.length > 0 ? (
          enquiry.notes
            .slice()
            .reverse()
            .map((n, i) => (
              <div className="note" key={i}>
                {n.text}
                <div className="note__meta">
                  {n.author ? `${n.author} · ` : ""}
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
        ) : (
          <p className="muted" style={{ fontSize: ".86rem" }}>
            No notes yet.
          </p>
        )}
        <form className="note-form" onSubmit={submitNote}>
          <textarea
            placeholder="Add a note or follow-up…"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button className="btn btn--primary btn--sm" type="submit" disabled={savingNote}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}