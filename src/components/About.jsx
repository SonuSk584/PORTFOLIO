import Section from './Section'
import AboutStatement from './AboutStatement'

export default function About() {
  return (
    <Section id="about" title="about">
      <AboutStatement className="[--as-accent:#B6FF3B] [&_.as-stmt]:text-[clamp(36px,6.6vw,84px)]" />
    </Section>
  )
}