"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Mic } from "lucide-react";
import { DISHES } from "@/lib/dishes";
import { computeTruthScore } from "@/lib/scoring";

/**
 * Ray-Ban Display web-app view: same URL, glasses-first layout.
 * Large type, high contrast, one fact at a time, voice-first.
 * Test in the Meta Wearables web-app simulator; falls back fine on phone.
 */
export default function GlassesPage() {
  const [i, setI] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const dish = DISHES[i];
  const score = computeTruthScore(dish);

  function listen() {
    type SpeechRec = {
      lang: string;
      onstart: (() => void) | null;
      onend: (() => void) | null;
      onresult: ((e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => void) | null;
      start: () => void;
    };
    type SRCtor = new () => SpeechRec;
    const w = window as unknown as { SpeechRecognition?: SRCtor; webkitSpeechRecognition?: SRCtor };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { setHeard("Voice input not available in this browser — use Next/Back."); return; }
    const rec = new SR();
    rec.lang = "en-US";
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e: { results: { [k: number]: { [k: number]: { transcript: string } } } }) => {
      const text = e.results[0][0].transcript;
      setHeard(text);
      const t = text.toLowerCase();
      if (t.includes("next")) setI((v) => (v + 1) % DISHES.length);
      if (t.includes("back") || t.includes("previous")) setI((v) => (v - 1 + DISHES.length) % DISHES.length);
    };
    rec.start();
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">Ray-Ban Display · web app view</p>
        <p className="mt-1 text-sm text-zinc-500">Say “next” / “back”, or tap. Same URL as the phone experience.</p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border-4 border-zinc-700 bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dish.poster} alt={dish.name} className="h-64 w-full object-cover" />
        <div className="space-y-3 p-6 text-center">
          <p className="text-3xl font-bold leading-tight">{dish.name}</p>
          <p className="text-2xl text-amber-300">${dish.price}</p>
          <p className="text-lg text-zinc-300">{dish.diameterCm}cm across · ~{dish.weightG}g · {dish.serves}</p>
          <p className="text-base text-zinc-400">TruthScore {score.overall}/100 — {score.label}</p>
          <p className="text-sm leading-6 text-zinc-500">{dish.uncertainty}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={() => setI((i - 1 + DISHES.length) % DISHES.length)} className="flex items-center gap-1 rounded-full border border-zinc-700 px-5 py-3 text-base hover:border-amber-400"><ChevronLeft className="h-5 w-5" /> Back</button>
        <button onClick={listen} className={`flex items-center gap-2 rounded-full px-5 py-3 text-base font-semibold ${listening ? "bg-red-400 text-zinc-950" : "bg-amber-400 text-zinc-950"}`}>
          <Mic className="h-5 w-5" /> {listening ? "Listening…" : "Voice"}
        </button>
        <button onClick={() => setI((i + 1) % DISHES.length)} className="flex items-center gap-1 rounded-full border border-zinc-700 px-5 py-3 text-base hover:border-amber-400">Next <ChevronRight className="h-5 w-5" /></button>
      </div>
      {heard && <p className="text-center text-sm text-zinc-400">Heard: “{heard}”</p>}
      <p className="text-center"><Link href={`/dish/${dish.id}`} className="text-sm text-amber-300 hover:underline">Open full 3D on phone →</Link></p>
    </div>
  );
}
