# Vishnu Sahasranāma · Knowledge Graph (Madhva)

A quad-script (en / dev / kn / hi) browser of the **107 shlokas** of the Viṣṇu-sahasranāma (Mahābhārata Anuśāsana-Parva 149), with drill-down to the **1000 divine names**, plus an **attribute-graph overlay** that traces which divine guṇas each nāma foregrounds. Read through Mādhva siddhānta — specifically the Gauḍa Sārasvata commentarial tradition (Gokarna Partagāli Jīvottama Maṭha lineage), with English-mode commentary grounded in BNK Sharma's *Philosophy of Śrī Madhvācārya*.

This is **Phase 1** — a vertical-slice scaffold. The full 1000-nāma fill-in comes in subsequent phases.

---

## Phase 1 scope (vertical slice)

- ✅ Repo scaffold mirroring `gita-concept-kg` house style
- ✅ All 107 shlokas seeded in `shlokas.js` (text in all four scripts; commentary marked TODO)
- ✅ ~50 representative nāmas seeded in `data.js` with name in 4 scripts + position + shloka_id, plus partial artha/guṇa
- ✅ 8–12 attribute concepts seeded in `concepts.js` (para_tattva + sva_rūpa_guṇa tiers)
- ✅ OCR spike on Vol 1 of the Bhat corpus (Kannada Nudi/BRH non-Unicode font), result documented in `_ocr_spike/SPIKE_REPORT.md`
- ✅ Working `viewer-bundled.html` that opens from `file://` and lets you click through Shlokas + Attributes view modes
- ✅ Local git repo (not pushed)

## Phase 2 TODOs

- [ ] Complete OCR pass on Vols 2–8 once accuracy band is confirmed
- [ ] Fill remaining 950 nāmas with at least `name + position + shloka_id`
- [ ] Fill artha / guṇa / pramāṇa for each nāma from the Bhat corpus
- [ ] Expand concept tiers 3–7 (līlā-guṇa, kāruṇya, yoga-sthāna, bhakta-sambandha, mokṣa-prada)
- [ ] Add positions.js hand-laid map for the attribute graph
- [ ] BNK Sharma cross-references for the ~50 most Mādhva-distinctive nāmas
- [ ] Audio time-code mapping for the Vishnu Sahasranama.mp3 → per-shloka playback

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

## Build

```sh
python3 build-bundle.py     # produces viewer-bundled.html (self-contained)
node verify.js              # integrity check (run after edits to data.js / shlokas.js / concepts.js)
```

Open `viewer-bundled.html` from `file://` (works on phones, no external dependencies).

## House-style reference

This project mirrors the architecture of `gita-concept-kg` — single-page HTML viewer, tri-script (now quad-script), bundled build pipeline, Cormorant / Tiro fonts, parchment palette, conventional-commit history. The viewer's script-toggle, focus-card render path, and search bar are direct ports.
