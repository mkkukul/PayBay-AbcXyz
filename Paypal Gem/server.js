require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const PAYPAL_API = process.env.PAYPAL_API || 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================================
// 9-Language Localization Dictionary & Market Knowledge Base
// Supported: en, tr, es, fr, de, it, pt, ru, ar
// ============================================================================
const LOCALIZATION = {
  en: {
    name: 'English',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'STRONG BUY (Market Dip)',
      BUY: 'BUY (Fair Value)',
      WAIT_WATCH: 'WAIT & WATCH (Near Peak)',
      DOWNGRADE_ALTERNATIVE: 'CONSIDER ALTERNATIVES'
    },
    sentiments: {
      bullish: 'Bullish (Price Pressure High)',
      neutral: 'Stable / Neutral Range',
      bearish: 'Bearish (Price Correcting / Cooling)'
    },
    categories: {
      electronics: 'Consumer Electronics & Gadgets',
      apparel: 'Fashion & Apparel',
      home: 'Home & Kitchen Appliances',
      computing: 'Computing & Office Gear',
      lifestyle: 'Fitness & Lifestyle',
      general: 'General Merchandise'
    },
    analysisQuestions: {
      what: 'What: Asset Utility & Expected Durability',
      why: 'Why: Motivation & Emotional vs Functional Need',
      who: 'Who: Primary Beneficiary & Household Budget Impact',
      when: 'When: Timing vs Upcoming Discount Cycles',
      where: 'Where: Market Pricing Spread & Vendor Arbitrage',
      how: 'How: Capital Allocation & Cash Flow Prudence'
    }
  },
  tr: {
    name: 'Türkçe',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'GÜÇLÜ AL (Fırsat Dibi / Dip Seviye)',
      BUY: 'ALINABİLİR (Adil Değer)',
      WAIT_WATCH: 'BEKLE VE İZLE (Zirveye Yakın / Düşüş Bekle)',
      DOWNGRADE_ALTERNATIVE: 'ALTERNATİF MODELLERİ DEĞERLENDİR'
    },
    sentiments: {
      bullish: 'Yükseliş Trendi (Fiyat Baskısı Yüksek)',
      neutral: 'Yatay / Dengeli Piyasa',
      bearish: 'Düşüş Trendi (Fiyatlar Gevşiyor)'
    },
    categories: {
      electronics: 'Tüketici Elektroniği & Cihazlar',
      apparel: 'Giyim & Moda',
      home: 'Ev & Mutfak Aletleri',
      computing: 'Bilgisayar & Ofis Ekipmanları',
      lifestyle: 'Spor & Yaşam Tarzı',
      general: 'Genel İhtiyaçlar'
    },
    analysisQuestions: {
      what: 'Ne: Ürün Faydası ve Beklenen Kullanım Ömrü',
      why: 'Neden: Satın Alma Motivasyonu (Dürtüsel vs Gerçek İhtiyaç)',
      who: 'Kim: Yararlanıcı ve Bütçe Üzerindeki Yük Dağılımı',
      when: 'Ne Zaman: Zamanlama ve Yaklaşan İndirim Sezonları',
      where: 'Nerede: Satıcı Fiyat Farkları ve Arbitraj İmkânı',
      how: 'Nasıl: Ödeme Stratejisi ve Nakit Akışı Yönetimi'
    }
  },
  es: {
    name: 'Español',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'COMPRA FUERTE (Mínimo de Mercado / Suelo)',
      BUY: 'COMPRA RAZONABLE (Valor Justo)',
      WAIT_WATCH: 'ESPERAR Y OBSERVAR (Cerca del Máximo)',
      DOWNGRADE_ALTERNATIVE: 'EVALUAR ALTERNATIVAS'
    },
    sentiments: {
      bullish: 'Alcista (Presión de precios alta)',
      neutral: 'Rango Estable / Neutral',
      bearish: 'Bajista (Precios en corrección)'
    },
    categories: {
      electronics: 'Electrónica de Consumo',
      apparel: 'Ropa y Calzado',
      home: 'Hogar y Electrodomésticos',
      computing: 'Informática y Oficina',
      lifestyle: 'Fitness y Estilo de Vida',
      general: 'Artículos Generales'
    },
    analysisQuestions: {
      what: 'Qué: Utilidad del producto y vida útil',
      why: 'Por qué: Motivación (Impulso vs Necesidad Real)',
      who: 'Quién: Beneficiario e impacto en el presupuesto',
      when: 'Cuándo: Momento óptimo frente a ciclos de descuento',
      where: 'Dónde: Dispersión de precios entre distribuidores',
      how: 'Cómo: Gestión de liquidez y método de pago'
    }
  },
  fr: {
    name: 'Français',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'ACHAT FORT (Creux de Marché / Opportunité)',
      BUY: 'ACHAT RAISONNABLE (Juste Valeur)',
      WAIT_WATCH: 'ATTENDRE ET OBSERVER (Proche du Pic)',
      DOWNGRADE_ALTERNATIVE: 'ENVISAGER DES ALTERNATIVES'
    },
    sentiments: {
      bullish: 'Haussier (Forte pression sur les prix)',
      neutral: 'Stable / Zone Neutre',
      bearish: 'Baissier (Correction des prix en cours)'
    },
    categories: {
      electronics: 'Électronique Grand Public',
      apparel: 'Mode et Habillement',
      home: 'Maison et Électroménager',
      computing: 'Informatique et Bureau',
      lifestyle: 'Sport et Bien-être',
      general: 'Produits Généraux'
    },
    analysisQuestions: {
      what: 'Quoi: Utilité de l\'actif et durée de vie prévue',
      why: 'Pourquoi: Motivation (Impulsion vs Réel besoin)',
      who: 'Qui: Bénéficiaire et impact sur la trésorerie',
      when: 'Quand: Calendrier d\'achat face aux soldes à venir',
      where: 'Où: Écart de prix et comparaison des vendeurs',
      how: 'Comment: Allocation de capital et discipline financière'
    }
  },
  de: {
    name: 'Deutsch',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'STARKER KAUF (Markttief / Schnäppchen)',
      BUY: 'KAUFEN (Fairer Wert)',
      WAIT_WATCH: 'ABWARTEN & BEOBACHTEN (Nahe Kurshoch)',
      DOWNGRADE_ALTERNATIVE: 'ALTERNATIVEN PRÜFEN'
    },
    sentiments: {
      bullish: 'Bullisch (Hoher Preisdruck)',
      neutral: 'Seitwärts / Ausgeglichen',
      bearish: 'Bärisch (Preiskorrektur im Gange)'
    },
    categories: {
      electronics: 'Unterhaltungselektronik',
      apparel: 'Mode & Kleidung',
      home: 'Haushalt & Küche',
      computing: 'IT & Büroausstattung',
      lifestyle: 'Fitness & Lifestyle',
      general: 'Allgemeine Waren'
    },
    analysisQuestions: {
      what: 'Was: Nutzen des Gutes und Nutzungsdauer',
      why: 'Warum: Kaufmotivation (Impulskauf vs. Notwendigkeit)',
      who: 'Wer: Begünstigter und Budgetauswirkung',
      when: 'Wann: Timing im Vergleich zu bevorstehenden Rabatttagen',
      where: 'Wo: Händlerpreise und Arbitragechancen',
      how: 'Wie: Liquiditätsmanagement und Zahlungsweise'
    }
  },
  it: {
    name: 'Italiano',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'ACQUISTO FORTE (Minimo di Mercato / Ribasso)',
      BUY: 'ACQUISTA (Valore Equo)',
      WAIT_WATCH: 'ATTENDI E MONITORA (Vicino ai Massimi)',
      DOWNGRADE_ALTERNATIVE: 'VALUTA ALTERNATIVE'
    },
    sentiments: {
      bullish: 'Ralzista (Pressione sui prezzi)',
      neutral: 'Stabile / Laterale',
      bearish: 'Ribassista (Prezzi in calo)'
    },
    categories: {
      electronics: 'Elettronica di Consumo',
      apparel: 'Abbigliamento e Moda',
      home: 'Casa ed Elettrodomestici',
      computing: 'Informatica e Ufficio',
      lifestyle: 'Sport e Benessere',
      general: 'Beni Generici'
    },
    analysisQuestions: {
      what: 'Cosa: Utilità ed effettiva durabilità del bene',
      why: 'Perché: Impulso emotivo vs reale necessità',
      who: 'Chi: Beneficiario e impatto sul budget familiare',
      when: 'Quando: Tempistica rispetto a sconti stagionali',
      where: 'Dove: Differenziale di prezzo tra rivenditori',
      how: 'Come: Sostenibilità finanziaria e gestione cassa'
    }
  },
  pt: {
    name: 'Português',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'COMPRA FORTE (Fundo de Mercado / Oportunidade)',
      BUY: 'COMPRAR (Preço Justo)',
      WAIT_WATCH: 'AGUARDAR E MONITORAR (Perto do Pico)',
      DOWNGRADE_ALTERNATIVE: 'AVALIAR ALTERNATIVAS'
    },
    sentiments: {
      bullish: 'Alta (Pressão compradora forte)',
      neutral: 'Estável / Equilibrado',
      bearish: 'Baixa (Preços em recuo / correção)'
    },
    categories: {
      electronics: 'Eletrônicos de Consumo',
      apparel: 'Moda e Vestuário',
      home: 'Casa e Eletrodomésticos',
      computing: 'Informática e Escritório',
      lifestyle: 'Saúde e Estilo de Vida',
      general: 'Produtos em Geral'
    },
    analysisQuestions: {
      what: 'O quê: Utilidade real e durabilidade estimada',
      why: 'Por quê: Motivação emocional vs necessidade estrita',
      who: 'Quem: Beneficiário e impacto no orçamento mensal',
      when: 'Quando: Momento de compra vs ciclos de liquidação',
      where: 'Onde: Dispersão de preços entre lojas',
      how: 'Como: Fluxo de caixa e planejamento financeiro'
    }
  },
  ru: {
    name: 'Русский',
    dir: 'ltr',
    verdicts: {
      STRONG_BUY: 'УВЕРЕННАЯ ПОКУПКА (Ценовое дно / Скидка)',
      BUY: 'МОЖНО ПОКУПАТЬ (Справедливая цена)',
      WAIT_WATCH: 'ВЫЖДАТЬ И СЛЕДИТЬ (Пиковая цена)',
      DOWNGRADE_ALTERNATIVE: 'РАССМОТРЕТЬ АЛЬТЕРНАТИВЫ'
    },
    sentiments: {
      bullish: 'Бычий тренд (Цены перегреты)',
      neutral: 'Нейтральный диапазон',
      bearish: 'Медвежий тренд (Цены снижаются)'
    },
    categories: {
      electronics: 'Потребительская электроника',
      apparel: 'Одежда и обувь',
      home: 'Товары для дома и кухни',
      computing: 'Компьютеры и оргтехника',
      lifestyle: 'Спорт и активный отдых',
      general: 'Общие товары'
    },
    analysisQuestions: {
      what: 'Что: Полезность актива и расчетный срок службы',
      why: 'Зачем: Эмоциональный порыв против реальной нужды',
      who: 'Кто: Конечный пользователь и влияние на бюджет',
      when: 'Когда: Выбор времени перед сезонами скидок',
      where: 'Где: Разброс цен у продавцов и арбитраж',
      how: 'Как: Оптимизация денежного потока и способ оплаты'
    }
  },
  ar: {
    name: 'العربية',
    dir: 'rtl',
    verdicts: {
      STRONG_BUY: 'شراء قوي (قاع سعري / فرصة ممتازة)',
      BUY: 'شراء مناسب (سعر عادل)',
      WAIT_WATCH: 'انتظر وراقب (قريب من الذروة السعرية)',
      DOWNGRADE_ALTERNATIVE: 'دراسة البدائل الاقتصادية'
    },
    sentiments: {
      bullish: 'اتجاه صاعد (ضغط أسعار مرتفع)',
      neutral: 'نطاق مستقر / محايد',
      bearish: 'اتجاه هابط (تصحيح وتراجع في الأسعار)'
    },
    categories: {
      electronics: 'الإلكترونيات والأجهزة الذكية',
      apparel: 'الأزياء والملابس',
      home: 'مستلزمات المنزل والمطبخ',
      computing: 'أجهزة الكمبيوتر ومعدات العمل',
      lifestyle: 'اللياقة البدنية وأسلوب الحياة',
      general: 'منتجات عامة'
    },
    analysisQuestions: {
      what: 'ماذا: المنفعة الحقيقية والعمر الافتراضي للمنتج',
      why: 'لماذا: الدافع للشراء (رغبة عاطفية أم حاجة فعلية)',
      who: 'من: المستفيد وتأثير ذلك على الميزانية الإجمالية',
      when: 'متى: التوقيت مقارنة بمواسم التخفيضات القادمة',
      where: 'أين: مقارنة الأسعار بين المتاجر وتوفر العروض',
      how: 'كيف: إدارة السيولة المالية وطريقة الدفع السليمة'
    }
  }
};

