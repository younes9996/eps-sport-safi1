"use client";

import DocumentsManager from "../DocumentsManager";
import { documentCategories } from "@/app/components/siteData";

export default function AdminDocumentsPage() {
  return (
    <DocumentsManager
      title="الوثائق والمراجع"
      subtitle="رفع الوثائق الرسمية حسب التصنيفات الأربعة (PDF)."
      categories={documentCategories.map((c) => ({ value: c.value, label: c.title }))}
      publicHref={(category) => `/documents?category=${category}`}
    />
  );
}
