import type { Dish } from "@/lib/dishes";

export default function EvidenceStrip({ dish }: { dish: Dish }) {
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Evidence — real customer photos</h3>
        <span className="text-xs text-slate-500">not promo shots</span>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {dish.evidence.map((p, i) => (
          <figure key={i} className="w-36 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt={`${dish.name} ${p.angle}`} className="h-28 w-36 rounded-xl object-cover" loading="lazy" />
            <figcaption className="mt-1.5 text-[11px] leading-4 text-slate-500">
              {p.angle} · {p.daysAgo}d ago
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
