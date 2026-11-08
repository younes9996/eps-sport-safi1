
"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function ServicesSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const services = [
    {
      title: isArabic ? "البطولات المدرسية" : "Compétitions scolaires",
      description: isArabic
        ? "اكتشف مختلف البطولات والمسابقات الرياضية المدرسية."
        : "Découvrez les différentes compétitions sportives scolaires.",
      icon: "🏆",
      href: "/competitions",
    },
    {
      title: isArabic ? "النتائج والترتيب" : "Résultats et classements",
      description: isArabic
        ? "تابع نتائج المنافسات والترتيب العام للمؤسسات."
        : "Consultez les résultats et les classements des établissements.",
      icon: "📊",
      href: "/resultats",
    },
    {
      title: isArabic ? "البرمجة الرياضية" : "Programmation sportive",
      description: isArabic
        ? "اطلع على مواعيد المباريات والأنشطة الرياضية."
        : "Consultez le calendrier des matchs et des activités sportives.",
      icon: "📅",
      href: "/programmation",
    },
    {
      title: isArabic ? "المؤسسات التعليمية" : "Établissements scolaires",
      description: isArabic
        ? "اكتشف المؤسسات المشاركة في الرياضة المدرسية."
        : "Découvrez les établissements participant au sport scolaire.",
      icon: "🏫",
      href: "/etablissements",
    },
    {
      title: isArabic ? "سجل الأبطال" : "Palmarès des champions",
      description: isArabic
        ? "تعرف على الأبطال والإنجازات الرياضية المدرسية."
        : "Découvrez les champions et les performances sportives scolaires.",
      icon: "🥇",
      href: "/palmares",
    },
    {
      title: isArabic ? "الأخبار والمستجدات" : "Actualités et nouveautés",
      description: isArabic
        ? "تابع آخر أخبار وأنشطة الرياضة المدرسية بالإقليم."
        : "Suivez les actualités et les activités du sport scolaire dans la province.",
      icon: "📰",
      href: "/actualites",
    },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="max-w-7xl mx-auto px-5 py-20"
    >
      <div className="text-center mb-12">
        <span className="text-[#15966a] font-bold">
          {isArabic ? "اكتشف منصتنا" : "Découvrez notre plateforme"}
        </span>

        <h2 className="text-3xl md:text-4xl font-black text-[#102e50] mt-3">
          {isArabic ? "فضاء الرياضة المدرسية" : "Espace du sport scolaire"}
        </h2>

        <p className="text-gray-500 mt-4">
          {isArabic
            ? "جميع المعلومات والخدمات الرياضية المدرسية في مكان واحد"
            : "Toutes les informations et les services du sport scolaire réunis au même endroit"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {services.map((service) => (
          <Link
            href={service.href}
            key={service.href}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition group"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#e9f7f1] flex items-center justify-center text-3xl mb-6 group-hover:bg-[#15966a] transition">
              {service.icon}
            </div>

            <h3 className="text-xl font-extrabold text-[#102e50] mb-3">
              {service.title}
            </h3>

            <p className="text-gray-500 leading-8">
              {service.description}
            </p>

            <div className="text-[#15966a] font-bold mt-6">
              {isArabic ? "اكتشف المزيد ←" : "En savoir plus →"}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
