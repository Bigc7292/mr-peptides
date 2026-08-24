import { motion } from 'framer-motion'
import { FlaskConical, Thermometer, BadgeCheck } from 'lucide-react'
import { CHAPTERS } from '../data/products'

const ICONS = [FlaskConical, Thermometer, BadgeCheck]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
}

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-white/10 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">
            The Standard
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Lab-verified research peptides.
            <span className="block text-zinc-500 mt-2 font-semibold text-xl sm:text-2xl">
              Third-party tested, published purity, and stability numbers we
              actually stand behind.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {CHAPTERS.map((ch, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={ch.num}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } }}
                className="group relative bg-[#050505] border border-white/10 hover:border-white/25 p-6 md:p-8 transition-colors duration-500 spotlight-card"
              >
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-xs font-mono tracking-widest"
                    style={{ color: ch.accent }}
                  >
                    {ch.num}
                  </span>
                  <Icon size={20} style={{ color: ch.accent }} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-1">
                  {ch.title}
                </h3>
                <div
                  className="text-3xl sm:text-4xl font-black tracking-tight mb-1"
                  style={{ color: ch.accent }}
                >
                  {ch.stat}
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-5">
                  {ch.statLabel}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">{ch.copy}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
