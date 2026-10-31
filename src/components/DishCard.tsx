import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dish } from "@/lib/dishes";
import { computeTruthScore } from "@/lib/scoring";

export default function DishCard({ dish }: { dish: Dish }) {
  const s = computeTruthScore(dish);
  return (
    <Link href={`/dish/${dish.id}`} className="group overflow-hidden rounded-2xl bg-transparent">
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dish.poster} alt={dish.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />

      </div>
      <div className="px-1 py-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-medium tracking-tight text-slate-900">{dish.name}</h3>
          <span className="text-sm text-slate-500">${dish.price}</span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{dish.restaurant} · {dish.diameterCm}cm · {dish.weightG}g</p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{dish.description}</p>
        <p className="mt-3 text-xs text-slate-500">{s.photoCount} sample photos · {s.overall < 65 ? "Limited evidence" : "Portion evidence available"}</p>
        <span className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600">
          See it in 3D <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
