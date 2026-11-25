import { Cairo } from "next/font/google";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800", "900"],
});

/** الإطار المشترك لكل صفحات الموقع العمومية: الشريط العلوي، الرأس، الخلفية والتذييل */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      lang="ar"
      className={`${cairo.className} flex min-h-screen flex-col bg-[#eef3f9] text-[#0f2340]`}
      style={{
        // خلفية زليج مغربي مع طبقة فاتحة فوقها حتى يبقى المحتوى واضحاً
        backgroundImage:
          "linear-gradient(rgba(238,243,249,0.82), rgba(238,243,249,0.82)), url('/images/zellige.webp')",
        backgroundSize: "auto, 360px",
        backgroundAttachment: "fixed",
      }}
    >
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
