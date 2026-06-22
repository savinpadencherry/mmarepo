const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

// ── 1. syntax check every inline script ──
const files = ['index.html', 'office-designer.html', '3d-studio.html', 'catalogue.html', 'product.html', 'brand-guideline.html', 'cms.html'];
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
// ── 9. Phase 5: shared brand system (brand.css + inline SVG logo) ──
{
  const brand = fs.readFileSync(path.join(root, 'assets', 'brand.css'), 'utf8');
  ['--gold','--gold-light','--gold-dark','--dark','--bg','--bg-warm','--font-display','--font-body','--ease-out','--radius-lg'].forEach(t => {
    if (brand.indexOf(t) < 0) throw new Error('brand.css missing token ' + t);
  });
  if (!/\.mma-logo\b/.test(brand)) throw new Error('brand.css missing .mma-logo system');
  if (!/prefers-reduced-motion/.test(brand)) throw new Error('brand.css missing reduced-motion policy');
  if (!/content-visibility:\s*auto/.test(brand)) throw new Error('brand.css missing cv-auto perf primitive');
  if (!/\.quality-badge/.test(brand)) throw new Error('brand.css missing quality-badge styles');
  ['index.html','catalogue.html','product.html','3d-studio.html','office-designer.html','brand-guideline.html','cms.html'].forEach(f => {
    const html = fs.readFileSync(path.join(root, f), 'utf8');
    if (html.indexOf('assets/brand.css') < 0) throw new Error(f + ' does not link assets/brand.css');
    if (html.indexOf('mma-mark') < 0) throw new Error(f + ' missing inline SVG mma-mark logo');
    if (html.indexOf('www.mmadesign.in/assets/images/logo') >= 0) throw new Error(f + ' still depends on the fragile external logo host');
  });
  console.log('PHASE5 BRAND OK (brand.css tokens + logo + reduced-motion + cv-auto, linked on 7 pages, no external logo)');
}

// ── 9b. Procedural material textures (catalogue expansion) ──
{
  const tex = fs.readFileSync(path.join(root, 'assets', 'textures.js'), 'utf8');
  new Function('window', 'document', tex + ';return window.materialTexture;')({}, { createElement: function(){ return { width:0, height:0, getContext: function(){ return { fillRect:function(){},beginPath:function(){},arc:function(){},fill:function(){},stroke:function(){},moveTo:function(){},lineTo:function(){},createLinearGradient:function(){ return { addColorStop:function(){} }; },createRadialGradient:function(){ return { addColorStop:function(){} }; },fillStyle:'',strokeStyle:'',globalAlpha:1,lineWidth:1 }; }, toDataURL: function(){ return 'data:'; } }; } });
  // syntax + API presence
  const api = new Function('window', 'document', tex + ';return { materialTexture: window.materialTexture, fabricTexture: window.fabricTexture, woodTexture: window.woodTexture, structureTexture: window.structureTexture };')({}, { createElement: function(){ return { width:0, height:0, getContext: function(){ return { fillRect:function(){},beginPath:function(){},arc:function(){},fill:function(){},stroke:function(){},moveTo:function(){},lineTo:function(){},createLinearGradient:function(){ return { addColorStop:function(){} }; },createRadialGradient:function(){ return { addColorStop:function(){} }; },fillStyle:'',strokeStyle:'',globalAlpha:1,lineWidth:1 }; }, toDataURL: function(){ return 'data:'; } }; } });
  if (typeof api.materialTexture !== 'function') throw new Error('textures.js: materialTexture not exposed');
  if (typeof api.fabricTexture !== 'function') throw new Error('textures.js: fabricTexture not exposed');
  if (typeof api.woodTexture !== 'function') throw new Error('textures.js: woodTexture not exposed');
  ['3d-studio.html','product.html'].forEach(f => {
    const html = fs.readFileSync(path.join(root, f), 'utf8');
    if (html.indexOf('assets/textures.js') < 0) throw new Error(f + ' does not load assets/textures.js');
    if (!/materialTexture|fabricTexture|woodTexture|structureTexture/.test(html)) throw new Error(f + ' does not use procedural texture API');
  });
  console.log('TEXTURES OK (procedural weave/grain/sheen, loaded by studio + product page)');
}

