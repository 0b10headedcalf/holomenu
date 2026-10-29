"use client";
import { useEffect, useState } from "react";
import { Loader2, Rotate3D, Maximize2 } from "lucide-react";

export default function ModelStage({
  src,
  poster,
  alt,
  compact = false,
}: {
  src: string;
  poster: string;
  alt: string;
  compact?: boolean;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").catch(() => setFailed(true));
  }, []);

  if (failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt={alt} className="h-full w-full object-cover" />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-zinc-900 ${compact ? "h-64" : "h-[420px] sm:h-[520px]"}`}>
      {!ready && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-zinc-900 text-zinc-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <Loader2 className="relative h-6 w-6 animate-spin text-amber-400" />
          <p className="relative text-sm">Reconstructing from real photos…</p>
        </div>
      )}
      {/* @ts-expect-error web component */}
      <model-viewer
        src={src}
        poster={poster}
        alt={alt}
        camera-controls
        auto-rotate
        auto-rotate-delay={800}
        rotation-per-second="18deg"
        shadow-intensity="1"
        exposure="1.05"
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: "100%", height: "100%", backgroundColor: "#18181b" }}
        onLoad={() => setReady(true)}
        onError={() => setFailed(true)}
      />
      <div className="pointer-events-none absolute bottom-3 left-3 flex gap-2 text-[11px] text-zinc-200">
        <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1"><Rotate3D className="h-3 w-3" /> Drag to rotate</span>
        <span className="hidden sm:flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1"><Maximize2 className="h-3 w-3" /> AR: place on table</span>
      </div>
    </div>
  );
}
