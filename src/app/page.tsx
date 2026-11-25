import { Suspense } from "react";
import { connection } from "next/server";
import { supabase } from "@/lib/supabase";

import SiteShell from "./components/SiteShell";
import HomeHero from "./components/HomeHero";
import {
  CategoryCards,
  HomeColumns,
  HomeStats,
  type HomeImage,
  type HomeNews,
  type SiteStats,
} from "./components/HomeSections";

/**
 * الجزء المتغير من الصفحة: يقرأ من Supabase في كل زيارة،
 * فيظهر ما يضيفه المدير مباشرة.
 */
async function HomeLiveContent() {
  await connection();

  const [statsRes, newsRes, galleryRes] = await Promise.all([
    supabase
      .from("site_stats")
      .select("participants, schools, championships")
      .eq("id", 1)
      .maybeSingle(),
    supabase
      .from("content_items")
      .select("id, title, description, image_url, created_at")
      .eq("section", "actualites")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("content_items")
      .select("id, title, image_url")
      .eq("section", "galerie")
      .eq("is_published", true)
      .not("image_url", "is", null)
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  return (
    <>
      <HomeStats data={(statsRes.data as SiteStats | null) ?? null} />
      <HomeColumns
        news={(newsRes.data as HomeNews[] | null) ?? []}
        gallery={(galleryRes.data as HomeImage[] | null) ?? []}
      />
    </>
  );
}

/** ما يظهر لجزء من الثانية أثناء تحميل الأخبار والأرقام */
function HomeLiveSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-6 md:px-6" aria-busy="true">
      <div className="h-28 animate-pulse rounded-2xl bg-white/70" />
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.5fr_1.15fr]">
        <div className="h-80 animate-pulse rounded-2xl bg-white/70" />
        <div className="h-80 animate-pulse rounded-2xl bg-white/70" />
        <div className="h-80 animate-pulse rounded-2xl bg-white/70" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      <HomeHero />
      <CategoryCards />
      <Suspense fallback={<HomeLiveSkeleton />}>
        <HomeLiveContent />
      </Suspense>
    </SiteShell>
  );
}
