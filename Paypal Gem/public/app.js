/**
 * AgentSpend Pro - Frontend Controller
 * Multi-Language UI (9 Languages), 5N1K Assessment, Market Intelligence Sparkline & PayPal Checkout
 */

const UI_STRINGS = {
  en: {
    heroTitle: "AgentSpend Pro: Autonomous FinTech Decision Agent",
    heroDesc: "Real-time 5N1K behavioral analysis, stock market-style dip & peak tracking, and secure PayPal Sandbox checkout.",
    inputTitle: "Analyze Purchase Decision",
    itemLabel: "Product Name or Asset",
    itemPlaceholder: "e.g. Sony WH-1000XM5 Noise-Canceling Headphones",
    categoryLabel: "Category",
    priceLabel: "Price & Currency",
    reasonLabel: "Why do you want to buy it? (Motivation)",
    reasonPlaceholder: "e.g. For remote work concentration, old ones broke down",
    urgencyLabel: "Urgency Level",
    urgencyLow: "Low (Casual Wishlist)",
    urgencyMedium: "Medium (Planning / 1-2 Weeks)",
    urgencyHigh: "High (Immediate Replacement Needed)",
    btnAnalyze: "Run Agent Decision Engine",
    btnAnalyzing: "Analyzing Market & 5N1K...",
    quickChipsLabel: "Quick Presets:",
    resultsPlaceholderTitle: "Awaiting Input Parameters",
    resultsPlaceholderDesc: "Enter product details to initiate 5N1K behavioral screening, 30-day market ticker analysis, and optimal pricing strategy.",
    marketTitle: "30-Day Market Intelligence & Pricing Ticker",
    statCurrent: "Current Price",
    statAvg: "30D Fair Value",
    statLow: "30D Dip (Support)",
    statHigh: "30D Peak (Resistance)",
    necessityTitle: "5N1K Necessity Score",
    alternativesTitle: "Smart Alternative Equivalents",
    btnSelectAlt: "Select This Option",
    checkoutTitle: "Verified PayPal Sandbox Checkout",
    summaryItem: "Item",
    summaryPrice: "Listed Price",
    summaryProtection: "Agent Protection & Verification",
    summaryFree: "FREE ($0.00)",
    summaryTotal: "Total Due",
    btnPayWithPayPal: "Pay with PayPal Sandbox",
    btnProcessing: "Authorizing with PayPal...",
    modalSuccessTitle: "Transaction Verified & Captured!",
    modalSuccessDesc: "Your purchase has been authorized and captured through PayPal Sandbox.",
    modalOrderId: "Order ID",
    modalTxId: "Transaction Ref",
    modalPayer: "Payer Name",
    modalStatus: "Payment Status",
    modalClose: "Done / New Analysis"
  },
  tr: {
    heroTitle: "AgentSpend Pro: Otonom FinTech Karar Ajanı",
    heroDesc: "Gerçek zamanlı 5N1K analizi, borsa tipi dip ve zirve fiyat takibi ve güvenli PayPal Sandbox entegrasyonu.",
    inputTitle: "Harcama Kararını İncele",
    itemLabel: "Ürün veya Varlık Adı",
    itemPlaceholder: "Örn: Sony WH-1000XM5 Kulaklık",
    categoryLabel: "Kategori",
    priceLabel: "Fiyat ve Para Birimi",
    reasonLabel: "Neden Satın Almak İstiyorsunuz? (Motivasyon)",
    reasonPlaceholder: "Örn: Evden çalışma verimi için, eskisi bozuldu",
    urgencyLabel: "Aciliyet Seviyesi",
    urgencyLow: "Düşük (İstek Listesi)",
    urgencyMedium: "Orta (1-2 Hafta İçinde Planlı)",
    urgencyHigh: "Yüksek (Acil Değişim Gerekli)",
    btnAnalyze: "Ajan Analizini Başlat",
    btnAnalyzing: "Piyasa ve 5N1K Analiz Ediliyor...",
    quickChipsLabel: "Hızlı Örnekler:",
    resultsPlaceholderTitle: "Veri Girişi Bekleniyor",
    resultsPlaceholderDesc: "5N1K testi, 30 günlük borsa tipi dip/tepe takibi ve bütçe kararı için formu doldurun.",
    marketTitle: "30 Günlük Piyasa İstihbaratı ve Fiyat Grafiği",
    statCurrent: "Mevcut Fiyat",
    statAvg: "30G Adil Değer",
    statLow: "30G Dip (Destek)",
    statHigh: "30G Zirve (Direnç)",
    necessityTitle: "5N1K İhtiyaç Skoru",
    alternativesTitle: "Akıllı Fiyat/Performans Alternatifleri",
    btnSelectAlt: "Bu Seçeneği Seç",
    checkoutTitle: "Doğrulanmış PayPal Sandbox Ödemesi",
    summaryItem: "Ürün",
    summaryPrice: "Belirtilen Fiyat",
    summaryProtection: "Ajan Koruması & Doğrulama",
    summaryFree: "ÜCRETSİZ",
    summaryTotal: "Toplam Tutar",
    btnPayWithPayPal: "PayPal Sandbox ile Güvenle Öde",
    btnProcessing: "PayPal Onayı Alınıyor...",
    modalSuccessTitle: "Ödeme Doğrulandı ve Tahsil Edildi!",
    modalSuccessDesc: "İşleminiz PayPal Sandbox altyapısı üzerinden başarıyla tamamlandı.",
    modalOrderId: "Sipariş Kodu",
    modalTxId: "İşlem Referansı",
    modalPayer: "Ödeyen Bilgisi",
    modalStatus: "İşlem Durumu",
    modalClose: "Tamamla / Yeni Analiz"
  },
  es: {
    heroTitle: "AgentSpend Pro: Agente Financiero Autónomo",
    heroDesc: "Análisis 5N1K en tiempo real, seguimiento de mínimos y máximos bursátiles y checkout seguro en PayPal Sandbox.",
    inputTitle: "Analizar Decisión de Compra",
    itemLabel: "Nombre del Producto o Activo",
    itemPlaceholder: "ej. Auriculares Sony WH-1000XM5",
    categoryLabel: "Categoría",
    priceLabel: "Precio y Moneda",
    reasonLabel: "¿Por qué desea comprarlo? (Motivación)",
    reasonPlaceholder: "ej. Para trabajo remoto, los anteriores se rompieron",
    urgencyLabel: "Nivel de Urgencia",
    urgencyLow: "Baja (Lista de Deseos)",
    urgencyMedium: "Media (Planificación 1-2 semanas)",
    urgencyHigh: "Alta (Reemplazo Inmediato)",
    btnAnalyze: "Ejecutar Motor de Decisión",
    btnAnalyzing: "Analizando Mercado y 5N1K...",
    quickChipsLabel: "Ejemplos Rápidos:",
    resultsPlaceholderTitle: "Esperando Parámetros",
    resultsPlaceholderDesc: "Introduzca los datos para iniciar el cribado 5N1K y el gráfico de precios de 30 días.",
    marketTitle: "Inteligencia de Mercado y Gráfico de Precios (30 Días)",
    statCurrent: "Precio Actual",
    statAvg: "Valor Justo 30D",
    statLow: "Mínimo 30D (Soporte)",
    statHigh: "Máximo 30D (Resistencia)",
    necessityTitle: "Puntuación de Necesidad 5N1K",
    alternativesTitle: "Alternativas Inteligentes Equivalentes",
    btnSelectAlt: "Elegir esta Opción",
    checkoutTitle: "Pago Verificado PayPal Sandbox",
    summaryItem: "Artículo",
    summaryPrice: "Precio",
    summaryProtection: "Protección y Verificación",
    summaryFree: "GRATIS",
    summaryTotal: "Total a Pagar",
    btnPayWithPayPal: "Pagar con PayPal Sandbox",
    btnProcessing: "Autorizando en PayPal...",
    modalSuccessTitle: "¡Transacción Verificada y Capturada!",
    modalSuccessDesc: "Su compra ha sido aprobada y procesada mediante PayPal Sandbox.",
    modalOrderId: "ID del Pedido",
    modalTxId: "Ref. Transacción",
    modalPayer: "Pagador",
    modalStatus: "Estado del Pago",
    modalClose: "Finalizar / Nuevo Análisis"
  },
  fr: {
    heroTitle: "AgentSpend Pro : Agent Décisionnel FinTech Autonome",
    heroDesc: "Analyse 5N1K en temps réel, détection des creux/pics boursiers et paiement sécurisé PayPal Sandbox.",
    inputTitle: "Analyser la Décision d'Achat",
    itemLabel: "Nom du Produit ou Actif",
    itemPlaceholder: "ex: Casque Sony WH-1000XM5",
    categoryLabel: "Catégorie",
    priceLabel: "Prix et Devise",
    reasonLabel: "Pourquoi souhaitez-vous l'acheter ? (Motivation)",
    reasonPlaceholder: "ex: Télétravail, l'ancien est hors d'usage",
    urgencyLabel: "Niveau d'Urgence",
    urgencyLow: "Faible (Liste d'envies)",
    urgencyMedium: "Moyen (Planifié sous 1-2 semaines)",
    urgencyHigh: "Élevé (Remplacement immédiat)",
    btnAnalyze: "Lancer le Moteur Décisionnel",
    btnAnalyzing: "Analyse du Marché et 5N1K en cours...",
    quickChipsLabel: "Suggestions :",
    resultsPlaceholderTitle: "En Attente de Données",
    resultsPlaceholderDesc: "Renseignez les détails pour démarrer l'analyse 5N1K et l'estimation de juste valeur.",
    marketTitle: "Intelligence de Marché & Tendance 30 Jours",
    statCurrent: "Prix Actuel",
    statAvg: "Juste Valeur 30J",
    statLow: "Creux 30J (Support)",
    statHigh: "Pic 30J (Résistance)",
    necessityTitle: "Score de Nécessité 5N1K",
    alternativesTitle: "Alternatives Équivalentes Intelligentes",
    btnSelectAlt: "Sélectionner cette Option",
    checkoutTitle: "Paiement Sécurisé PayPal Sandbox",
    summaryItem: "Article",
    summaryPrice: "Prix affiché",
    summaryProtection: "Protection Acheteur",
    summaryFree: "GRATUIT",
    summaryTotal: "Total à Payer",
    btnPayWithPayPal: "Payer avec PayPal Sandbox",
    btnProcessing: "Autorisation PayPal...",
    modalSuccessTitle: "Transaction Vérifiée et Capturée !",
    modalSuccessDesc: "Votre achat a été validé et débité via PayPal Sandbox.",
    modalOrderId: "ID de Commande",
    modalTxId: "Réf. Transaction",
    modalPayer: "Nom du Payeur",
    modalStatus: "Statut du Paiement",
    modalClose: "Fermer / Nouvelle Analyse"
  },
  de: {
    heroTitle: "AgentSpend Pro: Autonomer FinTech-Entscheidungsagent",
    heroDesc: "Echtzeit-5N1K-Analyse, Verfolgung von Markttiefs/-hochs und sichere PayPal Sandbox-Abwicklung.",
    inputTitle: "Kaufentscheidung Untersuchen",
    itemLabel: "Produkt- oder Artikelname",
    itemPlaceholder: "z.B. Sony WH-1000XM5 Kopfhörer",
    categoryLabel: "Kategorie",
    priceLabel: "Preis & Währung",
    reasonLabel: "Warum möchten Sie kaufen? (Motivation)",
    reasonPlaceholder: "z.B. Für Homeoffice-Fokus, altes Gerät defekt",
    urgencyLabel: "Dringlichkeit",
    urgencyLow: "Niedrig (Wunschliste)",
    urgencyMedium: "Mittel (In 1-2 Wochen geplant)",
    urgencyHigh: "Hoch (Sofortiger Ersatz nötig)",
    btnAnalyze: "Entscheidungsagent Starten",
    btnAnalyzing: "Markt- und 5N1K-Prüfung läuft...",
    quickChipsLabel: "Schnellbeispiele:",
    resultsPlaceholderTitle: "Warte auf Eingabeparameter",
    resultsPlaceholderDesc: "Geben Sie die Daten ein, um die 5N1K-Bewertung und 30-Tage-Preistrendanalyse zu starten.",
    marketTitle: "30-Tage Marktinformationen & Preischart",
    statCurrent: "Aktueller Preis",
    statAvg: "30T Fairer Wert",
    statLow: "30T Tief (Support)",
    statHigh: "30T Hoch (Widerstand)",
    necessityTitle: "5N1K-Notwendigkeits-Score",
    alternativesTitle: "Smarte Preis-Leistungs-Alternativen",
    btnSelectAlt: "Diese Option Wählen",
    checkoutTitle: "Verifizierter PayPal Sandbox Checkout",
    summaryItem: "Artikel",
    summaryPrice: "Preis",
    summaryProtection: "Agentenschutz & Verifikation",
    summaryFree: "KOSTENLOS",
    summaryTotal: "Gesamtbetrag",
    btnPayWithPayPal: "Mit PayPal Sandbox Bezahlen",
    btnProcessing: "Autorisierung bei PayPal...",
    modalSuccessTitle: "Zahlung Verifiziert & Verbucht!",
    modalSuccessDesc: "Ihre Transaktion wurde erfolgreich über die PayPal Sandbox abgewickelt.",
    modalOrderId: "Bestell-ID",
    modalTxId: "Transaktionsref.",
    modalPayer: "Zahler",
    modalStatus: "Zahlungsstatus",
    modalClose: "Fertig / Neue Analyse"
  },
  it: {
    heroTitle: "AgentSpend Pro: Agente Decisionale FinTech Autonomo",
    heroDesc: "Analisi 5N1K in tempo reale, rilevamento minimi/massimi di mercato e checkout sicuro PayPal Sandbox.",
    inputTitle: "Analizza Decisione d'Acquisto",
    itemLabel: "Nome del Prodotto o Bene",
    itemPlaceholder: "es. Cuffie Sony WH-1000XM5",
    categoryLabel: "Categoria",
    priceLabel: "Prezzo e Valuta",
    reasonLabel: "Perché vuoi acquistarlo? (Motivazione)",
    reasonPlaceholder: "es. Per smart working, il precedente si è rotto",
    urgencyLabel: "Livello di Urgenza",
    urgencyLow: "Bassa (Lista desideri)",
    urgencyMedium: "Media (Pianificato in 1-2 settimane)",
    urgencyHigh: "Alta (Sostituzione immediata)",
    btnAnalyze: "Avvia Motore Decisionale",
    btnAnalyzing: "Analisi di Mercato e 5N1K...",
    quickChipsLabel: "Esempi Rapidi:",
    resultsPlaceholderTitle: "In Attesa di Parametri",
    resultsPlaceholderDesc: "Inserisci i dati del bene per avviare lo screening 5N1K e il monitoraggio dei prezzi a 30 giorni.",
    marketTitle: "Intelligence di Mercato & Grafico a 30 Giorni",
    statCurrent: "Prezzo Attuale",
    statAvg: "Valore Equo 30G",
    statLow: "Minimo 30G (Supporto)",
    statHigh: "Massimo 30G (Resistenza)",
    necessityTitle: "Punteggio di Necessità 5N1K",
    alternativesTitle: "Alternative Equivalenti Intelligenti",
    btnSelectAlt: "Scegli questa Opzione",
    checkoutTitle: "Checkout Protetto PayPal Sandbox",
    summaryItem: "Articolo",
    summaryPrice: "Prezzo",
    summaryProtection: "Protezione e Verifica",
    summaryFree: "GRATUITO",
    summaryTotal: "Totale da Pagare",
    btnPayWithPayPal: "Paga con PayPal Sandbox",
    btnProcessing: "Autorizzazione PayPal in corso...",
    modalSuccessTitle: "Transazione Verificata e Completata!",
    modalSuccessDesc: "Il pagamento è stato autorizzato e acquisito tramite PayPal Sandbox.",
    modalOrderId: "ID Ordine",
    modalTxId: "Rif. Transazione",
    modalPayer: "Pagatore",
    modalStatus: "Stato Pagamento",
    modalClose: "Fine / Nuova Analisi"
  },
  pt: {
    heroTitle: "AgentSpend Pro: Agente de Decisão FinTech Autônomo",
    heroDesc: "Análise 5N1K em tempo real, monitoramento de fundos/topos de mercado e checkout seguro PayPal Sandbox.",
    inputTitle: "Analisar Decisão de Compra",
    itemLabel: "Nome do Produto ou Ativo",
    itemPlaceholder: "ex: Fone Sony WH-1000XM5",
    categoryLabel: "Categoria",
    priceLabel: "Preço e Moeda",
    reasonLabel: "Por que você quer comprar? (Motivação)",
    reasonPlaceholder: "ex: Para home office, o fone antigo quebrou",
    urgencyLabel: "Nível de Urgência",
    urgencyLow: "Baixa (Lista de desejos)",
    urgencyMedium: "Média (Planejado em 1-2 semanas)",
    urgencyHigh: "Alta (Substituição urgente)",
    btnAnalyze: "Executar Agente de Decisão",
    btnAnalyzing: "Analisando Mercado e 5N1K...",
    quickChipsLabel: "Exemplos Rápidos:",
    resultsPlaceholderTitle: "Aguardando Informações",
    resultsPlaceholderDesc: "Preencha os campos para iniciar a triagem comportamental 5N1K e a curva de preços de 30 dias.",
    marketTitle: "Inteligência de Mercado e Cotação de 30 Dias",
    statCurrent: "Preço Atual",
    statAvg: "Valor Justo 30D",
    statLow: "Fundo 30D (Suporte)",
    statHigh: "Pico 30D (Resistência)",
    necessityTitle: "Score de Necessidade 5N1K",
    alternativesTitle: "Alternativas Inteligentes Equivalentes",
    btnSelectAlt: "Selecionar esta Opção",
    checkoutTitle: "Checkout Verificado PayPal Sandbox",
    summaryItem: "Item",
    summaryPrice: "Preço Listado",
    summaryProtection: "Proteção e Auditoria do Agente",
    summaryFree: "GRATUITO",
    summaryTotal: "Total a Pagar",
    btnPayWithPayPal: "Pagar com PayPal Sandbox",
    btnProcessing: "Autorizando no PayPal...",
    modalSuccessTitle: "Transação Verificada e Concluída!",
    modalSuccessDesc: "Sua compra foi aprovada e capturada com sucesso no PayPal Sandbox.",
    modalOrderId: "ID do Pedido",
    modalTxId: "Ref. Transação",
    modalPayer: "Pagador",
    modalStatus: "Status do Pagamento",
    modalClose: "Concluir / Nova Análise"
  },
  ru: {
    heroTitle: "AgentSpend Pro: Автономный FinTech-агент решений",
    heroDesc: "Анализ 5N1K в реальном времени, отслеживание рыночных ценовых минимумов и безопасный PayPal Sandbox.",
    inputTitle: "Анализ решения о покупке",
    itemLabel: "Наименование товара или актива",
    itemPlaceholder: "напр., Наушники Sony WH-1000XM5",
    categoryLabel: "Категория",
    priceLabel: "Цена и валюта",
    reasonLabel: "Зачем вы хотите это купить? (Мотивация)",
    reasonPlaceholder: "напр., Для удаленной работы, старые сломались",
    urgencyLabel: "Уровень срочности",
    urgencyLow: "Низкий (Список желаний)",
    urgencyMedium: "Средний (В плане на 1-2 недели)",
    urgencyHigh: "Высокий (Срочная замена)",
    btnAnalyze: "Запустить анализ агента",
    btnAnalyzing: "Анализ рынка и 5N1K...",
    quickChipsLabel: "Быстрые примеры:",
    resultsPlaceholderTitle: "Ожидание входных данных",
    resultsPlaceholderDesc: "Заполните параметры товара для поведенческого скоринга 5N1K и графика цен за 30 дней.",
    marketTitle: "Рыночная аналитика и динамика цен (30 дней)",
    statCurrent: "Текущая цена",
    statAvg: "Справедливая цена 30Д",
    statLow: "Дно 30Д (Поддержка)",
    statHigh: "Пик 30Д (Сопротивление)",
    necessityTitle: "Оценка необходимости 5N1K",
    alternativesTitle: "Умные аналогичные варианты",
    btnSelectAlt: "Выбрать этот вариант",
    checkoutTitle: "Проверенная оплата через PayPal Sandbox",
    summaryItem: "Товар",
    summaryPrice: "Указанная цена",
    summaryProtection: "Защита покупателя и аудит",
    summaryFree: "БЕСПЛАТНО",
    summaryTotal: "Итого к оплате",
    btnPayWithPayPal: "Оплатить через PayPal Sandbox",
    btnProcessing: "Авторизация в PayPal...",
    modalSuccessTitle: "Транзакция проверена и завершена!",
    modalSuccessDesc: "Платеж успешно авторизован и списан через тестовый шлюз PayPal Sandbox.",
    modalOrderId: "Номер заказа",
    modalTxId: "Код транзакции",
    modalPayer: "Плательщик",
    modalStatus: "Статус платежа",
    modalClose: "Готово / Новый расчет"
  },
  ar: {
    heroTitle: "AgentSpend Pro: وكيل القرارات المالية الذكي المستقل",
    heroDesc: "تحليل سلوكي 5N1K فوري، تتبع القيعان والقمم السعرية بأسلوب أسواق المال، ودفع آمن عبر PayPal Sandbox.",
    inputTitle: "تحليل قرار الشراء والإنفاق",
    itemLabel: "اسم المنتج أو السلعة",
    itemPlaceholder: "مثال: سماعات سوني Sony WH-1000XM5",
    categoryLabel: "التصنيف",
    priceLabel: "السعر والعملة",
    reasonLabel: "لماذا ترغب في شرائه؟ (الدافع الشرائي)",
    reasonPlaceholder: "مثال: للتركيز في العمل عن بعد، تعطلت السماعة السابقة",
    urgencyLabel: "درجة الاستعجال",
    urgencyLow: "منخفض (قائمة أمنيات غير عاجلة)",
    urgencyMedium: "متوسط (مخطط له خلال أسبوع أو أسبوعين)",
    urgencyHigh: "عالي (استبدال ضروري فوري)",
    btnAnalyze: "تشغيل محرك القرار المالي",
    btnAnalyzing: "جاري تحليل السوق ومعايير 5N1K...",
    quickChipsLabel: "أمثلة سريعة:",
    resultsPlaceholderTitle: "في انتظار مدخلات البيانات",
    resultsPlaceholderDesc: "أدخل تفاصيل السلعة للبدء في الفحص السلوكي 5N1K ورسم مؤشر حركة الأسعار لآخر 30 يوماً.",
    marketTitle: "معلومات السوق وحركة الأسعار لـ 30 يوماً",
    statCurrent: "السعر الحالي",
    statAvg: "السعر العادل لـ 30 يوماً",
    statLow: "أدنى قاع لـ 30 يوماً (دعم)",
    statHigh: "أعلى قمة لـ 30 يوماً (مقاومة)",
    necessityTitle: "مؤشر الحاجة والضرورة 5N1K",
    alternativesTitle: "البدائل الذكية المعادلة",
    btnSelectAlt: "اختيار هذا البديل",
    checkoutTitle: "إتمام الشراء المحمي عبر PayPal Sandbox",
    summaryItem: "المنتج",
    summaryPrice: "السعر المعلن",
    summaryProtection: "حماية وتدقيق الوكيل الذكي",
    summaryFree: "مجاناً",
    summaryTotal: "المجموع الكلي",
    btnPayWithPayPal: "الدفع الآمن عبر PayPal Sandbox",
    btnProcessing: "جاري التفويض لدى PayPal...",
    modalSuccessTitle: "تم تأكيد العملية وخصم المبلغ بنجاح!",
    modalSuccessDesc: "تمت معالجة معاملتك المالية بنجاح عبر بوابة PayPal Sandbox.",
    modalOrderId: "رقم الطلب",
    modalTxId: "مرجع المعاملة",
    modalPayer: "اسم الدافع",
    modalStatus: "حالة الدفع",
    modalClose: "إغلاق / تحليل جديد"
  }
};

