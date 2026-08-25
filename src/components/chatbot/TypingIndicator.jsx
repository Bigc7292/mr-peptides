import { BRAND_COLORS } from '../config/chatbot-config'

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#1a1a1a] rounded-lg px-3 py-2 flex gap-1">
        <div
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ 
            backgroundColor: BRAND_COLORS.zinc,
            animationDelay: '0ms' 
          }}
        />
        <div
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ 
            backgroundColor: BRAND_COLORS.zinc,
            animationDelay: '150ms' 
          }}
        />
        <div
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ 
            backgroundColor: BRAND_COLORS.zinc,
            animationDelay: '300ms' 
          }}
        />
      </div>
    </div>
  )
}
