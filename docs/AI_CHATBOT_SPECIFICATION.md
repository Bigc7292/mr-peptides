# AI Chatbot Technical Specification & Implementation Plan
## MR PEPTIDES — Brand-Aligned Conversational Assistant

---

## 1. Executive Summary

This document outlines the architecture, integration steps, and brand-aligned configuration for deploying a professional AI chatbot on the MR PEPTIDES website. The chatbot is designed to serve as a **research assistant** and **pricing concierge** for B2B and professional buyers, maintaining the site's established tone: authoritative, lab-precise, premium, and research-first.

---

## 2. Brand Identity & Tone of Voice

### 2.1 Core Brand Attributes
| Attribute | Specification |
|-----------|---------------|
| **Brand Name** | MR PEPTIDES |
| **Tagline** | Lab-verified research peptides |
| **Positioning** | Peak-performance compounds for serious research |
| **Audience** | Laboratory researchers, professional investigators, B2B buyers |
| **Tone** | Authoritative, precise, clinical, premium, no-fluff |
| **Style Keywords** | Brutally pure, independently tested, Janoshik-verified, stable, brutal |

### 2.2 Chatbot Personality Profile

**Name:** MR Assistant  
**Role:** Research Peptide Concierge & Technical Advisor  
**Personality:** Clinical precision meets premium service. The chatbot speaks like a senior lab consultant—confident, exact, and knowledgeable—but remains accessible for pricing and availability inquiries.

### 2.3 Communication Guidelines

| Do | Don't |
|----|-------|
| Use precise scientific terminology | Use slang or overly casual language |
| Reference lab verification, stability data, and purity | Make unverified medical claims |
| State "research use only" disclaimers naturally | Use hard-sell or pressure tactics |
| Be concise and direct | Be verbose or hedging |
| Mirror the brand's accent color (#EA580C) in UI | Use foreign color palettes |
| Maintain premium, minimal aesthetic | Use cartoonish or playful elements |

### 2.4 Brand Colors for Chatbot UI

```css
--mr-black: #000000;
--mr-ink: #050505;
--mr-surface: #0A0A0A;
--mr-white: #FFFFFF;
--mr-zinc: #71717A;
--mr-accent: #EA580C;      /* Primary brand orange */
--mr-teal: #0F766E;        /* Secondary accent */
--mr-blue: #2563EB;        /* Tertiary accent */
```

---

## 3. Recommended Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     MR PEPTIDES Website                      │
│  (React + Vite + Tailwind + Framer Motion)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Chatbot Widget Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Chat UI     │  │  Message     │  │  Context Store   │  │
│  │  Component   │◄─│  Handler     │◄─│  (React State)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway / Edge Function                │
│  • Rate limiting                                             │
│  • Input sanitization                                        │
│  • Authentication (optional)                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   AI Backend Service                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  LLM Provider (OpenAI / Anthropic / Local LLM)        │ │
│  │  • System prompt injection                             │ │
│  │  • Temperature: 0.3-0.5 (precise, low creativity)     │ │
│  │  • Max tokens: 500-800                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Knowledge Base                                         │ │
│  │  • Product catalog (from products.js)                  │ │
│  │  • Pricing tiers                                         │ │
│  │  • Shipping/regulatory info                             │ │
│  │  • FAQ                                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Technology Stack Recommendations

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend Widget** | React + Framer Motion | Consistent with existing stack |
| **Chat UI Library** | Custom component (no external chat UI lib) | Full brand control, minimal footprint |
| **Backend API** | Vercel Edge Functions / Netlify Functions | Serverless, low latency, easy deployment |
| **LLM Provider** | OpenAI GPT-4o-mini / Anthropic Claude Haiku | Cost-effective, fast, good instruction following |
| **Knowledge Retrieval** | Vector DB (Pinecone / Supabase pgvector) | Semantic search over product catalog |
| **Fallback** | Rule-based keyword matching | Ensures no broken responses if LLM fails |
| **State Management** | React Context + useReducer | Lightweight, fits existing patterns |

### 3.3 Deployment Options

**Option A: Serverless (Recommended)**
- Deploy backend as Vercel Edge Functions
- Use `api/chat.ts` endpoint
- Environment variables for API keys
- Zero server management