// ============================================================================
// 5N1K (5W1H) & Stock-Market Intelligence Engine
// ============================================================================
function generateMarketAnd5N1KAnalysis({ item, category, price, currency, reason, urgency, language }) {
  const lang = LOCALIZATION[language] ? language : 'en';
  const loc = LOCALIZATION[lang];
  const numPrice = parseFloat(price) || 100;
  const userReason = (reason || '').trim().toLowerCase();
  const userUrgency = urgency || 'medium'; // low, medium, high

  // Deterministic seed based on item name and price for consistent historical charts
  const seedString = `${item || 'gadget'}_${category || 'electronics'}`.toLowerCase();
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  const pseudoRandom = (offset = 0) => {
    const x = Math.sin(hash + offset) * 10000;
    return x - Math.floor(x);
  };

  // 1. Simulate 30-Day Historical Stock-style Price Ticker
  const baseFairValue = Math.round(numPrice * (0.92 + pseudoRandom(1) * 0.18));
  const volatility = 0.04 + pseudoRandom(2) * 0.07; // 4% to 11% volatility
  const priceHistory = [];
  let currentSimPrice = Math.round(baseFairValue * (0.95 + pseudoRandom(3) * 0.1));

  for (let day = 30; day >= 1; day--) {
    const dayNoise = (pseudoRandom(day * 13) - 0.48) * volatility;
    currentSimPrice = Math.max(10, Math.round(currentSimPrice * (1 + dayNoise)));
    priceHistory.push({
      day: `T-${day}d`,
      price: currentSimPrice
    });
  }
  // Ensure the latest point matches current entered price
  priceHistory[priceHistory.length - 1].price = Math.round(numPrice);

  const pricesOnly = priceHistory.map(p => p.price);
  const minPrice = Math.min(...pricesOnly);
  const maxPrice = Math.max(...pricesOnly);
  const avgPrice = Math.round(pricesOnly.reduce((a, b) => a + b, 0) / pricesOnly.length);

  // Price position in 30-day range (0 = at absolute dip, 1 = at absolute peak)
  const priceRange = maxPrice - minPrice || 1;
  const priceDipRatio = (numPrice - minPrice) / priceRange; // 0 (bottom) to 1 (top)
  const discountFromAvg = Math.round(((avgPrice - numPrice) / avgPrice) * 100);

  // 2. 5N1K Scoring & Behavioral Heuristics
  let necessityScore = 55; // baseline out of 100
  let emotionalScore = 40; // 0 = rational, 100 = impulse/FOMO

  // Evaluate reason keywords
  const impulseWords = ['sale', 'discount', 'fomo', 'want', 'bored', 'trending', 'hype', 'cool', 'indirim', 'istek', 'oferta', 'envie', 'rabatt'];
  const needWords = ['broken', 'work', 'job', 'replace', 'essential', 'study', 'health', 'bozuk', 'tamir', 'iş', 'okul', 'sağlık', 'travail', 'arbeit', 'urgente'];

  impulseWords.forEach(w => {
    if (userReason.includes(w)) {
      necessityScore -= 12;
      emotionalScore += 20;
    }
  });

  needWords.forEach(w => {
    if (userReason.includes(w)) {
      necessityScore += 18;
      emotionalScore -= 15;
    }
  });

  if (userUrgency === 'high') {
    necessityScore += 10;
  } else if (userUrgency === 'low') {
    necessityScore -= 8;
  }

  // Adjust for extreme pricing
  if (numPrice > 1000) necessityScore -= 5;
  if (priceDipRatio < 0.25) necessityScore += 12; // Solid dip incentive

  necessityScore = Math.max(10, Math.min(98, necessityScore));
  emotionalScore = Math.max(5, Math.min(95, emotionalScore));

  // 3. Stock Market Verdict & Recommendation
  let verdictKey = 'BUY';
  let marketSentiment = 'neutral';

  if (priceDipRatio <= 0.28 && discountFromAvg > 5) {
    verdictKey = necessityScore >= 45 ? 'STRONG_BUY' : 'BUY';
    marketSentiment = 'bearish'; // prices are down/cooling, creating a buying dip
  } else if (priceDipRatio >= 0.78 || discountFromAvg < -10) {
    verdictKey = necessityScore < 70 ? 'WAIT_WATCH' : 'DOWNGRADE_ALTERNATIVE';
    marketSentiment = 'bullish'; // overbought/peak
  } else {
    if (necessityScore < 40) {
      verdictKey = 'DOWNGRADE_ALTERNATIVE';
    } else {
      verdictKey = 'BUY';
    }
    marketSentiment = 'neutral';
  }

  // 4. Localized 5N1K Detailed Insights
  const n1kAnalysis = generate5N1KDetails(lang, {
    item,
    category,
    price: numPrice,
    currency,
    reason: userReason,
    necessityScore,
    emotionalScore,
    priceDipRatio,
    avgPrice,
    discountFromAvg,
    loc
  });

  // 5. Generate 3 Tailored Alternative Equivalents
  const alternatives = generateAlternatives(lang, {
    item,
    category,
    price: numPrice,
    currency
  });

  return {
    item,
    category,
    price: numPrice,
    currency: currency || 'USD',
    timestamp: new Date().toISOString(),
    language: lang,
    necessityScore,
    emotionalScore,
    verdictKey,
    verdictText: loc.verdicts[verdictKey],
    marketSentimentKey: marketSentiment,
    marketSentimentText: loc.sentiments[marketSentiment],
    metrics: {
      currentPrice: numPrice,
      thirtyDayAverage: avgPrice,
      thirtyDayLow: minPrice,
      thirtyDayHigh: maxPrice,
      discountFromAvg,
      dipRatioPercentage: Math.round(priceDipRatio * 100),
      isAtDip: priceDipRatio <= 0.3,
      isAtPeak: priceDipRatio >= 0.75
    },
    priceHistory,
    n1kAnalysis,
    alternatives
  };
}

