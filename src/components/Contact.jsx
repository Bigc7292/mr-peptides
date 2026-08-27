import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { tgMessageLink, tgLink } from '../config'

export default function Contact({ selectedProduct, onProductChange }) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [product, setProduct] = useState(selectedProduct || '')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (selectedProduct) setProduct(selectedProduct)
  }, [selectedProduct])

  const tgMessage = `Hi MR PEPTIDES — I'd like pricing${
    product ? ` for ${product}` : ' on your products'
  }.${name ? ` — ${name}` : ''}${contact ? ` (${contact})` : ''}${
    message ? `\n\n${message}` : ''
  }`

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !contact.trim()) {
      setError('Add your name and a contact handle so we can reply.')
      return
    }
    setSending(true)
    window.open(tgMessageLink(tgMessage), '_blank', 'noopener,noreferrer')
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setName('')
      setContact('')
      setMessage('')
      setProduct('')
      onProductChange?.('')
      setTimeout(() => setSent(false), 4000)
    }, 600)
  }

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-white/10 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Request pricing
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-md">
              Pricing is on request. Tell us what you need and we reply fastest
              on Telegram.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href={tgMessageLink(tgMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="telegram-order-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#2AABEE]/10 border border-[#2AABEE]/30 text-[#2AABEE] text-sm font-medium hover:bg-[#2AABEE]/20 transition-colors"
              >
                <Send size={18} />
                Telegram
              </motion.a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1.5">
                Product
              </label>
              <motion.select
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                data-testid="enquiry-product-select"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value)
                  onProductChange?.(e.target.value)
                }}
                className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/50"
              >
                <option value="">General products inquiry</option>
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </motion.select>
              {product && (
                <p
                  data-testid="selected-product-label"
                  className="text-xs text-accent mt-1.5"
                >
                  Selected: {product}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1.5">
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  data-testid="enquiry-name-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent/50"
                />
              </div>
              <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1.5">
                Telegram / Email
              </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  data-testid="enquiry-contact-input"
                  type="text"
                  placeholder="@handle or number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-zinc-500 mb-1.5">
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                data-testid="enquiry-message-input"
                rows={4}
                placeholder="Quantities, shipping region, or questions…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            {sent && (
              <p className="text-sm text-emerald-400">
                Enquiry sent. We reply fastest on Telegram.
              </p>
            )}

            <motion.button
              type="submit"
              data-testid="enquiry-submit-button"
              disabled={sending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-accent text-black font-semibold text-sm uppercase tracking-wider hover:bg-orange-500 transition-colors disabled:opacity-60 glow-border"
            >
              {sending ? 'Sending…' : 'Send Enquiry'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
