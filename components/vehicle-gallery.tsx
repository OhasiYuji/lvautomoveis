"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { VehiclePhoto } from "@/lib/api";

export function VehicleGallery({ photos, label }: { photos: VehiclePhoto[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (photos.length === 0) {
    return (
      <div className="border-border bg-surface flex aspect-[16/10] w-full items-center justify-center rounded-lg border">
        <p className="text-muted text-sm">Sem foto</p>
      </div>
    );
  }

  function go(delta: number) {
    setIndex((prev) => (prev + delta + photos.length) % photos.length);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="group border-border bg-surface relative aspect-[16/10] w-full overflow-hidden rounded-lg border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[index].url}
          alt={`${label} — foto ${index + 1}`}
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
          title="Ampliar"
        >
          <ZoomIn className="size-4" />
        </button>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              title="Foto anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              title="Próxima foto"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
              {index + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {photos.map((photo, i) => (
            <button
              key={photo.url}
              type="button"
              onClick={() => setIndex(i)}
              className={`aspect-video overflow-hidden rounded-md border-2 transition-colors ${
                i === index ? "border-[var(--gold-2)]" : "border-border hover:border-[var(--gold-2)]/50"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            title="Fechar"
          >
            <X className="size-5" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                title="Anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                title="Próxima"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[index].url}
            alt={`${label} — foto ${index + 1}`}
            className="max-h-[90vh] max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
