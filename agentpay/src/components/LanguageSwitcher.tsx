"use client";

import { Language } from "@/types";

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
];

export default function LanguageSwitcher({ current, onChange }: Props) {
  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value as Language)}
      className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