**Option B: Local LLM (Privacy-First)**
- Use Ollama + Llama 3.1-8B or Mistral-7B
- Runs on same infrastructure
- No third-party API costs
- Requires GPU for good performance

**Option C: Hybrid**
- LLM for general queries
- Rule-based fallback for pricing/availability
- Cached responses for common questions

---

## 4. System Prompt & Brand Alignment

### 4.1 Core System Prompt

```
You are MR Assistant, the official AI concierge for MR PEPTIDES — a premier supplier of lab-verified research peptides.

## IDENTITY
- Name: MR Assistant
- Role: Research Peptide Concierge & Technical Advisor
- Organization: MR PEPTIDES
- Website: mr-peptides.com

## TONE & VOICE
- Authoritative, precise, clinical, and premium
- Speak like a senior lab consultant: confident, exact, knowledgeable
- Concise and direct — no fluff, no hedging
- Professional B2B demeanor; never casual or salesy

## CRITICAL GUIDELINES
1. Always maintain "research use only" positioning
2. Never make medical, therapeutic, or human-consumption claims
3. Reference lab verification, stability data, and purity standards when relevant
4. For pricing inquiries, guide users to WhatsApp: "Pricing is available on request via WhatsApp. Would you like me to open a chat?"
5. If you don't know an answer, say: "I'll connect you with our team for precise details on that."

## KNOWLEDGE BASE SNIPPETS
- All compounds are independently tested (Janoshik verified where applicable)
- Retatrutide: 56-day room-temperature stability
- Store refrigerated (2°C to 8°C) unless stated otherwise
- For subcutaneous injection only unless stated otherwise
- Shipping: discreet, temperature-controlled, worldwide

## RESPONSE FORMAT
- Keep responses under 150 words unless technical depth is requested
- Use bullet points for clarity
- Always end with a helpful next step or question
```

### 4.2 Tone Calibration Examples

| Scenario | Good Response | Bad Response |
|----------|---------------|--------------|
| Pricing inquiry | "Pricing is on request per our research-grade pricing policy. Shall I open a WhatsApp chat for you?" | "Hey! Our prices are super cheap, wanna buy?" |
| Product inquiry | "Retatrutide is a triple GLP-1/GIP/glucagon agonist. 40mg prefilled pen, 56-day stability at room temperature." | "It's like, really good for weight loss stuff!" |
| Shipping question | "We ship discreetly with temperature control. Lead time is 3-5 business days after confirmation." | "We ship super fast everywhere!" |
| Out of scope | "I'll connect you with our team for precise details on that." | "I don't know, maybe Google it?" |

---

## 5. Integration Implementation Plan

### 5.1 Phase 1: Foundation (Week 1)

**Step 1.1: Create Chatbot Component Structure**
```
src/
  components/
    chatbot/
      ChatbotWidget.jsx      # Main wrapper
      ChatWindow.jsx          # Message container
      MessageList.jsx         # Scrollable messages
      MessageInput.jsx        # Text input + send button
      TypingIndicator.jsx     # Animated dots
      QuickReplies.jsx        # Suggestion chips
      api/
        chat.ts               # Edge function for LLM calls
```

**Step 1.2: Build Chatbot UI Component**

```jsx
// src/components/chatbot/ChatbotWidget.jsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import ChatWindow from './ChatWindow'
import QuickReplies from './QuickReplies'
import { SYSTEM_PROMPT, KNOWLEDGE_BASE } from '../config/chatbot-config'

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
        content: data.reply,
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

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-black rounded-full flex items-center justify-center shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[600px] bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            <ChatWindow 
              messages={messages} 
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
            <QuickReplies onSelect={handleSend} />
            <MessageInput 
              value={input}
              onChange={setInput}
              onSend={handleSend}
              isTyping={isTyping}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

**Step 1.3: Create Configuration Files**

```typescript
// src/config/chatbot-config.ts

export const SYSTEM_PROMPT = `You are MR Assistant, the official AI concierge for MR PEPTIDES...` // Full prompt from Section 4.1

