import { BRAND_COLORS } from '../config/chatbot-config'

const ACCENT = BRAND_COLORS.accent

export default function QuickReplies({ onSelect }) {
  const suggestions = [
    'Request pricing',
    'Product specs',
    'Shipping info',
    'Lab verification',
    'Storage guidelines'
  ]

  return (
    <div className="px-4 py-2 border-t border-white/10">
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className="text-[10px] uppercase tracking-wider px-2 py-1 border border-white/10 text-zinc-400 hover:border-accent hover:text-accent transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
