export default function QuoteCard({ text, initials, name, role }) {
  return (
    <div className="quote">
      <div className="quote__stars">★★★★★</div>
      <p>"{text}"</p>
      <div className="quote__by">
        <span className="quote__av">{initials}</span>
        <div>
          <div className="quote__name">{name}</div>
          <div className="quote__role">{role}</div>
        </div>
      </div>
    </div>
  );
}
