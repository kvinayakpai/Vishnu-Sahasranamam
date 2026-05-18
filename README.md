# Vishnu Sahasranāma · Knowledge Graph (Madhva)

A quad-script (en / dev / kn / hi) browser of the **107 shlokas** of the Viṣṇu-sahasranāma (Mahābhārata Anuśāsana-Parva 149), with drill-down to the **1000 divine names**, plus an **attribute-graph overlay** that traces which divine guṇas each nāma foregrounds. Read through Mādhva siddhānta — specifically the Gauḍa Sārasvata commentarial tradition (Gokarna Partagāli Jīvottama Maṭha lineage), with English-mode commentary grounded in BNK Sharma's *Philosophy of Śrī Madhvācārya*.

This is **Phase 1** — a vertical-slice scaffold. The full 1000-nāma fill-in comes in subsequent phases.

---

## Phase 1 scope (vertical slice) — ✅ shipped

- ✅ Repo scaffold mirroring `gita-concept-kg` house style
- ✅ All 107 shlokas seeded in `shlokas.js` (text in all four scripts; commentary marked TODO)
- ✅ ~50 representative nāmas seeded in `data.js` with name in 4 scripts + position + shloka_id, plus partial artha/guṇa
- ✅ 8–12 attribute concepts seeded in `concepts.js` (para_tattva + sva_rūpa_guṇa tiers)
- ✅ OCR spike on Vol 1 of the Bhat corpus (Kannada Nudi/BRH non-Unicode font), result documented in `_ocr_spike/SPIKE_REPORT.md`
- ✅ Working `viewer-bundled.html` that opens from `file://` and lets you click through Shlokas + Attributes view modes
- ✅ Local git repo

## Phase 2 scope — ✅ shipped

- ✅ Full **1000-nāma** corpus in `data.js` (quad-script name, structured artha/guṇa/pramāṇa, shloka_id, tier, tags)
- ✅ Phase-1 hand-curated 50 records preserved verbatim; new 950 use templated content with Hindi prose distinct from Devanāgarī
- ✅ Canonical **shloka→nāma splits** (7-12 nāma per verse depending on meter) in `shlokas.js`, sums to exactly 1000, no duplicates
- ✅ Expanded **concepts.js**: 15 → 59 concepts across **7 tiers** (added kāruṇya, yoga-sthāna; refined into Mādhva ladder)
- ✅ Added **10 daśāvatāra concepts** + saṃhāra-kartṛtva, cit-svarūpa, ānanda-svarūpa, jñāna-guṇa, bala-guṇa, aiśvarya-guṇa, vīrya-tejas, 4 kāruṇya-guṇas, 5 yoga-sthāna, 5 bhakta-sambandha, 4 mukti-gradations
- ✅ Hand-laid **positions.js**: 143 positions (59 concepts + 84 anchor nāmas) in 1000×1500 SVG coord-space, 7 tier bands
- ✅ Viewer.html updated with **Map view** (renderMapHandLaid) — click concept/nāma nodes to navigate
- ✅ Bundled `viewer-bundled.html` regenerated (2.7 MiB self-contained)
- ✅ `verify.js` runs cleanly with no errors or warnings

### Phase 2 stats

| Metric | Phase 1 | Phase 2 |
|---|---|---|
| Shlokas | 107 | 107 |
| Nāmas | 50 | **1000** |
| Concepts | 15 | **59** |
| Concept tiers | 6 | **7** |
| Hand-laid map positions | 0 | **143** (59 concepts + 84 nāmas) |
| EDGES (nāma-relations) | 12 | 12 |
| Bundled viewer size | ~270 KiB | ~2.7 MiB |

## Phase 3 TODOs (deferred)

- [ ] Replace templated artha/guṇa for the 950 new nāmas with hand-curated content from Bhat corpus PDFs (Vol 2 Parts 1-7)
- [ ] Add Madhva-distinctive `madhva: {...}` field to ~100-150 nāmas where the Mādhva reading differs from Śaṅkara/Rāmānuja
- [ ] BNK Sharma cross-references for the most Mādhva-distinctive nāmas
- [ ] Audio time-code mapping for the Vishnu Sahasranama.mp3 → per-shloka playback
- [ ] Add `manifested-as-nama` edge type to the Gītā `gita-concept-kg` EDGES array
- [ ] Add `concept_id` field linking VSN nāmas → Gītā concepts; build unified Gītā ↔ VSN bridge view

## Phase 3 (deferred — Proposal D bridge)

- [ ] Add `manifested-as-nama` edge type to the Gītā `gita-concept-kg` EDGES array
- [ ] Add `concept_id` field linking VSN nāmas → Gītā concepts
- [ ] Build the unified Gītā ↔ VSN bridge view

---

## File layout

```
vishnu-sahasranama-kg/
├── README.md
├── package.json
├── .gitignore
├── data.js              — NODES (nāmas), EDGES (nāma-relations), TIERS
├── shlokas.js           — 107 verses of the stotra (4-script)
├── concepts.js          — attribute-graph overlay (Proposal A)
├── positions.js         — hand-laid map coordinates (Phase 2)
├── viewer.html          — single-page tri/quad-script viewer
├── index.html           — byte-identical alias of viewer.html
├── viewer-bundled.html  — self-contained file:// viewer (build artifact)
├── build-bundle.py      — inliner: viewer.html + data.js + shlokas.js + concepts.js + positions.js → viewer-bundled.html
├── verify.js            — integrity checker (cross-references, script presence)
└── _ocr_spike/          — OCR validation results on Vol 1 of source corpus
    ├── SPIKE_REPORT.md
    └── vol1_pages_001_010.txt
```

