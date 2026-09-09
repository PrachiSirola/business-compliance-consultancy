# Frontend — business-compliance-consultancy

React (Vite) rewrite of the original static Suits website. Same design,
same content, same behavior — now componentized and routed with
`react-router-dom`.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Structure

```
src/
├── main.jsx                Entry point — mounts <App/>, imports the global stylesheet
├── App.jsx                 Route table (react-router-dom)
├── assets/css/styles.css   The original design system, unchanged
├── data/
│   ├── business.js         BUSINESS config + SERVICES catalogue (was main.js)
│   └── icons.js             Named icon set (was the ICON object in main.js)
├── components/
│   ├── layout/
│   │   ├── Header.jsx       Nav, mobile menu, services dropdown
│   │   ├── Footer.jsx
│   │   └── Layout.jsx        Wraps every route: Header + page + Footer + chatbot
│   ├── common/
│   │   ├── Icon.jsx          Renders a named icon from data/icons.js
│   │   ├── IcoRaw.jsx        Renders a one-off inline SVG (arrow, card icons, etc.)
│   │   ├── Reveal.jsx        Scroll fade-in wrapper (was initReveal())
│   │   ├── Counter.jsx       Animated stat count-up (was initCounters())
│   │   └── SEO.jsx           Sets document title + meta description per page
│   ├── sections/            Reusable content blocks used across pages:
│   │   ├── ServiceCard.jsx, EnquireCard.jsx, FeatureItem.jsx, StepItem.jsx,
│   │   │   QuoteCard.jsx, PostCard.jsx, StatItem.jsx, Accordion.jsx
│   │   ├── ServiceDetailPage.jsx   Shared template for the 5 service pages
│   │   ├── EnquiryForm.jsx, FeedbackForm.jsx, useLeadForm.js
│   │   │   (form validation + mailto/POST fallback, was initForms())
│   └── chatbot/
│       ├── Chatbot.jsx        Suits Assistant widget (floating + embed modes)
│       └── chatbotConfig.js   System prompt, quick replies, local fallback replies
└── pages/                    One component per route (Home, About, Services,
                               the 5 service-bucket pages, Blog + article, FAQ,
                               Testimonials, Contact, Privacy, NotFound)
```

## Editing content

- **Contact details, phone, email, services menu** — `src/data/business.js`
  (`BUSINESS` and `SERVICES`), same as editing `main.js` used to be.
- **Page text** — each page's copy lives directly in its `src/pages/*.jsx`
  file, in ordinary JSX.
- **Colours & fonts** — unchanged, still in `src/assets/css/styles.css`
  under `:root`.
- **Chatbot personality / quick replies** — `src/components/chatbot/chatbotConfig.js`.
- **Chatbot backend URL** — `VITE_API_URL` in `.env` (see `.env.example`);
  defaults to same-origin `/api/chat`, proxied to `backend/` in dev.

## Forms

Submitting the enquiry or feedback form now POSTs to the backend
(`/api/enquiries` by default, or `window.SUITS_FORM_ENDPOINT` if set),
storing the submission in MongoDB so it appears in the Admin Dashboard. If
the request fails (e.g. backend unreachable), it falls back to a prefilled
`mailto:` link, same as the original static-site behavior. See
`src/components/sections/useLeadForm.js`.

## Chatbot lead capture

When the Suits Assistant chatbot's "gentle nudge" appears (after a few
exchanges), it now includes a small inline form (name/phone/email) instead
of just asking the visitor to type their details. Submitting it POSTs to
`/api/enquiries` with `source: "Chatbot"` and the conversation transcript
as the message, so chatbot leads show up in the Admin Dashboard alongside
contact-form enquiries.
