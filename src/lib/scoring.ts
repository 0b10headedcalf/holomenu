import type { Dish } from "./dishes";

export type TruthScore = {
  overall: number;
  label: "High confidence" | "Good confidence" | "Low confidence — limited evidence";
  photoCount: number;
  freshestDaysAgo: number;
  explanation: string;
};

/**
 * TruthScore is HoloMenu's differentiator: we do NOT claim the 3D model is
 * perfect. We score how much independent visual evidence agrees about this
 * dish, so the user knows when to trust size vs. when to trust only shape.
 */
export function computeTruthScore(dish: Dish): TruthScore {
  const photoCount = dish.evidence.length;
  const evidenceBonus = Math.min(photoCount * 3, 15); // more photos, capped
  const freshestDaysAgo = Math.min(...dish.evidence.map((e) => e.daysAgo));
  const freshnessPenalty = freshestDaysAgo > 10 ? 8 : freshestDaysAgo > 5 ? 3 : 0;

  const overall = Math.round(
    dish.portionAgreement * 0.45 +
      dish.presentationAgreement * 0.3 +
      dish.colorAgreement * 0.25 +
      evidenceBonus -
      freshnessPenalty
  );
  const clamped = Math.max(5, Math.min(98, overall));

  const label: TruthScore["label"] =
    clamped >= 85
      ? "High confidence"
      : clamped >= 65
        ? "Good confidence"
        : "Low confidence — limited evidence";

  return {
    overall: clamped,
    label,
    photoCount,
    freshestDaysAgo,
    explanation:
      `Built from ${photoCount} real customer photos (freshest ${freshestDaysAgo}d ago). ` +
      `Portion agreement ${dish.portionAgreement}%, presentation ${dish.presentationAgreement}%. ` +
      dish.uncertainty,
  };
}
