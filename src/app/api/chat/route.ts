import { NextResponse } from "next/server";
import { getDish } from "@/lib/dishes";
import { computeTruthScore } from "@/lib/scoring";
import { metaChat, localDishAnswer } from "@/lib/meta";

export async function POST(req: Request) {
  const { dishId, question } = await req.json().catch(() => ({}));
  const dish = getDish(String(dishId ?? ""));
  if (!dish || !question) return NextResponse.json({ error: "dishId and question required" }, { status: 400 });

  const score = computeTruthScore(dish);
  const live = await metaChat([
    {
      role: "system",
      content: `You are HoloMenu. Answer only from this evidence. Dish: ${dish.name}. Size ${dish.diameterCm}x${dish.heightCm}cm, ${dish.weightG}g, serves ${dish.serves}, ${dish.calories} kcal. Ingredients: ${dish.ingredients.join(", ")}. Allergens: ${dish.allergens.join(", ")}. TruthScore ${score.overall}/100. Uncertainty: ${dish.uncertainty} Be concise, honest about uncertainty, never invent ingredients.`,
    },
    { role: "user", content: String(question) },
  ]);
  if (live) return NextResponse.json({ answer: live, source: process.env.META_MODEL || "muse-spark" });

  return NextResponse.json({ answer: localDishAnswer(dish.name, dish, String(question)), source: "local fallback (add META_API_KEY for Muse Spark)" });
}
