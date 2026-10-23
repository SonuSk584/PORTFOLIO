import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import CommandPalette from './components/CommandPalette'
import { data } from './data/portfolio'

export default function App() {
  const [open, setOpen] = useState(false)
  const [proj, setProj] = useState(null)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o) }
      else if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); setOpen(true) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar onOpen={() => setOpen(true)} />
      <main>
        <Hero onOpen={() => setOpen(true)} />
        <About />
        <Projects index={proj} setIndex={setProj} />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-line py-8 font-mono text-sm text-mu"><div className="mx-auto max-w-[1120px] px-7">© {new Date().getFullYear()} {data.name}. Built with React, Vite, Tailwind and Framer Motion. Press Ctrl K to ask.</div></footer>
      <CommandPalette open={open} setOpen={setOpen} pickProject={setProj} />
    </MotionConfig>
  )
}