function generate5N1KDetails(lang, ctx) {
  const { item, price, currency, necessityScore, emotionalScore, discountFromAvg, priceDipRatio, loc } = ctx;
  const isDip = priceDipRatio < 0.35;
  const isPeak = priceDipRatio > 0.7;

  const responses = {
    en: {
      what: `Evaluation of "${item}" (${currency} ${price}): Evaluated as a mid-to-high capital commitment with an estimated functional lifecycle of 24-36 months. Depreciation rate is standard for this asset class.`,
      why: emotionalScore > 50 
        ? `Warning: Detected high emotional/impulse bias (${emotionalScore}% FOMO index). Consider applying a strict 48-hour cooling-off rule before execution.`
        : `Rational justification verified. The primary motivation aligns with functional productivity and tangible utility.`,
      who: `Direct personal utility asset. Estimated budget impact is manageable if it represents less than 8% of monthly discretionary surplus.`,
      when: isDip 
        ? `Ideal Market Timing! The item is trading near its 30-day structural dip (${discountFromAvg > 0 ? discountFromAvg + '% below' : 'close to'} historical average).`
        : isPeak 
        ? `Sub-optimal timing: Current price is situated in the upper 25% percentile (near peak). Waiting 2-4 weeks for seasonal sale events is advised.`
        : `Moderate timing: Trading within the neutral fair value corridor.`,
      where: `Global sandbox scan indicates standard vendor pricing. Consider secondary certified outlets or refurbished channels for additional savings.`,
      how: `Execute checkout via PayPal Sandbox with Buyer Protection enabled. Recommend paying in full without high-interest installment leverage.`
    },
    tr: {
      what: `"${item}" Değerlendirmesi (${currency} ${price}): 24-36 ay ortalama kullanım ömrüne sahip bir harcama kalemi olarak sınıflandırıldı. Amortisman ve fayda dengesi izlendi.`,
      why: emotionalScore > 50
        ? `Dikkat: Yüksek dürtüsel harcama/FOMO eğilimi tespit edildi (%${emotionalScore}). Satın almadan önce 48 saatlik soğuma kuralını uygulamanız tavsiye edilir.`
        : `Rasyonel gerekçe onaylandı. Satın alma amacı verimlilik ve doğrudan kullanım ihtiyacına dayanıyor.`,
      who: `Bireysel kullanım odaklı harcama. Aylık serbest bütçenin %10'undan azını kapsıyorsa finansal dengeyi sarsmaz.`,
      when: isDip
        ? `Mükemmel Zamanlama! Ürün son 30 günün dip seviyesinde işlem görüyor (Ortalamanın %${Math.abs(discountFromAvg)} altında).`
        : isPeak
        ? `Zamanlama Uyarısı: Ürün fiyatı son 30 günün zirvesine yakın (%75+ tepe bölgesi). İndirim döngülerini beklemek mantıklıdır.`
        : `Dengeli Zamanlama: Fiyat şu an piyasa ortalaması civarında seyrediyor.`,
      where: `Pazar analizi farklı satıcılar arasında sınırlı marj olduğunu gösteriyor. Güvenli PayPal altyapısı tercih edilmelidir.`,
      how: `Ödemeyi PayPal Koruması ile tek çekim veya bütçeyi zorlamayacak sıfır faizli planla tamamlayın.`
    },
    es: {
      what: `Evaluación de "${item}" (${currency} ${price}): Clasificado como bien de consumo con ciclo útil estimado de 24 a 36 meses.`,
      why: emotionalScore > 50
        ? `Alerta: Sesgo impulsivo detectado (${emotionalScore}% índice FOMO). Aplique la regla de enfriamiento de 48 horas.`
        : `Justificación racional verificada. La necesidad se basa en utilidad real y productividad.`,
      who: `Gasto de uso personal. Impacto presupuestario admisible si no supera el 10% del margen mensual libre.`,
      when: isDip
        ? `¡Momento óptimo! El precio se encuentra en zona de soporte/mínimo mensual.`
        : isPeak
        ? `Momento poco favorable: Cotiza en la banda superior de precios. Se recomienda paciencia.`
        : `Momento neutro: Cotización dentro del rango promedio esperado.`,
      where: `Revisión de distribuidores: Margen comercial estándar. Se recomienda compra con protección PayPal.`,
      how: `Liquidación directa mediante PayPal con protección al comprador.`
    },
    fr: {
      what: `Évaluation de "${item}" (${currency} ${price}) : Durée de vie estimée entre 24 et 36 mois selon l'usage.`,
      why: emotionalScore > 50
        ? `Attention : Facteur émotionnel ou impulsionnel élevé (${emotionalScore}%). Respectez un délai de réflexion de 48h.`
        : `Motivation rationnelle confirmée. Achat centré sur la valeur d'usage réelle.`,
      who: `Usage individuel. Impact financier sain si inférieur à 10% de votre épargne disponible.`,
      when: isDip
        ? `Opportunité de marché ! Prix situé dans le creux des 30 derniers jours.`
        : isPeak
        ? `Période défavorable : Prix situé dans le quartile supérieur (proche du pic).`
        : `Période neutre : Prix aligné sur la valeur moyenne observée.`,
      where: `Disponibilité stable sur les plateformes agréées.`,
      how: `Finalisation sécurisée via PayPal Sandbox avec garantie acheteur.`
    },
    de: {
      what: `Bewertung von "${item}" (${currency} ${price}): Standard-Konsumgut mit einer geschätzten Nutzungsdauer von 2-3 Jahren.`,
      why: emotionalScore > 50
        ? `Warnung: Hoher Impulskauf-Faktor erkannt (${emotionalScore}%). Bitte 48-Stunden-Regel beachten.`
        : `Rationale Begründung verifiziert. Funktionale Nutzung steht im Vordergrund.`,
      who: `Persönliche Anschaffung. Budgetverträglich bei < 10% des monatlichen Spielraums.`,
      when: isDip
        ? `Idealer Kaufzeitpunkt! Notiert im 30-Tage-Tiefbereich.`
        : isPeak
        ? `Ungünstiger Zeitpunkt: Kurs befindet sich nahe dem 30-Tage-Höchststand.`
        : `Neutraler Zeitpunkt: Entspricht dem gewichteten Marktdurchschnitt.`,
      where: `Vergleichbare Konditionen im Markt. Abwicklung über PayPal empfohlen.`,
      how: `Sichere Zahlung über PayPal Sandbox mit Käuferschutz.`
    },
    it: {
      what: `Valutazione di "${item}" (${currency} ${price}): Ciclo vitale stimato in 2-3 anni.`,
      why: emotionalScore > 50
        ? `Avviso: Rilevata tendenza all'acquisto d'impulso (${emotionalScore}%). Consigliata riflessione di 48 ore.`
        : `Acquisto motivato da utilità pratica e razionale.`,
      who: `Spesa individuale con impatto contenuto sul budget mensile.`,
      when: isDip
        ? `Ottima finestra temporale: Prezzo situato sui minimi a 30 giorni.`
        : isPeak
        ? `Tempistica sconsigliata: Il prodotto è vicino ai massimi del periodo.`
        : `Fase neutra: Allineato alla media storica di mercato.`,
      where: `Distribuzione regolare, pagamento protetto consigliato.`,
      how: `Transazione garantita tramite checkout PayPal Sandbox.`
    },
    pt: {
      what: `Análise de "${item}" (${currency} ${price}): Bem de consumo com vida útil estimada de 24 a 36 meses.`,
      why: emotionalScore > 50
        ? `Atenção: Risco de compra por impulso detectado (${emotionalScore}%). Recomendado aguardar 48h.`
        : `Justificativa sólida e alinhada à real utilidade prática.`,
      who: `Benefício primário individual. Impacto equilibrado no orçamento.`,
      when: isDip
        ? `Momento favorável! Preço situado no fundo do gráfico de 30 dias.`
        : isPeak
        ? `Momento desfavorável: Cotação no topo do gráfico recente.`
        : `Momento equilibrado: Próximo à média justa de mercado.`,
      where: `Comércio eletrônico consolidado, recomenda-se checkout verificado.`,
      how: `Pagamento seguro via PayPal Sandbox com proteção ao consumidor.`
    },
    ru: {
      what: `Оценка товара "${item}" (${currency} ${price}): Ожидаемый срок службы актива составляет 2-3 года.`,
      why: emotionalScore > 50
        ? `Предостережение: Высокий фактор спонтанной покупки (${emotionalScore}%). Рекомендуется пауза 48 часов.`
        : `Покупка рационально обоснована практической необходимостью.`,
      who: `Индивидуальное пользование. Рекомендуемый предел: не более 10% месячного свободного дохода.`,
      when: isDip
        ? `Отличный момент! Цена находится вблизи локального 30-дневного минимума.`
        : isPeak
        ? `Неудачный момент: Цена находится в верхней зоне (вблизи пика). Рекомендуется подождать.`
        : `Нейтральный момент: Цена на уровне средней справедливой стоимости.`,
      where: `Стандартные рыночные каналы с защитой платежа PayPal.`,
      how: `Безопасная оплата через шлюз PayPal Sandbox с гарантией покупателя.`
    },
    ar: {
      what: `تقييم "${item}" (${currency} ${price}): تصنيف المنتج كسلعة ذات عمر تشغيلي يتراوح بين سنتين إلى 3 سنوات.`,
      why: emotionalScore > 50
        ? `تنبيه: مؤشر الشراء الاندفاعي مرتفع (${emotionalScore}%). يوصى بتطبيق قاعدة التهدئة لمدة 48 ساعة قبل الشراء.`
        : `مبرر شرائي سليم قائم على المنفعة الوظيفية والضرورة العملية.`,
      who: `منفعة شخصية مباشرة ذات تأثير متوازن ضمن الميزانية الشهرية الفائضة.`,
      when: isDip
        ? `توقيت ممتاز للشراء! السعر يلامس القاع الشهري ومناسب جداً للاقتناص.`
        : isPeak
        ? `توقيت غير مفضل: السعر يقترب من أعلى قمة خلال 30 يوماً. من الأفضل الانتظار.`
        : `توقيت معتدل: السعر يدور حول المتوسط العادل للسوق.`,
      where: `مقارنة السوق تشير إلى توافره بأسعار متقاربة. ينصح بالشراء المحمي عبر PayPal.`,
      how: `إتمام الشراء بصورة آمنة عبر بوابة PayPal Sandbox مع تفعيل حماية المشتري.`
    }
  };

  const selected = responses[lang] || responses.en;
  return {
    what: { title: loc.analysisQuestions.what, text: selected.what },
    why: { title: loc.analysisQuestions.why, text: selected.why },
    who: { title: loc.analysisQuestions.who, text: selected.who },
    when: { title: loc.analysisQuestions.when, text: selected.when },
    where: { title: loc.analysisQuestions.where, text: selected.where },
    how: { title: loc.analysisQuestions.how, text: selected.how }
  };
}