export const KNOWLEDGE_BASE = {
  products: [
    {
      id: 'reta-20',
      name: 'Retatrutide Triple Agonist',
      code: 'RP-02',
      spec: '20MG · 20mg/3ml prefilled pen',
      category: 'Metabolic',
      tags: ['GLP-1', 'GIP', 'Glucagon'],
      description: 'Triple agonist for advanced weight-management research...'
    },
    // ... all products from products.js
  ],
  faqs: [
    {
      question: 'What is your shipping policy?',
      answer: 'We ship discreetly with temperature control. Lead time: 3-5 business days.'
    },
    {
      question: 'Are your products lab-verified?',
      answer: 'Yes. All products are independently tested. Stability checkpoints are third-party verified by Janoshik.'
    },
    {
      question: 'How do I request pricing?',
      answer: 'Pricing is available on request via WhatsApp. Would you like me to open a chat?'
    }
  ],
  policies: {
    researchUseOnly: true,
    notForHumanConsumption: true,
    fdaApproved: false
  }
}

export const QUICK_REPLIES = [
  'Request pricing',
  'Product specifications',
  'Shipping information',
  'Lab verification details',
  'Storage guidelines'
]
```

### 5.2 Phase 2: Backend API (Week 1-2)

**Step 2.1: Vercel Edge Function**

```typescript
// api/chat.ts
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const SYSTEM_PROMPT = `...` // Import from config

export default async function handler(req: NextRequest) {
  try {
    const { messages, knowledgeBase } = await req.json()
    
    // Augment system prompt with knowledge base
    const augmentedPrompt = `${SYSTEM_PROMPT}

## CURRENT PRODUCT CATALOG
${JSON.stringify(knowledgeBase.products, null, 2)}

## FAQ KNOWLEDGE
${JSON.stringify(knowledgeBase.faqs, null, 2)}

## RESPONSE RULES
- Only use the knowledge provided above
- If asked about pricing, direct to WhatsApp
- Always include research-use-only disclaimers
- Keep responses under 150 words
`

    // Call LLM
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: augmentedPrompt },
          ...messages
        ],
        temperature: 0.4,
        max_tokens: 500,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    })

    const data = await response.json()
    const reply = data.choices[0]?.message?.content || 'I apologize, but I encountered an issue. Please try again or contact us directly.'

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ 
      reply: 'I apologize, but I am currently unable to process your request. Please contact us directly via WhatsApp.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
```

**Step 2.2: Fallback Rule-Based Engine**

```typescript
// src/utils/chatbot-fallback.ts

export function getFallbackResponse(query: string): string {
  const lower = query.toLowerCase()
  
  // Pricing
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
    return 'Pricing is available on request via WhatsApp. Would you like me to open a chat for you?'
  }
  
  // Shipping
  if (lower.includes('ship') || lower.includes('delivery') || lower.includes('shipping')) {
    return 'We ship discreetly with temperature-controlled packaging. Lead time is 3-5 business days after confirmation. Would you like more details?'
  }
  
  // Verification
  if (lower.includes('verif') || lower.includes('lab') || lower.includes('test') || lower.includes('purity')) {
    return 'All MR PEPTIDES products are independently tested. Stability checkpoints are third-party verified by Janoshik. Purity standards are published for every batch.'
  }
  
  // Storage
  if (lower.includes('store') || lower.includes('storage') || lower.includes('refrigerat')) {
    return 'Store refrigerated at 2°C to 8°C unless otherwise specified on the product label. Do not freeze.'
  }
  
  // Default
  return 'Thank you for your inquiry. For detailed technical questions, I recommend speaking with our team directly. Would you like me to connect you via WhatsApp?'
}
```

### 5.3 Phase 3: Frontend Integration (Week 2)

**Step 3.1: Integrate Chatbot into App**

```jsx
// src/App.jsx
import ChatbotWidget from './components/chatbot/ChatbotWidget'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <Preloader />
      <Header onNavigate={onNavigate} />
      <main>
        {/* ... existing sections ... */}
      </main>
      <Footer onNavigate={onNavigate} />
      <FloatingCTA />
      <ChatbotWidget /> {/* Add here */}
    </div>
  )
}
```

**Step 3.2: Add Chatbot CSS**

```css
/* src/index.css */

/* Chatbot animations */
@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chatbot-message {
  animation: messageSlideIn 0.3s ease-out;
}

/* Typing indicator */
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}

