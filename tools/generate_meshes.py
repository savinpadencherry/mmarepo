#!/usr/bin/env python3
"""
Generate high-fidelity 3D meshes from catalogue photos via Hugging Face Spaces.

Default backend: TRELLIS (MIT, commercial-friendly) with high-quality settings.
Optional: tencent/Hunyuan3D-2 for richer textures (licence excludes EU/UK/S.Korea).

    pip install gradio_client
    python3 tools/generate_meshes.py              # all four chairs in Images/
    python3 tools/generate_meshes.py rhine        # one chair
    python3 tools/generate_meshes.py --list       # print Space API
    python3 tools/generate_meshes.py --space tencent/Hunyuan3D-2

After generation, re-pack for file:// viewing:
    python3 tools/pack_inline.py
"""
import argparse
import os
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.join(HERE, "..")
IMAGES = os.path.join(REPO, "Images")
OUT = os.path.join(REPO, "assets", "models")

# Slug = lowercase filename stem; source lives in Images/<Name>.png
CHAIRS = ["volga", "meuse", "kaathi", "rhine"]

SPACES = {
    "trellis-community/TRELLIS": "trellis",
    "tencent/Hunyuan3D-2": "hunyuan",
    "stabilityai/TripoSR": "triposr",
}


def get_client(space, token):
    try:
        from gradio_client import Client
    except ImportError:
        sys.exit("Missing dependency: pip install gradio_client")
    print(f"Connecting to Space: {space} ...")
    for kw in ("hf_token", "token"):
        try:
            return Client(space, **{kw: token}) if token else Client(space)
        except TypeError:
            continue
    return Client(space)


def list_api(client):
    print(client.view_api(return_format="str"))


def source_path(name):
    for stem in (name, name.capitalize(), name.title()):
        p = os.path.join(IMAGES, f"{stem}.png")
        if os.path.exists(p):
            return p
    return os.path.join(IMAGES, f"{name}.png")


def gen_trellis(client, name):
    from gradio_client import handle_file

    img = source_path(name)
    if not os.path.exists(img):
        print(f"  ! source not found: {img}")
        return False

    print(f"  • {name}: uploading {os.path.basename(img)} ...")
    try:
        client.predict(api_name="/start_session")
    except Exception:
        pass

    print(f"  • {name}: preprocessing (background removal) ...")
    prepped = client.predict(handle_file(img), api_name="/preprocess_image")

    print(f"  • {name}: generating high-fidelity mesh (2–5 min on ZeroGPU queue) ...")
    result = client.predict(
        prepped if prepped else handle_file(img),
        [],                # multiimages
        0,                 # seed
        7.5,               # ss_guidance_strength
        20,                # ss_sampling_steps (more = better structure)
        3.5,               # slat_guidance_strength
        20,                # slat_sampling_steps
        "stochastic",      # multiimage_algo
        0.85,              # mesh_simplify (lower = more geometry)
        2048,              # texture_size
        api_name="/generate_and_extract_glb",
    )
    glb_path = result[2] if isinstance(result, (list, tuple)) else result
    if isinstance(glb_path, dict):
        glb_path = glb_path.get("path") or glb_path.get("name")
    dst = os.path.join(OUT, f"{name}.glb")
    shutil.copy(glb_path, dst)
    print(f"  ✓ wrote {os.path.relpath(dst)} ({os.path.getsize(dst) // 1024} KB)")
    return True


def gen_hunyuan(client, name):
    from gradio_client import handle_file

    img = source_path(name)
    if not os.path.exists(img):
        print(f"  ! source not found: {img}")
        return False

    print(f"  • {name}: uploading {os.path.basename(img)} ...")
    print(f"  • {name}: Hunyuan3D shape + texture (slow, high quality) ...")
    result = client.predict(
        None,              # caption
        handle_file(img),  # image
        None, None, None, None,  # multiview
        50,                # steps
        5.0,               # guidance_scale
        1234,              # seed
        384,               # octree_resolution (High)
        True,              # rembg
        8000,              # num_chunks
        False,             # randomize_seed
        api_name="/generation_all",
    )
    shape_file = result[0]
    tex_file = result[1]
    export = client.predict(
        shape_file,
        tex_file,
        "glb",
        False,             # reduce_face
        True,              # export_texture
        100000,            # target_face_num
        api_name="/on_export_click",
    )
    glb_path = export[1] if isinstance(export, (list, tuple)) else export
    if isinstance(glb_path, dict):
        glb_path = glb_path.get("path") or glb_path.get("name")
    dst = os.path.join(OUT, f"{name}.glb")
    shutil.copy(glb_path, dst)
    print(f"  ✓ wrote {os.path.relpath(dst)} ({os.path.getsize(dst) // 1024} KB)")
    return True


def gen_triposr(client, name):
    from gradio_client import handle_file

    img = source_path(name)
    if not os.path.exists(img):
        print(f"  ! source not found: {img}")
        return False

    print(f"  • {name}: TripoSR preprocess ...")
    processed = client.predict(
        handle_file(img),
        True,   # remove_background
        0.85,   # foreground_ratio
        api_name="/preprocess",
    )
    print(f"  • {name}: TripoSR generate (320 resolution) ...")
    result = client.predict(processed, 320, api_name="/generate")
    glb_path = result[1] if isinstance(result, (list, tuple)) else result
    if isinstance(glb_path, dict):
        glb_path = glb_path.get("path") or glb_path.get("name")
    dst = os.path.join(OUT, f"{name}.glb")
    shutil.copy(glb_path, dst)
    print(f"  ✓ wrote {os.path.relpath(dst)} ({os.path.getsize(dst) // 1024} KB)")
    return True


def gen_one(client, backend, name):
    if backend == "hunyuan":
        return gen_hunyuan(client, name)
    if backend == "triposr":
        return gen_triposr(client, name)
    return gen_trellis(client, name)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("chairs", nargs="*", default=CHAIRS, help="chair slugs (default: all)")
    ap.add_argument("--space", default="trellis-community/TRELLIS")
    ap.add_argument("--token", default=os.environ.get("HF_TOKEN"))
    ap.add_argument("--list", action="store_true", help="print Space API and exit")
    args = ap.parse_args()

    backend = SPACES.get(args.space, "trellis")
    client = get_client(args.space, args.token)
    if args.list:
        list_api(client)
        return

    os.makedirs(OUT, exist_ok=True)
    targets = args.chairs or CHAIRS
    print(f"Generating {len(targets)} mesh(es) via {args.space} [{backend}]\n")
    ok = sum(gen_one(client, backend, c) for c in targets)
    print(f"\nDone: {ok}/{len(targets)} succeeded.")
    if ok:
        print("Run:  python3 tools/pack_inline.py   then reload 3d-studio.html")


if __name__ == "__main__":
    main()
