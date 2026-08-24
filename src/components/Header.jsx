import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { id: 'manifesto', label: 'Standard' },
  { id: 'stacks', label: 'Stacks' },
  { id: 'products', label: 'Products' },
  { id: 'contact', label: 'Contact' },
]

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-2xl bg-black/60 border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#hero" onClick={() => onNavigate('hero')} className="flex items-center gap-2.5 group" data-testid="header-logo">
          <div className="w-9 h-9 rounded-md overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
            <img src="/logo.jpg" alt="MR Peptides" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold tracking-tight text-white">
            MR<span className="text-accent">PEPTIDES</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => go('contact')}
            data-testid="header-get-pricing-button"
            className="text-xs uppercase tracking-[0.15em] px-4 py-2 border border-white/20 hover:border-accent hover:text-accent transition-colors"
          >
            Get Pricing
          </button>
        </nav>

        <button
          className="md:hidden p-2 text-zinc-300"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-left py-3 text-sm uppercase tracking-widest text-zinc-300 hover:text-accent"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="mt-2 text-left py-3 text-sm uppercase tracking-widest text-accent border-t border-white/10 pt-4"
            >
              Get Pricing
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
