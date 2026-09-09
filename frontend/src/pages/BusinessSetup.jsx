import ServiceDetailPage from "../components/sections/ServiceDetailPage";
import { BUSINESS_SETUP_CARDS, BUSINESS_SETUP_LEAD } from "../data/businessSetupCards";

export default function BusinessSetup() {
  return (
    <ServiceDetailPage
      title="Business Setup"
      seoTitle="Business Setup — Suits"
      seoDescription="Company, LLP, OPC and foreign-entity registration in India, handled end to end by CS Deepika."
      lead={BUSINESS_SETUP_LEAD}
      heroImage="/images/backgroundimagebusinesssetup.png"
      cards={BUSINESS_SETUP_CARDS}
    />
  );
}