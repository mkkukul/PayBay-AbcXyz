# SpendProof v2 - Spending Immune System

Native language: English (default). 9 languages: English, Türkçe, Français, Español, Deutsch, Italiano, العربية, Português, Русский.

## VS Code'da çalıştırma / Run in VS Code

1. Zip'i açın / Unzip
2. VS Code'da klasörü açın / Open folder in VS Code
3. Terminalde:
```
npm install
npm run dev
```
4. Tarayıcıda açın: http://localhost:5173

## Yapı / Structure
- index.html -> tek sayfa uygulama
- src/main.js -> tüm mantık: ihtiyaç, tüketim, skor, pazar, simülatör, kapılar, PayPal mock, kanıt, receipt
- src/i18n.js -> 9 dil çevirisi
- src/style.css -> tasarım

## Özellikler
- 5N1K Need Card, tüketim hızı, İhtiyaç Kanıtı Skoru
- Pazar tahtası, kanal karşılaştırma, muadil
- Pişmanlık simülatörü
- 3 kapı (Mandate, Satıcı, Stok), Authorize -> Capture/Void
- Kanıt tablosu, Receipt, Kurtarılan para
- Dil seçici, Arapça RTL
- PayPal gerçek bağlantı için src/main.js içinde paypal.ts bölümüne Client ID ekleyin, şu an demo mock kullanıyor.
