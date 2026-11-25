"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "./AdminShell";
import {
  IconArrowLeft,
  IconCalendar,
  IconCamera,
  IconFolder,
  IconMedal,
  IconNews,
  IconTrophy,
  IconUsers,
} from "@/app/components/icons";

const sections = [
  {
    title: "الأخبار والمستجدات",
    description: "نشر الأخبار والإعلانات مع صورة لكل خبر",
    href: "/admin/contenus?section=actualites",
    Icon: IconNews,
    tone: "bg-sky-100 text-sky-700",
    countKey: "actualites",
  },
  {
    title: "معرض الصور",
    description: "إضافة صور الأنشطة والبطولات الرياضية",
    href: "/admin/contenus?section=galerie",
    Icon: IconCamera,
    tone: "bg-violet-100 text-violet-700",
    countKey: "galerie",
  },
  {
    title: "سجل الأبطال",
    description: "تدبير الأبطال والإنجازات الرياضية",
    href: "/admin/contenus?section=palmares",
    Icon: IconMedal,
    tone: "bg-orange-100 text-orange-700",
    countKey: "palmares",
  },
  {
    title: "أرقام الصفحة الرئيسية",
    description: "عدد المشاركين والمؤسسات والبطولات",
    href: "/admin/settings",
    Icon: IconUsers,
    tone: "bg-emerald-100 text-emerald-700",
    countKey: null,
  },
  {
    title: "البطولات والمنافسات",
    description: "وثائق البطولات والمسابقات الرياضية (PDF)",
    href: "/admin/competitions",
    Icon: IconTrophy,
    tone: "bg-amber-100 text-amber-700",
    countKey: null,
  },
  {
    title: "الترتيب والنتائج النهائية",
    description: "نشر النتائج والترتيب النهائي (PDF)",
    href: "/admin/rankings",
    Icon: IconMedal,
    tone: "bg-yellow-100 text-yellow-700",
    countKey: null,
  },
  {
    title: "البرمجة الرياضية",
    description: "برنامج المنافسات والمواعيد (PDF)",
    href: "/admin/programming",
    Icon: IconCalendar,
    tone: "bg-blue-100 text-blue-700",
    countKey: null,
  },
  {
    title: "الوثائق والمراجع",
    description: "الوثائق الرسمية حسب التصنيفات الأربعة",
    href: "/admin/documents",
    Icon: IconFolder,
    tone: "bg-teal-100 text-teal-700",
    countKey: null,
  },
];

export default function AdminPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadCounts() {
      const result: Record<string, number> = {};
      for (const key of ["actualites", "galerie", "palmares"]) {
        const { count } = await supabase
          .from("content_items")
          .select("id", { count: "exact", head: true })
          .eq("section", key);
        result[key] = count ?? 0;
      }
      setCounts(result);
    }
    loadCounts();
  }, []);

  return (
    <AdminShell
      title="لوحة الإدارة"
      subtitle="من هنا تدبر كل محتوى الموقع: الأخبار، الصور، الأبطال، الأرقام والوثائق."
    >
      {/* ترحيب */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#082d59] p-7 text-white shadow-sm">
        <div>
          <h2 className="text-2xl font-black">مرحباً بك في فضاء الإدارة</h2>
          <p className="mt-2 max-w-2xl leading-8 text-blue-100">
            كل ما تضيفه هنا يظهر مباشرة في الموقع. ابدأ بإضافة آخر الأخبار وصور الأنشطة.
          </p>
        </div>
        <Link
          href="/admin/contenus?section=actualites"
          className="rounded-full bg-amber-400 px-6 py-3 font-extrabold text-[#082d59] transition hover:bg-amber-300"
        >
          + إضافة خبر جديد
        </Link>
      </div>

      {/* الأقسام */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map(({ title, description, href, Icon, tone, countKey }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}>
                <Icon className="h-7 w-7" />
              </span>
              {countKey && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
                  {counts[countKey] ?? "…"}
                </span>
              )}
            </div>
            <h3 className="text-lg font-extrabold text-[#082d59]">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-slate-500">{description}</p>
            <span className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-sm font-bold text-amber-700">
              الدخول إلى القسم
              <IconArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
