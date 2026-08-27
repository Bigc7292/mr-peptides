# MR PEPTIDES — Research Peptides Promo Site

A full rebuild of the [MR PEPTIDES](https://mr-peptides-promo.preview.emergentagent.com) frontend as a production-ready Vite + React + Tailwind site.

## Features

- Dark industrial gym aesthetic with orange (`#EA580C`) accent
- Hero with stats bar (98.32% purity, 56-day stability, 17 compounds, Janoshik)
- **The Standard** manifesto (purity / stability / third-party verification)
- Goal-based **Stacks** (Fat Loss, Muscle Growth, Cognitive Focus)
- Full **Catalog** with search + category filters (17 research compounds)
- **Contact / pricing** form that opens Telegram with a pre-filled message
- Sticky header, smooth section navigation, research-use disclaimer
- Mobile responsive

## Quick start

```bash
cd mr-peptides
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Output is in `dist/`. Deploy that folder to any static host (Vercel, Netlify, Cloudflare Pages, S3, etc.).

## Configuration

Edit `src/config.js`:

```js
export const TELEGRAM_HANDLE = 'mrpeptidesbot'
```

Update product data in `src/data/products.js`.

## Stack

- React 18 + Vite 6
- Tailwind CSS 3
- Framer Motion
- Lucide icons

## Notes

- All compounds are labeled **research use only**.
- Pricing is request-only (no cart / checkout).
- Contact form opens Telegram; no backend is required. Add an API later if you want enquiries stored in a CRM.
