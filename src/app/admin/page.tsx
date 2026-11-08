
import Link from "next/link";

const modules = [
  { title: "الأخبار والإعلانات", subtitle: "نشر وتدبير الأخبار", icon: "📰", href: "/admin/actualites", color: "#16865d" },
  { title: "المسابقات والبطولات", subtitle: "تنظيم المنافسات الرياضية", icon: "🏆", href: "/admin/competitions", color: "#d69b25" },
  { title: "النتائج والترتيب", subtitle: "إدخال النتائج وتتبع الترتيب", icon: "🥇", href: "/admin/resultats", color: "#4778c7" },
  { title: "البرمجة الرياضية", subtitle: "تحديد مواعيد المباريات", icon: "📅", href: "/admin/programmation", color: "#9a65bb" },
  { title: "المؤسسات التعليمية", subtitle: "تدبير المؤسسات المشاركة", icon: "🏫", href: "/admin/etablissements", color: "#dc7043" },
  { title: "سجل الأبطال", subtitle: "تدبير الألقاب والإنجازات", icon: "🏅", href: "/admin/palmares", color: "#188e9b" },
];

export default function AdminPage() {
  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#f3f7fa", color: "#102c4b", fontFamily: "Arial" }}>
      <header style={{ background: "#102c4b", color: "white", padding: "20px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 15 }}>
        <div>
          <h2 style={{ margin: 0 }}>🏆 إدارة الرياضة المدرسية</h2>
          <small style={{ color: "#cbd5e1" }}>الفرع الإقليمي – آسفي</small>
        </div>
        <Link href="/" style={{ color: "white", border: "1px solid #ffffff55", padding: "10px 17px", borderRadius: 8 }}>
          العودة للموقع ↗
        </Link>
      </header>

      <section style={{ padding: "40px 6%" }}>
        <p style={{ color: "#15966a", fontWeight: "bold" }}>ESPACE ADMINISTRATION</p>
        <h1 style={{ fontSize: 32, margin: "10px 0" }}>لوحة القيادة</h1>
        <p style={{ color: "#64748b" }}>مرحبا بك في فضاء تدبير منصة الرياضة المدرسية بإقليم آسفي.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20, marginTop: 35 }}>
          {modules.map((item) => (
            <Link key={item.href} href={item.href} style={{ background: "white", borderRadius: 15, padding: 25, border: "1px solid #e5edf2", color: "#102c4b", boxShadow: "0 4px 15px #102c4b08" }}>
              <div style={{ width: 52, height: 52, borderRadius: 13, background: `${item.color}18`, display: "grid", placeItems: "center", fontSize: 27 }}>
                {item.icon}
              </div>
              <h3 style={{ margin: "20px 0 8px" }}>{item.title}</h3>
              <p style={{ color: "#64748b", fontSize: 14 }}>{item.subtitle}</p>
              <strong style={{ color: item.color, fontSize: 13 }}>فتح القسم ←</strong>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 30, padding: 25, background: "white", borderRadius: 15, border: "1px solid #e5edf2" }}>
          <h3>معلومات المنصة</h3>
          <p style={{ color: "#64748b", lineHeight: 2 }}>
            الموسم الرياضي: 2026–2027<br />
            المجال الترابي: إقليم آسفي<br />
            المنصة: الرياضة المدرسية – Sport Scolaire Safi
          </p>
        </div>
      </section>

      <footer style={{ background: "#102c4b", color: "white", padding: 20, textAlign: "center" }}>
        Branche Provinciale du Sport Scolaire – Safi © 2026
      </footer>
    </main>
  );
}
