import { ShieldCheck, AlertTriangle } from "lucide-react";
import type { Dish } from "@/lib/dishes";
import { computeTruthScore } from "@/lib/scoring";

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-500"><span>{label}</span><span className="text-slate-700">{value}%</span></div>
      <div className="mt-1 h-1.5 rounded-full bg-slate-100">
        <div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function TruthScore({ dish }: { dish: Dish }) {
  const s = computeTruthScore(dish);
  const high = s.overall >= 65;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            {high ? <ShieldCheck className="h-4 w-4 text-emerald-400" /> : <AlertTriangle className="h-4 w-4 text-blue-600" />}
            TruthScore
          </p>
          <p className="mt-1 text-xs text-slate-500">{s.label} · {s.photoCount} real photos · freshest {s.freshestDaysAgo}d ago</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-slate-900">{s.overall}</span>
          <span className="text-sm text-slate-500">/100</span>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <Bar label="Portion agreement" value={dish.portionAgreement} />
        <Bar label="Presentation agreement" value={dish.presentationAgreement} />
        <Bar label="Color / doneness agreement" value={dish.colorAgreement} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{s.explanation}</p>
      <p className="mt-2 text-xs text-slate-500">We show uncertainty instead of a fake-perfect render. Low evidence = smaller claim.</p>
    </section>
  );
}
