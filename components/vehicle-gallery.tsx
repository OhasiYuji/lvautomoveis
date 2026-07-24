"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { VehiclePhoto } from "@/lib/api";

export function VehicleGallery({ photos, label }: { photos: VehiclePhoto[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="border-border bg-surface flex aspect-[21/9] w-full items-center justify-center rounded-lg border">
        <p className="text-muted text-sm">Sem foto</p>
      </div>
    );
  }

  function scrollByOne(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.firstElementChild?.clientWidth ?? track.clientWidth / 3;
    track.scrollBy({ left: direction * (slideWidth + 8), behavior: "smooth" });
  }

  function goLightbox(delta: number) {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev + delta + photos.length) % photos.length;
    });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.url}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="border-border bg-surface relative aspect-[4/3] w-[calc(100%-1rem)] shrink-0 snap-start overflow-hidden rounded-lg border sm:w-[calc(70%-0.5rem)] lg:w-[calc(60%-0.6rem)]"
          >
            <Image
              src={photo.url}
              alt={`${label} — foto ${i + 1}`}
              fill
              priority={i < 3}
              loading={i < 3 ? undefined : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollByOne(-1)}
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
            title="Anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByOne(1)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
            title="Próxima"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            title="Fechar"
          >
            <X className="size-5" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goLightbox(-1)}
                className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                title="Anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => goLightbox(1)}
                className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                title="Próxima"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
          <div className="relative h-[90vh] w-full max-w-4xl">
            <Image
              src={photos[lightboxIndex].url}
              alt={`${label} — foto ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <span className="absolute bottom-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
            {lightboxIndex + 1} / {photos.length}
          </span>
        </div>
      )}
    </div>
  );
}
