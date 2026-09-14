import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import BusinessSetup from "./pages/BusinessSetup";
import CompanyRegistration from "./pages/CompanyRegistration";
import LlpRegistration from "./pages/LlpRegistration";
import IndiaEntry from "./pages/IndiaEntry";
import CorporateCompliance from "./pages/CorporateCompliance";
import FemaForeignInvestment from "./pages/FemaForeignInvestment";
import ConversionsRestructuring from "./pages/ConversionsRestructuring";
import TrademarkLegalDrafting from "./pages/TrademarkLegalDrafting";
import Trademark from "./pages/Trademark";
import LegalDrafting from "./pages/LegalDrafting";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="business-setup" element={<BusinessSetup />} />
          <Route path="company-registration" element={<CompanyRegistration />} />
          <Route path="llp-registration" element={<LlpRegistration />} />
          <Route path="india-entry" element={<IndiaEntry />} />
          <Route path="corporate-compliance" element={<CorporateCompliance />} />
          <Route path="fema-foreign-investment" element={<FemaForeignInvestment />} />
          <Route path="conversions-restructuring" element={<ConversionsRestructuring />} />
          <Route path="trademark-legal-drafting" element={<TrademarkLegalDrafting />} />
          <Route path="trademark" element={<Trademark />} />
          <Route path="legal-drafting" element={<LegalDrafting />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogArticle />} />
          <Route path="faq" element={<Faq />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}