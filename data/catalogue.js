/* ════════════════════════════════════════════════════════════════════════
   MMA Design — Shared catalogue data (Phase 2)
   Single source of truth for taxonomy, products, imagery, and material
   palettes. Loaded as a classic script before each page's own logic, so the
   declarations below are global and shared by index.html, catalogue.html,
   and product.html. Material ids deliberately match the 3D studio so a
   product page can deep-link a configuration straight into 3d-studio.html.
   ════════════════════════════════════════════════════════════════════════ */

const taxonomy = [
  { group: 'seating', label: 'Seating', blurb: 'Task, executive and conference seating engineered for the working day.', subs: [
    { sub: 'executive-chairs', label: 'Executive Chairs' },
    { sub: 'conference-chairs', label: 'Conference Chairs' }
  ]},
  { group: 'soft-seating', label: 'Soft Seating', blurb: 'Sofas, lounge chairs and benches for reception, breakout and lounge.', subs: [
    { sub: 'sofas', label: 'Sofas' },
    { sub: 'lounge-chairs', label: 'Lounge Chairs' },
    { sub: 'benches', label: 'Benches' },
    { sub: 'breakout', label: 'Breakout' }
  ]},
  { group: 'tables', label: 'Tables', blurb: 'Conference, meeting and reception tables with integrated power and data.', subs: [
    { sub: 'conference-tables', label: 'Conference Tables' },
    { sub: 'meeting-tables', label: 'Meeting Tables' },
    { sub: 'reception', label: 'Reception' }
  ]},
  { group: 'collaborative', label: 'Collaborative & Pods', blurb: 'Hot-desking, standing and bar-height tables for the agile workplace.', subs: [
    { sub: 'hot-desking', label: 'Hot Desking' },
    { sub: 'bar-tables', label: 'Bar & Standing' }
  ]},
  { group: 'storage', label: 'Storage', blurb: 'Modular storage walls and credenzas that organise and divide space.', subs: [
    { sub: 'storage-systems', label: 'Storage Systems' }
  ]}
];

const groupOf = {};
const groupLabel = {};
const subLabel = {};
taxonomy.forEach(g => { groupLabel[g.group] = g.label; g.subs.forEach(s => { groupOf[s.sub] = g.group; subLabel[s.sub] = s.label; }); });