// State
let currentLang = 'en';
let currentAnalysis = null;
let currentCheckoutItem = {
  name: '',
  price: 0,
  currency: 'USD'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await fetchAppConfig();
  setupLanguageSwitcher();
  setupPresets();
  setupFormSubmit();
  setupPayPalCheckout();
  setupModalClose();
  applyLanguage(currentLang);
});

async function fetchAppConfig() {
  try {
    const res = await fetch('/api/config');
    const data = await res.json();
    const statusTextEl = document.getElementById('sandboxStatusText');
    if (statusTextEl) {
      if (data.isSandboxConfigured) {
        statusTextEl.textContent = 'PayPal Sandbox: Connected (Live API)';
        statusTextEl.parentElement.style.color = '#34d399';
      } else {
        statusTextEl.textContent = 'PayPal Sandbox: Active (Simulator Mode)';
        statusTextEl.parentElement.style.color = '#93c5fd';
      }
    }
  } catch (err) {
    console.warn('Config fetch warning:', err);
  }
}

function setupLanguageSwitcher() {
  const select = document.getElementById('languageSelector');
  if (!select) return;

  select.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage(currentLang);
    // If there is active analysis, re-run analysis in new language
    if (currentAnalysis) {
      triggerAnalysis(false);
    }
  });
}

