"use client";
import { useState } from "react";
import { DISHES } from "@/lib/dishes";
import { computeTruthScore } from "@/lib/scoring";
import DishCard from "./DishCard";

export default function Catalogue() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("evidence");
  const dishes = DISHES.filter(d => `${d.name} ${d.restaurant} ${d.ingredients.join(" ")}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "price" ? a.price - b.price : computeTruthScore(b).overall - computeTruthScore(a).overall);
  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-widest text-blue-600">Explore before you order</p><h2 className="mt-2 text-2xl font-semibold">Find your next plate</h2></div><span className="text-sm text-slate-500">{dishes.length} demo dishes</span></div>
    <div className="my-5 flex flex-wrap gap-3"><input aria-label="Search dishes, ingredients, or restaurants" placeholder="Search dishes, ingredients, restaurants…" value={query} onChange={e => setQuery(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3" /><select aria-label="Sort dishes" value={sort} onChange={e => setSort(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3"><option value="evidence">Strongest evidence</option><option value="price">Price: low to high</option></select></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{dishes.map(d => <DishCard key={d.id} dish={d} />)}</div>
    {!dishes.length && <p className="py-10 text-center text-slate-500">No dishes match. Try another ingredient or restaurant.</p>}
    <p className="mt-4 text-xs leading-5 text-slate-500">Demo collection: sample photography, curated measurements and agreement scores. 3D previews are stylized models; dimensions and allergens require restaurant confirmation.</p>
  </section>;
}
