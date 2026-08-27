// Replace with real contact handles when going live
export const TELEGRAM_HANDLE = 'mr_peptides'

export const tgLink = `https://t.me/${TELEGRAM_HANDLE}`

export const tgMessageLink = (message = '') =>
  `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(message)}`
