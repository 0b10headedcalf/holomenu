"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { Camera, ScanLine, Loader2 } from "lucide-react";

type Scanned = { id: string; name: string; price?: number; confidence: number };

export default function MenuScanner() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<Scanned[] | null>(null);
  const [source, setSource] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function scan(imageDataUrl?: string) {
    setBusy(true);
    try {
      const res = await fetch("/api/menu-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl ?? null, demo: !imageDataUrl }),
      });
      const data = await res.json();
      setResults(data.dishes ?? []);
      setSource(data.source ?? "");
    } finally {
      setBusy(false);
    }
  }

  function onFile(f: File) {
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setPreview(url);
      scan(url);
    };
    reader.readAsDataURL(f);
  }

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-50"><ScanLine className="h-5 w-5 text-amber-400" /> Scan a menu</h2>
          <p className="mt-1 text-sm text-zinc-400">Photo of a paper menu → dishes you can inspect in 3D. No restaurant setup required.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => inputRef.current?.click()} className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-300">
            <Camera className="h-4 w-4" /> Upload menu photo
          </button>
          <button onClick={() => scan()} disabled={busy} className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-zinc-200 hover:border-amber-400 disabled:opacity-50">
            Try sample menu
          </button>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={fileName ?? "menu"} className="mt-4 max-h-56 w-full rounded-xl object-cover" />
      )}
      {busy && <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400"><Loader2 className="h-4 w-4 animate-spin" /> Reading menu with Muse Spark…</p>}

      {results && (
        <div className="mt-4">
          <p className="text-xs text-zinc-500">Found {results.length} dishes {source && `· via ${source}`}</p>
          <ul className="mt-2 divide-y divide-zinc-800 rounded-xl border border-zinc-800">
            {results.map((d) => (
              <li key={d.id}>
                <Link href={`/dish/${d.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/50">
                  <span className="text-sm text-zinc-100">{d.name} {d.price ? <span className="text-zinc-500">· ${d.price}</span> : null}</span>
                  <span className="text-xs text-amber-300">{Math.round(d.confidence * 100)}% match → view in 3D</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
