import { motion } from 'framer-motion'
import { STACKS } from '../data/products'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.25,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
}

export default function Stacks() {
  return (
    <section
      id="stacks"
      data-testid="stacks-section"
      className="relative py-24 md:py-32 bg-[#0A0A0A] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">
            Stacks Guide
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Goal-based combinations
          </h2>
          <p className="text-zinc-400 mt-4 text-base leading-relaxed">
            Goal-based combinations researchers reach for most — including the
            “Wolverine Stack” (BPC-157 + TB-500) for rapid-repair models.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-3 gap-5"
        >
          {STACKS.map((s, i) => (
            <motion.article
              key={s.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
              className="group relative overflow-hidden bg-[#050505] border border-white/10 hover:border-accent/40 transition-colors duration-500 spotlight-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={s.image}
                  alt={`${s.title} stack`}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700"
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
