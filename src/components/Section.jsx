import SectionHeading from './SectionHeading'
export default function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-[1120px] px-7 py-8 md:py-12">
      {title && <SectionHeading title={title} />}
      {children}
    </section>
  )
}