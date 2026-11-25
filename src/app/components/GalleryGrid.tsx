
"use client";

import { useEffect, useState } from "react";

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
};

export default function GalleryGrid({
  items,
}: {
  items: GalleryItem[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function closeGallery() {
    setActiveIndex(null);
  }

  function nextImage() {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % items.length
    );
  }

  function previousImage() {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + items.length) % items.length
    );
  }

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") previousImage();
      if (e.key === "ArrowLeft") nextImage();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, items.length]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
        <div className="mb-4 text-5xl">📸</div>
        <h3 className="text-xl font-bold text-gray-700">
          لا توجد صور حالياً
        </h3>
        <p className="mt-3 text-gray-500">
          سيتم إضافة صور الأنشطة والبطولات قريباً.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden rounded-2xl bg-white text-right shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
                <span className="scale-90 rounded-full bg-white/90 px-5 py-3 font-bold text-[#123d65] opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                  تكبير الصورة <span aria-hidden="true">⌕</span>
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-[#123d65]">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-gray-500">
                  {item.description}
                </p>
              )}

              <p className="mt-3 text-xs text-gray-400">
                {new Date(item.created_at).toLocaleDateString("ar-MA")}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={closeGallery}
          role="dialog"
          aria-modal="true"
          aria-label="معرض الصور"
        >
          <button
            type="button"
            onClick={closeGallery}
            aria-label="إغلاق"
            className="absolute left-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              previousImage();
            }}
            aria-label="الصورة السابقة"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30 sm:right-8"
          >
            ‹
          </button>

          <div
            className="flex max-h-full w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[activeIndex].image_url}
              alt={items[activeIndex].title}
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />

            <div className="mt-5 text-center text-white">
              <h3 className="text-lg font-bold">
                {items[activeIndex].title}
              </h3>

              {items[activeIndex].description && (
                <p className="mt-2 text-sm text-gray-300">
                  {items[activeIndex].description}
                </p>
              )}

              <p className="mt-3 text-sm text-gray-400">
                الصورة {activeIndex + 1} من {items.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="الصورة التالية"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/30 sm:left-8"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
