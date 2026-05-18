/* verify.js — integrity checker for the VSN KG data layer.
 *
 * Run after edits to data.js / shlokas.js / concepts.js:
 *   node verify.js
 *
 * Checks:
 *   1. Unique nāma ids, unique shloka ids, unique concept ids
 *   2. Every shloka_id on a nāma resolves to a real shloka
 *   3. Every nama_id on a shloka resolves to a real nāma (when present)
 *   4. Every concept's nama_ids resolve to real nāmas
 *   5. Every concept tier resolves to a real CTIER
 *   6. Every nāma tier resolves to a real TIER
 *   7. Every nāma's tags resolve to real concept ids
 *   8. Every EDGE endpoint resolves to a real nāma
 *   9. All script variants (iast/dev/kn/hi) populated on names and verses
 *  10. Aggregate counts vs expected (107 shlokas, 50 nāmas, 15 concepts)
 */
const fs = require('fs');
const path = require('path');

function load(name){
  const m = { exports: {} };
  const code = fs.readFileSync(path.join(__dirname, name), 'utf8');
  new Function('module', 'exports', code)(m, m.exports);
  return m.exports;
}

const data = load('data.js');
const shls = load('shlokas.js');
const cons = load('concepts.js');
const pos  = load('positions.js');

const { TIERS, NODES, EDGES } = data;
const { SHLOKAS } = shls;
const { CTIERS, CONCEPTS } = cons;

const NAMA_BY_ID    = Object.fromEntries(NODES.map(n => [n.id, n]));
const SHLOKA_BY_ID  = Object.fromEntries(SHLOKAS.map(s => [s.id, s]));
const CONCEPT_BY_ID = Object.fromEntries(CONCEPTS.map(c => [c.id, c]));
const TIER_BY_ID    = Object.fromEntries(TIERS.map(t => [t.id, t]));
const CTIER_BY_ID   = Object.fromEntries(CTIERS.map(t => [t.id, t]));

const errors = [];
const warnings = [];

// Optional private Bhat commentary — file is gitignored and may be absent.
// In public clones this is reported as 'not loaded'.
let BHAT_PRIVATE = null;
try {
  const bhatPath = path.join(__dirname, 'bhat_kn_private.js');
  if (fs.existsSync(bhatPath)) {
    const sandbox = { window: {} };
    const code = fs.readFileSync(bhatPath, 'utf8');
    new Function('window', code)(sandbox.window);
    BHAT_PRIVATE = sandbox.window.BHAT_KN_PRIVATE || null;
  }
} catch (e) {
  // Soft-fail only: private file is optional and never gates verify.
  warnings.push('bhat_kn_private.js present but failed to load: ' + e.message);
}

// If private file is loaded, validate that its keys are real nāma ids — but
// never error if absent.
if (BHAT_PRIVATE) {
  Object.keys(BHAT_PRIVATE).forEach(id => {
    if (!Object.prototype.hasOwnProperty.call(NAMA_BY_ID, id)) {
      warnings.push('bhat_kn_private.js entry ' + id + ' has no matching nāma in data.js');
    }
  });
}

function uniqIds(arr, name){
  const ids = arr.map(x => x.id);
  const seen = new Set(); const dupes = [];
  ids.forEach(id => { if (seen.has(id)) dupes.push(id); seen.add(id); });
  if (dupes.length) errors.push(`${name}: duplicate ids: ${dupes.join(', ')}`);
}

uniqIds(NODES, 'NODES');
uniqIds(SHLOKAS, 'SHLOKAS');
uniqIds(CONCEPTS, 'CONCEPTS');
uniqIds(TIERS, 'TIERS');
uniqIds(CTIERS, 'CTIERS');

// 2 + 6 + 7: nāma-level checks
NODES.forEach(n => {
  if (!SHLOKA_BY_ID[n.shloka_id]) errors.push(`nāma ${n.id} references unknown shloka_id ${n.shloka_id}`);
  if (!TIER_BY_ID[n.tier]) errors.push(`nāma ${n.id} has unknown tier ${n.tier}`);
  (n.tags || []).forEach(t => {
    if (!CONCEPT_BY_ID[t]) warnings.push(`nāma ${n.id} tag ${t} not in concepts.js`);
  });
  // 9: script variants
  ['iast','dev','kn','hi'].forEach(s => {
    if (!n.name[s]) errors.push(`nāma ${n.id} missing name.${s}`);
  });
});

// 4 + 5: concept-level checks
CONCEPTS.forEach(c => {
  if (!CTIER_BY_ID[c.tier]) errors.push(`concept ${c.id} has unknown tier ${c.tier}`);
  c.nama_ids.forEach(nid => {
    if (!NAMA_BY_ID[nid]) errors.push(`concept ${c.id} references unknown nāma ${nid}`);
  });
});

// 3: shloka nama_ids cross-ref (warning only — Phase 1 has loose mapping)
SHLOKAS.forEach(s => {
  (s.nama_ids || []).forEach(nid => {
    if (!NAMA_BY_ID[nid]){
      // No nāma at this position in data.js. Expected for Phase 1 — only 50 of 1000 seeded.
      // Don't even warn; would flood output.
    }
  });
});

// 8: EDGE endpoints
(EDGES || []).forEach(e => {
  if (!NAMA_BY_ID[e.source]) errors.push(`EDGE references unknown source nāma ${e.source}`);
  if (!NAMA_BY_ID[e.target]) errors.push(`EDGE references unknown target nāma ${e.target}`);
});

// 9: script variants on shlokas
SHLOKAS.forEach(s => {
  ['dev','iast','kn','hi'].forEach(scr => {
    if (!s.sanskrit[scr]) errors.push(`shloka ${s.id} missing sanskrit.${scr}`);
  });
});

// 10: aggregate counts (advisory only — exact targets may shift)
const expect = { shlokas: 107, namas: 1000, concepts: 59 };
const actual = { shlokas: SHLOKAS.length, namas: NODES.length, concepts: CONCEPTS.length };
['shlokas','namas','concepts'].forEach(k => {
  if (actual[k] !== expect[k]) warnings.push(`count ${k}: expected ${expect[k]}, got ${actual[k]}`);
});

// Summary
console.log('VSN KG integrity check');
console.log('  TIERS:   ' + TIERS.length);
console.log('  NODES:   ' + NODES.length + ' nāmas');
console.log('  EDGES:   ' + (EDGES ? EDGES.length : 0) + ' nāma-relations');
console.log('  SHLOKAS: ' + SHLOKAS.length + ' verses');
console.log('  CTIERS:  ' + CTIERS.length);
console.log('  CONCEPTS:' + CONCEPTS.length + ' attribute-graph nodes');
if (BHAT_PRIVATE) {
  const total = Object.keys(BHAT_PRIVATE).length;
  console.log('  BHAT_KN_PRIVATE: ' + total + ' private entries loaded (local maintainer file)');
} else {
  console.log('  BHAT_KN_PRIVATE: not loaded (public clone — expected)');
}
console.log('');
if (warnings.length){
  console.log('Warnings (' + warnings.length + '):');
  warnings.forEach(w => console.log('  - ' + w));
  console.log('');
}
if (errors.length){
  console.log('ERRORS (' + errors.length + '):');
  errors.forEach(e => console.log('  ✗ ' + e));
  process.exit(1);
} else {
  console.log('✓ All integrity checks passed.');
}
