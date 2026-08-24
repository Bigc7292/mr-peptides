import { motion } from 'framer-motion'
import { STACKS } from '../data/products'

export default function Stacks() {
  return (
    <section
      id="stacks"
      data-testid="stacks-section"
      className="relative py-24 md:py-32 bg-[#0A0A0A] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14 max-w-2xl">
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
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {STACKS.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative overflow-hidden bg-[#050505] border border-white/10 hover:border-accent/40 transition-colors duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.title} stack`}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-xl font-bold tracking-tight mb-1">{s.title}</h3>
                <p className="text-accent text-xs uppercase tracking-wider mb-2">
                  {s.peptides}
                </p>
                <p className="text-sm text-zinc-400">{s.benefit}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