function generateAlternatives(lang, { item, price, currency }) {
  const valuePrice = Math.round(price * 0.75);
  const budgetPrice = Math.round(price * 0.45);
  const refurbPrice = Math.round(price * 0.60);

  const labels = {
    en: {
      valueTitle: 'Best Value Equivalent',
      valueDesc: 'Offers ~88% of core features at 25% lower investment cost.',
      budgetTitle: 'Budget Essential Alternative',
      budgetDesc: 'Covers essential utility needs with maximum capital preservation.',
      refurbTitle: 'Certified Refurbished / Eco Pick',
      refurbDesc: 'Grade-A renewed model with official warranty and highest savings ratio.'
    },
    tr: {
      valueTitle: 'Fiyat / Performans Lideri',
      valueDesc: 'Ana fonksiyonların %88\'ini %25 daha düşük maliyetle sunar.',
      budgetTitle: 'Bütçe Dostu Temel Model',
      budgetDesc: 'Temel ihtiyacı karşılar, nakit tasarrufunu maksimize eder.',
      refurbTitle: 'Garantili Yenilenmiş / Eko Seçim',
      refurbDesc: 'Yetkili servis garantili A-Grade yenilenmiş ürün, yüksek tasarruf.'
    },
    es: {
      valueTitle: 'Mejor Relación Calidad-Precio',
      valueDesc: 'Mismas funciones clave con 25% de ahorro en el coste.',
      budgetTitle: 'Alternativa Económica Esencial',
      budgetDesc: 'Cubre la necesidad primaria con el menor impacto financiero.',
      refurbTitle: 'Reacondicionado Certificado',
      refurbDesc: 'Producto grado A con garantía oficial y precio reducido.'
    },
    fr: {
      valueTitle: 'Meilleur Rapport Qualité/Prix',
      valueDesc: 'Offre 88% des performances avec une économie immédiate de 25%.',
      budgetTitle: 'Alternative Économique Essentielle',
      budgetDesc: 'Répond au besoin principal tout en préservant votre trésorerie.',
      refurbTitle: 'Reconditionné Certifié',
      refurbDesc: 'Qualité certifiée avec garantie complète et empreinte carbone réduite.'
    },
    de: {
      valueTitle: 'Preis-Leistungs-Sieger',
      valueDesc: 'Bietet die Kernfunktionen bei 25% geringeren Anschaffungskosten.',
      budgetTitle: 'Budget-Alternative',
      budgetDesc: 'Erfüllt den Hauptzweck bei maximaler Schonung der Liquidität.',
      refurbTitle: 'Zertifiziert Generalüberholt',
      refurbDesc: 'A-Ware mit offizieller Händlergarantie und deutlicher Ersparnis.'
    },
    it: {
      valueTitle: 'Miglior Rapporto Qualità/Prezzo',
      valueDesc: 'Garantisce l\'88% delle prestazioni con un risparmio del 25%.',
      budgetTitle: 'Alternativa Economica Base',
      budgetDesc: 'Copre le necessità primarie proteggendo il budget.',
      refurbTitle: 'Ricondizionato Garantito',
      refurbDesc: 'Pari al nuovo con garanzia ufficiale e massimo risparmio.'
    },
    pt: {
      valueTitle: 'Melhor Custo-Benefício',
      valueDesc: 'Entrega as funcionalidades principais com 25% de economia.',
      budgetTitle: 'Alternativa Econômica Essencial',
      budgetDesc: 'Atende à necessidade central com impacto mínimo no saldo.',
      refurbTitle: 'Recondicionado Certificado',
      refurbDesc: 'Grau A com garantia do fabricante e máxima economia.'
    },
    ru: {
      valueTitle: 'Оптимальное соотношение цена/качество',
      valueDesc: 'Предоставляет до 88% функционала при экономии 25% бюджета.',
      budgetTitle: 'Бюджетный базовый аналог',
      budgetDesc: 'Закрывает основные задачи при минимальных затратах.',
      refurbTitle: 'Сертифицированный Refurbished',
      refurbDesc: 'Восстановленный оригинал класса А с официальной гарантией.'
    },
    ar: {
      valueTitle: 'الخيار الأفضل قيمة مقابل السعر',
      valueDesc: 'يقدم 88% من المواصفات الأساسية مع توفير 25% من التكلفة.',
      budgetTitle: 'البديل الاقتصادي الأساسي',
      budgetDesc: 'يلبي الاحتياج الأساسي مع الحفاظ الأقصى على السيولة النقدية.',
      refurbTitle: 'مجدد معتمد مع ضمان رسمي',
      refurbDesc: 'جهاز مجدد فئة أ (Grade-A) بضمان معتمد وتوفير مالي كبير.'
    }
  };

  const l = labels[lang] || labels.en;
  return [
    {
      id: 'alt_value',
      type: 'value',
      name: `${item} Pro Value Edition`,
      price: valuePrice,
      savings: Math.round(price - valuePrice),
      currency,
      title: l.valueTitle,
      description: l.valueDesc
    },
    {
      id: 'alt_budget',
      type: 'budget',
      name: `${item} Lite / Smart Equivalent`,
      price: budgetPrice,
      savings: Math.round(price - budgetPrice),
      currency,
      title: l.budgetTitle,
      description: l.budgetDesc
    },
    {
      id: 'alt_refurb',
      type: 'refurb',
      name: `${item} Certified Refurbished`,
      price: refurbPrice,
      savings: Math.round(price - refurbPrice),
      currency,
      title: l.refurbTitle,
      description: l.refurbDesc
    }
  ];
}

