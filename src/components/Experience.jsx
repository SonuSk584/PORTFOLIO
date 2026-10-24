import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import { data } from '../data/portfolio'
// Reads like a git log. The green line draws itself as you scroll.
function Log({ items }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })
  return (
    <div ref={ref} className="relative ml-1.5 border-l border-line">
      <motion.div style={{ scaleY }} className="absolute -left-px top-0 h-full w-px origin-top bg-ac" />
      {items.map((e) => (
        <div key={e.title + e.when} className="relative pb-9 pl-8">
          <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-ac" />
          <div className="font-mono text-sm text-ac">{e.when}</div>
          <b className="block text-[22px] font-bold">{e.title}</b>
          <span className="text-mu">{e.org}</span>
          {e.points && <ul className="mt-3 space-y-1 font-mono text-sm text-[#CBD5CE]">{e.points.map((p) => <li key={p}><span className="mr-2 text-ac">+</span>{p}</li>)}</ul>}
        </div>
      ))}
    </div>
  )
}
export default function Experience() {
  return (
    <Section id="experience" title="experience">
      <Log items={data.experience} />
      <h3 className="mb-8 mt-6 font-mono text-2xl font-semibold"><span className="text-ac">~/</span>education</h3>
      <Log items={data.education} />
      <h3 className="mb-6 mt-6 font-mono text-2xl font-semibold"><span className="text-ac">~/</span>certifications</h3>
      <div className="ml-1.5 flex flex-wrap gap-2.5 font-mono text-sm">
        {data.certifications.map((c) => <span key={c} className="rounded border border-line px-3 py-1.5 text-mu"><span className="mr-2 text-ac">✓</span>{c}</span>)}
      </div>
    </Section>
  )
}