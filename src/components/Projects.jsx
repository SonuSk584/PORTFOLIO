import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from './Section'
import { data } from '../data/portfolio'
export default function Projects({ index, setIndex }) {
  // The palette can point at a project; it glows for a moment, then clears.
  useEffect(() => { if (index != null) { const t = setTimeout(() => setIndex(null), 2400); return () => clearTimeout(t) } }, [index])
  return (
    <Section id="work" title="projects">
      <div className="grid gap-5 md:grid-cols-3">
        {data.projects.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`group flex flex-col overflow-hidden rounded-xl border bg-panel transition-colors duration-300 hover:border-ac ${index === i ? 'border-ac shadow-[0_0_40px_#B6FF3B25]' : 'border-line'}`}>
            <div className="overflow-hidden border-b border-line">
              <img src={p.image} alt={`${p.title} screenshot`} className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="font-mono text-xs font-semibold text-ac">0{i + 1} · {p.kind.toUpperCase()}</div>
              <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
              <p className="mb-4 mt-1.5 flex-1 text-[15px] text-mu">{p.blurb}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">{p.tags.map((t) => <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-xs text-mu">{t}</span>)}</div>
              <div className="flex gap-4 font-mono text-sm">
                {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ac hover:underline">live <ArrowUpRight size={14} /></a>}
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-mu hover:text-txt hover:underline">source</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
