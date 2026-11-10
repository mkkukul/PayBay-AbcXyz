# Need to Value — Global MVP 1.0

A multilingual purchasing-intelligence prototype. English is the default language.

## Languages
English (default), French, Spanish, German, Italian, Arabic (RTL), Portuguese, Russian, Turkish.

## Run locally
Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173).

## Production build
```bash
npm run build
npm run preview
```

## Language and currency
Open Preferences in the left navigation to change language and display currency. Language and currency preferences are saved in the browser. Arabic uses right-to-left layout. English is used for first-time visits.

Currency selection changes number formatting only. It does not perform foreign-exchange conversion.

## Current product scope
This is a browser-based MVP/demo. It includes:
- Need creation and local persistence
- Sample product catalogue and comparison
- Illustrative price history and need-fit scores
- Proposal creation with a budget check
- Explicit demo approval flow
- Activity history
- Nine-language UI and Arabic RTL

It does **not** include live retailer data, live price feeds, AI model/API integration, accounts, cloud database, real orders, payment processing, delivery tracking, or production security. Sample catalogue prices are illustrative and must not be treated as real offers. Approval only changes a local demo record; it never charges or orders anything.

Demo records are stored in browser localStorage under `ntv-global-v2`.
