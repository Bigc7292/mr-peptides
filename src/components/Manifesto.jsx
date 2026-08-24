import { motion } from 'framer-motion'
import { FlaskConical, Thermometer, BadgeCheck } from 'lucide-react'
import { CHAPTERS } from '../data/products'

const ICONS = [FlaskConical, Thermometer, BadgeCheck]

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-white/10 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 md:mb-20 max-w-2xl">
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
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CHAPTERS.map((ch, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={ch.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#050505] border border-white/10 hover:border-white/20 p-6 md:p-8 transition-colors duration-500"
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
        </div>
      </div>
    </section>
  )
}
