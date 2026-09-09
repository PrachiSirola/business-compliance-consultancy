import ServiceDetailPage from "../components/sections/ServiceDetailPage";
import { TRADEMARK_CARDS, TRADEMARK_LEAD } from "../data/trademarkCards";

export default function LegalDrafting() {
  return (
    <ServiceDetailPage
      title="Legal drafting"
      seoTitle="Legal Drafting — Suits"
      seoDescription="Resolutions, agreements, MOUs and shareholders' agreements, drafted well by Suits."
      lead={TRADEMARK_LEAD}
      heroImage="/images/legaldrafting.png"
      icon="shield"
      cards={TRADEMARK_CARDS}
    />
  );
}