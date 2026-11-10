// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { translations, Lang } from "@/lib/i18n";
import {
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Scale,
  FileSignature,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "IDLE" | "ADVERSARIAL" | "BLOCKED" | "OPTION_WAIT" | "CERTIFIED";

export default function SpendGateDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState<Step>("IDLE");
  const [currentPrice, setCurrentPrice] = useState(35.0);
  const [certHash, setCertHash] = useState("");

  const t = translations[lang];

  // Arapça için sağdan sola yazım (RTL) kontrolü
  const dir = lang === "ar" ? "rtl" : "ltr";

  // Fiyat Opsiyonu Simülasyonu (Fiyatın düşmesi)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "OPTION_WAIT") {
      interval = setInterval(() => {
        setCurrentPrice((prev) => {
          const newPrice = prev - Math.random() * 1.5;
          return newPrice > 28.0 ? newPrice : prev; // 28$ altına düşmesin
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleStart = () => setStep("ADVERSARIAL");

  const handleApprove = () => {
    // Eğer ürün fiyatı 40$'dan büyükse (Mandate Limitini aşıyorsa) engelle
    if (currentPrice > 40.0) {
      setStep("BLOCKED");
    } else {
      setStep("OPTION_WAIT");
    }
  };

  const handleCapture = () => {
    // Sahte kriptografik imza oluştur
    setCertHash(
      "ed25519:0x" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    );
    setStep("CERTIFIED");
  };

  const reset = () => {
    setStep("IDLE");
    setCurrentPrice(35.0);
    setCertHash("");
  };

  return (
    <div
      dir={dir}
      className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans selection:bg-indigo-500"
    >
      {/* Dil Seçici */}
      <div className="flex justify-end mb-4">
        <select
          className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
          onChange={(e) => setLang(e.target.value as Lang)}
          value={lang}
        >
          <option value="en">English (Native)</option>
          <option value="tr">Türkçe</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="ar">العربية</option>
          <option value="pt">Português</option>
          <option value="ru">Русский</option>
        </select>
      </div>

      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <ShieldCheck className="text-indigo-500 w-10 h-10" /> {t.title}
        </h1>
        <p className="text-slate-400 text-lg">{t.subtitle}</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sol Panel: İhtiyaç ve Ajanlar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400 flex items-center gap-2">
              <FileSignature className="w-5 h-5" /> {t.needFrame}
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.what}:</strong> 3x USB-C Hub
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.why}:</strong> Presentation
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.where}:</strong> Amazon
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <strong>{t.when}:</strong> 24 Hours
              </div>
            </div>
          </div>

          <AnimatePresence>
            {step !== "IDLE" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-emerald-950/30 border border-emerald-900/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                    <Cpu className="w-5 h-5" /> {t.buyerAgent}
                  </div>
                  <p className="text-sm text-slate-300">
                    "We need this urgently. Specs match perfectly. Proceed."
                  </p>
                </div>
                <div className="bg-rose-950/30 border border-rose-900/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
                    <Scale className="w-5 h-5" /> {t.advAgent}
                  </div>
                  <p className="text-sm text-slate-300">
                    "Wait. Price is 14% above 30-day average. Wait for a drop."
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step === "IDLE" && (
            <button
              onClick={handleStart}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
            >
              {t.btnRequest} <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {step === "ADVERSARIAL" && (
            <button
              onClick={handleApprove}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
            >
              {t.btnApprove}
            </button>
          )}
        </div>

        {/* Sağ Panel: Kapılar, Opsiyon ve Sertifika */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          {step === "IDLE" && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 py-20">
              <ShieldAlert className="w-16 h-16 opacity-20" />
              <p>Awaiting Request...</p>
            </div>
          )}

          {step === "ADVERSARIAL" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-slate-300 mb-4">
                Deterministic Gates
              </h3>
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-emerald-500/30">
                <span>Mandate Limit ($40)</span>{" "}
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {t.gatePassed}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-emerald-500/30">
                <span>Seller Allowlist</span>{" "}
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {t.gatePassed}
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-amber-500/30">
                <span>Price vs 30d Avg</span>{" "}
                <span className="text-amber-400 flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> {t.gateAdvisory}
                </span>
              </div>
            </motion.div>
          )}

          {step === "BLOCKED" && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-4 py-10"
            >
              <XCircle className="w-20 h-20 text-rose-500" />
              <h3 className="text-2xl font-bold text-white">{t.gateFailed}</h3>
              <p className="text-slate-400">
                Mandate limit exceeded. PayPal was never touched.
              </p>
              <button
                onClick={reset}
                className="mt-4 px-6 py-2 bg-slate-800 rounded-lg hover:bg-slate-700"
              >
                Restart
              </button>
            </motion.div>
          )}

          {step === "OPTION_WAIT" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Clock className="w-12 h-12 text-indigo-400 mx-auto mb-2 animate-pulse" />
                <h3 className="text-xl font-bold text-white">
                  {t.optionTitle}
                </h3>
                <p className="text-sm text-slate-400">{t.optionDesc}</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                <div className="text-sm text-slate-500 mb-1">
                  Authorized Price
                </div>
                <div className="text-4xl font-mono text-white mb-2">
                  ${currentPrice.toFixed(2)}
                </div>
                <div className="text-emerald-400 text-sm animate-bounce">
                  {t.priceDrop}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStep("BLOCKED")}
                  className="bg-slate-800 text-slate-300 font-semibold py-3 rounded-lg hover:bg-slate-700"
                >
                  {t.btnVoid}
                </button>
                <button
                  onClick={handleCapture}
                  className="bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-500"
                >
                  {t.btnCapture}
                </button>
              </div>
            </motion.div>
          )}

          {step === "CERTIFIED" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-4 py-6"
            >
              <ShieldCheck className="w-16 h-16 text-emerald-500" />
              <h3 className="text-2xl font-bold text-white">{t.certTitle}</h3>
              <p className="text-sm text-slate-400 px-4">{t.certDesc}</p>

              <div className="w-full bg-slate-950 p-4 rounded-lg border border-slate-800 text-left font-mono text-xs text-slate-500 mt-4 break-all">
                <div className="text-slate-300 mb-1">{"{"}</div>
                <div className="pl-4">"order_id": "MOCK-ORD-A1B2",</div>
                <div className="pl-4">
                  "final_price": ${currentPrice.toFixed(2)},
                </div>
                <div className="pl-4">"gates_passed": true,</div>
                <div className="pl-4 text-emerald-400">
                  "signature": "{certHash}"
                </div>
                <div className="text-slate-300">{"}"}</div>
              </div>

              <button
                onClick={reset}
                className="mt-4 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 text-white w-full"
              >
                Run Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
