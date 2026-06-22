/* ════════════════════════════════════════════════════════════════════════
   MMA Design — Procedural Material Textures  (catalogue expansion)
   Generates canvas-based weave, grain and sheen textures for the fabric,
   wood and metal swatches so they read as real material samples — not flat
   hex fills. Loaded as a classic script before each page's own logic.
   `materialTexture(type, hex)` returns a cached data URL.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  var _cache = {};
  var _canvases = {};

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    return { r: parseInt(hex.slice(0,2),16), g: parseInt(hex.slice(2,4),16), b: parseInt(hex.slice(4,6),16) };
  }
  function rgbStr(r, g, b, a) { return a != null ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgb(' + r + ',' + g + ',' + b + ')'; }
  function shift(c, dr, dg, db) { return { r: Math.max(0,Math.min(255,c.r+dr)), g: Math.max(0,Math.min(255,c.g+dg)), b: Math.max(0,Math.min(255,c.b+db)) }; }

  function makeCanvas(size) { var c = document.createElement('canvas'); c.width = size; c.height = size; return c; }

  // ── Wool Felt: dense cross-hatch fibre pattern, matte ──
  function woolFelt(hex) {
    var c = makeCanvas(72), x = c.getContext('2d'), base = hexToRgb(hex);
    x.fillStyle = rgbStr(base.r, base.g, base.b); x.fillRect(0, 0, 72, 72);
    // fine fibre cross-hatch
    x.globalAlpha = 0.08;
    x.strokeStyle = rgbStr(base.r + 30, base.g + 30, base.b + 30);
    x.lineWidth = 0.5;
    for (var i = -72; i < 72; i += 3) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 72, 72); x.stroke(); }
    x.strokeStyle = rgbStr(base.r - 25, base.g - 25, base.b - 25);
    for (var j = -72; j < 72; j += 4) { x.beginPath(); x.moveTo(j + 72, 0); x.lineTo(j, 72); x.stroke(); }
    // subtle noise
    x.globalAlpha = 0.04;
    for (var n = 0; n < 200; n++) { x.fillStyle = Math.random() > 0.5 ? '#fff' : '#000'; x.fillRect(Math.random()*72, Math.random()*72, 1, 1); }
    return c.toDataURL();
  }

  // ── Bouclé: visible loop texture ──
  function boucle(hex) {
    var c = makeCanvas(72), x = c.getContext('2d'), base = hexToRgb(hex);
    x.fillStyle = rgbStr(base.r, base.g, base.b); x.fillRect(0, 0, 72, 72);
    var lo = shift(base, -20, -20, -20), hi = shift(base, 25, 25, 25);
    // loop dots
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 6; col++) {
        var cx = col * 12 + (row % 2 ? 6 : 0), cy = row * 12 + 6;
        x.globalAlpha = 0.25; x.fillStyle = rgbStr(hi.r, hi.g, hi.b);
        x.beginPath(); x.arc(cx - 1, cy - 1, 4, 0, Math.PI * 2); x.fill();
        x.globalAlpha = 0.18; x.fillStyle = rgbStr(lo.r, lo.g, lo.b);
        x.beginPath(); x.arc(cx + 1, cy + 1, 3, 0, Math.PI * 2); x.fill();
      }
    }
    x.globalAlpha = 1;
    return c.toDataURL();
  }

  // ── Cotton Velvet: directional sheen gradient ──
  function velvet(hex) {
    var c = makeCanvas(72), x = c.getContext('2d'), base = hexToRgb(hex);
    var hi = shift(base, 40, 40, 40), lo = shift(base, -30, -30, -30);
    var grad = x.createLinearGradient(0, 0, 72, 72);
    grad.addColorStop(0, rgbStr(hi.r, hi.g, hi.b));
    grad.addColorStop(0.35, rgbStr(base.r, base.g, base.b));
    grad.addColorStop(0.7, rgbStr(lo.r, lo.g, lo.b));
    grad.addColorStop(1, rgbStr(base.r, base.g, base.b));
    x.fillStyle = grad; x.fillRect(0, 0, 72, 72);
    // fine vertical pile
    x.globalAlpha = 0.06;
    for (var i = 0; i < 72; i += 1) { x.fillStyle = i % 2 ? '#fff' : '#000'; x.fillRect(i, 0, 0.5, 72); }
    x.globalAlpha = 1;
    return c.toDataURL();
  }

  // ── Aniline Leather: organic grain mottling, semi-gloss ──
  function anilineLeather(hex) {
    var c = makeCanvas(72), x = c.getContext('2d'), base = hexToRgb(hex);
    x.fillStyle = rgbStr(base.r, base.g, base.b); x.fillRect(0, 0, 72, 72);
    // mottled grain
    x.globalAlpha = 0.12;
    for (var i = 0; i < 80; i++) {
      var cx = Math.random() * 72, cy = Math.random() * 72, r = Math.random() * 6 + 2;
      var d = shift(base, Math.random() > 0.5 ? 20 : -20, Math.random() > 0.5 ? 20 : -20, Math.random() > 0.5 ? 20 : -20);
      x.fillStyle = rgbStr(d.r, d.g, d.b); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();
    }
    // subtle gloss highlight
    x.globalAlpha = 0.06;
    var gloss = x.createRadialGradient(24, 20, 2, 24, 20, 40);
    gloss.addColorStop(0, '#fff'); gloss.addColorStop(1, 'transparent');
    x.fillStyle = gloss; x.fillRect(0, 0, 72, 72);
    x.globalAlpha = 1;
    return c.toDataURL();
  }

  // ── Wood: grain pattern with growth rings ──
  function woodGrain(hex) {
    var c = makeCanvas(72), x = c.getContext('2d'), base = hexToRgb(hex);
    x.fillStyle = rgbStr(base.r, base.g, base.b); x.fillRect(0, 0, 72, 72);
    var lo = shift(base, -15, -12, -8), hi = shift(base, 12, 10, 6);
    // horizontal grain lines
    x.globalAlpha = 0.15;
    for (var i = 0; i < 72; i += 2) {
      var wave = Math.sin(i * 0.08) * 3;
      x.strokeStyle = i % 4 === 0 ? rgbStr(lo.r, lo.g, lo.b) : rgbStr(hi.r, hi.g, hi.b);
      x.lineWidth = 0.6;
      x.beginPath(); x.moveTo(0, i + wave); x.lineTo(72, i + wave + 1); x.stroke();
    }
    // a couple of knots
    x.globalAlpha = 0.1;
    x.fillStyle = rgbStr(lo.r, lo.g, lo.b);
    x.beginPath(); x.arc(20, 30, 3, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.arc(54, 52, 2, 0, Math.PI * 2); x.fill();
    x.globalAlpha = 1;
    return c.toDataURL();
  }

  // ── Metal: brushed vertical lines with gloss ──
  function metalBrushed(hex) {
    var c = makeCanvas(72), x = c.getContext('2d'), base = hexToRgb(hex);
    x.fillStyle = rgbStr(base.r, base.g, base.b); x.fillRect(0, 0, 72, 72);
    // vertical brush
    x.globalAlpha = 0.06;
    for (var i = 0; i < 72; i += 1) { x.fillStyle = i % 3 === 0 ? '#fff' : (i % 3 === 1 ? '#000' : 'transparent'); x.fillRect(i, 0, 0.5, 72); }
    // gloss highlight
    x.globalAlpha = 0.1;
    var gloss = x.createLinearGradient(0, 0, 72, 0);
    gloss.addColorStop(0, 'transparent'); gloss.addColorStop(0.45, '#fff'); gloss.addColorStop(0.55, '#fff'); gloss.addColorStop(1, 'transparent');
    x.fillStyle = gloss; x.fillRect(0, 0, 72, 72);
    x.globalAlpha = 1;
    return c.toDataURL();
  }

  // Map fabric collection → texture function
  var fabricTexFn = {
    'wool-felt': woolFelt,
    'boucle': boucle,
    'velvet': velvet,
    'aniline-leather': anilineLeather
  };

  // Public API: materialTexture(type, hex) → data URL
  // type: 'wool-felt'|'boucle'|'velvet'|'aniline-leather'|'wood'|'metal'
  window.materialTexture = function (type, hex) {
    var key = type + '|' + hex;
    if (_cache[key]) return _cache[key];
    var fn = fabricTexFn[type] || (type === 'wood' ? woodGrain : (type === 'metal' ? metalBrushed : null));
    if (!fn) return null;
    try { _cache[key] = fn(hex); return _cache[key]; }
    catch (e) { return null; }
  };

  // Convenience: resolve a fabric's texture from its collection + value
  window.fabricTexture = function (fabric) {
    if (!fabric) return null;
    return window.materialTexture(fabric.collection, fabric.value);
  };
  // Convenience: resolve a wood's texture
  window.woodTexture = function (wood) {
    if (!wood) return null;
    return window.materialTexture('wood', wood.value);
  };
  // Convenience: resolve a structure finish texture
  window.structureTexture = function (structure) {
    if (!structure) return null;
    return window.materialTexture('metal', structure.value);
  };
})();
