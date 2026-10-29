# HoloMenu — 60-second demo script (Indie track)

Film vertical, real restaurant table if possible. Judges score: creativity, technical ambition, whether it works.

| Time | Shot | Say / do |
|---|---|---|
| 0–8s | Paper menu on table, phone scans it | "Menus lie. Promo photos lie more. This is what you'll actually get." Tap **Try sample menu** (or upload the menu photo). |
| 8–20s | Dish list → tap Tonkotsu Ramen → 3D spins in | "Built from 4 real customer photos — not the restaurant's marketing shot." Drag to rotate. Tap AR to place it on the table. |
| 20–35s | Scroll: Evidence strip → TruthScore 82 | "TruthScore: portion agreement 86%, presentation 78%. We show uncertainty instead of a fake-perfect render. Sushi only has 2 photos — and we say so." (cut to sushi page) |
| 35–48s | Chat: tap "Is this enough for two?" | Muse Spark answers from measured size/weight + uncertainty. This is the Meta-native moment — say the model name out loud. |
| 48–56s | Compare ramen vs pizza side-by-side | "True scale. The wider dish isn't the bigger meal." |
| 56–60s | Glasses view on phone, tap Voice → "next" | "Same URL on Ray-Ban Display. Hands-free at the table." End on tagline. |

## Backup plan (do this before judging)
- Pre-load every dish page once on venue Wi-Fi so `.glb` + photos are cached.
- If live Meta/Modal keys fail, the app falls back to local answers + cached models **by design** — don't apologize for it on camera, it's the TruthScore story.
- Screen-record the full flow as a fallback video and link it in the submission.

## Submission checklist
- [ ] `npm run build` passes, deployed URL loads on a phone
- [ ] `META_API_KEY` / `MODAL_ENDPOINT_URL` set in deploy env (or demo-fallback confirmed working)
- [ ] 60s video + screen-record backup
- [ ] README architecture diagram + "what's real vs cached" section filled in
- [ ] Team: who presents, who answers tech questions (Modal + SAM), who answers product (TruthScore)
