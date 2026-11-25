"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconArrowLeft } from "./icons";

const slides = [
  {
    src: "/images/podium-filles.jpg",
    alt: "تتويج التلميذات الفائزات على منصة التتويج",
    position: "50% 35%",
  },
  {
    src: "/images/taslim-midalya.jpg",
    alt: "تسليم الميدالية لتلميذة متوجة في العدو الريفي",
    position: "50% 30%",
  },
  {
    src: "/images/podium-groupe.jpg",
    alt: "تتويج الفائزين في بطولة جهوية لألعاب القوى المدرسية",
    position: "50% 62%",
  },
  {
    src: "/images/tatwij-jama3i.jpg",
    alt: "صورة جماعية للمتوجين والمؤطرين بعد المنافسة",
    position: "50% 40%",
  },
];

export default function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] md:px-6">
      <div className="flex flex-col overflow-hidden bg-[#0b3b75] lg:flex-row">
        {/* الصور */}
        <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[380px] lg:flex-[1.4]">
          {slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: slide.position }}
            />
          ))}

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#04152f]/50 px-2 py-1">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`الصورة ${i + 1}`}
                aria-current={i === active}
                className="flex px-1 py-2"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === active ? "w-6 bg-amber-400" : "w-2 bg-white/75"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* النص */}
        <div className="flex flex-col items-center justify-center px-5 py-8 text-center text-white md:px-6 md:py-10 lg:flex-1">
          <p className="text-2xl font-black leading-relaxed sm:text-3xl md:text-4xl">الرياضة المدرسية</p>
          <p className="mt-1 text-xl font-black leading-relaxed text-amber-400 sm:text-2xl md:text-[2.15rem]">
            من أجل مدرسة ذات جودة للجميع
          </p>
          <span className="mb-7 mt-4 h-1 w-24 rounded-full bg-amber-400" />
          <Link
            href="/competitions"
            className="flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3 text-lg font-extrabold text-[#082d59] transition hover:bg-amber-300"
          >
            اكتشف المزيد
            <IconArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
