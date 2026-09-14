/**
 * npm run seed:blog
 *
 * Seeds the default blog categories and migrates the existing hardcoded
 * "Annual Compliance Calendar" article into the Blog collection.
 * Safe to run multiple times — uses upsert-style logic.
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

/* ── Default categories ──────────────────────────────────── */
const DEFAULT_CATEGORIES = [
  { name: "Compliance calendars", slug: "compliance-calendars" },
  { name: "FEMA / FDI", slug: "fema-fdi" },
  { name: "Trademark", slug: "trademark" },
  { name: "Startup guides", slug: "startup-guides" },
  { name: "MCA updates", slug: "mca-updates" },
  { name: "Legal", slug: "legal" },
  { name: "Business Setup", slug: "business-setup" },
  { name: "General", slug: "general" },
];

/* ── Migrated article ────────────────────────────────────── */
const COMPLIANCE_ARTICLE = {
  title: "The annual compliance calendar for a private limited company",
  slug: "annual-compliance-calendar",
  category: "Compliance calendars",
  excerpt:
    "A plain-English overview of the recurring filings a private limited company in India should plan for through the year.",
  author: "CS Deepika",
  readTime: "6 min read",
  status: "published",
  publishedAt: new Date("2025-08-28"),
  metaTitle:
    "The annual compliance calendar for a private limited company — Suits",
  metaDescription:
    "A plain-English overview of the recurring filings a private limited company in India should plan for through the year.",
  content: `<p>Running a private limited company in India means a set of filings that come around every year, plus a few one-time items after incorporation. None of them are difficult on their own — the trouble usually comes from losing track of what's due and when. This guide gives you the map. (For the exact dates in any given year, always confirm the current position, as timelines can change.)</p>

<h2>Just after incorporation</h2>
<p>Before the annual rhythm begins, a new company has a few first-year housekeeping tasks — for example, appointing its first auditor, holding its initial board meeting, and getting its statutory registers and share certificates in order. Getting these right early keeps everything downstream clean.</p>

<h2>The recurring annual filings</h2>
<ul>
<li><strong>Annual return</strong> — a yearly return to the Registrar of Companies capturing the company's shareholding and management details.</li>
<li><strong>Financial statements</strong> — the audited accounts, filed with the Registrar after they're adopted by shareholders.</li>
<li><strong>Director KYC</strong> — each director keeps their KYC current with the ministry, or risks their identification number being deactivated.</li>
<li><strong>Board and general meetings</strong> — companies must hold the required board meetings through the year and an annual general meeting, with minutes properly recorded.</li>
</ul>

<h2>Event-based filings</h2>
<p>Alongside the annual items, some filings are triggered by things that happen during the year — a change of directors, a new registered office, a share transfer, or an increase in authorised capital. These have their own timelines from the date of the event, so they're easy to miss if you're only watching the annual calendar.</p>

<h2>Why a tracked calendar matters</h2>
<p>Late filings can attract additional fees and, in some cases, knock-on consequences for directors. The simplest protection is a maintained compliance calendar with reminders ahead of each due date — which is exactly what an ongoing engagement with Suits gives you.</p>

<div style="background:#f5f0ea;border-radius:12px;padding:28px 24px;margin-top:2em;">
<h3 style="margin-top:0;">Want this handled for you?</h3>
<p style="margin-bottom:16px;">We track your filings and prepare everything ahead of time, so you never miss a deadline.</p>
<a href="/contact" style="display:inline-block;padding:12px 24px;background:#1e2a44;color:#fff;border-radius:8px;text-decoration:none;font-weight:500;">Talk to Suits</a>
</div>`,
};

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  // Seed categories
  for (const cat of DEFAULT_CATEGORIES) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
  }
  console.log(`Seeded ${DEFAULT_CATEGORIES.length} categories`);

  // Seed blog article (upsert by slug)
  await Blog.findOneAndUpdate(
    { slug: COMPLIANCE_ARTICLE.slug },
    COMPLIANCE_ARTICLE,
    { upsert: true }
  );
  console.log("Seeded blog article: annual-compliance-calendar");

  await mongoose.disconnect();
  console.log("Done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});