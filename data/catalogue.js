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
    features: ['Bar-height round top', 'Weighted stable column', 'Optional footrest ring', 'Flush power option', 'Stand-up meeting spaces'] }
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
  12: ['Circular','Height Adj','Standing','Power']
};
productData.forEach(p => { p.tags = productTags[p.id] || []; });

const productById = id => productData.find(p => String(p.id) === String(id));

// ── Material palettes (ids match 3d-studio.html for seamless deep-linking) ──
const FABRICS = [
  { id:'charcoal',   name:'Charcoal',   value:'#1C1C19', type:'Aniline Leather' },
  { id:'camel',      name:'Camel',      value:'#C19A6B', type:'Aniline Leather' },
  { id:'cognac',     name:'Cognac',     value:'#9A4F2A', type:'Aniline Leather' },
  { id:'emerald',    name:'Emerald',    value:'#123524', type:'Wool Felt' },
  { id:'navy',       name:'Navy',       value:'#1B2838', type:'Wool Felt' },
  { id:'ivory',      name:'Ivory',      value:'#FAF8F0', type:'Bouclé' },
  { id:'terracotta', name:'Terracotta', value:'#C36241', type:'Wool Felt' },
  { id:'oxblood',    name:'Oxblood',    value:'#7A1C1C', type:'Velvet' }
];

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
