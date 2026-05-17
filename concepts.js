/* Vishnu Sahasranama --- attribute-graph overlay (Proposal A)
 *
 * Concepts are the divine attributes that the namas predicate. Each concept
 * gathers the namas in data.js that emphasize it; tier groupings provide a
 * top-down browse.
 *
 * Schema per concept:
 *   { id, tier,
 *     en, dev, kn, hi,              -- canonical labels
 *     title: {en,dev,kn,hi},
 *     note:  {en,dev,kn,hi},
 *     nama_ids: ['n_0xxx', ...] }   -- back-link to data.js NODES
 *
 * The bidirectional traversal: each nama in data.js has a tags array, each
 * concept here has a nama_ids array. The viewer maintains both indices.
 */

const CTIERS = [
  { id: "para_tattva", en: "Para-tattva", dev: "पर-तत्त्व", kn: "ಪರ-ತತ್ತ್ವ", hi: "पर-तत्त्व", gloss: "The supreme reality — Hari/Vishnu/Narayana as sarvottama" },
  { id: "svarupa_guna", en: "Sva-rupa guna", dev: "स्व-रूप-गुण", kn: "ಸ್ವ-ರೂಪ-ಗುಣ", hi: "स्व-रूप-गुण", gloss: "Essential attributes — sat, cit, ananda, jnana, bala, aiśvarya" },
  { id: "lila_guna", en: "Lila-guna", dev: "लीला-गुण", kn: "ಲೀಲಾ-ಗುಣ", hi: "लीला-गुण", gloss: "Cosmic-play attributes — srshti, sthiti, samhara, avatara" },
  { id: "karunya_guna", en: "Karunya-guna", dev: "कारुण्य-गुण", kn: "ಕಾರುಣ್ಯ-ಗುಣ", hi: "कारुण्य-गुण", gloss: "Mercy attributes — vatsalya, akhilaghaharitva, sharanagati" },
  { id: "bhakta_sambandha", en: "Bhakta-sambandha", dev: "भक्त-सम्बन्ध", kn: "ಭಕ್ತ-ಸಂಬಂಧ", hi: "भक्त-सम्बन्ध", gloss: "Devotee-relation attributes — bhakta-priya, bhakta-vatsala" },
  { id: "mokshaprada", en: "Moksha-prada", dev: "मोक्ष-प्रद", kn: "ಮೋಕ್ಷ-ಪ್ರದ", hi: "मोक्ष-प्रद", gloss: "Liberation-bestowing attributes — mukti-prada, taratamya-niyamaka" },
];

