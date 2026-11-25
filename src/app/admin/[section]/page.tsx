"use client";

import { Suspense, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DocumentsManager from "../DocumentsManager";

const SECTIONS: Record<string, { title: string; subtitle: string }> = {
  competitions: {
    title: "البطولات والمنافسات",
    subtitle: "رفع وثائق البطولات والمسابقات الرياضية المدرسية (PDF).",
  },
  rankings: {
    title: "الترتيب والنتائج النهائية",
    subtitle: "نشر النتائج والترتيب النهائي للمنافسات (PDF).",
  },
  programming: {
    title: "البرمجة الرياضية",
    subtitle: "نشر برنامج المنافسات والمواعيد (PDF).",
  },
};

function SportsSection() {
  const { section } = useParams<{ section: string }>();
  const router = useRouter();
  const config = SECTIONS[section];

  useEffect(() => {
    if (!config) router.replace("/admin");
  }, [config, router]);

  if (!config) return null;

  return (
    <DocumentsManager
      key={section}
      title={config.title}
      subtitle={config.subtitle}
      categories={[{ value: section, label: config.title }]}
      publicHref={(category) => `/${category}`}
    />
  );
}

export default function AdminSportsSectionPage() {
  return (
    <Suspense fallback={null}>
      <SportsSection />
    </Suspense>
  );
}
