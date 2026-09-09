import ServiceDetailPage from "../components/sections/ServiceDetailPage";

const CARDS = [
  { icon: "inboundArrow", title: "FC-GPR filing", desc: "Report share allotment to foreign investors." },
  { icon: "outboundArrow", title: "FC-TRS filing", desc: "Report share transfers involving non-residents." },
  { icon: "calendarReturn", title: "FLA return", desc: "Annual foreign liabilities and assets return." },
  { icon: "globeCheck", title: "FDI compliance", desc: "Ongoing foreign direct investment compliance." },
  { icon: "globeArrowOut", title: "ODI compliance", desc: "Overseas direct investment reporting." },
];

export default function FemaForeignInvestment() {
  return (
    <ServiceDetailPage
      title="FEMA & Foreign Investment"
      seoTitle="FEMA & Foreign Investment — Suits"
      seoDescription="FC-GPR, FC-TRS, FLA, FDI and ODI filings — accurate FEMA compliance for cross-border investment."
      lead="Cross-border investment brings specific RBI and FEMA obligations. We handle the filings precisely, so your foreign investment stays fully compliant."
      heroImage="/images/fimafdi.png"
      cards={CARDS}
    />
  );
}