// materialType drives which finish family the product page exposes:
//   'upholstery' → fabric & colour swatches   |   'wood' → wood finishes
const productData = [
  { id: 1, name: 'Meuse Executive', group: 'seating', sub: 'executive-chairs', category: 'chairs', cat: 'Executive Seating', shape: 'curved', isNew: true, bases: ['D9','L14','L21','L30','R7'], studioModel: 'chair-executive', materialType: 'upholstery',
    desc: 'Ergonomic mesh, hydraulic gas lift, solid structural frame with multiple base options.',
    longDesc: 'The definitive executive chair. A breathable mesh back is paired with a deep, hand-upholstered seat and a synchro-tilt mechanism that follows the body through the day. Specified across leadership floors and focus rooms alike.',
    dims: { w: 68, d: 65, h: '118–128' }, meta: 'Seat height 46–56 cm', lead: '4–6 weeks',
    features: ['Breathable mesh back', 'Pneumatic height adjustment', 'Synchro-tilt with tension control', 'Adjustable lumbar support', '4D adjustable armrests'] },
  { id: 2, name: 'Meuse Conference', group: 'seating', sub: 'conference-chairs', category: 'chairs', cat: 'Conference Seating', shape: 'curved', isNew: false, bases: ['S7','L14'], studioModel: 'chair-conference', materialType: 'upholstery',
    desc: 'Stackable conference chair with cushioned seat, chrome sled base, and upholstered back.',
    longDesc: 'A refined visitor and conference chair with a fully upholstered seat and back. The sprung sled base flexes subtly as you settle, and chairs stack four-high for fast room turnarounds.',
    dims: { w: 58, d: 60, h: 95 }, meta: 'Stacks 4 high', lead: '3–4 weeks',
    features: ['Cushioned upholstered seat', 'Sprung sled or 4-leg base', 'Stackable four-high', 'Optional padded armrests', 'Linking brackets available'] },
  { id: 3, name: 'Diablo Modular Sofa', group: 'soft-seating', sub: 'sofas', category: 'sofas', cat: 'Modular Lounge', shape: 'rectangular', isNew: true, bases: ['L31','L32'], studioModel: 'sofa-modular', materialType: 'upholstery',
    desc: 'Plush modular felt cushions with architectural brass-tipped steel frame. Multiple configuration options.',
    longDesc: 'A modular lounge system built around an architectural brass-tipped steel frame. Specify straight runs, corners and islands; high-resilience foam holds its shape through years of reception traffic.',
    dims: { w: 192, d: 88, h: 82 }, meta: 'Modular — extendable', lead: '6–8 weeks',
    features: ['Modular felt cushions', 'Brass-tipped steel frame', 'Straight, corner & island modules', 'High-resilience foam', '30+ fabric options'] },
  { id: 4, name: 'Diablo Bench', group: 'soft-seating', sub: 'benches', category: 'sofas', cat: 'Public Seating', shape: 'rectangular', isNew: false, bases: ['L32'], studioModel: 'sofa-bench', materialType: 'upholstery',
    desc: 'Linear bench system for waiting areas, corridors, and informal meeting zones.',
    longDesc: 'A linear upholstered bench for waiting areas, corridors and transit zones. Gang multiple units into continuous runs; an optional low back adds comfort without blocking sightlines.',
    dims: { w: 130, d: 48, h: 42 }, meta: 'Gangable', lead: '4–5 weeks',
    features: ['Continuous gangable runs', 'Powder-coated steel frame', 'Optional low back', 'Hard-wearing contract foam', 'Reception & corridor rated'] },
  { id: 5, name: 'Loire Boardroom', group: 'tables', sub: 'conference-tables', category: 'tables', cat: 'Conference Table', shape: 'rectangular', isNew: true, bases: ['R13','L30'], studioModel: 'table-boardroom', materialType: 'wood',
    desc: 'Chamfered walnut wood slab table with steel modular legs. Seats 8-16.',
    longDesc: 'A statement boardroom table with a chamfered solid-timber slab and architectural steel legs. Integrated power and data grommets keep the surface clear; lengths are made to order.',
    dims: { w: 230, d: 110, h: 74 }, meta: 'Seats 8–16', lead: '8–10 weeks',
    features: ['Chamfered solid-timber slab', 'Architectural steel legs', 'Integrated power & data grommets', 'Concealed cable management', 'Bespoke lengths to order'] },
  { id: 6, name: 'Loire Round', group: 'tables', sub: 'meeting-tables', category: 'tables', cat: 'Meeting Table', shape: 'circular', isNew: false, bases: ['R7','R13'], studioModel: 'table-round', materialType: 'wood',
    desc: 'Circular meeting table in solid oak or walnut. Perfect for 4-6 person huddle spaces.',
    longDesc: 'A circular meeting table on a sculpted central column, sized for four-to-six person huddles. Available in solid oak or walnut with an optional flush power module.',
    dims: { w: 120, d: 120, h: 75 }, meta: 'Seats 4–6', lead: '6–8 weeks',
    features: ['Solid oak or walnut top', 'Sculpted central column base', 'Optional flush power module', 'Self-levelling feet', 'Huddle & focus rooms'] },
  { id: 7, name: 'Flamingo Lounge', group: 'soft-seating', sub: 'lounge-chairs', category: 'lounge', cat: 'Lounge Chair', shape: 'curved', isNew: true, bases: ['R13','R7'], studioModel: 'lounge-chair', materialType: 'upholstery',
    desc: 'Iconic swivel lounge chair. Sculptural walnut plywood shell with luxurious leather finish.',
    longDesc: 'An iconic swivel lounge chair: a sculptural moulded-plywood shell cradles a deep leather or fabric cushion, returning gently to centre on its polished base. A signature piece for reception and executive lounges.',
    dims: { w: 76, d: 72, h: 92 }, meta: 'Swivel return', lead: '6–8 weeks',
    features: ['Sculptural moulded-plywood shell', 'Self-returning swivel base', 'Leather or fabric cushion', 'Walnut or oak veneer shell', 'Loop or round base options'] },
  { id: 8, name: 'Seine Reception Desk', group: 'tables', sub: 'reception', category: 'tables', cat: 'Reception', shape: 'rectangular', isNew: false, bases: ['L21'], studioModel: 'table-reception', materialType: 'wood',
    desc: 'Curved reception counter in premium wood veneer with integrated lighting and cable management.',
    longDesc: 'A curved reception counter in premium veneer with an integrated LED light line and a DDA-compliant lowered section. Configured to your lobby footprint in custom widths and radii.',
    dims: { w: 160, d: 75, h: 110 }, meta: 'Custom widths', lead: '8–10 weeks',
    features: ['Curved premium veneer counter', 'Integrated LED light line', 'DDA-compliant lowered section', 'Concealed cable management', 'Made to lobby footprint'] },
  { id: 9, name: 'Rhone Collaborative Table', group: 'collaborative', sub: 'hot-desking', category: 'collaborative', cat: 'Hot Desking', shape: 'oval', isNew: true, bases: ['L14','R7'], studioModel: 'table-standing', materialType: 'wood',
    desc: 'Oval collaborative table with power integration, cable management, and whiteboard surface.',
    longDesc: 'An oval collaborative bench for hot-desking and project teams. A central cable spine routes power to every seat, and an optional writable top turns the surface into a thinking space.',
    dims: { w: 180, d: 90, h: 74 }, meta: '4–6 person bench', lead: '6–8 weeks',
    features: ['Oval collaborative top', 'Central powered cable spine', 'Optional writable surface', 'Hot-desking & project teams', 'Bench or 4-leg base'] },
  { id: 10, name: 'Marne Storage Wall', group: 'storage', sub: 'storage-systems', category: 'storage', cat: 'Storage System', shape: 'rectangular', isNew: false, bases: [], studioModel: 'storage-wall', materialType: 'wood',
    desc: 'Modular storage wall with open shelving, closed cabinets, and integrated display niches.',
    longDesc: 'A modular storage wall that organises and divides open-plan space. Combine open shelving, push-to-open cabinets and lit display niches into bespoke widths and heights.',
    dims: { w: 150, d: 40, h: 180 }, meta: 'Modular widths', lead: '8–10 weeks',
    features: ['Open & closed modules', 'Lit display niches', 'Adjustable shelves', 'Push-to-open doors', 'Bespoke width & height'] },
  { id: 11, name: 'Durance Breakout Sofa', group: 'soft-seating', sub: 'breakout', category: 'sofas', cat: 'Breakout', shape: 'curved', isNew: false, bases: ['L32','L31'], studioModel: 'sofa-modular', materialType: 'upholstery',
    desc: 'Modular curved sofa for informal breakout spaces. Available in 30+ fabric options.',
    longDesc: 'A gently curved modular sofa that shapes informal breakout zones. Arc segments build circles and serpentines; an acoustic-backed option helps tame open-plan noise.',
    dims: { w: 170, d: 80, h: 75 }, meta: 'Curved modular', lead: '6–8 weeks',
    features: ['Curved arc modules', '30+ fabric options', 'Optional acoustic back', 'Powered modules available', 'Builds circles & serpentines'] },
  { id: 12, name: 'Garonne Bar Table', group: 'collaborative', sub: 'bar-tables', category: 'collaborative', cat: 'Standing Desk', shape: 'circular', isNew: true, bases: ['R7'], studioModel: 'table-standing', materialType: 'wood',
    desc: 'Height-adjustable round bar table for standing meetings and informal exchanges.',
    longDesc: 'A round bar-height table for stand-up meetings and informal exchanges. A weighted column keeps it stable, with an optional footrest ring and flush power for laptops.',
    dims: { w: 90, d: 90, h: 105 }, meta: 'Bar height', lead: '5–6 weeks',
    features: ['Bar-height round top', 'Weighted stable column', 'Optional footrest ring', 'Flush power option', 'Stand-up meeting spaces'] },

  // ── Catalogue expansion (40–50 SKU target): variants within existing
  //    collections + four new river-named families. Each maps to one of the
  //    ten procedural 3D studio models, so every SKU is configurable in 3D. ──

  // Meuse family — executive & conference seating variants
  { id: 13, name: 'Meuse High-Back', group: 'seating', sub: 'executive-chairs', category: 'chairs', cat: 'Executive Seating', shape: 'curved', isNew: true, bases: ['D9','L30'], studioModel: 'chair-executive', materialType: 'upholstery',
    desc: 'High-back executive chair with extended headrest and full-grain leather seat.',
    longDesc: 'The Meuse High-Back extends the executive line with a sculpted headrest and full-grain leather upholstery. A continuous mesh-and-leather back cradles the full spine; the synchro-tilt mechanism locks in five positions.',
    dims: { w: 68, d: 65, h: '128–138' }, meta: 'Seat height 46–56 cm', lead: '5–7 weeks',
    features: ['Extended headrest', 'Full-grain leather seat', '5-position synchro-tilt lock', '4D adjustable armrests', 'Polished aluminium base'] },
  { id: 14, name: 'Meuse Task', group: 'seating', sub: 'executive-chairs', category: 'chairs', cat: 'Task Seating', shape: 'curved', isNew: false, bases: ['D9'], studioModel: 'chair-executive', materialType: 'upholstery',
    desc: 'Compact task chair for focused workstations. Mesh back, breathable seat, castor base.',
    longDesc: 'A compact task variant of the Meuse line, engineered for dense workstation layouts. The mesh back keeps air moving through long sessions; a simpler mechanism trims weight and cost without sacrificing the synchro-tilt feel.',
    dims: { w: 64, d: 62, h: '110–120' }, meta: 'Seat height 44–54 cm', lead: '3–4 weeks',
    features: ['Breathable mesh back', 'Compact footprint', 'Synchro-tilt mechanism', 'Height-adjustable lumbar', 'Castor base standard'] },
  { id: 15, name: 'Meuse Visitor', group: 'seating', sub: 'conference-chairs', category: 'chairs', cat: 'Visitor Seating', shape: 'curved', isNew: false, bases: ['S7','L14'], studioModel: 'chair-conference', materialType: 'upholstery',
    desc: 'Visitor chair with padded seat and back, sled base. Stacks four-high.',
    longDesc: 'A lighter visitor variant of the Meuse conference chair. The sled base flexes as you settle; upholstery wraps the seat and back in a single clean line. Stacks four-high for flexible room reconfiguration.',
    dims: { w: 56, d: 58, h: 92 }, meta: 'Stacks 4 high', lead: '3–4 weeks',
    features: ['Padded seat & back', 'Sprung sled base', 'Stacks four-high', 'Linking brackets', 'Six upholstery grades'] },

  // Aube family — new collection: agile task & conference seating
  { id: 16, name: 'Aube Executive', group: 'seating', sub: 'executive-chairs', category: 'chairs', cat: 'Executive Seating', shape: 'curved', isNew: true, bases: ['D9','L30'], studioModel: 'chair-executive', materialType: 'upholstery',
    desc: 'Executive chair with sculpted plywood shell, leather seat, and pedestal base.',
    longDesc: 'The Aube Executive pairs a sculpted plywood shell with a deep leather seat and a sculpted pedestal base. A quieter, more residential executive language — specified in leadership suites and private offices.',
    dims: { w: 70, d: 66, h: '120–130' }, meta: 'Seat height 46–56 cm', lead: '6–8 weeks',
    features: ['Sculpted plywood shell', 'Full-grain leather seat', 'Pedestal or castor base', 'Synchro-tilt with lock', 'Walnut or oak shell'] },
  { id: 17, name: 'Aube Task', group: 'seating', sub: 'executive-chairs', category: 'chairs', cat: 'Task Seating', shape: 'curved', isNew: false, bases: ['D9'], studioModel: 'chair-executive', materialType: 'upholstery',
    desc: 'Agile task chair with mesh back and fabric seat. Lightweight and quick to adjust.',
    longDesc: 'The Aube Task brings the collection’s clean lines to the open-plan floor. A single-lever mechanism controls height and tilt; the mesh back keeps the chair light enough to move between desks.',
    dims: { w: 62, d: 60, h: '108–118' }, meta: 'Seat height 43–53 cm', lead: '3–4 weeks',
    features: ['Single-lever control', 'Lightweight mesh back', 'Fabric or felt seat', 'Castor base', 'Optional armrests'] },
  { id: 18, name: 'Aube Conference', group: 'seating', sub: 'conference-chairs', category: 'chairs', cat: 'Conference Seating', shape: 'curved', isNew: false, bases: ['S7','L14'], studioModel: 'chair-conference', materialType: 'upholstery',
    desc: 'Conference chair with upholstered shell and four-leg base. Links in rows.',
    longDesc: 'A conference chair with a fully upholstered shell and a powder-coated four-leg base. Chairs link in straight rows for boardrooms and auditoriums; the seat foam is tuned for two-hour meetings.',
    dims: { w: 58, d: 60, h: 94 }, meta: 'Linkable in rows', lead: '4–5 weeks',
    features: ['Upholstered shell', 'Four-leg base', 'Row linking brackets', 'Two-hour seat foam', 'Stackable two-high'] },
  { id: 19, name: 'Aube Stack', group: 'seating', sub: 'conference-chairs', category: 'chairs', cat: 'Stack Seating', shape: 'curved', isNew: false, bases: ['S7'], studioModel: 'chair-conference', materialType: 'upholstery',
    desc: 'Stackable training chair with thin upholstery and sled base. Stacks eight-high.',
    longDesc: 'A stackable training and event chair. The thin upholstered seat keeps weight down; the sled base stacks eight-high on a transport dolly. The first choice for flexible training and event spaces.',
    dims: { w: 54, d: 56, h: 88 }, meta: 'Stacks 8 high', lead: '2–3 weeks',
    features: ['Stacks eight-high', 'Transport dolly available', 'Thin upholstered seat', 'Sled base', 'Linking brackets'] },
  { id: 20, name: 'Aube High-Back', group: 'seating', sub: 'executive-chairs', category: 'chairs', cat: 'Executive Seating', shape: 'curved', isNew: true, bases: ['D9','L30'], studioModel: 'chair-executive', materialType: 'upholstery',
    desc: 'High-back executive with integrated headrest and premium leather. For leadership suites.',
    longDesc: 'The Aube High-Back brings a residential warmth to the executive floor. A wrapped leather back rises to an integrated headrest; the plywood shell is visible from behind, lending the chair a sculptural presence.',
    dims: { w: 70, d: 66, h: '130–140' }, meta: 'Seat height 46–56 cm', lead: '6–8 weeks',
    features: ['Integrated headrest', 'Wrapped leather back', 'Plywood shell visible', 'Pedestal or castor base', 'Walnut or oak shell'] },

  // Diablo family — sofa & bench variants
  { id: 21, name: 'Diablo Corner Sofa', group: 'soft-seating', sub: 'sofas', category: 'sofas', cat: 'Modular Lounge', shape: 'rectangular', isNew: true, bases: ['L31','L32'], studioModel: 'sofa-modular', materialType: 'upholstery',
    desc: 'Corner module for the Diablo system. Builds L-shapes, U-shapes, and islands.',
    longDesc: 'The Diablo Corner module extends the modular lounge system into L-shaped and U-shaped configurations. The same brass-tipped steel frame and high-resilience foam as the straight modules; specify with or without armrests.',
    dims: { w: 88, d: 88, h: 82 }, meta: 'Corner module', lead: '6–8 weeks',
    features: ['L & U configuration', 'Brass-tipped steel frame', 'High-resilience foam', 'Removable covers', '30+ fabric options'] },
  { id: 22, name: 'Diablo Ottoman', group: 'soft-seating', sub: 'benches', category: 'sofas', cat: 'Ottoman', shape: 'rectangular', isNew: false, bases: ['L32'], studioModel: 'sofa-bench', materialType: 'upholstery',
    desc: 'Upholstered ottoman for the Diablo system. Coffee table, extra seat, or footrest.',
    longDesc: 'A versatile upholstered ottoman that pairs with the Diablo sofa system. Use it as a coffee table surface, an extra seat, or a footrest. The same frame and foam as the bench modules.',
    dims: { w: 90, d: 60, h: 42 }, meta: 'Multi-purpose', lead: '4–5 weeks',
    features: ['Multi-purpose ottoman', 'Matches Diablo frame', 'High-resilience foam', 'Removable cover', 'Optional tray top'] },

  // Flamingo family — lounge variants
  { id: 23, name: 'Flamingo Ottoman', group: 'soft-seating', sub: 'lounge-chairs', category: 'lounge', cat: 'Ottoman', shape: 'curved', isNew: false, bases: [], studioModel: 'lounge-chair', materialType: 'upholstery',
    desc: 'Matching ottoman for the Flamingo lounge chair. Sculptural plywood shell, leather cushion.',
    longDesc: 'The Flamingo Ottoman completes the lounge chair setting. The same moulded-plywood shell cradles a leather or fabric cushion at footrest height. A quiet companion that doesn’t compete with the chair’s sculptural line.',
    dims: { w: 60, d: 50, h: 38 }, meta: 'Footrest height', lead: '6–8 weeks',
    features: ['Matching plywood shell', 'Leather or fabric cushion', 'Footrest height', 'Walnut or oak veneer', 'Pairs with Flamingo Lounge'] },

  // Somme family — new collection: soft lounge seating
  { id: 24, name: 'Somme Lounge Chair', group: 'soft-seating', sub: 'lounge-chairs', category: 'lounge', cat: 'Lounge Chair', shape: 'curved', isNew: true, bases: ['R13','R7'], studioModel: 'lounge-chair', materialType: 'upholstery',
    desc: 'Deep lounge chair with wraparound back and swivel base. Bouclé or leather.',
    longDesc: 'The Somme Lounge Chair wraps the body in a deep, enveloping back. A swivel base returns gently to centre; the seat is hand-upholstered in bouclé, leather, or velvet. A signature piece for executive lounges and quiet rooms.',
    dims: { w: 80, d: 78, h: 88 }, meta: 'Swivel return', lead: '6–8 weeks',
    features: ['Enveloping wraparound back', 'Self-returning swivel base', 'Bouclé, leather or velvet', 'Hand-upholstered seat', 'Walnut or oak base option'] },
  { id: 25, name: 'Somme Sofa', group: 'soft-seating', sub: 'sofas', category: 'sofas', cat: 'Lounge Sofa', shape: 'rectangular', isNew: false, bases: ['L31','L32'], studioModel: 'sofa-modular', materialType: 'upholstery',
    desc: 'Three-seat lounge sofa with deep cushions and low profile. For reception and executive loungges.',
    longDesc: 'The Somme Sofa brings the lounge chair’s deep comfort to a three-seat format. A low, architectural profile keeps sightlines open in reception spaces; the down-wrapped foam cushions hold their shape through years of use.',
    dims: { w: 210, d: 92, h: 78 }, meta: '3-seat', lead: '7–9 weeks',
    features: ['Deep down-wrapped cushions', 'Low architectural profile', 'Brass-tipped steel frame', 'Removable covers', '30+ fabric options'] },
  { id: 26, name: 'Somme 2-Seat', group: 'soft-seating', sub: 'sofas', category: 'sofas', cat: 'Lounge Sofa', shape: 'rectangular', isNew: false, bases: ['L31'], studioModel: 'sofa-modular', materialType: 'upholstery',
    desc: 'Compact two-seat sofa for private offices and small lounge corners.',
    longDesc: 'A compact two-seat variant of the Somme lounge sofa. Sized for private offices, executive quiet rooms, and small reception corners where the three-seat would overwhelm. Same deep cushions, same low profile.',
    dims: { w: 150, d: 92, h: 78 }, meta: '2-seat', lead: '7–9 weeks',
    features: ['Compact 2-seat format', 'Deep down-wrapped cushions', 'Low architectural profile', 'Removable covers', '30+ fabric options'] },

  // Durance family — breakout variant
  { id: 27, name: 'Durance Curve Module', group: 'soft-seating', sub: 'breakout', category: 'sofas', cat: 'Breakout', shape: 'curved', isNew: false, bases: ['L32','L31'], studioModel: 'sofa-modular', materialType: 'upholstery',
    desc: 'Single curved arc module for the Durance breakout system. Builds circles and serpentines.',
    longDesc: 'A single 30-degree arc module for the Durance breakout system. Combine twelve modules into a full circle, or serpentines through open-plan space. An acoustic-backed option helps tame open-plan noise.',
    dims: { w: 85, d: 80, h: 75 }, meta: '30° arc module', lead: '6–8 weeks',
    features: ['30° arc module', 'Builds circles & serpentines', 'Optional acoustic back', 'Powered modules available', '30+ fabric options'] },

  // Vie family — new collection: transitional dining/lounge
  { id: 28, name: 'Vie Lounge Chair', group: 'soft-seating', sub: 'lounge-chairs', category: 'lounge', cat: 'Lounge Chair', shape: 'curved', isNew: true, bases: ['R13'], studioModel: 'lounge-chair', materialType: 'upholstery',
    desc: 'Transitional lounge chair with moulded shell and leather seat. For lounge and dining.',
    longDesc: 'The Vie Lounge Chair sits between lounge and dining. A moulded plywood shell is shaped for relaxed sitting but upright enough for a meal. The leather or fabric seat is hand-stitched; the base returns to centre on a swivel.',
    dims: { w: 72, d: 70, h: 84 }, meta: 'Swivel return', lead: '6–8 weeks',
    features: ['Transitional lounge-dining', 'Moulded plywood shell', 'Leather or fabric seat', 'Self-returning swivel base', 'Walnut or oak veneer'] },
  { id: 29, name: 'Vie Dining Chair', group: 'seating', sub: 'conference-chairs', category: 'chairs', cat: 'Dining Seating', shape: 'curved', isNew: false, bases: ['S7','L14'], studioModel: 'chair-conference', materialType: 'upholstery',
    desc: 'Dining chair with moulded plywood shell and upholstered seat. For cafeteria and boardroom.',
    longDesc: 'A dining-height chair that brings the Vie collection’s transitional language to the cafeteria and boardroom table. The plywood shell is shaped for a meal’s duration; the upholstered seat is tuned for comfort through a long lunch.',
    dims: { w: 54, d: 56, h: 86 }, meta: 'Dining height', lead: '4–5 weeks',
    features: ['Moulded plywood shell', 'Upholstered seat', 'Sled or four-leg base', 'Walnut or oak veneer', 'Stackable two-high'] },

  // Loire family — table variants
  { id: 30, name: 'Loire Boardroom XL', group: 'tables', sub: 'conference-tables', category: 'tables', cat: 'Conference Table', shape: 'oval', isNew: false, bases: ['R13','L30'], studioModel: 'table-boardroom', materialType: 'wood',
    desc: 'Extended boardroom table for 16–20 seats. Boat-shape top with integrated power.',
    longDesc: 'The Loire Boardroom XL extends the line for larger boards. A subtle boat-shape top keeps sightlines clear to the screen; integrated power and data grommets serve every seat. Made to order in walnut or oak.',
    dims: { w: 360, d: 120, h: 74 }, meta: 'Seats 16–20', lead: '10–12 weeks',
    features: ['Boat-shape top', 'Seats 16–20', 'Integrated power & data', 'Concealed cable management', 'Bespoke lengths to order'] },
  { id: 31, name: 'Loire Square', group: 'tables', sub: 'meeting-tables', category: 'tables', cat: 'Meeting Table', shape: 'rectangular', isNew: false, bases: ['R7','L30'], studioModel: 'table-round', materialType: 'wood',
    desc: 'Square meeting table for 4–8 person huddle and focus spaces.',
    longDesc: 'A square meeting table on a sculpted central column, sized for four-to-eight person huddles. Available in solid oak or walnut with an optional flush power module. Pairs with Meuse or Aube conference chairs.',
    dims: { w: 120, d: 120, h: 75 }, meta: 'Seats 4–8', lead: '6–8 weeks',
    features: ['Square solid-timber top', 'Sculpted central column', 'Optional flush power module', 'Self-levelling feet', 'Oak or walnut'] },
  { id: 32, name: 'Loire Meeting', group: 'tables', sub: 'meeting-tables', category: 'tables', cat: 'Meeting Table', shape: 'rectangular', isNew: false, bases: ['R7','L30'], studioModel: 'table-round', materialType: 'wood',
    desc: 'Rectangular meeting table for 6–10 person project spaces.',
    longDesc: 'A rectangular meeting table sized for six-to-ten person project spaces. The solid-timber top sits on architectural legs; integrated cable management keeps the surface clear for laptops and whiteboards.',
    dims: { w: 180, d: 90, h: 75 }, meta: 'Seats 6–10', lead: '7–9 weeks',
    features: ['Rectangular timber top', 'Architectural steel legs', 'Integrated cable management', 'Optional power module', 'Oak or walnut'] },
  { id: 33, name: 'Loire Console', group: 'tables', sub: 'reception', category: 'tables', cat: 'Console', shape: 'rectangular', isNew: false, bases: [], studioModel: 'table-reception', materialType: 'wood',
    desc: 'Slim console table in solid timber. For lobby display and corridor galleries.',
    longDesc: 'A slim console table in solid timber. The chamfered top sits on a architectural steel frame; the proportions are tuned for lobby display plinths and corridor gallery surfaces. Made to order in oak or walnut.',
    dims: { w: 140, d: 35, h: 75 }, meta: 'Console depth', lead: '6–8 weeks',
    features: ['Slim console profile', 'Chamfered timber top', 'Architectural steel frame', 'Oak or walnut', 'Wall-anchor option'] },

  // Seine family — reception variants
  { id: 34, name: 'Seine Console Table', group: 'tables', sub: 'reception', category: 'tables', cat: 'Reception', shape: 'rectangular', isNew: false, bases: [], studioModel: 'table-reception', materialType: 'wood',
    desc: 'Matching console for the Seine reception desk. Display plinth and visitor sign-in.',
    longDesc: 'A matching console for the Seine reception desk. Use it as a display plinth, a visitor sign-in surface, or a waiting-area side table. The same veneer and LED light line as the main counter.',
    dims: { w: 120, d: 45, h: 75 }, meta: 'Matching console', lead: '7–9 weeks',
    features: ['Matches Seine counter', 'Integrated LED light line', 'Veneer to lobby footprint', 'Display plinth or sign-in', 'Concealed cable route'] },
  { id: 35, name: 'Seine Standing Counter', group: 'tables', sub: 'reception', category: 'tables', cat: 'Reception', shape: 'rectangular', isNew: false, bases: [], studioModel: 'table-reception', materialType: 'wood',
    desc: 'Standing-height reception counter for visitor check-in and badge printing.',
    longDesc: 'A standing-height companion to the Seine reception desk. Visitors check in and print badges at counter height; the DDA-compliant lowered section is retained. The same veneer and integrated LED line as the main counter.',
    dims: { w: 100, d: 60, h: 105 }, meta: 'Standing height', lead: '8–10 weeks',
    features: ['Standing-height check-in', 'DDA-compliant section', 'Integrated LED line', 'Badge printer recess', 'Veneer to lobby footprint'] },

  // Rhone family — collaborative variant
  { id: 36, name: 'Rhone Bench Desk', group: 'collaborative', sub: 'hot-desking', category: 'collaborative', cat: 'Hot Desking', shape: 'oval', isNew: false, bases: ['L14','R7'], studioModel: 'table-standing', materialType: 'wood',
    desc: 'Double-sided bench desk for hot-desking teams. Central power spine, shared cable route.',
    longDesc: 'A double-sided bench desk for hot-desking teams. A central powered spine routes power to every seat; the timber top is writable on request. Pairs with Meuse or Aube task chairs for a complete agile workstation.',
    dims: { w: 240, d: 90, h: 74 }, meta: '6–8 person bench', lead: '7–9 weeks',
    features: ['Double-sided bench', 'Central powered spine', 'Optional writable top', 'Shared cable route', 'Hot-desking & project teams'] },

  // Garonne family — bar table variant
  { id: 37, name: 'Garonne Poseur', group: 'collaborative', sub: 'bar-tables', category: 'collaborative', cat: 'Standing Desk', shape: 'circular', isNew: false, bases: ['R7'], studioModel: 'table-standing', materialType: 'wood',
    desc: 'Poseur-height round table for informal meetings and café spaces.',
    longDesc: 'A poseur-height round table for informal stand-up meetings and social café spaces. The weighted column keeps it stable at height; an optional footrest ring and flush power make it laptop-friendly.',
    dims: { w: 80, d: 80, h: 110 }, meta: 'Poseur height', lead: '5–6 weeks',
    features: ['Poseur-height round top', 'Weighted stable column', 'Optional footrest ring', 'Flush power option', 'Café & social spaces'] },

  // Isere family — new collection: standing & café tables
  { id: 38, name: 'Isere Stand-Up Desk', group: 'collaborative', sub: 'hot-desking', category: 'collaborative', cat: 'Standing Desk', shape: 'oval', isNew: true, bases: ['R7','R13'], studioModel: 'table-standing', materialType: 'wood',
    desc: 'Height-adjustable stand-up desk with round top and weighted column.',
    longDesc: 'The Isere Stand-Up Desk brings a clean, architectural form to the standing-meeting category. A round timber top on a weighted column; an optional footrest ring and flush power for laptop sessions.',
    dims: { w: 85, d: 85, h: '95–115' }, meta: 'Height adjustable', lead: '5–6 weeks',
    features: ['Height-adjustable column', 'Round timber top', 'Optional footrest ring', 'Flush power option', 'Stand-up & agile meetings'] },
  { id: 39, name: 'Isere Café Table', group: 'collaborative', sub: 'bar-tables', category: 'collaborative', cat: 'Café Table', shape: 'circular', isNew: false, bases: ['R7'], studioModel: 'table-standing', materialType: 'wood',
    desc: 'Café-height round table for dining and social spaces. Solid timber top.',
    longDesc: 'A café-height round table for staff dining and social spaces. The solid timber top is warm and durable; the weighted column is stable in high-traffic cafeterias. Pairs with Vie dining chairs or Garonne stools.',
    dims: { w: 75, d: 75, h: 74 }, meta: 'Café height', lead: '4–5 weeks',
    features: ['Café-height round top', 'Solid timber surface', 'Weighted stable column', 'High-traffic rated', 'Oak or walnut'] },

  // Marne family — storage variants
  { id: 40, name: 'Marne Credenza', group: 'storage', sub: 'storage-systems', category: 'storage', cat: 'Credenza', shape: 'rectangular', isNew: false, bases: [], studioModel: 'storage-wall', materialType: 'wood',
    desc: 'Low credenza with push-to-open doors and optional lit display niche.',
    longDesc: 'A low credenza from the Marne storage family. Push-to-open doors keep the front clean; an optional lit display niche runs the length of the unit. Sized for behind-sofa and under-window placement.',
    dims: { w: 160, d: 42, h: 65 }, meta: 'Low credenza', lead: '7–9 weeks',
    features: ['Push-to-open doors', 'Optional lit display niche', 'Adjustable internal shelves', 'Oak or walnut veneer', 'Soft-close hinges'] },
  { id: 41, name: 'Marne Bookshelf', group: 'storage', sub: 'storage-systems', category: 'storage', cat: 'Bookshelf', shape: 'rectangular', isNew: false, bases: [], studioModel: 'storage-wall', materialType: 'wood',
    desc: 'Open-back bookshelf with adjustable shelves. For library and resource areas.',
    longDesc: 'An open-back bookshelf from the Marne family. Adjustable shelves hold books and resources; the open back keeps the piece light in plan. Wall-anchor standard for stability in library and resource areas.',
    dims: { w: 90, d: 36, h: 180 }, meta: 'Open-back', lead: '6–8 weeks',
    features: ['Adjustable shelves', 'Open-back construction', 'Wall-anchor included', 'Oak or walnut veneer', 'Modular — stack side by side'] },
  { id: 42, name: 'Marne Sideboard', group: 'storage', sub: 'storage-systems', category: 'storage', cat: 'Sideboard', shape: 'rectangular', isNew: true, bases: [], studioModel: 'storage-wall', materialType: 'wood',
    desc: 'Mid-height sideboard with mixed open shelving and closed cabinets.',
    longDesc: 'A mid-height sideboard from the Marne family that combines open display shelving with closed storage. The asymmetric layout is designed for executive offices and meeting-room credenzas. Made to order in oak or walnut.',
    dims: { w: 180, d: 42, h: 120 }, meta: 'Mixed storage', lead: '8–10 weeks',
    features: ['Mixed open & closed storage', 'Asymmetric layout', 'Push-to-open doors', 'Adjustable shelves', 'Oak or walnut veneer'] }
];

