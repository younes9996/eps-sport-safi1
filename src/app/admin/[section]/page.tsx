
import Link from "next/link";
import { notFound } from "next/navigation";

const sections: Record<string, { title: string; description: string; icon: string }> = {
  actualites: {
    title: "الأخبار والإعلانات",
    description: "إضافة الأخبار والإعلانات الخاصة بالرياضة المدرسية.",
    icon: "📰",
  },
  competitions: {
    title: "المسابقات والبطولات",
    description: "إنشاء البطولات وتحديد الرياضات والفئات والمواسم.",
    icon: "🏆",
  },
  resultats: {
    title: "النتائج والترتيب",
    description: "تسجيل نتائج المنافسات وإعداد الترتيب.",
    icon: "🥇",
  },
  programmation: {
    title: "البرمجة الرياضية",
    description: "تحديد مواعيد المباريات والأنشطة الرياضية.",
    icon: "📅",
  },
  etablissements: {
    title: "المؤسسات التعليمية",
    description: "تدبير المؤسسات التعليمية بالإقليم.",
    icon: "🏫",
  },
  palmares: {
    title: "سجل الأبطال",
    description: "تسجيل الأبطال والإنجازات الرياضية.",
    icon: "🏅",
  },
};

export default async function AdminSection({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const data = sections[section];

  if (!data) notFound();

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#f3f7fa",
        color: "#102c4b",
        fontFamily: "Arial",
      }}
    >
      <header
        style={{
          background: "#102c4b",
          color: "white",
          padding: "22px 6%",
        }}
      >
        <strong>🏆 إدارة الرياضة المدرسية – آسفي</strong>
      </header>

      <section style={{ maxWidth: 1000, margin: "50px auto", padding: "0 20px" }}>
        <Link href="/admin" style={{ color: "#15966a" }}>
          ← العودة إلى لوحة القيادة
        </Link>

        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 35,
            marginTop: 25,
            border: "1px solid #e5edf2",
          }}
        >
          <div style={{ fontSize: 45 }}>{data.icon}</div>
          <h1 style={{ fontSize: 30 }}>{data.title}</h1>
          <p style={{ color: "#64748b", lineHeight: 2 }}>
            {data.description}
          </p>

          <div
            style={{
              marginTop: 30,
              padding: 25,
              background: "#f0f8f5",
              borderRadius: 12,
            }}
          >
            <h3 style={{ color: "#16865d" }}>فضاء التدبير</h3>
            <p style={{ color: "#64748b", lineHeight: 2 }}>
              سيتم تجهيز هذا القسم لإضافة المعلومات وتعديلها ونشرها على الموقع العمومي.
            </p>
            <span style={{ color: "#16865d", fontWeight: "bold" }}>
              المرحلة المقبلة: ربط قاعدة البيانات
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
