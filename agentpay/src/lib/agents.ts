export async function runContentAgent(
  task: string,
  lang: string
): Promise<string> {
  // Simulated AI response (replace later with real Claude / OpenAI call)
  await new Promise((r) => setTimeout(r, 1400));

  const responses: Record<string, string> = {
    en: `Here's a professional product description based on your request:\n\n"${task}"\n\nCrafted with precision, benefit-focused and optimized for conversion. Ready for review.`,
    tr: `İsteğine göre profesyonel bir ürün açıklaması hazırladım:\n\n"${task}"\n\nDönüşüm odaklı, net ve ikna edici bir dille yazıldı. İnceleme için hazır.`,
    fr: `Voici une description de produit professionnelle basée sur votre demande :\n\n"${task}"\n\nRédigée avec précision, axée sur les bénéfices et optimisée pour la conversion.`,
    es: `Aquí tienes una descripción profesional del producto basada en tu solicitud:\n\n"${task}"\n\nRedactada con precisión, centrada en beneficios y optimizada para conversión.`,
    de: `Hier ist eine professionelle Produktbeschreibung basierend auf deiner Anfrage:\n\n"${task}"\n\nPräzise formuliert, nutzenorientiert und conversion-optimiert.`,
    it: `Ecco una descrizione professionale del prodotto basata sulla tua richiesta:\n\n"${task}"\n\nScritta con precisione, incentrata sui benefici e ottimizzata per la conversione.`,
    pt: `Aqui está uma descrição profissional do produto com base no seu pedido:\n\n"${task}"\n\nRedigida com precisão, focada em benefícios e otimizada para conversão.`,
    ru: `Вот профессиональное описание продукта на основе вашего запроса:\n\n"${task}"\n\nНаписано точно, с акцентом на преимущества и оптимизировано для конверсии.`,
    ar: `إليك وصف منتج احترافي بناءً على طلبك:\n\n"${task}"\n\nمكتوب بدقة، يركز على الفوائد ومحسّن للتحويل.`,
  };

  return responses[lang] || responses.en;
}

export async function runDesignAgent(
  content: string,
  lang: string
): Promise<{ approved: boolean; feedback: string }> {
  await new Promise((r) => setTimeout(r, 1600));

  const feedbacks: Record<string, string> = {
    en: "Content quality is high. Tone is professional, clear and persuasive. Approved for payment release.",
    tr: "İçerik kalitesi yüksek. Ton profesyonel, net ve ikna edici. Ödeme için onaylandı.",
    fr: "La qualité du contenu est élevée. Le ton est professionnel, clair et persuasif. Approuvé pour le paiement.",
    es: "La calidad del contenido es alta. El tono es profesional, claro y persuasivo. Aprobado para el pago.",
    de: "Die Inhaltsqualität ist hoch. Der Ton ist professionell, klar und überzeugend. Für die Zahlung freigegeben.",
    it: "La qualità del contenuto è alta. Il tono è professionale, chiaro e persuasivo. Approvato per il pagamento.",
    pt: "A qualidade do conteúdo é alta. O tom é profissional, claro e persuasivo. Aprovado para pagamento.",
    ru: "Качество контента высокое. Тон профессиональный, ясный и убедительный. Одобрено к оплате.",
    ar: "جودة المحتوى عالية. النبرة احترافية وواضحة ومقنعة. تمت الموافقة على الدفع.",
  };

  return {
    approved: true,
    feedback: feedbacks[lang] || feedbacks.en,
  };
}
