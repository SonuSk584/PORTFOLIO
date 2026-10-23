import { motion } from 'framer-motion'
// Section wrapper. The heading is a terminal path that slides up out of a mask.
export default function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-[1120px] px-7 py-24">
      {title && (
        <div className="mb-10 overflow-hidden">
          <motion.h2 initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-mono text-3xl font-semibold md:text-4xl"><span className="text-ac">~/</span>{title}</motion.h2>
        </div>
      )}
      {children}
    </section>
  )
}
