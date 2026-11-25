
"use client";

import Image from "next/image";

export default function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b2b52]">
      <Image
        src="/images/header-safi-new.png"
        alt="الفرع الإقليمي للرياضة المدرسية بآسفي ومعالم مدينة آسفي"
        width={2172}
        height={724}
        priority
        quality={100}
        sizes="100vw"
        className="block h-auto w-full object-contain"
      />
    </section>
  );
}
