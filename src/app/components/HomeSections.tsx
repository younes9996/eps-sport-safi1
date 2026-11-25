import Link from "next/link";
import {
  IconArrowLeft,
  IconBook,
  IconCamera,
  IconMedal,
  IconNews,
  IconRunner,
  IconScale,
  IconTrophy,
  IconUsers,
} from "./icons";

/* ========== بطاقات الأقسام الملونة ========== */

const categoryCards = [
  {
    value: "education-physique",
    title: "التربية البدنية",
    subtitle: "موارد ووثائق المادة",
    Icon: IconRunner,
    card: "bg-green-50 border-green-200",
    icon: "text-green-700",
  },
  {
    value: "reglementation",
    title: "المقتضيات التنظيمية والتشريعية",
    subtitle: "النصوص القانونية والمذكرات",
    Icon: IconScale,
    card: "bg-blue-50 border-blue-200",
    icon: "text-blue-700",
  },
  {
    value: "association-sportive",
    title: "الجمعية الرياضية",
    subtitle: "وثائق التسيير والتنظيم",
    Icon: IconMedal,
    card: "bg-emerald-50 border-emerald-200",
    icon: "text-emerald-600",
  },
  {
    value: "examens-professionnels",
    title: "نماذج الامتحانات المهنية",
    subtitle: "نماذج ومواضيع الامتحانات",
    Icon: IconBook,
    card: "bg-violet-50 border-violet-200",
    icon: "text-violet-600",
  },
];

