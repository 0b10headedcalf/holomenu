import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dish } from "@/lib/dishes";
import { computeTruthScore } from "@/lib/scoring";

export default function DishCard({ dish }: { dish: Dish }) {
  const s = computeTruthScore(dish);
  return (
    <Link href={`/dish/${dish.id}`} className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 hover:border-amber-400/60">
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dish.poster} alt={dish.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
          TruthScore {s.overall}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-semibold text-zinc-50">{dish.name}</h3>
          <span className="text-sm text-zinc-400">${dish.price}</span>
        </div>
        <p className="mt-0.5 text-xs text-zinc-500">{dish.restaurant} · {dish.diameterCm}cm · {dish.weightG}g</p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">{dish.description}</p>
        <span className="mt-3 flex items-center gap-1 text-sm font-medium text-amber-300">
          See it in 3D <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
