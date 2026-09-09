# Admin Dashboard — business-compliance-consultancy

A password-protected React dashboard for managing enquiries submitted on
the public Suits website. Shares the same backend API and MongoDB database
as `frontend/` — any enquiry submitted there appears here automatically.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # production build to dist/
```

You'll need the backend running (see `../backend/README.md`) with at least
one admin account seeded via `npm run seed:admin`.

## Structure

```
src/
├── main.jsx                 Entry point, imports the global admin stylesheet
├── App.jsx                  Routes: /login (public) + protected dashboard routes
├── assets/css/admin.css     Design system — reuses the public site's ivory/
│                            navy tokens, laid out as a sidebar+topbar dashboard
├── lib/
│   ├── api.js               Fetch client — attaches the JWT, handles 401s
│   ├── exportUtils.js       CSV/Excel export (client-side, via the xlsx library)
│   └── contactActions.js    mailto: / wa.me / tel: link builders
├── context/
│   └── AuthContext.jsx      Tracks the logged-in admin; login()/logout()
├── components/
│   ├── layout/
│   │   ├── RequireAuth.jsx   Redirects to /login if not authenticated
│   │   ├── Sidebar.jsx, Topbar.jsx, DashboardLayout.jsx
│   ├── common/
│   │   ├── StatCard.jsx, StatusBadge.jsx
│   └── enquiries/
│       ├── EnquiryFilters.jsx    Search + status/source/archived filters + export
│       ├── EnquiryTable.jsx      Main data table, inline status change, row actions
│       ├── Pagination.jsx
│       └── EnquiryDetailModal.jsx  Full detail view: status, assignment, notes,
│                                   archive/delete, Email/WhatsApp/Call actions
└── pages/
    ├── Login.jsx
    ├── Overview.jsx          Stat cards: total/new/contacted/in-progress/converted/closed
    └── Enquiries.jsx         Wires filters + table + pagination + modal together
```

## Authentication

Login is email/password against the backend's `/api/auth/login`, which
returns a JWT stored in `localStorage`. Every subsequent API call attaches
`Authorization: Bearer <token>`; a `401` response automatically clears the
session and redirects to `/login`. There's no public sign-up — admin
accounts are created via the backend's `npm run seed:admin` script.

## Export

The "Export CSV" / "Export Excel" buttons on the Enquiries page fetch
**all** enquiries matching the current filters (not just the visible page)
and generate the file entirely client-side using the `xlsx` library — no
extra backend endpoint needed.

## Configuration

`VITE_API_URL` in `.env` (see `.env.example`) points at a separately-hosted
backend; leave blank to use the same origin / the Vite dev proxy to
`backend/` (the default, see `vite.config.js`).
