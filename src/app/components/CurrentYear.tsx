"use client";

import { useEffect, useState } from "react";

/** السنة الحالية (تُحسب في المتصفح حتى لا تتعارض مع التخزين المؤقت لـ Next.js) */
export default function CurrentYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
