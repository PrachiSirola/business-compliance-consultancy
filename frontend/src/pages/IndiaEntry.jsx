import ServiceDetailPage from "../components/sections/ServiceDetailPage";
import { BUSINESS_SETUP_CARDS, BUSINESS_SETUP_LEAD } from "../data/businessSetupCards";

export default function IndiaEntry() {
  return (
    <ServiceDetailPage
      title="India entry"
      seoTitle="India Entry — Suits"
      seoDescription="Branch, liaison, project office or subsidiary setup in India for foreign companies."
      lead={BUSINESS_SETUP_LEAD}
      heroImage="/images/indiaentry.png"
      cards={BUSINESS_SETUP_CARDS}
    />
  );
}