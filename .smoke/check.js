const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// ── 1. syntax check every inline script ──
const files = ['index.html', 'office-designer.html', '3d-studio.html'];
for (const f of files) {
  const html = fs.readFileSync(path.join(root, f), 'utf8');
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map(m => m[1]).filter(s => s.trim().length > 0);
  scripts.forEach((s, i) => {
    new Function(s);
    console.log(`SYNTAX OK  ${f} script#${i}`);
  });
  // r128 guard: numeric sheen and colour-texture normal maps must be gone
  if (/sheen\s*[:=]\s*[\d.]/.test(html)) throw new Error(f + ': numeric sheen still present (invalid in three r128)');
  if (/normalMap:\s*l?tex/.test(html)) throw new Error(f + ': colour texture still wired as normalMap');
}
if (/setProperty\('--gold'/.test(fs.readFileSync(path.join(root, 'index.html'), 'utf8')))
  throw new Error('index.html: gold hue-shift handler still present');

// ── 2. runtime stubs ──
const anything = new Proxy(function(){}, {
  get(t, p) {
    if (p === Symbol.toPrimitive) return () => 0;
    if (p === 'then' || p === Symbol.iterator || p === Symbol.toStringTag) return undefined;
    return anything;
  },
  set() { return true; }, apply() { return anything; }, construct() { return anything; },
});
function makeEl() {
  return {
    innerHTML: '', textContent: '', value: '', style: { setProperty(){} }, dataset: {}, download: '', href: '',
    classList: { add(){}, remove(){}, toggle(){} },
    addEventListener(){}, scrollIntoView(){}, click(){},
    querySelector(){ return makeEl(); }, querySelectorAll(){ return []; },
    getContext(){ return anything; }, toDataURL(){ return 'data:'; },
  };
}
function makeDoc() {
  const elements = {};
  return {
    getElementById(id){ return elements[id] || (elements[id] = makeEl()); },
    createElement(){ return makeEl(); }, querySelectorAll(){ return []; }, addEventListener(){},
  };
}

// ── 3. office designer: studio import incl. base mapping + all presets/bases ──
{
  const html = fs.readFileSync(path.join(root, 'office-designer.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const store = { mmaStudioConfig: JSON.stringify({ model:'chair-conference', base:'L14', upholstery:'navy', topColor:'navy', wood:'ash-oak', structure:'chrome' }) };
  const win = { innerWidth: 1400, innerHeight: 900, location: { href: 'http://x/?fromStudio=1', search: '?fromStudio=1' }, addEventListener(){} };
  const driver = `
;if (state.chairModel !== 'sled') throw new Error('chair model import broken');
if (state.chairBase !== 'legs') throw new Error('chair BASE import broken: ' + state.chairBase);
if (state.structure !== 'chrome' || state.upholstery !== 'navy') throw new Error('finish import broken');
presets.forEach(function(p) { selectPreset(p.id); });
chairBases.forEach(function(b) { selectChairBase(b.id); });
['task','executive','sled','lounge'].forEach(function(m) {
  selectChairModel(m);
  chairBases.forEach(function(b) { selectChairBase(b.id); }); // every model x base combo
});
['linear','trestle','executive'].forEach(selectDeskModel);
sofaStyles.forEach(function(s){ selectSofaStyle(s.id); });
tableStyles.forEach(function(t){ selectTableStyle(t.id); });
colourSwatches.forEach(function(c){ selectUpholstery(c.id); });
structureFinishes.forEach(function(s){ selectStructure(s.id); });
shareConfig();
console.log('OFFICE RUNTIME OK (' + presets.length + ' presets, ' + chairBases.length + ' bases, ' + sofaStyles.length + ' sofas, ' + tableStyles.length + ' table styles)');
`;
  new Function('window','document','navigator','localStorage','THREE','gsap','requestAnimationFrame','setTimeout','clearTimeout', src + driver)(
    win, makeDoc(), { clipboard: { writeText(){ return Promise.resolve(); } } },
    { getItem(k){ return store[k]||null; }, setItem(k,v){ store[k]=v; } },
    anything, anything, ()=>0, ()=>0, ()=>{});
}

// ── 3b. office designer: sofa/table products import onto their counterparts ──
{
  const html = fs.readFileSync(path.join(root, 'office-designer.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const store = { mmaStudioConfig: JSON.stringify({ model:'sofa-bench', base:'L32', upholstery:'terracotta', wood:'medium-walnut', structure:'bronze' }) };
  const win = { innerWidth: 1400, innerHeight: 900, location: { href: 'http://x/?fromStudio=1', search: '?fromStudio=1' }, addEventListener(){} };
  const driver = `
;if (state.sofaStyle !== 'bench') throw new Error('sofa style import broken: ' + state.sofaStyle);
if (state.preset !== 'reception') throw new Error('sofa preset routing broken: ' + state.preset);
if (state.upholstery !== 'terracotta') throw new Error('sofa upholstery import broken');
console.log('SOFA IMPORT OK (bench -> reception)');
`;
  new Function('window','document','navigator','localStorage','THREE','gsap','requestAnimationFrame','setTimeout','clearTimeout', src + driver)(
    win, makeDoc(), { clipboard: { writeText(){ return Promise.resolve(); } } },
    { getItem(k){ return store[k]||null; }, setItem(k,v){ store[k]=v; } },
    anything, anything, ()=>0, ()=>0, ()=>{});
}

// ── 4. studio: all products x bases still build, config persists ──
{
  const html = fs.readFileSync(path.join(root, '3d-studio.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const store = {};
  const win = { innerWidth: 1400, innerHeight: 900, location: { href: 'http://x/', search: '' }, addEventListener(){} };
  const driver = `
;products.forEach(function(p) {
  selectProduct(p.id);
  if (p.bases.length === 0) buildFurniture();
  else p.bases.forEach(function(b) { selectBase(b); });
});
colourSwatches.forEach(function(c){ selectUpholstery(c.id); });
structureFinishes.forEach(function(s){ selectStructure(s.id); });
woodFinishes.forEach(function(w){ selectWood(w.id); });
if (!window.__store.mmaStudioConfig) throw new Error('persist broken');
console.log('STUDIO RUNTIME OK');
`;
  win.__store = store;
  new Function('window','document','navigator','localStorage','THREE','gsap','requestAnimationFrame','setTimeout','clearTimeout', src + driver)(
    win, makeDoc(), { clipboard: { writeText(){ return Promise.resolve(); } } },
    { getItem(k){ return store[k]||null; }, setItem(k,v){ store[k]=v; } },
    anything, anything, ()=>0, ()=>0, ()=>{});
}

// shared data layer (loaded as a classic <script src> by every page)
const catalogueSrc = fs.readFileSync(path.join(root, 'data', 'catalogue.js'), 'utf8');

// ── 5. index: full script executes with delegated handlers ──
{
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const doc = makeDoc();
  doc.querySelectorAll = () => [makeEl(), makeEl()];
  doc.querySelector = () => makeEl();
  class IO { constructor(){} observe(){} unobserve(){} }
  new Function('window','document','IntersectionObserver','setInterval','requestAnimationFrame', catalogueSrc + ';' + src + ';console.log("INDEX RUNTIME OK");')(
    { innerWidth: 1400, innerHeight: 900, addEventListener(){}, scrollTo(){}, scrollY: 0, pageYOffset: 0, open(){}, location:{ href:'http://x/' }, requestAnimationFrame: ()=>0 },
    doc, IO, ()=>0, ()=>0);
}

// ── 6. Phase 4: graded fabrics, variant options & validation (data layer) ──
{
  const api = new Function(catalogueSrc + `
    return { fabricsForModel, fabricGroupsForModel, gradeCeiling, defaultOptions,
      optionGroups, optionChoice, sanitiseOptions, FABRICS, FABRIC_COLLECTIONS,
      GRADE_LABEL, PRODUCT_OPTIONS };`)();

  // every fabric carries a collection + grade
  api.FABRICS.forEach(f => {
    if (!api.FABRIC_COLLECTIONS[f.collection]) throw new Error('fabric ' + f.id + ' has unknown collection');
    if (![2,3,4].includes(f.grade)) throw new Error('fabric ' + f.id + ' bad grade');
  });

  // grade ceiling actually filters: bench (G2) must drop every leather (G4)
  const bench = api.fabricsForModel('sofa-bench');
  if (bench.some(f => f.grade > 2)) throw new Error('bench offered above-grade fabric');
  if (!bench.length) throw new Error('bench has no fabrics');
  const exec = api.fabricsForModel('chair-executive');
  if (!exec.some(f => f.grade === 4)) throw new Error('executive missing signature grade');
  const conf = api.fabricsForModel('chair-conference');
  if (conf.some(f => f.grade > 3)) throw new Error('conference offered above-grade fabric');

  // groups: top grade first, only non-empty
  const eg = api.fabricGroupsForModel('chair-executive');
  if (eg[0].grade < eg[eg.length-1].grade) throw new Error('fabric groups not sorted by grade desc');
  if (eg.some(g => !g.swatches.length)) throw new Error('empty fabric group leaked');

  // option defaults + validation
  const def = api.defaultOptions('chair-executive');
  if (def.arms !== 'adjustable' || def.headrest !== 'yes') throw new Error('exec option defaults wrong');
  const cleaned = api.sanitiseOptions('chair-executive', { arms:'none', headrest:'BOGUS' });
  if (cleaned.arms !== 'none' || cleaned.headrest !== 'yes') throw new Error('sanitiseOptions failed to validate');
  const sz = api.optionChoice('table-boardroom', 'size', 'sixteen');
  if (!sz || sz.scaleX <= 1) throw new Error('boardroom size choice missing scaleX');
  if (Object.keys(api.defaultOptions('storage-wall')).length) throw new Error('storage-wall should have no options');
  console.log('PHASE4 DATA OK (grade ceilings, groups, option defaults & validation)');
}

// ── 7. Phase 4: product.html renders graded palette + options, carries opt_ params ──
{
  const html = fs.readFileSync(path.join(root, 'product.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const store = {};
  const captured = { configureHref: '' };
  const doc = makeDoc();
  // configureBtn href is what carries the live config into the studio
  const realGet = doc.getElementById;
  doc.getElementById = (id) => {
    const el = realGet(id);
    if (id === 'configureBtn') Object.defineProperty(el, 'href', { set(v){ captured.configureHref = v; }, get(){ return captured.configureHref; }, configurable:true });
    return el;
  };
  doc.querySelectorAll = () => [];
  const loc = { href:'http://x/product.html?id=5', search:'?id=5' };
  const win = { innerWidth: 1400, location: loc, addEventListener(){}, _shareState:null };
  new Function('window','document','navigator','localStorage','location', catalogueSrc + ';' + src + `
    ;if (document.getElementById('configureBtn').href.indexOf('model=table-boardroom') < 0) throw new Error('configure link missing model');
    if (document.getElementById('configureBtn').href.indexOf('opt_size=') < 0) throw new Error('configure link missing variant option');
    console.log('PHASE4 PRODUCT OK (graded palette + option carry-through)');`)(
    win, doc, { clipboard:{ writeText(){ return Promise.resolve(); } } },
    { getItem(k){ return store[k]||null; }, setItem(k,v){ store[k]=v; } }, loc);
}
// ── 8. Phase 4: studio honours & sanitises a deep-link (grade + options) ──
{
  const html = fs.readFileSync(path.join(root, '3d-studio.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const store = {};
  // bench is Grade 2 only; charcoal is a Grade 4 leather → must be rejected & snapped
  const search = '?model=sofa-bench&upholstery=charcoal&opt_size=long';
  const win = { innerWidth: 1400, innerHeight: 900, location: { href: 'http://x/' + search, search }, addEventListener(){}, __store: store };
  const driver = `
;if (state.model !== 'sofa-bench') throw new Error('deep-link model ignored');
if (state.upholstery === 'charcoal') throw new Error('out-of-grade fabric was NOT sanitised');
if (gradeCeilingFor(state.model) !== 2) throw new Error('bench grade ceiling wrong');
var sw = colourSwatches.find(function(s){ return s.id === state.upholstery; });
if (!sw || sw.grade > 2) throw new Error('snapped fabric still above grade');
if (state.options.size !== 'long') throw new Error('variant option not carried from deep-link');
if (buildSKU().indexOf('B1') < 0) throw new Error('SKU missing option code');
console.log('PHASE4 STUDIO DEEP-LINK OK (grade snap + option carry + SKU)');
`;
  new Function('window','document','navigator','localStorage','THREE','gsap','requestAnimationFrame','setTimeout','clearTimeout', src + driver)(
    win, makeDoc(), { clipboard: { writeText(){ return Promise.resolve(); } } },
    { getItem(k){ return store[k]||null; }, setItem(k,v){ store[k]=v; } },
    anything, anything, ()=>0, ()=>0, ()=>{});
}
console.log('ALL CHECKS PASSED');