// ============================================================================
// PayPal Sandbox API Integration (Orders API v2)
// ============================================================================
async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET || PAYPAL_CLIENT_ID === 'your_sandbox_client_id') {
    return null; // Signals sandbox simulation fallback mode
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    const errText = await response.text();
    console.warn('[PayPal Auth Warning] Could not obtain token from Sandbox:', errText);
    return null;
  }

  const data = await response.json();
  return data.access_token;
}

// ============================================================================
// API Routes
// ============================================================================

// 1. Configuration & Status Route
app.get('/api/config', (req, res) => {
  const isConfigured = Boolean(
    PAYPAL_CLIENT_ID && 
    PAYPAL_CLIENT_SECRET && 
    PAYPAL_CLIENT_ID !== 'your_sandbox_client_id'
  );

  res.json({
    paypalClientId: isConfigured ? PAYPAL_CLIENT_ID : 'SANDBOX_DEMO_CLIENT',
    isSandboxConfigured: isConfigured,
    paypalApi: PAYPAL_API,
    supportedLanguages: Object.keys(LOCALIZATION).map(k => ({
      code: k,
      name: LOCALIZATION[k].name,
      dir: LOCALIZATION[k].dir
    }))
  });
});

// 2. 5N1K & Market Intelligence Analysis Endpoint
app.post('/api/analyze', (req, res) => {
  try {
    const { item, category, price, currency, reason, urgency, language } = req.body;
    if (!item || !price) {
      return res.status(400).json({ error: 'Item name and price are required.' });
    }

    const analysisResult = generateMarketAnd5N1KAnalysis({
      item,
      category,
      price,
      currency: currency || 'USD',
      reason,
      urgency,
      language: language || 'en'
    });

    res.json(analysisResult);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Internal error generating financial intelligence.' });
  }
});

