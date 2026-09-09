/**
 * Flat, hand-drawn-style SVG illustrations for the three "How it works"
 * steps — built in code (per request), not photo assets. Colors reference
 * the site's own CSS custom properties so they stay on-theme automatically.
 */

export function RequirementIllustration() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="56" y="28" width="88" height="146" rx="16" fill="#fff" stroke="var(--line-strong)" strokeWidth="2" />
      <rect x="66" y="44" width="68" height="20" rx="5" fill="var(--navy)" />
      <rect x="74" y="52" width="40" height="4" rx="2" fill="var(--ivory)" opacity=".8" />
      <circle cx="80" cy="94" r="9" fill="var(--ivory-2)" stroke="var(--navy)" strokeWidth="1.6" />
      <path d="M76 94l3 3 6-7" stroke="var(--navy)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="98" y="90" width="32" height="4.5" rx="2.2" fill="var(--line-strong)" />
      <circle cx="80" cy="122" r="9" fill="var(--ivory-2)" stroke="var(--navy)" strokeWidth="1.6" />
      <path d="M76 122l3 3 6-7" stroke="var(--navy)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="98" y="118" width="26" height="4.5" rx="2.2" fill="var(--line-strong)" />
      <rect x="66" y="148" width="68" height="4.5" rx="2.2" fill="var(--ivory-2)" />
    </svg>
  );
}

export function PrepareIllustration() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="38" y="86" width="104" height="66" rx="8" fill="var(--navy)" />
      <path d="M38 94l52 32 52-32" stroke="var(--ivory)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="68" y="46" width="54" height="70" rx="5" fill="#fff" stroke="var(--line-strong)" strokeWidth="2" />
      <line x1="78" y1="62" x2="112" y2="62" stroke="var(--line-strong)" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="78" y1="73" x2="112" y2="73" stroke="var(--line-strong)" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="78" y1="84" x2="100" y2="84" stroke="var(--line-strong)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M150 158c-2-16 2-28 2-28M152 130c6-10 15-16 15-16M152 130c-8-8-19-11-19-11" stroke="#6C8F6C" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="152" cy="162" rx="15" ry="7" fill="var(--ivory-2)" stroke="var(--line-strong)" strokeWidth="1.4" />
    </svg>
  );
}

export function CompliantIllustration() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="46" y="140" width="108" height="26" rx="4" fill="#fff" stroke="var(--line-strong)" strokeWidth="2" />
      <rect x="54" y="150" width="60" height="4" rx="2" fill="var(--ivory-2)" />
      <ellipse cx="100" cy="94" rx="36" ry="42" fill="var(--ink)" />
      <rect x="86" y="60" width="28" height="16" rx="4" fill="var(--ink)" />
      <path d="M84 96l11 11 22-24" stroke="var(--ivory)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="152" cy="150" r="18" fill="var(--hero-gold,#B8863C)" stroke="#fff" strokeWidth="3" />
      <path d="M152 141v9l6 4" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}