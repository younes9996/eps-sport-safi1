import Link from "next/link";
import { IconDownload, IconEye, IconPdf } from "./icons";

type IconType = (props: { className?: string }) => React.ReactNode;

/** رأس الصفحات الداخلية */
export function PageHeader({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: IconType;
}) {
  return (
    <section className="mx-auto max-w-[1400px] md:px-6">
      <div className="relative overflow-hidden bg-[#082d59] px-5 py-8 text-white md:px-10 md:py-14">
        {/* زخرفة زليج خفيفة داخل الشريط */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-[0.12]"
          style={{
            backgroundImage: "url('/images/zellige.webp')",
            backgroundSize: "220px",
            maskImage: "linear-gradient(to left, transparent, black)",
            WebkitMaskImage: "linear-gradient(to left, transparent, black)",
          }}
        />
        <nav aria-label="مسار التصفح" className="relative mb-5 text-sm font-semibold text-blue-200">
          <Link href="/" className="hover:text-amber-400">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{title}</span>
        </nav>
        <div className="relative flex items-start gap-4 md:items-center md:gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-[#082d59] md:h-20 md:w-20">
            <Icon className="h-7 w-7 md:h-11 md:w-11" />
          </span>
          <div>
            <h1 className="text-2xl font-black md:text-4xl">{title}</h1>
            <p className="mt-1 max-w-3xl text-sm leading-7 text-blue-100 md:mt-2 md:text-lg md:leading-8">{description}</p>
          </div>
        </div>
      </div>
      <div className="h-1.5 bg-amber-400" />
    </section>
  );
}

/** شريط عنوان القائمة مع العدد */
export function ListHeading({ title, count, unit }: { title: string; count: number; unit: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-2xl font-extrabold text-[#082d59]">{title}</h2>
      <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#082d59] shadow-sm">
        {count} {unit}
      </span>
    </div>
  );
}

/** حالة القائمة الفارغة */
export function EmptyState({ title, text, Icon }: { title: string; text: string; Icon: IconType }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/90 px-6 py-16 text-center">
      <Icon className="mx-auto h-14 w-14 text-slate-300" />
      <h3 className="mt-4 text-xl font-extrabold text-slate-700">{title}</h3>
      <p className="mt-2 text-slate-500">{text}</p>
    </div>
  );
}

/** رسالة خطأ التحميل */
export function LoadError() {
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center font-semibold text-red-700">
      تعذر تحميل المحتوى حالياً. المرجو المحاولة لاحقاً.
    </div>
  );
}

/** بطاقة وثيقة PDF */
export function DocumentCard({
  title,
  subtitle,
  date,
  url,
}: {
  title: string;
  subtitle?: string | null;
  date: string;
  url: string;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <IconPdf className="h-8 w-8" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-extrabold leading-8 text-[#082d59]">{title}</h3>
          {subtitle && (
            <p dir="ltr" className="text-right text-sm text-slate-500">
              {subtitle}
            </p>
          )}
          <p className="mt-1 text-sm text-slate-400">
            {new Date(date).toLocaleDateString("ar-MA")}
          </p>
        </div>
      </div>
      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#082d59] px-4 py-2.5 font-bold text-white transition hover:bg-[#0b3b75]"
        >
          <IconEye className="h-5 w-5" />
          عرض
        </a>
        <a
          href={`${url}?download=`}
          className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 font-bold text-[#082d59] transition hover:bg-amber-300"
        >
          <IconDownload className="h-5 w-5" />
          تحميل
        </a>
      </div>
    </article>
  );
}

/** هيكل مؤقت أثناء التحميل */
export function GridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-48 animate-pulse rounded-2xl bg-white/80" />
      ))}
    </div>
  );
}
