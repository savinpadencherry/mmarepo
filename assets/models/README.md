# Real catalogue chairs — image-to-3D pipeline

High-fidelity meshes for **Volga, Meuse, Kaathi, Rhine** from photos in `Images/`.

## What's here

```
Images/              ← source photos (Volga.png, Meuse.png, Kaathi.png, Rhine.png)
assets/models/
├── volga.glb        ← generated via TRELLIS / Hunyuan3D
├── meuse.glb
├── kaathi.glb
├── rhine.glb        ← ✓ generated (2.5 MB, TRELLIS)
└── inline-meshes.js ← base64 GLBs for file:// viewing (regen: tools/pack_inline.py)
```

## View in the configurator

1. Open `3d-studio.html` (double-click works — meshes are inlined).
2. Scroll the product list to **Real Asset** chairs: **Volga, Meuse, Kaathi, Rhine**.
3. **Rhine** has a real TRELLIS mesh right now. The others appear once generated.

Or serve over HTTP:

```bash
python3 -m http.server 8765
# open http://localhost:8765/3d-studio.html
```

## Generate meshes (Hugging Face)

```bash
pip install gradio_client
python3 tools/generate_meshes.py              # all four via TRELLIS (MIT licence)
python3 tools/generate_meshes.py rhine        # one chair
python3 tools/generate_meshes.py --list       # print Space API

# Higher texture fidelity (excludes EU / UK / South Korea):
python3 tools/generate_meshes.py --space tencent/Hunyuan3D-2

python3 tools/pack_inline.py                  # refresh inlined base64 for file://
```

**ZeroGPU quota:** anonymous HF Spaces give ~2–3 free generations per day. For more, log in:

```bash
pip install huggingface_hub
huggingface-cli login
HF_TOKEN=hf_xxx python3 tools/generate_meshes.py volga meuse kaathi
```

Quality settings (TRELLIS): 2048 texture, 20 sampling steps, mesh_simplify 0.85.

## About AI meshes vs. swatches

Single-photo AI output is one fused mesh with a **baked PBR texture**. It displays at full fidelity; upholstery/wood swatches won't recolour it until you split parts in Blender (`MMA_Upholstery`, `MMA_Wood`, `MMA_Frame`).

## Licences

| Space | Licence | Commercial |
|-------|---------|------------|
| TRELLIS | MIT | ✅ unrestricted (default) |
| Hunyuan3D-2 | Tencent Community | ⚠️ excludes EU / UK / S.Korea |
| TripoSR | MIT | ✅ unrestricted (lower quality) |
