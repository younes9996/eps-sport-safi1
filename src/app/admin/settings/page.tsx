"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "../AdminShell";
import { IconMedal, IconTrophy, IconUsers } from "@/app/components/icons";

type Stats = {
  participants: string;
  schools: string;
  championships: string;
};

const FIELDS: { key: keyof Stats; label: string; Icon: typeof IconMedal }[] = [
  { key: "participants", label: "عدد المشاركين والمشاركات", Icon: IconMedal },
  { key: "schools", label: "عدد المؤسسات المشاركة", Icon: IconUsers },
  { key: "championships", label: "عدد البطولات المدرسية", Icon: IconTrophy },
];

export default function AdminSettingsPage() {
  const [stats, setStats] = useState<Stats>({ participants: "", schools: "", championships: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("site_stats")
        .select("participants, schools, championships")
        .eq("id", 1)
        .maybeSingle();
      if (error) setError("تعذر تحميل الأرقام: " + error.message);
      if (data) setStats(data as Stats);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    const { error } = await supabase
      .from("site_stats")
      .update({
        participants: stats.participants.trim() || "0",
        schools: stats.schools.trim() || "0",
        championships: stats.championships.trim() || "0",
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    setSaving(false);
    if (error) return setError("تعذر الحفظ: " + error.message);
    setMessage("تم حفظ الأرقام، وهي ظاهرة الآن في الصفحة الرئيسية.");
  }

  return (
    <AdminShell
      title="أرقام الصفحة الرئيسية"
      subtitle="الأرقام التي تظهر في شريط «أرقام تعكس دينامية متواصلة». يمكن كتابة 3000+ مثلاً."
      backHref="/admin"
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {loading ? (
          <p className="py-8 text-center text-slate-500">جاري التحميل...</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {FIELDS.map(({ key, label, Icon }) => (
              <label key={key} className="block rounded-xl bg-slate-50 p-4">
                <span className="mb-3 flex items-center gap-2 font-bold text-[#082d59]">
                  <Icon className="h-6 w-6 text-amber-600" />
                  {label}
                </span>
                <input
                  value={stats[key]}
                  onChange={(e) => setStats({ ...stats, [key]: e.target.value })}
                  dir="ltr"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-2xl font-black text-[#082d59] outline-none focus:border-[#082d59] focus:ring-2 focus:ring-blue-100"
                />
              </label>
            ))}
          </div>
        )}

        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving || loading}
          className="mt-6 rounded-xl bg-[#082d59] px-10 py-3.5 font-extrabold text-white transition hover:bg-[#0b3b75] disabled:opacity-60"
        >
          {saving ? "جاري الحفظ..." : "حفظ الأرقام"}
        </button>
      </form>
    </AdminShell>
  );
}
