import { Suspense } from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

import SiteShell from "@/app/components/SiteShell";
import PhotoGallery from "@/app/components/PhotoGallery";
import {
  DocumentCard,
  EmptyState,
  GridSkeleton,
  ListHeading,
  LoadError,
  PageHeader,
} from "@/app/components/PageParts";
import {
  IconCalendar,
  IconCamera,
  IconMedal,
  IconNews,
  IconPdf,
  IconTrophy,
} from "@/app/components/icons";

type IconType = (props: { className?: string }) => React.ReactNode;

type SectionConfig = {
  kind: "documents" | "news" | "gallery" | "palmares";
  title: string;
  description: string;
  Icon: IconType;
  /** للأقسام التي تعرض وثائق PDF: قيمة التصنيف في جدول documents */
  category?: string;
};

const SECTIONS: Record<string, SectionConfig> = {
  competitions: {
    kind: "documents",
    category: "competitions",
    title: "البطولات والمنافسات",
    description: "وثائق وبرامج البطولات والمنافسات الرياضية المدرسية بإقليم آسفي.",
    Icon: IconTrophy,
  },
  rankings: {
    kind: "documents",
    category: "rankings",
    title: "الترتيب والنتائج النهائية",
    description: "الترتيبات والنتائج النهائية للبطولات والمنافسات المدرسية.",
    Icon: IconMedal,
  },
  programming: {
    kind: "documents",
    category: "programming",
    title: "البرمجة الرياضية",
    description: "برامج ومواعيد الأنشطة والمنافسات الرياضية المدرسية بإقليم آسفي.",
    Icon: IconCalendar,
  },
  programmation: {
    kind: "documents",
    category: "programming",
    title: "البرمجة الرياضية",
    description: "برامج ومواعيد الأنشطة والمنافسات الرياضية المدرسية بإقليم آسفي.",
    Icon: IconCalendar,
  },
  actualites: {
    kind: "news",
    title: "الأخبار والمستجدات",
    description: "آخر أخبار وأنشطة وإعلانات الرياضة المدرسية بإقليم آسفي.",
    Icon: IconNews,
  },
  galerie: {
    kind: "gallery",
    title: "معرض الصور",
    description: "صور توثق الأنشطة والبطولات الرياضية المدرسية.",
    Icon: IconCamera,
  },
  palmares: {
    kind: "palmares",
    title: "سجل الأبطال",
    description: "الفرق والتلاميذ المتوجون في المنافسات الرياضية المدرسية.",
    Icon: IconMedal,
  },
};

const TYPE_LABELS: Record<string, string> = {
  announcement: "إعلان",
  program: "برنامج",
  document: "وثيقة",
  activity: "نشاط رياضي",
};

type ContentItem = {
  id: string;
  title: string;
  description: string | null;
  body: string | null;
  content_type: string;
  image_url: string | null;
  file_path: string | null;
  created_at: string;
};

/* ---------------- وثائق PDF ---------------- */

