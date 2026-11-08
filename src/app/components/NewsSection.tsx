
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function NewsSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const news = [
    {
      image: "/images/slide-basketball.jpg",
      category: isArabic ? "البطولات" : "Compétitions",
      title: isArabic
        ? "البطولات الرياضية المدرسية"
        : "Les compétitions sportives scolaires",
      description: isArabic
        ? "تابع مستجدات المنافسات الرياضية المدرسية بالإقليم."
        : "Suivez les actualités des compétitions sportives scolaires dans la province.",
    },
    {
      image: "/images/slide-team.jpg",
      category: isArabic ? "الأنشطة" : "Activités",
      title: isArabic ? "الأنشطة الرياضية" : "Activités sportives",
      description: isArabic
        ? "اكتشف مختلف الأنشطة والمبادرات الرياضية المدرسية."
        : "Découvrez les différentes activités et initiatives sportives scolaires.",
    },
    {
      image: "/images/slide-award.jpg",
      category: isArabic ? "الإنجازات" : "Performances",
      title: isArabic ? "أبطال الرياضة المدرسية" : "Les champions du sport scolaire",
      description: isArabic
        ? "فضاء للتعريف بالإنجازات والأبطال الرياضيين."
        : "Un espace dédié aux champions et aux performances sportives.",
    },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-white py-20"
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <div>
            <span className="text-[#15966a] font-bold">
              {isArabic ? "آخر المستجدات" : "À la une"}
            </span>

            <h2 className="text-3xl font-black text-[#102e50] mt-2">
              {isArabic ? "الأخبار والأنشطة" : "Actualités et activités"}
            </h2>
          </div>

          <Link
            href="/actualites"
            className="text-[#15966a] font-bold hover:underline"
          >
            {isArabic ? "جميع الأخبار ←" : "Toutes les actualités →"}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.image}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-xs text-[#15966a] font-bold">
                  {item.category}
                </span>

                <h3 className="text-lg font-extrabold mt-3 text-[#102e50]">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-3 leading-7">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