.typing-dot {
  animation: typingBounce 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }
```

---

## 6. Advanced Features

### 6.1 Context-Aware Conversations

```typescript
// Track conversation context
const conversationContext = {
  currentProduct: null,
  inquiryType: null, // 'pricing', 'technical', 'shipping', 'general'
  userEmail: null,
  hasRequestedPricing: false
}

// Update context based on user input
function updateContext(message: string) {
  if (message.toLowerCase().includes('retatrutide')) {
    conversationContext.currentProduct = 'reta-20'
  }
  if (message.toLowerCase().includes('price')) {
    conversationContext.inquiryType = 'pricing'
  }
}
```

### 6.2 Smart Quick Replies

```jsx
// Dynamic quick replies based on conversation context
const getQuickReplies = (lastMessage: string) => {
  if (lastMessage.includes('Retatrutide')) {
    return ['Request pricing', 'Specifications', 'Storage guidelines']
  }
  if (lastMessage.includes('pricing')) {
    return ['Open WhatsApp', 'View all products', 'Shipping info']
  }
  return ['Browse products', 'Request pricing', 'Lab verification']
}
```

### 6.3 WhatsApp Integration

```typescript
// Pre-formatted WhatsApp messages
export const WHATSAPP_TEMPLATES = {
  pricing: (productName: string) => 
    `Hi MR PEPTIDES — I'd like pricing for ${productName}.`,
  
  general: () => 
    `Hi MR PEPTIDES — I have a question about your products.`,
  
  technical: (question: string) => 
    `Hi MR PEPTIDES — Technical question: ${question}`
}

// Trigger WhatsApp with pre-filled message
const openWhatsApp = (template: string) => {
  window.open(waLink(template), '_blank', 'noopener,noreferrer')
}
```

---

## 7. Security & Compliance

### 7.1 Input Validation

```typescript
// Sanitize user input
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .slice(0, 500) // Limit length
    .trim()
}
```

### 7.2 Rate Limiting

```typescript
// Simple rate limiting
const rateLimiter = new Map()

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const lastRequest = rateLimiter.get(ip) || 0
  
  if (now - lastRequest < 2000) { // 2 seconds between requests
    return false
  }
  
  rateLimiter.set(ip, now)
  return true
}
```

### 7.3 Brand Safety Guardrails

- **No medical claims**: System prompt explicitly forbids therapeutic/medical language
- **Research-only positioning**: All responses include implicit or explicit "research use only" framing
- **No unauthorized commitments**: Chatbot cannot promise delivery dates, specific purity levels, or pricing
- **Human handoff**: For complex inquiries, chatbot always offers WhatsApp/Telegram connection

---

## 8. Testing & Quality Assurance

### 8.1 Test Scenarios

| Test Case | Expected Behavior |
|-----------|------------------|
| User asks for pricing | Directs to WhatsApp, no numbers shown |
| User asks about Retatrutide specs | Provides accurate product details from catalog |
| User makes medical claim | Politely corrects to research framing |
| User asks about shipping | Provides 3-5 day lead time, temperature control |
| User asks about lab verification | References Janoshik, independent testing |
| User uses profanity | Responds professionally, maintains tone |
| API fails | Falls back to rule-based responses |

### 8.2 Brand Tone Checklist

- [ ] No emojis in responses
- [ ] No exclamation marks (unless part of brand-approved copy)
- [ ] No casual language ("hey", "cool", "awesome")
- [ ] All technical terms spelled correctly
- [ ] Research-use-only disclaimers present where appropriate
- [ ] Responses under 150 words (unless technical deep-dive requested)
- [ ] No pricing numbers shown (always redirect to WhatsApp)

---

## 9. Performance & Optimization

### 9.1 Loading Strategy

```jsx
// Lazy load chatbot to avoid blocking initial render
const ChatbotWidget = lazy(() => import('./components/chatbot/ChatbotWidget'))

// In App.jsx
<Suspense fallback={null}>
  <ChatbotWidget />
</Suspense>
```

### 9.2 Caching Strategy

```typescript
// Cache frequent responses
const responseCache = new Map()

