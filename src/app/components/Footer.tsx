import Image from "next/image";
import Link from "next/link";
import CurrentYear from "./CurrentYear";

const quickLinks = [
  { title: "الرئيسية", href: "/" },
  { title: "الوثائق", href: "/documents" },
  { title: "المنافسات", href: "/competitions" },
  { title: "الترتيب والنتائج", href: "/rankings" },
  { title: "معرض الصور", href: "/galerie" },
  { title: "الأخبار", href: "/actualites" },
  { title: "فضاء الإدارة", href: "/admin/login" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-amber-400 bg-[#082d59] text-blue-100">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-8 px-4 py-8 md:px-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-extrabold text-white">روابط سريعة</h3>
          <div className="flex max-w-md flex-wrap gap-x-5 gap-y-2 font-semibold">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-amber-400">
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <Image
            src="/images/logo-safi.png"
            alt="شعار الفرع الإقليمي للرياضة المدرسية بآسفي"
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-full bg-white object-contain p-1"
          />
          <p className="text-lg font-black text-white">
            الفرع الإقليمي للرياضة المدرسية - آسفي
          </p>
          <p className="text-sm font-semibold">فضاء رقمي لخدمة الرياضة المدرسية</p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-blue-200">
        جميع الحقوق محفوظة © <CurrentYear /> · الفرع الإقليمي للرياضة المدرسية بآسفي
      </div>
    </footer>
  );
}
