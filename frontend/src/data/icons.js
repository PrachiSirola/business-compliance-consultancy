/* ==========================================================================
   Inline SVG icon set (outline style) — ported 1:1 from assets/js/main.js.
   Each value is the raw inner-SVG markup (paths/circles) for one icon.
   Rendered via <Icon name="..." /> (see components/common/Icon.jsx).
   ========================================================================== */

export const ICON = {
  building:
    '<path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 9h3a1 1 0 0 1 1 1v11M9 8h2M9 12h2M9 16h2"/>',
  shield:
    '<path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 9 8.5 12S9.5 18.5 12 21"/>',
  swap: '<path d="M4 8h13M4 8l3-3M4 8l3 3M20 16H7M20 16l-3-3M20 16l-3 3"/>',
  quill:
    '<path d="M20 4C10 6 6 12 5 19M20 4c0 6-3 11-9 12l-3 1 1-3M20 4l-7 7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chev: '<path d="M5 8l5 5 5-5"/>',
  phone:
    '<path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chat: '<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1z"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
  bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z"/>',
  heart:
    '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  tag: '<path d="M3 12l8-8h7v7l-8 8-7-7z"/><circle cx="14.5" cy="7.5" r="1.3"/>',
  clip: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4h6M9 10h6M9 14h4"/>',
  check: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/>',
  entry: '<path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5"/>',
};
