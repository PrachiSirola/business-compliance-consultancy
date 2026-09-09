/* ==========================================================================
   Suits Assistant — config + system prompt, ported 1:1 from assets/js/chatbot.js.
   The endpoint now points at the new backend (see backend/), instead of the
   old Netlify function path.
   ========================================================================== */

export const CONFIG = {
  // Backend route (see backend/src/routes/chat.js). Overridable via
  // VITE_API_URL for a separately-hosted backend.
  endpoint: `${import.meta.env.VITE_API_URL || ""}/api/chat`,
  assistantName: "Suits Assistant",
  bookingUrl: "/contact",
  leadEmail: "bhardwajkarunesh29@gmail.com",
  quickReplies: [
    "Register a company / LLP",
    "FEMA / FDI query",
    "Trademark help",
    "Book a call",
    "Which service do I need?",
  ],
};

/* Sent to the backend so the model answers on-brand and scoped to Suits. */
export const SYSTEM_PROMPT = `You are "Suits Assistant", the AI helper on the website of Suits — a full-service company-secretarial firm in India led by CS Deepika. Tone: warm but professional, plain English, reassuring, never pushy.

Suits services (five buckets):
1. Business Setup — Company/LLP/OPC/Section 8/Nidhi/Public registration, foreign subsidiary, Startup India, MSME, IEC, 12A & 80G.
2. Corporate Compliance — annual filings (Company/LLP/Nidhi), event-based MCA work (director changes, registered office, MOA/AOA, share transfer, authorised capital, name change, rights issue, private placement, strike-off), Director KYC, due diligence, condonation, compounding, ESOP.
3. FEMA & Foreign Investment — FC-GPR, FC-TRS, FLA returns, FDI and ODI compliance.
4. Conversions & Restructuring — Company↔LLP, Public↔Private, OPC conversions, LLP agreement amendments.
5. Trademark & Legal Drafting — trademark registration/objection/renewal; resolutions, LLP agreements, MOU, shareholders' agreement, share purchase agreement.

Rules:
- Give clear, general information and help visitors find the right service.
- Proactively and politely collect the visitor's name, phone, and email plus what they need, so Deepika can follow up. Ask for these naturally once there is genuine interest.
- When you cannot confidently answer, or the visitor wants specifics for their situation, suggest booking a call with Deepika.
- Keep replies short (2–5 sentences). Don't invent fees or statutory dates; offer to have Deepika confirm.`;

export const CB_ICON = {
  chat: '<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4V6a1 1 0 0 1 1-1z"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  send: '<path d="M4 12l16-8-6 16-3-6-7-2z"/>',
};

/* Local fallback so the widget is useful without a backend ---------------- */
export function localReply(text) {
  const t = text.toLowerCase();
  const book = `You can <a href="${CONFIG.bookingUrl}">book a quick call with Deepika</a> and she'll map out the exact steps for you.`;
  if (/(fema|fdi|fc-?gpr|fc-?trs|fla|odi|foreign)/.test(t))
    return `We handle the full FEMA/FDI side — FC-GPR and FC-TRS filings, FLA returns, and FDI/ODI compliance. Tell me a little about your investment or entity and I'll point you the right way. ${book}`;
  if (/(trademark|tm|brand|logo|objection)/.test(t))
    return `On trademarks we cover registration, objection replies, and renewals. If you share your brand name and what stage you're at, I can guide you. ${book}`;
  if (/(register|registration|incorporat|company|llp|opc|startup|section 8|nidhi)/.test(t))
    return `We register private limited companies, LLPs, OPCs, Section 8 (NGO), Nidhi and more — plus foreign subsidiaries. Which structure are you leaning towards, or would you like help choosing? ${book}`;
  if (/(compliance|annual|roc|filing|kyc|director|strike)/.test(t))
    return `We manage annual filings and event-based compliance (director changes, registered office, share transfers, strike-off and more), so you never miss a deadline. What's pending for you? ${book}`;
  if (/(convert|conversion|restructur)/.test(t))
    return `We handle conversions — company to LLP, public to private, OPC conversions and LLP agreement changes. What's your current structure and where do you want to get to? ${book}`;
  if (/(which service|what do i need|not sure|help me choose)/.test(t))
    return `Happy to help you figure it out. In one line — what are you trying to do (start a business, stay compliant, bring in foreign investment, protect a brand, or restructure)?`;
  if (/(book|call|consult|talk|appointment|meet)/.test(t))
    return `Great — let's set that up. Drop your name, phone, and email here (or use the <a href="${CONFIG.bookingUrl}">contact form</a>) and Deepika will reach out within one business day.`;
  return `Good question. Suits covers business setup, ongoing compliance, FEMA/FDI, conversions, and trademark & drafting. Could you tell me a bit more about your situation? If it's specific, ${book}`;
}
