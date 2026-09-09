import { useRef, useState } from "react";

export function Accordion({ children }) {
  return <div className="acc">{children}</div>;
}

/**
 * A single FAQ row. Each item toggles independently (matches the original
 * initAccordion(), which never closes sibling items), animating open/closed
 * via max-height, same as the original inline style manipulation.
 */
export function AccordionItem({ question, children }) {
  const [open, setOpen] = useState(false);
  const ansRef = useRef(null);

  const toggle = () => setOpen((o) => !o);

  return (
    <div className={"acc__item" + (open ? " open" : "")}>
      <button className="acc__q" aria-expanded={open} onClick={toggle}>
        {question}
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
