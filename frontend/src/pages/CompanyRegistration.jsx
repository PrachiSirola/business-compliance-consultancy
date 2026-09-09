import ServiceDetailPage from "../components/sections/ServiceDetailPage";
import { BUSINESS_SETUP_CARDS, BUSINESS_SETUP_LEAD } from "../data/businessSetupCards";

export default function CompanyRegistration() {
  return (
    <ServiceDetailPage
      title="Company registration"
      seoTitle="Company Registration — Suits"
      seoDescription="Private Limited, OPC, Public and more — company registration in India, handled end to end by CS Deepika."
      lead={BUSINESS_SETUP_LEAD}
      heroImage="/images/companyregistration.png"
      cards={BUSINESS_SETUP_CARDS}
    />
  );
}