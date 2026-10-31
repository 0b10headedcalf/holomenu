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
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600">← All dishes</Link>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{dish.name}</h1>
          <span className="text-xl text-slate-600">${dish.price} · {dish.restaurant}</span>
        </div>
        <p className="mt-2 max-w-3xl leading-7 text-slate-500">{dish.description}</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200">
        <ModelStage src={dish.model} poster={dish.poster} alt={`3D reconstruction of ${dish.name}`} />
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { icon: Ruler, label: "Real size", value: `${dish.diameterCm} × ${dish.heightCm} cm` },
          { icon: Scale, label: "Weight", value: `~${dish.weightG}g` },
          { icon: Users, label: "Serves", value: dish.serves },
          { icon: Flame, label: "Calories", value: `~${dish.calories} kcal` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <s.icon className="h-5 w-5 text-blue-600" />
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{s.label}</p>
            <p className="mt-0.5 font-semibold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <TruthScore dish={dish} />
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold">Ingredients & allergens</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{dish.ingredients.join(" · ")}</p>
            <p className="mt-2 text-sm text-slate-500">Allergens: <span className="text-blue-600">{dish.allergens.join(", ")}</span></p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500"><Clock className="h-3.5 w-3.5" /> Stylized demo preview · portion measurements are estimates.</p>
            <Link href={`/compare?a=${dish.id}&b=${other.id}`} className="mt-4 inline-block rounded-xl border border-slate-200 px-4 py-2 text-sm hover:border-blue-500">
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
