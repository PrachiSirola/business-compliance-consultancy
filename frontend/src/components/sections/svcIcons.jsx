// Icon paths for the service-bucket card grids (Business Setup, Corporate
// Compliance, FEMA & Foreign Investment, Conversions & Restructuring,
// Trademark & Legal Drafting). Business Setup's cards each carry their own
// `icon` key (fine-grained, one per sub-service); the other pages pass a
// single page-level `icon` that's reused across all of that page's cards.
export const ICONS = {
  // Business Setup (per-card)
  pvt: (
    <>
      <path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11" />
      <path d="M9 8h2M9 12h2M9 16h2" />
    </>
  ),
  opc: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
    </>
  ),
  llp: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a6 6 0 0 1 6-6h2" />
      <circle cx="18" cy="9" r="3" />
      <path d="M14 21v-2a5 5 0 0 1 5-5" />
    </>
  ),
  pub: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M4 9h16M9 21V9M8 13h2M14 13h2M8 17h2M14 17h2" />
    </>
  ),
  ngo: (
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  ),
  nidhi: (
    <>
      <path d="M5 9h14l1 4v7H4v-7l1-4z" />
      <path d="M7 9V5h10v4M9 14h6M12 11v6" />
    </>
  ),
  subIn: (
    <>
      <path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16" />
      <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
    </>
  ),
  india: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18M5 7h14M5 17h14" />
    </>
  ),
  subFr: (
    <>
      <path d="M3 21h18M5 21V8l7-4 7 4v13" />
      <path d="M9 21v-5h6v5" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
  startup: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M9 5V3M15 5V3M4 9h16M9 14l2 2 4-4" />
    </>
  ),
  msme: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="2" />
      <path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M12 11v5M10 13h4" />
    </>
  ),
  iec: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 9 8.5 12S9.5 18.5 12 21" />
    </>
  ),
  r12a80g: (
    <>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path d="M9 11l2 2 4-4" />
    </>
  ),

  shield: (
    <>
      <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),

  // Corporate Compliance (one distinct icon per card)
  fileCheck: (
    <>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v4h4" />
      <path d="M9 14l2 2 4-4" />
    </>
  ),
  fileStack: (
    <>
      <path d="M7 8h11v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8z" />
      <path d="M5 4h11v4" />
    </>
  ),
  idCard: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <circle cx="8.5" cy="12" r="2" />
      <path d="M6 16.3c.6-1 1.5-1.5 2.5-1.5s1.9.5 2.5 1.5" />
      <path d="M13 10h6M13 14h4" />
    </>
  ),
  personSwap: (
    <>
      <circle cx="8" cy="8" r="3" />
      <path d="M3 20v-1a5 5 0 0 1 5-5h1" />
      <path d="M15 4l3 3-3 3M22 7h-7" />
    </>
  ),
  officeMove: (
    <>
      <path d="M4 21h16" />
      <path d="M6 21V10l6-4 6 4v11" />
      <path d="M10 21v-5h4v5" />
      <path d="M15 3l4 4" />
    </>
  ),
  fileEdit: (
    <>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v4h4" />
      <path d="M9 17l1-3 5-5 2 2-5 5-3 1z" />
    </>
  ),
  shareTransfer: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8 8l8 8M13 5h6v6" />
    </>
  ),
  trendUp: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  certificate: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.3" />
      <path d="M14 9h5M14 13h5M6 19l1-3M12 19l-1-3" />
    </>
  ),
  tagEdit: (
    <>
      <path d="M3 12l8-8h7v7l-8 8-7-7z" />
      <circle cx="14.5" cy="7.5" r="1.3" />
      <path d="M6 18l3-1 6-6" />
    </>
  ),
  fileX: (
    <>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 13.5l5 5M14.5 13.5l-5 5" />
    </>
  ),
  magnifier: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M20 20l-5.5-5.5" />
      <path d="M8 10h4" />
    </>
  ),
  clockCheck: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2" />
      <path d="M9 3h6" />
    </>
  ),
  barChart: (
    <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
  ),

  // FEMA & Foreign Investment (one distinct icon per card)
  inboundArrow: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8l4 4-4 4" />
    </>
  ),
  outboundArrow: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M16 12H8M12 16l-4-4 4-4" />
    </>
  ),
  calendarReturn: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  globeCheck: (
    <>
      <circle cx="11" cy="12" r="8" />
      <path d="M3 12h16M11 4c2.2 2.2 3 5 3 8s-.8 5.8-3 8M11 4c-2.2 2.2-3 5-3 8s.8 5.8 3 8" />
      <path d="M17 17l2 2 4-4" />
    </>
  ),
  globeArrowOut: (
    <>
      <circle cx="11" cy="12" r="8" />
      <path d="M3 12h16M11 4c2.2 2.2 3 5 3 8s-.8 5.8-3 8M11 4c-2.2 2.2-3 5-3 8s.8 5.8 3 8" />
      <path d="M16 8l5-4M21 4v4h-4" />
    </>
  ),

  // Conversions & Restructuring (one distinct icon per card)
  arrowRightBox: (
    <>
      <rect x="3" y="9" width="6" height="6" rx="1" />
      <rect x="15" y="9" width="6" height="6" rx="1" />
      <path d="M9 12h6M13 9l2 3-2 3" />
    </>
  ),
  arrowLeftBox: (
    <>
      <rect x="3" y="9" width="6" height="6" rx="1" />
      <rect x="15" y="9" width="6" height="6" rx="1" />
      <path d="M15 12H9M11 9l-2 3 2 3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  unlock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.5-2" />
    </>
  ),

  // Trademark & Legal Drafting (one distinct icon per card)
  tmBadge: (
    <>
      <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
      <path d="M9 12h6M9 15h4" />
    </>
  ),
  reply: (
    <>
      <path d="M9 17l-6-5 6-5" />
      <path d="M3 12h11a6 6 0 0 1 6 6v1" />
    </>
  ),
  gavel: (
    <>
      <path d="M3 21h8" />
      <path d="M13 3l4 4-8 8-4-4z" />
      <path d="M11 9l4 4" />
    </>
  ),
  mou: (
    <>
      <rect x="3" y="4" width="12" height="16" rx="1" />
      <rect x="9" y="7" width="12" height="16" rx="1" />
    </>
  ),
  twoPeople: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2 21c0-3 3-5 6-5s6 2 6 5" />
      <path d="M12 21c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" />
    </>
  ),

  // One page-level icon each, for Corporate Compliance, FEMA & Foreign
  // Investment, Conversions & Restructuring, Trademark & Legal Drafting.
  // (Kept as a fallback for any card that doesn't specify its own icon.)
  compliance: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 3h6v3H9z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  exchange: (
    <>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 6h18" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 18H3" />
    </>
  ),
  convert: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </>
  ),
};

export default function SvcIcon({ name }) {
  return (
    <span className="svc-card__ico">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICONS[name]}
      </svg>
    </span>
  );
}