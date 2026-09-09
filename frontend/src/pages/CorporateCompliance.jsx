import ServiceDetailPage from "../components/sections/ServiceDetailPage";

const CARDS = [
  { icon: "fileCheck", title: "Company annual filings", desc: "ROC annual returns and financial statements." },
  { icon: "fileStack", title: "LLP annual filings", desc: "Form 8 and Form 11, filed on time." },
  { icon: "nidhi", title: "Nidhi company compliance", desc: "Ongoing statutory filings for Nidhi companies." },
  { icon: "idCard", title: "Director KYC (DIR-3 KYC)", desc: "Keep every director's KYC current." },
  { icon: "personSwap", title: "Change in directorship", desc: "Appointments, resignations and changes." },
  { icon: "officeMove", title: "Change of registered office", desc: "Update your official address correctly." },
  { icon: "fileEdit", title: "Alteration of MOA / AOA", desc: "Amend your foundational documents." },
  { icon: "shareTransfer", title: "Share transfer & transmission", desc: "Move shares cleanly and correctly." },
  { icon: "trendUp", title: "Increase in authorised capital", desc: "Raise your capital ceiling." },
  { icon: "certificate", title: "Rights issue & private placement", desc: "Issue shares to existing or new investors." },
  { icon: "tagEdit", title: "Company / LLP name change", desc: "Rebrand your entity officially." },
  { icon: "fileX", title: "Strike-off of company or LLP", desc: "Close down an entity the proper way." },
  { icon: "magnifier", title: "Due diligence", desc: "Company due diligence and compliance health checks." },
  { icon: "clockCheck", title: "Condonation & compounding", desc: "Fix delays and defaults." },
  { icon: "barChart", title: "ESOP", desc: "Employee stock option plan setup." },
];

export default function CorporateCompliance() {
  return (
    <ServiceDetailPage
      title="Corporate Compliance"
      seoTitle="Corporate Compliance — Suits"
      seoDescription="Annual filings, event-based MCA work, and mandatory compliance — tracked so you never miss a deadline."
      lead="Stay on the right side of the Companies Act. We handle your recurring filings and every event-based change, and keep you ahead of due dates."
      heroImage="/images/annualcompliance.png"
      cards={CARDS}
    />
  );
}