// ── 10. Phase 5: CMS-ready content model ──
{
  const src = fs.readFileSync(path.join(root, 'data', 'catalogue.js'), 'utf8');
  const api = new Function(src + ';return {CMS,CONTENT_MODEL,validateProduct,validateAll,imgFor};')();
  if (api.CONTENT_MODEL.version !== 5) throw new Error('content model version not 5');
  if (!api.CONTENT_MODEL.product.fields.id) throw new Error('content model missing product schema');
  if (typeof api.CMS.fetchProducts !== 'function') throw new Error('CMS.fetchProducts missing');
  if (typeof api.CMS.fetchProducts().then !== 'function') throw new Error('fetchProducts is not promise-returning');
  if (api.CMS.loadProducts().length < 40) throw new Error('seed product count below the 40-SKU target');
  const all = api.validateAll();
  if (!all.valid) throw new Error('seed products fail validation: ' + JSON.stringify(all.products));
  const bad = api.validateProduct({ id: 1 });
  if (bad.valid) throw new Error('validateProduct accepted an incomplete product');
  const ok = api.CMS.upsertProduct({ id:99, name:'T', group:'seating', sub:'executive-chairs', category:'x', cat:'y', shape:'curved', studioModel:'chair-executive', materialType:'upholstery', desc:'d', dims:{w:1,d:1,h:1}, meta:'m', lead:'l', features:['f'] });
  if (!ok.ok) throw new Error('upsert rejected a valid product');
  const no = api.CMS.upsertProduct({ id:99 });
  if (no.ok) throw new Error('upsert accepted an invalid product');
  api.CMS.resetOverrides();
  if (api.imgFor('https://images.unsplash.com/x?w=900&h=900', 700).indexOf('w=') < 0) throw new Error('imgFor did not rewrite an unsplash url');
  if (api.imgFor('assets/foo.png', 700) !== 'assets/foo.png') throw new Error('imgFor should pass through local urls');
  const json = JSON.parse(fs.readFileSync(path.join(root, 'data', 'products.json'), 'utf8'));
  if (json.products.length < 40) throw new Error('products.json product count below the 40-SKU target');
  if (json.model !== 5) throw new Error('products.json model version mismatch');
  console.log('PHASE5 CMS OK (schema v5, adapter, validation, upsert, imgFor, products.json)');
}

// ── 10b. Catalogue expansion: 40-50 SKUs, every product validates, has image + SVG ──
{
  const src = fs.readFileSync(path.join(root, 'data', 'catalogue.js'), 'utf8');
  const api = new Function(src + ';return {productData,validateAll,productImages,productSVGs,productImagesAlt,COLLECTIONS};')();
  if (api.productData.length < 40 || api.productData.length > 50) throw new Error('catalogue should have 40-50 SKUs, has ' + api.productData.length);
  const report = api.validateAll();
  if (!report.valid) throw new Error('expanded catalogue validation failed: ' + JSON.stringify(report.products.slice(0,3)));
  // unique ids
  const ids = api.productData.map(p => p.id);
  if (new Set(ids).size !== ids.length) throw new Error('duplicate product ids in catalogue');
  // every product has an image, alt image, and SVG (via fallback logic)
  const noImg = api.productData.filter(p => !api.productImages[p.name]);
  const noAlt = api.productData.filter(p => !api.productImagesAlt[p.name]);
  const noSvg = api.productData.filter(p => !api.productSVGs[p.name]);
  if (noImg.length) throw new Error(noImg.length + ' products missing hero image');
  if (noAlt.length) throw new Error(noAlt.length + ' products missing alt image');
  if (noSvg.length) throw new Error(noSvg.length + ' products missing schematic SVG');
  // every product maps to a real collection
  const noCol = api.productData.filter(p => !p.collection || !api.COLLECTIONS[p.collection]);
  if (noCol.length) throw new Error(noCol.length + ' products missing or invalid collection');
  console.log('CATALOGUE EXPANSION OK (' + api.productData.length + ' SKUs, all validated, images + SVGs + collections resolved)');
}