// 3. PayPal Order Creation Endpoint (/v2/checkout/orders)
app.post('/api/paypal/create-order', async (req, res) => {
  try {
    const { amount, currency = 'USD', itemName = 'AgentSpend Pro Purchase', description = 'Smart Agent Verified Checkout' } = req.body;
    const cleanAmount = (parseFloat(amount) || 10).toFixed(2);

    const token = await getPayPalAccessToken();

    // Live Sandbox API Call
    if (token) {
      const orderPayload = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: `ASP_${Date.now()}`,
            description: description.substring(0, 127),
            amount: {
              currency_code: currency.toUpperCase(),
              value: cleanAmount
            },
            items: [
              {
                name: itemName.substring(0, 127),
                quantity: '1',
                unit_amount: {
                  currency_code: currency.toUpperCase(),
                  value: cleanAmount
                }
              }
            ]
          }
        ],
        application_context: {
          brand_name: 'AgentSpend Pro FinTech',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: 'https://example.com/return',
          cancel_url: 'https://example.com/cancel'
        }
      };

      const orderResp = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      const orderData = await orderResp.json();
      if (!orderResp.ok) {
        console.error('PayPal Order Creation Failed:', orderData);
        return res.status(orderResp.status).json({ error: 'PayPal API order creation failed', details: orderData });
      }

      const approveLink = (orderData.links || []).find(l => l.rel === 'approve');
      return res.json({
        id: orderData.id,
        status: orderData.status,
        approveUrl: approveLink ? approveLink.href : null,
        isSimulated: false
      });
    }

    // Transparent Sandbox Simulation Mode (for out-of-the-box local testing without credentials)
    const simulatedOrderId = `SANDBOX_ORDER_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    return res.json({
      id: simulatedOrderId,
      status: 'CREATED',
      approveUrl: `https://www.sandbox.paypal.com/checkoutnow?token=${simulatedOrderId}`,
      isSimulated: true,
      amount: cleanAmount,
      currency: currency.toUpperCase(),
      message: 'PayPal Sandbox simulation order generated. Add valid credentials to .env for live Sandbox endpoint.'
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ error: 'Failed to create PayPal checkout order.' });
  }
});

