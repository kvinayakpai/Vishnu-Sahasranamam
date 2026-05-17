/* Vishnu Sahasranama --- Knowledge Graph data layer
 *
 * Phase 1 vertical slice: ~50 hand-curated namas spanning the 107 verses,
 * focusing on the Madhva-distinctive doctrinal anchors. The full 1000-nama
 * fill-in is Phase 2 work.
 *
 * Schema per node:
 *   id, position, shloka_id, tier,
 *   name:   {iast, dev, kn, hi}
 *   artha:  {en, dev, kn, hi}    # arthanusandhana
 *   guna:   {en, dev, kn, hi}    # gunanusandhana
 *   madhva: {en, dev, kn, hi} | null
 *   tags:   [concept_id, ...]    # links into concepts.js
 *
 * EDGES connect namas: avatara-cluster, name-synonyms, vyuha-relations.
 * TIERS group namas for browse-mode display.
 */

const TIERS = [
  { id: "para_tattva", en: "Para-tattva", dev: "पर-तत्त्व", kn: "ಪರ-ತತ್ತ್ವ", hi: "पर-तत्त्व", gloss: "The supreme reality - Hari/Vishnu/Narayana as sarvottama" },
  { id: "svarupa_guna", en: "Svarupa-guna", dev: "स्वरूप-गुण", kn: "ಸ್ವರೂಪ-ಗುಣ", hi: "स्वरूप-गुण", gloss: "Essential attributes - sat, cit, ananda, jnana, bala" },
  { id: "lila_guna", en: "Lila-guna", dev: "लीला-गुण", kn: "ಲೀಲಾ-ಗುಣ", hi: "लीला-गुण", gloss: "Cosmic-play attributes - srshti, sthiti, samhara, avatara" },
  { id: "karunya_guna", en: "Karunya-guna", dev: "कारुण्य-गुण", kn: "ಕಾರುಣ್ಯ-ಗುಣ", hi: "कारुण्य-गुण", gloss: "Mercy attributes - vatsalya, akhilaghaharitva, sharanagati" },
  { id: "bhakta_sambandha", en: "Bhakta-sambandha", dev: "भक्त-सम्बन्ध", kn: "ಭಕ್ತ-ಸಂಬಂಧ", hi: "भक्त-सम्बन्ध", gloss: "Devotee-relation attributes - bhakta-priya, bhakta-vatsala" },
  { id: "mokshaprada", en: "Moksha-prada", dev: "मोक्ष-प्रद", kn: "ಮೋಕ್ಷ-ಪ್ರದ", hi: "मोक्ष-प्रद", gloss: "Liberation-bestowing attributes - mukti-prada, taratamya-niyamaka" },
];

const TIER_COLOR = {
  "para_tattva": "#8b1e1a",
  "svarupa_guna": "#a83f1a",
  "lila_guna": "#b8702a",
  "karunya_guna": "#3f7a4a",
  "bhakta_sambandha": "#2f6e7a",
  "mokshaprada": "#7a1e5a"
};

