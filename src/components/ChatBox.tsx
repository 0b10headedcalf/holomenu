"use client";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

const PRESETS = ["Is this enough for two?", "How big is it really?", "What's in it?", "Any allergens?"];

export default function ChatBox({ dishId, dishName }: { dishId: string; dishName: string }) {
  const [q, setQ] = useState("");
  const [log, setLog] = useState<{ q: string; a: string; source?: string }[]>([]);
  const [busy, setBusy] = useState(false);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dishId, question }),
      });
      const data = await res.json();
      setLog((l) => [{ q: question, a: data.answer ?? "No answer.", source: data.source }, ...l]);
    } catch {
      setLog((l) => [{ q: question, a: "Chat failed — check your connection and try again." }, ...l]);
    } finally {
      setBusy(false);
      setQ("");
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Sparkles className="h-4 w-4 text-blue-600" /> Ask about {dishName}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p} onClick={() => ask(p)} disabled={busy} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50">
            {p}
          </button>
        ))}
      </div>
      <form className="mt-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about portion, ingredients, scale…" className="flex-1 rounded-xl border border-slate-200 bg-[#faf9f6] px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none" />
        <button disabled={busy} className="flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
          <Send className="h-4 w-4" /> {busy ? "…" : "Ask"}
        </button>
      </form>
      <div className="mt-4 space-y-3">
        {log.map((m, i) => (
          <div key={i} className="rounded-xl bg-[#faf9f6]/70 p-3">
            <p className="text-xs font-medium text-blue-600">{m.q}</p>
            <p className="mt-1 text-sm leading-6 text-slate-700">{m.a}</p>
            {m.source && <p className="mt-1 text-[11px] text-zinc-600">via {m.source}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
