"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "../AdminShell";

const BUCKET = "site-media";

type SectionKey = "actualites" | "galerie" | "palmares";

type ContentItem = {
  id: string;
  section: SectionKey;
  title: string;
  description: string | null;
  body: string | null;
  content_type: string;
  image_url: string | null;
  file_path: string | null;
  is_published: boolean;
  created_at: string;
};

const SECTIONS: Record<
  SectionKey,
  { label: string; hint: string; needsImage: boolean; withBody: boolean }
> = {
  actualites: {
    label: "الأخبار والمستجدات",
    hint: "خبر بعنوان وملخص ونص كامل، مع صورة (اختيارية) وملف PDF (اختياري).",
    needsImage: false,
    withBody: true,
  },
  galerie: {
    label: "معرض الصور",
    hint: "صورة مع عنوان قصير. الصورة إجبارية.",
    needsImage: true,
    withBody: false,
  },
  palmares: {
    label: "سجل الأبطال",
    hint: "اسم الفريق أو التلميذ، الإنجاز، مع صورة التتويج (اختيارية).",
    needsImage: false,
    withBody: true,
  },
};

const CONTENT_TYPES = [
  { value: "article", label: "خبر ومقال" },
  { value: "announcement", label: "إعلان" },
  { value: "activity", label: "نشاط رياضي" },
  { value: "program", label: "برنامج" },
  { value: "document", label: "وثيقة" },
];

const MAX_IMAGE_MB = 5;
const MAX_PDF_MB = 20;

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

