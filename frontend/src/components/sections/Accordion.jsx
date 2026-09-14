import { useRef, useState } from "react";

export function Accordion({ children }) {
  return <div className="acc">{children}</div>;
}

/**
 * A single FAQ row, rendered as a bordered/shadowed card. Each item toggles
 * independently (matches the original initAccordion(), which never closes
 * sibling items), animating open/closed via max-height, same as the
 * original inline style manipulation.
 *
 * `no` is an optional number label (e.g. "01") rendered as a small badge
 * before the question — used to give the list continuous numbering across
 * multiple <Accordion> groups on the page (see Faq.jsx).
 */
export function AccordionItem({ no, question, children }) {
  const [open, setOpen] = useState(false);
  const ansRef = useRef(null);

  const toggle = () => setOpen((o) => !o);

  return (
    <div className={"acc__item" + (open ? " open" : "")}>
      <button className="acc__q" aria-expanded={open} onClick={toggle}>
        {no && <span className="acc__no">{no}</span>}
        <span className="acc__q-text">{question}</span>
      </button>
      <div
        className="acc__a"
        ref={ansRef}
        style={{ maxHeight: open ? ansRef.current?.scrollHeight ?? 1000 : 0 }}
      >
        <p>{children}</p>
      </div>
    </div>
  );
}