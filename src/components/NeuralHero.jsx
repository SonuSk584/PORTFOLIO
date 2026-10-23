import { useEffect, useId, useMemo, useRef } from "react";
import "./NeuralHero.css";

const NS = "http://www.w3.org/2000/svg";
const ACCENT = "var(--nh-accent, #b8ff3c)";
const SEG = 950; // ms for a pulse to cross one layer gap
const DEFAULT_SKILLS = ["Python", "scikit-learn", "NLP", "Node.js", "React", "Spring Boot", "MySQL", "Docker"];
const rand = (n) => Math.floor(Math.random() * n);

/**
 * <NeuralHero avatarSrc="/me.jpg" />
 * Props: avatarSrc, initials (shown if no avatarSrc), skills (string[]), className, label
 */
export default function NeuralHero({ avatarSrc, initials = "ST.", skills = DEFAULT_SKILLS, className = "", label }) {
  const uid = useId().replace(/:/g, "");
  const layerRef = useRef(null);
  const packetsRef = useRef(null);
  const ringRef = useRef(null);
  const edgeEls = useRef({});
  const nodeEls = useRef([]);
  const labelEls = useRef([]);
  const api = useRef({});

  const layers = useMemo(() => {
    const n = skills.length;
    const spec = [
      { x: 270, n, g: n > 1 ? Math.min(56, 322 / (n - 1)) : 0 },
      { x: 410, n: 6, g: 56 },
      { x: 530, n: 5, g: 60 },
      { x: 640, n: 1, g: 0 },
    ];
    return spec.map((s) => Array.from({ length: s.n }, (_, i) => ({ x: s.x, y: 320 + (i - (s.n - 1) / 2) * s.g })));
  }, [skills.length]);

  const edges = useMemo(() => {
    const out = [];
    for (let l = 0; l < 3; l++)
      layers[l].forEach((a, i) => layers[l + 1].forEach((b, j) => out.push({ key: `${l}-${i}-${j}`, a, b })));
    return out;
  }, [layers]);

  const flows = useMemo(() => {
    const out = [];
    for (let l = 0; l < 3; l++)
      layers[l].forEach((a, i) => {
        const t = layers[l + 1].length;
        const picks = new Set();
        while (picks.size < Math.min(2, t)) picks.add(rand(t));
        picks.forEach((j) => out.push({ key: `${l}-${i}-${j}`, a, b: layers[l + 1][j], delay: -Math.random() * 2.8 }));
      });
    return out;
  }, [layers]);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layer = layerRef.current;
    const packetsG = packetsRef.current;
    const ring = ringRef.current;
    const packets = [];
    const timers = new Set();
    const edgeGlow = {};
    const nodeGlow = layers.map((L) => L.map(() => 0));
    let raf = 0;
    let alive = true;

    const later = (fn, ms) => {
      const t = setTimeout(() => { timers.delete(t); fn(); }, ms);
      timers.add(t);
    };
    const fire = (inp) => {
      if (!alive || reduce) return;
      const i = inp ?? rand(layers[0].length);
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("r", 4.5);
      dot.setAttribute("class", "nh-dot");
      dot.setAttribute("filter", `url(#${uid}-glow)`);
      packetsG.appendChild(dot);
      packets.push({ path: [[0, i], [1, rand(layers[1].length)], [2, rand(layers[2].length)], [3, 0]], dot, t: 0, seg: -1 });
    };
    const pulse = () => {
      ring.classList.remove("nh-go");
      void ring.getBoundingClientRect();
      ring.classList.add("nh-go");
    };

    api.current = {
      hover: (i) => { [0, 260, 520].forEach((d) => later(() => fire(i), d)); nodeGlow[0][i] = 1; },
      burst: () => layers[0].forEach((_, i) => later(() => { fire(i); nodeGlow[0][i] = 1; }, i * 90)),
    };

    let last = performance.now();
    let acc = 0;
    const frame = (now) => {
      const dt = Math.min(now - last, 100);
      last = now;
      acc += dt;
      if (acc > 850) { acc = 0; fire(); if (Math.random() < 0.15) fire(); }

      for (let p = packets.length - 1; p >= 0; p--) {
        const k = packets[p];
        k.t += dt;
        const s = Math.floor(k.t / SEG);
        if (s > 2) { k.dot.remove(); packets.splice(p, 1); pulse(); continue; }
        const [l, i] = k.path[s];
        const [l2, j] = k.path[s + 1];
        if (s !== k.seg) { k.seg = s; nodeGlow[l][i] = 1; edgeGlow[`${l}-${i}-${j}`] = 1; }
        const f = (k.t % SEG) / SEG;
        const e = f * f * (3 - 2 * f);
        const a = layers[l][i], b = layers[l2][j];
        k.dot.setAttribute("cx", a.x + (b.x - a.x) * e);
        k.dot.setAttribute("cy", a.y + (b.y - a.y) * e);
      }

      for (const key in edgeGlow) {
        const g = (edgeGlow[key] = Math.max(0, edgeGlow[key] - dt / 1100));
        const s = edgeEls.current[key].style;
        if (g > 0) { s.stroke = ACCENT; s.strokeOpacity = g * 0.85; s.strokeWidth = 1 + g; }
        else { s.stroke = s.strokeOpacity = s.strokeWidth = ""; delete edgeGlow[key]; }
      }
      for (let l = 0; l < 3; l++)
        layers[l].forEach((_, i) => {
          if (nodeGlow[l][i] <= 0) return;
          const g = (nodeGlow[l][i] = Math.max(0, nodeGlow[l][i] - dt / 1200));
          const el = nodeEls.current[l][i];
          const base = l ? 8 : 9;
          if (g > 0) { el.style.fill = ACCENT; el.style.fillOpacity = g * 0.9; el.style.stroke = ACCENT; el.setAttribute("r", base + g * 3); }
          else { el.style.fill = el.style.fillOpacity = el.style.stroke = ""; el.setAttribute("r", base); }
        });
      raf = requestAnimationFrame(frame);
    };

    const move = (e) => {
      layer.style.transform = `translate(${(e.clientX / innerWidth - 0.5) * -14}px, ${(e.clientY / innerHeight - 0.5) * -14}px)`;
    };
    if (!reduce) {
      raf = requestAnimationFrame(frame);
      addEventListener("pointermove", move, { passive: true });
    }
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      removeEventListener("pointermove", move);
      packetsG.replaceChildren();
    };
  }, [layers, uid]);

  const orbit = (r, cls, dots) => (
    <g className={`nh-orb ${cls}`}>
      <circle cx="640" cy="320" r={r + 5} fill="none" />
      <circle className="nh-orbit" cx="640" cy="320" r={r} />
      {dots.map(([cx, cy, dr, faint], k) => (
        <circle key={k} className="nh-dot" cx={cx} cy={cy} r={dr} opacity={faint ? 0.6 : 1} filter={faint ? undefined : `url(#${uid}-glow)`} />
      ))}
    </g>
  );

  return (
    <div className={`nh ${className}`}>
      <svg viewBox="152 140 668 360" role="img" aria-label={label ?? `Animated neural network of skills: ${skills.join(", ")}`}>
        <defs>
          <filter id={`${uid}-glow`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id={`${uid}-clip`}><circle cx="640" cy="320" r="80" /></clipPath>
        </defs>

        <g ref={layerRef} className="nh-layer">
          <g className="nh-dim">
            {edges.map((e) => (
              <line key={e.key} ref={(el) => { edgeEls.current[e.key] = el; }} className="nh-edge" x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} />
            ))}
            {flows.map((f) => (
              <line key={`f${f.key}`} className="nh-flow" style={{ animationDelay: `${f.delay.toFixed(2)}s` }} x1={f.a.x} y1={f.a.y} x2={f.b.x} y2={f.b.y} />
            ))}
            {layers.slice(0, 3).map((L, l) =>
              L.map((n, i) => (
                <circle key={`${l}-${i}`} ref={(el) => { (nodeEls.current[l] ??= [])[i] = el; }} className={`nh-node ${l ? "nh-hid" : "nh-in"}`} cx={n.x} cy={n.y} r={l ? 8 : 9} />
              ))
            )}
            {layers[0].map((n, i) => (
              <text key={i} ref={(el) => { labelEls.current[i] = el; }} className="nh-lbl" x={n.x - 22} y={n.y + 4}>{skills[i]}</text>
            ))}
            <g ref={packetsRef} />
          </g>
          {layers[0].map((n, i) => (
            <rect
              key={i}
              className="nh-hit"
              x={n.x - 140} y={n.y - 18} width="160" height="36"
              onPointerEnter={() => { labelEls.current[i].classList.add("nh-hot"); api.current.hover?.(i); }}
              onPointerLeave={() => labelEls.current[i].classList.remove("nh-hot")}
              onClick={() => api.current.hover?.(i)}
            />
          ))}
        </g>

        {orbit(140, "", [[780, 320, 3.5], [500, 320, 2, true]])}
        {orbit(164, "nh-orb2", [[640, 156, 3], [767, 424, 2, true]])}
        <circle className="nh-halo" cx="640" cy="320" r="116" />
        <circle ref={ringRef} className="nh-ring" cx="640" cy="320" r="116" />
        <circle cx="640" cy="320" r="80" className="nh-core" />
        {avatarSrc ? (
          <image href={avatarSrc} x="560" y="240" width="160" height="160" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${uid}-clip)`} />
        ) : (
          <text className="nh-initials" x="640" y="336">{initials}</text>
        )}
        <circle className="nh-hit" cx="640" cy="320" r="116" onClick={() => api.current.burst?.()} />
      </svg>
    </div>
  );
}