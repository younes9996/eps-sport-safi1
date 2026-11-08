
"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#15966a] text-[#102e50] font-bold hover:bg-[#15966a] hover:text-white transition"
      aria-label="Changer la langue"
    >
      <span>🌐</span>
      {language === "ar" ? "Français" : "العربية"}
    </button>
  );
}
