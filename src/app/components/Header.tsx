"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconChevron, IconClose, IconHome, IconMenu } from "./icons";
import { documentCategories, sportsLinks } from "./siteData";

type Menu = "sports" | "documents" | null;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<Menu>(null);

  function closeAll() {
    setMobileOpen(false);
    setOpenMenu(null);
  }

  function toggle(menu: Menu) {
    setOpenMenu(openMenu === menu ? null : menu);
  }

  const linkClass =
    "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-white transition hover:bg-white/10 hover:text-amber-400";

  return (
    <header className="contents">
      {/* البانر (الطاجين وقصر البحر): يظهر في الحاسوب والهاتف */}
      <div className="mx-auto max-w-[1400px] md:px-6">
        <Image
          src="/images/banniere.webp"
          alt="الفرع الإقليمي للجامعة الملكية المغربية للرياضة المدرسية بأسفي"
          width={1920}
          height={640}
          priority
          sizes="(max-width: 1400px) 100vw, 1352px"
          className="h-auto w-full"
        />
      </div>

      {/* القائمة: تبقى ثابتة في أعلى الشاشة عند التمرير في الهاتف */}
      <div className="sticky top-0 z-50 mx-auto w-full max-w-[1400px] shadow-md md:px-6 lg:static lg:shadow-none">
        <nav
          aria-label="القائمة الرئيسية"
          className="bg-[#082d59] p-1.5 text-base font-bold"
        >
          {/* شريط الهاتف: الشعار والاسم وزر القائمة */}
          <div className="flex items-center justify-between gap-3 px-2 py-1 lg:hidden">
            <Link href="/" onClick={closeAll} className="flex min-w-0 items-center gap-2 text-white">
              <Image
                src="/images/logo-safi.png"
                alt="شعار الفرع الإقليمي للرياضة المدرسية بآسفي"
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-full bg-white object-contain p-0.5"
              />
              <span className="min-w-0 leading-5">
                <span className="block truncate text-sm font-extrabold">الفرع الإقليمي للرياضة المدرسية</span>
                <span className="block text-xs font-bold text-amber-400">آسفي</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white"
            >
              {mobileOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
            </button>
          </div>

          <div
            className={`${
              mobileOpen ? "flex" : "hidden"
            } mt-1 max-h-[70vh] flex-col gap-1 overflow-y-auto border-t border-white/10 pt-2 lg:mt-0 lg:flex lg:max-h-none lg:flex-row lg:items-center lg:justify-between lg:overflow-visible lg:border-0 lg:pt-0`}
          >
            <Link
              href="/"
              onClick={closeAll}
              className="flex items-center gap-2 rounded-full bg-amber-400 px-7 py-2.5 text-[#082d59]"
            >
              <IconHome className="h-5 w-5" />
              الرئيسية
            </Link>

            {/* المنافسات الرياضية */}
            <div className="group relative">
              <button
                type="button"
                onClick={() => toggle("sports")}
                aria-expanded={openMenu === "sports"}
                className={`${linkClass} w-full justify-between lg:w-auto`}
              >
                المنافسات الرياضية
                <IconChevron
                  className={`h-4 w-4 transition ${openMenu === "sports" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`${
                  openMenu === "sports" ? "block" : "hidden"
                } right-0 top-full z-50 lg:absolute lg:w-72 lg:pt-2 lg:group-hover:block`}
              >
                <div className="rounded-xl bg-white p-2 shadow-xl">
                  {sportsLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="block rounded-lg px-4 py-3 text-[#082d59] hover:bg-blue-50"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* الوثائق والمراجع */}
            <div className="group relative">
              <button
                type="button"
                onClick={() => toggle("documents")}
                aria-expanded={openMenu === "documents"}
                className={`${linkClass} w-full justify-between lg:w-auto`}
              >
                الوثائق والمراجع
                <IconChevron
                  className={`h-4 w-4 transition ${openMenu === "documents" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`${
                  openMenu === "documents" ? "block" : "hidden"
                } right-0 top-full z-50 lg:absolute lg:w-80 lg:pt-2 lg:group-hover:block`}
              >
                <div className="rounded-xl bg-white p-2 shadow-xl">
                  <Link
                    href="/documents"
                    onClick={closeAll}
                    className="mb-1 block rounded-lg bg-blue-50 px-4 py-3 font-extrabold text-[#082d59] hover:bg-blue-100"
                  >
                    جميع الوثائق
                  </Link>
                  {documentCategories.map((item) => (
                    <Link
                      key={item.value}
                      href={`/documents?category=${item.value}`}
                      onClick={closeAll}
                      className="block rounded-lg px-4 py-3 text-sm text-[#082d59] hover:bg-blue-50"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/galerie" onClick={closeAll} className={linkClass}>
              معرض الصور
            </Link>
            <Link href="/palmares" onClick={closeAll} className={linkClass}>
              سجل الأبطال
            </Link>
            <Link href="/actualites" onClick={closeAll} className={linkClass}>
              الأخبار والمستجدات
            </Link>
            <Link href="/admin/login" onClick={closeAll} className={linkClass}>
              فضاء الإدارة
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
