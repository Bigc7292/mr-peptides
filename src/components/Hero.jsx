import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { STATS } from '../data/products'

export default function Hero({ onNavigate }) {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(234,88,12,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(15,118,110,0.12), transparent 50%)',
        }}
      />
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-accent/40 text-accent text-[11px] uppercase tracking-[0.25em] mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Lab-verified research peptides
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="leading-[0.9] mb-6"
            >
              <span className="block text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white">
                MR
              </span>
              <span
                className="block text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter"
                style={{
                  WebkitTextStroke: '2px #EA580C',
                  color: 'transparent',
                }}
              >
                PEPTIDES
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-zinc-400 text-base sm:text-lg max-w-md leading-relaxed mb-10"
            >
              Peak-performance compounds for serious research. Independently
              tested, brutally pure, and stable long after the competition
              degrades.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              <button
                data-testid="hero-browse-products-button"
                onClick={() => onNavigate('products')}
                className="px-6 py-3.5 bg-accent text-black font-semibold text-sm uppercase tracking-wider hover:bg-orange-500 transition-colors"
              >
                Browse Products
              </button>
              <button
                data-testid="hero-request-price-button"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 border border-white/25 text-white font-semibold text-sm uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
              >
                Request Price
              </button>
            </motion.div>
          </div>

          {/* Mascot card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-accent" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-500" />

              <div className="relative w-[280px] sm:w-[340px] md:w-[380px] aspect-square bg-[#0c0c0c] border border-white/10 overflow-hidden">
                <img
                  src="/mascot.png"
                  alt="Mascot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 bg-gradient-to-t from-black/80 to-transparent">
                  <span>Swole Patrol Unit 01</span>
                  <span>Est. MMXXVI</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s) => (
              <div key={s.value} className="py-6 px-4 text-center md:text-left">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        data-testid="hero-scroll-indicator"
        onClick={() => onNavigate('manifesto')}
        className="absolute bottom-28 right-6 md:bottom-32 md:right-10 text-zinc-500 hover:text-accent transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={22} />
      </button>
    </section>
  )
}