// ── 11. Phase 5: adaptive 3D quality + reduced-motion ──
{
  ['3d-studio.html','office-designer.html'].forEach(f => {
    const html = fs.readFileSync(path.join(root, f), 'utf8');
    if (!/function detectQuality/.test(html)) throw new Error(f + ' missing detectQuality');
    if (!/QUALITY_TIERS/.test(html)) throw new Error(f + ' missing QUALITY_TIERS');
    if (!/qualityCfg\.shadowMap/.test(html)) throw new Error(f + ' shadows not quality-scaled');
    if (!/qualityCfg\.pixelRatio/.test(html)) throw new Error(f + ' pixel ratio not quality-scaled');
    if (html.indexOf('quality-badge') < 0) throw new Error(f + ' missing quality-badge element');
    if (html.indexOf('prefers-reduced-motion') < 0) throw new Error(f + ' quality tier ignores reduced-motion');
  });
  // runtime: studio detectQuality returns a valid tier and tiers are complete
  const html = fs.readFileSync(path.join(root, '3d-studio.html'), 'utf8');
  const src = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim())[0];
  const store = {};
  const win = { innerWidth: 1400, innerHeight: 900, location: { href: 'http://x/', search: '' }, addEventListener(){}, __store: store };
  new Function('window','document','navigator','localStorage','THREE','gsap','requestAnimationFrame','setTimeout','clearTimeout', src + `
    ;if (['high','medium','low'].indexOf(detectQuality()) < 0) throw new Error('detectQuality returned an invalid tier');
    if (Object.keys(QUALITY_TIERS).length !== 3) throw new Error('expected 3 quality tiers');
    if (!QUALITY_TIERS[qualityTier]) throw new Error('active tier has no config');
    console.log('PHASE5 ADAPTIVE OK (tier=' + qualityTier + ', shadows=' + QUALITY_TIERS[qualityTier].shadowMap + ', antialias=' + QUALITY_TIERS[qualityTier].antialias + ')');
  `)(win, makeDoc(), { clipboard:{ writeText(){return Promise.resolve();} } }, { getItem(k){return store[k]||null;}, setItem(k,v){store[k]=v;} }, anything, anything, ()=>0, ()=>0, ()=>{});
}

// ── 12. Phase 5: index.html mobile/perf hardening ──
{
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (html.indexOf('cv-auto') < 0) throw new Error('index.html missing content-visibility sections');
  if (html.indexOf('prefers-reduced-motion') < 0) throw new Error('index.html missing reduced-motion guard');
  if (!/imgFor\(/.test(html)) throw new Error('index.html not using connection-adaptive images');
  if (!/decoding="async"/.test(html)) throw new Error('index.html missing async image decoding');
  if (!/touchend/.test(html)) throw new Error('index.html missing touch-swipe interaction');
  console.log('PHASE5 INDEX PERF OK (cv-auto, reduced-motion, adaptive images, async decoding, touch swipe)');
}

// ── 13. AWS hosting + lead capture infrastructure ──
{
  // site-config.js
  const cfg = fs.readFileSync(path.join(root, 'data', 'site-config.js'), 'utf8');
  new Function(cfg); // syntax check
  if (cfg.indexOf('API_ENDPOINT') < 0) throw new Error('site-config.js missing API_ENDPOINT');
  if (cfg.indexOf('NOTIFY_EMAIL') < 0) throw new Error('site-config.js missing NOTIFY_EMAIL');
  if (cfg.indexOf('offices') < 0) throw new Error('site-config.js missing offices array');

  // Lambda handler
  const lambda = fs.readFileSync(path.join(root, 'infra', 'lambda', 'lead-capture.js'), 'utf8');
  new Function('require', 'exports', lambda); // syntax check
  if (lambda.indexOf('exports.handler') < 0) throw new Error('lead-capture.js missing handler export');
  if (lambda.indexOf('SES') < 0) throw new Error('lead-capture.js missing SES email');
  if (lambda.indexOf('DynamoDB') < 0) throw new Error('lead-capture.js missing DynamoDB storage');

  // CloudFormation template
  const cf = fs.readFileSync(path.join(root, 'infra', 'cloudformation.yaml'), 'utf8');
  if (cf.indexOf('AWS::S3::Bucket') < 0) throw new Error('cloudformation.yaml missing S3 bucket');
  if (cf.indexOf('AWS::CloudFront::Distribution') < 0) throw new Error('cloudformation.yaml missing CloudFront');
  if (cf.indexOf('AWS::Lambda::Function') < 0) throw new Error('cloudformation.yaml missing Lambda');
  if (cf.indexOf('AWS::ApiGateway::RestApi') < 0) throw new Error('cloudformation.yaml missing API Gateway');
  if (cf.indexOf('AWS::DynamoDB::Table') < 0) throw new Error('cloudformation.yaml missing DynamoDB');

  // Deploy script
  if (!fs.existsSync(path.join(root, 'infra', 'deploy.ps1'))) throw new Error('deploy.ps1 missing');

  // index.html: form wired to API, loads site-config.js
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (html.indexOf('site-config.js') < 0) throw new Error('index.html does not load site-config.js');
  if (!/enquirySubmit/.test(html)) throw new Error('index.html enquiry form not wired');
  if (!/SITE_CONFIG\.API_ENDPOINT/.test(html)) throw new Error('index.html form does not read API_ENDPOINT');
  if (!/fetch\(endpoint/.test(html)) throw new Error('index.html form does not POST to the API');

  console.log('INFRASTRUCTURE OK (site-config, Lambda+SES+DynamoDB, CloudFormation, deploy script, form wired)');
}

console.log('ALL CHECKS PASSED');
