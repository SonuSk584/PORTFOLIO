import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
export default function SectionHeading({ title }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } },
      { rootMargin: '0px 0px -15% 0px' }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="mb-10 overflow-hidden">
      <motion.h2
        initial={{ y: '110%', opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="font-mono text-3xl font-semibold md:text-4xl"
      ><span className="text-ac">~/</span>{title}</motion.h2>
    </div>
  )
}