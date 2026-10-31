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
        <p className="mt-2 text-slate-500">Same camera, real centimetres. This is where menus lie and photos don&apos;t.</p>
      </div>

      <form className="flex flex-wrap gap-3" action="/compare" method="get">
        {[{ name: "a", label: "Dish A", val: a.id }, { name: "b", label: "Dish B", val: b.id }].map((s) => (
          <label key={s.name} className="flex items-center gap-2 text-sm text-slate-500">
            {s.label}
            <select name={s.name} defaultValue={s.val} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900">
              {DISHES.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </label>
        ))}
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Compare</button>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        {[a, b].map((d) => (
          <div key={d.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <ModelStage src={d.model} poster={d.poster} alt={d.name} compact />
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <h2 className="font-semibold">{d.name}</h2><span className="text-slate-500">${d.price}</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div><dt className="text-slate-500">Size</dt><dd>{d.diameterCm} × {d.heightCm} cm</dd></div>
                <div><dt className="text-slate-500">Weight</dt><dd>~{d.weightG}g</dd></div>
                <div><dt className="text-slate-500">Serves</dt><dd>{d.serves}</dd></div>
                <div><dt className="text-slate-500">TruthScore</dt><dd className="text-blue-600">{computeTruthScore(d).overall}/100</dd></div>
              </dl>
              <Link href={`/dish/${d.id}`} className="mt-4 inline-block text-sm text-blue-600 hover:underline">Open full preview →</Link>
            </div>
          </div>
        ))}
      </div>

      <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
        Verdict: <strong className="text-slate-900">{a.name}</strong> ({a.diameterCm}cm, {a.weightG}g) vs <strong className="text-slate-900">{b.name}</strong> ({b.diameterCm}cm, {b.weightG}g).
        The wider dish isn&apos;t always the more filling one — check weight and TruthScore, not just the photo.
      </p>
    </div>
  );
}