// 4. PayPal Order Capture Endpoint (/v2/checkout/orders/{id}/capture)
app.post('/api/paypal/capture-order', async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required to capture payment.' });
    }

    // Check if this is a simulated sandbox order
    if (orderId.startsWith('SANDBOX_ORDER_')) {
      return res.json({
        status: 'COMPLETED',
        orderId,
        isSimulated: true,
        transactionId: `TX_${Date.now()}_SIM`,
        payer: {
          name: { given_name: 'Sandbox', surname: 'Buyer' },
          email_address: 'sb-buyer@business.example.com',
          payer_id: 'SB_PAYER_88772'
        },
        captureTime: new Date().toISOString()
      });
    }

    const token = await getPayPalAccessToken();
    if (!token) {
      return res.status(500).json({ error: 'PayPal authentication unavailable for capture.' });
    }

    const captureResp = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const captureData = await captureResp.json();
    if (!captureResp.ok) {
      console.error('PayPal Order Capture Failed:', captureData);
      return res.status(captureResp.status).json({ error: 'PayPal Order Capture failed', details: captureData });
    }

    return res.json({
      status: captureData.status,
      orderId: captureData.id,
      isSimulated: false,
      payer: captureData.payer,
      purchase_units: captureData.purchase_units,
      captureTime: new Date().toISOString()
    });
  } catch (error) {
    console.error('Capture Order Error:', error);
    res.status(500).json({ error: 'Failed to capture PayPal checkout order.' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  AgentSpend Pro Server running on http://localhost:${PORT}`);
  console.log(`  PayPal API Gateway: ${PAYPAL_API}`);
  console.log(`  Sandbox Credentials configured: ${Boolean(PAYPAL_CLIENT_ID && PAYPAL_CLIENT_ID !== 'your_sandbox_client_id')}`);
  console.log(`  Supported Languages: 9 (en, tr, es, fr, de, it, pt, ru, ar)`);
  console.log(`=======================================================`);
});
