import { motion } from 'framer-motion'
import { tgMessageLink } from '../config'
import { PRODUCTS } from '../data/products'

export default function FloatingCTA() {
  const featured = PRODUCTS.find((p) => p.tags?.includes('Featured')) || PRODUCTS[0]

  return (
    <motion.a
      href={tgMessageLink(`Hi MR PEPTIDES — I'd like pricing for ${featured.name} (${featured.code}).`)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 bg-accent text-black text-sm font-semibold uppercase tracking-wider shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
      </span>
      Featured: {featured.name}
    </motion.a>
  )
}
