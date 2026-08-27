import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '../../data/products'
import { QUICK_REPLIES, BRAND_COLORS } from '../../config/chatbot-config'
import { tgMessageLink } from '../../config'

const ACCENT = BRAND_COLORS.accent

const GREETING = 'Welcome to MR PEPTIDES. How can I assist with your research inquiry?'

const OFFER_TELEGRAM = 'Pricing is available on request via Telegram. Would you like me to open a chat for you?'
const OFFER_TELEGRAM_ALTS = [
  'For pricing, I can connect you directly via Telegram.',
  'I can open a Telegram chat for pricing on this product.',
  'Shall I open a Telegram chat to discuss pricing?',
]

const AFFIRMATIVES = new Set([
  'yes', 'y', 'yeah', 'yep', 'sure', 'ok', 'okay', 'please', 'please do',
  'open it', 'open', 'launch', 'go ahead', 'do it', 'connect me', 'connect',
  'sounds good', 'alright', 'certainly', 'absolutely', 'definitely',
])

const NEGATIVES = new Set([
  'no', 'n', 'nope', 'never', 'not now', 'later', 'stop', 'cancel',
])

function isAffirmative(text) {
  const lower = text.toLowerCase().trim()
  if (AFFIRMATIVES.has(lower)) return true
  if (lower.includes('yes') || lower.includes('please do') || lower.includes('open it') || lower.includes('go ahead')) return true
  return false
}

function isNegative(text) {
  const lower = text.toLowerCase().trim()
  if (NEGATIVES.has(lower)) return true
  if (lower.includes('no ') || lower === 'no') return true
  return false
}

function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function findProduct(query) {
  const lower = query.toLowerCase()
  return PRODUCTS.find((p) => {
    const hay = `${p.name} ${p.code} ${p.category} ${(p.tags || []).join(' ')}`.toLowerCase()
    return hay.includes(lower)
  })
}

