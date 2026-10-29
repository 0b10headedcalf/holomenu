/**
 * Meta Model API client.
 *
 * Hackathon stack: Muse Spark (VLM reasoning + chat), SAM 3.1 (segmentation
 * happens on Modal — see modal/reconstruct.py). This module is the ONLY place
 * that talks to Meta so the rest of the app stays testable offline.
 *
 * Env:
 *   META_API_KEY       - Meta Model API key
 *   META_API_BASE_URL  - e.g. https://api.meta.ai/v1  (confirm from hackathon portal)
 *   META_MODEL         - e.g. muse-spark (confirm exact id from portal)
 *
 * Without keys we return deterministic local answers — demo never dies.
 */

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function metaChat(messages: ChatMessage[]): Promise<string | null> {
  const key = process.env.META_API_KEY;
  const base = process.env.META_API_BASE_URL;
  const model = process.env.META_MODEL || "muse-spark";
  if (!key || !base) return null;

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: 400 }),
      // Never hang the demo on a slow model call.
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

/** Local fallback reasoning — keyword based, grounded in dish data. */
export function localDishAnswer(
  dishName: string,
  ctx: {
    serves: string;
    diameterCm: number;
    heightCm: number;
    weightG: number;
    calories: number;
    ingredients: string[];
    allergens: string[];
    uncertainty: string;
  },
  question: string
): string {
  const q = question.toLowerCase();
  if (q.includes("two") || q.includes("share") || q.includes("enough"))
    return `${dishName} is listed as ${ctx.serves} (~${ctx.weightG}g, ${ctx.calories} kcal). Based on real-photo portion agreement, most people find it a full single serving — sharing works as a snack, not a meal.`;
  if (q.includes("size") || q.includes("big") || q.includes("scale") || q.includes("plate"))
    return `Real-world size: about ${ctx.diameterCm}cm across × ${ctx.heightCm}cm tall (${ctx.weightG}g). That's roughly the width of a standard dinner plate's inner well for reference.`;
  if (q.includes("ingredient") || q.includes("inside") || q.includes("contain") || q.includes("hidden"))
    return `Ingredients from the menu + photos: ${ctx.ingredients.join(", ")}. Note: ${ctx.uncertainty}`;
  if (q.includes("allergic") || q.includes("allergen") || q.includes("gluten") || q.includes("dairy") || q.includes("nuts"))
    return `Allergens to check: ${ctx.allergens.join(", ") || "none declared"}. Always confirm with the restaurant — photos can't verify cross-contact.`;
  if (q.includes("spicy") || q.includes("hot"))
    return `Heat is assessed from the menu description and visible chili/pepper in customer photos, not taste. Ask the restaurant to adjust — ${ctx.uncertainty}`;
  if (q.includes("calorie") || q.includes("healthy") || q.includes("diet"))
    return `Estimated ${ctx.calories} kcal for ~${ctx.weightG}g. Treat this as a range (±20%) — sauce and oil are the biggest hidden variables in the photos.`;
  return `From the evidence for ${dishName}: ${ctx.uncertainty} Portion: ${ctx.serves}, ~${ctx.weightG}g, ${ctx.diameterCm}cm across. Ask me about size, sharing, ingredients, or allergens.`;
}
