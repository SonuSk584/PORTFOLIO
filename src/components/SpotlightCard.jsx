import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
// Card with a soft highlight that follows the cursor.
export default function SpotlightCard({ children, className = '' }) {
  const mx = useMotionValue(-200), my = useMotionValue(-200)
  const bg = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgba(182,255,59,.08), transparent 70%)`
  return (
    <div
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top) }}
      onPointerLeave={() => { mx.set(-200); my.set(-200) }}
      className={`relative overflow-hidden rounded-xl border border-line bg-panel ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative">{children}</div>
    </div>
  )
}
