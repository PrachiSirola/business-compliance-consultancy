import { useEffect, useRef, useState } from "react";

/**
 * Animated number counter — equivalent to the original [data-count] elements
 * + initCounters() IntersectionObserver/requestAnimationFrame logic in main.js.
 * Only used for genuinely numeric stats; non-numeric stats (e.g. "PAN-India")
 * are rendered as plain text by the caller instead of using this component.
 */
export default function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const t0 = performance.now();
          const dur = 1200;
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            setDisplay(Math.round(target * (0.2 + 0.8 * p * (2 - p))) + suffix);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(target + suffix);
          };
          requestAnimationFrame(tick);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return (
    <span className="stat__num" ref={ref}>
      {display}
    </span>
  );
}
