import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, ExternalLink } from 'lucide-react'
import { SYSTEM_PROMPT, KNOWLEDGE_BASE, QUICK_REPLIES, BRAND_COLORS } from '../config/chatbot-config'
import { waLink } from '../config'

const ACCENT = BRAND_COLORS.accent

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Welcome to MR PEPTIDES. How can I assist with your research inquiry?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          systemPrompt: SYSTEM_PROMPT,
          knowledgeBase: KNOWLEDGE_BASE
        })
      })

      const data = await response.json()

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply || 'I apologize, but I encountered an issue. Please try again or contact us directly.',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      // Fallback to rule-based response
      const fallbackReply = getFallbackResponse(text)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date(),
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleWhatsAppRedirect = (productName) => {
    const message = productName
      ? `Hi MR PEPTIDES — I'd like pricing for ${productName}.`
      : "Hi MR PEPTIDES — I'd like pricing on your products."
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: ACCENT }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} color="#000" /> : <MessageCircle size={24} color="#000" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[600px] bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
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

            {/* Messages */}
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

            {/* Quick Replies */}
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

            {/* Input */}
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

/**
 * Fallback rule-based response system
 * Used when LLM API is unavailable
 */
export function getFallbackResponse(query: string): string {
  const lower = query.toLowerCase()

  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
    return 'Pricing is available on request via WhatsApp. Would you like me to open a chat for you?'
  }

  if (lower.includes('ship') || lower.includes('delivery') || lower.includes('shipping')) {
    return 'We ship discreetly with temperature-controlled packaging. Lead time is 3-5 business days after confirmation. Would you like more details?'
  }

  if (lower.includes('verif') || lower.includes('lab') || lower.includes('test') || lower.includes('purity')) {
    return 'All MR PEPTIDES products are independently tested. Stability checkpoints are third-party verified by Janoshik. Purity standards are published for every batch.'
  }

  if (lower.includes('store') || lower.includes('storage') || lower.includes('refrigerat')) {
    return 'Store refrigerated at 2°C to 8°C unless otherwise specified on the product label. Do not freeze.'
  }

  if (lower.includes('retatrutide')) {
    return 'Retatrutide is a triple GLP-1/GIP/glucagon agonist. Available in 20mg and 40mg prefilled pen formulations. 56-day room-temperature stability. Alluvi Healthcare manufactured. Would you like specifications or pricing?'
  }

  if (lower.includes('tirzepatide')) {
    return 'Tirzepatide is a dual GLP-1/GIP receptor agonist. Available in 40mg and 20mg formulations. For subcutaneous injection only. Store refrigerated. Would you like more details?'
  }

  if (lower.includes('bpc') || lower.includes('tb-500')) {
    return 'BPC-157 and TB-500 are recovery and repair peptides. We offer several formulations including standalone and blended products. Would you like to see the full catalog?'
  }

  return 'Thank you for your inquiry. For detailed technical questions, I recommend speaking with our team directly. Would you like me to connect you via WhatsApp?'
}
