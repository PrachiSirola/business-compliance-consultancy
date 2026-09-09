import ServiceDetailPage from "../components/sections/ServiceDetailPage";

const CARDS = [
  { icon: "arrowRightBox", title: "Company to LLP", desc: "Convert a company into an LLP." },
  { icon: "arrowLeftBox", title: "LLP to Company", desc: "Convert an LLP into a private company." },
  { icon: "lock", title: "Public to Private", desc: "Convert a public company to private." },
  { icon: "unlock", title: "Private to Public", desc: "Convert a private company to public." },
  { icon: "convert", title: "OPC conversions", desc: "Convert an OPC to, or from, a private/public company." },
  { icon: "fileEdit", title: "LLP agreement amendment", desc: "Update the terms of your LLP." },
];

export default function ConversionsRestructuring() {
  return (
    <ServiceDetailPage
      title="Conversions & Restructuring"
      seoTitle="Conversions & Restructuring — Suits"
      seoDescription="Company to LLP, public to private, OPC conversions and LLP agreement amendments — restructured cleanly."
      lead="As your business changes, your structure may need to change with it. We manage conversions end to end, keeping every approval and filing in order."
      heroImage="/images/conversions.png"
      cards={CARDS}
    />
  );
}