const NODES = [
  
  {
    id: "n_0001", position: 1, shloka_id: "sl_001", tier: "para_tattva",
    name:  {"iast": "viśvam", "dev": "विश्वम्", "kn": "ವಿಶ್ವಂ", "hi": "विश्वम्"},
    artha: {"en": "The Cosmos - Hari as the totality of all existent and possible beings; the universe in its entirety is his body.", "dev": "विश्व-शब्देन समस्तं स्थावरजङ्गमात्मकं जगत् अभिधीयते। तत् सर्वमेव विष्णोः शरीरतया तदधीनम्।", "kn": "ವಿಶ್ವ-ಶಬ್ದದಿಂದ ಸಮಸ್ತ ಸ್ಥಾವರ-ಜಂಗಮಾತ್ಮಕ ಜಗತ್ತು ವಾಚ್ಯವಾಗುತ್ತದೆ. ಇಡೀ ಜಗತ್ತು ವಿಷ್ಣುವಿನ ಶರೀರ ರೂಪದಲ್ಲಿ ಅವನಿಗೆ ಅಧೀನವಾಗಿದೆ.", "hi": "विश्व-शब्देन समस्तं स्थावरजङ्गमात्मकं जगत् अभिधीयते। तत् सर्वमेव विष्णोः शरीरतया तदधीनम्।"},
    guna:  {"en": "Sarva-vyaapaka-svarupa: the all-pervading, all-containing nature. Verse-opening invocation establishes Hari's universal scope.", "dev": "सर्व-व्यापक-स्वरूपम्। श्लोकारम्भे एव हरेः निरुपाधिक-व्यापित्वम् उद्घोष्यते।", "kn": "ಸರ್ವ-ವ್ಯಾಪಕ-ಸ್ವರೂಪ. ಶ್ಲೋಕದ ಆರಂಭದಲ್ಲಿಯೇ ಹರಿಯ ನಿರುಪಾಧಿಕ ವ್ಯಾಪಿತ್ವದ ಘೋಷಣೆ.", "hi": "सर्व-व्यापक-स्वरूपम्। श्लोकारम्भे एव हरेः निरुपाधिक-व्यापित्वम् उद्घोष्यते।"},
    tags: ["c_hari_sarvottamatva", "c_sarva_vyapakatva"],
  },
  {
    id: "n_0002", position: 2, shloka_id: "sl_001", tier: "para_tattva",
    name:  {"iast": "viṣṇuḥ", "dev": "विष्णुः", "kn": "ವಿಷ್ಣುಃ", "hi": "विष्णुः"},
    artha: {"en": "Vishnu: 'the pervader' (root viś, 'to enter/pervade'). The name names him by his most characteristic act - entering all beings as antaryami.", "dev": "विष्णुः इति - विशतेः धातोः, सर्वान्तर-प्रवेशशीलः। प्रत्येकं भूतं विष्णुः अन्तर्यामि-रूपेण प्रविशति।", "kn": "ವಿಷ್ಣು ಎಂದರೆ — ವಿಶತಿ ಧಾತುವಿನಿಂದ, ಸರ್ವಾಂತರ-ಪ್ರವೇಶಶೀಲ. ಪ್ರತಿಯೊಂದು ಭೂತದಲ್ಲಿಯೂ ವಿಷ್ಣುವು ಅಂತರ್ಯಾಮಿ-ರೂಪದಲ್ಲಿ ಪ್ರವೇಶಿಸುತ್ತಾನೆ.", "hi": "विष्णुः इति - विशतेः धातोः, सर्वान्तर-प्रवेशशीलः। प्रत्येकं भूतं विष्णुः अन्तर्यामि-रूपेण प्रविशति।"},
    guna:  {"en": "Antaryamitva: in-dweller. Madhva's pancha-bheda system makes this the primary axiom - Hari is in everything but distinct from everything.", "dev": "अन्तर्यामित्वम्। मध्व-पञ्चभेद-व्यवस्थायां प्राथमिक-सिद्धान्तः - हरिः सर्वत्र अस्ति, अथ च सर्वस्मात् भिन्नः।", "kn": "ಅಂತರ್ಯಾಮಿತ್ವ. ಮಧ್ವ-ಪಂಚಭೇದ-ವ್ಯವಸ್ಥೆಯ ಪ್ರಾಥಮಿಕ ಸಿದ್ಧಾಂತ — ಹರಿಯು ಸರ್ವತ್ರ ಇದ್ದಾನೆ, ಆದರೆ ಎಲ್ಲದರಿಂದಲೂ ಭಿನ್ನ.", "hi": "अन्तर्यामित्वम्। मध्व-पञ्चभेद-व्यवस्थायां प्राथमिक-सिद्धान्तः - हरिः सर्वत्र अस्ति, अथ च सर्वस्मात् भिन्नः।"},
    tags: ["c_hari_sarvottamatva", "c_antaryamitva"],
    madhva: {"en": "The name 'Vishnu' for Madhva is not a generic divinity-label but the specific eka-paramatma; Shiva, Brahma etc. are all his abhimani-devatas.", "dev": "मध्व-मते 'विष्णुः' इति शब्दः सामान्य-देवता-वाचकः न; एक-परमात्मनः अनन्यार्थः। शिवादयः अस्य अभिमानि-देवताः।", "kn": "ಮಧ್ವ-ಮತದಲ್ಲಿ 'ವಿಷ್ಣು' ಎಂಬುದು ಸಾಮಾನ್ಯ ದೇವತಾ-ವಾಚಕವಲ್ಲ; ಏಕ-ಪರಮಾತ್ಮನ ಅನನ್ಯ ನಾಮ. ಶಿವಾದಿಗಳು ಅವನ ಅಭಿಮಾನಿ-ದೇವತೆಗಳು.", "hi": "मध्व-मते 'विष्णुः' इति शब्दः सामान्य-देवता-वाचकः न; एक-परमात्मनः अनन्यार्थः। शिवादयः अस्य अभिमानि-देवताः।"},
  },
  {
    id: "n_0003", position: 3, shloka_id: "sl_001", tier: "svarupa_guna",
    name:  {"iast": "vaṣaṭkāraḥ", "dev": "वषट्कारः", "kn": "ವಷಟ್ಕಾರಃ", "hi": "वषट्कारः"},
    artha: {"en": "Vashatkara: the embodiment of the Vedic exclamation 'vashat!' uttered at yajna oblations. Hari is the addressee, ground, and result of all vaidika-karma.", "dev": "वषट्कारः - वषट्-शब्देन वेदोक्त-यज्ञ-होम-क्षणे उच्यमानेन वाच्यः। हरिः सर्व-वैदिक-कर्मणाम् उद्देश्यः, आधारः, फलं च।", "kn": "ವಷಟ್ಕಾರ — ವಷಟ್ ಎಂಬ ವೇದೋಕ್ತ ಯಜ್ಞ-ಹೋಮ ಸಮಯದಲ್ಲಿ ಉಚ್ಚರಿಸಲ್ಪಡುವ ಶಬ್ದದಿಂದ ವಾಚ್ಯ. ಹರಿಯು ಎಲ್ಲ ವೈದಿಕ ಕರ್ಮಗಳ ಉದ್ದೇಶ್ಯ, ಆಧಾರ ಮತ್ತು ಫಲ.", "hi": "वषट्कारः - वषट्-शब्देन वेदोक्त-यज्ञ-होम-क्षणे उच्यमानेन वाच्यः। हरिः सर्व-वैदिक-कर्मणाम् उद्देश्यः, आधारः, फलं च।"},
    guna:  {"en": "Yajna-svarupa: the Vedic-sacrifice nature. Names Hari as the locus of all karma-kanda. Sankara reads as svarupa-laksana of the Vedic order itself.", "dev": "यज्ञ-स्वरूपम्। सर्व-कर्म-काण्डस्य आश्रयत्वम्। शङ्करः वैदिक-व्यवस्थायाः स्वरूप-लक्षणतया गृह्णाति।", "kn": "ಯಜ್ಞ-ಸ್ವರೂಪ. ಸಮಸ್ತ ಕರ್ಮ-ಕಾಂಡದ ಆಶ್ರಯತ್ವ. ಶಂಕರನು ವೈದಿಕ-ವ್ಯವಸ್ಥೆಯ ಸ್ವರೂಪ-ಲಕ್ಷಣವಾಗಿ ಗ್ರಹಿಸುತ್ತಾನೆ.", "hi": "यज्ञ-स्वरूपम्। सर्व-कर्म-काण्डस्य आश्रयत्वम्। शङ्करः वैदिक-व्यवस्थायाः स्वरूप-लक्षणतया गृह्णाति।"},
    tags: ["c_yajna_svarupa"],
  },
  {
    id: "n_0004", position: 4, shloka_id: "sl_001", tier: "svarupa_guna",
    name:  {"iast": "bhūtabhavyabhavatprabhuḥ", "dev": "भूतभव्यभवत्प्रभुः", "kn": "ಭೂತಭವ್ಯಭವತ್ಪ್ರಭುಃ", "hi": "भूतभव्यभवत्प्रभुः"},
    artha: {"en": "Lord of the past, future, and present (bhuta + bhavya + bhavat). Triple-time mastery: he was, will be, and is now the prabhu of all that exists.", "dev": "त्रिकाल-नियन्ता - भूतस्य भविष्यस्य वर्तमानस्य च प्रभुः। यदा यदा यत्किञ्चित् सत् तत् सर्वं तदधीनम्।", "kn": "ತ್ರಿಕಾಲ-ನಿಯಂತಾ — ಭೂತ, ಭವಿಷ್ಯ, ವರ್ತಮಾನಗಳ ಪ್ರಭು. ಯಾವಾಗಲೂ ಯಾವುದೇ ಇರುವ ವಸ್ತು ಎಲ್ಲವೂ ಅವನ ಅಧೀನ.", "hi": "त्रिकाल-नियन्ता - भूतस्य भविष्यस्य वर्तमानस्य च प्रभुः। यदा यदा यत्किञ्चित् सत् तत् सर्वं तदधीनम्।"},
    guna:  {"en": "Kala-niyamakatva: time-sovereignty. Compactly states the trans-temporal lordship that 8.4 of the Gita names as adhibhuta.", "dev": "काल-नियामकत्वम्। गीता ८।४-स्थम् अधिभूत-तत्त्वं संक्षेपेण नामरूपेण निरूपयति।", "kn": "ಕಾಲ-ನಿಯಾಮಕತ್ವ. ಗೀತಾ ೮।೪ರಲ್ಲಿ ಅಧಿಭೂತ-ತತ್ತ್ವವನ್ನು ಸಂಕ್ಷೇಪವಾಗಿ ನಾಮರೂಪದಿಂದ ನಿರೂಪಿಸುತ್ತದೆ.", "hi": "काल-नियामकत्वम्। गीता ८।४-स्थम् अधिभूत-तत्त्वं संक्षेपेण नामरूपेण निरूपयति।"},
    tags: ["c_kala_niyamakatva"],
  },
  {
    id: "n_0005", position: 5, shloka_id: "sl_001", tier: "lila_guna",
    name:  {"iast": "bhūtakṛt", "dev": "भूतकृत्", "kn": "ಭೂತಕೃತ್", "hi": "भूतकृत्"},
    artha: {"en": "Maker of beings (bhuta + krt). Names Hari as the agent of cosmic creation - srshti.", "dev": "भूतानां कर्ता - सृष्टि-कर्तृत्वेन हरिः अभिधीयते।", "kn": "ಭೂತಗಳ ಕರ್ತ — ಸೃಷ್ಟಿ-ಕರ್ತೃತ್ವದಿಂದ ಹರಿಯು ಅಭಿಧೇಯ.", "hi": "भूतानां कर्ता - सृष्टि-कर्तृत्वेन हरिः अभिधीयते।"},
    guna:  {"en": "Srshti-kartrtva: creator-agency. First of the trika srshti-sthiti-samhara cluster (names 5, 6, presence-bhrt).", "dev": "सृष्टि-कर्तृत्वम्। सृष्टि-स्थिति-संहार-त्रिकस्य प्रथमं नाम।", "kn": "ಸೃಷ್ಟಿ-ಕರ್ತೃತ್ವ. ಸೃಷ್ಟಿ-ಸ್ಥಿತಿ-ಸಂಹಾರ-ತ್ರಿಕದ ಮೊದಲ ನಾಮ.", "hi": "सृष्टि-कर्तृत्वम्। सृष्टि-स्थिति-संहार-त्रिकस्य प्रथमं नाम।"},
    tags: ["c_srshti_kartrtva"],
  },
  {
    id: "n_0006", position: 6, shloka_id: "sl_001", tier: "lila_guna",
    name:  {"iast": "bhūtabhṛt", "dev": "भूतभृत्", "kn": "ಭೂತಭೃತ್", "hi": "भूतभृत्"},
    artha: {"en": "Sustainer of beings - bhrt-root means 'to bear/maintain'. Hari maintains all created beings in existence.", "dev": "भूतानां भर्ता / धारकः - सृष्ट-भूतानां स्थिति-कर्तृत्वम्।", "kn": "ಭೂತಗಳ ಭರ್ತಾ / ಧಾರಕ — ಸೃಷ್ಟ ಭೂತಗಳ ಸ್ಥಿತಿ-ಕರ್ತೃತ್ವ.", "hi": "भूतानां भर्ता / धारकः - सृष्ट-भूतानां स्थिति-कर्तृत्वम्।"},
    guna:  {"en": "Sthiti-kartrtva: sustainer-agency. Forms the second member of the trika.", "dev": "स्थिति-कर्तृत्वम्। सृष्टि-स्थिति-संहार-त्रिकस्य द्वितीयं नाम।", "kn": "ಸ್ಥಿತಿ-ಕರ್ತೃತ್ವ. ಸೃಷ್ಟಿ-ಸ್ಥಿತಿ-ಸಂಹಾರ-ತ್ರಿಕದ ಎರಡನೇ ನಾಮ.", "hi": "स्थिति-कर्तृत्वम्। सृष्टि-स्थिति-संहार-त्रिकस्य द्वितीयं नाम।"},
    tags: ["c_sthiti_kartrtva"],
  },
  {
    id: "n_0007", position: 7, shloka_id: "sl_001", tier: "svarupa_guna",
    name:  {"iast": "bhūtātmā", "dev": "भूतात्मा", "kn": "ಭೂತಾತ್ಮಾ", "hi": "भूतात्मा"},
    artha: {"en": "The self of all beings - atman of the bhutas. Hari is the inner essence behind every individual jiva.", "dev": "भूतानाम् आत्मा - प्रत्येक-जीवस्य अन्तःस्थः परमात्मा।", "kn": "ಭೂತಗಳ ಆತ್ಮ — ಪ್ರತಿಯೊಂದು ಜೀವದ ಅಂತಃಸ್ಥ ಪರಮಾತ್ಮ.", "hi": "भूतानाम् आत्मा - प्रत्येक-जीवस्य अन्तःस्थः परमात्मा।"},
    guna:  {"en": "Sarva-bhuta-antaryamitva. Same axis as nama 2 (Vishnu) but here as essence-of-self rather than enterer-into-self.", "dev": "सर्व-भूत-अन्तर्यामित्वम्। द्वितीय-नाम (विष्णु) तुल्यः अक्षः - इदं स्वरूप-तया, तत् प्रवेश-क्रियया।", "kn": "ಸರ್ವ-ಭೂತ-ಅಂತರ್ಯಾಮಿತ್ವ. ಎರಡನೇ ನಾಮ (ವಿಷ್ಣು) ತುಲ್ಯ ಅಕ್ಷ — ಇದು ಸ್ವರೂಪವಾಗಿ, ಅದು ಪ್ರವೇಶ-ಕ್ರಿಯೆಯಾಗಿ.", "hi": "सर्व-भूत-अन्तर्यामित्वम्। द्वितीय-नाम (विष्णु) तुल्यः अक्षः - इदं स्वरूप-तया, तत् प्रवेश-क्रियया।"},
    tags: ["c_antaryamitva", "c_atma_svarupa"],
  },
  {
    id: "n_0008", position: 8, shloka_id: "sl_001", tier: "lila_guna",
    name:  {"iast": "bhūtabhāvanaḥ", "dev": "भूतभावनः", "kn": "ಭೂತಭಾವನಃ", "hi": "भूतभावनः"},
    artha: {"en": "Nourisher / progenitor of beings. The causal-agency name in the creation cluster.", "dev": "भूतानां पालकः / उद्भावकः - सर्व-भूत-समुद्भव-हेतुत्वम्।", "kn": "ಭೂತಗಳ ಪಾಲಕ / ಉದ್ಭಾವಕ — ಎಲ್ಲ ಭೂತಗಳ ಸಮುದ್ಭವ-ಹೇತುತ್ವ.", "hi": "भूतानां पालकः / उद्भावकः - सर्व-भूत-समुद्भव-हेतुत्वम्।"},
    guna:  {"en": "Karuna-anu-pravrtti in the act of creation - creates with intent to sustain.", "dev": "करुणानुप्रवृत्तेन सृष्टि-कर्म - पालन-संकल्पेन सृजति।", "kn": "ಕರುಣಾನುಪ್ರವೃತ್ತಿಯಿಂದ ಸೃಷ್ಟಿ-ಕರ್ಮ — ಪಾಲನ-ಸಂಕಲ್ಪದಿಂದ ಸೃಜಿಸುತ್ತಾನೆ.", "hi": "करुणानुप्रवृत्तेन सृष्टि-कर्म - पालन-संकल्पेन सृजति।"},
    tags: ["c_srshti_kartrtva", "c_karunya"],
  },
  {
    id: "n_0011", position: 11, shloka_id: "sl_002", tier: "svarupa_guna",
    name:  {"iast": "pūtātmā", "dev": "पूतात्मा", "kn": "ಪೂತಾತ್ಮಾ", "hi": "पूतात्मा"},
    artha: {"en": "The pure self - nitya-shuddha-svabhava. Free of any defilement of prakrti, karma, or guna.", "dev": "पूत आत्मा यस्य सः। नित्य-शुद्ध-स्वरूपः, प्रकृति-कर्म-गुण-दोष-वर्जितः।", "kn": "ಪವಿತ್ರ ಆತ್ಮ ಯಾವನದೋ ಅವನು. ನಿತ್ಯ-ಶುದ್ಧ-ಸ್ವರೂಪ, ಪ್ರಕೃತಿ-ಕರ್ಮ-ಗುಣ-ದೋಷ-ವರ್ಜಿತ.", "hi": "पूत आत्मा यस्य सः। नित्य-शुद्ध-स्वरूपः, प्रकृति-कर्म-गुण-दोष-वर्जितः।"},
    guna:  {"en": "Suddha-sattva-svabhava. Madhva distinguishes Hari's svarupa-shuddhi from the contingent shuddhi achieved by mukta-jivas.", "dev": "शुद्ध-सत्त्व-स्वभावम्। मध्वः हरेः स्वरूप-शुद्धिं मुक्त-जीवानां प्रासङ्गिक-शुद्धेः व्यवच्छिनत्ति।", "kn": "ಶುದ್ಧ-ಸತ್ತ್ವ-ಸ್ವಭಾವ. ಮಧ್ವನು ಹರಿಯ ಸ್ವರೂಪ-ಶುದ್ಧಿಯನ್ನು ಮುಕ್ತ-ಜೀವಗಳ ಪ್ರಾಸಂಗಿಕ ಶುದ್ಧಿಯಿಂದ ವ್ಯವಚ್ಛೇದಿಸುತ್ತಾನೆ.", "hi": "शुद्ध-सत्त्व-स्वभावम्। मध्वः हरेः स्वरूप-शुद्धिं मुक्त-जीवानां प्रासङ्गिक-शुद्धेः व्यवच्छिनत्ति।"},
    tags: ["c_sat_svarupa"],
  },
  {
    id: "n_0012", position: 12, shloka_id: "sl_002", tier: "para_tattva",
    name:  {"iast": "paramātmā", "dev": "परमात्मा", "kn": "ಪರಮಾತ್ಮಾ", "hi": "परमात्मा"},
    artha: {"en": "The supreme self. The atman beyond all jivatmans, ontologically distinct from them. The 'highest Self' of BG 13.22 and 15.17.", "dev": "परम आत्मा - सर्व-जीवात्मनः अत्यन्तं विलक्षणः उत्कृष्टतमः आत्मा। गीता १३।२२, १५।१७-स्थः।", "kn": "ಪರಮ ಆತ್ಮ — ಎಲ್ಲ ಜೀವಾತ್ಮಗಳಿಂದ ಅತ್ಯಂತ ವಿಲಕ್ಷಣ ಉತ್ಕೃಷ್ಟತಮ ಆತ್ಮ. ಗೀತಾ ೧೩।೨೨, ೧೫।೧೭ರಲ್ಲಿ ಸ್ಥಿತ.", "hi": "परम आत्मा - सर्व-जीवात्मनः अत्यन्तं विलक्षणः उत्कृष्टतमः आत्मा। गीता १३।२२, १५।१७-स्थः।"},
    guna:  {"en": "Jiva-isvara-bheda-mula. The very name encodes pancha-bheda's central axis - Hari is not jiva, jiva is not Hari.", "dev": "जीव-ईश्वर-भेद-मूलम्। नामैव पञ्च-भेदस्य केन्द्र-अक्षम् उद्घोषयति।", "kn": "ಜೀವ-ಈಶ್ವರ-ಭೇದ-ಮೂಲ. ನಾಮವೇ ಪಂಚ-ಭೇದದ ಕೇಂದ್ರ-ಅಕ್ಷವನ್ನು ಘೋಷಿಸುತ್ತದೆ.", "hi": "जीव-ईश्वर-भेद-मूलम्। नामैव पञ्च-भेदस्य केन्द्र-अक्षम् उद्घोषयति।"},
    tags: ["c_hari_sarvottamatva", "c_jiva_isvara_bheda"],
    madhva: {"en": "Madhva-vaisistya: 'paramatman' is not jiva-paramatma-aikya as Advaita reads; it names the eternally distinct supreme Self.", "dev": "मध्व-वैशिष्ट्यम् - 'परमात्मा' न जीव-परमात्म-ऐक्यम्; नित्य-भिन्नः परम-आत्मा एव।", "kn": "ಮಧ್ವ-ವೈಶಿಷ್ಟ್ಯ — 'ಪರಮಾತ್ಮಾ' ಜೀವ-ಪರಮಾತ್ಮ-ಐಕ್ಯವಲ್ಲ; ನಿತ್ಯ-ಭಿನ್ನ ಪರಮ-ಆತ್ಮನೇ.", "hi": "मध्व-वैशिष्ट्यम् - 'परमात्मा' न जीव-परमात्म-ऐक्यम्; नित्य-भिन्नः परम-आत्मा एव।"},
  },
  {
    id: "n_0013", position: 13, shloka_id: "sl_002", tier: "mokshaprada",
    name:  {"iast": "muktānāṃ paramā gatiḥ", "dev": "मुक्तानां परमा गतिः", "kn": "ಮುಕ್ತಾನಾಂ ಪರಮಾ ಗತಿಃ", "hi": "मुक्तानां परमा गतिः"},
    artha: {"en": "The highest goal/destination of the liberated. The mukta-jivas reach Hari and abide in him; he is the terminus of moksha.", "dev": "मुक्तानां जीवानां परमा गतिः - मोक्ष-प्राप्तानां जीवानां अन्तिमं स्थानम्।", "kn": "ಮುಕ್ತ ಜೀವಗಳ ಪರಮ ಗತಿ — ಮೋಕ್ಷ-ಪ್ರಾಪ್ತ ಜೀವಗಳ ಅಂತಿಮ ಸ್ಥಾನ.", "hi": "मुक्तानां जीवानां परमा गतिः - मोक्ष-प्राप्तानां जीवानां अन्तिमं स्थानम्।"},
    guna:  {"en": "Moksha-prada and mukti-niyamakatva. The mukti-taratamya doctrine is presupposed - degrees of mukti exist, all under Hari.", "dev": "मोक्ष-प्रदत्वम्, मुक्ति-नियामकत्वम्। मुक्ति-तारतम्य-सिद्धान्तः अनुस्यूतः।", "kn": "ಮೋಕ್ಷ-ಪ್ರದತ್ವ, ಮುಕ್ತಿ-ನಿಯಾಮಕತ್ವ. ಮುಕ್ತಿ-ತಾರತಮ್ಯ-ಸಿದ್ಧಾಂತ ಅನುಸ್ಯೂತ.", "hi": "मोक्ष-प्रदत्वम्, मुक्ति-नियामकत्वम्। मुक्ति-तारतम्य-सिद्धान्तः अनुस्यूतः।"},
    tags: ["c_moksha_prada"],
  },
  {
    id: "n_0016", position: 16, shloka_id: "sl_002", tier: "para_tattva",
    name:  {"iast": "akṣaraḥ", "dev": "अक्षरः", "kn": "ಅಕ್ಷರಃ", "hi": "अक्षरः"},
    artha: {"en": "The imperishable. Hari endures beyond all destruction; the kuta-stha akshara of BG 15.16.", "dev": "अक्षरः - न क्षरति इति। सर्व-नाश-अतीतः, गीता १५।१६-स्थः कूटस्थ अक्षर पुरुषः।", "kn": "ಅಕ್ಷರ — ಕ್ಷಯಿಸದವನು. ಸರ್ವ-ನಾಶ-ಅತೀತ, ಗೀತಾ ೧೫।೧೬ರಲ್ಲಿ ಸ್ಥಿತ ಕೂಟಸ್ಥ ಅಕ್ಷರ ಪುರುಷ.", "hi": "अक्षरः - न क्षरति इति। सर्व-नाश-अतीतः, गीता १५।१६-स्थः कूटस्थ अक्षर पुरुषः।"},
    guna:  {"en": "Nitya-sat-svabhava. Anchors Hari's existence-mode in contrast to the kshara (perishable) jagat.", "dev": "नित्य-सत्-स्वभावम्। क्षर-जगतः वैधर्म्येन हरेः सत्ता-स्वरूप-निर्देशः।", "kn": "ನಿತ್ಯ-ಸತ್-ಸ್ವಭಾವ. ಕ್ಷರ-ಜಗತ್ತಿನಿಂದ ವೈಧರ್ಮ್ಯವಾಗಿ ಹರಿಯ ಸತ್ತಾ-ಸ್ವರೂಪ-ನಿರ್ದೇಶ.", "hi": "नित्य-सत्-स्वभावम्। क्षर-जगतः वैधर्म्येन हरेः सत्ता-स्वरूप-निर्देशः।"},
    tags: ["c_sat_svarupa"],
  },
  {
    id: "n_0024", position: 24, shloka_id: "sl_003", tier: "para_tattva",
    name:  {"iast": "puruṣottamaḥ", "dev": "पुरुषोत्तमः", "kn": "ಪುರುಷೋತ್ತಮಃ", "hi": "पुरुषोत्तमः"},
    artha: {"en": "The supreme person. Beyond ksara (perishable, all jivas in samsara) and akshara (imperishable, Lakshmi for Madhva). Krishna's self-designation in BG 15.18.", "dev": "पुरुषोत्तमः - क्षर-अक्षरयोः अतीतः उत्तमः पुरुषः। गीता १५।१८-स्थं श्रीकृष्णस्य आत्म-निरूपणम्।", "kn": "ಪುರುಷೋತ್ತಮ — ಕ್ಷರ-ಅಕ್ಷರಗಳಿಗಿಂತ ಅತೀತ ಉತ್ತಮ ಪುರುಷ. ಗೀತಾ ೧೫।೧೮ರಲ್ಲಿ ಶ್ರೀಕೃಷ್ಣನ ಆತ್ಮ-ನಿರೂಪಣೆ.", "hi": "पुरुषोत्तमः - क्षर-अक्षरयोः अतीतः उत्तमः पुरुषः। गीता १५।१८-स्थं श्रीकृष्णस्य आत्म-निरूपणम्।"},
    guna:  {"en": "Sarvottamatva: absolute supremacy. The hermeneutic anchor for Madhva's reading of the entire Gita.", "dev": "सर्वोत्तमत्वम्। मध्व-दृष्ट्या समस्त-गीताया हर्मेन्यूतिक-केन्द्रम्।", "kn": "ಸರ್ವೋತ್ತಮತ್ವ. ಮಧ್ವ-ದೃಷ್ಟಿಯಿಂದ ಸಮಸ್ತ-ಗೀತೆಯ ಹರ್ಮೆನ್ಯೂಟಿಕ್ ಕೇಂದ್ರ.", "hi": "सर्वोत्तमत्वम्। मध्व-दृष्ट्या समस्त-गीताया हर्मेन्यूतिक-केन्द्रम्।"},
    tags: ["c_hari_sarvottamatva"],
    madhva: {"en": "For Madhva, Purushottama strictly = Hari, NOT jiva-paramatma-aikya as Advaita reads.", "dev": "मध्व-मते पुरुषोत्तमः = हरिः एव; न अद्वैतोक्तं जीव-परमात्म-ऐक्यम्।", "kn": "ಮಧ್ವ-ಮತದಲ್ಲಿ ಪುರುಷೋತ್ತಮ = ಹರಿಯೇ; ಅದ್ವೈತೋಕ್ತ ಜೀವ-ಪರಮಾತ್ಮ-ಐಕ್ಯವಲ್ಲ.", "hi": "मध्व-मते पुरुषोत्तमः = हरिः एव; न अद्वैतोक्तं जीव-परमात्म-ऐक्यम्।"},
  },
  {
    id: "n_0048", position: 48, shloka_id: "sl_006", tier: "lila_guna",
    name:  {"iast": "padmanābhaḥ", "dev": "पद्मनाभः", "kn": "ಪದ್ಮನಾಭಃ", "hi": "पद्मनाभः"},
    artha: {"en": "Lotus-naveled. From Hari's navel emerges the lotus from which Brahma is born; the cosmogonic image par excellence.", "dev": "पद्मनाभः - यस्य नाभेः पद्मम् उद्भवति, तस्मात् पद्मात् ब्रह्मा। सृष्टि-क्रमस्य प्रतीक-नाम।", "kn": "ಪದ್ಮನಾಭ — ಯಾವನ ನಾಭಿಯಿಂದ ಪದ್ಮ ಉದ್ಭವಿಸುತ್ತದೋ, ಆ ಪದ್ಮದಿಂದ ಬ್ರಹ್ಮ. ಸೃಷ್ಟಿ-ಕ್ರಮದ ಪ್ರತೀಕ-ನಾಮ.", "hi": "पद्मनाभः - यस्य नाभेः पद्मम् उद्भवति, तस्मात् पद्मात् ब्रह्मा। सृष्टि-क्रमस्य प्रतीक-नाम।"},
    guna:  {"en": "Srshti-mula-bhuta-rupa. The Garbhodakashayi form; iconographic locus of the cosmogonic act.", "dev": "सृष्टि-मूल-भूत-रूपम्। गर्भोदकशायि-रूपम्; सृष्टि-कर्मणः मूर्त-केन्द्रम्।", "kn": "ಸೃಷ್ಟಿ-ಮೂಲ-ಭೂತ-ರೂಪ. ಗರ್ಭೋದಕಶಾಯಿ-ರೂಪ; ಸೃಷ್ಟಿ-ಕರ್ಮದ ಮೂರ್ತ ಕೇಂದ್ರ.", "hi": "सृष्टि-मूल-भूत-रूपम्। गर्भोदकशायि-रूपम्; सृष्टि-कर्मणः मूर्त-केन्द्रम्।"},
    tags: ["c_srshti_kartrtva"],
  },
  {
    id: "n_0049", position: 49, shloka_id: "sl_006", tier: "para_tattva",
    name:  {"iast": "amaraprabhuḥ", "dev": "अमरप्रभुः", "kn": "ಅಮರಪ್ರಭುಃ", "hi": "अमरप्रभुः"},
    artha: {"en": "Lord of the immortals - the devas, the residents of svarga.", "dev": "अमर-प्रभुः - देवानां स्वामी, स्वर्ग-वासिनां पतिः।", "kn": "ಅಮರ-ಪ್ರಭು — ದೇವತೆಗಳ ಸ್ವಾಮಿ, ಸ್ವರ್ಗ-ವಾಸಿಗಳ ಪತಿ.", "hi": "अमर-प्रभुः - देवानां स्वामी, स्वर्ग-वासिनां पतिः।"},
    guna:  {"en": "Deva-naam adhipatitvam. Establishes Hari as superior to all devas - foundational for Madhva taratamya.", "dev": "देवानाम् अधिपतित्वम्। मध्व-तारतम्य-सिद्धान्तस्य आधारः।", "kn": "ದೇವತೆಗಳ ಅಧಿಪತಿತ್ವ. ಮಧ್ವ-ತಾರತಮ್ಯ-ಸಿದ್ಧಾಂತದ ಆಧಾರ.", "hi": "देवानाम् अधिपतित्वम्। मध्व-तारतम्य-सिद्धान्तस्य आधारः।"},
    tags: ["c_hari_sarvottamatva"],
  },
  {
    id: "n_0057", position: 57, shloka_id: "sl_007", tier: "lila_guna",
    name:  {"iast": "kṛṣṇaḥ", "dev": "कृष्णः", "kn": "ಕೃಷ್ಣಃ", "hi": "कृष्णः"},
    artha: {"en": "Krishna - 'dark-blue/black one' (root krsh, 'to draw/attract'). Also: he who removes (krsh-) the sins of devotees.", "dev": "कृष्णः - कृष्-धातोः। श्याम-वर्णः, अथ च भक्तानां पापानां कर्षणकर्ता।", "kn": "ಕೃಷ್ಣ — ಕೃಷ್ ಧಾತುವಿನಿಂದ. ಶ್ಯಾಮ-ವರ್ಣ, ಮತ್ತು ಭಕ್ತರ ಪಾಪಗಳನ್ನು ಆಕರ್ಷಿಸಿ ತೆಗೆಯುವವನು.", "hi": "कृष्णः - कृष्-धातोः। श्याम-वर्णः, अथ च भक्तानां पापानां कर्षणकर्ता।"},
    guna:  {"en": "Avatara-rupa - the Yadava-vamsha avatara; central for the Bhagavata tradition. Also: bhakta-vatsala.", "dev": "अवतार-रूपम् - यादव-वंश-अवतारः; भागवत-सम्प्रदायस्य केन्द्रम्। भक्त-वत्सलः च।", "kn": "ಅವತಾರ-ರೂಪ — ಯಾದವ-ವಂಶ-ಅವತಾರ; ಭಾಗವತ-ಸಂಪ್ರದಾಯದ ಕೇಂದ್ರ. ಭಕ್ತ-ವತ್ಸಲನೂ ಆಗಿದ್ದಾನೆ.", "hi": "अवतार-रूपम् - यादव-वंश-अवतारः; भागवत-सम्प्रदायस्य केन्द्रम्। भक्त-वत्सलः च।"},
    tags: ["c_avatara_rupa"],
    madhva: {"en": "For Madhva, Krishna is svayam-bhagavan, not an avatara of Vishnu but Vishnu himself in human form.", "dev": "मध्व-मते कृष्णः स्वयं-भगवान्; न तु विष्णोः अवतारः, अपि तु विष्णुरेव मानुष-रूपेण।", "kn": "ಮಧ್ವ-ಮತದಲ್ಲಿ ಕೃಷ್ಣ ಸ್ವಯಂ-ಭಗವಾನ್; ವಿಷ್ಣುವಿನ ಅವತಾರವಲ್ಲ, ವಿಷ್ಣುವೇ ಮಾನುಷ-ರೂಪದಲ್ಲಿ.", "hi": "मध्व-मते कृष्णः स्वयं-भगवान्; न तु विष्णोः अवतारः, अपि तु विष्णुरेव मानुष-रूपेण।"},
  },
  {
    id: "n_0073", position: 73, shloka_id: "sl_008", tier: "lila_guna",
    name:  {"iast": "madhusūdanaḥ", "dev": "मधुसूदनः", "kn": "ಮಧುಸೂದನಃ", "hi": "मधुसूदनः"},
    artha: {"en": "Slayer of the demon Madhu. The naimittika rupa as defender of dharma.", "dev": "मधुसूदनः - मधु-नाम्नः असुरस्य घातकः। धर्म-संरक्षण-निमित्त-रूपम्।", "kn": "ಮಧುಸೂದನ — ಮಧು ಎಂಬ ಅಸುರನ ಸಂಹಾರಕ. ಧರ್ಮ-ಸಂರಕ್ಷಣ-ನಿಮಿತ್ತ ರೂಪ.", "hi": "मधुसूदनः - मधु-नाम्नः असुरस्य घातकः। धर्म-संरक्षण-निमित्त-रूपम्।"},
    guna:  {"en": "Adharma-nivartakatva. The avatara-purpose as stated in BG 4.7-8 - paritranaya sadhunam vinashaya ca dushkrtam.", "dev": "अधर्म-निवर्तकत्वम्। गीता ४।७-८-स्थः अवतार-उद्देशः - परित्राणाय साधूनां विनाशाय च दुष्कृताम्।", "kn": "ಅಧರ್ಮ-ನಿವರ್ತಕತ್ವ. ಗೀತಾ ೪।೭-೮ರಲ್ಲಿ ಅವತಾರ-ಉದ್ದೇಶ — ಪರಿತ್ರಾಣಾಯ ಸಾಧೂನಾಂ ವಿನಾಶಾಯ ಚ ದುಷ್ಕೃತಾಂ.", "hi": "अधर्म-निवर्तकत्वम्। गीता ४।७-८-स्थः अवतार-उद्देशः - परित्राणाय साधूनां विनाशाय च दुष्कृताम्।"},
    tags: ["c_avatara_rupa", "c_karunya"],
  },
  {
    id: "n_0126", position: 126, shloka_id: "sl_014", tier: "karunya_guna",
    name:  {"iast": "janārdanaḥ", "dev": "जनार्दनः", "kn": "ಜನಾರ್ದನಃ", "hi": "जनार्दनः"},
    artha: {"en": "Janardana - 'beseecher of beings' (jana + arda - to ask/move). Hari is petitioned by all beings; or: he distresses (arda) the demons (jana = asuras).", "dev": "जनार्दनः - 'जन' (असुराः) + 'अर्द' (पीडा-दानम्); असुर-संहर्ता। अथवा 'जन' (भक्ताः) + 'अर्द' (अभ्यर्थना); भक्तैः अभ्यर्थ्यमानः।", "kn": "ಜನಾರ್ದನ — 'ಜನ' (ಅಸುರರು) + 'ಅರ್ದ' (ಪೀಡೆ ನೀಡುವುದು); ಅಸುರ-ಸಂಹರ್ತಾ. ಅಥವಾ 'ಜನ' (ಭಕ್ತರು) + 'ಅರ್ದ' (ಅಭ್ಯರ್ಥನೆ); ಭಕ್ತರಿಂದ ಅಭ್ಯರ್ಥ್ಯಮಾನ.", "hi": "जनार्दनः - 'जन' (असुराः) + 'अर्द' (पीडा-दानम्); असुर-संहर्ता। अथवा 'जन' (भक्ताः) + 'अर्द' (अभ्यर्थना); भक्तैः अभ्यर्थ्यमानः।"},
    guna:  {"en": "Bipolar guna: simultaneously samharaka of asuras AND ashraya of devotees. Both ends of the avatara-rationale.", "dev": "द्वैधी-गुणः - असुर-संहारकः च भक्त-आश्रयः च। अवतार-प्रयोजनस्य द्वि-पक्षम्।", "kn": "ದ್ವೈಧೀ-ಗುಣ — ಅಸುರ-ಸಂಹಾರಕ ಮತ್ತು ಭಕ್ತ-ಆಶ್ರಯ. ಅವತಾರ-ಪ್ರಯೋಜನದ ದ್ವಿ-ಪಕ್ಷ.", "hi": "द्वैधी-गुणः - असुर-संहारकः च भक्त-आश्रयः च। अवतार-प्रयोजनस्य द्वि-पक्षम्।"},
    tags: ["c_karunya", "c_avatara_rupa"],
  },
  {
    id: "n_0197", position: 197, shloka_id: "sl_020", tier: "karunya_guna",
    name:  {"iast": "govindaḥ", "dev": "गोविन्दः", "kn": "ಗೋವಿಂದಃ", "hi": "गोविन्दः"},
    artha: {"en": "Govinda - 'finder/protector of cows' (go + vid - to know/find). Also: 'one who is known by the Vedas' (go = vac, Vedic words). Also: 'gopa-prabhu' of Vrindavana.", "dev": "गोविन्दः - गाः (धेनूः, अथवा वेद-वाचः, अथवा भूमिं) विन्दति इति। बहु-अर्थः - गोपालकः, वेद-वेद्यः, धरण्या उद्धर्ता।", "kn": "ಗೋವಿಂದ — ಗೋ (ಧೇನು, ಅಥವಾ ವೇದ-ವಾಣಿ, ಅಥವಾ ಭೂಮಿ)ಯನ್ನು ತಿಳಿಯುತ್ತಾನೆ/ಪಡೆಯುತ್ತಾನೆ. ಬಹು-ಅರ್ಥ — ಗೋಪಾಲಕ, ವೇದ-ವೇದ್ಯ, ಭೂಮಿಯ ಉದ್ಧಾರಕ.", "hi": "गोविन्दः - गाः (धेनूः, अथवा वेद-वाचः, अथवा भूमिं) विन्दति इति। बहु-अर्थः - गोपालकः, वेद-वेद्यः, धरण्या उद्धर्ता।"},
    guna:  {"en": "Bhakta-vatsala-rupa-vishesha. The most affectionately-known nama; the Vraja-rasa locus.", "dev": "भक्त-वत्सल-रूप-विशेषः। सर्व-नाम्नां सान्द्रतम-स्नेह-निकेतनम्; व्रज-रसस्य आधारम्।", "kn": "ಭಕ್ತ-ವತ್ಸಲ-ರೂಪ-ವಿಶೇಷ. ಎಲ್ಲ ನಾಮಗಳಲ್ಲಿ ಅತ್ಯಂತ ಸ್ನೇಹ-ನಿಲಯ; ವ್ರಜ-ರಸದ ಆಧಾರ.", "hi": "भक्त-वत्सल-रूप-विशेषः। सर्व-नाम्नां सान्द्रतम-स्नेह-निकेतनम्; व्रज-रसस्य आधारम्।"},
    tags: ["c_bhakta_vatsala"],
  },
  {
    id: "n_0245", position: 245, shloka_id: "sl_026", tier: "para_tattva",
    name:  {"iast": "nārāyaṇaḥ", "dev": "नारायणः", "kn": "ನಾರಾಯಣಃ", "hi": "नारायणः"},
    artha: {"en": "Narayana. Two etymologies: 'nara' = waters (or jivas), 'ayana' = abode - so 'he whose abode is the waters/jivas' AND 'he who is the goal of all jivas'.", "dev": "नारायणः - 'नार' (जल/जीव-समूह) + 'अयन' (आश्रय)। उभाव्यो: जल-शायिनः, जीव-निवासः; जीव-गन्तव्यः च।", "kn": "ನಾರಾಯಣ — 'ನಾರ' (ಜಲ/ಜೀವ-ಸಮೂಹ) + 'ಅಯನ' (ಆಶ್ರಯ). ಜಲ-ಶಾಯಿ, ಜೀವ-ನಿವಾಸ; ಜೀವ-ಗಂತವ್ಯ ಎರಡೂ.", "hi": "नारायणः - 'नार' (जल/जीव-समूह) + 'अयन' (आश्रय)। उभाव्यो: जल-शायिनः, जीव-निवासः; जीव-गन्तव्यः च।"},
    guna:  {"en": "Antaryami-bahirashraya-ubhaya-rupa: simultaneously the inner-dweller of every jiva AND the outer ground of all existence.", "dev": "अन्तर्यामि-बहिराश्रय-उभय-रूपम् - प्रत्येक-जीवस्य अन्तर्वासी च, सर्व-सत्तायाः बहिराश्रयः च।", "kn": "ಅಂತರ್ಯಾಮಿ-ಬಹಿರಾಶ್ರಯ-ಉಭಯ-ರೂಪ — ಪ್ರತಿ ಜೀವದ ಅಂತರ್ವಾಸಿ ಮತ್ತು ಸರ್ವ-ಸತ್ತೆಯ ಬಹಿರಾಶ್ರಯ.", "hi": "अन्तर्यामि-बहिराश्रय-उभय-रूपम् - प्रत्येक-जीवस्य अन्तर्वासी च, सर्व-सत्तायाः बहिराश्रयः च।"},
    tags: ["c_antaryamitva", "c_hari_sarvottamatva"],
    madhva: {"en": "Madhva: 'Narayana' is the supreme proper-noun for Hari; Brahman, Paramatman, Vasudeva etc. are all svarupaikya names for the same Narayana.", "dev": "मध्व-मते 'नारायणः' इति हरेः परम-प्रसिद्ध-नाम; ब्रह्म-परमात्म-वासुदेव-आदयः सर्वे स्वरूपैक्येन तस्यैव।", "kn": "ಮಧ್ವ-ಮತದಲ್ಲಿ 'ನಾರಾಯಣ' ಹರಿಯ ಪರಮ-ಪ್ರಸಿದ್ಧ ನಾಮ; ಬ್ರಹ್ಮ-ಪರಮಾತ್ಮ-ವಾಸುದೇವಾದಿಗಳೆಲ್ಲರೂ ಸ್ವರೂಪೈಕ್ಯದಿಂದ ಅವನೇ.", "hi": "मध्व-मते 'नारायणः' इति हरेः परम-प्रसिद्ध-नाम; ब्रह्म-परमात्म-वासुदेव-आदयः सर्वे स्वरूपैक्येन तस्यैव।"},
  },
  {
    id: "n_0337", position: 337, shloka_id: "sl_036", tier: "para_tattva",
    name:  {"iast": "vāsudevaḥ", "dev": "वासुदेवः", "kn": "ವಾಸುದೇವಃ", "hi": "वासुदेवः"},
    artha: {"en": "Vasudeva - 'all-pervading deva' (root vas - to dwell). Also: 'son of Vasudeva' (the Yadava patronym for Krishna).", "dev": "वासुदेवः - वस्-धातोः, सर्व-वासी देवः। अथवा वसुदेव-पुत्रः (कृष्णस्य पितृ-नाम-आधारः)।", "kn": "ವಾಸುದೇವ — ವಸ್ ಧಾತುವಿನಿಂದ, ಸರ್ವ-ವಾಸಿ ದೇವ. ಅಥವಾ ವಸುದೇವನ ಮಗ (ಕೃಷ್ಣನ ಪಿತೃ-ನಾಮಾಧಾರ).", "hi": "वासुदेवः - वस्-धातोः, सर्व-वासी देवः। अथवा वसुदेव-पुत्रः (कृष्णस्य पितृ-नाम-आधारः)।"},
    guna:  {"en": "Vyuha-mukhya: first member of the chatur-vyuha (Vasudeva, Sankarshana, Pradyumna, Aniruddha). Central for the Pancharatra-derived Madhva metaphysics.", "dev": "व्यूह-मुख्यः - चतुर्व्यूहस्य (वासुदेव-सङ्कर्षण-प्रद्युम्न-अनिरुद्ध) प्रथमः। पाञ्चरात्र-मूलक मध्व-तत्त्व-शास्त्रस्य केन्द्रम्।", "kn": "ವ್ಯೂಹ-ಮುಖ್ಯ — ಚತುರ್ವ್ಯೂಹದ (ವಾಸುದೇವ-ಸಂಕರ್ಷಣ-ಪ್ರದ್ಯುಮ್ನ-ಅನಿರುದ್ಧ) ಪ್ರಥಮ. ಪಾಂಚರಾತ್ರ-ಮೂಲಕ ಮಧ್ವ-ತತ್ತ್ವ-ಶಾಸ್ತ್ರದ ಕೇಂದ್ರ.", "hi": "व्यूह-मुख्यः - चतुर्व्यूहस्य (वासुदेव-सङ्कर्षण-प्रद्युम्न-अनिरुद्ध) प्रथमः। पाञ्चरात्र-मूलक मध्व-तत्त्व-शास्त्रस्य केन्द्रम्।"},
    tags: ["c_hari_sarvottamatva", "c_avatara_rupa"],
    madhva: {"en": "For Madhva, 'Vasudeva' carries the full sarvottamatva of Hari; it is not a lesser-form name.", "dev": "मध्व-मते 'वासुदेवः' पूर्ण-सर्वोत्तमत्व-वाची; न तु अल्प-रूप-नाम।", "kn": "ಮಧ್ವ-ಮತದಲ್ಲಿ 'ವಾಸುದೇವ' ಪೂರ್ಣ-ಸರ್ವೋತ್ತಮತ್ವ-ವಾಚಿ; ಅಲ್ಪ-ರೂಪ-ನಾಮವಲ್ಲ.", "hi": "मध्व-मते 'वासुदेवः' पूर्ण-सर्वोत्तमत्व-वाची; न तु अल्प-रूप-नाम।"},
  },
  {
    id: "n_0471", position: 471, shloka_id: "sl_048", tier: "svarupa_guna",
    name:  {"iast": "yajñaḥ", "dev": "यज्ञः", "kn": "ಯಜ್ಞಃ", "hi": "यज्ञः"},
    artha: {"en": "Yajna - 'sacrifice itself'. Hari is the embodiment of the Vedic sacrificial act; cf. BG 4.24 brahmarpanam brahma havih.", "dev": "यज्ञः - यज्ञ-स्वरूपः। गीता ४।२४-स्थः 'ब्रह्मार्पणं ब्रह्म हविः' इति वचनेन निरूपितः।", "kn": "ಯಜ್ಞ — ಯಜ್ಞ-ಸ್ವರೂಪ. ಗೀತಾ ೪।೨೪ರಲ್ಲಿ 'ಬ್ರಹ್ಮಾರ್ಪಣಂ ಬ್ರಹ್ಮ ಹವಿಃ' ಎಂಬ ವಚನದಿಂದ ನಿರೂಪಿತ.", "hi": "यज्ञः - यज्ञ-स्वरूपः। गीता ४।२४-स्थः 'ब्रह्मार्पणं ब्रह्म हविः' इति वचनेन निरूपितः।"},
    guna:  {"en": "Yajna-svarupa-tva. Karma-kanda's entire teleology collapses into Hari.", "dev": "यज्ञ-स्वरूप-त्वम्। समस्त-कर्म-काण्डस्य प्रयोजन-तत्त्वम् हरि-निष्ठम्।", "kn": "ಯಜ್ಞ-ಸ್ವರೂಪ-ತ್ವ. ಸಮಸ್ತ ಕರ್ಮ-ಕಾಂಡದ ಪ್ರಯೋಜನ-ತತ್ತ್ವ ಹರಿ-ನಿಷ್ಠ.", "hi": "यज्ञ-स्वरूप-त्वम्। समस्त-कर्म-काण्डस्य प्रयोजन-तत्त्वम् हरि-निष्ठम्।"},
    tags: ["c_yajna_svarupa"],
  },
  {
    id: "n_0530", position: 530, shloka_id: "sl_056", tier: "lila_guna",
    name:  {"iast": "trivikramaḥ", "dev": "त्रिविक्रमः", "kn": "ತ್ರಿವಿಕ್ರಮಃ", "hi": "त्रिविक्रमः"},
    artha: {"en": "Three-strider - the Vamana-avatara who pervaded the three worlds in three steps. Foundational Vedic-Vishnu epithet (RV 1.154).", "dev": "त्रिविक्रमः - त्रिभिः पादैः त्रीन् लोकान् क्रान्तवान्; वामनावतारः। ऋग्वेद १।१५४-स्थः परम-प्राचीनः विष्णु-स्तुतिः।", "kn": "ತ್ರಿವಿಕ್ರಮ — ಮೂರು ಹೆಜ್ಜೆಗಳಿಂದ ಮೂರು ಲೋಕಗಳನ್ನು ಆಕ್ರಮಿಸಿದವನು; ವಾಮನಾವತಾರ. ಋಗ್ವೇದ ೧।೧೫೪ರ ಪರಮ-ಪ್ರಾಚೀನ ವಿಷ್ಣು-ಸ್ತುತಿ.", "hi": "त्रिविक्रमः - त्रिभिः पादैः त्रीन् लोकान् क्रान्तवान्; वामनावतारः। ऋग्वेद १।१५४-स्थः परम-प्राचीनः विष्णु-स्तुतिः।"},
    guna:  {"en": "Avatara-rupa - the Vamana descent. Also: sarva-vyapakatva enacted as cosmic stride.", "dev": "अवतार-रूपम् - वामनावतारः। सर्व-व्यापकत्वम् च क्रिया-रूपेण निरूपितम्।", "kn": "ಅವತಾರ-ರೂಪ — ವಾಮನಾವತಾರ. ಸರ್ವ-ವ್ಯಾಪಕತ್ವವೂ ಕ್ರಿಯಾ-ರೂಪದಿಂದ ನಿರೂಪಿತ.", "hi": "अवतार-रूपम् - वामनावतारः। सर्व-व्यापकत्वम् च क्रिया-रूपेण निरूपितम्।"},
    tags: ["c_avatara_rupa", "c_sarva_vyapakatva"],
  },
  {
    id: "n_0591", position: 591, shloka_id: "sl_060", tier: "para_tattva",
    name:  {"iast": "bhagavān", "dev": "भगवान्", "kn": "ಭಗವಾನ್", "hi": "भगवान्"},
    artha: {"en": "Bhagavan - 'possessor of bhaga'. Bhaga = the six perfections (aishvarya, virya, yashas, shri, jnana, vairagya) per Vishnu-purana 6.5.74.", "dev": "भगवान् - 'भग'-शब्देन षट्-गुणाः (ऐश्वर्य-वीर्य-यशस्-श्री-ज्ञान-वैराग्य); विष्णु-पुराण ६।५।७४-स्थः।", "kn": "ಭಗವಾನ್ — 'ಭಗ' ಎಂದರೆ ಷಡ್-ಗುಣಗಳು (ಐಶ್ವರ್ಯ-ವೀರ್ಯ-ಯಶಸ್-ಶ್ರೀ-ಜ್ಞಾನ-ವೈರಾಗ್ಯ); ವಿಷ್ಣು-ಪುರಾಣ ೬।೫।೭೪.", "hi": "भगवान् - 'भग'-शब्देन षट्-गुणाः (ऐश्वर्य-वीर्य-यशस्-श्री-ज्ञान-वैराग्य); विष्णु-पुराण ६।५।७४-स्थः।"},
    guna:  {"en": "Shad-guna-paripurnatva. The canonical 'fullness' name; technical term across Vaishnava systems.", "dev": "षड्-गुण-परिपूर्णत्वम्। समस्त-वैष्णव-सम्प्रदाय-सम्मतं तकनीकी-शब्दम्।", "kn": "ಷಡ್-ಗುಣ-ಪರಿಪೂರ್ಣತ್ವ. ಸಮಸ್ತ ವೈಷ್ಣವ-ಸಂಪ್ರದಾಯ-ಸಮ್ಮತ ತಾಂತ್ರಿಕ ಶಬ್ದ.", "hi": "षड्-गुण-परिपूर्णत्वम्। समस्त-वैष्णव-सम्प्रदाय-सम्मतं तकनीकी-शब्दम्।"},
    tags: ["c_hari_sarvottamatva", "c_sat_svarupa"],
  },
  {
    id: "n_0594", position: 594, shloka_id: "sl_060", tier: "bhakta_sambandha",
    name:  {"iast": "vanamālī", "dev": "वनमाली", "kn": "ವನಮಾಲೀ", "hi": "वनमाली"},
    artha: {"en": "Wearer of the vana-mala - the forest-flower garland reaching from neck to feet. The iconographic Krishna-rupa.", "dev": "वनमाली - कण्ठ-प्रदेशात् पादपर्यन्तं प्रलम्बमानां वन-पुष्पाणां मालां धरति इति। साक्षात्-कृष्ण-रूपस्य प्रतीक-नाम।", "kn": "ವನಮಾಲಿ — ಕಂಠದಿಂದ ಪಾದದವರೆಗೆ ತೂಗುತ್ತಿರುವ ವನ-ಪುಷ್ಪಗಳ ಮಾಲೆ ಧರಿಸಿದವನು. ಸಾಕ್ಷಾತ್-ಕೃಷ್ಣ-ರೂಪದ ಪ್ರತೀಕ-ನಾಮ.", "hi": "वनमाली - कण्ठ-प्रदेशात् पादपर्यन्तं प्रलम्बमानां वन-पुष्पाणां मालां धरति इति। साक्षात्-कृष्ण-रूपस्य प्रतीक-नाम।"},
    guna:  {"en": "Bhakti-priyatva: the saulabhya (accessibility) rupa, in contrast to vishva-rupa awesomeness.", "dev": "भक्ति-प्रियत्वम्; सौलभ्य-रूपम्, विश्व-रूप-भीम-त्वस्य प्रति-पक्षः।", "kn": "ಭಕ್ತಿ-ಪ್ರಿಯತ್ವ; ಸೌಲಭ್ಯ-ರೂಪ, ವಿಶ್ವ-ರೂಪ-ಭೀಮತ್ವದ ಪ್ರತಿ-ಪಕ್ಷ.", "hi": "भक्ति-प्रियत्वम्; सौलभ्य-रूपम्, विश्व-रूप-भीम-त्वस्य प्रति-पक्षः।"},
    tags: ["c_bhakta_vatsala"],
  },
  {
    id: "n_0641", position: 641, shloka_id: "sl_065", tier: "karunya_guna",
    name:  {"iast": "śrīdaḥ", "dev": "श्रीदः", "kn": "ಶ್ರೀದಃ", "hi": "श्रीदः"},
    artha: {"en": "Giver of shri - of prosperity, auspiciousness, glory. The donor-aspect.", "dev": "श्रीदः - श्रीं (समृद्धिं, मङ्गलं, यशः) ददाति इति।", "kn": "ಶ್ರೀದ — ಶ್ರೀ (ಸಮೃದ್ಧಿ, ಮಂಗಲ, ಯಶಸ್ಸು) ನೀಡುತ್ತಾನೆ.", "hi": "श्रीदः - श्रीं (समृद्धिं, मङ्गलं, यशः) ददाति इति।"},
    guna:  {"en": "Sampad-prada-tva. The artha-purushartha angle of Hari's grace.", "dev": "सम्पद्-प्रदत्वम्। हरि-कारुण्यस्य अर्थ-पुरुषार्थ-पक्षः।", "kn": "ಸಂಪತ್-ಪ್ರದತ್ವ. ಹರಿ-ಕಾರುಣ್ಯದ ಅರ್ಥ-ಪುರುಷಾರ್ಥ ಪಕ್ಷ.", "hi": "सम्पद्-प्रदत्वम्। हरि-कारुण्यस्य अर्थ-पुरुषार्थ-पक्षः।"},
    tags: ["c_karunya"],
  },
  {
    id: "n_0643", position: 643, shloka_id: "sl_065", tier: "para_tattva",
    name:  {"iast": "śrīnivāsaḥ", "dev": "श्रीनिवासः", "kn": "ಶ್ರೀನಿವಾಸಃ", "hi": "श्रीनिवासः"},
    artha: {"en": "Shrinivasa - 'abode of Shri/Lakshmi'. Hari is the eternal residence of Lakshmi; iconographic name for the Venkatesha form at Tirumala.", "dev": "श्रीनिवासः - श्रीः (लक्ष्मीः) यस्मिन् नित्यं वसति। तिरुपति-वेङ्कटेशस्य प्रसिद्धं नाम।", "kn": "ಶ್ರೀನಿವಾಸ — ಶ್ರೀ (ಲಕ್ಷ್ಮಿ) ಯಾವನಲ್ಲಿ ನಿತ್ಯವಾಸ ಮಾಡುತ್ತಾಳೋ. ತಿರುಪತಿ-ವೆಂಕಟೇಶನ ಪ್ರಸಿದ್ಧ ನಾಮ.", "hi": "श्रीनिवासः - श्रीः (लक्ष्मीः) यस्मिन् नित्यं वसति। तिरुपति-वेङ्कटेशस्य प्रसिद्धं नाम।"},
    guna:  {"en": "Lakshmi-pati-tva. The Sri-Vishnu mithuna doctrine; Lakshmi as eternal akshara puruṣa of BG 15.16 in Madhva reading.", "dev": "लक्ष्मी-पति-त्वम्। श्री-विष्णु-मिथुन-सिद्धान्तः; गीता १५।१६-स्थः अक्षर-पुरुषः मध्व-मते लक्ष्मीः।", "kn": "ಲಕ್ಷ್ಮೀ-ಪತಿ-ತ್ವ. ಶ್ರೀ-ವಿಷ್ಣು-ಮಿಥುನ ಸಿದ್ಧಾಂತ; ಗೀತಾ ೧೫।೧೬ ಅಕ್ಷರ-ಪುರುಷ ಮಧ್ವ-ಮತದಲ್ಲಿ ಲಕ್ಷ್ಮಿ.", "hi": "लक्ष्मी-पति-त्वम्। श्री-विष्णु-मिथुन-सिद्धान्तः; गीता १५।१६-स्थः अक्षर-पुरुषः मध्व-मते लक्ष्मीः।"},
    tags: ["c_lakshmi_sambandha"],
    madhva: {"en": "Madhva: Sri/Lakshmi is the highest jiva-tattva, eternally subordinate to Hari but supreme above all other jivas (Brahma included).", "dev": "मध्व-मते लक्ष्मीः उच्चतमं जीव-तत्त्वम्, हरेः नित्य-परतन्त्रा, अथ च ब्रह्मादीन् सर्व-जीवान् अतिशेते।", "kn": "ಮಧ್ವ-ಮತದಲ್ಲಿ ಲಕ್ಷ್ಮೀ ಉಚ್ಚತಮ ಜೀವ-ತತ್ತ್ವ, ಹರಿಯ ನಿತ್ಯ-ಪರತಂತ್ರ, ಆದರೆ ಬ್ರಹ್ಮಾದಿ ಸರ್ವ-ಜೀವಗಳಿಗಿಂತ ಮೇಲೆ.", "hi": "मध्व-मते लक्ष्मीः उच्चतमं जीव-तत्त्वम्, हरेः नित्य-परतन्त्रा, अथ च ब्रह्मादीन् सर्व-जीवान् अतिशेते।"},
  },
  {
    id: "n_0650", position: 650, shloka_id: "sl_065", tier: "para_tattva",
    name:  {"iast": "lokatrayāśrayaḥ", "dev": "लोकत्रयाश्रयः", "kn": "ಲೋಕತ್ರಯಾಶ್ರಯಃ", "hi": "लोकत्रयाश्रयः"},
    artha: {"en": "Refuge of the three worlds. The ultimate ashraya of bhuh, bhuvah, svah.", "dev": "लोक-त्रय-आश्रयः - भूः-भुवः-स्वः इति त्रयाणां लोकानाम् अन्तिमं आश्रयभूतः।", "kn": "ಲೋಕ-ತ್ರಯ-ಆಶ್ರಯ — ಭೂಃ, ಭುವಃ, ಸ್ವಃ ಮೂರು ಲೋಕಗಳ ಅಂತಿಮ ಆಶ್ರಯಭೂತ.", "hi": "लोक-त्रय-आश्रयः - भूः-भुवः-स्वः इति त्रयाणां लोकानाम् अन्तिमं आश्रयभूतः।"},
    guna:  {"en": "Sarva-loka-niyamakatva. Hari as the unconditioned ground of all three worlds.", "dev": "सर्व-लोक-नियामकत्वम्। हरिः त्रिलोक-निरुपाधिक-आधारः।", "kn": "ಸರ್ವ-ಲೋಕ-ನಿಯಾಮಕತ್ವ. ಹರಿಯು ತ್ರಿಲೋಕ-ನಿರುಪಾಧಿಕ-ಆಧಾರ.", "hi": "सर्व-लोक-नियामकत्वम्। हरिः त्रिलोक-निरुपाधिक-आधारः।"},
    tags: ["c_hari_sarvottamatva"],
  },
  {
    id: "n_0656", position: 656, shloka_id: "sl_069", tier: "karunya_guna",
    name:  {"iast": "hariḥ", "dev": "हरिः", "kn": "ಹರಿಃ", "hi": "हरिः"},
    artha: {"en": "Hari - 'remover' (root hr - to take away). He who takes away the suffering, sins, and bondages of devotees.", "dev": "हरिः - हृ-धातोः; भक्तानां दुःख-पाप-बन्धन-हर्ता।", "kn": "ಹರಿ — ಹೃ ಧಾತುವಿನಿಂದ; ಭಕ್ತರ ದುಃಖ-ಪಾಪ-ಬಂಧನಗಳ ಹರ್ತಾ.", "hi": "हरिः - हृ-धातोः; भक्तानां दुःख-पाप-बन्धन-हर्ता।"},
    guna:  {"en": "Akhilagha-haritva. Bhakta-paratantra-uddhara: liberates devotees from samsara-bandhana.", "dev": "अखिल-अघ-हारित्वम्। भक्त-परतन्त्र-उद्धारः; संसार-बन्धनात् भक्तानां मोचनम्।", "kn": "ಅಖಿಲ-ಅಘ-ಹಾರಿತ್ವ. ಭಕ್ತ-ಪರತಂತ್ರ-ಉದ್ಧಾರ; ಸಂಸಾರ-ಬಂಧನದಿಂದ ಭಕ್ತರ ಮೋಚನ.", "hi": "अखिल-अघ-हारित्वम्। भक्त-परतन्त्र-उद्धारः; संसार-बन्धनात् भक्तानां मोचनम्।"},
    tags: ["c_karunya", "c_moksha_prada"],
    madhva: {"en": "Madhva's most-emphasized nama. 'Hari-sarvottamatva' is the central axiom of his entire system - 'Hari is highest above all'.", "dev": "मध्व-सम्प्रदायस्य परम-केन्द्र-नाम। 'हरि-सर्वोत्तमत्वम्' इति समस्त-मध्व-तत्त्व-शास्त्रस्य आधार-अक्षम् - 'सर्वोपरि हरिः'।", "kn": "ಮಧ್ವ-ಸಂಪ್ರದಾಯದ ಪರಮ-ಕೇಂದ್ರ-ನಾಮ. 'ಹರಿ-ಸರ್ವೋತ್ತಮತ್ವ' ಸಮಸ್ತ ಮಧ್ವ-ತತ್ತ್ವ-ಶಾಸ್ತ್ರದ ಆಧಾರ-ಅಕ್ಷ — 'ಸರ್ವೋಪರಿ ಹರಿಃ'.", "hi": "मध्व-सम्प्रदायस्य परम-केन्द्र-नाम। 'हरि-सर्वोत्तमत्वम्' इति समस्त-मध्व-तत्त्व-शास्त्रस्य आधार-अक्षम् - 'सर्वोपरि हरिः'।"},
  },
  {
    id: "n_0702", position: 702, shloka_id: "sl_071", tier: "para_tattva",
    name:  {"iast": "brahmā", "dev": "ब्रह्मा", "kn": "ಬ್ರಹ್ಮಾ", "hi": "ब्रह्मा"},
    artha: {"en": "Brahma (with long-a) - 'the great expanding one'. Names Hari as the brhat tattva, not the four-faced Brahma-devata.", "dev": "ब्रह्मा (दीर्घ-आकारः) - 'बृहत्' इति। निःसीम-तत्त्व-स्वरूपः, न तु चतुर्मुख-ब्रह्म-देवः।", "kn": "ಬ್ರಹ್ಮಾ (ದೀರ್ಘಾಕಾರ) — 'ಬೃಹತ್' ಎಂದು. ನಿಃಸೀಮ-ತತ್ತ್ವ-ಸ್ವರೂಪ, ಚತುರ್ಮುಖ ಬ್ರಹ್ಮ-ದೇವತೆಯಲ್ಲ.", "hi": "ब्रह्मा (दीर्घ-आकारः) - 'बृहत्' इति। निःसीम-तत्त्व-स्वरूपः, न तु चतुर्मुख-ब्रह्म-देवः।"},
    guna:  {"en": "Nirupadhika-paripurnatva: unconditioned fullness. The semantic anchor for the contested Brahman-shabda.", "dev": "निरुपाधिक-परिपूर्णत्वम्। विवाद-ग्रस्तस्य ब्रह्म-शब्दस्य अर्थ-निर्धारणम्।", "kn": "ನಿರುಪಾಧಿಕ-ಪರಿಪೂರ್ಣತ್ವ. ವಿವಾದಗ್ರಸ್ತ ಬ್ರಹ್ಮ-ಶಬ್ದದ ಅರ್ಥ-ನಿರ್ಧಾರ.", "hi": "निरुपाधिक-परिपूर्णत्वम्। विवाद-ग्रस्तस्य ब्रह्म-शब्दस्य अर्थ-निर्धारणम्।"},
    tags: ["c_hari_sarvottamatva"],
    madhva: {"en": "For Madhva, the 'Brahman' of Upanishads is strictly Hari/Vishnu/Narayana - not a nirvishesha tattva nor the chatur-mukha Brahma.", "dev": "मध्व-मते उपनिषद्-ब्रह्म-शब्दः अनन्यथा हरिः/विष्णुः/नारायणः - न निर्विशेष-तत्त्वम्, न चतुर्मुख-ब्रह्मा।", "kn": "ಮಧ್ವ-ಮತದಲ್ಲಿ ಉಪನಿಷದ್-ಬ್ರಹ್ಮ-ಶಬ್ದ ಅನ್ಯಥಾ ಅಲ್ಲ — ಹರಿಯೇ; ನಿರ್ವಿಶೇಷ-ತತ್ತ್ವವಲ್ಲ, ಚತುರ್ಮುಖ-ಬ್ರಹ್ಮನೂ ಅಲ್ಲ.", "hi": "मध्व-मते उपनिषद्-ब्रह्म-शब्दः अनन्यथा हरिः/विष्णुः/नारायणः - न निर्विशेष-तत्त्वम्, न चतुर्मुख-ब्रह्मा।"},
  },
  {
    id: "n_0333", position: 333, shloka_id: "sl_036", tier: "svarupa_guna",
    name:  {"iast": "bṛhadbhānuḥ", "dev": "बृहद्भानुः", "kn": "ಬೃಹದ್ಭಾನುಃ", "hi": "बृहद्भानुः"},
    artha: {"en": "The great luminary. Hari as the source-light of all light; cf. BG 13.17 jyotisham api taj jyotis.", "dev": "बृहत्-भानुः - महा-ज्योतिः; सर्व-प्रकाशानां प्रकाशकः। गीता १३।१७-स्थः 'ज्योतिषामपि तत् ज्योतिः'।", "kn": "ಬೃಹದ್ಭಾನು — ಮಹಾ-ಜ್ಯೋತಿ; ಎಲ್ಲ ಪ್ರಕಾಶಗಳ ಪ್ರಕಾಶಕ. ಗೀತಾ ೧೩।೧೭ರಲ್ಲಿ 'ಜ್ಯೋತಿಷಾಮಪಿ ತತ್ ಜ್ಯೋತಿಃ'.", "hi": "बृहत्-भानुः - महा-ज्योतिः; सर्व-प्रकाशानां प्रकाशकः। गीता १३।१७-स्थः 'ज्योतिषामपि तत् ज्योतिः'।"},
    guna:  {"en": "Jyotir-jyoti-svarupa: the self-luminous light beyond all luminaries.", "dev": "ज्योतिषां ज्योति-स्वरूपम्। निरुपाधिक-स्वयं-प्रकाशता।", "kn": "ಜ್ಯೋತಿರ್ಜ್ಯೋತಿ-ಸ್ವರೂಪ. ನಿರುಪಾಧಿಕ-ಸ್ವಯಂ-ಪ್ರಕಾಶತೆ.", "hi": "ज्योतिषां ज्योति-स्वरूपम्। निरुपाधिक-स्वयं-प्रकाशता।"},
    tags: ["c_sat_svarupa"],
  },
  {
    id: "n_0777", position: 777, shloka_id: "sl_078", tier: "bhakta_sambandha",
    name:  {"iast": "lokabandhuḥ", "dev": "लोकबन्धुः", "kn": "ಲೋಕಬಂಧುಃ", "hi": "लोकबन्धुः"},
    artha: {"en": "Friend of all worlds. The relational name - Hari is the bandhu of every being.", "dev": "लोक-बन्धुः - सर्व-लोकानां सुहृत्; प्रत्येक-भूतस्य आत्म-बन्धु-भावेन वर्तते।", "kn": "ಲೋಕ-ಬಂಧು — ಸರ್ವ-ಲೋಕಗಳ ಸುಹೃತ್; ಪ್ರತಿ ಭೂತಕ್ಕೆ ಆತ್ಮ-ಬಂಧುವಾಗಿ ವರ್ತಿಸುತ್ತಾನೆ.", "hi": "लोक-बन्धुः - सर्व-लोकानां सुहृत्; प्रत्येक-भूतस्य आत्म-बन्धु-भावेन वर्तते।"},
    guna:  {"en": "Sarva-bhuta-sauhrda. The relational-affection guna; basis for prapatti.", "dev": "सर्व-भूत-सौहार्दम्। सम्बन्ध-स्नेह-गुणः; प्रपत्तेः मूलाधारः।", "kn": "ಸರ್ವ-ಭೂತ-ಸೌಹಾರ್ದ. ಸಂಬಂಧ-ಸ್ನೇಹ-ಗುಣ; ಪ್ರಪತ್ತಿಯ ಮೂಲಾಧಾರ.", "hi": "सर्व-भूत-सौहार्दम्। सम्बन्ध-स्नेह-गुणः; प्रपत्तेः मूलाधारः।"},
    tags: ["c_bhakta_vatsala"],
  },
  {
    id: "n_0780", position: 780, shloka_id: "sl_078", tier: "bhakta_sambandha",
    name:  {"iast": "bhaktavatsalaḥ", "dev": "भक्तवत्सलः", "kn": "ಭಕ್ತವತ್ಸಲಃ", "hi": "भक्तवत्सलः"},
    artha: {"en": "Affectionate to devotees - vatsalya is the love-of-a-mother-cow-for-her-calf. The proper-name for Hari's specific tenderness toward bhaktas.", "dev": "भक्त-वत्सलः - भक्तेषु वत्सलः; मातु-धेनुः वत्सेषु यथा वत्सलता तथा भक्तेषु।", "kn": "ಭಕ್ತ-ವತ್ಸಲ — ಭಕ್ತರಲ್ಲಿ ವತ್ಸಲ; ಮಾತೃ-ಧೇನು ಕರುವಿನಲ್ಲಿ ತೋರುವ ವತ್ಸಲತೆಯಂತೆ ಭಕ್ತರಲ್ಲಿ.", "hi": "भक्त-वत्सलः - भक्तेषु वत्सलः; मातु-धेनुः वत्सेषु यथा वत्सलता तथा भक्तेषु।"},
    guna:  {"en": "Bhakta-vatsalatva (proper-noun guna). One of the four canonical relations to bhaktas.", "dev": "भक्त-वत्सलत्वम् (विशिष्ट-गुण-नाम)। भक्त-सम्बन्धस्य चतुर्विधेषु एकम्।", "kn": "ಭಕ್ತ-ವತ್ಸಲತ್ವ (ವಿಶಿಷ್ಟ-ಗುಣ-ನಾಮ). ಭಕ್ತ-ಸಂಬಂಧದ ನಾಲ್ಕು ರೂಪಗಳಲ್ಲಿ ಒಂದು.", "hi": "भक्त-वत्सलत्वम् (विशिष्ट-गुण-नाम)। भक्त-सम्बन्धस्य चतुर्विधेषु एकम्।"},
    tags: ["c_bhakta_vatsala"],
    madhva: {"en": "Mention of 'vatsala' is a key Madhva theme - Hari's swabhava is to remember and reward bhaktas; vatsalatva is not contingent.", "dev": "वत्सल-शब्दः मध्व-सम्प्रदाये अति-महत्त्व-शाली; भक्त-स्मरण-अनुग्रहौ हरेः स्वभाव-सिद्धौ, न प्रासङ्गिकौ।", "kn": "ವತ್ಸಲ-ಶಬ್ದ ಮಧ್ವ-ಸಂಪ್ರದಾಯದಲ್ಲಿ ಅತಿ-ಮಹತ್ತ್ವಶಾಲಿ; ಭಕ್ತ-ಸ್ಮರಣ-ಅನುಗ್ರಹಗಳು ಹರಿಯ ಸ್ವಭಾವ-ಸಿದ್ಧ, ಪ್ರಾಸಂಗಿಕ ಅಲ್ಲ.", "hi": "वत्सल-शब्दः मध्व-सम्प्रदाये अति-महत्त्व-शाली; भक्त-स्मरण-अनुग्रहौ हरेः स्वभाव-सिद्धौ, न प्रासङ्गिकौ।"},
  },
  {
    id: "n_0886", position: 886, shloka_id: "sl_089", tier: "svarupa_guna",
    name:  {"iast": "amṛtāśaḥ", "dev": "अमृताशः", "kn": "ಅಮೃತಾಶಃ", "hi": "अमृताशः"},
    artha: {"en": "Drinker/possessor of amrita. The immortality-bestowing aspect; also alludes to the kshira-sagara-mathana.", "dev": "अमृत-आशः - अमृत-भोक्ता; क्षीर-सागर-मन्थन-कथा-निर्देशः अपि।", "kn": "ಅಮೃತಾಶ — ಅಮೃತ-ಭೋಕ್ತಾ; ಕ್ಷೀರ-ಸಾಗರ-ಮಂಥನ-ಕಥೆಯ ನಿರ್ದೇಶವೂ.", "hi": "अमृत-आशः - अमृत-भोक्ता; क्षीर-सागर-मन्थन-कथा-निर्देशः अपि।"},
    guna:  {"en": "Amritatva-prada-tva. The classic Vaishnava soteriological function.", "dev": "अमृतत्व-प्रदत्वम्। शास्त्रीय-वैष्णव-सोटेरियोलोजी-कार्यम्।", "kn": "ಅಮೃತತ್ವ-ಪ್ರದತ್ವ. ಶಾಸ್ತ್ರೀಯ-ವೈಷ್ಣವ-ಸೋಟರಿಯಾಲಜಿ ಕಾರ್ಯ.", "hi": "अमृतत्व-प्रदत्वम्। शास्त्रीय-वैष्णव-सोटेरियोलोजी-कार्यम्।"},
    tags: ["c_moksha_prada"],
  },
  {
    id: "n_0963", position: 963, shloka_id: "sl_097", tier: "lila_guna",
    name:  {"iast": "cakrī", "dev": "चक्री", "kn": "ಚಕ್ರೀ", "hi": "चक्री"},
    artha: {"en": "Holder of the discus - Sudarshana-chakra. The chief ayudha; cosmic-order enforcer.", "dev": "चक्री - सुदर्शन-चक्र-धरः। प्रधान-आयुधम्; ब्रह्माण्ड-नियामक-शक्तेः मूर्तम्।", "kn": "ಚಕ್ರೀ — ಸುದರ್ಶನ-ಚಕ್ರ-ಧಾರಕ. ಪ್ರಧಾನ ಆಯುಧ; ಬ್ರಹ್ಮಾಂಡ-ನಿಯಾಮಕ-ಶಕ್ತಿಯ ಮೂರ್ತ ರೂಪ.", "hi": "चक्री - सुदर्शन-चक्र-धरः। प्रधान-आयुधम्; ब्रह्माण्ड-नियामक-शक्तेः मूर्तम्।"},
    guna:  {"en": "Niyamakatva-rupa-vishesha. The discus is the visible sign of his cosmic-governance.", "dev": "नियामकत्व-रूप-विशेषः। चक्रं ब्रह्माण्ड-शासन-शक्तेः दृश्य-चिह्नम्।", "kn": "ನಿಯಾಮಕತ್ವ-ರೂಪ-ವಿಶೇಷ. ಚಕ್ರವು ಬ್ರಹ್ಮಾಂಡ-ಶಾಸನ-ಶಕ್ತಿಯ ದೃಶ್ಯ-ಚಿಹ್ನ.", "hi": "नियामकत्व-रूप-विशेषः। चक्रं ब्रह्माण्ड-शासन-शक्तेः दृश्य-चिह्नम्।"},
    tags: ["c_avatara_rupa"],
  },
  {
    id: "n_0986", position: 986, shloka_id: "sl_099", tier: "svarupa_guna",
    name:  {"iast": "jīvanaḥ", "dev": "जीवनः", "kn": "ಜೀವನಃ", "hi": "जीवनः"},
    artha: {"en": "The Living One - the life-source; the prana of all pranas (cf. Kena Upanishad).", "dev": "जीवनः - प्राणानां प्राणः; जीव-शक्तेः मूल-स्रोतः।", "kn": "ಜೀವನ — ಪ್ರಾಣಗಳ ಪ್ರಾಣ; ಜೀವ-ಶಕ್ತಿಯ ಮೂಲ-ಸ್ರೋತ.", "hi": "जीवनः - प्राणानां प्राणः; जीव-शक्तेः मूल-स्रोतः।"},
    guna:  {"en": "Sat-cit-svarupa - the existence-and-consciousness ground.", "dev": "सत्-चित्-स्वरूपम्। सत्ता-चैतन्य-आधारः।", "kn": "ಸತ್-ಚಿತ್-ಸ್ವರೂಪ. ಸತ್ತಾ-ಚೈತನ್ಯ-ಆಧಾರ.", "hi": "सत्-चित्-स्वरूपम्। सत्ता-चैतन्य-आधारः।"},
    tags: ["c_sat_svarupa", "c_atma_svarupa"],
  },
  {
    id: "n_0991", position: 991, shloka_id: "sl_100", tier: "svarupa_guna",
    name:  {"iast": "anantarūpaḥ", "dev": "अनन्तरूपः", "kn": "ಅನಂತರೂಪಃ", "hi": "अनन्तरूपः"},
    artha: {"en": "Infinite-formed. Hari has endless rupas - vyuha, avatara, antaryami, archa, all distinct yet svarupaikya.", "dev": "अनन्त-रूपः - असंख्य-रूप-धरः। व्यूह-अवतार-अन्तर्यामी-अर्चा-इत्यादयः सर्वे रूपाः, सर्वे स्वरूपैक्येन।", "kn": "ಅನಂತ-ರೂಪ — ಅಸಂಖ್ಯ-ರೂಪ-ಧಾರಕ. ವ್ಯೂಹ-ಅವತಾರ-ಅಂತರ್ಯಾಮಿ-ಅರ್ಚಾ ಎಲ್ಲವೂ ರೂಪಗಳು, ಎಲ್ಲ ಸ್ವರೂಪೈಕ್ಯದಿಂದ.", "hi": "अनन्त-रूपः - असंख्य-रूप-धरः। व्यूह-अवतार-अन्तर्यामी-अर्चा-इत्यादयः सर्वे रूपाः, सर्वे स्वरूपैक्येन।"},
    guna:  {"en": "Svarupa-aikya-anantatva. Multiplicity of rupas with non-multiplicity of svarupa.", "dev": "स्वरूप-ऐक्य-अनन्तत्वम्। रूप-बहुल्यम्, स्वरूप-अद्वैतम्।", "kn": "ಸ್ವರೂಪ-ಐಕ್ಯ-ಅನಂತತ್ವ. ರೂಪ-ಬಾಹುಲ್ಯ, ಸ್ವರೂಪ-ಅದ್ವೈತ.", "hi": "स्वरूप-ऐक्य-अनन्तत्वम्। रूप-बहुल्यम्, स्वरूप-अद्वैतम्।"},
    tags: ["c_hari_sarvottamatva"],
  },
  {
    id: "n_1066", position: 1066, shloka_id: "sl_107", tier: "lila_guna",
    name:  {"iast": "gadādharaḥ", "dev": "गदाधरः", "kn": "ಗದಾಧರಃ", "hi": "गदाधरः"},
    artha: {"en": "Bearer of the mace (Kaumodaki). With chakra, shankha, padma — the chatur-bhuja icon.", "dev": "गदाधरः - कौमोदकी-गदां धरति। चक्र-शङ्ख-पद्म-सहितः चतुर्भुज-मूर्तेः अङ्गम्।", "kn": "ಗದಾಧರ — ಕೌಮೋದಕೀ-ಗದೆಯನ್ನು ಧರಿಸುತ್ತಾನೆ. ಚಕ್ರ-ಶಂಖ-ಪದ್ಮಗಳೊಂದಿಗೆ ಚತುರ್ಭುಜ-ಮೂರ್ತಿಯ ಅಂಗ.", "hi": "गदाधरः - कौमोदकी-गदां धरति। चक्र-शङ्ख-पद्म-सहितः चतुर्भुज-मूर्तेः अङ्गम्।"},
    guna:  {"en": "Asura-samhara-rupa - the gada is the destroyer-of-pride; cosmic ego-leveler.", "dev": "असुर-संहार-रूपम् - गदा अहङ्कार-नाशिनी; ब्रह्माण्ड-स्तरे अहङ्कार-समीकरणी।", "kn": "ಅಸುರ-ಸಂಹಾರ-ರೂಪ — ಗದೆಯು ಅಹಂಕಾರ-ನಾಶಿನಿ; ಬ್ರಹ್ಮಾಂಡ-ಸ್ತರದಲ್ಲಿ ಅಹಂಕಾರ-ಸಮೀಕರಣಿ.", "hi": "असुर-संहार-रूपम् - गदा अहङ्कार-नाशिनी; ब्रह्माण्ड-स्तरे अहङ्कार-समीकरणी।"},
    tags: ["c_avatara_rupa"],
  },
  {
    id: "n_1068", position: 1068, shloka_id: "sl_107", tier: "lila_guna",
    name:  {"iast": "sarvapraharaṇāyudhaḥ", "dev": "सर्वप्रहरणायुधः", "kn": "ಸರ್ವಪ್ರಹರಣಾಯುಧಃ", "hi": "सर्वप्रहरणायुधः"},
    artha: {"en": "He whose weapons strike everything. The closing nama: Hari wields any object as ayudha; nothing falls outside his reach.", "dev": "सर्व-प्रहरण-आयुधः - यद्-यद् वस्तु तद्-तत् आयुधम्; निरवशेष-शक्ति-शाली। समाप्ति-नाम।", "kn": "ಸರ್ವ-ಪ್ರಹರಣ-ಆಯುಧ — ಯಾವುದೇ ವಸ್ತು ಎಲ್ಲವೂ ಆಯುಧ; ನಿರವಶೇಷ-ಶಕ್ತಿಶಾಲಿ. ಸಮಾಪ್ತಿ-ನಾಮ.", "hi": "सर्व-प्रहरण-आयुधः - यद्-यद् वस्तु तद्-तत् आयुधम्; निरवशेष-शक्ति-शाली। समाप्ति-नाम।"},
    guna:  {"en": "Niravadhika-shakti. Closes the 1000-nama enumeration by asserting unbounded capacity.", "dev": "निरवधिक-शक्तिः। १००० नाम-गणनायाः समाप्ति-नाम-तया, अनवच्छिन्न-सामर्थ्य-घोषणम्।", "kn": "ನಿರವಧಿಕ-ಶಕ್ತಿ. ೧೦೦೦ ನಾಮಗಳ ಗಣನೆಯ ಸಮಾಪ್ತಿ-ನಾಮವಾಗಿ, ಅನವಚ್ಛಿನ್ನ ಸಾಮರ್ಥ್ಯದ ಘೋಷಣೆ.", "hi": "निरवधिक-शक्तिः। १००० नाम-गणनायाः समाप्ति-नाम-तया, अनवच्छिन्न-सामर्थ्य-घोषणम्।"},
    tags: ["c_hari_sarvottamatva"],
  },
  {
    id: "n_0215", position: 215, shloka_id: "sl_022", tier: "lila_guna",
    name:  {"iast": "siṃhaḥ", "dev": "सिंहः", "kn": "ಸಿಂಹಃ", "hi": "सिंहः"},
    artha: {"en": "The Lion - both the Narasimha avatara and the bhakta-rakshaka ferocity.", "dev": "सिंहः - नारसिंह-अवतारः; भक्त-रक्षण-कालीन-उग्र-स्वरूपम्।", "kn": "ಸಿಂಹ — ನಾರಸಿಂಹ-ಅವತಾರ; ಭಕ್ತ-ರಕ್ಷಣ-ಕಾಲೀನ ಉಗ್ರ-ಸ್ವರೂಪ.", "hi": "सिंहः - नारसिंह-अवतारः; भक्त-रक्षण-कालीन-उग्र-स्वरूपम्।"},
    guna:  {"en": "Bhakta-paritrana-rupa. The Prahlada-paritrana exemplar.", "dev": "भक्त-परित्राण-रूपम्। प्रह्लाद-परित्राणस्य उदाहरणम्।", "kn": "ಭಕ್ತ-ಪರಿತ್ರಾಣ-ರೂಪ. ಪ್ರಹ್ಲಾದ-ಪರಿತ್ರಾಣದ ಉದಾಹರಣೆ.", "hi": "भक्त-परित्राण-रूपम्। प्रह्लाद-परित्राणस्य उदाहरणम्।"},
    tags: ["c_avatara_rupa", "c_bhakta_vatsala"],
  },
  {
    id: "n_0220", position: 220, shloka_id: "sl_022", tier: "lila_guna",
    name:  {"iast": "surārihā", "dev": "सुरारिहा", "kn": "ಸುರಾರಿಹಾ", "hi": "सुरारिहा"},
    artha: {"en": "Slayer of the suras' enemies (asuras). The dushta-nigraha aspect.", "dev": "सुर-अरि-हा - देव-शत्रूणाम् (असुराणाम्) घातकः; दुष्ट-निग्रह-स्वभावम्।", "kn": "ಸುರ-ಅರಿ-ಹಾ — ದೇವ-ಶತ್ರುಗಳ (ಅಸುರರ) ಸಂಹಾರಕ; ದುಷ್ಟ-ನಿಗ್ರಹ-ಸ್ವಭಾವ.", "hi": "सुर-अरि-हा - देव-शत्रूणाम् (असुराणाम्) घातकः; दुष्ट-निग्रह-स्वभावम्।"},
    guna:  {"en": "Dushta-nigraha. The mirror-companion of bhakta-paritrana.", "dev": "दुष्ट-निग्रहः। भक्त-परित्राणस्य प्रतिबिम्ब-गुणः।", "kn": "ದುಷ್ಟ-ನಿಗ್ರಹ. ಭಕ್ತ-ಪರಿತ್ರಾಣದ ಪ್ರತಿಬಿಂಬ-ಗುಣ.", "hi": "दुष्ट-निग्रहः। भक्त-परित्राणस्य प्रतिबिम्ब-गुणः।"},
    tags: ["c_avatara_rupa"],
  },
  {
    id: "n_0260", position: 260, shloka_id: "sl_026", tier: "para_tattva",
    name:  {"iast": "naraḥ", "dev": "नरः", "kn": "ನರಃ", "hi": "नरः"},
    artha: {"en": "Nara - 'the man/person'. The Nara-Narayana pair: Hari as the human-counterpart of his own divine essence.", "dev": "नरः - मानुष-रूपः; नर-नारायण-युगलस्य पूर्व-पादः। हरिः स्व-दिव्य-तत्त्वस्य मानुष-रूपम् अपि।", "kn": "ನರ — ಮಾನುಷ-ರೂಪ; ನರ-ನಾರಾಯಣ-ಯುಗಲದ ಮೊದಲ ಪಾದ. ಹರಿಯು ತನ್ನ ದಿವ್ಯ-ತತ್ತ್ವದ ಮಾನುಷ-ರೂಪವೂ.", "hi": "नरः - मानुष-रूपः; नर-नारायण-युगलस्य पूर्व-पादः। हरिः स्व-दिव्य-तत्त्वस्य मानुष-रूपम् अपि।"},
    guna:  {"en": "Avatara-rahasya. Hari's incarnation is not contingent (karma-baddha) but iccha-prakata.", "dev": "अवतार-रहस्यम्। हरेः अवतरणं न कर्म-बद्धम्, अपि तु इच्छा-प्रकटम्।", "kn": "ಅವತಾರ-ರಹಸ್ಯ. ಹರಿಯ ಅವತರಣ ಕರ್ಮ-ಬದ್ಧವಲ್ಲ, ಇಚ್ಛಾ-ಪ್ರಕಟ.", "hi": "अवतार-रहस्यम्। हरेः अवतरणं न कर्म-बद्धम्, अपि तु इच्छा-प्रकटम्।"},
    tags: ["c_avatara_rupa"],
  },
  {
    id: "n_0552", position: 552, shloka_id: "sl_056", tier: "svarupa_guna",
    name:  {"iast": "mahārhaḥ", "dev": "महार्हः", "kn": "ಮಹಾರ್ಹಃ", "hi": "महार्हः"},
    artha: {"en": "Greatly worthy - of worship, of offering, of service.", "dev": "महा-अर्हः - महान् पूजा-योग्यः; अर्चा-नैवेद्य-सेवा-योग्यः।", "kn": "ಮಹಾ-ಅರ್ಹ — ಮಹಾನ್ ಪೂಜಾ-ಯೋಗ್ಯ; ಅರ್ಚಾ-ನೈವೇದ್ಯ-ಸೇವಾ-ಯೋಗ್ಯ.", "hi": "महा-अर्हः - महान् पूजा-योग्यः; अर्चा-नैवेद्य-सेवा-योग्यः।"},
    guna:  {"en": "Archana-yogyata. Foundational for archa-vatara doctrine.", "dev": "अर्चना-योग्यता। अर्चावतार-सिद्धान्तस्य आधारः।", "kn": "ಅರ್ಚನಾ-ಯೋಗ್ಯತೆ. ಅರ್ಚಾವತಾರ-ಸಿದ್ಧಾಂತದ ಆಧಾರ.", "hi": "अर्चना-योग्यता। अर्चावतार-सिद्धान्तस्य आधारः।"},
    tags: ["c_hari_sarvottamatva"],
  },
  {
    id: "n_0557", position: 557, shloka_id: "sl_056", tier: "svarupa_guna",
    name:  {"iast": "ānandaḥ", "dev": "आनन्दः", "kn": "ಆನಂದಃ", "hi": "आनन्दः"},
    artha: {"en": "Bliss. Hari is ananda-svarupa - the sat-cit-ananda Brahman of Taittiriya Upanishad 2.7.", "dev": "आनन्दः - आनन्द-स्वरूपः; तैत्तिरीयोपनिषद् २।७-स्थः सच्चिदानन्द-ब्रह्म।", "kn": "ಆನಂದ — ಆನಂದ-ಸ್ವರೂಪ; ತೈತ್ತಿರೀಯೋಪನಿಷದ್ ೨।೭ ಸಚ್ಚಿದಾನಂದ-ಬ್ರಹ್ಮ.", "hi": "आनन्दः - आनन्द-स्वरूपः; तैत्तिरीयोपनिषद् २।७-स्थः सच्चिदानन्द-ब्रह्म।"},
    guna:  {"en": "Ananda-svarupatva. Third member of sat-cit-ananda.", "dev": "आनन्द-स्वरूपत्वम्। सच्चिदानन्द-त्रिकस्य तृतीयम्।", "kn": "ಆನಂದ-ಸ್ವರೂಪತ್ವ. ಸಚ್ಚಿದಾನಂದ-ತ್ರಿಕದ ತೃತೀಯ.", "hi": "आनन्द-स्वरूपत्वम्। सच्चिदानन्द-त्रिकस्य तृतीयम्।"},
    tags: ["c_sat_svarupa"],
  },
  {
    id: "n_0300", position: 300, shloka_id: "sl_030", tier: "svarupa_guna",
    name:  {"iast": "mantraḥ", "dev": "मन्त्रः", "kn": "ಮಂತ್ರಃ", "hi": "मन्त्रः"},
    artha: {"en": "Mantra - the sacred utterance. Hari is the mantra-svarupa; chanting his nama IS chanting his form.", "dev": "मन्त्रः - मनन-त्राण-स्वरूपम्; मन्त्र-स्वरूपः। नाम-कीर्तनं रूप-कीर्तनं तत्तुल्यम्।", "kn": "ಮಂತ್ರ — ಮನನ-ತ್ರಾಣ-ಸ್ವರೂಪ; ಮಂತ್ರ-ಸ್ವರೂಪ. ನಾಮ-ಕೀರ್ತನವೇ ರೂಪ-ಕೀರ್ತನಕ್ಕೆ ಸಮಾನ.", "hi": "मन्त्रः - मनन-त्राण-स्वरूपम्; मन्त्र-स्वरूपः। नाम-कीर्तनं रूप-कीर्तनं तत्तुल्यम्।"},
    guna:  {"en": "Nama-rupa-aikya. Theological ground for namopasana.", "dev": "नाम-रूप-ऐक्यम्। नामोपासनायाः तत्त्व-शास्त्रीयाधारः।", "kn": "ನಾಮ-ರೂಪ-ಐಕ್ಯ. ನಾಮೋಪಾಸನೆಯ ತತ್ತ್ವಶಾಸ್ತ್ರೀಯ ಆಧಾರ.", "hi": "नाम-रूप-ऐक्यम्। नामोपासनायाः तत्त्व-शास्त्रीयाधारः।"},
    tags: ["c_sat_svarupa"],
  },
  {
    id: "n_0490", position: 490, shloka_id: "sl_049", tier: "lila_guna",
    name:  {"iast": "vidāraṇaḥ", "dev": "विदारणः", "kn": "ವಿದಾರಣಃ", "hi": "विदारणः"},
    artha: {"en": "Tearer-apart - the asura-vidarana ferocity; Narasimha-rupa allusion.", "dev": "विदारणः - असुर-विदारण-स्वभावम्; नारसिंह-रूप-निर्देशः।", "kn": "ವಿದಾರಣ — ಅಸುರ-ವಿದಾರಣ-ಸ್ವಭಾವ; ನಾರಸಿಂಹ-ರೂಪ-ನಿರ್ದೇಶ.", "hi": "विदारणः - असुर-विदारण-स्वभावम्; नारसिंह-रूप-निर्देशः।"},
    guna:  {"en": "Bhakta-virodhi-vidarana. Specific narasimha-pattern; targeted ferocity, not generalized violence.", "dev": "भक्त-विरोधि-विदारण-गुणः। नारसिंह-विशेषः - लक्ष्यीकृत-उग्रता, सामान्य-हिंसा न।", "kn": "ಭಕ್ತ-ವಿರೋಧಿ-ವಿದಾರಣ-ಗುಣ. ನಾರಸಿಂಹ-ವಿಶೇಷ — ಲಕ್ಷ್ಯೀಕೃತ ಉಗ್ರತೆ, ಸಾಮಾನ್ಯ-ಹಿಂಸೆಯಲ್ಲ.", "hi": "भक्त-विरोधि-विदारण-गुणः। नारसिंह-विशेषः - लक्ष्यीकृत-उग्रता, सामान्य-हिंसा न।"},
    tags: ["c_avatara_rupa", "c_bhakta_vatsala"],
  },
  {
    id: "n_0052", position: 52, shloka_id: "sl_006", tier: "svarupa_guna",
    name:  {"iast": "hṛṣīkeśaḥ", "dev": "हृषीकेशः", "kn": "ಹೃಷೀಕೇಶಃ", "hi": "हृषीकेशः"},
    artha: {"en": "Hrishikesha - 'lord of the senses' (hrishika + isha). The faculty-governor name.", "dev": "हृषीकेशः - 'हृषीक' (इन्द्रियाणि) + 'ईश' (स्वामी)। इन्द्रिय-नियामकः।", "kn": "ಹೃಷೀಕೇಶ — 'ಹೃಷೀಕ' (ಇಂದ್ರಿಯಗಳು) + 'ಈಶ' (ಸ್ವಾಮಿ). ಇಂದ್ರಿಯ-ನಿಯಾಮಕ.", "hi": "हृषीकेशः - 'हृषीक' (इन्द्रियाणि) + 'ईश' (स्वामी)। इन्द्रिय-नियामकः।"},
    guna:  {"en": "Indriya-niyamakatva: the faculty-direction guna - antaryamitva at the level of cognitive equipment.", "dev": "इन्द्रिय-नियामकत्वम्। ज्ञान-इन्द्रियाणां तले अन्तर्यामित्वम्।", "kn": "ಇಂದ್ರಿಯ-ನಿಯಾಮಕತ್ವ. ಜ್ಞಾನೇಂದ್ರಿಯಗಳ ಮಟ್ಟದಲ್ಲಿ ಅಂತರ್ಯಾಮಿತ್ವ.", "hi": "इन्द्रिय-नियामकत्वम्। ज्ञान-इन्द्रियाणां तले अन्तर्यामित्वम्।"},
    tags: ["c_antaryamitva"],
  },
  {
    id: "n_0515", position: 515, shloka_id: "sl_055", tier: "mokshaprada",
    name:  {"iast": "mukundaḥ", "dev": "मुकुन्दः", "kn": "ಮುಕುಂದಃ", "hi": "मुकुन्दः"},
    artha: {"en": "Mukunda - 'giver of mukti' (mukti + da). The liberation-bestower par excellence.", "dev": "मुकुन्दः - 'मुक्ति' + 'दः'; मोक्ष-प्रदः।", "kn": "ಮುಕುಂದ — 'ಮುಕ್ತಿ' + 'ದ'; ಮೋಕ್ಷ-ಪ್ರದ.", "hi": "मुकुन्दः - 'मुक्ति' + 'दः'; मोक्ष-प्रदः।"},
    guna:  {"en": "Mukti-prada-tva. Hari removes klesha; Mukunda installs in mukti.", "dev": "मुक्ति-प्रदत्वम्। हरि-नाम्नः सम्पूरक-गुणः।", "kn": "ಮುಕ್ತಿ-ಪ್ರದತ್ವ. ಹರಿ-ನಾಮದ ಸಂಪೂರಕ-ಗುಣ.", "hi": "मुक्ति-प्रदत्वम्। हरि-नाम्नः सम्पूरक-गुणः।"},
    tags: ["c_moksha_prada"],
  },
  {
    id: "n_0659", position: 659, shloka_id: "sl_067", tier: "para_tattva",
    name:  {"iast": "anīśaḥ", "dev": "अनीशः", "kn": "ಅನೀಶಃ", "hi": "अनीशः"},
    artha: {"en": "The un-lorded - he over whom no one is lord. Negation-form anchoring sarvottamatva.", "dev": "अनीशः - न ईशः यस्य; न तस्य कश्चित् नियामकः।", "kn": "ಅನೀಶ — ಯಾವನಿಗೆ ಯಾವ ಈಶನೂ ಇಲ್ಲ. ನಿಷೇಧ-ರೂಪದಿಂದ ಸರ್ವೋತ್ತಮತ್ವ-ನಿರ್ದೇಶ.", "hi": "अनीशः - न ईशः यस्य; न तस्य कश्चित् नियामकः।"},
    guna:  {"en": "Sarvottamatva (negation-form). Canonical Madhva proof-pada.", "dev": "सर्वोत्तमत्वम् (निषेध-रूपेण)। मध्व-सिद्धान्तस्य प्रमाण-वचनम्।", "kn": "ಸರ್ವೋತ್ತಮತ್ವ (ನಿಷೇಧ-ರೂಪ). ಮಧ್ವ-ಸಿದ್ಧಾಂತದ ಪ್ರಮಾಣ ವಚನ.", "hi": "सर्वोत्तमत्वम् (निषेध-रूपेण)। मध्व-सिद्धान्तस्य प्रमाण-वचनम्।"},
    tags: ["c_hari_sarvottamatva"],
  },
  {
    id: "n_0074", position: 74, shloka_id: "sl_007", tier: "svarupa_guna",
    name:  {"iast": "pavitram", "dev": "पवित्रम्", "kn": "ಪವಿತ್ರಂ", "hi": "पवित्रम्"},
    artha: {"en": "Pavitram - 'the purifier'. He who purifies all who contemplate or remember him.", "dev": "पवित्रम् - पवित्र-कारकम्; स्मरण-चिन्तन-मात्रेण सर्व-शोधकम्।", "kn": "ಪವಿತ್ರಮ್ — ಪವಿತ್ರ-ಕಾರಕ; ಸ್ಮರಣ-ಚಿಂತನ-ಮಾತ್ರದಿಂದ ಸರ್ವ-ಶೋಧಕ.", "hi": "पवित्रम् - पवित्र-कारकम्; स्मरण-चिन्तन-मात्रेण सर्व-शोधकम्।"},
    guna:  {"en": "Pavitri-karana-shakti. The grace-by-association function.", "dev": "पवित्री-करण-शक्तिः। सम्बन्ध-अनुग्रह-कर्म।", "kn": "ಪವಿತ್ರೀ-ಕರಣ-ಶಕ್ತಿ. ಸಂಬಂಧ-ಅನುಗ್ರಹ-ಕರ್ಮ.", "hi": "पवित्री-करण-शक्तिः। सम्बन्ध-अनुग्रह-कर्म।"},
    tags: ["c_karunya"],
  },
];