export function CategoryCards() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-5 md:px-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {categoryCards.map(({ value, title, subtitle, Icon, card, icon }) => (
          <Link
            key={value}
            href={`/documents?category=${value}`}
            className={`flex flex-col items-start gap-2 rounded-2xl border p-4 transition hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:gap-4 sm:p-5 ${card}`}
          >
            <Icon className={`h-9 w-9 shrink-0 sm:h-12 sm:w-12 ${icon}`} />
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-extrabold leading-6 text-[#082d59] sm:text-lg">{title}</h3>
              <p className="hidden text-sm font-semibold text-slate-600 sm:block">{subtitle}</p>
            </div>
            <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#082d59] text-white sm:flex">
              <IconArrowLeft className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ========== الأرقام ========== */

export type SiteStats = {
  participants: string;
  schools: string;
  championships: string;
};

export function HomeStats({ data }: { data: SiteStats | null }) {
  // الأرقام تأتي من لوحة الإدارة (جدول site_stats)
  const stats = [
    { value: data?.participants ?? "—", label: "مشارك ومشاركة", Icon: IconMedal, color: "text-amber-600" },
    { value: data?.schools ?? "—", label: "مؤسسة مشاركة", Icon: IconUsers, color: "text-blue-700" },
    { value: data?.championships ?? "—", label: "بطولة مدرسية", Icon: IconTrophy, color: "text-amber-600" },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-6">
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm lg:flex-row">
        <div className="flex items-center gap-4 bg-[#082d59] px-5 py-4 text-white sm:px-8 sm:py-6 lg:flex-1">
          <IconTrophy className="h-10 w-10 shrink-0 text-amber-400 sm:h-14 sm:w-14" />
          <div>
            <h2 className="text-lg font-black sm:text-xl md:text-2xl">
              الرياضة المدرسية بإقليم آسفي
            </h2>
            <p className="font-extrabold text-amber-400">أرقام تعكس دينامية متواصلة</p>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 lg:flex-[2]">
          {stats.map(({ value, label, Icon, color }) => (
            <div key={label} className="flex flex-col items-center justify-center gap-1 p-3 text-center sm:flex-row sm:gap-3 sm:p-5 sm:text-right">
              <Icon className={`h-7 w-7 sm:h-10 sm:w-10 ${color}`} />
              <div>
                <p dir="ltr" className="text-2xl font-black text-[#082d59] sm:text-right sm:text-3xl">{value}</p>
                <p className="text-xs font-bold text-slate-600 sm:text-base">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== الأعمدة الثلاثة: التسجيل - الأخبار - المعرض ========== */

// رابط منصة التسجيل في المنافسات والأنشطة
const REGISTRATION_URL = "https://sport-scolaire-safi-2026.pages.dev/";

function PanelTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 bg-[#082d59] px-5 py-3 text-lg font-extrabold text-white">
      {icon}
      {children}
    </h2>
  );
}

export type HomeNews = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type HomeImage = {
  id: string;
  title: string;
  image_url: string;
};

// صور احتياطية تظهر فقط إذا كان معرض الصور فارغاً
const fallbackImages: HomeImage[] = [
  { id: "f1", image_url: "/images/podium-groupe.jpg", title: "تتويج الفائزين في ألعاب القوى" },
  { id: "f2", image_url: "/images/podium-filles.jpg", title: "تتويج الفائزات على منصة التتويج" },
  { id: "f3", image_url: "/images/taslim-midalya.jpg", title: "تسليم الميدالية لتلميذة متوجة" },
  { id: "f4", image_url: "/images/tatwij-jama3i.jpg", title: "صورة جماعية للمتوجين" },
];

export function HomeColumns({
  news,
  gallery,
}: {
  news: HomeNews[];
  gallery: HomeImage[];
}) {
  const latestNews = news[0];
  const otherNews = news.slice(1, 3);
  const galleryImages = gallery.length ? gallery.slice(0, 4) : fallbackImages;

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 md:px-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr_1.15fr]">
        {/* التسجيل في المنافسات والأنشطة */}
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
          <PanelTitle icon={<IconUsers className="h-6 w-6 text-amber-400" />}>
            التسجيل والمشاركة
          </PanelTitle>
          <div className="flex flex-1 flex-col p-5">
            <div className="relative overflow-hidden rounded-xl bg-[#082d59] p-5 text-white">
              <IconTrophy className="absolute -bottom-3 -left-3 h-24 w-24 text-white/10" />
              <p className="text-xl font-black leading-relaxed">
                سجّل مؤسستك أو تلاميذك في منافسة أو نشاط رياضي
              </p>
              <p className="mt-2 text-sm leading-7 text-blue-100">
                منصة رقمية لتسجيل المشاركات في البطولات والأنشطة الرياضية المدرسية بإقليم آسفي.
              </p>
            </div>

            <ul className="my-5 space-y-3 text-sm font-semibold text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                اختيار المنافسة أو النشاط
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                ملء استمارة المشاركة
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                تأكيد التسجيل
              </li>
            </ul>

            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-lg font-extrabold text-[#082d59] transition hover:bg-amber-300"
            >
              سجّل الآن
              <IconArrowLeft className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* الأخبار */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <PanelTitle icon={<IconNews className="h-6 w-6 text-amber-400" />}>
            آخر الأخبار والمستجدات
          </PanelTitle>
          {latestNews ? (
            <div className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2.5">
                  <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-[#082d59]">
                    {new Date(latestNews.created_at).toLocaleDateString("ar-MA")}
                  </span>
                  <h3 className="text-xl font-black leading-relaxed text-[#082d59]">
                    {latestNews.title}
                  </h3>
                  {latestNews.description && (
                    <p className="line-clamp-3 text-sm leading-7 text-slate-500">
                      {latestNews.description}
                    </p>
                  )}
                  <Link
                    href="/actualites"
                    className="mt-auto flex items-center gap-1.5 self-start rounded-full border border-blue-200 px-4 py-1.5 text-sm font-extrabold text-blue-700 hover:bg-blue-50"
                  >
                    قراءة المزيد
                    <IconArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
                {latestNews.image_url && (
                  <div className="min-h-[200px] flex-1 overflow-hidden rounded-xl bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={latestNews.image_url}
                      alt={latestNews.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              {otherNews.length > 0 && (
                <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
                  {otherNews.map((item) => (
                    <li key={item.id}>
                      <Link
                        href="/actualites"
                        className="flex items-center justify-between gap-3 py-3 font-bold text-[#082d59] hover:text-amber-700"
                      >
                        <span className="line-clamp-1">{item.title}</span>
                        <span className="shrink-0 text-xs font-semibold text-slate-400">
                          {new Date(item.created_at).toLocaleDateString("ar-MA")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="font-bold text-slate-600">لا توجد أخبار منشورة حالياً</p>
              <p className="mt-1 text-sm text-slate-500">سيتم نشر آخر المستجدات قريباً.</p>
            </div>
          )}
        </div>

        {/* معرض الصور */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <PanelTitle icon={<IconCamera className="h-6 w-6 text-amber-400" />}>
            معرض الصور
          </PanelTitle>
          <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2">
            {galleryImages.map((img) => (
              <div key={img.id} className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.image_url}
                  alt={img.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
          <div className="pb-4 text-center">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-1.5 font-extrabold text-[#082d59] hover:text-amber-600"
            >
              مشاهدة المزيد
              <IconArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
