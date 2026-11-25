
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type SportsResult = {
  id: string;
  title: string;
  sport: string;
  file_path: string;
  created_at: string;
};

const sports = [
  "جميع الرياضات",
  "كرة القدم",
  "كرة السلة",
  "كرة اليد",
  "الكرة الطائرة",
  "ألعاب القوى",
  "العدو الريفي",
];

export default function ResultatsPage() {
  const [results, setResults] = useState<SportsResult[]>([]);
  const [selectedSport, setSelectedSport] = useState("جميع الرياضات");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      const { data, error } = await supabase
        .from("sports_results")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setResults((data || []) as SportsResult[]);
      }

      setLoading(false);
    }

    loadResults();
  }, []);

  const filteredResults =
    selectedSport === "جميع الرياضات"
      ? results
      : results.filter((item) => item.sport === selectedSport);

  async function openPDF(filePath: string) {
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(filePath, 3600);

    if (error || !data?.signedUrl) {
      alert("تعذر فتح ملف PDF.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">

      <section className="bg-gradient-to-l from-[#061b3b] via-[#0b477d] to-[#082d59] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="mb-6 inline-block text-sm text-blue-200">
            الرئيسية ←
          </Link>

          <div className="mb-5 text-5xl">🏆</div>

          <h1 className="text-3xl font-extrabold md:text-5xl">
            نتائج المنافسات الرياضية
          </h1>

          <p className="mt-5 max-w-3xl leading-9 text-blue-100">
            اطلع على النتائج الرسمية للمنافسات الرياضية المدرسية
            المنشورة من طرف الفرع الإقليمي بآسفي.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="mb-3 block font-extrabold text-[#082d59]">
            اختيار نوع الرياضة
          </label>

          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 font-semibold outline-none focus:border-blue-600 md:max-w-md"
          >
            {sports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            جاري تحميل النتائج...
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mb-4 text-5xl">📋</div>
            <h2 className="text-xl font-extrabold text-[#082d59]">
              لا توجد نتائج منشورة حالياً
            </h2>
            <p className="mt-3 text-slate-500">
              سيتم نشر ملفات النتائج فور توفرها.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredResults.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4 bg-[#082d59] px-5 py-5 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl">
                    🏆
                  </div>
                  <div>
                    <h2 className="font-extrabold leading-7">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-blue-200">
                      {item.sport}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="mb-5 text-xs text-slate-500">
                    تاريخ النشر:{" "}
                    {new Date(item.created_at).toLocaleDateString("ar-MA")}
                  </p>

                  <button
                    onClick={() => openPDF(item.file_path)}
                    className="w-full rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
                  >
                    📄 عرض النتائج PDF
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-[#04152f] px-4 py-9 text-center text-white">
        <h3 className="font-extrabold">
          الفرع الإقليمي للرياضة المدرسية بآسفي
        </h3>
        <p className="mt-3 text-sm text-blue-200">
          جميع الحقوق محفوظة © {new Date().getFullYear()}
        </p>
        <Link href="/" className="mt-5 inline-block font-bold text-amber-400">
          العودة إلى الرئيسية
        </Link>
      </footer>
    </main>
  );
}
