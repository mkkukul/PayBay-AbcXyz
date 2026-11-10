
export const LANGS = [
  {code:'en', label:'English'},
  {code:'tr', label:'Türkçe'},
  {code:'fr', label:'Français'},
  {code:'es', label:'Español'},
  {code:'de', label:'Deutsch'},
  {code:'it', label:'Italiano'},
  {code:'ar', label:'العربية'},
  {code:'pt', label:'Português'},
  {code:'ru', label:'Русский'},
];
export const T = {
en: {
  title:"SpendProof v2", sub:"Spending Immune System", tag:"The financial immune system for small businesses. AI that protects cash flow by saying no.",
  need:"1. Need Card — 5W1H", what:"What", why:"Why", where:"Where", when:"When", who:"For whom", how:"How",
  stock:"Stock on hand (kg)", daily:"Daily consumption", remaining:"Days left", recommended:"Recommended amount", score:"Need Proof Score", scoreBuy:"BUY — Real need", scoreWait:"WAIT / ALTERNATIVE", scoreNo:"DO NOT BUY — Likely impulse",
  market:"2. Market Board", seller:"Seller", price:"Price today", trend:"Trend", channel:"3. Best Channel", total:"Total cost", alt:"Substitute", altDesc:"Brazil beans, same profile, 9.5 USD/kg, 20% cheaper.",
  sim:"4. Regret Simulator", qty:"Quantity to buy (kg)", scenarioA:"Scenario A — What you wanted (10 kg)", scenarioB:"Scenario B — Our suggestion (3.2 kg)", waste:"Waste", saved:"Saved",
  gates:"5. Three Gates + PayPal + Proof", bad:"Bad Offer: 14 USD, No stock", good:"Good Offer: 11 USD, In stock", authorize:"Authorize — Hold Money", capture:"Capture — Pay after proof", void:"Void — Cancel", receipt:"Receipt — Saved Money", proof:"Proof Table", proofApprove:"Approve Proof", notStarted:"PayPal order not started", authorized:"Authorized — Money on hold", captured:"Captured — Paid", voided:"Voided — Refunded", reset:"Reset Demo", note:"MVP uses curated sample data. PayPal is simulated in demo, connect Sandbox with Client ID for live."
},
tr: {
  title:"SpendProof v2", sub:"Harcama Bağışıklık Sistemi", tag:"Küçük işletmenin finansal bağışıklık sistemi. Paranı koruyan AI, hayır diyebiliyor.",
  need:"1. İhtiyaç Kartı — 5N1K", what:"Ne", why:"Niçin", where:"Nerede", when:"Ne Zaman", who:"Kim İçin", how:"Nasıl",
  stock:"Eldeki Stok (kg)", daily:"Günlük Tüketim", remaining:"Kalan Gün", recommended:"Önerilen Miktar", score:"İhtiyaç Kanıtı Skoru", scoreBuy:"AL — Gerçek ihtiyaç", scoreWait:"BEKLE / MUADİL", scoreNo:"ALMA — Heves olabilir",
  market:"2. Pazar Tahtası", seller:"Satıcı", price:"Bugünkü Fiyat", trend:"Trend", channel:"3. En Uygun Kanal", total:"Toplam Maliyet", alt:"Muadil", altDesc:"Brezilya çekirdeği, aynı profil, 9.5 USD/kg, %20 daha ucuz.",
  sim:"4. Pişmanlık Simülatörü", qty:"Alınacak Miktar (kg)", scenarioA:"Senaryo A — İstediğin (10 kg)", scenarioB:"Senaryo B — Önerimiz (3.2 kg)", waste:"İsraf", saved:"Kurtarılan",
  gates:"5. Üç Kapı + PayPal + Kanıt", bad:"Kötü Teklif: 14 USD, Stok Yok", good:"İyi Teklif: 11 USD, Stok Var", authorize:"Authorize — Parayı Beklet", capture:"Capture — Kanıt Sonrası Öde", void:"Void — İptal Et", receipt:"Receipt — Kurtarılan Para", proof:"Kanıt Tablosu", proofApprove:"Kanıtı Onayla", notStarted:"PayPal siparişi başlamadı", authorized:"Authorize Oldu — Para Beklemede", captured:"Capture Oldu — Ödendi", voided:"Void Oldu — İade Edildi", reset:"Demoyu Sıfırla", note:"MVP küratörlü örnek veri kullanıyor. Demo PayPal simülasyon, canlı için Sandbox Client ID bağla."
},
fr: {
  title:"SpendProof v2", sub:"Système immunitaire des dépenses", tag:"Le système immunitaire financier des petites entreprises. L'IA protège votre trésorerie en disant non.",
  need:"1. Carte Besoin — 5W1H", what:"Quoi", why:"Pourquoi", where:"Où", when:"Quand", who:"Pour qui", how:"Comment",
  stock:"Stock actuel (kg)", daily:"Consommation quotidienne", remaining:"Jours restants", recommended:"Quantité recommandée", score:"Score de Preuve de Besoin", scoreBuy:"ACHETER — Vrai besoin", scoreWait:"ATTENDRE / ALTERNATIVE", scoreNo:"NE PAS ACHETER — Impulsion probable",
  market:"2. Tableau de Marché", seller:"Vendeur", price:"Prix du jour", trend:"Tendance", channel:"3. Meilleur Canal", total:"Coût total", alt:"Substitut", altDesc:"Grains du Brésil, même profil, 9.5 USD/kg, 20% moins cher.",
  sim:"4. Simulateur de Regret", qty:"Quantité à acheter (kg)", scenarioA:"Scénario A — Ce que vous vouliez (10 kg)", scenarioB:"Scénario B — Notre suggestion (3.2 kg)", waste:"Gaspillage", saved:"Économisé",
  gates:"5. Trois Portes + PayPal + Preuve", bad:"Mauvaise Offre: 14 USD, Pas de stock", good:"Bonne Offre: 11 USD, En stock", authorize:"Autoriser — Retenir l'argent", capture:"Capturer — Payer après preuve", void:"Annuler", receipt:"Reçu — Argent économisé", proof:"Tableau de Preuve", proofApprove:"Approuver la preuve", notStarted:"Commande PayPal non démarrée", authorized:"Autorisé — Argent retenu", captured:"Capturé — Payé", voided:"Annulé — Remboursé", reset:"Réinitialiser", note:"MVP utilise des données d'exemple. PayPal simulé en démo."
},
es: {
  title:"SpendProof v2", sub:"Sistema inmune de gasto", tag:"El sistema inmune financiero para pequeñas empresas. La IA protege tu flujo de caja diciendo no.",
  need:"1. Tarjeta de Necesidad — 5W1H", what:"Qué", why:"Por qué", where:"Dónde", when:"Cuándo", who:"Para quién", how:"Cómo",
  stock:"Stock actual (kg)", daily:"Consumo diario", remaining:"Días restantes", recommended:"Cantidad recomendada", score:"Puntuación de Prueba de Necesidad", scoreBuy:"COMPRAR — Necesidad real", scoreWait:"ESPERAR / ALTERNATIVA", scoreNo:"NO COMPRAR — Probable impulso",
  market:"2. Tablero de Mercado", seller:"Vendedor", price:"Precio hoy", trend:"Tendencia", channel:"3. Mejor Canal", total:"Costo total", alt:"Sustituto", altDesc:"Grano de Brasil, mismo perfil, 9.5 USD/kg, 20% más barato.",
  sim:"4. Simulador de Arrepentimiento", qty:"Cantidad a comprar (kg)", scenarioA:"Escenario A — Lo que querías (10 kg)", scenarioB:"Escenario B — Nuestra sugerencia (3.2 kg)", waste:"Desperdicio", saved:"Ahorrado",
  gates:"5. Tres Puertas + PayPal + Prueba", bad:"Mala Oferta: 14 USD, Sin stock", good:"Buena Oferta: 11 USD, En stock", authorize:"Autorizar — Retener dinero", capture:"Capturar — Pagar tras prueba", void:"Anular", receipt:"Recibo — Dinero ahorrado", proof:"Tabla de Prueba", proofApprove:"Aprobar prueba", notStarted:"Pedido PayPal no iniciado", authorized:"Autorizado — Dinero retenido", captured:"Capturado — Pagado", voided:"Anulado — Reembolsado", reset:"Reiniciar demo", note:"MVP usa datos de ejemplo. PayPal simulado en demo."
},
de: {
  title:"SpendProof v2", sub:"Ausgaben-Immunsystem", tag:"Das finanzielle Immunsystem für kleine Unternehmen. KI schützt den Cashflow, indem sie Nein sagt.",
  need:"1. Bedarfskarte — 5W1H", what:"Was", why:"Warum", where:"Wo", when:"Wann", who:"Für wen", how:"Wie",
  stock:"Lagerbestand (kg)", daily:"Täglicher Verbrauch", remaining:"Verbleibende Tage", recommended:"Empfohlene Menge", score:"Bedarfsnachweis-Score", scoreBuy:"KAUFEN — Echter Bedarf", scoreWait:"WARTEN / ALTERNATIVE", scoreNo:"NICHT KAUFEN — Wahrscheinlich Impuls",
  market:"2. Markttafel", seller:"Verkäufer", price:"Preis heute", trend:"Trend", channel:"3. Bester Kanal", total:"Gesamtkosten", alt:"Ersatz", altDesc:"Brasilien-Bohne, gleiches Profil, 9.5 USD/kg, 20% günstiger.",
  sim:"4. Reue-Simulator", qty:"Kaufmenge (kg)", scenarioA:"Szenario A — Was Sie wollten (10 kg)", scenarioB:"Szenario B — Unser Vorschlag (3.2 kg)", waste:"Verschwendung", saved:"Gespart",
  gates:"5. Drei Tore + PayPal + Nachweis", bad:"Schlechtes Angebot: 14 USD, Kein Lager", good:"Gutes Angebot: 11 USD, Auf Lager", authorize:"Autorisieren — Geld halten", capture:"Erfassen — Nach Nachweis zahlen", void:"Stornieren", receipt:"Beleg — Gespartes Geld", proof:"Nachweistabelle", proofApprove:"Nachweis genehmigen", notStarted:"PayPal-Bestellung nicht gestartet", authorized:"Autorisiert — Geld gehalten", captured:"Erfasst — Bezahlt", voided:"Storniert — Erstattet", reset:"Demo zurücksetzen", note:"MVP nutzt Beispieldaten. PayPal in Demo simuliert."
},
it: {
  title:"SpendProof v2", sub:"Sistema immunitario di spesa", tag:"Il sistema immunitario finanziario per le piccole imprese. L'IA protegge il flusso di cassa dicendo di no.",
  need:"1. Scheda Bisogno — 5W1H", what:"Cosa", why:"Perché", where:"Dove", when:"Quando", who:"Per chi", how:"Come",
  stock:"Scorta attuale (kg)", daily:"Consumo giornaliero", remaining:"Giorni rimasti", recommended:"Quantità consigliata", score:"Punteggio Prova di Bisogno", scoreBuy:"ACQUISTA — Bisogno reale", scoreWait:"ATTENDI / ALTERNATIVA", scoreNo:"NON ACQUISTARE — Probabile impulso",
  market:"2. Bacheca Mercato", seller:"Venditore", price:"Prezzo oggi", trend:"Tendenza", channel:"3. Miglior Canale", total:"Costo totale", alt:"Sostituto", altDesc:"Chicco Brasile, stesso profilo, 9.5 USD/kg, 20% più economico.",
  sim:"4. Simulatore di Rimpianto", qty:"Quantità da acquistare (kg)", scenarioA:"Scenario A — Quello che volevi (10 kg)", scenarioB:"Scenario B — Il nostro suggerimento (3.2 kg)", waste:"Spreco", saved:"Risparmiato",
  gates:"5. Tre Cancelli + PayPal + Prova", bad:"Offerta Cattiva: 14 USD, Senza scorta", good:"Buona Offerta: 11 USD, In scorta", authorize:"Autorizza — Trattieni denaro", capture:"Acquisisci — Paga dopo prova", void:"Annulla", receipt:"Ricevuta — Denaro risparmiato", proof:"Tabella Prova", proofApprove:"Approva prova", notStarted:"Ordine PayPal non avviato", authorized:"Autorizzato — Denaro trattenuto", captured:"Acquisito — Pagato", voided:"Annullato — Rimborsato", reset:"Reimposta demo", note:"MVP usa dati di esempio. PayPal simulato in demo."
},
ar: {
  title:"SpendProof v2", sub:"نظام مناعة الإنفاق", tag:"نظام المناعة المالية للشركات الصغيرة. الذكاء الاصطناعي يحمي التدفق النقدي بقول لا.",
  need:"1. بطاقة الحاجة — 5W1H", what:"ماذا", why:"لماذا", where:"أين", when:"متى", who:"لمن", how:"كيف",
  stock:"المخزون الحالي (كغ)", daily:"الاستهلاك اليومي", remaining:"الأيام المتبقية", recommended:"الكمية الموصى بها", score:"درجة إثبات الحاجة", scoreBuy:"اشترِ — حاجة حقيقية", scoreWait:"انتظر / بديل", scoreNo:"لا تشترِ — اندفاع محتمل",
  market:"2. لوحة السوق", seller:"البائع", price:"سعر اليوم", trend:"الاتجاه", channel:"3. أفضل قناة", total:"التكلفة الإجمالية", alt:"بديل", altDesc:"حبوب البرازيل، نفس الملف، 9.5 دولار/كغ، أرخص بنسبة 20%.",
  sim:"4. محاكي الندم", qty:"الكمية للشراء (كغ)", scenarioA:"السيناريو أ — ما أردته (10 كغ)", scenarioB:"السيناريو ب — اقتراحنا (3.2 كغ)", waste:"هدر", saved:"تم التوفير",
  gates:"5. ثلاث بوابات + PayPal + إثبات", bad:"عرض سيئ: 14 دولار، لا مخزون", good:"عرض جيد: 11 دولار، متوفر", authorize:"تفويض — حجز المال", capture:"التقاط — الدفع بعد الإثبات", void:"إلغاء", receipt:"إيصال — المال الموفر", proof:"جدول الإثبات", proofApprove:"اعتماد الإثبات", notStarted:"لم يبدأ طلب PayPal", authorized:"مفوّض — المال محجوز", captured:"تم الالتقاط — تم الدفع", voided:"أُلغي — تم الاسترداد", reset:"إعادة تعيين", note:"MVP يستخدم بيانات عينة. PayPal محاكاة في العرض."
},
pt: {
  title:"SpendProof v2", sub:"Sistema imunológico de gastos", tag:"O sistema imunológico financeiro para pequenas empresas. A IA protege o fluxo de caixa dizendo não.",
  need:"1. Cartão de Necessidade — 5W1H", what:"O quê", why:"Por quê", where:"Onde", when:"Quando", who:"Para quem", how:"Como",
  stock:"Estoque atual (kg)", daily:"Consumo diário", remaining:"Dias restantes", recommended:"Quantidade recomendada", score:"Pontuação de Prova de Necessidade", scoreBuy:"COMPRAR — Necessidade real", scoreWait:"ESPERAR / ALTERNATIVA", scoreNo:"NÃO COMPRAR — Provável impulso",
  market:"2. Painel de Mercado", seller:"Vendedor", price:"Preço hoje", trend:"Tendência", channel:"3. Melhor Canal", total:"Custo total", alt:"Substituto", altDesc:"Grão do Brasil, mesmo perfil, 9.5 USD/kg, 20% mais barato.",
  sim:"4. Simulador de Arrependimento", qty:"Quantidade para comprar (kg)", scenarioA:"Cenário A — O que você queria (10 kg)", scenarioB:"Cenário B — Nossa sugestão (3.2 kg)", waste:"Desperdício", saved:"Economizado",
  gates:"5. Três Portões + PayPal + Prova", bad:"Oferta Ruim: 14 USD, Sem estoque", good:"Boa Oferta: 11 USD, Em estoque", authorize:"Autorizar — Reter dinheiro", capture:"Capturar — Pagar após prova", void:"Anular", receipt:"Recibo — Dinheiro economizado", proof:"Tabela de Prova", proofApprove:"Aprovar prova", notStarted:"Pedido PayPal não iniciado", authorized:"Autorizado — Dinheiro retido", captured:"Capturado — Pago", voided:"Anulado — Reembolsado", reset:"Reiniciar demo", note:"MVP usa dados de exemplo. PayPal simulado na demo."
},
ru: {
  title:"SpendProof v2", sub:"Иммунная система расходов", tag:"Финансовая иммунная система для малого бизнеса. ИИ защищает денежный поток, говоря нет.",
  need:"1. Карточка потребности — 5W1H", what:"Что", why:"Почему", where:"Где", when:"Когда", who:"Для кого", how:"Как",
  stock:"Текущий запас (кг)", daily:"Дневное потребление", remaining:"Осталось дней", recommended:"Рекомендуемое количество", score:"Оценка доказательства потребности", scoreBuy:"КУПИТЬ — Реальная потребность", scoreWait:"ЖДАТЬ / АЛЬТЕРНАТИВА", scoreNo:"НЕ ПОКУПАТЬ — Вероятный импульс",
  market:"2. Рыночная доска", seller:"Продавец", price:"Цена сегодня", trend:"Тренд", channel:"3. Лучший канал", total:"Общая стоимость", alt:"Заменитель", altDesc:"Бразильское зерно, тот же профиль, 9.5 USD/кг, на 20% дешевле.",
  sim:"4. Симулятор сожаления", qty:"Количество для покупки (кг)", scenarioA:"Сценарий А — Что вы хотели (10 кг)", scenarioB:"Сценарий Б — Наше предложение (3.2 кг)", waste:"Отходы", saved:"Сэкономлено",
  gates:"5. Три Ворот + PayPal + Доказательство", bad:"Плохое предложение: 14 USD, Нет на складе", good:"Хорошее предложение: 11 USD, В наличии", authorize:"Авторизовать — Удержать деньги", capture:"Захватить — Оплатить после доказательства", void:"Отменить", receipt:"Чек — Сэкономленные деньги", proof:"Таблица доказательств", proofApprove:"Утвердить доказательство", notStarted:"Заказ PayPal не начат", authorized:"Авторизовано — Деньги удержаны", captured:"Захвачено — Оплачено", voided:"Отменено — Возвращено", reset:"Сбросить демо", note:"MVP использует примерные данные. PayPal в демо симулируется."
},
};
