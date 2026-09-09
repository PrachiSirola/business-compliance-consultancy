/* ==========================================================================
   Site-wide business config + services catalogue.
   Ported 1:1 from the original assets/js/main.js (BUSINESS + SERVICES).
   Edit here to update contact details / the Services dropdown & footer links
   everywhere in the app.
   ========================================================================== */

export const BUSINESS = {
  name: "Suits",
  tagline: "Corporate compliance, made simple.",
  phone: "8218518915",
  phoneDisplay: "+91 82185 18915",
  email: "bhardwajkarunesh29@gmail.com",
  hours: "Mon–Fri, 11:00–18:00",
  address: "Add office address here", // TODO: fill in
  whatsapp: "918218518915", // country code + number, no +
};

export const SERVICES = [
  {
    slug: "business-setup",
    title: "Business Setup",
    desc: "Company, LLP, OPC & foreign entity registration",
    icon: "building",
    tags: [
      "Company registration",
      "LLP",
      "OPC",
      "Section 8 (NGO)",
      "Nidhi",
      "Startup India",
      "MSME",
      "IEC",
      "12A & 80G",
    ],
  },
  {
    slug: "corporate-compliance",
    title: "Corporate Compliance",
    desc: "Annual filings, event-based & mandatory compliance",
    icon: "shield",
    tags: [
      "Annual filings",
      "Director KYC",
      "Registered office change",
      "Share transfer",
      "Authorised capital",
      "Strike-off",
      "Due diligence",
      "ESOP",
    ],
  },
  {
    slug: "fema-foreign-investment",
    title: "FEMA & Foreign Investment",
    desc: "FC-GPR, FC-TRS, FLA, FDI & ODI filings",
    icon: "globe",
    tags: ["FC-GPR", "FC-TRS", "FLA return", "FDI compliance", "ODI compliance"],
  },
  {
    slug: "conversions-restructuring",
    title: "Conversions & Restructuring",
    desc: "Company ↔ LLP, public ↔ private, OPC conversions",
    icon: "swap",
    tags: [
      "Company to LLP",
      "LLP to Company",
      "Public ↔ Private",
      "OPC conversions",
      "LLP agreement amendment",
    ],
  },
  {
    slug: "trademark-legal-drafting",
    title: "Trademark & Legal Drafting",
    desc: "Trademark filing plus agreements & resolutions",
    icon: "quill",
    tags: [
      "Trademark registration",
      "Objection reply",
      "Renewal",
      "Shareholders' agreement",
      "MOU",
      "SPA",
      "Board resolutions",
    ],
  },
];