const CONCEPTS = [
  {
    id: "c_hari_sarvottamatva", tier: "para_tattva",
    en: "Hari-sarvottamatva", dev: "हरि-सर्वोत्तमत्व", kn: "ಹರಿ-ಸರ್ವೋತ್ತಮತ್ವ", hi: "हरि-सर्वोत्तमत्व",
    title: { en: "Hari's absolute supremacy", dev: "हरेः सर्वोत्तमत्वम्", kn: "ಹರಿಯ ಸರ್ವೋತ್ತಮತ್ವ", hi: "हरि की सर्वोत्तमता" },
    note:  { en: "The foundational Madhva axiom: Hari is the highest, no one equal or superior. Every other being - jiva, devata, even Lakshmi - is strictly subordinate. The pancha-bheda system starts here.", dev: "मध्व-सिद्धान्तस्य आधार-शिला: हरिः सर्वोत्कृष्टः, न तस्य समः न अधिकः। सर्वम् इतरत् - जीवाः देवताः लक्ष्मीरपि - तत्-परतन्त्रम्। पञ्च-भेद-व्यवस्था अत एव प्रारभते।", kn: "ಮಧ್ವ-ಸಿದ್ಧಾಂತದ ಆಧಾರ-ಶಿಲೆ: ಹರಿಯು ಸರ್ವೋತ್ಕೃಷ್ಟ, ಅವನಿಗೆ ಸಮಾನನಿಲ್ಲ ಅಧಿಕನಿಲ್ಲ. ಎಲ್ಲ ಇತರ - ಜೀವಗಳು, ದೇವತೆಗಳು, ಲಕ್ಷ್ಮಿಯೂ - ಅವನ ಪರತಂತ್ರ. ಪಂಚ-ಭೇದ-ವ್ಯವಸ್ಥೆ ಇದರಿಂದಲೇ ಪ್ರಾರಂಭ.", hi: "मध्व-सिद्धान्त की आधार-शिला: हरि सर्वोत्कृष्ट हैं, उनके समान या अधिक कोई नहीं। बाकी सब - जीव, देवता, लक्ष्मी भी - उनके परतन्त्र हैं। पञ्च-भेद यहीं से शुरू होता है।" },
    nama_ids: ["n_0001", "n_0012", "n_0024", "n_0049", "n_0245", "n_0337", "n_0552", "n_0591", "n_0650", "n_0656", "n_0659", "n_0702", "n_0991"],
  },
  {
    id: "c_sarva_vyapakatva", tier: "para_tattva",
    en: "Sarva-vyapakatva", dev: "सर्व-व्यापकत्व", kn: "ಸರ್ವ-ವ್ಯಾಪಕತ್ವ", hi: "सर्व-व्यापकत्व",
    title: { en: "All-pervasiveness", dev: "सर्व-व्यापकत्वम्", kn: "ಸರ್ವ-ವ್ಯಾಪಕತ್ವ", hi: "सर्वव्यापकता" },
    note:  { en: "Hari pervades all space, time, and being. The verse-opening Vishvam asserts cosmic scope; Trivikrama's three strides enact the same truth as cosmic gesture.", dev: "हरिः देश-काल-वस्तुषु सर्वत्र व्याप्तः। श्लोक-आरम्भे 'विश्वम्' इति शब्देन सर्व-व्याप्ति-निर्देशः; त्रिविक्रमस्य त्रिभिः पादैः क्रान्तिः तस्यैव कर्म-रूपम्।", kn: "ಹರಿ ದೇಶ-ಕಾಲ-ವಸ್ತುಗಳಲ್ಲಿ ಸರ್ವತ್ರ ವ್ಯಾಪ್ತ. ಶ್ಲೋಕದ ಆರಂಭದಲ್ಲಿ 'ವಿಶ್ವಂ' ಶಬ್ದದಿಂದ ಸರ್ವ-ವ್ಯಾಪ್ತಿ-ನಿರ್ದೇಶ; ತ್ರಿವಿಕ್ರಮನ ಮೂರು ಹೆಜ್ಜೆಗಳ ಆಕ್ರಮಣ ಅದೇ ಸತ್ಯದ ಕರ್ಮ-ರೂಪ.", hi: "हरि देश, काल और वस्तु में सर्वत्र व्याप्त हैं। श्लोक के आरम्भ में 'विश्वं' शब्द से सर्व-व्याप्ति का निर्देश; त्रिविक्रम के तीन पगों से क्रान्ति उसी सत्य की क्रिया-रूप।" },
    nama_ids: ["n_0001", "n_0530"],
  },
  {
    id: "c_antaryamitva", tier: "para_tattva",
    en: "Antaryamitva", dev: "अन्तर्यामित्व", kn: "ಅಂತರ್ಯಾಮಿತ್ವ", hi: "अन्तर्यामित्व",
    title: { en: "Indwelling (the in-dweller-relation)", dev: "अन्तर्यामित्वम्", kn: "ಅಂತರ್ಯಾಮಿತ್ವ", hi: "अन्तर्यामित्व" },
    note:  { en: "Hari dwells inside every being as the inner witness and ordainer. The name Vishnu itself encodes this (visheh - to enter). Madhva makes antaryamitva ontologically distinct from svarupa-aikya - Hari is IN every jiva but never identical with it.", dev: "हरिः प्रत्येक-भूते अन्तर्यामि-रूपेण साक्षि-नियन्तृ-तया वसति। 'विष्णुः' इति नामैव विशि-धातु-मूलं तदर्थम्। मध्व-मते अन्तर्यामित्वं स्वरूप-ऐक्यात् भिन्नम् - हरिः प्रत्येक-जीवे अस्ति, न तु तेन तादात्म्येन।", kn: "ಹರಿ ಪ್ರತಿ ಭೂತದಲ್ಲಿ ಅಂತರ್ಯಾಮಿ-ರೂಪದಿಂದ ಸಾಕ್ಷಿ-ನಿಯಂತೃ-ರೂಪದಲ್ಲಿ ವಾಸಿಸುತ್ತಾನೆ. 'ವಿಷ್ಣು' ಎಂಬ ನಾಮವೇ ವಿಶಿ-ಧಾತು-ಮೂಲ. ಮಧ್ವ-ಮತದಲ್ಲಿ ಅಂತರ್ಯಾಮಿತ್ವ ಸ್ವರೂಪ-ಐಕ್ಯದಿಂದ ಭಿನ್ನ — ಹರಿ ಪ್ರತಿ ಜೀವದಲ್ಲಿ ಇದ್ದಾನೆ, ಆದರೆ ಅದರೊಂದಿಗೆ ತಾದಾತ್ಮ್ಯವಲ್ಲ.", hi: "हरि हर भूत में अन्तर्यामी रूप से साक्षी-नियन्ता के रूप में बसते हैं। 'विष्णु' नाम स्वयं विश्-धातु-मूलक है। मध्व मत में अन्तर्यामित्व स्वरूप-ऐक्य से भिन्न है - हरि हर जीव में हैं पर उसके साथ तादात्म्य नहीं।" },
    nama_ids: ["n_0002", "n_0007", "n_0052", "n_0245"],
  },
  {
    id: "c_jiva_isvara_bheda", tier: "para_tattva",
    en: "Jiva-Isvara-bheda", dev: "जीव-ईश्वर-भेद", kn: "ಜೀವ-ಈಶ್ವರ-ಭೇದ", hi: "जीव-ईश्वर-भेद",
    title: { en: "The eternal distinction of jiva and Isvara", dev: "जीव-ईश्वरयोः शाश्वत-भेदः", kn: "ಜೀವ-ಈಶ್ವರಗಳ ಶಾಶ್ವತ-ಭೇದ", hi: "जीव-ईश्वर का शाश्वत भेद" },
    note:  { en: "First of the five canonical bhedas (jiva-isvara, jiva-jiva, jada-isvara, jada-jiva, jada-jada). For Madhva, jivas are eternally distinct from Hari - never identical, never merging, even in mukti. The 'Paramatma' name itself implies a 'param' (other) atma.", dev: "पञ्च-भेदेषु प्रथमः (जीव-ईश्वर, जीव-जीव, जड-ईश्वर, जड-जीव, जड-जड)। मध्व-मते जीवाः हरेः नित्यं भिन्नाः - न ऐक्यम्, न लयः, मुक्तावपि। 'परमात्मन्' इति नाम-स्व-अर्थः एव 'परम्' (अन्यम्) आत्मानं सूचयति।", kn: "ಪಂಚ-ಭೇದಗಳಲ್ಲಿ ಮೊದಲನೆಯದು. ಮಧ್ವ-ಮತದಲ್ಲಿ ಜೀವಗಳು ಹರಿಯಿಂದ ನಿತ್ಯ ಭಿನ್ನ — ಐಕ್ಯವಿಲ್ಲ, ಲಯವಿಲ್ಲ, ಮುಕ್ತಿಯಲ್ಲಿಯೂ. 'ಪರಮಾತ್ಮಾ' ಎಂಬ ನಾಮವೇ 'ಪರಮ್' (ಅನ್ಯ) ಆತ್ಮವನ್ನು ಸೂಚಿಸುತ್ತದೆ.", hi: "पञ्च-भेदों में प्रथम। मध्व मत में जीव हरि से नित्य भिन्न हैं - न ऐक्य, न लय, मुक्ति में भी। 'परमात्मा' नाम स्वयं 'परम्' (अन्य) आत्मा को सूचित करता है।" },
    nama_ids: ["n_0012"],
  },
  {
    id: "c_kala_niyamakatva", tier: "para_tattva",
    en: "Kala-niyamakatva", dev: "काल-नियामकत्व", kn: "ಕಾಲ-ನಿಯಾಮಕತ್ವ", hi: "काल-नियामकत्व",
    title: { en: "Time-sovereignty", dev: "काल-नियामकत्वम्", kn: "ಕಾಲ-ನಿಯಾಮಕತ್ವ", hi: "काल-नियामकत्व" },
    note:  { en: "Hari is master of past, future, and present. The compound 'bhuta-bhavya-bhavat-prabhuh' compresses this into one name. The Gita 8.4 anchor: adhibhutam ksaro bhavah.", dev: "हरिः भूत-भविष्यत्-वर्तमानानां प्रभुः। 'भूत-भव्य-भवत्-प्रभुः' इति समासेन एक-नामतया प्रतिपादितम्। गीता ८।४ - 'अधिभूतं क्षरो भावः'।", kn: "ಹರಿ ಭೂತ-ಭವಿಷ್ಯತ್-ವರ್ತಮಾನಗಳ ಪ್ರಭು. 'ಭೂತ-ಭವ್ಯ-ಭವತ್-ಪ್ರಭುಃ' ಎಂಬ ಸಮಾಸದಿಂದ ಒಂದು ನಾಮವಾಗಿ ಪ್ರತಿಪಾದಿತ.", hi: "हरि भूत, भविष्य और वर्तमान के प्रभु हैं। 'भूत-भव्य-भवत्-प्रभुः' समास से एक नाम में पिरोया गया है।" },
    nama_ids: ["n_0004"],
  },
  {
    id: "c_yajna_svarupa", tier: "svarupa_guna",
    en: "Yajna-svarupa", dev: "यज्ञ-स्वरूप", kn: "ಯಜ್ಞ-ಸ್ವರೂಪ", hi: "यज्ञ-स्वरूप",
    title: { en: "Sacrifice-as-self", dev: "यज्ञ-स्वरूपम्", kn: "ಯಜ್ಞ-ಸ್ವರೂಪ", hi: "यज्ञ-स्वरूप" },
    note:  { en: "Hari is the Vedic-sacrificial act itself - its hetu, ashraya, and phala. The Vashatkara name asserts this at verse 1; Yajna at position 471 closes the loop. Cf. BG 4.24 brahmarpanam brahma havih.", dev: "हरिः वैदिक-यज्ञ-स्वरूपः - हेतुः, आश्रयः, फलं च। प्रथम-श्लोके वषट्कार-नाम्ना उद्घोषितम्; ४७१-स्थाने यज्ञ-नाम्ना समापितम्। गीता ४।२४ - 'ब्रह्मार्पणं ब्रह्म हविः'।", kn: "ಹರಿಯು ವೈದಿಕ-ಯಜ್ಞ-ಸ್ವರೂಪ - ಹೇತು, ಆಶ್ರಯ, ಫಲ. ಮೊದಲ ಶ್ಲೋಕದಲ್ಲಿ ವಷಟ್ಕಾರ ನಾಮದಿಂದ ಘೋಷಿತ; ೪೭೧ರಲ್ಲಿ ಯಜ್ಞ ನಾಮದಿಂದ ಸಮಾಪ್ತಿ.", hi: "हरि वैदिक यज्ञ-स्वरूप हैं - हेतु, आश्रय, फल। पहले श्लोक में 'वषट्कार' नाम से, और ४७१ में 'यज्ञ' नाम से।" },
    nama_ids: ["n_0003", "n_0471"],
  },
  {
    id: "c_sat_svarupa", tier: "svarupa_guna",
    en: "Sat-cit-ananda svarupa", dev: "सच्चिदानन्द-स्वरूप", kn: "ಸಚ್ಚಿದಾನಂದ-ಸ್ವರೂಪ", hi: "सच्चिदानन्द-स्वरूप",
    title: { en: "Existence-Consciousness-Bliss as essential nature", dev: "सच्चिदानन्द-स्वरूपम्", kn: "ಸಚ್ಚಿದಾನಂದ-ಸ್ವರೂಪ", hi: "सच्चिदानन्द-स्वरूप" },
    note:  { en: "Hari is the canonical Taittiriya 2.7 sat-cit-ananda Brahman. Putatma names the suddha-svabhava; Aksharah names sat; Anandah at position 557 names ananda; mantra at 300 names cit-svarupa.", dev: "हरिः तैत्तिरीयोपनिषद् २।७-स्थः सच्चिदानन्द-ब्रह्म-स्वरूपः। पूतात्म-नाम्ना शुद्ध-स्वभावम्; अक्षर-नाम्ना सत्; आनन्द-नाम्ना (५५७) आनन्दम्; मन्त्र-नाम्ना (३००) चित्।", kn: "ಹರಿ ತೈತ್ತಿರೀಯ ೨।೭ರ ಸಚ್ಚಿದಾನಂದ-ಬ್ರಹ್ಮ-ಸ್ವರೂಪ. ಪೂತಾತ್ಮ-ನಾಮದಿಂದ ಶುದ್ಧ-ಸ್ವಭಾವ; ಅಕ್ಷರ-ನಾಮದಿಂದ ಸತ್; ಆನಂದ-ನಾಮದಿಂದ (೫೫೭) ಆನಂದ.", hi: "हरि तैत्तिरीय २।७ के सच्चिदानन्द ब्रह्म-स्वरूप हैं। पूतात्मा से शुद्ध-स्वभाव; अक्षर से सत्; आनन्द (५५७) से आनन्द।" },
    nama_ids: ["n_0011", "n_0016", "n_0300", "n_0557", "n_0591", "n_0986"],
  },
  {
    id: "c_atma_svarupa", tier: "svarupa_guna",
    en: "Atma-svarupa", dev: "आत्म-स्वरूप", kn: "ಆತ್ಮ-ಸ್ವರೂಪ", hi: "आत्म-स्वरूप",
    title: { en: "Self-essence", dev: "आत्म-स्वरूपम्", kn: "ಆತ್ಮ-ಸ್ವರೂಪ", hi: "आत्म-स्वरूप" },
    note:  { en: "Hari as the inner essence of every being's atman. Distinct from antaryamitva (which is the dwelling-relation) - here it is the very being-of-essence.", dev: "हरिः प्रत्येक-भूतस्य आत्मनः अन्तःस्थ-स्वरूपम्। अन्तर्यामित्वात् (वासि-सम्बन्धात्) भिन्नम् - इदं सत्ता-स्वरूपम्।", kn: "ಹರಿ ಪ್ರತಿ ಭೂತದ ಆತ್ಮನ ಅಂತಃಸ್ಥ-ಸ್ವರೂಪ. ಅಂತರ್ಯಾಮಿತ್ವದಿಂದ (ವಾಸಿ-ಸಂಬಂಧದಿಂದ) ಭಿನ್ನ — ಇದು ಸತ್ತಾ-ಸ್ವರೂಪ.", hi: "हरि हर भूत के आत्मा का अन्तःस्थ स्वरूप। अन्तर्यामित्व (वासी-सम्बन्ध) से भिन्न - यह सत्ता-स्वरूप है।" },
    nama_ids: ["n_0007", "n_0986"],
  },
  {
    id: "c_srshti_kartrtva", tier: "lila_guna",
    en: "Srshti-kartrtva", dev: "सृष्टि-कर्तृत्व", kn: "ಸೃಷ್ಟಿ-ಕರ್ತೃತ್ವ", hi: "सृष्टि-कर्तृत्व",
    title: { en: "Creator-agency", dev: "सृष्टि-कर्तृत्वम्", kn: "ಸೃಷ್ಟಿ-ಕರ್ತೃತ್ವ", hi: "सृष्टि-कर्तृत्व" },
    note:  { en: "Hari's role as creator of all beings - the first of the srshti-sthiti-samhara trika. Bhutakrt (5), Bhutabhavana (8), Padmanabha (48) are the proper names; the cosmogonic image is the lotus-from-navel.", dev: "सृष्टि-स्थिति-संहार-त्रिकस्य प्रथमम्। भूतकृत् (५), भूतभावन (८), पद्मनाभ (४८) इति नाम-स्वरूपाणि; नाभि-कमल-उद्भव-ब्रह्मा इति प्रतीकम्।", kn: "ಸೃಷ್ಟಿ-ಸ್ಥಿತಿ-ಸಂಹಾರ-ತ್ರಿಕದ ಮೊದಲನೇ. ಭೂತಕೃತ್ (೫), ಭೂತಭಾವನ (೮), ಪದ್ಮನಾಭ (೪೮) ನಾಮಗಳು; ನಾಭಿ-ಕಮಲದಿಂದ ಬ್ರಹ್ಮನ ಉದ್ಭವ ಪ್ರತೀಕ.", hi: "सृष्टि-स्थिति-संहार-त्रिक का प्रथम। भूतकृत् (५), भूतभावन (८), पद्मनाभ (४८) नामस्वरूप; नाभि-कमल से ब्रह्मा का उद्भव प्रतीक।" },
    nama_ids: ["n_0005", "n_0008", "n_0048"],
  },
  {
    id: "c_sthiti_kartrtva", tier: "lila_guna",
    en: "Sthiti-kartrtva", dev: "स्थिति-कर्तृत्व", kn: "ಸ್ಥಿತಿ-ಕರ್ತೃತ್ವ", hi: "स्थिति-कर्तृत्व",
    title: { en: "Sustainer-agency", dev: "स्थिति-कर्तृत्वम्", kn: "ಸ್ಥಿತಿ-ಕರ್ತೃತ್ವ", hi: "स्थिति-कर्तृत्व" },
    note:  { en: "Hari's role as sustainer - the bhrt-root (bear/maintain) names. Bhutabhrt (6) is the proper name in the opening verse.", dev: "सृष्टि-स्थिति-संहार-त्रिकस्य द्वितीयम्। भूतभृत् (६) इति प्रथम-श्लोक-स्थं नाम।", kn: "ಸೃಷ್ಟಿ-ಸ್ಥಿತಿ-ಸಂಹಾರ-ತ್ರಿಕದ ಎರಡನೆಯದು. ಭೂತಭೃತ್ (೬) ಪ್ರಥಮ-ಶ್ಲೋಕದ ನಾಮ.", hi: "सृष्टि-स्थिति-संहार-त्रिक का द्वितीय। भूतभृत् (६) प्रथम श्लोक में।" },
    nama_ids: ["n_0006"],
  },
  {
    id: "c_avatara_rupa", tier: "lila_guna",
    en: "Avatara-rupa", dev: "अवतार-रूप", kn: "ಅವತಾರ-ರೂಪ", hi: "अवतार-रूप",
    title: { en: "Forms-of-descent", dev: "अवतार-रूपाणि", kn: "ಅವತಾರ-ರೂಪಗಳು", hi: "अवतार-रूप" },
    note:  { en: "The dasa-avatara plus Krishna and Narasimha as the proper-name forms in this corpus. Madhva: avataras are not karma-baddha bodies but iccha-prakata svarupa-aikya manifestations of Hari himself.", dev: "दशावताराः कृष्ण-नारसिंहाभ्यां सह। मध्व-मते अवताराः न कर्म-बद्धाः शरीराः; इच्छा-प्रकटाः स्वरूप-ऐक्येन हरेरेव।", kn: "ದಶಾವತಾರಗಳು ಜೊತೆಗೆ ಕೃಷ್ಣ-ನಾರಸಿಂಹಗಳು. ಮಧ್ವ-ಮತದಲ್ಲಿ ಅವತಾರಗಳು ಕರ್ಮ-ಬದ್ಧ ಶರೀರಗಳಲ್ಲ; ಇಚ್ಛಾ-ಪ್ರಕಟ ಸ್ವರೂಪ-ಐಕ್ಯದಿಂದ ಹರಿಯ.", hi: "दशावतार सहित कृष्ण-नारसिंह। मध्व मत में अवतार कर्म-बद्ध शरीर नहीं; इच्छा-प्रकट स्वरूप-ऐक्य से हरि के स्वयं।" },
    nama_ids: ["n_0057", "n_0073", "n_0126", "n_0215", "n_0220", "n_0260", "n_0337", "n_0490", "n_0530", "n_0594", "n_0963"],
  },
  {
    id: "c_karunya", tier: "karunya_guna",
    en: "Karunya", dev: "कारुण्य", kn: "ಕಾರುಣ್ಯ", hi: "कारुण्य",
    title: { en: "Compassion/mercy", dev: "कारुण्यम्", kn: "ಕಾರುಣ್ಯ", hi: "कारुण्य" },
    note:  { en: "The mercy-attribute. Hari-nama itself encodes papa-harana; vatsalya in shloka 78. Karunya is the bridge from sva-rupa-guna into bhakta-sambandha.", dev: "कारुण्य-गुणः। हरि-नामैव पाप-हरण-वाची; भक्त-वत्सलता ७८-श्लोके। स्वरूप-गुणतः भक्त-सम्बन्ध-गुण-पर्यन्तं सेतुः।", kn: "ಕಾರುಣ್ಯ-ಗುಣ. ಹರಿ-ನಾಮವೇ ಪಾಪ-ಹರಣ-ವಾಚಿ; ಭಕ್ತ-ವತ್ಸಲತೆ ೭೮-ಶ್ಲೋಕದಲ್ಲಿ. ಸ್ವರೂಪ-ಗುಣದಿಂದ ಭಕ್ತ-ಸಂಬಂಧ-ಗುಣದವರೆಗೆ ಸೇತು.", hi: "कारुण्य-गुण। हरि-नाम स्वयं पाप-हरण-वाची; भक्त-वत्सलता ७८-श्लोक में।" },
    nama_ids: ["n_0008", "n_0074", "n_0126", "n_0641", "n_0656", "n_0073"],
  },
  {
    id: "c_bhakta_vatsala", tier: "bhakta_sambandha",
    en: "Bhakta-vatsala", dev: "भक्त-वत्सल", kn: "ಭಕ್ತ-ವತ್ಸಲ", hi: "भक्त-वत्सल",
    title: { en: "Devotee-affection", dev: "भक्त-वत्सलत्वम्", kn: "ಭಕ್ತ-ವತ್ಸಲತ್ವ", hi: "भक्त-वत्सलत्व" },
    note:  { en: "Specific tenderness toward devotees - vatsalya is mother-cow-for-calf love. For Madhva, this is svabhava-sidha (essential), not contingent.", dev: "भक्तेषु विशिष्ट-स्नेहः - मातु-धेनु-वत्स-वत् वत्सलता। मध्व-मते इदं स्वभाव-सिद्धम्, न प्रासङ्गिकम्।", kn: "ಭಕ್ತರಲ್ಲಿ ವಿಶಿಷ್ಟ-ಸ್ನೇಹ — ಮಾತೃ-ಧೇನು-ವತ್ಸದಂತೆ ವತ್ಸಲತೆ. ಮಧ್ವ-ಮತದಲ್ಲಿ ಇದು ಸ್ವಭಾವ-ಸಿದ್ಧ, ಪ್ರಾಸಂಗಿಕವಲ್ಲ.", hi: "भक्तों में विशिष्ट स्नेह - मातृ-धेनु-वत्स के समान वत्सलता। मध्व मत में यह स्वभाव-सिद्ध है, प्रासङ्गिक नहीं।" },
    nama_ids: ["n_0057", "n_0197", "n_0215", "n_0490", "n_0594", "n_0777", "n_0780"],
  },
  {
    id: "c_lakshmi_sambandha", tier: "para_tattva",
    en: "Lakshmi-sambandha", dev: "लक्ष्मी-सम्बन्ध", kn: "ಲಕ್ಷ್ಮೀ-ಸಂಬಂಧ", hi: "लक्ष्मी-सम्बन्ध",
    title: { en: "The Lakshmi-relation", dev: "लक्ष्मी-सम्बन्धः", kn: "ಲಕ್ಷ್ಮೀ-ಸಂಬಂಧ", hi: "लक्ष्मी-सम्बन्ध" },
    note:  { en: "The eternal Sri-Vishnu mithuna. For Madhva, Lakshmi is the highest jiva - the kuta-stha akshara of BG 15.16 - eternally subordinate to Hari but supreme above all other jivas.", dev: "नित्य-श्री-विष्णु-मिथुन-तत्त्वम्। मध्व-मते लक्ष्मीः उच्चतमं जीव-तत्त्वम्, गीता १५।१६-स्थः कूटस्थ अक्षरः, हरेः नित्य-परतन्त्रा अथ च सर्व-इतर-जीवेभ्यः उत्तमा।", kn: "ನಿತ್ಯ-ಶ್ರೀ-ವಿಷ್ಣು-ಮಿಥುನ-ತತ್ತ್ವ. ಮಧ್ವ-ಮತದಲ್ಲಿ ಲಕ್ಷ್ಮೀ ಉಚ್ಚತಮ ಜೀವ-ತತ್ತ್ವ, ಗೀತಾ ೧೫।೧೬ರ ಕೂಟಸ್ಥ ಅಕ್ಷರ, ಹರಿಯ ನಿತ್ಯ-ಪರತಂತ್ರಾ ಆದರೆ ಉಳಿದೆಲ್ಲ ಜೀವಗಳಿಗಿಂತ ಉತ್ತಮ.", hi: "नित्य श्री-विष्णु मिथुन-तत्त्व। मध्व मत में लक्ष्मी उच्चतम जीव-तत्त्व, गीता १५।१६ का कूटस्थ अक्षर, हरि के नित्य-परतन्त्र पर बाकी सब जीवों से उत्तम।" },
    nama_ids: ["n_0643"],
  },
  {
    id: "c_moksha_prada", tier: "mokshaprada",
    en: "Moksha-prada", dev: "मोक्ष-प्रद", kn: "ಮೋಕ್ಷ-ಪ್ರದ", hi: "मोक्ष-प्रद",
    title: { en: "Liberation-bestowing", dev: "मोक्ष-प्रदत्वम्", kn: "ಮೋಕ್ಷ-ಪ್ರದತ್ವ", hi: "मोक्ष-प्रदत्व" },
    note:  { en: "Hari is the sole-cause of mukti. Mukunda (515), Muktanam-parama-gatih (13), and Hari himself (656) are the proper-name forms. For Madhva, mukti has tāratamya - sālokya, sāmīpya, sārūpya, sāyujya - all granted by Hari.", dev: "हरिः मुक्तेः एक-कारणम्। मुकुन्द (५१५), मुक्तानां परमा गतिः (१३), हरिः (६५६) - नाम-स्वरूपाणि। मध्व-मते मुक्तौ तारतम्यम् - सालोक्य-सामीप्य-सारूप्य-सायुज्य - सर्वाः हरि-प्रसादात्।", kn: "ಹರಿ ಮುಕ್ತಿಯ ಏಕ-ಕಾರಣ. ಮುಕುಂದ (೫೧೫), ಮುಕ್ತಾನಾಂ ಪರಮಾ ಗತಿಃ (೧೩), ಹರಿ (೬೫೬) ನಾಮ-ಸ್ವರೂಪಗಳು. ಮಧ್ವ-ಮತದಲ್ಲಿ ಮುಕ್ತಿಯಲ್ಲಿ ತಾರತಮ್ಯ — ಎಲ್ಲ ಹರಿ-ಪ್ರಸಾದದಿಂದ.", hi: "हरि मुक्ति के एकमात्र कारण। मुकुन्द (५१५), मुक्तानां परमा गतिः (१३), हरि (६५६) नाम-स्वरूप। मध्व मत में मुक्ति में तारतम्य।" },
    nama_ids: ["n_0013", "n_0515", "n_0656", "n_0886", "n_0986"],
  },
];


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CTIERS, CONCEPTS };
}