async function DocumentsList({ category }: { category: string }) {
  const { data, error } = await supabase
    .from("documents")
    .select("id, title_ar, title_fr, file_path, created_at")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) return <LoadError />;
  const docs = data ?? [];

  return (
    <>
      <ListHeading title="الوثائق المتاحة" count={docs.length} unit="وثيقة" />
      {docs.length === 0 ? (
        <EmptyState
          Icon={IconPdf}
          title="لا توجد وثائق حالياً"
          text="سيتم نشر الوثائق الخاصة بهذا القسم قريباً."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title_ar}
              subtitle={doc.title_fr}
              date={doc.created_at}
              url={supabase.storage.from("documents").getPublicUrl(doc.file_path).data.publicUrl}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------- المحتوى (أخبار - صور - أبطال) ---------------- */

async function loadContent(section: string) {
  return supabase
    .from("content_items")
    .select("id, title, description, body, content_type, image_url, file_path, created_at")
    .eq("section", section)
    .eq("is_published", true)
    .order("created_at", { ascending: false });
}

function pdfUrl(path: string | null) {
  return path ? supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl : null;
}

async function NewsList() {
  const { data, error } = await loadContent("actualites");
  if (error) return <LoadError />;
  const items = (data ?? []) as ContentItem[];

  if (!items.length)
    return <EmptyState Icon={IconNews} title="لا توجد أخبار حالياً" text="سيتم نشر آخر المستجدات قريباً." />;

  const [first, ...rest] = items;

  return (
    <>
      <ListHeading title="آخر المنشورات" count={items.length} unit="منشور" />
      <div className="grid gap-6 lg:grid-cols-3">
        {/* الخبر الأول بارز */}
        <NewsCard item={first} featured />
        {rest.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

function NewsCard({ item, featured }: { item: ContentItem; featured?: boolean }) {
  const pdf = pdfUrl(item.file_path);
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${
        featured ? "lg:col-span-3 lg:flex-row" : ""
      }`}
    >
      {item.image_url && (
        <div className={`bg-slate-100 ${featured ? "lg:w-1/2" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image_url}
            alt={item.title}
            loading="lazy"
            className={`w-full object-cover ${featured ? "h-64 lg:h-full lg:min-h-[340px]" : "h-52"}`}
          />
        </div>
      )}
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-amber-800">
            {TYPE_LABELS[item.content_type] ?? "خبر"}
          </span>
          <span className="text-slate-400">{new Date(item.created_at).toLocaleDateString("ar-MA")}</span>
        </div>
        <h3
          className={`mt-3 font-black leading-relaxed text-[#082d59] ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}
        >
          {item.title}
        </h3>
        {item.description && <p className="mt-3 leading-8 text-slate-600">{item.description}</p>}

        {item.body && (
          <details className="group mt-4 border-t border-slate-100 pt-4">
            <summary className="cursor-pointer list-none font-bold text-blue-700 hover:text-amber-700">
              <span className="group-open:hidden">قراءة الخبر كاملاً ←</span>
              <span className="hidden group-open:inline">إخفاء النص ↑</span>
            </summary>
            <div className="mt-3 whitespace-pre-wrap leading-8 text-slate-700">{item.body}</div>
          </details>
        )}

        {pdf && (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2 self-start rounded-xl bg-[#082d59] px-5 py-2.5 font-bold text-white hover:bg-[#0b3b75]"
          >
            <IconPdf className="h-5 w-5" />
            الوثيقة المرفقة (PDF)
          </a>
        )}
      </div>
    </article>
  );
}

async function GalleryList() {
  const { data, error } = await loadContent("galerie");
  if (error) return <LoadError />;
  const photos = ((data ?? []) as ContentItem[])
    .filter((i) => i.image_url)
    .map((i) => ({
      id: i.id,
      title: i.title,
      description: i.description,
      image_url: i.image_url!,
      created_at: i.created_at,
    }));

  return (
    <>
      <ListHeading title="الصور" count={photos.length} unit="صورة" />
      {photos.length ? (
        <PhotoGallery photos={photos} />
      ) : (
        <EmptyState Icon={IconCamera} title="لا توجد صور حالياً" text="سيتم نشر صور الأنشطة قريباً." />
      )}
    </>
  );
}

/* ---------- سجل الأبطال ---------- */

async function PalmaresList() {
  const { data, error } = await loadContent("palmares");
  if (error) return <LoadError />;
  const items = (data ?? []) as ContentItem[];

  return (
    <>
      <ListHeading title="الأبطال المتوجون" count={items.length} unit="تتويج" />
      {items.length === 0 ? (
        <EmptyState Icon={IconTrophy} title="لا توجد تتويجات حالياً" text="سيتم نشر سجل الأبطال قريباً." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm"
            >
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image_url} alt={item.title} loading="lazy" className="h-56 w-full object-cover" />
              ) : (
                <div className="flex h-32 items-center justify-center bg-amber-50">
                  <IconTrophy className="h-16 w-16 text-amber-500" />
                </div>
              )}
              <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-[#082d59] shadow">
                <IconMedal className="h-6 w-6" />
              </span>
              <div className="p-5">
                <h3 className="text-lg font-black leading-8 text-[#082d59]">{item.title}</h3>
                {item.description && <p className="mt-2 leading-7 text-slate-600">{item.description}</p>}
                {item.body && <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-500">{item.body}</p>}
                <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleDateString("ar-MA")}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------- الصفحة ---------------- */

async function SectionContent({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const config = SECTIONS[section];
  if (!config) notFound();

  return (
    <>
      <PageHeader title={config.title} description={config.description} Icon={config.Icon} />
      <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6">
        {config.kind === "documents" && <DocumentsList category={config.category!} />}
        {config.kind === "news" && <NewsList />}
        {config.kind === "gallery" && <GalleryList />}
        {config.kind === "palmares" && <PalmaresList />}
      </section>
    </>
  );
}

export default function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  return (
    <SiteShell>
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6">
            <div className="mb-8 h-40 animate-pulse rounded-2xl bg-[#082d59]/20" />
            <GridSkeleton />
          </div>
        }
      >
        <SectionContent params={params} />
      </Suspense>
    </SiteShell>
  );
}
