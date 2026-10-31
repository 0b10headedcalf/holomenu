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
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function scan(imageDataUrl?: string) {
    setBusy(true);
    setError("");
    setResults(null);
    try {
      const res = await fetch("/api/menu-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl ?? null, demo: !imageDataUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scan failed. Please try again.");
      setResults(data.dishes ?? []);
      setSource(data.source ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function onFile(f: File) {
    if (f.size > 6_000_000 || !["image/jpeg", "image/png", "image/webp"].includes(f.type)) { setError("Choose a JPEG, PNG, or WebP under 6 MB."); return; }
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
    <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900"><ScanLine className="h-5 w-5 text-blue-600" /> Scan a menu</h2>
          <p className="mt-1 text-sm text-slate-500">Photo of a paper menu → dishes you can inspect in 3D. No restaurant setup required.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => inputRef.current?.click()} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            <Camera className="h-4 w-4" /> Upload menu photo
          </button>
          <button onClick={() => scan()} disabled={busy} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:border-blue-500 disabled:opacity-50">
            Try sample menu
          </button>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />

      {error && <p role="alert" className="mt-4 text-sm text-blue-600">{error}</p>}
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={fileName ?? "menu"} className="mt-4 max-h-56 w-full rounded-xl object-cover" />
      )}
      {busy && <p className="mt-4 flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Reading menu with Muse Spark…</p>}

      {results && (
        <div className="mt-4">
          <p className="text-xs text-slate-500">Found {results.length} catalogue matches {source && `· via ${source}`}</p>
          {results.length === 0 && <p className="mt-3 text-sm text-slate-600">No reconstructed dishes match this menu yet. Browse the demo catalogue below.</p>}
          <ul className="mt-2 divide-y divide-zinc-800 rounded-xl border border-slate-200">
            {results.map((d) => (
              <li key={d.id}>
                <Link href={`/dish/${d.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-blue-50">
                  <span className="text-sm text-slate-900">{d.name} {d.price ? <span className="text-slate-500">· ${d.price}</span> : null}</span>
                  <span className="text-xs text-blue-600">{Math.round(d.confidence * 100)}% match → view in 3D</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
