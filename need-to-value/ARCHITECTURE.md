# Architecture — MVP 1.0

- Vite serves a static browser application.
- `src/main.js` contains UI, translations, sample catalogue, and local demo workflows.
- `src/style.css` contains responsive styles and Arabic RTL refinements.
- Browser `localStorage` stores needs, proposals, activity, language, and display currency.
- English (`en`) is the first-visit default; supported locale codes: `en`, `fr`, `es`, `de`, `it`, `ar`, `pt`, `ru`, `tr`.

No server, authentication, live market connector, AI provider, or payment provider is connected. Approval is a local demonstration only.
