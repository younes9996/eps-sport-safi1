"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AdminShell from "./AdminShell";
import { IconDownload, IconEye, IconPdf, IconUpload } from "@/app/components/icons";

const BUCKET = "documents";
const MAX_MB = 20;

type DocumentItem = {
  id: string;
  title_ar: string;
  title_fr: string | null;
  category: string;
  file_path: string;
  created_at: string;
};

type Category = { value: string; label: string };

type Props = {
  title: string;
  subtitle: string;
  categories: Category[];
  /** رابط الصفحة العمومية لتصنيف معين */
  publicHref: (category: string) => string;
};

/** صفحة إدارة موحدة لوثائق PDF (تُستعمل للبطولات والنتائج والبرمجة والوثائق) */
export default function DocumentsManager({ title, subtitle, categories, publicHref }: Props) {
  const [category, setCategory] = useState(categories[0].value);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [titleAr, setTitleAr] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("documents")
      .select("id, title_ar, title_fr, category, file_path, created_at")
      .eq("category", category)
      .order("created_at", { ascending: false });
    if (error) setError("تعذر تحميل الوثائق: " + error.message);
    setDocs((data ?? []) as DocumentItem[]);
    setLoading(false);
  }, [category]);

  useEffect(() => {
    setError("");
    setMessage("");
    load();
  }, [load]);

  function publicUrl(path: string) {
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!titleAr.trim()) return setError("المرجو إدخال عنوان الوثيقة.");
    if (!file) return setError("المرجو اختيار ملف PDF.");
    if (file.type !== "application/pdf") return setError("يجب أن يكون الملف بصيغة PDF.");
    if (file.size > MAX_MB * 1024 * 1024) return setError(`حجم الملف يجب ألا يتجاوز ${MAX_MB} MB.`);

    setSaving(true);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${category}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

    try {
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { contentType: "application/pdf", upsert: false });
      if (upErr) throw new Error(upErr.message);

      const { error: insErr } = await supabase.from("documents").insert({
        title_ar: titleAr.trim(),
        title_fr: titleFr.trim() || null,
        category,
        file_path: path,
      });
      if (insErr) {
        await supabase.storage.from(BUCKET).remove([path]);
        throw new Error(insErr.message);
      }

      setMessage("تمت إضافة الوثيقة، وهي ظاهرة الآن في الموقع.");
      setTitleAr("");
      setTitleFr("");
      setFile(null);
      const input = document.getElementById("doc-file") as HTMLInputElement | null;
      if (input) input.value = "";
      await load();
    } catch (err) {
      setError("تعذرت إضافة الوثيقة: " + (err instanceof Error ? err.message : ""));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(doc: DocumentItem) {
    if (!window.confirm(`هل أنت متأكد من حذف "${doc.title_ar}"؟`)) return;
    setError("");
    setMessage("");

    const { error } = await supabase.from("documents").delete().eq("id", doc.id);
    if (error) return setError("تعذر الحذف: " + error.message);
    await supabase.storage.from(BUCKET).remove([doc.file_path]);

    setMessage("تم حذف الوثيقة.");
    setDocs((list) => list.filter((d) => d.id !== doc.id));
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#082d59] focus:ring-2 focus:ring-blue-100";
  const activeLabel = categories.find((c) => c.value === category)?.label ?? "";

  return (
    <AdminShell title={title} subtitle={subtitle} backHref="/admin">
      {/* التصنيفات */}
      <nav aria-label="التصنيفات" className="mb-6 flex flex-wrap gap-2">
        {categories.length > 1 &&
          categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              aria-pressed={c.value === category}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                c.value === category
                  ? "bg-[#082d59] text-white"
                  : "border border-slate-300 bg-white text-[#082d59] hover:bg-blue-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        <Link
          href={publicHref(category)}
          target="_blank"
          className="rounded-full border border-amber-300 bg-amber-50 px-5 py-2.5 text-sm font-bold text-amber-800 hover:bg-amber-100"
        >
          عرض في الموقع ↗
        </Link>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,400px)_1fr]">
        {/* النموذج */}
        <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-xl font-extrabold text-[#082d59]">إضافة وثيقة</h2>
          {categories.length > 1 && <p className="mb-5 text-sm text-slate-500">في تصنيف: {activeLabel}</p>}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="doc-title-ar" className="mb-1.5 block font-bold">
                العنوان بالعربية <span className="text-red-600">*</span>
              </label>
              <input
                id="doc-title-ar"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="مثال: النتائج النهائية للعدو الريفي"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="doc-title-fr" className="mb-1.5 block font-bold">
                العنوان بالفرنسية (اختياري)
              </label>
              <input
                id="doc-title-fr"
                dir="ltr"
                value={titleFr}
                onChange={(e) => setTitleFr(e.target.value)}
                placeholder="Titre du document"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="doc-file" className="mb-1.5 block font-bold">
                ملف PDF <span className="text-red-600">*</span>
              </label>
              <input
                id="doc-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className={`${inputClass} file:ml-3 file:rounded-lg file:border-0 file:bg-red-50 file:px-3 file:py-1.5 file:font-bold file:text-red-700`}
              />
              <p className="mt-1 text-xs text-slate-500">PDF فقط، الحد الأقصى {MAX_MB} MB.</p>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}
            {message && (
              <p role="status" className="rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#082d59] px-6 py-3.5 font-extrabold text-white transition hover:bg-[#0b3b75] disabled:opacity-60"
            >
              <IconUpload className="h-5 w-5" />
              {saving ? "جاري الرفع..." : "رفع الوثيقة"}
            </button>
          </form>
        </section>

        {/* القائمة */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-[#082d59]">الوثائق المنشورة</h2>
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-[#082d59]">
              العدد: {docs.length}
            </span>
          </div>

          {loading ? (
            <p className="py-10 text-center text-slate-500">جاري التحميل...</p>
          ) : docs.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 py-14 text-center">
              <IconPdf className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-3 font-bold text-slate-600">لا توجد وثائق في هذا القسم بعد</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {docs.map((doc) => (
                <li key={doc.id} className="flex flex-wrap items-center gap-4 py-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <IconPdf className="h-7 w-7" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-[#082d59]">{doc.title_ar}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(doc.created_at).toLocaleDateString("ar-MA")}
                      {doc.title_fr && ` · ${doc.title_fr}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={publicUrl(doc.file_path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`عرض ${doc.title_ar}`}
                      className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100"
                    >
                      <IconEye className="h-4 w-4" /> عرض
                    </a>
                    <a
                      href={`${publicUrl(doc.file_path)}?download=`}
                      aria-label={`تحميل ${doc.title_ar}`}
                      className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-100"
                    >
                      <IconDownload className="h-4 w-4" /> تحميل
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(doc)}
                      className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
