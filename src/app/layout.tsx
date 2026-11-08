import { LanguageProvider } from "./components/LanguageProvider";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "الفرع الإقليمي للرياضة المدرسية - آسفي",
  description:
    "المنصة الرقمية للفرع الإقليمي للرياضة المدرسية بإقليم آسفي",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
     <body className="min-h-screen flex flex-col antialiased">
  <LanguageProvider>
    {children}
  </LanguageProvider>
</body>
    </html>
  );
}
