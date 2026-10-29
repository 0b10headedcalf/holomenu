import { NextResponse } from "next/server";
import { getDish } from "@/lib/dishes";
import { computeTruthScore } from "@/lib/scoring";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dish = getDish(id);
  if (!dish) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ...dish, truthScore: computeTruthScore(dish) });
}