// Curated search/marketing tags (kept beside the data so index search + cards reuse them)
const productTags = {
  1: ['D9 Base','L30 Base','Leather','Mesh'],
  2: ['S7 Base','Upholstered','Stackable'],
  3: ['L31 Base','Felt','Modular','Brass Tips'],
  4: ['L32 Base','Fabric','Linear'],
  5: ['Walnut','Steel Legs','Grommet','Power'],
  6: ['Circular','Oak','Walnut','Power'],
  7: ['Swivel','R13 Base','Leather','Plywood'],
  8: ['Curved','Veneer','LED','Counter'],
  9: ['Oval','Power','Whiteboard','Hot Desk'],
  10: ['Modular','Shelving','Cabinets','Display'],
  11: ['Curved','Modular','Fabric','Breakout'],
  12: ['Circular','Height Adj','Standing','Power'],
  13: ['D9 Base','Headrest','Leather','Mesh'],
  14: ['D9 Base','Mesh','Task','Compact'],
  15: ['S7 Base','Visitor','Stackable','Upholstered'],
  16: ['D9 Base','Plywood','Leather','Pedestal'],
  17: ['D9 Base','Mesh','Task','Lightweight'],
  18: ['S7 Base','Conference','Linkable','Upholstered'],
  19: ['S7 Base','Stackable','Training','Sled'],
  20: ['D9 Base','Headrest','Leather','Plywood'],
  21: ['L31 Base','Corner','Modular','Felt'],
  22: ['L32 Base','Ottoman','Fabric','Multi-purpose'],
  23: ['Plywood','Ottoman','Leather','Footrest'],
  24: ['R13 Base','Bouclé','Swivel','Lounge'],
  25: ['L31 Base','Deep Cushion','Lounge','Fabric'],
  26: ['L31 Base','2-Seat','Lounge','Compact'],
  27: ['L32 Base','Arc Module','Breakout','Acoustic'],
  28: ['R13 Base','Transitional','Leather','Plywood'],
  29: ['S7 Base','Dining','Plywood','Upholstered'],
  30: ['Boat Shape','Walnut','Power','Seats 16'],
  31: ['Square','Oak','Power','Huddle'],
  32: ['Rectangular','Walnut','Cable Mgmt','Project'],
  33: ['Console','Slim','Timber','Display'],
  34: ['Console','LED','Veneer','Matching'],
  35: ['Standing Counter','LED','DDA','Check-in'],
  36: ['Bench Desk','Power','Writable','Hot Desk'],
  37: ['R7 Base','Poseur','Round','Footrest'],
  38: ['R7 Base','Height Adj','Standing','Round'],
  39: ['R7 Base','Café','Timber','Round'],
  40: ['Credenza','Push-to-Open','Low','Display'],
  41: ['Bookshelf','Open-back','Adjustable','Tall'],
  42: ['Sideboard','Mixed Storage','Asymmetric','Walnut']
};
productData.forEach(p => { p.tags = productTags[p.id] || []; });

