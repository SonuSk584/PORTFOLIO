import Section from './Section'
import { data } from '../data/portfolio'
// The skills section is drawn as a code editor showing skills.json, straight from your data.
export default function Skills() {
  const rows = Object.entries(data.skills)
  const num = (n) => <span className="mr-5 inline-block w-5 select-none text-right text-[#46544B]">{n}</span>
  return (
    <Section id="skills">
      <div className="overflow-hidden rounded-xl border border-line bg-panel">
        <div className="border-b border-line px-5 py-3 font-mono text-sm text-mu">skills.json</div>
        <div className="overflow-x-auto p-5 font-mono text-[15px] leading-9">
          <div>{num(1)}<span className="text-mu">{'{'}</span></div>
          {rows.map(([g, a], i) => (
            <div key={g} className="whitespace-nowrap">{num(i + 2)}<span className="pl-6 text-txt">"{g.toLowerCase()}"</span><span className="text-mu">: [</span>
              {a.map((s, j) => (<span key={s}><span className="cursor-default text-ac transition hover:bg-ac hover:text-ink">"{s}"</span>{j < a.length - 1 && <span className="text-mu">, </span>}</span>))}
              <span className="text-mu">]{i < rows.length - 1 ? ',' : ''}</span></div>
          ))}
          <div>{num(rows.length + 2)}<span className="text-mu">{'}'}</span></div>
        </div>
      </div>
    </Section>
  )
}
