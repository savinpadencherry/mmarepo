# MMA Design Website — Detailed Scope Document

**Prepared by:** FocusChain Labs  
**Meeting date:** 6 June 2026  
**Document version:** 1.0  
**Tentative kick-off:** 1 July 2026 (subject to commercial agreement)

---

## 1. Executive Summary

MMA Design is commissioning a premium digital platform for luxury workspace furniture — combining brand-led storytelling, intelligent product discovery, live product customisation, immersive 3D room configuration, and Pinterest-driven social commerce.

This document translates the 6 June 2026 requirements workshop into a structured scope, maps each requirement against the current prototype in this repository, and provides technical recommendations, effort sizing, dependencies, and open decisions required before development begins.

**Current prototype status:** A static GitHub Pages demo (`index.html`, `3d-studio.html`) exists with premium UI foundations, hero video, procedural Three.js product configurator (4 demo models), and AR/VR stubs. It validates design direction but is not production-ready for catalogue scale, search, media delivery, or social integration.

---

## 2. Agreements from 6 June Meeting

| Item | Status |
|------|--------|
| Scope, timeline, and commercial terms finalised before development | Pending |
| FocusChain Labs to prepare detailed scope document with effort estimates | **This document** |
| MMA Design to share complete product catalogue, brand assets, photography, and video library | Pending |
| Brand and colour direction (including logo colour options) aligned before design | Pending |
| Tentative project kick-off: 1 July 2026 | Subject to commercial agreement |

**Yet to discuss:**
- Mobile app vs. responsive web for 3D configurator
- Hosting provider preference (AWS / Azure / GCP)

---

## 3. Reference Benchmarks

