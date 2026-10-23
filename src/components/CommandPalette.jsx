import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { data, sections } from '../data/portfolio'
import { ask, resolveLink } from '../lib/ask'

export default function CommandPalette({ open, setOpen, pickProject }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [typed, setTyped] = useState('')
  const inputRef = useRef(null)
  const close = () => setOpen(false)
  const go = (id) => { close(); setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50) }
  const openUrl = (u) => { close(); window.open(u, '_blank', 'noopener') }

  const items = useMemo(() => {
    const v = q.trim().toLowerCase()
    const all = [
      ...sections.map((s) => ({ g: 'Go to', t: s.label, run: () => go(s.id) })),
      ...data.projects.map((p, i) => ({ g: 'Projects', t: p.title, s: p.tags[0], run: () => { pickProject(i); go('work') } })),
      { g: 'Links', t: 'GitHub', run: () => openUrl(data.github) },
      { g: 'Links', t: 'LinkedIn', run: () => openUrl(data.linkedin) },
      { g: 'Links', t: 'Open resume', run: () => openUrl(data.resume) },
      { g: 'Links', t: 'Email me', run: () => { close(); location.href = `mailto:${data.email}` } },
    ].filter((x) => !v || x.t.toLowerCase().includes(v))
    if (v.split(' ').length > 1 || !all.length) all.unshift({ g: 'Ask Sonu', t: `Ask: "${q.trim()}"`, run: () => setAnswer(ask(q, data)) })
    return all
  }, [q])

  useEffect(() => { if (open) { setQ(''); setAnswer(null); setSel(0); setTimeout(() => inputRef.current?.focus(), 30); document.body.style.overflow = 'hidden' } else document.body.style.overflow = '' }, [open])
  useEffect(() => { setSel(0); setAnswer(null) }, [q])
  useEffect(() => {
    if (!answer) return
    setTyped(''); let i = 0
    const t = setInterval(() => { setTyped(answer.a.slice(0, ++i)); if (i >= answer.a.length) clearInterval(t) }, 14)
    return () => clearInterval(t)
  }, [answer])

  const onKey = (e) => {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % items.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + items.length) % items.length) }
    else if (e.key === 'Enter') items[sel]?.run()
  }
  let last = ''
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && close()}
          className="fixed inset-0 z-50 bg-[#050705CC] pt-[12vh] backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Command palette">
          <motion.div onKeyDown={onKey} initial={{ opacity: 0, y: -16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="mx-auto w-[min(640px,92vw)] overflow-hidden rounded-xl border border-[#2F3B33] bg-panel shadow-[0_0_80px_#B6FF3B22]">
            <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search or ask" autoComplete="off"
              placeholder="Go to a section, open a project, or ask a question" className="w-full border-b border-line bg-transparent px-6 py-5 font-mono text-base outline-none" />
            <div className="max-h-[360px] overflow-auto p-2">
              {items.map((x, i) => {
                const head = x.g !== last ? <h4 className="mx-4 mb-1 mt-2.5 text-[13px] text-mu">{x.g}</h4> : null
                last = x.g
                return (<div key={x.g + x.t}>{head}
                  <button onClick={x.run} onMouseEnter={() => setSel(i)} aria-selected={i === sel}
                    className={`flex w-full justify-between rounded-lg px-4 py-3 text-left ${i === sel ? 'bg-ac/15' : ''}`}><span>{x.t}</span><small className="text-mu">{x.s}</small></button></div>)
              })}
            </div>
            {answer && (
              <div className="border-t border-line px-6 py-5" aria-live="polite">
                <p className="mb-3.5 text-lg">{typed}</p>
                {typed.length >= answer.a.length && (
                  <div className="flex flex-wrap gap-2">
                    {answer.l.map((l) => { const h = resolveLink(l.h, data), ext = h.startsWith('http')
                      return <a key={l.t} href={h} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : { onClick: close })} className="rounded-full border border-[#2F3B33] px-3.5 py-1 text-sm text-ac hover:bg-ac/15">{l.t}</a> })}
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-5 border-t border-line px-6 py-2.5 font-mono text-xs text-mu"><span>Up/Down move</span><span>Enter select</span><span>Esc close</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
