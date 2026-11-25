
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !data.user) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setError("ليس لديك صلاحية الدخول إلى لوحة الإدارة.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏫</div>

          <h1 className="text-2xl font-bold text-[#102e50]">
            لوحة الإدارة
          </h1>

          <p className="text-gray-500 mt-2">
            الفرع الإقليمي للرياضة المدرسية - آسفي
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#15966a]"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              كلمة المرور
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#15966a]"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#15966a] hover:bg-[#107a55] text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          EPS SPORT SAFI © 2026
        </p>
      </div>
    </main>
  );
}