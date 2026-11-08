
"use client";

import Image from "next/image";
import Link from "next/link";

import HeroSlider from "@/app/components/HeroSlider";
import StatsSection from "@/app/components/StatsSection";
import ServicesSection from "@/app/components/ServicesSection";
import NewsSection from "@/app/components/NewsSection";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function Home() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const text = {
    topTitle: isArabic
      ? "المملكة المغربية - وزارة التربية الوطنية والتعليم الأولي والرياضة"
      : "Royaume du Maroc - Ministère de l'Éducation Nationale",
    branch: isArabic
      ? "الفرع الإقليمي للرياضة المدرسية - آسفي"
      : "Branche Provinciale du Sport Scolaire - Safi",
    home: isArabic ? "الرئيسية" : "Accueil",
    news: isArabic ? "الأخبار" : "Actualités",
    competitions: isArabic ? "البطولات" : "Compétitions",
    schedule: isArabic ? "البرمجة" : "Programmation",
    results: isArabic ? "النتائج" : "Résultats",
    champions: isArabic ? "سجل الأبطال" : "Palmarès",
    gallery: isArabic ? "معرض الصور" : "Galerie photos",
    gallerySubtitle: isArabic
      ? "لحظات رياضية وذكريات من المنافسات المدرسية بإقليم آسفي"
      : "Des moments sportifs et des souvenirs des compétitions scolaires à Safi",
    callTitle: isArabic
      ? "الرياضة المدرسية، فضاء للتربية والتميز"
      : "Le sport scolaire, un espace d'éducation et d'excellence",
    callDescription: isArabic
      ? "نعمل على تعزيز الممارسة الرياضية داخل المؤسسات التعليمية وترسيخ قيم التعاون والروح الرياضية والمواطنة."
      : "Nous encourageons la pratique sportive dans les établissements scolaires et promouvons les valeurs de coopération, de fair-play et de citoyenneté.",
    discover: isArabic ? "اكتشف آخر المستجدات" : "Découvrir les actualités",
    importantLinks: isArabic ? "روابط مهمة" : "Liens utiles",
    platformInfo: isArabic ? "معلومات المنصة" : "Informations",
    description: isArabic
      ? "المنصة الرقمية للفرع الإقليمي للرياضة المدرسية بإقليم آسفي، فضاء للتواصل والتعريف بالمنافسات والأنشطة الرياضية المدرسية."
      : "La plateforme numérique de la Branche Provinciale du Sport Scolaire de Safi, dédiée à l'information et à la promotion des activités et compétitions scolaires.",
    copyright: isArabic ? "جميع الحقوق محفوظة" : "Tous droits réservés",
  };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="min-h-screen bg-[#f4f7fa] text-[#173653]"
    >
      {/* الشريط العلوي */}
      <div className="bg-[#102e50] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-5 flex justify-between flex-wrap gap-2">
          <span>{text.topTitle}</span>
          <span>{text.branch}</span>
        </div>
      </div>

      {/* رأس الموقع */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between flex-wrap gap-5">

          <Link href="/" className="flex items-center gap-3">
            <div className="w-[180px] h-[80px] md:w-[300px] md:h-[110px] flex items-center justify-center">
              <Image
                src="/images/ministere-logo.png"
                alt="Ministère de l'Éducation Nationale"
                width={2048}
                height={614}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <Image
              src="/images/federation-logo.png"
              alt="الجامعة الملكية المغربية للرياضة المدرسية"
              width={120}
              height={120}
              className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] object-contain"
              priority
            />

            <div className={isArabic ? "border-r pr-3" : "border-l pl-3"}>
              <h1 className="text-lg md:text-xl font-extrabold text-[#102e50]">
                {isArabic ? "الرياضة المدرسية" : "Sport Scolaire"}
              </h1>
              <p className="text-sm text-[#15966a] font-bold">
                {text.branch}
              </p>
            </div>
          </Link>

          {/* القائمة الرئيسية */}
          <div className="flex items-center flex-wrap gap-4">
            <nav className="site-nav">
              <Link href="/">{text.home}</Link>
              <Link href="/actualites">{text.news}</Link>
              <Link href="/competitions">{text.competitions}</Link>
              <Link href="/programmation">{text.schedule}</Link>
              <Link href="/resultats">{text.results}</Link>
              <Link href="/palmares">{text.champions}</Link>
            </nav>

            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* الواجهة الرئيسية */}
      <HeroSlider />

      {/* الإحصائيات */}
      <StatsSection />

      {/* الخدمات */}
      <ServicesSection />

      {/* الأخبار */}
      <NewsSection />

      {/* معرض الصور */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-10">
          <span className="text-[#15966a] font-bold">
            {isArabic ? "ذاكرة الرياضة المدرسية" : "Mémoire du sport scolaire"}
          </span>

          <h2 className="text-3xl font-black text-[#102e50] mt-3">
            {text.gallery}
          </h2>

          <p className="text-gray-500 mt-3">
            {text.gallerySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              src: "/images/slide-basketball.jpg",
              alt: isArabic ? "أنشطة كرة السلة" : "Activités de basketball",
            },
            {
              src: "/images/slide-team.jpg",
              alt: isArabic ? "الفرق الرياضية" : "Équipes sportives",
            },
            {
              src: "/images/slide-award.jpg",
              alt: isArabic ? "تتويج الأبطال" : "Remise des récompenses",
            },
            {
              src: "/images/safi-monument.jpg",
              alt: isArabic ? "مدينة آسفي" : "Ville de Safi",
            },
          ].map((item) => (
            <div
              key={item.src}
              className="relative h-48 md:h-60 rounded-2xl overflow-hidden shadow-md"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* دعوة للتعريف بالرياضة المدرسية */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="bg-[#102e50] rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-5">
            {text.callTitle}
          </h2>

          <p className="text-gray-200 leading-8 max-w-2xl mx-auto mb-8">
            {text.callDescription}
          </p>

          <Link
            href="/actualites"
            className="inline-block bg-[#15966a] hover:bg-[#08794f] px-8 py-4 rounded-xl font-bold transition"
          >
            {text.discover}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b223b] text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-10 pb-10">
            <div>
              <h3 className="text-xl font-black mb-4">
                {isArabic ? "الرياضة المدرسية - آسفي" : "Sport Scolaire - Safi"}
              </h3>
              <p className="text-gray-300 leading-8 text-sm">
                {text.description}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">
                {text.importantLinks}
              </h3>
              <div className="flex flex-col gap-3 text-gray-300 text-sm">
                <Link href="/actualites">{text.news}</Link>
                <Link href="/competitions">{text.competitions}</Link>
                <Link href="/programmation">{text.schedule}</Link>
                <Link href="/resultats">{text.results}</Link>
                <Link href="/palmares">{text.champions}</Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">
                {text.platformInfo}
              </h3>
              <p className="text-gray-300 text-sm leading-8">
                {isArabic ? "المملكة المغربية" : "Royaume du Maroc"}
                <br />
                {isArabic ? "جهة مراكش آسفي" : "Région Marrakech-Safi"}
                <br />
                {isArabic ? "إقليم آسفي" : "Province de Safi"}
                <br />
                {text.branch}
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
            © 2026 {text.branch}
            <br />
            {text.copyright}
          </div>
        </div>
      </footer>
    </main>
  );
}
