import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS, CATEGORIES } from '../data/products'

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="group relative bg-[#0A0A0A] border border-white/10 hover:border-[#EA580C]/60 transition-colors duration-500 flex flex-col"
              >
                {(p.images && p.images.length > 0) && (
                  <div className="w-full h-48 bg-black border-b border-white/10 overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-normal"
                    />
                  </div>
                )}
                {p.images && p.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-1 p-1 bg-black border-b border-white/10">
                    {p.images.slice(1, 5).map((img, idx) => (
                      <div key={idx} className="aspect-square bg-black overflow-hidden">
                        <img
                          src={img}
                          alt={`${p.name} ${idx + 2}`}
                          className="w-full h-full object-contain"
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
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 border border-white/10 px-2 py-0.5">
                      {p.category}
                    </span>
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
                  <button
                    onClick={() => onRequestPrice(p.name)}
                    className="w-full py-2.5 text-xs uppercase tracking-wider border border-white/15 hover:border-accent hover:text-accent transition-colors"
                  >
                    Request Price
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-zinc-500 py-16">
            No compounds match your filters.
          </p>
        )}

        {/* Research disclaimer */}
        <div
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
        </div>
      </div>
    </section>
  )
}
