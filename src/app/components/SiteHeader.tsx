
"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

const menu = [
  { label: "الرئيسية", href: "/" },
  { label: "المستجدات", href: "/actualites" },
  { label: "المنافسات", href: "/competitions" },
  { label: "البرمجة", href: "/programmation" },
  { label: "النتائج", href: "/resultats" },
];

const documentCategories = [
  {
    value: "reglementation",
    label: "المقتضيات التنظيمية والتشريعية",
  },
  {
    value: "education-physique",
    label: "التربية البدنية",
  },
  {
    value: "association-sportive",
    label: "الجمعية الرياضية",
  },
  {
    value: "examens-professionnels",
    label: "نماذج الامتحانات المهنية",
  },
];

export default function SiteHeader() {
  const [documentsOpen, setDocumentsOpen] = useState(false);

  return (
    <header
      dir="rtl"
      className="relative z-[100] w-full bg-white shadow-lg"
    >
      {/* الهوية الرئيسية */}
      <div className="relative overflow-hidden bg-gradient-to-l from-[#071d40] via-[#123c70] to-[#071d40]">

        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 50%, #d6ad55 0, transparent 30%), radial-gradient(circle at 85% 50%, #d6ad55 0, transparent 30%)",
          }}
        />

        <div className="relative mx-auto max-w-[1500px] px-4 py-7 text-center md:py-9">

          <div className="mx-auto mb-4 h-[3px] w-24 rounded-full bg-[#d6ad55]" />

          <p className="mb-2 text-sm font-semibold tracking-widest text-[#e5c77e] md:text-base">
            المملكة المغربية
          </p>

          <h1 className="text-2xl font-black leading-relaxed text-white md:text-4xl lg:text-5xl">
            الفرع الإقليمي للرياضة المدرسية بآسفي
          </h1>

          <p className="mt-3 text-sm font-medium text-blue-100 md:text-lg">
            المديرية الإقليمية بآسفي
          </p>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-[2px] w-12 bg-[#d6ad55]" />
            <span className="h-2 w-2 rotate-45 bg-[#d6ad55]" />
            <span className="h-[2px] w-12 bg-[#d6ad55]" />
          </div>

        </div>
      </div>

      {/* القائمة الرئيسية الوحيدة */}
      <nav className="relative z-[100] border-b-4 border-[#c49a42] bg-[#0b2b52]">

        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-1 px-3 py-2 md:gap-2">

          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#d6ad55] hover:text-[#071d40] md:px-4 md:text-base"
            >
              {item.label}
            </Link>
          ))}

          {/* الوثائق والأقسام الأربعة */}
          <div
            className="relative"
            onMouseEnter={() => setDocumentsOpen(true)}
            onMouseLeave={() => setDocumentsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={documentsOpen}
              onClick={() => setDocumentsOpen((open) => !open)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setDocumentsOpen(false);
                }
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-bold transition-all duration-300 md:px-4 md:text-base ${
                documentsOpen
                  ? "bg-[#d6ad55] text-[#071d40]"
                  : "text-white hover:bg-[#d6ad55] hover:text-[#071d40]"
              }`}
            >
              الوثائق

              <span
                className={`text-xs transition-transform duration-200 ${
                  documentsOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {documentsOpen && (
              <div className="absolute right-0 top-full z-[200] w-80 pt-2">

                <div className="overflow-hidden rounded-xl border border-[#d6ad55] bg-white shadow-2xl">

                  <div className="border-b-2 border-[#d6ad55] bg-[#0b2b52] px-5 py-3">
                    <p className="font-bold text-white">
                      فضاء الوثائق والمراجع
                    </p>
                  </div>

                  {documentCategories.map((item, index) => (
                    <Link
                      key={item.value}
                      href={`/documents?category=${item.value}`}
                      onClick={() => setDocumentsOpen(false)}
                      className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 text-sm font-semibold text-[#0b2b52] transition-colors last:border-0 hover:bg-amber-50 hover:text-[#a47b2c]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0b2b52] text-xs font-bold text-[#e5c77e]">
                        {index + 1}
                      </span>

                      {item.label}
                    </Link>
                  ))}

                </div>
              </div>
            )}
          </div>

          {/* تغيير اللغة */}
          <div className="mr-2">
            <LanguageSwitcher />
          </div>

        </div>
      </nav>
    </header>
  );
}
