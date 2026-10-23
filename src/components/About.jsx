import Section from './Section'
import SpotlightCard from './SpotlightCard'
import { data } from '../data/portfolio'
export default function About() {
  return (
    <Section id="about" title="about">
      <p className="mb-8 max-w-3xl text-xl text-[#CBD5CE]">{data.about}</p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.stats.map((s) => (
          <SpotlightCard key={s.l} className="p-5">
            <b className="block font-mono text-4xl font-semibold leading-none text-ac">{s.v}</b>
            <span className="mt-2 block text-sm text-mu">{s.l}</span>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  )
}
