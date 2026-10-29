import { NextResponse } from "next/server";
import { getDish } from "@/lib/dishes";

/**
 * POST { dishId, imageUrl? }
 * If MODAL_ENDPOINT_URL is set, proxy to the Modal GPU job
 * (SAM 3.1 segment -> TripoSR -> .glb). Otherwise return the cached
 * pre-reconstructed model — this is the "0-second illusion":
 * cache hit feels instant, live jobs stream in behind it.
 */
export async function POST(req: Request) {
  const { dishId, imageUrl } = await req.json().catch(() => ({}));
  const dish = getDish(String(dishId ?? ""));
  if (!dish) return NextResponse.json({ error: "unknown dishId" }, { status: 404 });

  const modalUrl = process.env.MODAL_ENDPOINT_URL;
  if (modalUrl && imageUrl) {
    try {
      const res = await fetch(modalUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dish_id: dish.id, image_url: imageUrl }),
        signal: AbortSignal.timeout(60000),
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({ status: "complete", modelUrl: data.model_url ?? dish.model, source: "modal-live", dishId: dish.id });
      }
    } catch { /* fall through to cache */ }
  }

  return NextResponse.json({
    status: "complete",
    modelUrl: dish.model,
    source: modalUrl ? "cache (modal fallback)" : "cache (set MODAL_ENDPOINT_URL for live reconstruction)",
    dishId: dish.id,
    note: "Pre-reconstructed from customer photos. Live single-photo jobs run on Modal when an imageUrl is provided.",
  });
}
