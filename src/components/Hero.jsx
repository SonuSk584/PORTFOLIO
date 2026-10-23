import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import NeuralHero from './NeuralHero'
import { data } from '../data/portfolio'

// The terminal "types" these commands one after another on load.
const groups = Object.entries(data.skills).slice(0, 3)
const script = [
  { cmd: 'whoami', out: data.role.toLowerCase() + ' / ml / llm' },
  { cmd: 'cat stack.json', out: '{ ' + groups.map(([g, a]) => `"${g.toLowerCase()}": "${a.slice(0, 2).join(', ')}"`).join(',\n  ') + ' }' },
  { cmd: 'status', out: data.status.toLowerCase(), hot: true },
]
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Hero({ onOpen }) {
  const [i, setI] = useState(reduce ? script.length : 0)
  const [n, setN] = useState(0)
  const [imgOk, setImgOk] = useState(true)
  useEffect(() => {
    if (i >= script.length) return
    const len = script[i].cmd.length
    const t = n < len ? setTimeout(() => setN(n + 1), i === 0 && n === 0 ? 900 : 45) : setTimeout(() => { setI(i + 1); setN(0) }, 650)
    return () => clearTimeout(t)
  }, [i, n])

  return (
    <section id="home" className="grid-bg flex min-h-screen items-center pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-12 px-7 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="mb-2 font-mono text-[15px] text-ac">// hello, world<span className="cursor">_</span></p>

          <h1 className="sr-only">{data.name}</h1>
          <p className="sr-only">{data.tagline}</p>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <NeuralHero
              avatarSrc={imgOk ? data.photo : undefined}
              className="lg:-ml-10 xl:-ml-20 [--nh-accent:#B6FF3B]"
            />
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-3.5">
            <Magnetic><a href="#work" className="inline-block rounded-md bg-ac px-6 py-3 font-bold text-ink">View work</a></Magnetic>
            <Magnetic><button onClick={onOpen} className="rounded-md border border-line px-6 py-3 transition hover:border-ac">Ask Sonu anything</button></Magnetic>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-panel font-mono text-sm shadow-[0_0_60px_#B6FF3B10]">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            {imgOk && <img src={data.photo} alt="" onError={() => setImgOk(false)} className="h-9 w-9 rounded-md border border-ac/60 object-cover" />}
            <span className="text-mu">sonu@portfolio:~</span>
          </div>
          <div className="min-h-[300px] whitespace-pre-wrap p-5 leading-[1.9] text-mu">
            {script.map((s, k) => k <= i && (
              <div key={s.cmd}>
                <div><span className="text-ac">$</span> <span className="text-txt">{k < i ? s.cmd : s.cmd.slice(0, n)}</span>{k === i && <span className="cursor">▍</span>}</div>
                {k < i && <div className={s.hot ? 'text-ac' : 'text-txt'}>{s.out}</div>}
              </div>
            ))}
            {i >= script.length && <div><span className="text-ac">$</span> <span className="cursor">▍</span></div>}
          </div>
        </div>
      </div>
    </section>
  )
}