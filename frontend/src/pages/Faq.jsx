import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import { Accordion, AccordionItem } from "../components/sections/Accordion";

export default function Faq() {
  return (
    <>
      <SEO
        title="FAQ — Suits"
        description="Answers to common questions about Suits: remote service, turnaround, FEMA/FDI, missed deadlines, who handles your work, and choosing the right structure."
      />

      <section className="pagehead">
        <div className="container">
          <Reveal className="pagehead__in">
            <p className="breadcrumb">
              <Link to="/">Home</Link> <span style={{ opacity: 0.5 }}>/</span> FAQ
            </p>
            <h1>Questions, answered</h1>
            <p className="lead">
              If you don't see what you're looking for, ask the Suits Assistant or send us a
              message.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal as="p" className="acc__group-title">
            Working with us
          </Reveal>
          <Reveal>
            <Accordion>
              <AccordionItem question="How do we work together day to day?">
                We work with clients across India and handle most things over email, call, and
                WhatsApp, with documents shared digitally. Where an in-person meeting helps, we'll
                arrange it.
              </AccordionItem>
              <AccordionItem question="Who will actually handle my work?">
                You work directly with CS Deepika. Your matter isn't passed to junior staff — she
                stays involved from the first conversation through to the final filing.
              </AccordionItem>
              <AccordionItem question="How quickly do you respond?">
                We aim to reply within one business day, and usually much sooner on WhatsApp. For
                time-sensitive filings, let us know and we'll prioritise.
              </AccordionItem>
              <AccordionItem question="Do you take one-off tasks or only retainers?">
                Both. You can engage Suits for a single registration or filing, or on an ongoing
                retainer for regular compliance — whatever suits your needs.
              </AccordionItem>
            </Accordion>
          </Reveal>

          <Reveal as="p" className="acc__group-title">
            Services
          </Reveal>
          <Reveal>
            <Accordion>
              <AccordionItem question="Do you handle FEMA and foreign investment filings?">
                Yes — this is a core strength. We handle FC-GPR, FC-TRS, FLA returns, and FDI/ODI
                compliance for cross-border investment and foreign-owned entities.
              </AccordionItem>
              <AccordionItem question="Which business structure should I choose?">
                It depends on your plans for growth, funding, and liability. Private Limited, LLP
                and OPC each suit different situations. Book a quick consultation or ask the Suits
                Assistant and we'll help you decide.
              </AccordionItem>
              <AccordionItem question="Can you help a foreign company set up in India?">
                Yes. We advise on and set up branch, liaison, and project offices as well as
                wholly-owned subsidiaries, and handle the FEMA filings that follow.
              </AccordionItem>
            </Accordion>
          </Reveal>

          <Reveal as="p" className="acc__group-title">
            Deadlines & pricing
          </Reveal>
          <Reveal>
            <Accordion>
              <AccordionItem question="I've missed a deadline — can you still help?">
                Yes. We regularly handle late filings and can assist with condonation of delay and
                compounding where applicable, to get you back on track.
              </AccordionItem>
              <AccordionItem question="How much do your services cost?">
                Fees depend on the specific service and your entity. Share your requirement and
                we'll give you a clear quote — with no hidden charges. Your first consultation is
                on us.
              </AccordionItem>
            </Accordion>
          </Reveal>

          <div className="center" style={{ marginTop: 44 }}>
            <Reveal as={Link} className="btn btn--primary" to="/contact">
              Still have a question? Get in touch
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
