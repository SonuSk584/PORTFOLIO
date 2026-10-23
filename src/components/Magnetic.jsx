import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
// Wraps a button and pulls it slightly toward the cursor.
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} className="inline-block">
      {children}
    </motion.div>
  )
}
