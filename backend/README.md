# Backend — business-compliance-consultancy

Shared Express API + MongoDB backing both `frontend/` (public website) and
`admin-frontend/` (admin dashboard). Handles the Suits Assistant chatbot,
public enquiry submission, admin authentication, and admin enquiry
management.

## Structure

```
backend/
├── src/
│   ├── server.js                  Express app entry point
│   ├── config/
│   │   ├── env.js                 Loads/validates environment variables
│   │   └── db.js                  MongoDB (Mongoose) connection
│   ├── models/
│   │   ├── Enquiry.js             Contact/service/feedback/chatbot enquiries
│   │   └── Admin.js               Admin login accounts
│   ├── routes/
│   │   ├── index.js               Mounts all /api/* routes
│   │   ├── chat.js                POST /api/chat — Suits Assistant chatbot
│   │   ├── auth.js                POST /api/auth/login, GET /api/auth/me
│   │   ├── enquiries.js           POST /api/enquiries (public)
│   │   └── admin.js               /api/admin/* (protected)
│   ├── controllers/
│   │   ├── chatController.js
│   │   ├── authController.js
│   │   └── enquiryController.js
│   ├── middleware/
│   │   ├── auth.js                requireAuth — verifies the admin JWT
│   │   └── errorHandler.js
│   ├── utils/jwt.js                sign/verify helpers
│   └── scripts/seedAdmin.js        creates/updates the admin login
├── .env.example
└── package.json
```

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
- `MONGODB_URI` — a MongoDB Atlas connection string.
- `JWT_SECRET` — any long random string.
- `ANTHROPIC_API_KEY` — optional; without it the chatbot falls back to its
  built-in rule-based replies.
- `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used once by the seed
  script below to create the dashboard login (not read anywhere else).

```bash
npm run seed:admin   # creates (or resets) the admin login
npm run dev          # http://localhost:5000, reloading on change
# or: npm start
```

## API

### Public
- `GET /health` — health check.
- `POST /api/chat` — Suits Assistant chatbot. Body: `{ system, messages }`.
  Returns `{ reply }`.
- `POST /api/enquiries` — creates an enquiry from the website's contact/
  enquiry/feedback forms or the chatbot's lead-capture form. Body:
  `{ name, email, phone, service, preferredTime, message, rating, source }`
  (`source` is one of `"Enquiry" | "Feedback" | "Chatbot"`).

### Auth
- `POST /api/auth/login` — `{ email, password }` → `{ token, admin }`.
- `GET /api/auth/me` — requires `Authorization: Bearer <token>`.

### Admin (all require `Authorization: Bearer <token>`)
- `GET /api/admin/stats` — `{ total, archived, new, contacted, "in-progress", converted, closed }`.
- `GET /api/admin/enquiries?search=&status=&source=&archived=&page=&limit=&sort=`
  — paginated, filtered list.
- `GET /api/admin/enquiries/:id`
- `PATCH /api/admin/enquiries/:id` — update `{ status, assignedTo, archived }`.
- `POST /api/admin/enquiries/:id/notes` — `{ text }`, appends a follow-up note.
- `DELETE /api/admin/enquiries/:id` — permanent delete.

## Connecting the frontends

Both `frontend/` and `admin-frontend/` proxy `/api/*` to this server in dev
(see each app's `vite.config.js`, overridable via `BACKEND_URL`). In
production, either serve everything from the same origin behind a reverse
proxy, or set `VITE_API_URL` in each frontend's `.env` to this API's
deployed URL. `CORS_ORIGINS` in this app's `.env` must list every frontend
origin that will call the API.

## Notes on the Admin model

Admin accounts are created only via `npm run seed:admin` — there is no
public registration endpoint, by design (single/small admin team). Re-run
the seed script any time to reset a password or add another admin (change
`ADMIN_EMAIL` first, or extend the script to accept multiple accounts).

## Next steps (not yet built)

- A database layer for anything beyond enquiries/admins, if the app grows
  (e.g. a full CRM, service catalog management).
- Role-based permissions (admin vs staff) if more than one access level is
  needed later — the `Admin` model has room to add a `role` field.
