"use client";

import { Payment, Language } from "@/types";
import { t } from "@/lib/i18n";

interface Props {
  payments: Payment[];
  lang: Language;
}

export default function PaymentHistory({ payments, lang }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
      <h2 className="text-lg font-semibold text-white mb-4">
        {t(lang, "history")}
      </h2>

      {payments.length === 0 ? (
        <p className="text-gray-400 text-sm">{t(lang, "noPayments")}</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {payments.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">{t(lang, "from")}:</span>{" "}
                    {p.from}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="text-gray-500">{t(lang, "to")}:</span> {p.to}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">
                    ${p.amount} {p.currency}
                  </p>
                  <p className="text-xs text-green-500 mt-1 uppercase">
                    {p.status}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(p.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