const productById = id => productData.find(p => String(p.id) === String(id));

/* ── Phase 3: discovery facets, collections, recommendation engine ──
   application = the spaces a piece is specified for (maps to the office presets)
   materials   = material facets for faceted search
   collection  = named design family (drives "more from the collection") */
const COLLECTIONS = { meuse:'Meuse', diablo:'Diablo', loire:'Loire', flamingo:'Flamingo', seine:'Seine', rhone:'Rhone', marne:'Marne', durance:'Durance', garonne:'Garonne', aube:'Aube', somme:'Somme', vie:'Vie', isere:'Isere' };

const APPLICATIONS = [
  { id:'executive', label:'Executive', blurb:'Commanding desks, lounge seating and storage for leadership floors.' },
  { id:'boardroom', label:'Boardroom', blurb:'Conference tables and boardroom seating built for decisions.' },
  { id:'reception', label:'Reception', blurb:'Welcoming counters, sofas and lounge chairs for first impressions.' },
  { id:'workspace', label:'Open Workspace', blurb:'Task seating, benches, desks and storage for focused teams.' },
  { id:'breakout', label:'Breakout', blurb:'Soft, modular seating and tables for informal collaboration.' },
  { id:'cafeteria', label:'Café & Dining', blurb:'Bar tables and social seating where teams cross-pollinate.' },
  { id:'huddle', label:'Huddle & Meeting', blurb:'Round tables and agile seating for quick syncs.' },
  { id:'lounge', label:'Lounge', blurb:'Sculptural lounge seating and sofas for moments off the calendar.' }
];
const applicationLabel = {}; APPLICATIONS.forEach(a => applicationLabel[a.id] = a.label);

