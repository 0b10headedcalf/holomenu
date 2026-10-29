import Link from "next/link";
import { Camera, MessageCircleQuestion, Scale, ShieldCheck } from "lucide-react";
import { DISHES } from "@/lib/dishes";
import DishCard from "@/components/DishCard";
import MenuScanner from "@/components/MenuScanner";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">From real experiences to spatial intelligence</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Don&apos;t imagine your order.<br />Experience it before it arrives.
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-400">
          HoloMenu turns real customer food photos into interactive 3D previews you can rotate, place on your table, compare for scale, and question — with a TruthScore that tells you when the evidence is thin.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#scan" className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-300">Scan a menu</a>
          <Link href="/glasses" className="rounded-xl border border-zinc-700 px-5 py-3 text-sm text-zinc-100 hover:border-amber-400">Try Glasses view →</Link>
        </div>
      </section>

      <div id="scan"><MenuScanner /></div>

      <section>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Tonight&apos;s evidence-backed dishes</h2>
          <span className="text-sm text-zinc-500">pre-reconstructed for instant load</span>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DISHES.map((d) => <DishCard key={d.id} dish={d} />)}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Camera, title: "Real photos, not promo shots", text: "SAM 3.1 segments the dish out of messy customer photos. Modal GPUs reconstruct a representative 3D model — cached, so repeat views feel instant." },
          { icon: ShieldCheck, title: "TruthScore, not false confidence", text: "We score portion, presentation, and color agreement across photos and show where servings disagree. Low evidence is labeled low." },
          { icon: MessageCircleQuestion, title: "Ask it like a person", text: "\"Enough for two?\" \"How big, really?\" Muse Spark answers grounded in measured size, ingredients, and the uncertainty notes." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <f.icon className="h-6 w-6 text-amber-400" />
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="flex items-center gap-2 text-sm text-zinc-300"><Scale className="h-5 w-5 text-amber-400" /> Can&apos;t decide? Put two dishes side-by-side at true scale.</p>
        <Link href="/compare?a=ramen&b=pizza" className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-white">Compare ramen vs pizza</Link>
      </section>
    </div>
  );
}
