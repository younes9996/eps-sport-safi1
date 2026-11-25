import CurrentYear from "@/app/components/CurrentYear";
import Link from "next/link";

const activities = [

{
  title: "العدو الريفي",
  description: "تنظيم المنافسات  في العدو الريفي بمختلف الفئات العمرية، وتشجيع التلاميذ على المشاركة واكتشاف المواهب الرياضية.",
  icon: "🏃‍♂️",
  color: "from-green-600 to-green-800",
},

  {
    title: "كرة القدم المدرسية",
    description: "تنظيم المنافسات الإقليمية لكرة القدم بين المؤسسات التعليمية.",
    icon: "⚽",
    color: "from-blue-700 to-blue-900",
  },
  {
    title: "كرة السلة",
    description: "تشجيع التلاميذ على ممارسة كرة السلة وتنمية روح الفريق.",
    icon: "🏀",
    color: "from-orange-500 to-orange-700",
  },
  {
    title: "كرة اليد",
    description: "تنظيم البطولات المدرسية في كرة اليد بمختلف الفئات.",
    icon: "🤾",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    title: "الكرة الطائرة",
    description: "إتاحة الفرصة للتلاميذ للمشاركة في المنافسات المدرسية.",
    icon: "🏐",
    color: "from-cyan-600 to-blue-800",
  },
  {
    title: "ألعاب القوى",
    description: "تنظيم مسابقات الجري والقفز والرمي واكتشاف المواهب.",
    icon: "🏃",
    color: "from-purple-600 to-purple-800",
  },
  {
    title: "الرياضات الأخرى",
    description: "أنشطة رياضية متنوعة حسب البرنامج السنوي للرياضة المدرسية.",
    icon: "🏅",
    color: "from-amber-500 to-amber-700",
  },
];

export default function ActivitesPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-l from-[#061b3b] via-[#0b477d] to-[#082d59] px-4 py-20 text-white">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link href="/" className="mb-8 inline-block text-sm text-blue-200 hover:text-white">
            الرئيسية ←
          </Link>

          <div className="max-w-3xl">
            <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-amber-300">
              الرياضة المدرسية بإقليم آسفي
            </span>

            <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-5xl">
              الأنشطة والبطولات الرياضية المدرسية
            </h1>

            <p className="text-lg leading-9 text-blue-100">
              فضاء للتعريف بمختلف الأنشطة والمنافسات الرياضية المدرسية
              المنظمة بإقليم آسفي، وتشجيع التلاميذ على المشاركة
              واكتشاف المواهب الرياضية.
            </p>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-amber-500" />
          <h2 className="text-2xl font-extrabold text-[#082d59] md:text-3xl">
            الرياضات المدرسية
          </h2>
          <p className="mt-4 text-slate-500">
            تعرف على مختلف التخصصات الرياضية المدرسية
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <article
              key={activity.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className={`flex h-36 items-center justify-center bg-gradient-to-l ${activity.color}`}>
                <span className="text-6xl transition duration-300 group-hover:scale-125">
                  {activity.icon}
                </span>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl font-extrabold text-[#082d59]">
                  {activity.title}
                </h3>

                <p className="leading-8 text-slate-500">
                  {activity.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COMPETITIONS */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-[#082d59] md:text-3xl">
              البطولات والمنافسات
            </h2>
            <p className="mt-4 text-slate-500">
              تابع برنامج المنافسات والبطولات الرياضية المدرسية
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50 px-6 py-12 text-center">
            <div className="mb-4 text-5xl">📅</div>
            <h3 className="mb-3 text-xl font-extrabold text-[#082d59]">
              برنامج المنافسات الرياضية
            </h3>
            <p className="mx-auto max-w-2xl leading-8 text-slate-600">
              سيتم نشر مواعيد البطولات والمنافسات والأنشطة الرياضية
              المدرسية فور اعتماد البرنامج الرسمي.
            </p>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-l from-[#061b3b] to-[#0b477d] p-8 text-center text-white md:p-12">
          <div className="mb-4 text-5xl">🏆</div>

          <h2 className="mb-4 text-2xl font-extrabold md:text-3xl">
            النتائج والترتيب
          </h2>

          <p className="mb-7 leading-8 text-blue-100">
            فضاء خاص بنشر نتائج المنافسات الرياضية والترتيب
            حسب المؤسسات التعليمية والفئات المشاركة.
          </p>

          <Link
            href="/resultats"
            className="inline-block rounded-xl bg-amber-500 px-8 py-3 font-extrabold text-[#082d59] transition hover:bg-amber-400"
          >
            الاطلاع على النتائج
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#04152f] px-4 py-8 text-center text-sm text-blue-100">
        <p className="font-bold">
          الفرع الإقليمي للرياضة المدرسية بآسفي
        </p>
        <p className="mt-2 text-blue-300">
          جميع الحقوق محفوظة © <CurrentYear />
        </p>
        <Link href="/" className="mt-4 inline-block text-amber-400 hover:text-amber-300">
          العودة إلى الصفحة الرئيسية
        </Link>
      </footer>

    </main>
  );
}
