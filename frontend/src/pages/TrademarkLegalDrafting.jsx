import ServiceDetailPage from "../components/sections/ServiceDetailPage";
import { TRADEMARK_CARDS, TRADEMARK_LEAD } from "../data/trademarkCards";

export default function TrademarkLegalDrafting() {
  return (
    <ServiceDetailPage
      title="Trademark & Legal Drafting"
      seoTitle="Trademark & Legal Drafting — Suits"
      seoDescription="Trademark registration and objection replies, plus well-drafted agreements and resolutions."
      lead={TRADEMARK_LEAD}
      heroImage="/images/trademark.png"
      icon="shield"
      cards={TRADEMARK_CARDS}
    />
  );
}