import { useEffect, useRef, useState } from "react";

/**
 * Wraps content that should fade/slide in on scroll — equivalent to the
 * original `.reveal` class + initReveal() IntersectionObserver in main.js.
 * Once visible, the 'in' class is added and the element is unobserved
 * (matches the original "reveal once" behavior).
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["reveal", inView ? "in" : "", className].filter(Boolean).join(" ");

  return (
    <Tag ref={ref} className={cls} style={style} {...rest}>
      {children}
    </Tag>
  );
}