function applyLanguage(lang) {
  const strings = UI_STRINGS[lang] || UI_STRINGS.en;
  const isRtl = lang === 'ar';
  document.body.dir = isRtl ? 'rtl' : 'ltr';

  // Translate static UI elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key]) {
      el.textContent = strings[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (strings[key]) {
      el.setAttribute('placeholder', strings[key]);
    }
  });
}

function setupPresets() {
  const presets = [
    { name: 'Sony WH-1000XM5 Headphones', cat: 'electronics', price: 349, curr: 'USD', reason: 'Remote work noise cancellation, old pair broke', urgency: 'high' },
    { name: 'Ergonomic Mesh Chair Pro', cat: 'computing', price: 280, curr: 'USD', reason: 'Prevent lower back pain during coding', urgency: 'medium' },
    { name: 'MacBook Air 15-inch M3', cat: 'computing', price: 1299, curr: 'USD', reason: 'Upgrade 6-year-old laptop for full stack development', urgency: 'medium' },
    { name: 'Specialty Espresso Machine', cat: 'home', price: 590, curr: 'USD', reason: 'Saw an influencer ad, looks cool and fancy', urgency: 'low' }
  ];

  const chipsContainer = document.getElementById('quickChips');
  if (!chipsContainer) return;

  presets.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip-btn';
    btn.textContent = p.name;
    btn.addEventListener('click', () => {
      document.getElementById('inputItem').value = p.name;
      document.getElementById('inputCategory').value = p.cat;
      document.getElementById('inputPrice').value = p.price;
      document.getElementById('inputCurrency').value = p.curr;
      document.getElementById('inputReason').value = p.reason;
      document.getElementById('inputUrgency').value = p.urgency;
    });
    chipsContainer.appendChild(btn);
  });
}

