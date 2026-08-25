# MR PEPTIDES AI Chatbot — Quick Start Guide

## Overview

This directory contains the complete implementation plan and starter code for the MR PEPTIDES AI chatbot. The chatbot is designed to maintain strict brand alignment with your established tone: authoritative, precise, clinical, and premium.

## Files

```
src/
├── config/
│   └── chatbot-config.ts          # System prompt, knowledge base, brand colors
├── components/
│   └── chatbot/
│       ├── ChatbotWidget.jsx      # Main widget component
│       ├── TypingIndicator.jsx    # Animated typing dots
│       └── QuickReplies.jsx       # Suggestion chips
docs/
└── AI_CHATBOT_SPECIFICATION.md   # Full technical specification
```

## Quick Setup

### 1. Install Dependencies

```bash
npm install framer-motion lucide-react
```

### 2. Add API Endpoint

Create `api/chat.ts` in your project root (Vercel Edge Function):

```typescript
import { NextRequest } from 'next/server'

export const config = { runtime: 'edge' }

export default async function handler(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are MR Assistant...' },
          ...messages
        ],
        temperature: 0.4,
        max_tokens: 500,
      })
    })

    const data = await response.json()
    return new Response(JSON.stringify({ reply: data.choices[0]?.message?.content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      reply: 'I apologize, but I am currently unable to process your request. Please contact us directly via WhatsApp.' 
    }), { status: 500 })
  }
}
```

### 3. Integrate into App

```jsx
// src/App.jsx
import ChatbotWidget from './components/chatbot/ChatbotWidget'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* ... existing components ... */}
      <ChatbotWidget />
    </div>
  )
}
```

### 4. Configure Environment Variables

Create `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_WHATSAPP_NUMBER=447868771804
```

### 5. Deploy

```bash
npm run build
npm run preview
```

## Brand Guidelines

- **Tone**: Authoritative, precise, clinical, premium
- **Colors**: Use brand colors from `chatbot-config.ts`
- **Disclaimer**: Always maintain "research use only" positioning
- **No medical claims**: Chatbot cannot make therapeutic or medical claims
- **Pricing**: Always redirect to WhatsApp for pricing inquiries

## Customization

### Update Knowledge Base

Edit `src/config/chatbot-config.ts`:

```typescript
export const KNOWLEDGE_BASE = {
  products: [
    // Add your products here
  ],
  faqs: [
    // Add your FAQs here
  ]
}
```

### Change System Prompt

Edit the `SYSTEM_PROMPT` in `src/config/chatbot-config.ts` to adjust tone, rules, and behavior.

### Modify Brand Colors

Edit `BRAND_COLORS` in `src/config/chatbot-config.ts` to match your brand palette.

## Testing

Test these scenarios:
- Pricing inquiry → Should redirect to WhatsApp
- Product specs → Should provide accurate details
- Medical claim → Should correct to research framing
- API failure → Should use fallback responses

## Support

For technical questions, refer to the full specification in `docs/AI_CHATBOT_SPECIFICATION.md`.
