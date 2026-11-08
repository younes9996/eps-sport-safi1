
"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const sections = {
  actualites: {
    ar: ["الأخبار والمستجدات", "تابع آخر أخبار وأنشطة الرياضة المدرسية بإقليم آسفي."],
    fr: ["Actualités et nouveautés", "Suivez les dernières actualités du sport scolaire dans la province de Safi."],
    icon: "📰",
  },
  competitions: {
    ar: ["البطولات والمسابقات", "اكتشف مختلف البطولات الرياضية المدرسية."],
    fr: ["Compétitions et championnats", "Découvrez les différentes compétitions sportives scolaires."],
    icon: "🏆",
  },
  resultats: {
    ar: ["النتائج والترتيب", "اطلع على نتائج المنافسات والترتيب العام."],
    fr: ["Résultats et classements", "Consultez les résultats des compétitions et les classements généraux."],
    icon: "🥇",
  },
  programmation: {
    ar: ["البرمجة الرياضية", "تعرف على مواعيد المباريات والأنشطة المقبلة."],
    fr: ["Programmation sportive", "Consultez le calendrier des matchs et des prochaines activités."],
    icon: "📅",
  },
  etablissements: {
    ar: ["المؤسسات التعليمية", "دليل المؤسسات التعليمية المشاركة في الرياضة المدرسية."],
    fr: ["Établissements scolaires", "Découvrez les établissements participant au sport scolaire."],
    icon: "🏫",
  },
  palmares: {
    ar: ["سجل الأبطال", "نحتفي بأبطال وإنجازات الرياضة المدرسية بإقليم آسفي."],
    fr: ["Palmarès des champions", "Célébrons les champions et les performances du sport scolaire à Safi."],
    icon: "🏅",
  },
  contact: {
    ar: ["اتصل بنا", "نحن رهن إشارتكم للاستفسار والتواصل."],
    fr: ["Contactez-nous", "Nous sommes à votre disposition pour toute question ou demande d'information."],
    icon: "✉️",
  },
};

type SectionKey = keyof typeof sections;

export default function SectionContent({ section }: { section: string }) {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  if (!(section in sections)) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black">404</h1>
          <Link href="/" className="text-[#15966a] underline">
            {isArabic ? "العودة للرئيسية" : "Retour à l'accueil"}
          </Link>
        </div>
      </main>
    );
  }

  const data = sections[section as SectionKey];
  const content = data[language];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="min-h-screen bg-[#f3f7fa]"
    >
      <header className="bg-[#102c4b] text-white px-5 md:px-[6%] py-5 flex justify-between items-center flex-wrap gap-4">
        <Link href="/" className="font-bold">
          {isArabic ? "← العودة إلى الصفحة الرئيسية" : "← Retour à l'accueil"}
        </Link>

        <button
          onClick={toggleLanguage}
          className="bg-[#15966a] px-4 py-2 rounded-lg font-bold"
        >
          {isArabic ? "Français" : "العربية"}
        </button>
      </header>

      <section className="bg-gradient-to-r from-[#102c4b] to-[#176c65] text-white py-20 px-6 text-center">
        <div className="text-6xl mb-5">{data.icon}</div>
        <h1 className="text-3xl md:text-4xl font-black mb-5">
          {content[0]}
        </h1>
        <p className="text-base md:text-lg leading-9">
          {content[1]}
        </p>
      </section>

      <section className="max-w-5xl mx-auto my-12 px-5">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-2xl font-black text-[#15966a] mb-4">
            {isArabic ? "قريباً على منصتنا" : "Bientôt sur notre plateforme"}
          </h2>
          <p className="text-gray-500 leading-8">
            {isArabic
              ? "سيتم نشر المعلومات والبيانات الخاصة بهذا القسم بعد تفعيل لوحة الإدارة."
              : "Les informations de cette rubrique seront publiées après l'activation du panneau d'administration."}
          </p>
        </div>
      </section>

      <footer className="bg-[#102c4b] text-white p-6 text-center">
        {isArabic
          ? "الفرع الإقليمي للرياضة المدرسية – آسفي"
          : "Branche Provinciale du Sport Scolaire – Safi"}{" "}
        © 2026
      </footer>
    </main>
  );
}