export async function getCachedResponse(query: string): Promise<string | null> {
  const key = query.toLowerCase().trim()
  if (responseCache.has(key)) {
    return responseCache.get(key)
  }
  return null
}
```

### 9.3 Bundle Size Budget

| Component | Target Size |
|-----------|-------------|
| Chatbot UI | < 15KB gzipped |
| API endpoint | < 5KB |
| Total added | < 20KB |

---

## 10. Monitoring & Analytics

### 10.1 Metrics to Track

- **Engagement**: Open rate, message count, session duration
- **Conversion**: WhatsApp click-through rate from chatbot
- **Fallback rate**: How often fallback responses are used
- **User satisfaction**: Thumbs up/down feedback
- **Common queries**: Top questions to improve knowledge base

### 10.2 Logging

```typescript
// Log anonymized interactions
interface ChatLog {
  timestamp: string
  messageLength: number
  responseTime: number
  fallbackUsed: boolean
  userSatisfaction?: number
}
```

---

## 11. Implementation Checklist

### Pre-Development
- [ ] Finalize LLM provider selection (OpenAI vs Anthropic vs Local)
- [ ] Set up API keys and environment variables
- [ ] Define knowledge base structure
- [ ] Review and approve system prompt with stakeholder

### Development
- [ ] Create chatbot component structure
- [ ] Build ChatWindow, MessageList, MessageInput components
- [ ] Implement API endpoint with LLM integration
- [ ] Add fallback rule-based engine
- [ ] Integrate WhatsApp link generation
- [ ] Apply brand styling and animations
- [ ] Add context-aware conversation logic

### Testing
- [ ] Unit tests for fallback engine
- [ ] Integration tests for API endpoint
- [ ] Brand tone review (all test responses)
- [ ] Performance testing (load time, bundle size)
- [ ] Mobile responsiveness testing

### Deployment
- [ ] Deploy API endpoint to production
- [ ] Enable chatbot in production build
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Add privacy policy / data handling notice

### Post-Launch
- [ ] Review conversation logs weekly
- [ ] Update knowledge base based on common queries
- [ ] Refine system prompt based on edge cases
- [ ] A/B test quick reply options

---

## 12. Alternative: No-Code/Low-Code Options

If rapid deployment is preferred over custom development:

| Platform | Pros | Cons |
|----------|------|------|
| **Intercom** | Fast setup, good analytics | Expensive, less brand control |
| **Drift** | Sales-focused, good UX | Higher cost, brand styling limited |
| **Custom GPT** | Easy to deploy, brand-aware | Requires OpenAI subscription, limited customization |
| **Voiceflow** | Visual builder, multi-channel | Learning curve, per-seat pricing |

**Recommendation:** For MR PEPTIDES' premium positioning and specific brand requirements, a **custom implementation** (Option A) is strongly recommended to maintain full control over tone, styling, and data handling.

---

## 13. Cost Estimates

### Development (One-Time)
| Item | Cost (USD) | Timeline |
|------|-----------|----------|
| Custom chatbot development | $3,000 - $6,000 | 2-3 weeks |
| LLM API integration | $500 - $1,000 | 3-5 days |
| Brand styling & animations | $1,000 - $2,000 | 3-5 days |
| Testing & QA | $500 - $1,000 | 2-3 days |
| **Total** | **$5,000 - $10,000** | **3-4 weeks** |

### Ongoing (Monthly)
| Item | Cost (USD) |
|------|-----------|
| LLM API (GPT-4o-mini, ~1000 conversations/mo) | $20 - $50 |
| Hosting (Vercel Edge) | $0 - $20 |
| Monitoring/logging | $0 - $10 |
| **Total** | **$20 - $80/month** |

---

## 14. Next Steps

1. **Stakeholder Review**: Present this specification and finalize tone/voice guidelines
2. **LLM Provider Selection**: Choose between OpenAI, Anthropic, or local LLM
3. **Knowledge Base Curation**: Compile product data, FAQs, and policies
4. **Development Sprint**: Execute Phase 1-3 implementation plan
5. **Brand Review**: Test all responses against tone guidelines
6. **Soft Launch**: Deploy to staging, test with internal team
7. **Production Launch**: Deploy to live site with monitoring

---

*Document Version: 1.0*  
*Last Updated: 2026-08-25*  
*Status: Draft — Pending Stakeholder Approval*
