import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { waLink } from '../config'

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25 },
  },
}

function ProductCard({ p }) {
  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.article
      key={p.id}
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
      className="group relative bg-[#0A0A0A] border border-white/10 hover:border-[#EA580C]/60 transition-colors duration-500 flex flex-col spotlight-card"
    >
      {(p.images && p.images.length > 0) && (
        <div className="w-full h-48 bg-black border-b border-white/10 overflow-hidden">
          <motion.img
            src={p.images[0]}
            alt={p.name}
            className="w-full h-full object-contain mix-blend-normal"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          />
        </div>
      )}
      {p.images && p.images.length > 1 && (
        <div className="grid grid-cols-4 gap-1 p-1 bg-black border-b border-white/10">
          {p.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="aspect-square bg-black overflow-hidden">
              <motion.img
                src={img}
                alt={`${p.name} ${idx + 2}`}
                className="w-full h-full object-contain"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>
      )}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="text-[10px] font-mono text-zinc-600 tracking-wider">
              {p.code}
            </span>
            <div className="flex gap-1.5">
              {p.tags.includes('Featured') && (
                <span className="text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5">
                  Featured
                </span>
              )}
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 border border-white/10 px-2 py-0.5">
                {p.category}
              </span>
            </div>
          </div>
        <h3 className="text-base font-bold leading-snug mb-1.5 group-hover:text-accent transition-colors">
          {p.name}
        </h3>
        <p className="text-xs text-zinc-500 mb-3 font-mono">{p.spec}</p>
        <p className="text-sm text-zinc-400 leading-relaxed flex-1">
          {p.blurb}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider text-zinc-500 bg-white/5 px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
        <motion.a
          href={waLink(`Hi MR PEPTIDES — I'd like pricing for ${p.name} (${p.code}).`)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="w-full py-2.5 text-xs uppercase tracking-wider border border-white/15 hover:border-accent hover:text-accent transition-colors text-center glow-border"
        >
          Request Price
        </motion.a>
      </div>
    </motion.article>
  )
}

export default function Products({ onRequestPrice }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = filter === 'All' || p.category === filter
      const q = query.toLowerCase()
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.blurb.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [filter, query])

  return (
    <section
      id="products"
      data-testid="products-section"
      className="relative py-24 md:py-32 bg-[#050505] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">
              Products
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Research compounds
            </h2>
            <p className="text-zinc-500 text-sm mt-2">
              {filtered.length} compounds shown · Pricing on request via
              WhatsApp or Telegram
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3" data-testid="products-filters">
            <input
              type="search"
              placeholder="Search compounds…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-[#0A0A0A] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent/50 w-full sm:w-56"
            />
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-2 text-[11px] uppercase tracking-wider border transition-colors ${
                    filter === c
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured product banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 p-6 md:p-8 border border-accent/30 bg-accent/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10" />
          <div className="relative flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3">
              <img
                src="/products/main-product.jpg"
                alt="Featured Product"
                className="w-full h-48 object-contain"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent border border-accent/30 px-3 py-1">
                Featured Product
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mt-3 mb-2">
                Retatrutide Triple Agonist
              </h3>
              <p className="text-zinc-400 text-sm mb-4 max-w-xl">
                Our flagship compound. Triple agonist targeting GLP-1, GIP and glucagon receptors 
                for advanced weight-management research. 56-day room-temperature stability with 
                Janoshik-verified purity. Alluvi Healthcare manufactured.
              </p>
              <a
                href={waLink("Hi MR PEPTIDES — I'd like pricing for Retatrutide Triple Agonist (RP-02).")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-accent text-black text-sm font-semibold uppercase tracking-wider hover:bg-orange-500 transition-colors glow-border"
              >
                Request Pricing
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-zinc-500 py-16">
            No compounds match your filters.
          </p>
        )}

        {/* Research disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          data-testid="research-disclaimer"
          className="mt-16 border border-white/10 bg-[#0A0A0A] p-6 flex gap-4 items-start"
        >
          <div className="w-1 h-full min-h-[48px] bg-accent shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
              Research Use Only
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              All compounds listed are supplied strictly for laboratory and
              in-vitro research purposes. They are not for human or veterinary
              consumption, not medicines, and have not been evaluated or
              approved by the FDA, EMA, or any other regulatory authority.
              Buyer assumes full responsibility for compliance with local laws.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
