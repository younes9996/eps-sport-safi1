import { Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import SiteShell from "@/app/components/SiteShell";
import { documentCategories } from "@/app/components/siteData";
import {
  DocumentCard,
  EmptyState,
  GridSkeleton,
  ListHeading,
  LoadError,
  PageHeader,
} from "@/app/components/PageParts";
import { IconFolder, IconPdf } from "@/app/components/icons";

const CATEGORY_VALUES = documentCategories.map((c) => c.value);

async function DocumentsContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && CATEGORY_VALUES.includes(category) ? category : null;
  const activeInfo = documentCategories.find((c) => c.value === active);

  let query = supabase
    .from("documents")
    .select("id, title_ar, title_fr, category, file_path, created_at")
    .order("created_at", { ascending: false });
  query = active ? query.eq("category", active) : query.in("category", CATEGORY_VALUES);

  const { data, error } = await query;
  const docs = data ?? [];

  const tabs = [{ value: null as string | null, title: "جميع الوثائق" }, ...documentCategories];

  return (
    <>
      {/* تصنيفات الوثائق */}
      <nav aria-label="تصنيفات الوثائق" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {tabs.map((tab) => {
          const isActive = tab.value === active;
          return (
            <Link
              key={tab.title}
              href={tab.value ? `/documents?category=${tab.value}` : "/documents"}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                isActive
                  ? "bg-[#082d59] text-white shadow"
                  : "border border-slate-300 bg-white text-[#082d59] hover:border-amber-400 hover:bg-amber-50"
              }`}
            >
              {tab.title}
            </Link>
          );
        })}
      </nav>

      {error ? (
        <LoadError />
      ) : (
        <>
          <ListHeading title={activeInfo?.title ?? "جميع الوثائق"} count={docs.length} unit="وثيقة" />
          {docs.length === 0 ? (
            <EmptyState
              Icon={IconPdf}
              title="لا توجد وثائق حالياً"
              text="سيتم نشر الوثائق الخاصة بهذا التصنيف قريباً."
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title_ar}
                  subtitle={
                    active
                      ? doc.title_fr
                      : documentCategories.find((c) => c.value === doc.category)?.title ?? doc.title_fr
                  }
                  date={doc.created_at}
                  url={supabase.storage.from("documents").getPublicUrl(doc.file_path).data.publicUrl}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <SiteShell>
      <PageHeader
        title="الوثائق والمراجع"
        description="النصوص التنظيمية، موارد التربية البدنية، وثائق الجمعية الرياضية، ونماذج الامتحانات المهنية."
        Icon={IconFolder}
      />
      <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6">
        <Suspense fallback={<GridSkeleton />}>
          <DocumentsContent searchParams={searchParams} />
        </Suspense>
      </section>
    </SiteShell>
  );
}
