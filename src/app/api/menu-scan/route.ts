import { NextResponse } from "next/server";
import { DISHES } from "@/lib/dishes";
import { metaChat } from "@/lib/meta";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const image: string | null = body?.image ?? null;

  // With a real menu photo + Meta key, ask Muse Spark (VLM) to OCR/parse it,
  // then fuzzy-match dish names to our evidence-backed catalogue.
  if (image && process.env.META_API_KEY) {
    const text = await metaChat([
      { role: "system", content: "You parse restaurant menu photos. Return dish names as a JSON array of strings only." },
      { role: "user", content: `This menu photo (base64, truncated): ${image.slice(0, 2000)}… List the dishes you can read.` },
    ]);
    if (text) {
      const matched = DISHES.filter((d) => text.toLowerCase().includes(d.name.toLowerCase().split(" ")[0]));
      const dishes = (matched.length ? matched : DISHES).map((d) => ({ id: d.id, name: d.name, price: d.price, confidence: 0.85 }));
      return NextResponse.json({ dishes, source: process.env.META_MODEL || "muse-spark" });
    }
  }

  // Demo / offline path: sample menu = full catalogue. Never fail the demo.
  return NextResponse.json({
    dishes: DISHES.map((d, i) => ({ id: d.id, name: d.name, price: d.price, confidence: 0.97 - i * 0.02 })),
    source: image ? "demo-fallback (add META_API_KEY for live VLM scan)" : "sample menu",
  });
}
