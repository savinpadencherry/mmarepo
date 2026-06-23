#!/usr/bin/env python3
"""
Build catalogue chair meshes for Volga, Meuse, Kaathi, Rhine.

Structured placeholders with named part groups the configurator binds to swatches:
  MMA_Upholstery  -> fabric swatches
  MMA_Wood        -> wood-finish swatches
  MMA_Frame       -> metal-structure swatches

Run:  python3 tools/build_standin_meshes.py
      python3 tools/pack_inline.py
"""
import os
import numpy as np
import trimesh

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "models")
os.makedirs(OUT, exist_ok=True)

UPH = [206, 198, 180]
WD = [150, 105, 60]
MT = [120, 122, 125]


def box(w, h, d, pos):
    m = trimesh.creation.box(extents=[w, h, d])
    m.apply_translation(pos)
    return m


def cyl(r_top, r_bot, h, pos, sections=24):
    m = trimesh.creation.cylinder(radius=r_top, height=h, sections=sections)
    # scale bottom if tapered
    if abs(r_top - r_bot) > 1e-4:
        verts = m.vertices.copy()
        for i, v in enumerate(verts):
            t = (v[1] + h / 2) / h  # 0 at bottom, 1 at top
            r = r_bot + (r_top - r_bot) * t
            scale = r / max(r_top, 1e-4)
            verts[i, 0] *= scale
            verts[i, 2] *= scale
        m.vertices = verts
    m.apply_translation(pos)
    return m


def leg(a, b, r=0.020):
    return trimesh.creation.cylinder(radius=r, segment=[a, b], sections=16)


def colour(mesh, rgb):
    mesh.visual = trimesh.visual.ColorVisuals(
        mesh, vertex_colors=np.tile(np.array(rgb + [255], np.uint8), (len(mesh.vertices), 1))
    )
    return mesh


def named(parts, rgb):
    g = trimesh.util.concatenate(parts) if len(parts) > 1 else parts[0]
    return colour(g, rgb)


def save(scene_parts, name):
    s = trimesh.Scene()
    for gname, mesh in scene_parts.items():
        s.add_geometry(mesh, geom_name=gname, node_name=gname)
    path = os.path.join(OUT, name + ".glb")
    s.export(path)
    print("wrote", os.path.relpath(path), "->", list(scene_parts.keys()))


def tub_shell(seat_w=0.46, seat_d=0.44, back_h=0.36, arm_h=0.14):
    """Rounded tub chair shell: seat + back + side arms."""
    seat = box(seat_w, 0.11, seat_d, [0, 0.46, 0])
    back = box(seat_w * 0.96, back_h, 0.09, [0, 0.46 + back_h / 2 + 0.04, -seat_d / 2 + 0.04])
    arm_l = box(0.08, arm_h, seat_d * 0.78, [seat_w / 2 - 0.02, 0.52, -0.02])
    arm_r = box(0.08, arm_h, seat_d * 0.78, [-seat_w / 2 + 0.02, 0.52, -0.02])
    return named([seat, back, arm_l, arm_r], UPH)


def splay_legs(spread=0.22, top=0.44):
    c = 0.05
    return named([
        leg([spread, 0, spread], [c, top, c], r=0.022),
        leg([-spread, 0, spread], [-c, top, c], r=0.022),
        leg([spread, 0, -spread], [c, top, -c], r=0.022),
        leg([-spread, 0, -spread], [-c, top, -c], r=0.022),
    ], WD)


def pedestal_base(top_r=0.18, bot_r=0.26, h=0.42):
    return named([cyl(top_r, bot_r, h, [0, h / 2, 0], sections=32)], WD)


# ---- VOLGA: tub shell on tapered pedestal (lounge) ----
def volga():
    shell = tub_shell(seat_w=0.48, seat_d=0.46, back_h=0.38, arm_h=0.15)
    base = pedestal_base(top_r=0.16, bot_r=0.24, h=0.40)
    save({"MMA_Upholstery": shell, "MMA_Wood": base}, "volga")


# ---- MEUSE: tub shell on 4 splayed wood legs (executive) ----
def meuse():
    shell = tub_shell(seat_w=0.50, seat_d=0.46, back_h=0.40, arm_h=0.16)
    legs = splay_legs(spread=0.24, top=0.44)
    save({"MMA_Upholstery": shell, "MMA_Wood": legs}, "meuse")


# ---- KAATHI: dining tub shell, slightly narrower, wood legs ----
def kaathi():
    shell = tub_shell(seat_w=0.44, seat_d=0.42, back_h=0.42, arm_h=0.12)
    legs = splay_legs(spread=0.20, top=0.44)
    save({"MMA_Upholstery": shell, "MMA_Wood": legs}, "kaathi")


# ---- RHINE: tub shell on upholstered pedestal (side chair) ----
def rhine():
    shell = tub_shell(seat_w=0.44, seat_d=0.42, back_h=0.34, arm_h=0.13)
    base = pedestal_base(top_r=0.15, bot_r=0.22, h=0.38)
    save({"MMA_Upholstery": shell, "MMA_Wood": base}, "rhine")


if __name__ == "__main__":
    volga()
    meuse()
    kaathi()
    rhine()
    print("done.")
