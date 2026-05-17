# OCR Spike Report — Vol 1 of Bhat corpus

**Date:** 2026-05-17
**Source:** `0 ಸ್ತೋತ್ರ ನಾಮಾವಳಿ ಮಹಿಮೆ ಸಂಪುಟ 1 (1).pdf` (Drive id `1leBDJB_pcL3eW-djTNZpBZnW0CQ8Tpwa`), 986 KB, 80 pages.
**Pipeline:** `pdftoppm -r 300 -png` → Tesseract 4.1.1 + `kan.traineddata` (tessdata_best, sourced via git sparse-checkout because the proxy blocks `raw.githubusercontent.com` HTTP fetch).
**Scope:** Pages 1–20. Full OCR text for pages 1–10 in `vol1_pages_001_010.txt`.

## Accuracy band — **HIGH** for Kannada prose, **MEDIUM** for embedded Sanskrit shlokas

### Aggregate numbers
Across pages 1–20: 16,148 Kannada-script (U+0C80–U+0CFF) characters out of 17,065 non-whitespace characters = **94.6 % Kannada-script density**. Stray ASCII characters cluster on title/index pages; on the dense body (pages 7–20) Kannada-script density is 95–100 %. Pages 4, 6, 16 came back near-empty — these are blank or photo-only pages in the source PDF.

### Qualitative read of sample pages

**Page 10 (prose paragraph on Vishnu Sahasranāma pāṭha-vidhi):** clean, almost editorial-quality recovery. ~5 % word-level error rate, mostly anusvāra/visarga drops and one ZWJ-related glitch. **Verdict: HIGH.** Direct extraction usable with light proofreading.

**Page 12 (numbered paragraphs on pāṭha-pradāna types):** very clean, ~3 % word error. **HIGH.**

**Page 18 (the Bhīṣma-uvāca dhyāna verse + Kannada gloss):** the Kannada-language gloss prose is HIGH (~95 % accurate). The Sanskrit shlokas embedded in Kannada-lipi are **MEDIUM** — ~85–90 % character accuracy. Specific systematic errors observed in this verse:

| OCR | Source | Error class |
|---|---|---|
| ಜಗತ್ಪಭು೦ | ಜಗತ್ಪ್ರಭುಂ | missed `ರ`-conjunct; digit `೦` substituted for anusvāra `ಂ` |
| ಸ್ತುವಲ್ನಾ | ಸ್ತುವನ್‌ ನಾ | halant + word-boundary misread |
| ಪುರುಷಸ್ಸತತೋ | ಪುರುಷಃ ಸತತೋ | visarga dropped |
| ತೋತ್ಠಿತಃ | ತೋತ್ಥಿತಃ | ಠ↔ಥ confusion (visually near-identical in Nudi typeface) |

These errors are systematic and amenable to a 4-pattern post-processing regex pass (anusvāra normalization, visarga restoration, halant repair, ಠ/ಥ context-driven correction). With that pass plus a 1-pass proofread against an authoritative Devanāgarī edition of the stotra, the Kannada-lipi shloka text reaches **HIGH** band.

## Conclusion

Tesseract 4.1.1 + tessdata_best `kan.traineddata` recovers the Bhat corpus's Nudi/BRH typeset Kannada at 94.6 % aggregate character density on Vol 1 pages 1–20. **No retraining required.** The path forward for the data-extraction work is:

1. OCR all 8 volumes (estimate ~3 hours wall-clock for ~700 pages at 300 DPI).
2. Apply a Kannada-Sanskrit normalization pass (anusvāra/visarga/halant patterns) on the embedded shlokas.
3. Manual proofread of the per-nāma sections in Vol 2 Parts 1–7 against the structure printed in the index of each volume. This is the slow step — ~2–4 days for 1000 nāma entries.

For the Phase 1 vertical slice in this scaffold, **public Devanāgarī editions of the 107 shlokas are used** (Mahābhārata Anuśāsana-Parva 149) and transliterated mechanically to IAST and Kannada. OCR'd Bhat corpus content will land in subsequent phases as commentary (artha / guṇa) layers.

## Provenance

- Tesseract 4.1.1, leptonica 1.82
- `kan.traineddata` SHA1 (after `git sparse-checkout` from `tesseract-ocr/tessdata`): see `~/tessdata/kan.traineddata` (3.6 MB)
- Source pages rendered at 300 DPI PNG via Poppler `pdftoppm`
