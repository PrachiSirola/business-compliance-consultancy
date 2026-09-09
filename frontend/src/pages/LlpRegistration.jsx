import ServiceDetailPage from "../components/sections/ServiceDetailPage";
import { BUSINESS_SETUP_CARDS, BUSINESS_SETUP_LEAD } from "../data/businessSetupCards";

export default function LlpRegistration() {
  return (
    <ServiceDetailPage
      title="LLP registration"
      seoTitle="LLP Registration — Suits"
      seoDescription="Limited Liability Partnership registration in India, set up with the right agreement in place."
      lead={BUSINESS_SETUP_LEAD}
      heroImage="/images/llpregistration.png"
      cards={BUSINESS_SETUP_CARDS}
    />
  );
}