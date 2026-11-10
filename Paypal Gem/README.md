# AgentSpend Pro 🚀
> Autonomous Multi-Language Smart Shopping and Financial Decision Agent with PayPal Sandbox Integration

AgentSpend Pro is a FinTech decision intelligence system that acts as an autonomous shopping advisor. It evaluates purchase requests using a **5N1K (5W1H) behavioral assessment framework**, tracks asset prices using **Stock Market-style Dip & Peak financial intelligence**, surfaces **Smart Alternative Equivalents**, and executes secure checkout via the **PayPal Sandbox API** (`/v2/checkout/orders`).

---

## 🌟 Key Features

1. **Multi-Language Support (9 Languages Dynamic)**
   - 🇬🇧 English (`en`)
   - 🇹🇷 Türkçe (`tr`)
   - 🇪🇸 Español (`es`)
   - 🇫🇷 Français (`fr`)
   - 🇩🇪 Deutsch (`de`)
   - 🇮🇹 Italiano (`it`)
   - 🇵🇹 Português (`pt`)
   - 🇷🇺 Русский (`ru`)
   - 🇸🇦 العربية (`ar` with full RTL layout support)

2. **5N1K (5W1H) Behavioral Scoring & Rationality Assessment**
   - **What (Ne / Quoi / Was):** Utility, durability, and asset lifecycle analysis.
   - **Why (Neden / Pourquoi / Warum):** Impulse & FOMO bias detection vs genuine functional need.
   - **Who (Kim / Qui / Wer):** Budget impact and household capital allocation.
   - **When (Ne zaman / Quand / Wann):** Timing compared to cyclical discount periods.
   - **Where (Nerede / Où / Wo):** Retailer spread and pricing arbitrage.
   - **How (Nasıl / Comment / Wie):** Capital allocation and buyer protection strategy.

3. **Stock Market-Style Needs & Market Intelligence Engine**
   - Generates simulated 30-day historical pricing ticker curves with support (Dip) and resistance (Peak) bands.
   - Identifies if the target purchase is at a **Dip** (Value Buy) or **Peak** (Overpriced / Wait).
   - Generates automated verdicts:
     - `STRONG BUY (Market Dip)`
     - `BUY (Fair Value)`
     - `WAIT & WATCH (Near Peak)`
     - `CONSIDER ALTERNATIVES`

4. **Smart Alternative Equivalents**
   - Recommends 3 strategic alternatives (Value Pick, Budget Saver, Certified Refurbished) with immediate savings calculation and one-click selection.

5. **PayPal Sandbox Checkout Integration**
   - Implements PayPal Orders API v2 (`/v2/checkout/orders` and `/v2/checkout/orders/{id}/capture`).
   - Supports live sandbox authentication via OAuth 2.0 client credentials.
   - Includes transparent fallback simulation mode when placeholder credentials are used, allowing immediate end-to-end testing without blocking setup.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, `node-fetch` (v2), `dotenv`
- **Frontend:** Vanilla HTML5, Modern CSS3 with Flexbox & Grid, Vanilla JS Canvas Ticker Chart, RTL support
- **Payment Gateway:** PayPal Sandbox API (`https://api-m.sandbox.paypal.com`)

---

## 🚀 Getting Started

### 1. Installation
Clone or navigate to the repository directory and install dependencies:
```bash
npm install
```

### 2. Configuration (.env)
Create or verify your `.env` file in the project root:
```env
PORT=3000
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_secret
PAYPAL_API=https://api-m.sandbox.paypal.com
```

> **Note:** If you do not have PayPal Sandbox credentials yet, leave the default placeholders in place. AgentSpend Pro will automatically run in sandbox simulation mode so you can test all features and workflows immediately.

### 3. Running the Server
```bash
# Start production server
npm start

# Or run with auto-reload (Node.js 18+)
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 🧪 Testing Scenarios

1. **High-Value Product Dip Test:**
   - Product: `Sony WH-1000XM5 Headphones`
   - Price: `$349`
   - Motivation: `Remote work focus, old pair broken`
   - Urgency: `High`
   - Outcome: High Necessity score, recommendation to purchase or review value pick.

2. **Impulse / Peak Price Test:**
   - Product: `Specialty Espresso Machine`
   - Price: `$590`
   - Motivation: `Saw an ad on social media, looks cool`
   - Urgency: `Low`
   - Outcome: Low necessity score, detected FOMO bias, recommendation: `WAIT & WATCH` or `CONSIDER ALTERNATIVES`.

3. **Language Switch Test:**
   - Switch language selector to `Türkçe`, `Español`, or `العربية`.
   - Observe instantaneous translation of UI and analysis outputs, with directional RTL layout for Arabic.

4. **PayPal Sandbox Checkout:**
   - Click **Pay with PayPal Sandbox**.
   - Observe the order creation and order capture confirmation modal with transaction reference.

---

## 📁 Project Structure
```
Paypal Gem/
├── .env                  # Sandbox environment credentials
├── .env.example          # Environment template
├── .gitignore            # Git exclusion rules
├── package.json          # Express, dotenv, node-fetch
├── server.js             # Express server, 5N1K engine, PayPal API client
├── public/
│   ├── index.html        # Main responsive UI
│   ├── styles.css        # PayPal-themed styling & RTL support
│   └── app.js            # Client-side 9-language controller & chart
└── README.md             # Documentation
```
