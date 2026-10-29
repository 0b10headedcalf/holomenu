#!/usr/bin/env python3
"""
Generate stylized placeholder .glb models for the 6 demo dishes.
These are NOT the final reconstructions — Modal/TripoSR replaces them.
They exist so `npm run dev` shows real rotating 3D on day one, and the
poster/photo + TruthScore carry the realism while you wire the GPU path.

Usage:
  python3 -m venv /tmp/venv && /tmp/venv/bin/pip install trimesh numpy
  /tmp/venv/bin/python scripts/generate_models.py
Output: public/models/{ramen,burger,salad,pizza,sushi,pasta}.glb
"""
import os
import numpy as np
import trimesh

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "models")
os.makedirs(OUT, exist_ok=True)

def colored(mesh, rgb):
    mesh.visual.face_colors = np.tile(np.array([*rgb, 255], dtype=np.uint8), (len(mesh.faces), 1))
    return mesh

def plate(r=1.0, color=(245, 245, 240)):
    m = trimesh.creation.cylinder(radius=r, height=0.07, sections=48)
    return colored(m, color)

def sphere(pos, r, color, scale=(1, 0.7, 1)):
    m = trimesh.creation.icosphere(subdivisions=3, radius=r)
    m.apply_scale(scale)
    m.apply_translation(pos)
    return colored(m, color)

def box(pos, extents, color):
    m = trimesh.creation.box(extents=extents)
    m.apply_translation(pos)
    return colored(m, color)

def cyl(pos, r, h, color):
    m = trimesh.creation.cylinder(radius=r, height=h, sections=32)
    m.apply_translation(pos)
    return colored(m, color)

def save(name, parts):
    scene = trimesh.Scene(parts)
    scene.export(os.path.join(OUT, f"{name}.glb"))
    print("wrote", name)

rng = np.random.default_rng(7)

# Ramen: dark bowl + broth disc + noodle mound + egg halves + chashu
bowl = cyl((0, 0.25, 0), 1.0, 0.5, (35, 35, 40))
broth = cyl((0, 0.52, 0), 0.92, 0.06, (196, 120, 45))
noodles = sphere((0, 0.62, 0), 0.72, (237, 197, 110), scale=(1, 0.45, 1))
parts = [bowl, broth, noodles,
         sphere((0.45, 0.72, 0.2), 0.2, (255, 240, 200)), sphere((0.45, 0.74, 0.2), 0.11, (245, 166, 35)),
         sphere((-0.4, 0.68, -0.25), 0.3, (165, 90, 60)), sphere((0.1, 0.85, -0.4), 0.12, (70, 160, 80))]
save("ramen", parts)

# Burger: bun bottom/top, patty, cheese, lettuce, fries beside
parts = [cyl((0, 0.12, 0), 0.85, 0.24, (222, 164, 95)), cyl((0, 0.32, 0), 0.88, 0.18, (110, 62, 35)),
         box((0, 0.46, 0), (1.6, 0.06, 1.6), (250, 180, 40)), cyl((0, 0.56, 0), 0.9, 0.1, (90, 170, 80)),
         sphere((0, 0.78, 0), 0.88, (232, 175, 100), scale=(1, 0.55, 1))]
for i in range(7):
    x, z = rng.uniform(-1.5, 1.5), rng.uniform(1.0, 1.4)
    parts.append(box((x, 0.18, z), (0.14, 0.36, 0.14), (240, 195, 90)))
save("burger", parts)

# Salad bowl
parts = [cyl((0, 0.22, 0), 1.05, 0.44, (240, 240, 235)), cyl((0, 0.46, 0), 0.95, 0.08, (95, 165, 85))]
for i in range(10):
    a = rng.uniform(0, 6.28); r = rng.uniform(0.1, 0.75)
    parts.append(sphere((r*np.cos(a), 0.56+rng.uniform(0, 0.12), r*np.sin(a)), rng.uniform(0.14, 0.24),
                        [(210, 120, 50), (250, 225, 160), (120, 180, 90), (235, 90, 60)][i % 4]))
save("salad", parts)

# Pizza: crust disc + sauce + cheese blobs + basil
parts = [cyl((0, 0.09, 0), 1.25, 0.18, (214, 155, 85)), cyl((0, 0.2, 0), 1.12, 0.06, (185, 55, 40)),
         cyl((0, 0.24, 0), 1.05, 0.05, (245, 200, 95))]
for i in range(8):
    a = rng.uniform(0, 6.28); r = rng.uniform(0.1, 0.85)
    parts.append(sphere((r*np.cos(a), 0.28, r*np.sin(a)), 0.16, (60, 150, 70), scale=(1, 0.3, 1)))
save("pizza", parts)

# Sushi plate: long plate + 8 nigiri (rice + fish slab)
parts = [box((0, 0.08, 0), (2.6, 0.16, 1.0), (40, 45, 55))]
for i in range(8):
    x = -1.05 + i * 0.3
    parts.append(box((x, 0.26, 0), (0.24, 0.2, 0.42), (250, 248, 240)))
    parts.append(box((x, 0.4, 0), (0.26, 0.08, 0.46), [(240, 130, 110), (235, 90, 70), (200, 60, 50)][i % 3]))
save("sushi", parts)

# Pasta: plate + noodle nest + pecorino flecks
parts = [plate(), sphere((0, 0.28, 0), 0.78, (240, 205, 120), scale=(1, 0.5, 1))]
for i in range(12):
    a = rng.uniform(0, 6.28); r = rng.uniform(0, 0.55)
    parts.append(sphere((r*np.cos(a), 0.45+rng.uniform(0, 0.18), r*np.sin(a)), 0.07, (255, 250, 235)))
save("pasta", parts)
print("done ->", os.path.abspath(OUT))