function setupFormSubmit() {
  const form = document.getElementById('spendAnalysisForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerAnalysis(true);
  });
}

async function triggerAnalysis(scrollToResults = true) {
  const item = document.getElementById('inputItem').value.trim();
  const category = document.getElementById('inputCategory').value;
  const price = parseFloat(document.getElementById('inputPrice').value);
  const currency = document.getElementById('inputCurrency').value;
  const reason = document.getElementById('inputReason').value.trim();
  const urgency = document.getElementById('inputUrgency').value;

  if (!item || isNaN(price) || price <= 0) {
    alert('Please provide a valid product name and price.');
    return;
  }

  const btnSubmit = document.getElementById('btnSubmit');
  const strings = UI_STRINGS[currentLang] || UI_STRINGS.en;
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = `<span class="spinner"></span> ${strings.btnAnalyzing}`;

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item,
        category,
        price,
        currency,
        reason,
        urgency,
        language: currentLang
      })
    });

    if (!res.ok) {
      throw new Error('Analysis failed on server.');
    }

    const data = await res.json();
    currentAnalysis = data;
    currentCheckoutItem = {
      name: data.item,
      price: data.price,
      currency: data.currency
    };

    renderAnalysisResults(data);

    if (scrollToResults && window.innerWidth < 960) {
      document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
    }
  } catch (err) {
    console.error('Error during analysis:', err);
    alert('Failed to generate market intelligence. Please try again.');
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = strings.btnAnalyze;
  }
}

