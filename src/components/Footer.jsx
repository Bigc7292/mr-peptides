import { motion } from 'framer-motion'
import { tgMessageLink, tgLink } from '../config'

const LINKS = [
  { id: 'manifesto', label: 'The Standard' },
  { id: 'stacks', label: 'Stacks Guide' },
  { id: 'products', label: 'Products' },
  { id: 'contact', label: 'Get Pricing' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
}

export default function Footer({ onNavigate }) {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#050505] border-t border-white/10 pt-20 pb-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <a href="#hero" onClick={() => onNavigate('hero')} className="flex items-center gap-2.5 mb-4" data-testid="footer-logo">
              <div className="w-9 h-9 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center">
                <img src="/logo.jpg" alt="MR Peptides" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold tracking-tight">
                MR<span className="text-accent">PEPTIDES</span>
              </span>
            </a>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Lab-verified research peptides. Independently tested, published
              purity, and stability numbers we stand behind.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-4">
              Navigate
            </p>
            <div className="flex flex-col gap-2.5">
              {LINKS.map((l) => (
                <motion.button
                  key={l.id}
                  data-testid={`footer-${l.id}-link`}
                  onClick={() => onNavigate(l.id)}
                  whileHover={{ x: 4, color: '#EA580C' }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="text-left text-sm text-zinc-400 transition-colors duration-300"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 mb-4">
              Reach us
            </p>
            <div className="flex flex-col gap-2.5">
              <motion.a
                href={tgMessageLink("Hi MR PEPTIDES — I'd like pricing on your products.")}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-telegram-link"
                whileHover={{ x: 4, color: '#2AABEE' }}
                transition={{ duration: 0.35 }}
                className="text-sm text-zinc-400 transition-colors"
              >
                Telegram
              </motion.a>
              <motion.a
                href={tgLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-telegram-link"
                whileHover={{ x: 4, color: '#2AABEE' }}
                transition={{ duration: 0.35 }}
                className="text-sm text-zinc-400 transition-colors"
              >
                Telegram
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between gap-4 text-xs text-zinc-600"
        >
          <p>© {new Date().getFullYear()} MR PEPTIDES. Research use only.</p>
          <p className="max-w-md sm:text-right">
            Not for human or veterinary consumption. Not evaluated by FDA, EMA
            or equivalent authorities.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
