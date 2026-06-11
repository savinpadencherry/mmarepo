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
    innerHTML: '', textContent: '', style: { setProperty(){} }, dataset: {}, download: '', href: '',
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
colourSwatches.forEach(function(c){ selectUpholstery(c.id); });
structureFinishes.forEach(function(s){ selectStructure(s.id); });
shareConfig();
console.log('OFFICE RUNTIME OK (' + presets.length + ' presets, ' + chairBases.length + ' bases)');
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

// ── 5. index: full script executes with delegated handlers ──
{
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const doc = makeDoc();
  doc.querySelectorAll = () => [makeEl(), makeEl()];
  doc.querySelector = () => makeEl();
  class IO { constructor(){} observe(){} unobserve(){} }
  new Function('window','document','IntersectionObserver','setInterval','requestAnimationFrame', src + ';console.log("INDEX RUNTIME OK");')(
    { innerWidth: 1400, innerHeight: 900, addEventListener(){}, scrollTo(){}, scrollY: 0, pageYOffset: 0, open(){}, location:{ href:'http://x/' }, requestAnimationFrame: ()=>0 },
    doc, IO, ()=>0, ()=>0);
}
console.log('ALL CHECKS PASSED');