function renderAnalysisResults(data) {
  const placeholder = document.getElementById('resultsPlaceholder');
  const content = document.getElementById('resultsContent');

  if (placeholder) placeholder.style.display = 'none';
  if (content) content.style.display = 'flex';

  // 1. Verdict & Sentiment Banner
  const verdictBadge = document.getElementById('verdictBadge');
  const sentimentText = document.getElementById('sentimentText');
  const necessityFill = document.getElementById('necessityFill');
  const necessityScoreNum = document.getElementById('necessityScoreNum');

  verdictBadge.textContent = data.verdictText;
  verdictBadge.className = 'verdict-badge';

  if (data.verdictKey === 'STRONG_BUY') verdictBadge.classList.add('badge-strong-buy');
  else if (data.verdictKey === 'BUY') verdictBadge.classList.add('badge-buy');
  else if (data.verdictKey === 'WAIT_WATCH') verdictBadge.classList.add('badge-wait');
  else verdictBadge.classList.add('badge-alternative');

  sentimentText.textContent = data.marketSentimentText;
  necessityFill.style.width = `${data.necessityScore}%`;
  necessityScoreNum.textContent = `${data.necessityScore}/100`;

  // 2. Metrics Boxes
  const curr = data.currency;
  document.getElementById('statCurrentVal').textContent = `${curr} ${data.metrics.currentPrice}`;
  document.getElementById('statAvgVal').textContent = `${curr} ${data.metrics.thirtyDayAverage}`;
  
  const dipEl = document.getElementById('statLowVal');
  dipEl.textContent = `${curr} ${data.metrics.thirtyDayLow}`;
  if (data.metrics.isAtDip) dipEl.className = 'stat-value dip';
  else dipEl.className = 'stat-value';

  const peakEl = document.getElementById('statHighVal');
  peakEl.textContent = `${curr} ${data.metrics.thirtyDayHigh}`;
  if (data.metrics.isAtPeak) peakEl.className = 'stat-value peak';
  else peakEl.className = 'stat-value';

  // 3. Draw Sparkline Ticker Chart
  drawPriceChart(data.priceHistory, data.metrics);

  // 4. 5N1K Diagnostic Grid
  const n1kGrid = document.getElementById('n1kGrid');
  n1kGrid.innerHTML = '';
  const order = ['what', 'why', 'who', 'when', 'where', 'how'];
  const labelsMap = {
    what: 'WHAT',
    why: 'WHY',
    who: 'WHO',
    when: 'WHEN',
    where: 'WHERE',
    how: 'HOW'
  };

  order.forEach(k => {
    const item = data.n1kAnalysis[k];
    if (!item) return;

    const div = document.createElement('div');
    div.className = 'n1k-item';
    div.innerHTML = `
      <div class="n1k-item-header">
        <span class="n1k-tag">${labelsMap[k]}</span>
        <span>${item.title}</span>
      </div>
      <p class="n1k-item-text">${item.text}</p>
    `;
    n1kGrid.appendChild(div);
  });

  // 5. Alternatives Grid
  const altsContainer = document.getElementById('alternativesGrid');
  altsContainer.innerHTML = '';
  const strings = UI_STRINGS[currentLang] || UI_STRINGS.en;

  data.alternatives.forEach(alt => {
    const altCard = document.createElement('div');
    altCard.className = 'alt-card';
    altCard.innerHTML = `
      <span class="alt-badge">Save ${curr} ${alt.savings}</span>
      <div>
        <h4 class="alt-title">${alt.name}</h4>
        <p class="alt-desc">${alt.description}</p>
      </div>
      <div>
        <div class="alt-price-box">
          <span class="alt-price">${curr} ${alt.price}</span>
          <span class="alt-savings">-${Math.round((alt.savings / data.price) * 100)}%</span>
        </div>
        <button type="button" class="btn-alt-select" style="width: 100%; margin-top: 10px;">
          ${strings.btnSelectAlt}
        </button>
      </div>
    `;

    altCard.querySelector('.btn-alt-select').addEventListener('click', () => {
      selectAlternative(alt);
    });

    altsContainer.appendChild(altCard);
  });

  // 6. Update Checkout Box
  updateCheckoutBox();
}

