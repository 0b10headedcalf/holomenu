import { NextResponse } from "next/server";
import { DISHES } from "@/lib/dishes";
import { metaChat } from "@/lib/meta";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (body.demo === true) return NextResponse.json({ dishes: DISHES.map(d => ({ id: d.id, name: d.name, price: d.price, confidence: 1 })), source: "Sample menu · curated demo catalogue" });
  const image = body.image;
  if (typeof image !== "string" || !/^data:image\/(jpeg|png|webp);base64,/.test(image) || image.length > 8_000_000) return NextResponse.json({ error: "Choose a JPEG, PNG, or WebP image under 6 MB." }, { status: 400 });
  const text = await metaChat([
    { role: "system", content: 'Read the menu image. Return only a JSON array of dish names as strings. Do not invent unreadable items.' },
    { role: "user", content: [{ type: "text", text: "Which dishes are on this menu?" }, { type: "image_url", image_url: { url: image } }] },
  ]);
  if (!text) return NextResponse.json({ error: "Live menu reading is unavailable. Try the sample menu to explore the demo." }, { status: 503 });
  try {
    const names: unknown = JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, "").trim());
    if (!Array.isArray(names) || !names.every(n => typeof n === "string")) throw new Error();
    const dishes = DISHES.filter(d => names.some(n => {
      const words = String(n).toLowerCase().match(/[a-z]{4,}/g) ?? [];
      return words.some(w => `${d.id} ${d.name}`.toLowerCase().includes(w));
    })).map(d => ({ id: d.id, name: d.name, price: d.price, confidence: 0.85 }));
    return NextResponse.json({ dishes, detectedNames: names, source: `${process.env.META_MODEL || "muse-spark"} · catalogue matches` });
  } catch {
    return NextResponse.json({ error: "Could not read a structured menu. Try a clearer photo." }, { status: 502 });
  }
}
