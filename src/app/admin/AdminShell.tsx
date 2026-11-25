"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  title: string;
  subtitle?: string;
  backHref?: string;
  children: React.ReactNode;
};

/**
 * الإطار المشترك لكل صفحات الإدارة:
 * يتحقق من صلاحية المدير، ويعرض الرأس والخلفية والتذييل.
 */
export default function AdminShell({ title, subtitle, backHref, children }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/admin/login");
        return;
      }

      const { data: admin, error: adminError } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError || !admin) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      setEmail(user.email ?? "");
      setReady(true);
    }

    checkAdmin();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (!ready) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#eef3f9]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(238,243,249,0.82), rgba(238,243,249,0.82)), url('/images/zellige.webp')",
          backgroundSize: "auto, 360px",
        }}
      >
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-sm">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-[#082d59]" />
          <p className="font-bold text-[#082d59]">جاري التحقق من الصلاحيات...</p>
        </div>
      </main>
    );
  }

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-[#eef3f9] text-[#0f2340]"
      style={{
        // خلفية زليج مغربي مع طبقة فاتحة فوقها
        backgroundImage:
          "linear-gradient(rgba(238,243,249,0.82), rgba(238,243,249,0.82)), url('/images/zellige.webp')",
        backgroundSize: "auto, 360px",
        backgroundAttachment: "fixed",
      }}
    >
      {/* الرأس */}
      <header className="border-b-4 border-amber-400 bg-[#082d59] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/logo-safi.png"
              alt="شعار الفرع الإقليمي للرياضة المدرسية بآسفي"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full bg-white object-contain p-1"
            />
            <div>
              <p className="text-lg font-black">فضاء الإدارة</p>
              <p className="text-sm font-semibold text-blue-200">
                الفرع الإقليمي للرياضة المدرسية - آسفي
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
            {email && (
              <span className="hidden rounded-full bg-white/10 px-4 py-2 text-blue-100 md:inline">
                {email}
              </span>
            )}
            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-white/30 px-4 py-2 transition hover:bg-white/10"
            >
              زيارة الموقع
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-red-600 px-4 py-2 transition hover:bg-red-700"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      {/* عنوان الصفحة */}
      <div className="mx-auto max-w-7xl px-5 pt-8">
        {backHref && (
          <Link
            href={backHref}
            className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-[#082d59] hover:text-amber-600"
          >
            → العودة إلى لوحة الإدارة
          </Link>
        )}
        <h1 className="text-2xl font-black text-[#082d59] md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        <div className="mt-4 h-1 w-20 rounded-full bg-amber-400" />
      </div>

      <main className="mx-auto max-w-7xl px-5 py-8">{children}</main>

      <footer className="mt-10 bg-[#04152f] px-5 py-5 text-center text-xs text-blue-200">
        فضاء الإدارة والتدبير الرقمي · الفرع الإقليمي للرياضة المدرسية بآسفي
      </footer>
    </div>
  );
}
