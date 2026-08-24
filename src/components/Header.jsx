import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

const NAV = [
  { id: 'manifesto', label: 'Standard' },
  { id: 'stacks', label: 'Stacks' },
  { id: 'products', label: 'Products' },
  { id: 'contact', label: 'Contact' },
]

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
}

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
}

export default function Header({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    onNavigate(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-black/70 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 group"
          data-testid="header-logo"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-9 h-9 rounded-md overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
            <img src="/logo.jpg" alt="MR Peptides" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold tracking-tight text-white">
            MR<span className="text-accent">PEPTIDES</span>
          </span>
        </motion.a>

        <motion.nav
          className="hidden md:flex items-center gap-8"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          {NAV.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => go(item.id)}
              variants={navItemVariants}
              whileHover={{ y: -2, color: '#ffffff' }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
          <motion.button
            onClick={() => go('contact')}
            data-testid="header-get-pricing-button"
            variants={navItemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs uppercase tracking-[0.15em] px-4 py-2 border border-white/20 hover:border-accent hover:text-accent transition-colors"
          >
            Get Pricing
          </motion.button>
        </motion.nav>

        <motion.button
          className="md:hidden p-2 text-zinc-300"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          whileTap={{ scale: 0.9 }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => go(item.id)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-left py-3 text-sm uppercase tracking-widest text-zinc-300 hover:text-accent"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => go('contact')}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-2 text-left py-3 text-sm uppercase tracking-widest text-accent border-t border-white/10 pt-4"
            >
              Get Pricing
            </motion.button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
