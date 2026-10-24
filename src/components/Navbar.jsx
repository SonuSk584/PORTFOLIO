import { motion } from 'framer-motion'
import {data, sections } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { Download } from 'lucide-react'
const ids = sections.map((s) => s.id)
export default function Navbar({ onOpen }) {
  const active = useActiveSection(ids)
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-8 px-7 font-mono text-sm">
        <a href="#home" className="font-semibold text-ac">~/Sonu</a>
        <nav className="ml-auto hidden gap-7 md:flex">
          {sections.slice(1).map((s) => (
            <a key={s.id} href={`#${s.id}`} className={`relative py-1 transition-colors ${active === s.id ? 'text-ac' : 'text-mu hover:text-txt'}`}>
              {s.label}
              {active === s.id && <motion.span layoutId="nav-line" className="absolute inset-x-0 -bottom-1 h-px bg-ac" />}
            </a>
          ))}
        </nav>
        <button onClick={onOpen} className="ml-auto rounded-md border border-line px-3 py-1.5 text-mu transition hover:border-ac hover:text-txt md:ml-0">
          Ask or search <kbd className="ml-2 text-ac">Ctrl K</kbd>
        </button>
        <a href={data.resumeFile} download="Sonu_Kumar_Thakur_Resume.pdf" aria-label="Download resume"
          className="flex items-center gap-2 rounded-md bg-ac px-3 py-1.5 font-semibold text-ink transition hover:brightness-110">
          <Download size={15} /> <span className="hidden sm:inline">Resume</span>
        </a>
      </div>
    </header>
  )
}