const MATERIALS = [
  { id:'leather', label:'Leather' },
  { id:'fabric', label:'Fabric & Felt' },
  { id:'mesh', label:'Mesh' },
  { id:'wood', label:'Solid Wood' },
  { id:'veneer', label:'Veneer' },
  { id:'metal', label:'Metal' }
];
const materialLabel = {}; MATERIALS.forEach(m => materialLabel[m.id] = m.label);

const SHAPES = [
  { id:'curved', label:'Curved' },
  { id:'rectangular', label:'Rectangular' },
  { id:'circular', label:'Circular' },
  { id:'oval', label:'Oval' }
];

const PRODUCT_FACETS = {
  1:  { collection:'meuse',    application:['executive','workspace'],          materials:['mesh','leather','metal'] },
  2:  { collection:'meuse',    application:['boardroom','huddle','workspace'], materials:['fabric','metal'] },
  3:  { collection:'diablo',   application:['reception','lounge','breakout'],  materials:['fabric','metal'] },
  4:  { collection:'diablo',   application:['reception','workspace'],          materials:['fabric','metal'] },
  5:  { collection:'loire',    application:['boardroom'],                      materials:['wood','metal'] },
  6:  { collection:'loire',    application:['huddle','workspace'],             materials:['wood','metal'] },
  7:  { collection:'flamingo', application:['reception','lounge','executive'], materials:['leather','wood'] },
  8:  { collection:'seine',    application:['reception'],                      materials:['veneer','wood'] },
  9:  { collection:'rhone',    application:['workspace','breakout'],           materials:['wood','metal'] },
  10: { collection:'marne',    application:['workspace','executive'],          materials:['wood','veneer'] },
  11: { collection:'durance',  application:['breakout','lounge','cafeteria'],  materials:['fabric'] },
  12: { collection:'garonne',  application:['cafeteria','breakout'],           materials:['wood','metal'] },
  13: { collection:'meuse',    application:['executive','workspace'],          materials:['leather','mesh','metal'] },
  14: { collection:'meuse',    application:['workspace'],                      materials:['mesh','fabric','metal'] },
  15: { collection:'meuse',    application:['boardroom','huddle','workspace'], materials:['fabric','metal'] },
  16: { collection:'aube',     application:['executive'],                      materials:['leather','wood','metal'] },
  17: { collection:'aube',     application:['workspace'],                      materials:['mesh','fabric','metal'] },
  18: { collection:'aube',     application:['boardroom','huddle'],             materials:['fabric','metal'] },
  19: { collection:'aube',     application:['huddle','workspace','cafeteria'], materials:['fabric','metal'] },
  20: { collection:'aube',     application:['executive','lounge'],             materials:['leather','wood'] },
  21: { collection:'diablo',   application:['reception','lounge','breakout'],  materials:['fabric','metal'] },
  22: { collection:'diablo',   application:['reception','lounge','breakout'],  materials:['fabric','metal'] },
  23: { collection:'flamingo', application:['reception','lounge','executive'], materials:['leather','wood'] },
  24: { collection:'somme',    application:['lounge','executive','reception'], materials:['leather','fabric'] },
  25: { collection:'somme',    application:['reception','lounge'],             materials:['fabric','metal'] },
  26: { collection:'somme',    application:['executive','lounge','huddle'],    materials:['fabric','metal'] },
  27: { collection:'durance',  application:['breakout','lounge','cafeteria'],  materials:['fabric'] },
  28: { collection:'vie',      application:['lounge','cafeteria','huddle'],    materials:['leather','wood'] },
  29: { collection:'vie',      application:['cafeteria','huddle','boardroom'], materials:['fabric','wood'] },
  30: { collection:'loire',    application:['boardroom'],                      materials:['wood','metal'] },
  31: { collection:'loire',    application:['huddle','workspace'],             materials:['wood','metal'] },
  32: { collection:'loire',    application:['huddle','workspace'],             materials:['wood','metal'] },
  33: { collection:'loire',    application:['reception'],                      materials:['wood','metal'] },
  34: { collection:'seine',    application:['reception'],                      materials:['veneer','wood'] },
  35: { collection:'seine',    application:['reception'],                      materials:['veneer','wood'] },
  36: { collection:'rhone',    application:['workspace','breakout'],           materials:['wood','metal'] },
  37: { collection:'garonne',  application:['cafeteria','breakout'],           materials:['wood','metal'] },
  38: { collection:'isere',    application:['workspace','huddle'],             materials:['wood','metal'] },
  39: { collection:'isere',    application:['cafeteria','breakout'],           materials:['wood','metal'] },
  40: { collection:'marne',    application:['workspace','executive','boardroom'], materials:['wood','veneer'] },
  41: { collection:'marne',    application:['workspace','executive'],          materials:['wood','veneer'] },
  42: { collection:'marne',    application:['workspace','executive','boardroom'], materials:['wood','veneer'] }
};
productData.forEach(p => {
  const f = PRODUCT_FACETS[p.id] || {};
  p.collection = f.collection || null;
  p.collectionLabel = COLLECTIONS[f.collection] || '';
  p.application = f.application || [];
  p.materials = f.materials || [];
});

// Recommendation engine: same collection + "frequently specified together"
// (a different family that shares a space, ranked by how many spaces overlap).
function recommendationsFor(p) {
  const sameCollection = productData.filter(x => x.collection === p.collection && x.id !== p.id);
  const shared = x => x.application.filter(a => p.application.indexOf(a) >= 0).length;
  const frequentlyWith = productData
    .filter(x => x.id !== p.id && x.group !== p.group && shared(x) > 0)
    .sort((a, b) => shared(b) - shared(a));
  return { sameCollection, frequentlyWith };
}

