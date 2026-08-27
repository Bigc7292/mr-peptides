/**
 * MR PEPTIDES - AI Chatbot Configuration
 * Brand-aligned tone, prompts, and knowledge base
 */

export const SYSTEM_PROMPT = `You are MR Assistant, the official AI concierge for MR PEPTIDES — a premier supplier of lab-verified research peptides.

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
4. For pricing inquiries, guide users to Telegram: "Pricing is available on request via Telegram. Would you like me to open a chat?"
5. If you don't know an answer, say: "I'll connect you with our team for precise details on that."

## RESPONSE FORMAT
- Keep responses under 150 words unless technical depth is requested
- Use bullet points for clarity
- Always end with a helpful next step or question
- Never use emojis or exclamation marks
- Always maintain professional, research-focused language`

export const KNOWLEDGE_BASE = {
  products: [
    {
      id: 'reta-20',
      name: 'Retatrutide Triple Agonist',
      code: 'RP-02',
      spec: '20MG · 20mg/3ml prefilled pen (6.66mg/ml) or 4 × 5mg',
      category: 'Metabolic',
      tags: ['GLP-1', 'GIP', 'Glucagon', 'Featured'],
      description: 'Triple agonist targeting GLP-1, GIP and glucagon receptors for advanced weight-management research. Independently tested for 56-day room-temperature stability. Alluvi Healthcare manufactured. Store refrigerated (2°C to 8°C). For subcutaneous injection only.',
      images: ['/products/main-product.jpg', '/products/retatrutide-20mg-vls-pen.jpg', '/products/retatrutide-20mg-alluvi.jpg']
    },
    {
      id: 'reta-40',
      name: 'Retatrutide Triple Agonist',
      code: 'RP-01',
      spec: '40MG · 40mg/3ml prefilled pen (13.33mg/ml) or 4 × 10mg',
      category: 'Metabolic',
      tags: ['GLP-1', 'GIP', 'Glucagon'],
      description: 'Triple agonist targeting GLP-1, GIP and glucagon receptors for advanced weight-management research. Independently tested for 56-day room-temperature stability.',
      images: ['/products/retatrutide-40mg-vls-pen.jpg', '/products/retatrutide-40mg-alluvi.jpg', '/products/retatrutide-40mg-alluvi-alt.jpg']
    }
  ],
  faqs: [
    {
      question: 'What is your shipping policy?',
      answer: 'We ship discreetly with temperature-controlled packaging. Lead time is 3-5 business days after confirmation. All shipments are tracked.'
    },
    {
      question: 'Are your products lab-verified?',
      answer: 'Yes. All products are independently tested. Stability checkpoints are third-party verified by Janoshik. Purity standards are published for every batch.'
    },
    {
      question: 'How do I request pricing?',
      answer: 'Pricing is available on request via Telegram. Would you like me to open a chat for you?'
    },
    {
      question: 'How should I store my peptides?',
      answer: 'Store refrigerated at 2°C to 8°C unless otherwise specified on the product label. Do not freeze. Allow to reach room temperature before use.'
    },
    {
      question: 'Are these for human consumption?',
      answer: 'No. All compounds are supplied strictly for laboratory and in-vitro research purposes. They are not for human or veterinary consumption, not medicines, and have not been evaluated or approved by the FDA, EMA, or any other regulatory authority.'
    }
  ],
  policies: {
    researchUseOnly: true,
    notForHumanConsumption: true,
    fdaApproved: false,
    thirdPartyTested: true,
    independentVerification: 'Janoshik'
  }
}

export const QUICK_REPLIES = [
  'Request pricing',
  'Product specifications',
  'Shipping information',
  'Lab verification details',
  'Storage guidelines'
]

export const BRAND_COLORS = {
  black: '#000000',
  ink: '#050505',
  surface: '#0A0A0A',
  white: '#FFFFFF',
  zinc: '#71717A',
  accent: '#EA580C',
  teal: '#0F766E',
  blue: '#2563EB'
}
