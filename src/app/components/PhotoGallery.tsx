"use client";

import { useCallback, useEffect, useState } from "react";
import { IconArrowLeft, IconClose } from "./icons";

export type GalleryPhoto = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
};

/** معرض صور مع عرض مكبر (يُغلق بزر Esc أو بالنقر خارج الصورة) */
export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-200 shadow-sm"
              aria-label={`تكبير الصورة: ${photo.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.image_url}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-right text-sm font-bold text-white opacity-0 transition group-hover:opacity-100">
                {photo.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image_url}
              alt={current.title}
              className="max-h-[78vh] w-auto rounded-xl object-contain"
            />
            <figcaption className="mt-3 text-center text-white">
              <p className="text-lg font-bold">{current.title}</p>
              {current.description && <p className="mt-1 text-sm text-slate-300">{current.description}</p>}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={close}
            aria-label="إغلاق"
            className="absolute left-4 top-4 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
          >
            <IconClose className="h-6 w-6" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="الصورة التالية"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
              >
                <IconArrowLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="الصورة السابقة"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
              >
                <IconArrowLeft className="h-6 w-6 rotate-180" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
