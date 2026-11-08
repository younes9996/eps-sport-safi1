
"use client";

import { useLanguage } from "./LanguageProvider";

export default function StatsSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const stats = [
    {
      number: "—",
      label: isArabic ? "المؤسسات التعليمية" : "Établissements scolaires",
      icon: "🏫",
    },
    {
      number: "—",
      label: isArabic ? "البطولات الرياضية" : "Compétitions sportives",
      icon: "🏆",
    },
    {
      number: "—",
      label: isArabic ? "الرياضيون المشاركون" : "Sportifs participants",
      icon: "🏃",
    },
    {
      number: "—",
      label: isArabic ? "الإنجازات الرياضية" : "Performances sportives",
      icon: "🥇",
    },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="max-w-7xl mx-auto px-5 -mt-10 relative z-20 w-full"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-3xl font-black text-[#15966a]">
              {item.number}
            </div>
            <p className="text-sm text-gray-600 mt-2 font-bold">
              {item.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
