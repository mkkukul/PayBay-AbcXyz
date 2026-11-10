"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Language, Message, Payment } from "@/types";
import { t } from "@/lib/i18n";
import { runContentAgent, runDesignAgent } from "@/lib/agents";
import { sendPayout, getPayments } from "@/lib/mockPaypal";
import LanguageSwitcher from "./LanguageSwitcher";
import PaymentHistory from "./PaymentHistory";

export default function Dashboard() {
  const [lang, setLang] = useState<Language>("en");
  const [task, setTask] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addMessage = (
    from: Message["from"],
    text: string
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        from,
        text,
        timestamp: new Date(),
      },
    ]);
  };

  const handleStartTask = async () => {
    if (!task.trim() || isRunning) return;

    setIsRunning(true);
    setMessages([]);
    
    // User message
    addMessage("user", task);

    try {
      // 1. Content Agent works
      addMessage("system", t(lang, "agentsWorking"));
      const contentResult = await runContentAgent(task, lang);
      addMessage("content-agent", contentResult);

      // 2. Design Agent reviews
      addMessage("system", t(lang, "waitingApproval"));
      const designResult = await runDesignAgent(contentResult, lang);
      addMessage("design-agent", designResult.feedback);

      // 3. If approved → payment
      if (designResult.approved) {
        const payment = await sendPayout(
          "Content Agent",
          "Design Agent",
          15
        );
        setPayments(getPayments());
        addMessage(
          "system",
          `${t(lang, "paymentCompleted")} → $15.00 USD`
        );
        addMessage("system", t(lang, "taskCompleted"));
      }
    } catch (err) {
      addMessage("system", "An error occurred. Please try again.");
    } finally {
      setIsRunning(false);
      setTask("");
    }
  };

  const getAgentColor = (from: Message["from"]) => {
    switch (from) {
      case "content-agent":
        return "bg-blue-900/40 border-blue-700";
      case "design-agent":
        return "bg-purple-900/40 border-purple-700";
      case "system":
        return "bg-gray-800 border-gray-600";
      default:
        return "bg-gray-700 border-gray-500";
    }
  };

  const getAgentName = (from: Message["from"]) => {
    switch (from) {
      case "content-agent":
        return t(lang, "contentAgent");
      case "design-agent":
        return t(lang, "designAgent");
      case "system":
        return t(lang, "system");
      default:
        return "You";
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {t(lang, "title")}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {t(lang, "subtitle")}
            </p>
          </div>
          <LanguageSwitcher current={lang} onChange={setLang} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Chat / Agents */}
        <div className="lg:col-span-2 space-y-4">
          {/* Input */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t(lang, "startTask")}
            </label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder={t(lang, "placeholder")}
              rows={3}
              disabled={isRunning}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
              dir={lang === "ar" ? "rtl" : "ltr"}
            />
            <button
              onClick={handleStartTask}
              disabled={isRunning || !task.trim()}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isRunning ? t(lang, "processing") : t(lang, "send")}
            </button>
          </div>

          {/* Messages */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 min-h-[400px]">
            <div className="space-y-4">
              {messages.length === 0 && (
                <p className="text-gray-500 text-center py-20">
                  {t(lang, "startTask")}
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`border rounded-lg p-4 ${getAgentColor(msg.from)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                      {getAgentName(msg.from)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Payments */}
        <div>
          <PaymentHistory payments={payments} lang={lang} />
        </div>
      </main>
    </div>
  );
}
