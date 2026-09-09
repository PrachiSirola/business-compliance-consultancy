export default function EnquiryMessageModal({ enquiry, onClose }) {
  function onOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal modal--message">
        <div className="modal__head">
          <div />
          <button className="modal__close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="modal-message__body">{enquiry.message}</div>
      </div>
    </div>
  );
}