const E = (s, t, type, label) => ({ source:s, target:t, type, label });

const EDGES = [
  E("n_0002", "n_0007", "is-a", "antaryami-svarupa"),
  E("n_0024", "n_0002", "is-a", "purushottama-anchored-in-Vishnu"),
  E("n_0245", "n_0024", "is-a", "Narayana-as-Purushottama"),
  E("n_0337", "n_0245", "is-a", "Vasudeva-svarupa-aikya-Narayana"),
  E("n_0057", "n_0337", "is-a", "Krishna-svarupa-Vasudeva"),
  E("n_0656", "n_0002", "is-a", "Hari-svarupa-Vishnu"),
  E("n_0073", "n_0057", "manifests-as", "Madhusudana-via-Krishna"),
  E("n_0215", "n_0057", "manifests-as", "Narasimha-rupa-via-avatara"),
  E("n_0530", "n_0245", "manifests-as", "Trivikrama-via-Vamana"),
  E("n_0048", "n_0005", "manifests-as", "Padmanabha-srshti-locus"),
  E("n_0643", "n_0002", "is-a", "Shrinivasa-svarupa-Vishnu"),
  E("n_0594", "n_0057", "manifests-as", "Vanamali-Krishna-rupa"),
];


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TIERS, TIER_COLOR, NODES, EDGES };
}