/** يستخرج مسار الملف داخل المخزن من الرابط العمومي للصورة */
function pathFromPublicUrl(url: string | null) {
  if (!url) return null;
  const marker = `/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length));
}

function ContentsManager() {
  const params = useSearchParams();
  const requested = params.get("section") as SectionKey | null;
  const section: SectionKey = requested && requested in SECTIONS ? requested : "actualites";
  const config = SECTIONS[section];

  const [items, setItems] = useState<ContentItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // حقول النموذج
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [contentType, setContentType] = useState("article");
  const [isPublished, setIsPublished] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const loadItems = useCallback(async () => {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("content_items")
      .select(
        "id, section, title, description, body, content_type, image_url, file_path, is_published, created_at"
      )
      .eq("section", section)
      .order("created_at", { ascending: false });

    if (error) setError("تعذر تحميل المحتوى: " + error.message);
    setItems((data || []) as ContentItem[]);
    setLoadingList(false);
  }, [section]);

  useEffect(() => {
    resetForm();
    setError("");
    setMessage("");
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  function resetForm() {
    setTitle("");
    setDescription("");
    setBody("");
    setContentType("article");
    setIsPublished(true);
    setImageFile(null);
    setPdfFile(null);
    for (const id of ["content-image", "content-pdf"]) {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (input) input.value = "";
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!title.trim()) return setError("المرجو إدخال العنوان.");
    if (config.needsImage && !imageFile) return setError("المرجو اختيار صورة.");
    if (imageFile && !imageFile.type.startsWith("image/"))
      return setError("الملف المختار ليس صورة.");
    if (imageFile && imageFile.size > MAX_IMAGE_MB * 1024 * 1024)
      return setError(`حجم الصورة يجب ألا يتجاوز ${MAX_IMAGE_MB} MB.`);
    if (pdfFile && pdfFile.type !== "application/pdf")
      return setError("يجب أن يكون الملف بصيغة PDF.");
    if (pdfFile && pdfFile.size > MAX_PDF_MB * 1024 * 1024)
      return setError(`حجم ملف PDF يجب ألا يتجاوز ${MAX_PDF_MB} MB.`);

    setSaving(true);
    const uploaded: string[] = [];

    try {
      let imageUrl: string | null = null;
      let pdfPath: string | null = null;

      if (imageFile) {
        const path = `${section}/images/${Date.now()}-${crypto.randomUUID()}-${safeFileName(imageFile.name)}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, imageFile, { contentType: imageFile.type, upsert: false });
        if (upErr) throw new Error(upErr.message);
        uploaded.push(path);
        imageUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
      }

      if (pdfFile) {
        const path = `${section}/pdf/${Date.now()}-${crypto.randomUUID()}-${safeFileName(pdfFile.name)}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, pdfFile, { contentType: "application/pdf", upsert: false });
        if (upErr) throw new Error(upErr.message);
        uploaded.push(path);
        pdfPath = path;
      }

      const { error: insertError } = await supabase.from("content_items").insert({
        section,
        title: title.trim(),
        description: description.trim() || null,
        body: config.withBody ? body.trim() || null : null,
        content_type: section === "actualites" ? contentType : section === "galerie" ? "activity" : "article",
        image_url: imageUrl,
        file_path: pdfPath,
        is_published: isPublished,
      });
      if (insertError) throw new Error(insertError.message);

      setMessage(isPublished ? "تم النشر بنجاح، وهو ظاهر الآن في الموقع." : "تم الحفظ كمسودة (غير منشور).");
      resetForm();
      await loadItems();
    } catch (err) {
      if (uploaded.length) await supabase.storage.from(BUCKET).remove(uploaded);
      setError("تعذر الحفظ: " + (err instanceof Error ? err.message : "خطأ غير معروف"));
    } finally {
      setSaving(false);
    }
  }

  async function togglePublished(item: ContentItem) {
    setError("");
    const { error } = await supabase
      .from("content_items")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    if (error) return setError("تعذر تغيير حالة النشر: " + error.message);
    setItems((list) =>
      list.map((i) => (i.id === item.id ? { ...i, is_published: !i.is_published } : i))
    );
  }

  async function handleDelete(item: ContentItem) {
    if (!window.confirm(`هل أنت متأكد من حذف "${item.title}"؟`)) return;
    setError("");
    setMessage("");

    const { error } = await supabase.from("content_items").delete().eq("id", item.id);
    if (error) return setError("تعذر الحذف: " + error.message);

    const files = [pathFromPublicUrl(item.image_url), item.file_path].filter(
      (p): p is string => Boolean(p)
    );
    if (files.length) await supabase.storage.from(BUCKET).remove(files);

    setMessage("تم الحذف بنجاح.");
    setItems((list) => list.filter((i) => i.id !== item.id));
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#082d59] focus:ring-2 focus:ring-blue-100";

  return (
    <AdminShell title={config.label} subtitle={config.hint} backHref="/admin">
      {/* تبويبات الأقسام */}
      <nav aria-label="أقسام المحتوى" className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(SECTIONS) as SectionKey[]).map((key) => (
          <Link
            key={key}
            href={`/admin/contenus?section=${key}`}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              key === section
                ? "bg-[#082d59] text-white"
                : "border border-slate-300 bg-white text-[#082d59] hover:bg-blue-50"
            }`}
          >
            {SECTIONS[key].label}
          </Link>
        ))}
        <Link
          href={`/${section}`}
          target="_blank"
          className="rounded-full border border-amber-300 bg-amber-50 px-5 py-2.5 text-sm font-bold text-amber-800 hover:bg-amber-100"
        >
          عرض القسم في الموقع ↗
        </Link>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* النموذج */}
        <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-extrabold text-[#082d59]">إضافة جديدة</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="c-title" className="mb-1.5 block font-bold">
                العنوان <span className="text-red-600">*</span>
              </label>
              <input
                id="c-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder={
                  section === "palmares"
                    ? "مثال: فريق ثانوية ... بطل الإقليم في كرة اليد"
                    : "مثال: انطلاق البطولة الإقليمية للعدو الريفي"
                }
              />
            </div>

            {section === "actualites" && (
              <div>
                <label htmlFor="c-type" className="mb-1.5 block font-bold">
                  نوع المنشور
                </label>
                <select
                  id="c-type"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className={inputClass}
                >
                  {CONTENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="c-desc" className="mb-1.5 block font-bold">
                {section === "galerie" ? "وصف قصير" : "ملخص"} (اختياري)
              </label>
              <textarea
                id="c-desc"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
              />
            </div>

            {config.withBody && (
              <div>
                <label htmlFor="c-body" className="mb-1.5 block font-bold">
                  النص الكامل (اختياري)
                </label>
                <textarea
                  id="c-body"
                  rows={5}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label htmlFor="content-image" className="mb-1.5 block font-bold">
                الصورة {config.needsImage ? <span className="text-red-600">*</span> : "(اختيارية)"}
              </label>
              <input
                id="content-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className={`${inputClass} file:ml-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:font-bold file:text-[#082d59]`}
              />
              <p className="mt-1 text-xs text-slate-500">JPG أو PNG أو WEBP، الحد الأقصى {MAX_IMAGE_MB} MB.</p>
              {imagePreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="معاينة الصورة"
                  className="mt-3 h-40 w-full rounded-xl object-cover"
                />
              )}
            </div>

            {section !== "galerie" && (
              <div>
                <label htmlFor="content-pdf" className="mb-1.5 block font-bold">
                  ملف PDF مرفق (اختياري)
                </label>
                <input
                  id="content-pdf"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                  className={`${inputClass} file:ml-3 file:rounded-lg file:border-0 file:bg-red-50 file:px-3 file:py-1.5 file:font-bold file:text-red-700`}
                />
              </div>
            )}

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 font-bold">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-5 w-5 accent-[#082d59]"
              />
              نشر مباشرة في الموقع
            </label>

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
              className="w-full rounded-xl bg-[#082d59] px-6 py-3.5 font-extrabold text-white transition hover:bg-[#0b3b75] disabled:opacity-60"
            >
              {saving ? "جاري الحفظ والرفع..." : isPublished ? "نشر" : "حفظ كمسودة"}
            </button>
          </form>
        </section>

        {/* القائمة */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-[#082d59]">المحتوى المضاف</h2>
            <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-[#082d59]">
              العدد: {items.length}
            </span>
          </div>

          {loadingList ? (
            <p className="py-10 text-center text-slate-500">جاري التحميل...</p>
          ) : items.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-slate-200 py-14 text-center">
              <p className="font-bold text-slate-600">لا يوجد محتوى بعد</p>
              <p className="mt-1 text-sm text-slate-500">أضف أول عنصر من النموذج.</p>
            </div>
          ) : section === "galerie" ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {items.map((item) => (
                <li key={item.id} className="overflow-hidden rounded-xl border border-slate-200">
                  {item.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt={item.title} className="aspect-[4/3] w-full object-cover" />
                  )}
                  <div className="p-3">
                    <p className="line-clamp-2 text-sm font-bold">{item.title}</p>
                    <ItemActions item={item} onToggle={togglePublished} onDelete={handleDelete} compact />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center gap-4 py-4">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt="" className="h-16 w-24 rounded-lg object-cover" />
                  ) : (
                    <span className="flex h-16 w-24 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                      بدون صورة
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold text-[#082d59]">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(item.created_at).toLocaleDateString("ar-MA")}
                      {item.file_path && " · مرفق PDF"}
                    </p>
                  </div>
                  <ItemActions item={item} onToggle={togglePublished} onDelete={handleDelete} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminShell>
  );
}

function ItemActions({
  item,
  onToggle,
  onDelete,
  compact,
}: {
  item: ContentItem;
  onToggle: (item: ContentItem) => void;
  onDelete: (item: ContentItem) => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? "mt-2" : ""}`}>
      <button
        type="button"
        onClick={() => onToggle(item)}
        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
          item.is_published
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
        }`}
        title="اضغط لتغيير حالة النشر"
      >
        {item.is_published ? "منشور" : "مسودة"}
      </button>
      <button
        type="button"
        onClick={() => onDelete(item)}
        className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100"
      >
        حذف
      </button>
    </div>
  );
}

export default function AdminContentsPage() {
  return (
    <Suspense fallback={null}>
      <ContentsManager />
    </Suspense>
  );
}
