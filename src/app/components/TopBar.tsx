"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconCalendar, IconPin } from "./icons";

export default function TopBar() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("ar-MA", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  return (
    <div className="bg-[#082d59] text-sm font-semibold text-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-2 md:gap-3 md:px-6 md:py-2.5">
        {/* شعار الجامعة الملكية المغربية للرياضة المدرسية + المكان والتاريخ */}
        <div className="flex flex-1 basis-0 items-center gap-4 md:basis-60 md:flex-wrap">
          <Image
            src="/images/logo-frmss.png"
            alt="الجامعة الملكية المغربية للرياضة المدرسية"
            width={282}
            height={317}
            className="h-12 w-auto shrink-0 md:h-20"
          />
          <span className="hidden items-center gap-1.5 lg:flex">
            <IconPin className="h-4 w-4" />
            آسفي - المملكة المغربية
          </span>
          <span className="hidden opacity-50 lg:inline">|</span>
          <span className="hidden min-w-32 items-center gap-1.5 md:flex">
            <IconCalendar className="h-4 w-4" />
            {today}
          </span>
        </div>

        {/* شعار الأكاديمية والمديرية */}
        <Image
          src="/images/logo-academie.png"
          alt="الأكاديمية الجهوية للتربية والتكوين جهة مراكش - أسفي، المديرية الإقليمية أسفي"
          width={510}
          height={456}
          className="mx-auto h-16 w-auto shrink-0 md:h-24"
          priority
        />

        {/* مدرستنا */}
        <div className="flex flex-1 basis-0 items-center justify-end gap-3 md:basis-60">
          <Image
            src="/images/logo-madrastna.png"
            alt="مدرستنا"
            width={447}
            height={149}
            className="h-8 w-auto md:h-12"
          />
        </div>
      </div>
    </div>
  );
}