## Source corpus

Located in user's Google Drive folder `VishnuSahasranamam` (id `1GE4W3nhZTJHFZUnrdMkCmFXHXnPdyaSs`):

- Vol 1 (`0 ಸ್ತೋತ್ರ ನಾಮಾವಳಿ ಮಹಿಮೆ ಸಂಪುಟ 1.pdf`) — stotra + nāmāvali + mahime, 1.0 MB
- Vol 2 Parts 1–7 (2018–2024 publications) — per-nāma arthānusandhāna + guṇānusandhāna + ~7 pramāṇa-vacanas per nāma

**Author:** S. Vijayendra Ramanath Bhat (Shivamogga)
**Publisher:** Vidyabharati Memorial Trust (R), Shivamogga
**Tradition:** Gauḍa Sārasvata — Gokarna Partagāli Jīvottama Maṭha lineage (Mādhva siddhānta)

Complementary corpus — `Philosophy of Madhwa` folder (id `11xWDuAIMRMyL7XSn5bYP_AZaAQr8rakp`):

- `PhilosophyofSriMadhvacharya-BNKSharma.pdf` — standard scholarly English-language reference, used for English-mode commentary anchor on Mādhva-distinctive nāmas

**Big technical caveat:** All 8 Bhat PDFs are typeset in legacy non-Unicode Kannada font (Nudi / BRH family). Direct text extraction returns Latin-1 glyph bytes, not Unicode. See `_ocr_spike/SPIKE_REPORT.md` for accuracy band of the Tesseract OCR pass that gates the data-extraction work.

## Public-source verse layer

For the stotra text itself (the 107 shlokas), public Devanāgarī Sanskrit editions are used (Mahābhārata Anuśāsana-Parva 149, common online recensions). Devanāgarī → IAST and Devanāgarī → Kannada are mechanical (deterministic transliteration table); the Hindi script form re-uses the Devanāgarī text (the Hindi script *is* Devanāgarī).

## Content provenance — public vs private companion

The data layer in this public repo is split into two strata, and the viewer is
wired to consume both — but only the first is ever published.

**Public stratum (in this repo).** The `data.js` shipped here contains, for
each of the 1000 nāmas:

- canonical Sanskrit/Devanāgarī name + IAST + Kannada + Hindi script form
- shloka anchor (`shloka_id` linking back to `shlokas.js`)
- tier classification + concept tags (linking into `concepts.js`)
- **Phase-1 hand-curated `artha` / `guṇa` / `madhva` prose** for ~50 anchor
  nāmas — these are short, summary-style scholar's-paraphrase entries written
  in the maintainer's own words from a Mādhva-tradition reading
- **Phase-2 templated `artha` / `guṇa` prose** for the remaining ~950 nāmas
  — these are short structural placeholders generated from the etymology +
  shloka anchor, **not** lifted from any copyrighted source

The 107 shloka texts themselves are from common online Devanāgarī recensions
of Mahābhārata Anuśāsana-Parva 149 (Mahābhārata is in the public domain).

**Private companion (gitignored, maintainer-only).** A separate file,
`bhat_kn_private.js`, lives outside this repo on the maintainer's machine.
It carries the full source-grounded Mādhva commentary OCR'd from S. Vijayendra
Ramanath Bhat's 8-volume Kannada commentary corpus (Vol 1 + Vol 2 Parts 1–7,
2018–2024). **Vidyabharati Memorial Trust (R), Shivamogga holds copyright on
those volumes.** That content is for the maintainer's personal study and is
not redistributed.

The viewer (`viewer.html` / `index.html`) loads `bhat_kn_private.js` via an
optional `<script src=…  onerror=…>` tag — if the file is absent (which is the
default for every public clone), the loader silently sets the global to
`null` and the focus card renders only the public Phase-1/2 content. If the
file is present locally, the focus card additionally renders a clearly-marked
dashed block AFTER the public artha/guṇa, with a 'Personal study only — not
for redistribution' header.

`build-bundle.py --private` produces a separate self-contained
`viewer-bundled-private.html` that inlines the private file; the default
`python3 build-bundle.py` invocation only produces the public
`viewer-bundled.html` and never touches the private file. Both
`bhat_kn_private.js` and `viewer-bundled-private.html` are listed in
`.gitignore`.

`verify.js` will load the private file if it's present (and warn on any
nāma-id mismatch), but never errors on its absence — a public-clone run
prints `BHAT_KN_PRIVATE: not loaded (public clone — expected)` and exits
clean.

## Build

```sh
python3 build-bundle.py     # produces viewer-bundled.html (self-contained)
node verify.js              # integrity check (run after edits to data.js / shlokas.js / concepts.js)
```

Open `viewer-bundled.html` from `file://` (works on phones, no external dependencies).

## House-style reference

This project mirrors the architecture of `gita-concept-kg` — single-page HTML viewer, tri-script (now quad-script), bundled build pipeline, Cormorant / Tiro fonts, parchment palette, conventional-commit history. The viewer's script-toggle, focus-card render path, and search bar are direct ports.
