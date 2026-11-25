
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      title: "البطولات المدرسية",
      description: "اكتشف مختلف البطولات والمسابقات الرياضية المدرسية.",
      icon: "🏆",
      href: "/competitions",
    },
    {
      title: "النتائج والترتيب",
      description: "تابع نتائج المنافسات والترتيب العام للمؤسسات.",
      icon: "📊",
      href: "/resultats",
    },
    {
      title: "البرمجة الرياضية",
      description: "اطلع على مواعيد المباريات والأنشطة الرياضية.",
      icon: "📅",
      href: "/programmation",
    },
    {
      title: "المؤسسات التعليمية",
      description: "اكتشف المؤسسات المشاركة في الرياضة المدرسية.",
      icon: "🏫",
      href: "/etablissements",
    },
    {
      title: "سجل الأبطال",
      description: "تعرف على الأبطال والإنجازات الرياضية المدرسية.",
      icon: "🥇",
      href: "/palmares",
    },
    {
      title: "الأخبار والمستجدات",
      description: "تابع آخر أخبار وأنشطة الرياضة المدرسية بالإقليم.",
      icon: "📰",
      href: "/actualites",
    },
  ];

  return (
    <section
      dir="rtl"
      lang="ar"
      className="mx-auto max-w-7xl px-5 py-20"
    >
      <div className="mb-12 text-center">
        <span className="font-bold text-[#15966a]">
          اكتشف منصتنا
        </span>

        <h2 className="mt-3 text-3xl font-black text-[#102e50] md:text-4xl">
          فضاء الرياضة المدرسية
        </h2>

        <p className="mt-4 text-gray-500">
          جميع المعلومات والخدمات الرياضية المدرسية في مكان واحد
        </p>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            href={service.href}
            key={service.href}
            className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9f7f1] text-3xl transition group-hover:bg-[#15966a]">
              {service.icon}
            </div>

            <h3 className="mb-3 text-xl font-extrabold text-[#102e50]">
              {service.title}
            </h3>

            <p className="leading-8 text-gray-500">
              {service.description}
            </p>

            <div className="mt-6 font-bold text-[#15966a]">
              اكتشف المزيد ←
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
