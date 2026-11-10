# SpendGate: Decision Certificate for Agentic Commerce

> **"AI buys. Gates decide. Certificates prove."**
> _No certificate, no payment._

## 🚀 The Problem

In the era of Agentic Commerce, AI agents can browse and purchase items. However, letting an AI spend money freely is a massive security and compliance risk. A simple spending limit (budget) is not enough. Users need to know **WHY** a purchase was made, **IF** it was the right price, and have immutable proof of the decision.

## 💡 The Solution: SpendGate

SpendGate is a deterministic control plane that sits between the AI and the Payment Gateway (PayPal). It does not just block transactions; it forces the AI to generate an **Adversarial Decision** and a **Cryptographically Signed Decision Certificate**.

### Key Innovations:

1. **Adversarial AI Pair:** Two agents argue. The _Buyer Agent_ wants to buy; the _Devil's Advocate Agent_ finds reasons to wait (price drops, better alternatives). The deterministic gates make the final call based on these arguments.
2. **Price Option (Authorize → Wait → Capture/Void):** Instead of paying immediately, SpendGate authorizes the payment (locks funds), waits for a better market price, and captures when the price drops or voids if it increases.
3. **Immutable Decision Certificate:** Every purchase generates an `ed25519` signed JSON payload. This serves as indisputable evidence in case of a dispute or tax audit.

## 🛠️ PayPal API Mock Architecture (Important Note)

Due to regional restrictions, a live PayPal Sandbox API key could not be provisioned. To ensure the project is fully functional and reviewable, we implemented a **PayPal Mock Adapter**.
The mock strictly adheres to PayPal's Orders v2 JSON schema (`CREATED`, `AUTHORIZE`, `CAPTURE`, `VOID`).
To switch to a live sandbox, simply replace the mock functions in `src/lib/paypal.ts` with the official SDK and provide valid credentials in `.env`.

## 💻 Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Styling:** Tailwind CSS, Framer Motion
- **Icons:** Lucide React
- **I18n:** Native support for 9 languages (EN, TR, FR, ES, DE, IT, AR, PT, RU).

## 🚀 How to Run

1. `npm install`
2. `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)
4. Click **"Request Purchase"** to see the adversarial agents clash.
5. Click **"Approve & Authorize"** to open the Price Option window. Watch the price drop.
6. Click **"Capture Now"** to finalize the transaction and generate the Decision Certificate.

## 🇹🇷 Türkçe Özet

SpendGate, yapay zekanın harcamalarını kontrol eden deterministik bir katmandır. İki AI ajanını (Alıcı ve Şeytanın Avukatı) karşı karşıya getirir, fiyat opsiyonu (authorize/void) ile riski yönetir ve her işlem sonunda değiştirilemez bir "Karar Sertifikası" üretir. Sertifika yoksa ödeme yoktur.