| Brand | Relevant capability |
|-------|---------------------|
| [Andreu World](https://www.andreworld.com) | Premium UI, product configurator |
| [Boss Design](https://www.bossdesign.com) | Corporate workspace positioning |
| [Teknion](https://www.teknion.com) | B2B catalogue and project galleries |
| [Bo Concept](https://www.boconcept.com) | Lifestyle merchandising, room inspiration |
| [Rossetto (Andreu World)](https://www.rossetto.it) | Live product customisation reference |
| [+Halle Boulevard](https://www.plushalle.com) | Configurator UX reference |

---

## 4. Requirement Breakdown

### 4.1 Premium Website — Design, Feel & Video Rendering

**Business goal:** Establish MMA Design as a premium workspace brand through cinematic presentation and flawless media playback.

#### Functional scope

| Feature | Description |
|---------|-------------|
| Premium UI/UX | Luxury typography, motion design, glassmorphism, scroll storytelling — benchmarked against reference brands |
| Brand system | Finalised colour palette, logo variants (light/dark/mono), typography, spacing tokens |
| Hero & section video | Full-bleed background video, product reels, project case-study films |
| Media delivery architecture | CDN-backed delivery with adaptive bitrate streaming (HLS/DASH) |
| Performance targets | LCP < 2.5s, no visible buffering on 10 Mbps connections, graceful fallback on low bandwidth |

#### Current prototype coverage

| Capability | Status |
|------------|--------|
| Premium dark/gold design system | ✅ Implemented (`--gold`, `--charcoal`, Cormorant Garamond + Outfit) |
| Hero video background | ✅ Local `mma-hero-loop.mp4` embedded |
| Custom cursor, scroll progress, glass nav | ✅ Implemented |
| CDN for JS libraries (Three.js, GSAP) | ✅ Partial (library CDN only) |
| Adaptive video streaming | ❌ Not implemented — single MP4 file |
| Brand colour finalisation | ⚠️ Prototype uses interim palette; MMA sign-off required |
| Logo colour variants | ❌ Single logo URL only |

#### Recommended technical approach

- **Frontend:** Next.js or Astro + Tailwind/CSS custom properties for design tokens
- **CMS:** Sanity or Contentful for page content, project galleries, and metadata
- **Video pipeline:** Upload → transcode (AWS MediaConvert / Cloudflare Stream / Mux) → HLS manifest → CDN edge delivery
- **Image pipeline:** Responsive srcset via CDN image optimisation (Cloudinary, imgix, or CloudFront + Lambda)

#### Effort estimate

| Workstream | Size | Notes |
|------------|------|-------|
| Design system & page templates | L | 8–12 page types (home, product, project, about, contact, etc.) |
| Motion & micro-interactions | M | Scroll reveals, page transitions, hover states |
| Video infrastructure setup | M | Transcoding pipeline, CDN config, player integration |
| Content migration & QA | M | Depends on asset volume from MMA |

**Dependencies:** Final brand colours, logo files (SVG/PNG variants), video library with source masters.

---

### 4.2 Intelligent Search & Product Discoverability

**Business goal:** Users find products by intent and form factor, not just exact keyword matches — e.g. "circular coffee table" surfaces all circular tables across categories.

#### Functional scope

| Feature | Description |
|---------|-------------|
| Intent-based search | Natural-language and semantic understanding of queries |
| Cross-category discovery | Shape/form attributes link products across furniture types |
| Faceted filtering | Material, finish, size, base type, room type, collection |
| Related product suggestions | "Similar form factor" and "Complementary pieces" modules |
| Search analytics | Query logs, zero-result tracking, conversion attribution |

#### Current prototype coverage

| Capability | Status |
|------------|--------|
| Product search | ❌ Not implemented |
| Product catalogue pages | ⚠️ Static demo cards only (4 product types) |
| Faceted filters | ❌ Not implemented |
| Cross-category logic | ❌ Not implemented |

#### Recommended technical approach

- **Search engine:** Algolia (fastest time-to-market) or Elasticsearch/OpenSearch (more control)
- **Data model:** Structured product attributes — `shape`, `form_factor`, `category`, `subcategory`, `materials[]`, `finishes[]`, `dimensions`, `base_types[]`
- **Semantic layer:** Embedding-based retrieval (OpenAI embeddings + vector store, or Algolia NeuralSearch) for intent matching
- **Example query flow:**

```
User: "circular coffee table"
  → Parse intent: shape=circular, category=coffee_table
  → Primary results: all circular coffee table SKUs
  → Secondary results: circular dining tables, circular side tables (cross-category)
  → Facets: material, finish, size range
```

#### Effort estimate

| Workstream | Size | Notes |
|------------|------|-------|
| Product data model & ingestion | L | Full catalogue with attributes — largest dependency |
| Search index & API | M | Algolia integration or self-hosted ES |
| Semantic / intent layer | M | Embedding pipeline, synonym dictionary |
| Search UI (instant search, filters) | M | Autocomplete, filter panels, results grid |
| Admin tooling for attribute tagging | M | Bulk import, attribute validation |

**Dependencies:** Complete product catalogue with structured attributes (shape, materials, finishes, dimensions, base types). MMA may need a data enrichment pass for existing products.

---

### 4.3 3D Room Configurator & Virtual Tour

**Business goal:** B2B prospects and interior architects can build and walk through furnished corporate spaces using MMA Design products.

#### Functional scope

| Feature | Description |
|---------|-------------|
| 3D room builder | Place catalogue products in a configurable room shell |
| Product placement | Drag-and-drop or click-to-place from product catalogue |
| Virtual tour / walkthrough | First-person or guided camera path through configured room |
| Space presets | Reception, cafeteria, boardroom, open-plan workstation templates |
| Shareable room links | URL with encoded room state for collaboration |
| Export | Screenshots, PDF layout summary, enquiry handoff |

#### Current prototype coverage

| Capability | Status |
|------------|--------|
| Single-product 3D viewer | ✅ Three.js procedural models (chair, sofa, table, lounge) |
| Environment presets | ✅ Studio / office / showroom lighting |
| AR mode stub | ⚠️ Webcam overlay — demo only |
| VR mode stub | ⚠️ Device orientation — demo only |
| Multi-product room builder | ❌ Not implemented |
| Virtual tour walkthrough | ❌ Not implemented |
| Space presets (reception, etc.) | ❌ Not implemented |
| Shareable room state | ⚠️ URL params for single product only |

#### Recommended technical approach

- **3D engine:** Three.js (web) or Unity WebGL export — Three.js preferred for web-native integration
- **Asset pipeline:** GLB/GLTF models per product variant (base × finish × fabric combinations may use material swapping on base mesh)
- **Room system:** Modular room shell meshes + floor plan editor
- **State persistence:** JSON room config stored server-side, referenced by share token
- **Performance:** LOD (level of detail), instancing for repeated items, Draco compression

#### Architecture diagram

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Product CMS    │────▶│  3D Asset Store  │────▶│  Room Builder   │
│  (metadata)     │     │  (GLB + textures)│     │  (Three.js)     │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                        ┌──────────────────┐              │
                        │  Share / Enquiry │◀─────────────┘
                        │  API             │
                        └──────────────────┘
```

#### Effort estimate

| Workstream | Size | Notes |
|------------|------|-------|
| 3D asset production pipeline | XL | Modelling or photogrammetry for full catalogue |
| Room builder UI | L | Placement, rotation, snap-to-grid, collision |
| Virtual tour camera system | M | Waypoint paths, smooth transitions |
| Space preset templates | M | 4–6 corporate room layouts |
| Share & persistence backend | M | Room state API, link generation |
| Mobile / responsive 3D | L | Open decision — see Section 7 |

**Dependencies:** 3D models or high-quality reference geometry for catalogue products. This is the highest-effort workstream if models do not exist.

---

### 4.4 Pinterest Integration & Social Commerce

**Business goal:** Drive architect and designer discovery through Pinterest, with attributable traffic back to MMA Design.

#### Functional scope

| Feature | Description |
|---------|-------------|
| Pinterest Business account | Setup, claim website, enable Rich Pins |
| Pin from product pages | One-click "Save to Pinterest" on product imagery |
| Project gallery pinning | Pin curated project photography from case studies |
| UTM tracking | Campaign/source/medium parameters on all Pinterest outbound links |
| Structured data | Product and Article schema for Rich Pin eligibility |
| Audience targeting | Optimised pin descriptions, board strategy guidance (MMA marketing) |

#### Current prototype coverage

| Capability | Status |
|------------|--------|
| Pinterest integration | ❌ Not implemented |
| Open Graph / schema markup | ❌ Not implemented |
| Social share buttons | ❌ Not implemented |

#### Recommended technical approach

- **Pinterest Tag:** Base code on all pages for conversion tracking
- **Save button:** Official Pinterest `save.js` widget on product and project images
- **Rich Pins:** Product schema (`product:price:amount`, `product:availability`) and Article schema for projects
- **UTM convention:** `utm_source=pinterest&utm_medium=social&utm_campaign={board-name}`
- **Catalogue sync (optional Phase 2):** Pinterest Catalog feed for automated product pins

#### Effort estimate

| Workstream | Size | Notes |
|------------|------|-------|
| Pinterest account & Tag setup | S | MMA creates account; dev implements tag |
| Save buttons & OG meta | S | Per product/project template |
| Schema markup | S | Product + Article JSON-LD |
| UTM framework | S | Link builder utility, analytics dashboard hook |
| Catalog feed (Phase 2) | M | Automated product pin generation |

**Dependencies:** Pinterest Business account credentials, product imagery at Pinterest-recommended dimensions (1000×1500px preferred).

---

### 4.5 Product Configurator — Live Customisation

**Business goal:** Every catalogue product supports live visual customisation of base/leg type, fabric/upholstery, and wood finish — matching Andreu World / +Halle benchmark.

#### Functional scope

| Feature | Description |
|---------|-------------|
| Base / leg type selector | Product-specific options (e.g. D9, L14, L21, L30, L31, L32, R13, R7, S7) |
| Fabric & upholstery picker | Colour and material swatches for seat/back/top surfaces |
| Wood finish selector | Ash natural oak, Ash wenge, Black Ash, Dark walnut Ash, Medium walnut Ash |
| Live preview | Real-time 3D or image-composited update on selection |
| Full product range | All catalogue products, not demo subset |
| Mobile responsive | Touch-friendly swatch grids, performant on mid-range devices |

#### Current prototype coverage

| Capability | Status |
|------------|--------|
| Live 3D preview | ✅ Three.js with procedural geometry |
| Fabric/upholstery swatches | ✅ 4 presets per model type |
| Wood finish swatches | ✅ 4 presets for table model |
| Base/leg metal finish | ✅ Chrome, brass, bronze, black (generic — not MMA SKU codes) |
| MMA-specific base codes (D9, L14, etc.) | ❌ Not implemented |
| MMA wood finishes (Ash wenge, etc.) | ❌ Generic names only |
| Full product range | ❌ 4 demo models only |
| Image-based configurator fallback | ❌ Not implemented |
| Mobile responsive configurator | ⚠️ Partial — touch orbit works, UI needs refinement |

#### Recommended technical approach

Two viable strategies (decision required):

**Option A — 3D model swapping (preferred for premium feel)**
- Base mesh + swappable sub-meshes per leg type
- PBR material slots for fabric and wood finishes
- Requires 3D assets per product × base variant

**Option B — Image compositing (faster for large catalogue)**
- Layered PNG/WebP compositing (base image + fabric layer + finish layer)
- Lower development cost, faster per-product onboarding
- Reference: many furniture brands use this for initial launch

**Hybrid recommended:** 3D for hero/flagship products; image compositing for long-tail catalogue.

#### Configurator data model (per product)

```json
{
  "productId": "meuse-lounge-chair",
  "configurableAttributes": {
    "baseType": {
      "options": ["D9", "L14", "L21", "L30", "L31", "L32", "R13", "R7", "S7"],
      "default": "L21"
    },
    "upholstery": {
      "surface": "top",
      "options": ["fabric-charcoal", "leather-cognac", "..."]
    },
    "woodFinish": {
      "options": ["ash-natural-oak", "ash-wenge", "black-ash", "dark-walnut-ash", "medium-walnut-ash"],
      "applicable": true
    }
  }
}
```

#### Effort estimate

| Workstream | Size | Notes |
|------------|------|-------|
| Configurator framework (UI + state engine) | L | Reusable across all products |
| 3D asset variant system | XL | Per-product modelling — scales with catalogue size |
| Image compositing pipeline (if hybrid) | M | Template system for batch rendering |
| Admin: configure options per product | M | CMS integration |
| Mobile optimisation | M | Performance profiling, simplified UI |

**Dependencies:** Complete list of base/leg codes per product, fabric catalogue with colour codes, wood finish specifications, and visual assets (3D models or photography layers) for every valid combination.

---

## 5. Proposed Delivery Phases

Development should not begin until commercial terms and brand finalisation are complete. The phases below assume a sequential delivery model; some workstreams can run in parallel after Phase 1.

| Phase | Scope | Exit criteria |
|-------|-------|---------------|
| **Phase 0 — Discovery & Design** | Brand finalisation, IA, wireframes, high-fidelity designs, technical architecture sign-off | Approved designs, signed scope, hosting decision |
| **Phase 1 — Foundation** | Premium site shell, CMS, media pipeline, product catalogue structure, basic search | Live marketing site with product browsing and CDN video |
| **Phase 2 — Configurator & Search** | Product configurator (flagship products), intent search, faceted filters | Users can configure and find products by intent |
| **Phase 3 — 3D Room & Social** | Room builder, virtual tour, Pinterest integration, shareable rooms | Full immersive and social commerce experience |
| **Phase 4 — Scale & Optimise** | Full catalogue configurator coverage, analytics, performance tuning, catalog feed | All products configurable; conversion tracking live |

---

## 6. Technical Architecture (Recommended)

```
┌──────────────────────────────────────────────────────────────────────┐
│                           CDN Edge                                   │
│  (CloudFront / Cloudflare / Azure CDN)                               │
│  ├── Static assets (JS, CSS, fonts)                                  │
│  ├── Images (responsive, WebP/AVIF)                                  │
│  └── Video (HLS adaptive streams)                                    │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────────┐
│                     Frontend Application                             │
│  Next.js / Astro — SSR + static generation                           │
│  ├── Premium pages & storytelling                                    │
│  ├── Product configurator (Three.js)                                 │
│  ├── Room builder (Three.js)                                         │
│  └── Search UI (Algolia InstantSearch)                               │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
┌─────────▼─────────┐ ┌───────▼────────┐ ┌────────▼─────────┐
│  Headless CMS     │ │  Search Index  │ │  API Services    │
│  (Sanity/Contentful)│ │  (Algolia/ES)  │ │  (Room state,   │
│  Products, pages,  │ │  Product attrs,│ │   enquiries,     │
│  projects, media   │ │  embeddings    │ │   analytics)     │
└───────────────────┘ └────────────────┘ └──────────────────┘
          │
┌─────────▼─────────┐
│  Media Pipeline   │
│  Transcode → HLS  │
│  (Mux/Cloudflare) │
└───────────────────┘
```

**Hosting decision (open):**

| Provider | Strengths for this project |
|----------|---------------------------|
| **AWS** | MediaConvert, CloudFront, OpenSearch, S3 asset store — best for video-heavy workloads |
| **Azure** | Strong if MMA has existing Microsoft enterprise agreement |
| **GCP** | Cloud CDN, Vertex AI for semantic search embeddings |

Recommendation: **AWS** unless MMA has an existing cloud commitment — best fit for CDN + video transcoding + search.

---

## 7. Open Decisions Required

| # | Decision | Options | Impact |
|---|----------|---------|--------|
| 1 | Mobile app vs. responsive web for 3D | Responsive web (recommended) / Native app / PWA | 3–5× effort difference for native |
| 2 | Hosting provider | AWS / Azure / GCP | Architecture, cost model, team familiarity |
| 3 | Configurator strategy | Full 3D / Image compositing / Hybrid | Asset production cost and timeline |
| 4 | Search platform | Algolia (SaaS) / Elasticsearch (self-hosted) | Monthly cost vs. operational overhead |
| 5 | CMS platform | Sanity / Contentful / Strapi | Content editor experience, cost |
| 6 | 3D asset source | In-house modelling / outsourced / photogrammetry | Largest variable in Phase 3 |

**Recommendation on mobile app vs. web:** Responsive web with PWA capabilities. WebGL/Three.js configurator and room builder work cross-platform without app store distribution. Native app adds significant cost for marginal UX gain at this stage.

---

## 8. MMA Design Deliverables Required

Before development kick-off, MMA Design should provide:

| Deliverable | Required for |
|-------------|-------------|
| Complete product catalogue (CSV/Excel or existing system export) | Search, configurator, CMS |
| Product attributes: shape, materials, finishes, dimensions, base codes | Intelligent search, filters |
| Brand guidelines: final colours, logo variants (SVG, PNG, mono) | Design system |
| Photography library (high-res, per product/variant) | Product pages, Pinterest, configurator |
| Video library (source masters, not compressed web copies) | Transcoding pipeline |
| 3D models or technical drawings (if available) | Room builder, configurator |
| Base/leg code matrix per product (D9, L14, etc.) | Product configurator |
| Fabric/upholstery catalogue with colour codes | Configurator swatches |
| Wood finish specifications and reference imagery | Configurator swatches |
| Pinterest Business account access | Social commerce setup |
| Project case studies (images, descriptions, client permissions) | Project gallery |

---

## 9. Current Prototype — Gap Summary

| Requirement area | Prototype readiness | Gap severity |
|-----------------|--------------------|--------------|
| Premium UI/UX | ~60% — strong design foundation | Medium — needs CMS-driven pages |
| Video rendering / CDN | ~15% — single MP4, no adaptive streaming | High |
| Intelligent search | 0% | High |
| 3D room configurator | ~10% — single-product viewer only | Critical |
| Pinterest integration | 0% | Medium |
| Product configurator | ~25% — demo models, generic options | Critical |

The existing prototype (`index.html`, `3d-studio.html`) serves as a **design and technical proof-of-concept**. It validates the premium aesthetic and Three.js integration but must be rebuilt on a production architecture (CMS, API, CDN, search) to meet the full scope.

---

## 10. Effort Summary

Sizing key: **S** = small, **M** = medium, **L** = large, **XL** = extra-large

| # | Requirement | Overall size | Critical dependency |
|---|-------------|-------------|-------------------|
| 01 | Premium website & video | **L** | Brand finalisation, video masters |
| 02 | Intelligent search | **L** | Structured product catalogue |
| 03 | 3D room configurator | **XL** | 3D asset production |
| 04 | Pinterest & social commerce | **S–M** | Pinterest account, imagery |
| 05 | Product configurator | **XL** | Per-product assets & attribute matrix |

**Total platform scope: XL** — five interconnected systems sharing a common product data foundation. Phased delivery (Section 5) is strongly recommended to manage risk and allow early value delivery via the premium marketing site and basic product browsing.

---

## 11. Next Steps

1. **MMA Design** — Share product catalogue, brand assets, and video library
2. **Joint session** — Finalise brand colours and logo variants
3. **Joint session** — Resolve open decisions (Section 7): hosting, mobile strategy, configurator approach
4. **FocusChain Labs** — Prepare commercial proposal with phased pricing aligned to Section 5
5. **Both parties** — Sign scope and commercial terms
6. **Kick-off** — Target 1 July 2026

---

*This document will be updated following subsequent requirement confirmation meetings.*
