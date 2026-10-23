import { useEffect, useRef, useState } from "react";
import "./AboutStatement.css";

const DEFAULT_LINES = [
  ["Curious", "by nature."],
  ["Engineer", "by choice."],
  ["Builder", "by instinct."],
];

/**
 * <AboutStatement />
 * Props: lines ([word, rest][]), className
 * Plays when scrolled into view, then repeats the signal pulse every 7s.
 */
export default function AboutStatement({ lines = DEFAULT_LINES, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const n = lines.length;
  const full = lines.map(([w, r]) => `${w} ${r}`).join(" ");

  return (
    <div
      ref={ref}
      className={`as ${seen ? "as-in" : ""} ${className}`}
      style={{ "--end": `${(0.67 + 1.34 * (n - 1)).toFixed(2)}em` }}
    >
      <h2 className="as-stmt" aria-label={full}>
        {lines.map(([w, r], i) => (
          <span
            key={w}
            className="as-ln"
            aria-hidden="true"
            style={{ "--i": i, "--t": `${(0.2 + (n > 1 ? (2.25 * i) / (n - 1) : 0)).toFixed(2)}s` }}
          >
            <i className="as-nd" />
            <span className="as-clip">
              <span className="as-tx">
                <b>{w}</b> <span className="as-m">{r}</span>
                {i === n - 1 && <i className="as-cur" />}
              </span>
            </span>
          </span>
        ))}
        <i className="as-sig" aria-hidden="true" />
      </h2>
    </div>
  );
}
