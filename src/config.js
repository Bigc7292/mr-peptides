// Replace with real contact handles when going live
export const WHATSAPP_NUMBER = '447868771804'
export const TELEGRAM_HANDLE = 'mrpeptides'

export const waLink = (message = '') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const tgLink = `https://t.me/${TELEGRAM_HANDLE}`
