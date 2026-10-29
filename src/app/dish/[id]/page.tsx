import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Flame, Ruler, Scale, Users } from "lucide-react";
import { DISHES, getDish } from "@/lib/dishes";
import ModelStage from "@/components/ModelStage";
import TruthScore from "@/components/TruthScore";
import EvidenceStrip from "@/components/EvidenceStrip";
import ChatBox from "@/components/ChatBox";

export function generateStaticParams() {
  return DISHES.map((d) => ({ id: d.id }));
}

export default async function DishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dish = getDish(id);
  if (!dish) notFound();
  const other = DISHES.find((d) => d.id !== dish.id)!;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="text-sm text-zinc-500 hover:text-amber-300">← All dishes</Link>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{dish.name}</h1>
          <span className="text-xl text-zinc-300">${dish.price} · {dish.restaurant}</span>
        </div>
        <p className="mt-2 max-w-3xl leading-7 text-zinc-400">{dish.description}</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-800">
        <ModelStage src={dish.model} poster={dish.poster} alt={`3D reconstruction of ${dish.name}`} />
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { icon: Ruler, label: "Real size", value: `${dish.diameterCm} × ${dish.heightCm} cm` },
          { icon: Scale, label: "Weight", value: `~${dish.weightG}g` },
          { icon: Users, label: "Serves", value: dish.serves },
          { icon: Flame, label: "Calories", value: `~${dish.calories} kcal` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <s.icon className="h-5 w-5 text-amber-400" />
            <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">{s.label}</p>
            <p className="mt-0.5 font-semibold text-zinc-50">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <TruthScore dish={dish} />
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <h3 className="text-sm font-semibold">Ingredients & allergens</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-300">{dish.ingredients.join(" · ")}</p>
            <p className="mt-2 text-sm text-zinc-400">Allergens: <span className="text-amber-300">{dish.allergens.join(", ")}</span></p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500"><Clock className="h-3.5 w-3.5" /> Reconstruction cached from customer photos — repeat views load instantly.</p>
            <Link href={`/compare?a=${dish.id}&b=${other.id}`} className="mt-4 inline-block rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:border-amber-400">
              Compare with {other.name} at true scale →
            </Link>
          </section>
        </div>
        <div className="space-y-6">
          <EvidenceStrip dish={dish} />
          <ChatBox dishId={dish.id} dishName={dish.name} />
        </div>
      </div>
    </div>
  );
}
