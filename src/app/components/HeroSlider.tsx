
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function HeroSlider() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const slides = [
    {
      image: "/images/slide-basketball.jpg",
      badge: isArabic ? "الرياضة المدرسية بإقليم آسفي" : "SPORT SCOLAIRE • SAFI",
      title: isArabic ? "نصنع التميز" : "L'EXCELLENCE",
      accent: isArabic ? "الرياضي" : "SPORTIVE",
      description: isArabic
        ? "فضاء يجمع المواهب، ويحتفي بالإنجازات، ويعزز مكانة الرياضة المدرسية بإقليم آسفي."
        : "Un espace dédié aux talents, aux performances et au rayonnement du sport scolaire dans la province de Safi.",
      button: isArabic ? "اكتشف المنافسات" : "Découvrir les compétitions",
      link: "/competitions",
    },
    {
      image: "/images/slide-team.jpg",
      badge: isArabic ? "روح الفريق • قيم المواطنة" : "ESPRIT D'ÉQUIPE • CITOYENNETÉ",
      title: isArabic ? "معاً نحو" : "ENSEMBLE",
      accent: isArabic ? "القمة" : "VERS LE SOMMET",
      description: isArabic
        ? "نؤمن بأن الرياضة المدرسية مدرسة للقيم، ومجال لاكتشاف المواهب وصناعة أبطال المستقبل."
        : "Le sport scolaire transmet des valeurs, révèle les talents et prépare les champions de demain.",
      button: isArabic ? "اكتشف أنشطتنا" : "Nos activités",
      link: "/activites",
    },
    {
      image: "/images/slide-award.jpg",
      badge: isArabic ? "إنجازات تستحق الفخر" : "DES RÉUSSITES À CÉLÉBRER",
      title: isArabic ? "نجاحات اليوم" : "LES SUCCÈS",
      accent: isArabic ? "أبطال الغد" : "DE DEMAIN",
      description: isArabic
        ? "نثمن جهود التلميذات والتلاميذ والأطر التربوية، ونوثق لحظات التألق في مختلف البطولات."
        : "Valoriser les élèves et les équipes éducatives, et célébrer les moments forts des championnats.",
      button: isArabic ? "اكتشف النتائج" : "Voir les résultats",
      link: "/resultats",
    },
  ];

  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate w-full h-[540px] md:h-[650px] overflow-hidden bg-[#071d32]"
    >
      {/* الخلفية الضبابية */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={slide.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-110 blur-2xl opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#071d32]/35" />
      </div>

      {/* الصورة الأصلية */}
      <div className="absolute inset-0 -z-10">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="object-contain object-center"
        />
      </div>

      {/* طبقة تدرج لحماية وضوح الكتابة */}
      <div
        className={`absolute inset-0 -z-0 ${
          isArabic
            ? "bg-gradient-to-l from-[#061b30]/95 via-[#061b30]/75 to-[#061b30]/10"
            : "bg-gradient-to-r from-[#061b30]/95 via-[#061b30]/75 to-[#061b30]/10"
        }`}
      />

      {/* لمسات لونية */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-[110px] pointer-events-none" />

      {/* محتوى السلايدر */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-7 md:px-16 flex items-center">
        <div
          key={`${current}-${language}`}
          className={`w-full max-w-3xl animate-[heroAppear_0.8s_ease-out] ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {/* الشارة العلوية */}
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-3 rounded-full border border-emerald-300/40 bg-[#092d43]/75 backdrop-blur-xl shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>

            <span className="text-emerald-100 text-sm md:text-base font-extrabold tracking-wide">
              {slide.badge}
            </span>
          </div>

          {/* العنوان الرئيسي */}
          <div className="mb-7">
            <h1 className="text-white font-black leading-[1.3] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[82px] drop-shadow-2xl">
              {slide.title}
            </h1>

            <h2 className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#54e6a5] via-[#b9f5d8] to-[#e6c878] font-black leading-[1.25] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
              {slide.accent}
            </h2>

            <div
              className={`mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300 ${
                isArabic ? "mr-0" : "ml-0"
              }`}
            />
          </div>

          {/* الوصف */}
          <p className="max-w-2xl text-white/95 text-base md:text-xl leading-9 md:leading-10 font-medium drop-shadow-lg mb-9">
            {slide.description}
          </p>

          {/* الزر */}
          <Link
            href={slide.link}
            className="group inline-flex items-center gap-4 rounded-xl px-8 py-4 bg-gradient-to-r from-[#119b6c] to-[#087c59] border border-emerald-300/40 text-white font-extrabold text-base md:text-lg shadow-[0_10px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.35)] hover:-translate-y-1 transition-all duration-300"
          >
            <span>{slide.button}</span>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">
              {isArabic ? "←" : "→"}
            </span>
          </Link>
        </div>
      </div>

      {/* أزرار التنقل */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute z-20 left-5 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/40 bg-[#071d32]/60 backdrop-blur-md text-white text-3xl hover:bg-emerald-600 hover:border-emerald-400 transition-all duration-300"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute z-20 right-5 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/40 bg-[#071d32]/60 backdrop-blur-md text-white text-3xl hover:bg-emerald-600 hover:border-emerald-400 transition-all duration-300"
      >
        ›
      </button>

      {/* مؤشرات الصور */}
      <div className="absolute z-20 bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              current === index
                ? "w-12 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
                : "w-3 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes heroAppear {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
