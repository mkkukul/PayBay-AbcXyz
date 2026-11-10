# AgentPay

**Autonomous AI Agents Paying Each Other**  
PayPal + AI Hackathon Project (Agentic Commerce)

## What is this?

AgentPay demonstrates a real **Agentic Commerce** flow:

1. User gives a task
2. **Content Agent** produces the work
3. **Design Agent** reviews and approves the work
4. Upon approval, an automatic payment is released from Content Agent → Design Agent

Currently runs with **mock PayPal** (fully working demo).  
Real PayPal Payouts API can be plugged in later when you have access.

## Supported Languages

- English
- Türkçe
- Français
- Español
- Deutsch
- Italiano
- Português
- Русский
- العربية

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Mock PayPal (ready for real integration)
- Multi-language support (i18n)

## Project Structure

```
src/
├── app/                  # Next.js app router
├── components/           # UI components
├── lib/
│   ├── agents.ts         # Content + Design agents
│   ├── mockPaypal.ts     # Payment simulation
│   └── i18n.ts           # Translations
└── types/                # TypeScript types
```

## Switching to Real PayPal

When you have PayPal Sandbox access:

1. Replace `src/lib/mockPaypal.ts` with real PayPal REST API calls (Payouts)
2. Add your `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` to `.env.local`
3. Use PayPal Webhooks for payment status

## Demo Flow (for judges)

1. Select any language
2. Enter a task (example: "Write a product description for wireless earbuds")
3. Watch Content Agent → Design Agent conversation
4. See automatic payment appear in the Payment History panel

---

Built for the **Build What's Next with PayPal and AI** Hackathon.