// Faceted search: text + any combination of group / application / material / shape.
// Within a facet the values are OR'd; across facets they are AND'd.
function facetSearch(opts) {
  opts = opts || {};
  const q = (opts.text || '').toLowerCase().trim();
  const inAny = (arr, vals) => !vals || !vals.length || vals.some(v => arr.indexOf(v) >= 0);
  return productData.filter(p => {
    if (q) {
      const hay = (p.name + ' ' + p.cat + ' ' + p.desc + ' ' + p.tags.join(' ') + ' ' + p.shape + ' ' +
        (p.collectionLabel || '') + ' ' + p.application.map(a => applicationLabel[a]).join(' ') + ' ' +
        p.materials.map(m => materialLabel[m]).join(' ')).toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    if (opts.group && opts.group.length && opts.group.indexOf(p.group) < 0) return false;
    if (!inAny(p.application, opts.application)) return false;
    if (!inAny(p.materials, opts.material)) return false;
    if (opts.shape && opts.shape.length && opts.shape.indexOf(p.shape) < 0) return false;
    return true;
  });
}

// ── Material palettes (ids match 3d-studio.html for seamless deep-linking) ──
// Phase 4: every upholstery swatch belongs to a textile collection with a
// specification grade (2 → 4). Products declare a grade ceiling, so only the
// finishes a piece is actually rated for are offered (variant validation).
const FABRIC_COLLECTIONS = {
  'wool-felt':       { label:'Wool Felt',       grade:2, blurb:'Dense contract wool felt — the hard-wearing everyday workhorse.' },
  'boucle':          { label:'Bouclé',          grade:3, blurb:'Textured wool bouclé with a soft, tactile loop.' },
  'velvet':          { label:'Cotton Velvet',   grade:3, blurb:'Deep-pile cotton velvet with a quiet, directional sheen.' },
  'aniline-leather': { label:'Aniline Leather', grade:4, blurb:'Full-grain aniline leather that patinas beautifully with age.' }
};
const GRADE_LABEL = { 1:'Grade 1', 2:'Grade 2 · Standard', 3:'Grade 3 · Premium', 4:'Grade 4 · Signature' };

const FABRICS = [
  { id:'charcoal',   name:'Charcoal',   value:'#1C1C19', collection:'aniline-leather', grade:4, type:'Aniline Leather' },
  { id:'camel',      name:'Camel',      value:'#C19A6B', collection:'aniline-leather', grade:4, type:'Aniline Leather' },
  { id:'cognac',     name:'Cognac',     value:'#9A4F2A', collection:'aniline-leather', grade:4, type:'Aniline Leather' },
  { id:'oxblood',    name:'Oxblood',    value:'#7A1C1C', collection:'velvet',          grade:3, type:'Cotton Velvet' },
  { id:'ivory',      name:'Ivory',      value:'#FAF8F0', collection:'boucle',          grade:3, type:'Bouclé' },
  { id:'emerald',    name:'Emerald',    value:'#123524', collection:'wool-felt',       grade:2, type:'Wool Felt' },
  { id:'navy',       name:'Navy',       value:'#1B2838', collection:'wool-felt',       grade:2, type:'Wool Felt' },
  { id:'terracotta', name:'Terracotta', value:'#C36241', collection:'wool-felt',       grade:2, type:'Wool Felt' }
];

// Grade ceiling per studio model — drives which fabrics a product is rated for.
const PRODUCT_GRADE_CEILING = {
  'chair-executive': 4, 'chair-conference': 3, 'sofa-modular': 4,
  'sofa-bench': 2, 'lounge-chair': 4
};
function gradeCeiling(studioModel) {
  return PRODUCT_GRADE_CEILING[studioModel] != null ? PRODUCT_GRADE_CEILING[studioModel] : 4;
}
// Fabrics a product is rated for, grouped by collection (highest grade first).
function fabricsForModel(studioModel) {
  const max = gradeCeiling(studioModel);
  return FABRICS.filter(f => f.grade <= max);
}
function fabricGroupsForModel(studioModel) {
  const fabrics = fabricsForModel(studioModel);
  const order = Object.keys(FABRIC_COLLECTIONS).sort((a, b) => FABRIC_COLLECTIONS[b].grade - FABRIC_COLLECTIONS[a].grade);
  return order.map(col => ({
    collection: col,
    label: FABRIC_COLLECTIONS[col].label,
    grade: FABRIC_COLLECTIONS[col].grade,
    blurb: FABRIC_COLLECTIONS[col].blurb,
    swatches: fabrics.filter(f => f.collection === col)
  })).filter(g => g.swatches.length);
}

// ── Phase 4: configurable variant options (SKU expansion) ──
// Keyed by studio model. `affects` tells the 3D studio how to apply the choice:
//   'arms' / 'headrest' toggle geometry · 'scaleX' stretches the piece ·
//   'spec' is specification-only (changes the SKU & spec sheet, not the mesh).
const PRODUCT_OPTIONS = {
  'chair-executive': [
    { id:'arms', label:'Armrests', affects:'arms', choices:[
      { id:'adjustable', label:'4D Adjustable', code:'A1' },
      { id:'none',       label:'Armless',       code:'A0' } ] },
    { id:'headrest', label:'Headrest', affects:'headrest', choices:[
      { id:'yes', label:'With Headrest', code:'H1' },
      { id:'no',  label:'No Headrest',   code:'H0' } ] }
  ],
  'chair-conference': [
    { id:'arms', label:'Armrests', affects:'spec', choices:[
      { id:'with', label:'With Arms', code:'A1' },
      { id:'none', label:'Armless',   code:'A0' } ] },
    { id:'link', label:'Linking', affects:'spec', choices:[
      { id:'standalone', label:'Standalone', code:'L0' },
      { id:'ganged',     label:'Ganged',     code:'L1' } ] }
  ],
  'sofa-modular': [
    { id:'size', label:'Configuration', affects:'scaleX', choices:[
      { id:'two',   label:'2-Seat', code:'S2', scaleX:0.78, detail:'Seats 2 · 1.5 m' },
      { id:'three', label:'3-Seat', code:'S3', scaleX:1.00, detail:'Seats 3 · 1.9 m' },
      { id:'four',  label:'4-Seat', code:'S4', scaleX:1.22, detail:'Seats 4 · 2.4 m' } ] }
  ],
  'sofa-bench': [
    { id:'size', label:'Length', affects:'scaleX', choices:[
      { id:'std',  label:'Standard',  code:'B0', scaleX:1.00, detail:'1.3 m run' },
      { id:'long', label:'Long Run',  code:'B1', scaleX:1.38, detail:'1.8 m run' } ] }
  ],
  'table-boardroom': [
    { id:'size', label:'Seats', affects:'scaleX', choices:[
      { id:'eight',   label:'Seats 8',  code:'T08', scaleX:1.00, detail:'2.3 m' },
      { id:'twelve',  label:'Seats 12', code:'T12', scaleX:1.26, detail:'2.9 m' },
      { id:'sixteen', label:'Seats 16', code:'T16', scaleX:1.52, detail:'3.5 m' } ] }
  ],
  'table-standing': [
    { id:'height', label:'Height', affects:'spec', choices:[
      { id:'bar',    label:'Bar 105 cm',   code:'HB' },
      { id:'poseur', label:'Poseur 110 cm', code:'HP' } ] }
  ],
  'lounge-chair': [
    { id:'swivel', label:'Return', affects:'spec', choices:[
      { id:'return', label:'Self-Return', code:'W1' },
      { id:'fixed',  label:'Fixed',       code:'W0' } ] }
  ]
};
function optionGroups(studioModel) { return PRODUCT_OPTIONS[studioModel] || []; }
function defaultOptions(studioModel) {
  const o = {};
  optionGroups(studioModel).forEach(g => { o[g.id] = g.choices[0].id; });
  return o;
}
function optionChoice(studioModel, groupId, choiceId) {
  const g = optionGroups(studioModel).find(x => x.id === groupId);
  if (!g) return null;
  return g.choices.find(c => c.id === choiceId) || g.choices[0];
}
// Sanitise an options map against a model's option schema (variant validation).
function sanitiseOptions(studioModel, opts) {
  const clean = defaultOptions(studioModel);
  optionGroups(studioModel).forEach(g => {
    if (opts && opts[g.id] && g.choices.some(c => c.id === opts[g.id])) clean[g.id] = opts[g.id];
  });
  return clean;
}

const WOODS = [
  { id:'ash-oak',       name:'Natural Oak', value:'#E2D8C5' },
  { id:'medium-walnut', name:'Walnut',      value:'#5C4331' },
  { id:'dark-walnut',   name:'Dark Walnut', value:'#3E2D20' },
  { id:'ash-wenge',     name:'Wenge',       value:'#2B2624' },
  { id:'black-ash',     name:'Black Ash',   value:'#181818' }
];

const STRUCTURES = [
  { id:'matte-black', name:'Matte Black', value:'#222222' },
  { id:'chrome',      name:'Polished Chrome', value:'#E0E0E0' },
  { id:'brass',       name:'Brushed Brass',  value:'#D4AF37' },
  { id:'bronze',      name:'Oil-Rubbed Bronze', value:'#7B7059' }
];

const BASE_NAMES = {
  D9:'5-Star Castor', L14:'4-Leg Sled', L21:'Tubular Frame', L30:'Pedestal',
  L31:'Wide Sled', L32:'Low Frame', R13:'Round Swivel', R7:'Round Base', S7:'Sled Base'
};

const productImages = {
  'Meuse Executive': 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=900&h=900&fit=crop',
  'Meuse Conference': 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=900&h=900&fit=crop',
  'Diablo Modular Sofa': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=900&fit=crop',
  'Diablo Bench': 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&h=900&fit=crop',
  'Loire Boardroom': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&h=900&fit=crop',
  'Loire Round': 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=900&h=900&fit=crop',
  'Flamingo Lounge': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&h=900&fit=crop',
  'Seine Reception Desk': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=900&fit=crop',
  'Rhone Collaborative Table': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&h=900&fit=crop',
  'Marne Storage Wall': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&h=900&fit=crop',
  'Durance Breakout Sofa': 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&h=900&fit=crop',
  'Garonne Bar Table': 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=900&h=900&fit=crop'
};

// Secondary "in-situ" angle for the detail-page gallery
const productImagesAlt = {
  'Meuse Executive': 'https://images.unsplash.com/photo-1505797149-0b7a3b1a4f1e?w=900&h=900&fit=crop',
  'Meuse Conference': 'https://images.unsplash.com/photo-1503602642458-232111445657?w=900&h=900&fit=crop',
  'Diablo Modular Sofa': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&h=900&fit=crop',
  'Diablo Bench': 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&h=900&fit=crop',
  'Loire Boardroom': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&h=900&fit=crop',
  'Loire Round': 'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=900&h=900&fit=crop',
  'Flamingo Lounge': 'https://images.unsplash.com/photo-1519961655809-34fa156820ff?w=900&h=900&fit=crop',
  'Seine Reception Desk': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&h=900&fit=crop',
  'Rhone Collaborative Table': 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=900&h=900&fit=crop',
  'Marne Storage Wall': 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=900&h=900&fit=crop',
  'Durance Breakout Sofa': 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=900&h=900&fit=crop',
  'Garonne Bar Table': 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=900&h=900&fit=crop'
};

const productSVGs = {
  'Meuse Executive': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="100" cy="170" rx="40" ry="6"/><path d="M75 170 L75 145 Q75 132 83 128 L83 100"/><path d="M125 170 L125 145 Q125 132 117 128 L117 100"/><path d="M70 100 Q70 65 100 52 Q130 65 130 100"/><path d="M70 100 L70 108 Q70 116 78 116 L122 116 Q130 116 130 108 L130 100"/><path d="M66 88 Q64 80 67 74 L70 72"/><path d="M134 88 Q136 80 133 74 L130 72"/><path d="M66 88 L66 104 Q66 112 70 112"/><path d="M134 88 L134 104 Q134 112 130 112"/><circle cx="87" cy="180" r="3"/><circle cx="113" cy="180" r="3"/><circle cx="100" cy="180" r="3"/><path d="M84 180 L116 180"/><line x1="90" y1="66" x2="90" y2="92" opacity="0.5"/><line x1="100" y1="62" x2="100" y2="92" opacity="0.5"/><line x1="110" y1="66" x2="110" y2="92" opacity="0.5"/></g></svg>`,
  'Meuse Conference': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><path d="M70 160 L60 170 L140 170 L130 160"/><path d="M65 170 L65 180 L135 180 L135 170"/><path d="M75 160 L75 130 Q75 118 82 115 L82 95"/><path d="M125 160 L125 130 Q125 118 118 115 L118 95"/><path d="M72 95 Q72 68 100 58 Q128 68 128 95"/><path d="M72 95 L72 102 Q72 108 78 108 L122 108 Q128 108 128 102 L128 95"/><path d="M82 108 L82 118 Q82 125 88 128"/><path d="M118 108 L118 118 Q118 125 112 128"/></g></svg>`,
  'Diablo Modular Sofa': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="90" width="160" height="40" rx="5"/><rect x="24" y="94" width="48" height="32" rx="3"/><rect x="76" y="94" width="48" height="32" rx="3"/><rect x="128" y="94" width="48" height="32" rx="3"/><rect x="16" y="76" width="168" height="16" rx="4"/><path d="M16 76 Q16 64 28 64 L172 64 Q184 64 184 76"/><line x1="36" y1="130" x2="36" y2="160"/><line x1="164" y1="130" x2="164" y2="160"/></g></svg>`,
  'Diablo Bench': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><rect x="25" y="95" width="150" height="30" rx="4"/><rect x="20" y="85" width="160" height="12" rx="3"/><line x1="45" y1="125" x2="45" y2="160"/><line x1="155" y1="125" x2="155" y2="160"/></g></svg>`,
  'Loire Boardroom': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><path d="M20 95 L180 95 L172 100 L28 100 Z"/><rect x="24" y="82" width="152" height="15" rx="2"/><line x1="42" y1="100" x2="38" y2="160"/><line x1="158" y1="100" x2="162" y2="160"/><line x1="72" y1="100" x2="71" y2="160"/><line x1="128" y1="100" x2="129" y2="160"/></g></svg>`,
  'Loire Round': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="100" cy="90" rx="65" ry="20"/><ellipse cx="100" cy="86" rx="62" ry="17" opacity="0.6"/><line x1="60" y1="110" x2="55" y2="165"/><line x1="140" y1="110" x2="145" y2="165"/><line x1="100" y1="110" x2="100" y2="165"/></g></svg>`,
  'Flamingo Lounge': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="100" cy="170" rx="30" ry="5"/><path d="M80 170 L80 155 Q80 148 86 145 L86 125"/><path d="M120 170 L120 155 Q120 148 114 145 L114 125"/><path d="M72 125 Q68 85 100 60 Q132 85 128 125"/><path d="M72 125 L72 132 Q72 140 80 140 L120 140 Q128 140 128 132 L128 125"/><path d="M65 110 Q60 95 68 82"/><path d="M135 110 Q140 95 132 82"/></g></svg>`,
  'Seine Reception Desk': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><path d="M30 80 Q30 70 50 65 L150 65 Q170 70 170 80 L170 140 Q170 150 150 155 L50 155 Q30 150 30 140 Z"/><line x1="30" y1="100" x2="170" y2="100" opacity="0.6"/><rect x="55" y="105" width="90" height="40" rx="3" opacity="0.5"/></g></svg>`,
  'Rhone Collaborative Table': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="100" cy="90" rx="70" ry="25"/><ellipse cx="100" cy="86" rx="67" ry="22" opacity="0.6"/><line x1="55" y1="115" x2="50" y2="165"/><line x1="145" y1="115" x2="150" y2="165"/><line x1="100" y1="115" x2="100" y2="165"/></g></svg>`,
  'Marne Storage Wall': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><rect x="30" y="40" width="140" height="130" rx="3"/><line x1="30" y1="72" x2="170" y2="72"/><line x1="30" y1="105" x2="170" y2="105"/><line x1="30" y1="138" x2="170" y2="138"/><line x1="100" y1="40" x2="100" y2="170"/></g></svg>`,
  'Durance Breakout Sofa': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><path d="M30 100 Q30 75 50 70 L150 70 Q170 75 170 100 L170 130 Q170 140 160 140 L40 140 Q30 140 30 130 Z"/><rect x="40" y="100" width="50" height="30" rx="4" opacity="0.5"/><rect x="95" y="100" width="50" height="30" rx="4" opacity="0.5"/></g></svg>`,
  'Garonne Bar Table': `<svg viewBox="0 0 200 200" fill="none"><g stroke="#B8952F" stroke-width="1.2" opacity="0.32" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="100" cy="60" rx="45" ry="12"/><ellipse cx="100" cy="57" rx="42" ry="10" opacity="0.6"/><line x1="100" y1="72" x2="100" y2="155"/><ellipse cx="100" cy="158" rx="25" ry="5"/></g></svg>`
};

// ── Catalogue expansion: inherit imagery & schematics ──
// New SKUs (13–42) reuse their collection's hero photo and their studio
// model's line schematic, so every product renders fully without 30 unique
// photo shoots. When MMA supplies real photography, drop entries into the
// maps above and the fallbacks step aside automatically.
(function () {
  // Build a per-collection hero image from the first product that has one.
  const colImg = {}, colImgAlt = {};
  productData.forEach(p => {
    if (!colImg[p.collection] && productImages[p.name]) colImg[p.collection] = productImages[p.name];
    if (!colImgAlt[p.collection] && productImagesAlt[p.name]) colImgAlt[p.collection] = productImagesAlt[p.name];
  });
  // Build a per-studio-model schematic from the first product that has one.
  const modelSvg = {};
  productData.forEach(p => {
    if (!modelSvg[p.studioModel] && productSVGs[p.name]) modelSvg[p.studioModel] = productSVGs[p.name];
  });
  // Fill gaps: any product missing an image/svg inherits from its collection/model.
  productData.forEach(p => {
    if (!productImages[p.name]) {
      // Fallback: same studio model's hero, then collection hero, then a neutral.
      const sibling = productData.find(x => x.studioModel === p.studioModel && productImages[x.name]);
      productImages[p.name] = (sibling && productImages[sibling.name]) || colImg[p.collection] || 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&h=900&fit=crop';
    }
    if (!productImagesAlt[p.name]) {
      const sibling = productData.find(x => x.studioModel === p.studioModel && productImagesAlt[x.name]);
      productImagesAlt[p.name] = (sibling && productImagesAlt[sibling.name]) || colImgAlt[p.collection] || productImages[p.name];
    }
    if (!productSVGs[p.name] && modelSvg[p.studioModel]) productSVGs[p.name] = modelSvg[p.studioModel];
  });
})();

/* ════════════════════════════════════════════════════════════════════════
   PHASE 5 — CMS-READY CONTENT MODEL
   The data above is the canonical seed. Everything below makes it a proper
   content model: a published schema, a loader/adapter that today reads the
   in-file seed but is shaped to be swapped for a headless CMS or a JSON
   endpoint (`data/products.json`) with no page changes, and validators so
   editors get immediate feedback when they add or edit a product.

   The existing globals (productData, taxonomy, FABRICS, …) are unchanged —
   the CMS object simply wraps them. Pages and the smoke harness keep working.
   ════════════════════════════════════════════════════════════════════════ */

var CONTENT_MODEL = {
  version: 5,
  product: {
    fields: {
      id:           { type: 'integer', required: true, unique: true, label: 'SKU id' },
      name:         { type: 'string',  required: true, label: 'Product name' },
      group:        { type: 'enum',    required: true, values: function () { return taxonomy.map(function (g) { return g.group; }); }, label: 'Family' },
      sub:          { type: 'enum',    required: true, values: function () { return Object.keys(subLabel); }, label: 'Sub-category' },
      category:     { type: 'string',  required: true, label: 'Category slug' },
      cat:          { type: 'string',  required: true, label: 'Category label' },
      shape:        { type: 'enum',    required: true, values: ['curved','rectangular','circular','oval'], label: 'Form' },
      isNew:        { type: 'boolean', required: false, label: 'New badge' },
      bases:        { type: 'array',   required: false, items: function () { return Object.keys(BASE_NAMES); }, label: 'Compatible bases' },
      studioModel:  { type: 'string',  required: true, label: '3D studio model id' },
      materialType: { type: 'enum',    required: true, values: ['upholstery','wood'], label: 'Material family' },
      desc:         { type: 'string',  required: true, label: 'Short description' },
      longDesc:     { type: 'string',  required: false, label: 'Long description' },
      dims:         { type: 'object',  required: true, keys: ['w','d','h'], label: 'Dimensions (cm)' },
      meta:         { type: 'string',  required: true, label: 'Detail line' },
      lead:         { type: 'string',  required: true, label: 'Lead time' },
      features:     { type: 'array',   required: true, items: 'string', label: 'Features' },
      tags:         { type: 'array',   required: false, items: 'string', label: 'Search tags' },
      collection:   { type: 'enum',    required: false, values: function () { return Object.keys(COLLECTIONS); }, label: 'Design collection' },
      application:  { type: 'array',   required: false, items: function () { return APPLICATIONS.map(function (a) { return a.id; }); }, label: 'Applications' },
      materials:    { type: 'array',   required: false, items: function () { return MATERIALS.map(function (m) { return m.id; }); }, label: 'Material facets' }
    },
    required: ['id','name','group','sub','category','cat','shape','studioModel','materialType','desc','dims','meta','lead','features']
  },
  fabric: {
    fields: { id: { type:'string', required:true }, name: { type:'string', required:true }, value: { type:'string', required:true }, collection: { type:'enum', required:true, values: function () { return Object.keys(FABRIC_COLLECTIONS); } }, grade: { type:'integer', required:true, min:2, max:4 }, type: { type:'string', required:true } },
    required: ['id','name','value','collection','grade','type']
  }
};

// Resolve a possibly-function enum value to a plain array.
function _modelValues(v) { return typeof v === 'function' ? v() : (v || []); }

// Validate one product against the schema. Returns { valid, errors }.
function validateProduct(p) {
  var errors = [];
  if (!p || typeof p !== 'object') return { valid: false, errors: ['product is required'] };
  var schema = CONTENT_MODEL.product;
  schema.required.forEach(function (f) {
    if (p[f] == null || (typeof p[f] === 'string' && !p[f].trim()) || (Array.isArray(p[f]) && !p[f].length)) errors.push(f + ' is required');
  });
  Object.keys(schema.fields).forEach(function (f) {
    var def = schema.fields[f], v = p[f];
    if (v == null) return;
    if (def.type === 'enum') { if (_modelValues(def.values).indexOf(String(v)) < 0) errors.push(f + ' "' + v + '" is not a recognised value'); }
    if (def.type === 'array' && def.items) {
      var allowed = typeof def.items === 'function' ? def.items() : null;
      v.forEach(function (item) { if (allowed && allowed.indexOf(String(item)) < 0) errors.push(f + ' has unknown value "' + item + '"'); });
    }
    if (def.type === 'object' && def.keys) { def.keys.forEach(function (k) { if (v[k] == null) errors.push(f + '.' + k + ' is required'); }); }
    if (def.min != null && v < def.min) errors.push(f + ' must be >= ' + def.min);
    if (def.max != null && v > def.max) errors.push(f + ' must be <= ' + def.max);
  });
  var ids = productData.map(function (x) { return x.id; });
  if (p.id != null && ids.filter(function (i) { return String(i) === String(p.id); }).length > 1) errors.push('id must be unique');
  return { valid: !errors.length, errors: errors };
}

// Validate every seed product (used by the CMS console + smoke harness).
function validateAll() {
  var bad = [];
  productData.forEach(function (p) { var r = validateProduct(p); if (!r.valid) bad.push({ id: p.id, errors: r.errors }); });
  return { valid: !bad.length, products: bad };
}

/* ── CMS adapter ──────────────────────────────────────────────────────
   Today every loader returns the in-file seed synchronously. The same
   signatures, returning Promises, can later be backed by fetch() against a
   headless CMS or data/products.json — the pages call CMS.fetchProducts()
   and render from the result, so the swap needs no UI changes.            */
var CMS = {
  version: CONTENT_MODEL.version,
  source: 'seed',
  _store: (function () {
    try { return typeof localStorage !== 'undefined' && localStorage ? localStorage : null; } catch (e) { return null; }
  })(),

  loadTaxonomy: function () { return taxonomy.slice(); },
  loadProducts: function () { return productData.slice(); },
  loadFabrics: function () { return FABRICS.slice(); },
  loadWoods: function () { return WOODS.slice(); },
  loadStructures: function () { return STRUCTURES.slice(); },
  loadBases: function () { return Object.keys(BASE_NAMES).map(function (c) { return { code: c, name: BASE_NAMES[c] }; }); },
  loadApplications: function () { return APPLICATIONS.slice(); },
  loadCollections: function () { return Object.keys(COLLECTIONS).map(function (k) { return { id: k, label: COLLECTIONS[k] }; }); },

  // Async-ready entry point. Resolves to a product array. If a localStorage
  // override set exists (from the CMS console), it wins over the seed.
  fetchProducts: function () {
    var self = this;
    return new Promise(function (resolve) {
      var overrides = self._readOverrides();
      resolve(overrides && overrides.length ? overrides : self.loadProducts());
    });
  },

  // ── editor operations (CMS console) ──
  _readOverrides: function () {
    if (!this._store) return null;
    try { var raw = this._store.getItem('mma_cms_products'); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  },
  _writeOverrides: function (list) {
    if (!this._store) return false;
    try { this._store.setItem('mma_cms_products', JSON.stringify(list)); return true; } catch (e) { return false; }
  },
  resetOverrides: function () { if (this._store) try { this._store.removeItem('mma_cms_products'); } catch (e) {} },

  upsertProduct: function (p) {
    var v = validateProduct(p);
    if (!v.valid) return { ok: false, errors: v.errors };
    var overrides = this._readOverrides() || this.loadProducts().map(function (x) { return Object.assign({}, x); });
    var i = overrides.findIndex(function (x) { return String(x.id) === String(p.id); });
    if (i >= 0) overrides[i] = Object.assign({}, overrides[i], p); else overrides.push(p);
    this._writeOverrides(overrides);
    return { ok: true, product: p };
  },
  deleteProduct: function (id) {
    var overrides = this._readOverrides() || this.loadProducts().map(function (x) { return Object.assign({}, x); });
    var next = overrides.filter(function (x) { return String(x.id) !== String(id); });
    this._writeOverrides(next);
    return { ok: true };
  },
  validateProduct: validateProduct,
  validateAll: validateAll,
  schema: CONTENT_MODEL,

  // Full content export — the exact shape persisted to data/products.json.
  exportJSON: function () {
    return {
      model: CONTENT_MODEL.version,
      generatedAt: new Date().toISOString(),
      taxonomy: taxonomy,
      products: productData,
      fabrics: FABRICS,
      fabricCollections: FABRIC_COLLECTIONS,
      woods: WOODS,
      structures: STRUCTURES,
      bases: this.loadBases(),
      applications: APPLICATIONS,
      materials: MATERIALS,
      shapes: SHAPES,
      collections: this.loadCollections()
    };
  }
};

/* ── Connection-adaptive image helper (mobile/perf hardening) ────────
   Rewrites Unsplash `w=`/`h=` query params to match the rendered size and
   the visitor's connection class, so phones on 3g/2g pull smaller bytes
   while desktops on fibre keep full fidelity. Falls through unchanged for
   non-parametric URLs (e.g. local /assets PNGs).                            */
function _effectiveConnection() {
  try { return (typeof navigator !== 'undefined' && navigator && navigator.connection && navigator.connection.effectiveType) || null; }
  catch (e) { return null; }
}
function _connCap() {
  var c = _effectiveConnection();
  if (c === 'slow-2g' || c === '2g') return 320;
  if (c === '3g') return 480;
  if (c === '4g') return 900;
  return 0; // unknown / wifi → don't downscale
}
function imgFor(url, sizeHint = 700) {
  if (!url || url.indexOf('images.unsplash.com') < 0) return url;
  var cap = _connCap();
  var w = Math.min(sizeHint, cap || sizeHint);
  try {
    var u = new URL(url);
    u.searchParams.set('w', String(w));
    u.searchParams.set('h', String(w));
    return u.toString();
  } catch (e) {
    return url.replace(/([?&]w=)\d+/, '$1' + w).replace(/([?&]h=)\d+/, '$1' + w);
  }
}