function getLocalReply(query, context) {
  const lower = query.toLowerCase()

  if (context.pendingTelegram) {
    if (isAffirmative(lower)) {
      return {
        text: 'Opening Telegram now.',
        action: 'telegram',
        product: context.pendingTelegramProduct || null,
        clearContext: true,
      }
    }
    if (isNegative(lower)) {
      return {
        text: 'No problem. You can also browse the full catalog or ask about specific products, shipping, or storage.',
        clearContext: true,
      }
    }
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
    const matched = findProduct(query)
    if (matched) {
      return {
        text: choose([
          `${matched.name} (${matched.code}) pricing is available on request. Would you like me to open Telegram?`,
          OFFER_TELEGRAM,
        ]),
        action: 'pending_telegram',
        pendingTelegramProduct: matched.name,
        setPendingTelegram: true,
      }
    }
    return {
      text: choose(OFFER_TELEGRAM_ALTS),
      action: 'pending_telegram',
      setPendingTelegram: true,
    }
  }

  if (lower.includes('ship') || lower.includes('delivery') || lower.includes('shipping')) {
    return {
      text: 'We ship discreetly with temperature-controlled packaging. Lead time is 3-5 business days after confirmation. Would you like more details?',
    }
  }

  if (lower.includes('verif') || lower.includes('lab') || lower.includes('test') || lower.includes('purity')) {
    return {
      text: 'All MR PEPTIDES products are independently tested. Stability checkpoints are third-party verified by Janoshik. Purity standards are published for every batch.',
    }
  }

  if (lower.includes('store') || lower.includes('storage') || lower.includes('refrigerat')) {
    return {
      text: 'Store refrigerated at 2°C to 8°C unless otherwise specified on the product label. Do not freeze.',
    }
  }

  if (lower.includes('featured') || lower.includes('main product') || lower.includes('main')) {
    const featured = PRODUCTS.find((p) => p.tags?.includes('Featured')) || PRODUCTS[0]
    return {
      text: `Our featured product is ${featured.name} (${featured.code}). ${featured.blurb}. Would you like pricing?`,
      action: 'pending_telegram',
      pendingTelegramProduct: featured.name,
      setPendingTelegram: true,
    }
  }

  if (lower.includes('how many') || lower.includes('number of products') || lower.includes('count')) {
    return {
      text: `We currently offer ${PRODUCTS.length} research compounds across ${CATEGORIES.filter((c) => c !== 'All').join(', ')} categories.`,
    }
  }

  if (lower.includes('categories') || lower.includes('types') || lower.includes('class')) {
    const cats = CATEGORIES.filter((c) => c !== 'All')
    return {
      text: `Our catalog covers: ${cats.join(', ')}. Would you like details on a specific category?`,
    }
  }

  if (lower.includes('list all') || lower.includes('show all') || lower.includes('all products') || lower.includes('full catalog')) {
    const names = PRODUCTS.map((p) => `${p.name} (${p.code})`).join(', ')
    return {
      text: `Current catalog: ${names}. Which product would you like pricing or specifications for?`,
    }
  }

  const matched = findProduct(query)
  if (matched) {
    const imgNote = matched.images?.length ? ` Image count: ${matched.images.length}.` : ''
    return {
      text: `${matched.name} (${matched.code}) — ${matched.blurb}${imgNote} Would you like pricing?`,
      action: 'pending_telegram',
      pendingTelegramProduct: matched.name,
      setPendingTelegram: true,
    }
  }

  if (lower.includes('retatrutide')) {
    return {
      text: 'Retatrutide is a triple GLP-1/GIP/glucagon agonist. Available in 20mg and 40mg prefilled pen formulations. 56-day room-temperature stability. Alluvi Healthcare manufactured. Would you like specifications or pricing?',
      action: 'pending_telegram',
      setPendingTelegram: true,
    }
  }

  if (lower.includes('tirzepatide')) {
    return {
      text: 'Tirzepatide is a dual GLP-1/GIP receptor agonist. Available in 40mg and 20mg formulations. For subcutaneous injection only. Store refrigerated. Would you like more details?',
    }
  }

  if (lower.includes('bpc')) {
    const p = PRODUCTS.find((x) => x.name?.includes('BPC'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'BPC-157 is a recovery and repair peptide. We offer standalone and blended formulations. Would you like to see the full catalog?' }
  }

  if (lower.includes('tb-500')) {
    const p = PRODUCTS.find((x) => x.name?.includes('TB-500'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'TB-500 is a recovery peptide commonly paired with BPC-157. Would you like to see available formulations?' }
  }

  if (lower.includes('semaglutide')) {
    const p = PRODUCTS.find((x) => x.name?.includes('Semaglutide'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'Semaglutide is a GLP-1 receptor agonist. Available in prefilled pen formulations. Would you like more details?' }
  }

  if (lower.includes('nad')) {
    const p = PRODUCTS.find((x) => x.name?.includes('NAD'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'NAD+ is a vital coenzyme supporting DNA repair and cellular energy. Available in 500mg, 1000mg and 1500mg formulations. Would you like more details?' }
  }

  if (lower.includes('mots')) {
    const p = PRODUCTS.find((x) => x.name?.includes('MOTS'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'MOTS-C is a mitochondrial-derived peptide. Research-grade purity >99%. Would you like specifications?' }
  }

  if (lower.includes('ipamorelin')) {
    const p = PRODUCTS.find((x) => x.name?.includes('Ipamorelin'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'Ipamorelin is a growth-hormone secretagogue. Purity >99%. Would you like more details?' }
  }

  if (lower.includes('tesamorelin')) {
    const p = PRODUCTS.find((x) => x.name?.includes('Tesamorelin'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'Tesamorelin is a GHRH analog. Research use. Purity >99%. Would you like specifications?' }
  }

  if (lower.includes('hgh') || lower.includes('growth hormone')) {
    const p = PRODUCTS.find((x) => x.name?.includes('GenX-Tropin') || x.name?.includes('Libratropin'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'We offer several HGH/somatropin formulations. Would you like to see the full list?' }
  }

  if (lower.includes('melanotan') || lower.includes('mt2')) {
    const p = PRODUCTS.find((x) => x.name?.includes('MT2') || x.name?.includes('Melanotan'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'Melanotan II nasal spray is available in advanced formula. Would you like more details?' }
  }

  if (lower.includes('ghk') || lower.includes('copper peptide')) {
    const p = PRODUCTS.find((x) => x.name?.includes('GHK'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'GHK-CU is a copper-binding peptide studied for skin, hair and tissue remodeling. Would you like more details?' }
  }

  if (lower.includes('glow')) {
    const p = PRODUCTS.find((x) => x.name?.includes('Glow'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'Glow GHK-CU Repair Blend combines GHK-CU, BPC-157 and TB-500 for comprehensive rejuvenation research. Would you like details?' }
  }

  if (lower.includes('wolverine')) {
    const p = PRODUCTS.find((x) => x.name?.includes('Wolverine'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'Wolverine Blend is the classic repair stack: 5mg BPC-157 + 5mg TB-500. Would you like more details?' }
  }

  if (lower.includes('repair') || lower.includes('cartridge')) {
    const p = PRODUCTS.find((x) => x.name?.includes('Repair'))
    if (p) return { text: `${p.name} (${p.code}) — ${p.blurb} Would you like pricing?`, action: 'pending_telegram', pendingTelegramProduct: p.name, setPendingTelegram: true }
    return { text: 'VLS Repair+ is a dual-cartridge system with BPC-157 and TB-500. Would you like specifications?' }
  }

  if (lower.includes('purity')) {
    return { text: 'Purity standards are published for every batch. Most compounds are >99% purity. Specific certificates are available on request.' }
  }

  if (lower.includes('stability') || lower.includes('stable') || lower.includes('shelf life')) {
    return { text: 'Retatrutide formulations demonstrate 56-day room-temperature stability. Other products should be stored refrigerated at 2°C to 8°C unless otherwise specified.' }
  }

  if (lower.includes('dose') || lower.includes('dosage') || lower.includes('mg')) {
    return { text: 'Dosage varies by product and research protocol. Please refer to the product specification sheet or contact us for protocol guidance.' }
  }

  if (lower.includes('injection') || lower.includes('subcutaneous')) {
    return { text: 'All peptide solutions are for subcutaneous injection unless otherwise specified. Do not inject intravenously. Use sterile technique.' }
  }

  if (lower.includes('certificate') || lower.includes('coa') || lower.includes('third party')) {
    return { text: 'Certificates of analysis are available for independent verification. Janoshik provides third-party stability verification for applicable products.' }
  }

  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) {
    return {
      text: 'You can reach us via Telegram. Would you like me to open a chat?',
      action: 'pending_telegram',
      setPendingTelegram: true,
    }
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return { text: 'Hello. How can I assist with your research inquiry today?' }
  }

  if (lower.includes('thank')) {
    return { text: 'You are welcome. Let me know if you need product details, specifications, or pricing.' }
  }

  return {
    text: 'Thank you for your inquiry. For detailed technical questions, I recommend speaking with our team directly. Would you like me to connect you via Telegram?',
    action: 'pending_telegram',
    setPendingTelegram: true,
  }
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: GREETING,
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [context, setContext] = useState({ pendingTelegram: false, pendingTelegramProduct: null })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessages = (...msgs) => {
    setMessages((prev) => [...prev, ...msgs])
  }

  const handleSend = (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    addMessages(userMessage)
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const result = getLocalReply(text, context)

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: result.text,
        timestamp: new Date(),
      }

      addMessages(assistantMessage)
      setIsTyping(false)

      if (result.action === 'telegram') {
        const productName = result.product || ''
        const message = productName
          ? `Hi MR PEPTIDES — I'd like pricing for ${productName}.`
          : "Hi MR PEPTIDES — I'd like pricing on your products."
        window.open(tgMessageLink(message), '_blank', 'noopener,noreferrer')
      }

      setContext((prev) => ({
        pendingTelegram: result.setPendingTelegram ? true : result.clearContext ? false : prev.pendingTelegram,
        pendingTelegramProduct: result.pendingTelegramProduct || prev.pendingTelegramProduct,
      }))
    }, 600 + Math.random() * 400)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle-btn fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg md:bg-accent"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="chatbot-window fixed bottom-24 right-6 z-50 w-[380px] max-h-[600px] bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center">
                  <span className="text-xs font-black" style={{ color: ACCENT }}>MR</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">MR Assistant</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Research Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="max-w-[80%] rounded-lg px-3 py-2 text-sm"
                      style={{
                        backgroundColor: msg.role === 'user' ? ACCENT : '#1a1a1a',
                        color: msg.role === 'user' ? '#000' : '#fff'
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1a1a] rounded-lg px-3 py-2 flex gap-1">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-2 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 border border-white/10 text-zinc-400 hover:border-accent hover:text-accent transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 py-3 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend(input)
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about products..."
                  className="flex-1 bg-[#050505] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent/50"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="p-2 bg-accent text-black disabled:opacity-50 hover:opacity-80 transition-opacity"
                >
                  {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
