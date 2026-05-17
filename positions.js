/* positions.js — hand-laid map coordinates for the concept-overlay map view.
 *
 * Phase 1 stub: empty map. The viewer falls back to an auto-layout when
 * KG_POSITIONS is empty.
 *
 * Phase 2: hand-place each of the ~15 concepts and ~50 nāmas in a tier-banded
 * 1000×1500 SVG canvas. Pattern mirrors gita-concept-kg/positions.js.
 */

const KG_POSITIONS = {};
const KG_TIER_BANDS = [];
// const KG_SHOW_EDGE_TYPES = new Set(['is-a','manifests-as']);  // optional filter

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KG_POSITIONS, KG_TIER_BANDS };
}
