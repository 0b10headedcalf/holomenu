import Link from "next/link";
import { DISHES, getDish } from "@/lib/dishes";
import ModelStage from "@/components/ModelStage";
import { computeTruthScore } from "@/lib/scoring";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ a?: string; b?: string }> }) {
  const sp = await searchParams;
  const a = getDish(sp.a ?? "ramen") ?? DISHES[0];
  const b = getDish(sp.b ?? "pizza") ?? DISHES[1];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compare at true scale</h1>
        <p className="mt-2 text-zinc-400">Same camera, real centimetres. This is where menus lie and photos don&apos;t.</p>
      </div>

      <form className="flex flex-wrap gap-3" action="/compare" method="get">
        {[{ name: "a", label: "Dish A", val: a.id }, { name: "b", label: "Dish B", val: b.id }].map((s) => (
          <label key={s.name} className="flex items-center gap-2 text-sm text-zinc-400">
            {s.label}
            <select name={s.name} defaultValue={s.val} className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100">
              {DISHES.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </label>
        ))}
        <button className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-300">Compare</button>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        {[a, b].map((d) => (
          <div key={d.id} className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60">
            <ModelStage src={d.model} poster={d.poster} alt={d.name} compact />
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <h2 className="font-semibold">{d.name}</h2><span className="text-zinc-400">${d.price}</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div><dt className="text-zinc-500">Size</dt><dd>{d.diameterCm} × {d.heightCm} cm</dd></div>
                <div><dt className="text-zinc-500">Weight</dt><dd>~{d.weightG}g</dd></div>
                <div><dt className="text-zinc-500">Serves</dt><dd>{d.serves}</dd></div>
                <div><dt className="text-zinc-500">TruthScore</dt><dd className="text-amber-300">{computeTruthScore(d).overall}/100</dd></div>
              </dl>
              <Link href={`/dish/${d.id}`} className="mt-4 inline-block text-sm text-amber-300 hover:underline">Open full preview →</Link>
            </div>
          </div>
        ))}
      </div>

      <p className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-sm leading-6 text-zinc-300">
        Verdict: <strong className="text-zinc-50">{a.name}</strong> ({a.diameterCm}cm, {a.weightG}g) vs <strong className="text-zinc-50">{b.name}</strong> ({b.diameterCm}cm, {b.weightG}g).
        The wider dish isn&apos;t always the more filling one — check weight and TruthScore, not just the photo.
      </p>
    </div>
  );
}
