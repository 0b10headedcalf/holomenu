"""
HoloMenu GPU reconstruction on Modal.

Pipeline (single-photo path — the hackathon-feasible one):
  customer photo -> SAM 3.1 segmentation (dish mask, plate removed)
                 -> TripoSR / InstantMesh single-image-to-3D
                 -> .glb uploaded to object storage -> URL returned

Deploy:
  pip install modal
  modal token new
  modal deploy modal/reconstruct.py
  # copy the web endpoint URL into MODAL_ENDPOINT_URL in .env.local

Test (no deploy):
  modal run modal/reconstruct.py --image-url https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900

Honesty note: single-photo 3D is approximate on the occluded side.
That is exactly why the frontend pairs every model with a TruthScore.
"""
import modal

app = modal.App("holomenu-reconstruct")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("torch", "torchvision", "transformers", "pillow", "requests", "trimesh", "numpy")
)

volume = modal.Volume.from_name("holomenu-models", create_if_missing=True)


@app.function(image=image, gpu="A10G", timeout=600, volumes={"/models": volume})
def reconstruct(dish_id: str, image_url: str) -> dict:
    import io
    import requests
    from PIL import Image

    # 1) Fetch evidence photo
    img = Image.open(io.BytesIO(requests.get(image_url, timeout=30).content)).convert("RGB")

    # 2) SAM 3.1 segmentation goes here.
    #    Use the Meta Model API / SAM 3.1 weights provided for the hackathon.
    #    mask = sam31_segment(img, prompt="the plated dish, not the table")
    #    For now we keep the full frame — TripoSR is foreground-biased, and
    #    the frontend poster shows the unmasked photo for comparison.

    # 3) Single-image-to-3D goes here (TripoSR / InstantMesh).
    #    mesh = triposr(img, mask)  ->  export .glb
    #    Hackathon shortcut that always works: if the model weights fail to
    #    load, fall back to the cached demo model so the API never 500s.
    out_path = f"/models/{dish_id}.glb"
    try:
        raise RuntimeError("Wire TripoSR/InstantMesh weights here — see TODO above")
    except Exception as e:  # noqa: BLE001 - demo must not die
        return {
            "dish_id": dish_id,
            "model_url": f"/models/{dish_id}.glb",
            "status": "fallback-cached",
            "detail": f"live reconstruction not yet wired: {e}",
            "out_path": out_path,
            "image_size": img.size,
        }


@app.function(image=image)
@modal.fastapi_endpoint(method="POST")
def web(payload: dict):
    dish_id = str(payload.get("dish_id", "ramen"))
    image_url = str(payload.get("image_url", ""))
    if not image_url:
        return {"error": "image_url required"}
    return reconstruct.remote(dish_id, image_url)
