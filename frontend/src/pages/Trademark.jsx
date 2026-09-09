import ServiceDetailPage from "../components/sections/ServiceDetailPage";
import { TRADEMARK_CARDS, TRADEMARK_LEAD } from "../data/trademarkCards";

export default function Trademark() {
  return (
    <ServiceDetailPage
      title="Trademark"
      seoTitle="Trademark — Suits"
      seoDescription="Trademark registration, objection replies and renewals — protect your brand with Suits."
      lead={TRADEMARK_LEAD}
      heroImage="/images/trademark.png"
      icon="shield"
      cards={TRADEMARK_CARDS}
    />
  );
}