function selectAlternative(alt) {
  currentCheckoutItem = {
    name: alt.name,
    price: alt.price,
    currency: alt.currency
  };
  updateCheckoutBox();

  const checkoutEl = document.getElementById('checkoutSection');
  if (checkoutEl) {
    checkoutEl.scrollIntoView({ behavior: 'smooth' });
    checkoutEl.style.borderColor = 'var(--pp-blue-medium)';
    setTimeout(() => {
      checkoutEl.style.borderColor = '#e2e8f0';
    }, 1500);
  }
}

function updateCheckoutBox() {
  document.getElementById('checkoutItemName').textContent = currentCheckoutItem.name;
  document.getElementById('checkoutItemPrice').textContent = `${currentCheckoutItem.currency} ${currentCheckoutItem.price.toFixed(2)}`;
  document.getElementById('checkoutTotalPrice').textContent = `${currentCheckoutItem.currency} ${currentCheckoutItem.price.toFixed(2)}`;
}

// Sparkline Canvas Chart Renderer
function drawPriceChart(priceHistory, metrics) {
  const canvas = document.getElementById('priceChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 20, right: 20, bottom: 25, left: 20 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  ctx.clearRect(0, 0, width, height);

  const prices = priceHistory.map(p => p.price);
  const minP = Math.min(...prices) * 0.96;
  const maxP = Math.max(...prices) * 1.04;
  const range = maxP - minP || 1;

  const getX = (index) => padding.left + (index / (prices.length - 1)) * chartW;
  const getY = (val) => padding.top + chartH - ((val - minP) / range) * chartH;

  // Background Fair Value Band
  const avgY = getY(metrics.thirtyDayAverage);
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(padding.left, avgY);
  ctx.lineTo(width - padding.right, avgY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Trend line gradient
  const grad = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  grad.addColorStop(0, 'rgba(0, 121, 193, 0.25)');
  grad.addColorStop(1, 'rgba(0, 121, 193, 0.0)');

  // Draw Area
  ctx.beginPath();
  ctx.moveTo(getX(0), getY(prices[0]));
  for (let i = 1; i < prices.length; i++) {
    ctx.lineTo(getX(i), getY(prices[i]));
  }
  ctx.lineTo(getX(prices.length - 1), height - padding.bottom);
  ctx.lineTo(getX(0), height - padding.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw Line
  ctx.beginPath();
  ctx.moveTo(getX(0), getY(prices[0]));
  for (let i = 1; i < prices.length; i++) {
    ctx.lineTo(getX(i), getY(prices[i]));
  }
  ctx.strokeStyle = '#0079c1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw Latest Price Marker
  const lastIndex = prices.length - 1;
  const lastX = getX(lastIndex);
  const lastY = getY(prices[lastIndex]);

  ctx.beginPath();
  ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
  ctx.fillStyle = metrics.isAtDip ? '#10b981' : metrics.isAtPeak ? '#ef4444' : '#003087';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Timeline markers (T-30d, T-15d, Today)
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px Inter, sans-serif';
  ctx.fillText('30 Days Ago', padding.left, height - 6);
  ctx.fillText('15D', padding.left + chartW / 2 - 8, height - 6);
  ctx.fillText('Current', width - padding.right - 35, height - 6);
}

// PayPal Sandbox Integration
function setupPayPalCheckout() {
  const btn = document.getElementById('btnPayPalCheckout');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    if (!currentCheckoutItem.name || currentCheckoutItem.price <= 0) {
      alert('Please analyze an item first before checking out.');
      return;
    }

    const strings = UI_STRINGS[currentLang] || UI_STRINGS.en;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> ${strings.btnProcessing}`;

    try {
      // 1. Create PayPal Order (/api/paypal/create-order)
      const createRes = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: currentCheckoutItem.price,
          currency: currentCheckoutItem.currency,
          itemName: currentCheckoutItem.name,
          description: `AgentSpend Pro Verified Purchase: ${currentCheckoutItem.name}`
        })
      });

      const orderData = await createRes.json();
      if (!createRes.ok || !orderData.id) {
        throw new Error(orderData.error || 'Failed to create PayPal order.');
      }

      // 2. Capture PayPal Order (/api/paypal/capture-order)
      const captureRes = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderData.id })
      });

      const captureData = await captureRes.json();
      if (!captureRes.ok) {
        throw new Error(captureData.error || 'Failed to capture PayPal order.');
      }

      // 3. Show Success Modal
      displaySuccessModal(orderData, captureData);
    } catch (err) {
      console.error('PayPal Checkout Error:', err);
      alert(`Checkout Error: ${err.message}`);
    } finally {
      btn.disabled = false;
      btn.innerHTML = `
        <svg class="paypal-badge-svg" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 4H5.8C5.4 4 5 4.3 4.9 4.7L2.1 22.3C2.1 22.6 2.3 22.8 2.6 22.8H5.9C6.3 22.8 6.7 22.5 6.8 22.1L7.6 17.2C7.7 16.8 8.1 16.5 8.5 16.5H11.2C15.8 16.5 18.5 14.3 19.2 9.9C19.5 7.9 19.1 6.4 18 5.4C16.8 4.3 14.9 4 12.5 4Z" fill="#003087"/>
          <path d="M24.8 8.7C24.4 8.7 24.1 8.9 24 9.3L23.2 14.2C23.1 14.6 22.7 14.9 22.3 14.9H20.6L21.7 8.2C21.8 7.8 21.4 7.4 21 7.4H17.7C17.3 7.4 16.9 7.7 16.8 8.1L14 25.7C14 26 14.2 26.2 14.5 26.2H17.8C18.2 26.2 18.6 25.9 18.7 25.5L19.5 20.6C19.6 20.2 20 19.9 20.4 19.9H23.1C27.7 19.9 30.4 17.7 31.1 13.3C31.4 11.3 31 9.8 29.9 8.8C28.7 7.7 26.9 8.7 24.8 8.7Z" fill="#0079C1"/>
        </svg>
        <span data-i18n="btnPayWithPayPal">${strings.btnPayWithPayPal}</span>
      `;
    }
  });
}

function displaySuccessModal(orderData, captureData) {
  const modal = document.getElementById('successModal');
  if (!modal) return;

  document.getElementById('modalOrderIdVal').textContent = captureData.orderId || orderData.id;
  document.getElementById('modalTxIdVal').textContent = captureData.transactionId || `TX_SANDBOX_${Date.now()}`;
  
  const payerName = captureData.payer?.name 
    ? `${captureData.payer.name.given_name || ''} ${captureData.payer.name.surname || ''}`
    : 'Sandbox Demo Account';
  document.getElementById('modalPayerVal').textContent = payerName;
  document.getElementById('modalStatusVal').textContent = captureData.status || 'COMPLETED';

  modal.classList.add('active');
}

function setupModalClose() {
  const btnClose = document.getElementById('modalCloseBtn');
  const modal = document.getElementById('successModal');
  if (btnClose && modal) {
    btnClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }
}
