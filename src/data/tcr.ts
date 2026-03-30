import { readFileSync } from 'fs';
import { join } from 'path';

// ── Types ──────────────────────────────────────────────────────────────────

export type Testament = 'old' | 'new';
export type Tier = 'standard' | 'extended';
export type BookStatus = 'complete' | 'in-progress' | 'not-started';
export type SourceText = 'wlc' | 'sblgnt' | 'lxx' | 'dss' | 'samaritan' | 'ethiopic' | 'targum' | 'jst' | 'vulgate' | 'peshitta';

export type EditionTier = 'manuscript' | 'pre-nicaea-canon' | 'interpretive';

export type Section =
  | 'pentateuch' | 'historical' | 'wisdom' | 'major-prophets' | 'minor-prophets'
  | 'gospels' | 'acts' | 'pauline-epistles' | 'general-epistles' | 'apocalyptic'
  | 'deuterocanonical' | 'orthodox-additions' | 'ethiopian-canon' | 'dead-sea-scrolls'
  | 'pre-nicaea-canon' | 'interpretive-traditions';

export interface AlternateEdition {
  slug: string;
  label: string;
  sourceText: SourceText;
  status: BookStatus;
  tier?: EditionTier;
  uiLabel?: string;
  date?: string;
  preNicaea?: boolean;
  scope?: 'full' | 'partial' | 'fragments';
  description?: string;
  license?: string;
}

export interface KeyTerm {
  hebrew: string;
  transliteration: string;
  rendered_as: string;
  semantic_range: string;
  note: string;
}

export interface Verse {
  verse: number;
  text_hebrew: string;
  text_aramaic?: string;
  text_kjv: string;
  rendering: string;
  translator_notes: string[];
  key_terms: KeyTerm[];
  expanded_rendering?: string;
  reading_level?: string;
}

export interface ChapterMeta {
  project: string;
  version: string;
  book: string;
  chapter: number;
  source_text: string;
  reference_text: string;
  model: string;
  generated_at: string;
  prompt_version: string;
  license: string;
}

export interface Preamble {
  summary: string;
  remarkable: string;
  friction: string;
  connections: string;
}

export interface Chapter {
  meta: ChapterMeta;
  preamble?: Preamble;
  verses: Verse[];
}

export interface BookInfo {
  slug: string;
  name: string;
  hebrewName?: string;
  greekName?: string;
  transliteration?: string;
  meaning?: string;
  chapters: number;
  testament: Testament;
  tier: Tier;
  section: Section;
  order: number;
  canons: string[];
  sourceText: SourceText;
  status: BookStatus;
  alternateEditions?: AlternateEdition[];
}

export interface SectionInfo {
  id: Section;
  name: string;
  testament: Testament;
  tier: Tier;
  order: number;
}

// ── Sections ───────────────────────────────────────────────────────────────

export const SECTIONS: SectionInfo[] = [
  { id: 'pentateuch', name: 'Pentateuch', testament: 'old', tier: 'standard', order: 1 },
  { id: 'historical', name: 'Historical Books', testament: 'old', tier: 'standard', order: 2 },
  { id: 'wisdom', name: 'Wisdom & Poetry', testament: 'old', tier: 'standard', order: 3 },
  { id: 'major-prophets', name: 'Major Prophets', testament: 'old', tier: 'standard', order: 4 },
  { id: 'minor-prophets', name: 'Minor Prophets', testament: 'old', tier: 'standard', order: 5 },
  { id: 'gospels', name: 'Gospels', testament: 'new', tier: 'standard', order: 6 },
  { id: 'acts', name: 'History', testament: 'new', tier: 'standard', order: 7 },
  { id: 'pauline-epistles', name: 'Pauline Epistles', testament: 'new', tier: 'standard', order: 8 },
  { id: 'general-epistles', name: 'General Epistles', testament: 'new', tier: 'standard', order: 9 },
  { id: 'apocalyptic', name: 'Apocalyptic', testament: 'new', tier: 'standard', order: 10 },
  { id: 'deuterocanonical', name: 'Deuterocanonical', testament: 'old', tier: 'extended', order: 11 },
  { id: 'orthodox-additions', name: 'Orthodox Canon', testament: 'old', tier: 'extended', order: 12 },
  { id: 'ethiopian-canon', name: 'Ethiopian Canon', testament: 'old', tier: 'extended', order: 13 },
  { id: 'dead-sea-scrolls', name: 'Dead Sea Scrolls', testament: 'old', tier: 'extended', order: 14 },
  { id: 'pre-nicaea-canon', name: 'Pre-Nicaea Canon', testament: 'old', tier: 'extended', order: 15 },
  { id: 'interpretive-traditions', name: 'Interpretive Traditions', testament: 'old', tier: 'extended', order: 16 },
];

// ── Books ──────────────────────────────────────────────────────────────────

export const BOOKS: BookInfo[] = [

  // ─── OLD TESTAMENT: Pentateuch ───────────────────────────────────────────

  {
    slug: 'genesis', name: 'Genesis',
    hebrewName: 'בְּרֵאשִׁית', transliteration: 'Bereshit', meaning: 'In the beginning',
    chapters: 50, testament: 'old', tier: 'standard', section: 'pentateuch', order: 1,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
    alternateEditions: [
      { slug: 'genesis-lxx', label: 'Septuagint (LXX)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'genesis-sam', label: 'Samaritan Pentateuch', sourceText: 'samaritan', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '4th c. BCE divergence', preNicaea: true, scope: 'full', description: '~6,000 variant readings vs. MT. Theologically significant: 10th commandment designates Mt. Gerizim.', license: 'public-domain' },
      { slug: 'genesis-targum', label: 'Targum Onkelos', sourceText: 'targum', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1st c. BCE – 5th c. CE', preNicaea: true, scope: 'full', description: 'Aramaic interpretive paraphrase used in synagogue worship.', license: 'public-domain' },
      { slug: 'genesis-jst', label: 'Joseph Smith Translation (Book of Moses)', sourceText: 'jst', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1830s CE', preNicaea: false, scope: 'partial', description: 'Revelatory revision of Genesis 1-24. Not a translation from original languages.', license: 'research-required' },
    ],
  },
  {
    slug: 'exodus', name: 'Exodus',
    hebrewName: 'שְׁמוֹת', transliteration: 'Shemot', meaning: 'Names',
    chapters: 40, testament: 'old', tier: 'standard', section: 'pentateuch', order: 2,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
    alternateEditions: [
      { slug: 'exodus-lxx', label: 'Septuagint (LXX)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'exodus-sam', label: 'Samaritan Pentateuch', sourceText: 'samaritan', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '4th c. BCE divergence', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'exodus-targum', label: 'Targum Onkelos', sourceText: 'targum', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1st c. BCE – 5th c. CE', preNicaea: true, scope: 'full', license: 'public-domain' },
    ],
  },
  {
    slug: 'leviticus', name: 'Leviticus',
    hebrewName: 'וַיִּקְרָא', transliteration: 'Vayiqra', meaning: 'And He called',
    chapters: 27, testament: 'old', tier: 'standard', section: 'pentateuch', order: 3,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
    alternateEditions: [
      { slug: 'leviticus-lxx', label: 'Septuagint (LXX)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'leviticus-sam', label: 'Samaritan Pentateuch', sourceText: 'samaritan', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '4th c. BCE divergence', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'leviticus-targum', label: 'Targum Onkelos', sourceText: 'targum', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1st c. BCE – 5th c. CE', preNicaea: true, scope: 'full', license: 'public-domain' },
    ],
  },
  {
    slug: 'numbers', name: 'Numbers',
    hebrewName: 'בְּמִדְבַּר', transliteration: 'Bemidbar', meaning: 'In the wilderness',
    chapters: 36, testament: 'old', tier: 'standard', section: 'pentateuch', order: 4,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
    alternateEditions: [
      { slug: 'numbers-lxx', label: 'Septuagint (LXX)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'numbers-sam', label: 'Samaritan Pentateuch', sourceText: 'samaritan', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '4th c. BCE divergence', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'numbers-targum', label: 'Targum Onkelos', sourceText: 'targum', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1st c. BCE – 5th c. CE', preNicaea: true, scope: 'full', license: 'public-domain' },
    ],
  },
  {
    slug: 'deuteronomy', name: 'Deuteronomy',
    hebrewName: 'דְּבָרִים', transliteration: 'Devarim', meaning: 'Words',
    chapters: 34, testament: 'old', tier: 'standard', section: 'pentateuch', order: 5,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
    alternateEditions: [
      { slug: 'deuteronomy-lxx', label: 'Septuagint (LXX)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'deuteronomy-sam', label: 'Samaritan Pentateuch', sourceText: 'samaritan', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '4th c. BCE divergence', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'deuteronomy-targum', label: 'Targum Onkelos', sourceText: 'targum', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1st c. BCE – 5th c. CE', preNicaea: true, scope: 'full', license: 'public-domain' },
    ],
  },

  // ─── OLD TESTAMENT: Historical Books ─────────────────────────────────────

  {
    slug: 'joshua', name: 'Joshua',
    hebrewName: 'יְהוֹשֻׁעַ', transliteration: 'Yehoshua', meaning: 'The LORD saves',
    chapters: 24, testament: 'old', tier: 'standard', section: 'historical', order: 6,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: 'judges', name: 'Judges',
    hebrewName: 'שׁוֹפְטִים', transliteration: 'Shoftim', meaning: 'Judges',
    chapters: 21, testament: 'old', tier: 'standard', section: 'historical', order: 7,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: 'ruth', name: 'Ruth',
    hebrewName: 'רוּת', transliteration: 'Rut', meaning: 'Friend / Companion',
    chapters: 4, testament: 'old', tier: 'standard', section: 'historical', order: 8,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: '1-samuel', name: '1 Samuel',
    hebrewName: 'שְׁמוּאֵל א', transliteration: 'Shemu\'el Alef', meaning: 'Heard by God',
    chapters: 31, testament: 'old', tier: 'standard', section: 'historical', order: 9,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: '2-samuel', name: '2 Samuel',
    hebrewName: 'שְׁמוּאֵל ב', transliteration: 'Shemu\'el Bet', meaning: 'Heard by God',
    chapters: 24, testament: 'old', tier: 'standard', section: 'historical', order: 10,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: '1-kings', name: '1 Kings',
    hebrewName: 'מְלָכִים א', transliteration: 'Melakhim Alef', meaning: 'Kings',
    chapters: 22, testament: 'old', tier: 'standard', section: 'historical', order: 11,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: '2-kings', name: '2 Kings',
    hebrewName: 'מְלָכִים ב', transliteration: 'Melakhim Bet', meaning: 'Kings',
    chapters: 25, testament: 'old', tier: 'standard', section: 'historical', order: 12,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: '1-chronicles', name: '1 Chronicles',
    hebrewName: 'דִּבְרֵי הַיָּמִים א', transliteration: 'Divrei HaYamim Alef', meaning: 'Events of the days',
    chapters: 29, testament: 'old', tier: 'standard', section: 'historical', order: 13,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: '2-chronicles', name: '2 Chronicles',
    hebrewName: 'דִּבְרֵי הַיָּמִים ב', transliteration: 'Divrei HaYamim Bet', meaning: 'Events of the days',
    chapters: 36, testament: 'old', tier: 'standard', section: 'historical', order: 14,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: 'ezra', name: 'Ezra',
    hebrewName: 'עֶזְרָא', transliteration: 'Ezra', meaning: 'Help',
    chapters: 10, testament: 'old', tier: 'standard', section: 'historical', order: 15,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: 'nehemiah', name: 'Nehemiah',
    hebrewName: 'נְחֶמְיָה', transliteration: 'Nechemyah', meaning: 'The LORD comforts',
    chapters: 13, testament: 'old', tier: 'standard', section: 'historical', order: 16,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: 'esther', name: 'Esther',
    hebrewName: 'אֶסְתֵּר', transliteration: 'Ester', meaning: 'Star / Hidden',
    chapters: 10, testament: 'old', tier: 'standard', section: 'historical', order: 17,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
    alternateEditions: [
      { slug: 'esther-lxx', label: 'Greek Esther (LXX, with additions)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '2nd–1st c. BCE', preNicaea: true, scope: 'full', description: '107 added verses not in the Hebrew text.', license: 'public-domain' },
    ],
  },

  // ─── OLD TESTAMENT: Wisdom & Poetry ──────────────────────────────────────

  {
    slug: 'job', name: 'Job',
    hebrewName: 'אִיּוֹב', transliteration: 'Iyyov', meaning: 'Persecuted',
    chapters: 42, testament: 'old', tier: 'standard', section: 'wisdom', order: 18,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'complete',
  },
  {
    slug: 'psalms', name: 'Psalms',
    hebrewName: 'תְּהִלִּים', transliteration: 'Tehillim', meaning: 'Praises',
    chapters: 150, testament: 'old', tier: 'standard', section: 'wisdom', order: 19,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
    alternateEditions: [
      { slug: 'psalms-dss', label: 'Psalms Scroll (11QPsᵃ)', sourceText: 'dss', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '1st c. CE', preNicaea: true, scope: 'partial', description: 'Includes extra psalms and different ordering. Major DSS psalms witness.', license: 'public-domain' },
      { slug: 'psalms-lxx', label: 'Septuagint Psalter (LXX)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', description: 'Includes Psalm 151 and different numbering system.', license: 'public-domain' },
    ],
  },
  {
    slug: 'proverbs', name: 'Proverbs',
    hebrewName: 'מִשְׁלֵי', transliteration: 'Mishlei', meaning: 'Proverbs / Parables',
    chapters: 31, testament: 'old', tier: 'standard', section: 'wisdom', order: 20,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'ecclesiastes', name: 'Ecclesiastes',
    hebrewName: 'קֹהֶלֶת', transliteration: 'Qohelet', meaning: 'The Preacher / Assembler',
    chapters: 12, testament: 'old', tier: 'standard', section: 'wisdom', order: 21,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'song-of-solomon', name: 'Song of Solomon',
    hebrewName: 'שִׁיר הַשִּׁירִים', transliteration: 'Shir HaShirim', meaning: 'Song of Songs',
    chapters: 8, testament: 'old', tier: 'standard', section: 'wisdom', order: 22,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },

  // ─── OLD TESTAMENT: Major Prophets ───────────────────────────────────────

  {
    slug: 'isaiah', name: 'Isaiah',
    hebrewName: 'יְשַׁעְיָהוּ', transliteration: 'Yesha\'yahu', meaning: 'The LORD is salvation',
    chapters: 66, testament: 'old', tier: 'standard', section: 'major-prophets', order: 23,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
    alternateEditions: [
      { slug: 'isaiah-dss', label: 'Great Isaiah Scroll (1QIsaᵃ)', sourceText: 'dss', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '150–100 BCE', preNicaea: true, scope: 'full', description: 'The oldest complete manuscript of any biblical book. All 66 chapters preserved.', license: 'public-domain' },
      { slug: 'isaiah-lxx', label: 'Septuagint Isaiah (LXX)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', license: 'public-domain' },
      { slug: 'isaiah-targum', label: 'Targum Jonathan', sourceText: 'targum', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1st c. BCE – 5th c. CE', preNicaea: true, scope: 'full', description: 'Aramaic interpretive paraphrase of the Prophets.', license: 'public-domain' },
    ],
  },
  {
    slug: 'jeremiah', name: 'Jeremiah',
    hebrewName: 'יִרְמְיָהוּ', transliteration: 'Yirmeyahu', meaning: 'The LORD exalts',
    chapters: 52, testament: 'old', tier: 'standard', section: 'major-prophets', order: 24,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
    alternateEditions: [
      { slug: 'jeremiah-lxx', label: 'Septuagint Jeremiah (LXX, shorter text)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '3rd–2nd c. BCE', preNicaea: true, scope: 'full', description: 'Significantly shorter than the MT (~1/8 less text) with different chapter arrangement.', license: 'public-domain' },
      { slug: 'jeremiah-targum', label: 'Targum Jonathan', sourceText: 'targum', status: 'not-started',
        tier: 'interpretive', uiLabel: 'How traditions read this passage', date: '1st c. BCE – 5th c. CE', preNicaea: true, scope: 'full', license: 'public-domain' },
    ],
  },
  {
    slug: 'lamentations', name: 'Lamentations',
    hebrewName: 'אֵיכָה', transliteration: 'Eikhah', meaning: 'How!',
    chapters: 5, testament: 'old', tier: 'standard', section: 'major-prophets', order: 25,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'ezekiel', name: 'Ezekiel',
    hebrewName: 'יְחֶזְקֵאל', transliteration: 'Yechezqel', meaning: 'God strengthens',
    chapters: 48, testament: 'old', tier: 'standard', section: 'major-prophets', order: 26,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'daniel', name: 'Daniel',
    hebrewName: 'דָּנִיֵּאל', transliteration: 'Daniyyel', meaning: 'God is my judge',
    chapters: 12, testament: 'old', tier: 'standard', section: 'major-prophets', order: 27,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
    alternateEditions: [
      { slug: 'daniel-lxx', label: 'Greek Daniel (LXX, with additions)', sourceText: 'lxx', status: 'not-started',
        tier: 'manuscript', uiLabel: 'Other manuscript traditions', date: '2nd c. BCE', preNicaea: true, scope: 'full', description: 'Includes additions: Prayer of Azariah, Susanna, Bel and the Dragon.', license: 'public-domain' },
    ],
  },

  // ─── OLD TESTAMENT: Minor Prophets ───────────────────────────────────────

  {
    slug: 'hosea', name: 'Hosea',
    hebrewName: 'הוֹשֵׁעַ', transliteration: 'Hoshea', meaning: 'Salvation',
    chapters: 14, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 28,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'joel', name: 'Joel',
    hebrewName: 'יוֹאֵל', transliteration: 'Yo\'el', meaning: 'The LORD is God',
    chapters: 3, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 29,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'amos', name: 'Amos',
    hebrewName: 'עָמוֹס', transliteration: 'Amos', meaning: 'Burden-bearer',
    chapters: 9, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 30,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'obadiah', name: 'Obadiah',
    hebrewName: 'עֹבַדְיָה', transliteration: 'Ovadyah', meaning: 'Servant of the LORD',
    chapters: 1, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 31,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'jonah', name: 'Jonah',
    hebrewName: 'יוֹנָה', transliteration: 'Yonah', meaning: 'Dove',
    chapters: 4, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 32,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'micah', name: 'Micah',
    hebrewName: 'מִיכָה', transliteration: 'Mikhah', meaning: 'Who is like the LORD?',
    chapters: 7, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 33,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'nahum', name: 'Nahum',
    hebrewName: 'נַחוּם', transliteration: 'Nachum', meaning: 'Comfort',
    chapters: 3, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 34,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'habakkuk', name: 'Habakkuk',
    hebrewName: 'חֲבַקּוּק', transliteration: 'Chavaqquq', meaning: 'Embrace',
    chapters: 3, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 35,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'zephaniah', name: 'Zephaniah',
    hebrewName: 'צְפַנְיָה', transliteration: 'Tsefanyah', meaning: 'The LORD has hidden',
    chapters: 3, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 36,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'haggai', name: 'Haggai',
    hebrewName: 'חַגַּי', transliteration: 'Chaggai', meaning: 'My feast',
    chapters: 2, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 37,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'zechariah', name: 'Zechariah',
    hebrewName: 'זְכַרְיָה', transliteration: 'Zekharyah', meaning: 'The LORD remembers',
    chapters: 14, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 38,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },
  {
    slug: 'malachi', name: 'Malachi',
    hebrewName: 'מַלְאָכִי', transliteration: 'Mal\'akhi', meaning: 'My messenger',
    chapters: 4, testament: 'old', tier: 'standard', section: 'minor-prophets', order: 39,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'wlc', status: 'not-started',
  },

  // ─── NEW TESTAMENT: Gospels ──────────────────────────────────────────────

  {
    slug: 'matthew', name: 'Matthew',
    greekName: 'Κατὰ Μαθθαῖον', transliteration: 'Kata Maththaion', meaning: 'According to Matthew',
    chapters: 28, testament: 'new', tier: 'standard', section: 'gospels', order: 40,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'mark', name: 'Mark',
    greekName: 'Κατὰ Μᾶρκον', transliteration: 'Kata Markon', meaning: 'According to Mark',
    chapters: 16, testament: 'new', tier: 'standard', section: 'gospels', order: 41,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'luke', name: 'Luke',
    greekName: 'Κατὰ Λουκᾶν', transliteration: 'Kata Loukan', meaning: 'According to Luke',
    chapters: 24, testament: 'new', tier: 'standard', section: 'gospels', order: 42,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'john', name: 'John',
    greekName: 'Κατὰ Ἰωάννην', transliteration: 'Kata Iōannēn', meaning: 'According to John',
    chapters: 21, testament: 'new', tier: 'standard', section: 'gospels', order: 43,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },

  // ─── NEW TESTAMENT: History ──────────────────────────────────────────────

  {
    slug: 'acts', name: 'Acts',
    greekName: 'Πράξεις Ἀποστόλων', transliteration: 'Praxeis Apostolōn', meaning: 'Acts of the Apostles',
    chapters: 28, testament: 'new', tier: 'standard', section: 'acts', order: 44,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },

  // ─── NEW TESTAMENT: Pauline Epistles ─────────────────────────────────────

  {
    slug: 'romans', name: 'Romans',
    greekName: 'Πρὸς Ῥωμαίους', transliteration: 'Pros Rhōmaious', meaning: 'To the Romans',
    chapters: 16, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 45,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '1-corinthians', name: '1 Corinthians',
    greekName: 'Πρὸς Κορινθίους Αʹ', transliteration: 'Pros Korinthious A', meaning: 'First to the Corinthians',
    chapters: 16, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 46,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '2-corinthians', name: '2 Corinthians',
    greekName: 'Πρὸς Κορινθίους Βʹ', transliteration: 'Pros Korinthious B', meaning: 'Second to the Corinthians',
    chapters: 13, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 47,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'galatians', name: 'Galatians',
    greekName: 'Πρὸς Γαλάτας', transliteration: 'Pros Galatas', meaning: 'To the Galatians',
    chapters: 6, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 48,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'ephesians', name: 'Ephesians',
    greekName: 'Πρὸς Ἐφεσίους', transliteration: 'Pros Ephesious', meaning: 'To the Ephesians',
    chapters: 6, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 49,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'philippians', name: 'Philippians',
    greekName: 'Πρὸς Φιλιππησίους', transliteration: 'Pros Philippēsious', meaning: 'To the Philippians',
    chapters: 4, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 50,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'colossians', name: 'Colossians',
    greekName: 'Πρὸς Κολοσσαεῖς', transliteration: 'Pros Kolossaeis', meaning: 'To the Colossians',
    chapters: 4, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 51,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '1-thessalonians', name: '1 Thessalonians',
    greekName: 'Πρὸς Θεσσαλονικεῖς Αʹ', transliteration: 'Pros Thessalonikeis A', meaning: 'First to the Thessalonians',
    chapters: 5, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 52,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '2-thessalonians', name: '2 Thessalonians',
    greekName: 'Πρὸς Θεσσαλονικεῖς Βʹ', transliteration: 'Pros Thessalonikeis B', meaning: 'Second to the Thessalonians',
    chapters: 3, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 53,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '1-timothy', name: '1 Timothy',
    greekName: 'Πρὸς Τιμόθεον Αʹ', transliteration: 'Pros Timotheon A', meaning: 'First to Timothy',
    chapters: 6, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 54,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '2-timothy', name: '2 Timothy',
    greekName: 'Πρὸς Τιμόθεον Βʹ', transliteration: 'Pros Timotheon B', meaning: 'Second to Timothy',
    chapters: 4, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 55,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'titus', name: 'Titus',
    greekName: 'Πρὸς Τίτον', transliteration: 'Pros Titon', meaning: 'To Titus',
    chapters: 3, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 56,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'philemon', name: 'Philemon',
    greekName: 'Πρὸς Φιλήμονα', transliteration: 'Pros Philēmona', meaning: 'To Philemon',
    chapters: 1, testament: 'new', tier: 'standard', section: 'pauline-epistles', order: 57,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },

  // ─── NEW TESTAMENT: General Epistles ─────────────────────────────────────

  {
    slug: 'hebrews', name: 'Hebrews',
    greekName: 'Πρὸς Ἑβραίους', transliteration: 'Pros Hebraious', meaning: 'To the Hebrews',
    chapters: 13, testament: 'new', tier: 'standard', section: 'general-epistles', order: 58,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'james', name: 'James',
    greekName: 'Ἰακώβου', transliteration: 'Iakōbou', meaning: 'Of James',
    chapters: 5, testament: 'new', tier: 'standard', section: 'general-epistles', order: 59,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '1-peter', name: '1 Peter',
    greekName: 'Πέτρου Αʹ', transliteration: 'Petrou A', meaning: 'First of Peter',
    chapters: 5, testament: 'new', tier: 'standard', section: 'general-epistles', order: 60,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '2-peter', name: '2 Peter',
    greekName: 'Πέτρου Βʹ', transliteration: 'Petrou B', meaning: 'Second of Peter',
    chapters: 3, testament: 'new', tier: 'standard', section: 'general-epistles', order: 61,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '1-john', name: '1 John',
    greekName: 'Ἰωάννου Αʹ', transliteration: 'Iōannou A', meaning: 'First of John',
    chapters: 5, testament: 'new', tier: 'standard', section: 'general-epistles', order: 62,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '2-john', name: '2 John',
    greekName: 'Ἰωάννου Βʹ', transliteration: 'Iōannou B', meaning: 'Second of John',
    chapters: 1, testament: 'new', tier: 'standard', section: 'general-epistles', order: 63,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: '3-john', name: '3 John',
    greekName: 'Ἰωάννου Γʹ', transliteration: 'Iōannou G', meaning: 'Third of John',
    chapters: 1, testament: 'new', tier: 'standard', section: 'general-epistles', order: 64,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },
  {
    slug: 'jude', name: 'Jude',
    greekName: 'Ἰούδα', transliteration: 'Iouda', meaning: 'Of Jude',
    chapters: 1, testament: 'new', tier: 'standard', section: 'general-epistles', order: 65,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },

  // ─── NEW TESTAMENT: Apocalyptic ──────────────────────────────────────────

  {
    slug: 'revelation', name: 'Revelation',
    greekName: 'Ἀποκάλυψις Ἰωάννου', transliteration: 'Apokalypsis Iōannou', meaning: 'Revelation of John',
    chapters: 22, testament: 'new', tier: 'standard', section: 'apocalyptic', order: 66,
    canons: ['protestant', 'catholic', 'orthodox', 'ethiopian'], sourceText: 'sblgnt', status: 'not-started',
  },

  // ─── EXTENDED: Deuterocanonical / Apocrypha ──────────────────────────────

  {
    slug: 'tobit', name: 'Tobit',
    greekName: 'Τωβίτ', transliteration: 'Tōbit',
    chapters: 14, testament: 'old', tier: 'extended', section: 'deuterocanonical', order: 67,
    canons: ['catholic', 'orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: 'judith', name: 'Judith',
    greekName: 'Ἰουδίθ', transliteration: 'Ioudith',
    chapters: 16, testament: 'old', tier: 'extended', section: 'deuterocanonical', order: 68,
    canons: ['catholic', 'orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: 'wisdom-of-solomon', name: 'Wisdom of Solomon',
    greekName: 'Σοφία Σαλωμῶνος', transliteration: 'Sophia Salōmōnos',
    chapters: 19, testament: 'old', tier: 'extended', section: 'deuterocanonical', order: 69,
    canons: ['catholic', 'orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: 'sirach', name: 'Sirach',
    greekName: 'Σοφία Σειράχ', transliteration: 'Sophia Seirach', meaning: 'Wisdom of Ben Sira',
    chapters: 51, testament: 'old', tier: 'extended', section: 'deuterocanonical', order: 70,
    canons: ['catholic', 'orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: 'baruch', name: 'Baruch',
    greekName: 'Βαρούχ', transliteration: 'Barouch', meaning: 'Includes Letter of Jeremiah',
    chapters: 6, testament: 'old', tier: 'extended', section: 'deuterocanonical', order: 71,
    canons: ['catholic', 'orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: '1-maccabees', name: '1 Maccabees',
    greekName: 'Μακκαβαίων Αʹ', transliteration: 'Makkabaiōn A',
    chapters: 16, testament: 'old', tier: 'extended', section: 'deuterocanonical', order: 72,
    canons: ['catholic', 'orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: '2-maccabees', name: '2 Maccabees',
    greekName: 'Μακκαβαίων Βʹ', transliteration: 'Makkabaiōn B',
    chapters: 15, testament: 'old', tier: 'extended', section: 'deuterocanonical', order: 73,
    canons: ['catholic', 'orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },

  // ─── EXTENDED: Orthodox Additions ────────────────────────────────────────

  {
    slug: '1-esdras', name: '1 Esdras',
    greekName: 'Ἔσδρας Αʹ', transliteration: 'Esdras A',
    chapters: 9, testament: 'old', tier: 'extended', section: 'orthodox-additions', order: 74,
    canons: ['orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: '2-esdras', name: '2 Esdras',
    transliteration: '4 Ezra',
    chapters: 16, testament: 'old', tier: 'extended', section: 'orthodox-additions', order: 75,
    canons: ['orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: 'prayer-of-manasseh', name: 'Prayer of Manasseh',
    greekName: 'Προσευχὴ Μανασσῆ', transliteration: 'Proseuchē Manassē',
    chapters: 1, testament: 'old', tier: 'extended', section: 'orthodox-additions', order: 76,
    canons: ['orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: 'psalm-151', name: 'Psalm 151',
    greekName: 'Ψαλμός 151', transliteration: 'Psalmos 151',
    chapters: 1, testament: 'old', tier: 'extended', section: 'orthodox-additions', order: 77,
    canons: ['orthodox', 'ethiopian'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: '3-maccabees', name: '3 Maccabees',
    greekName: 'Μακκαβαίων Γʹ', transliteration: 'Makkabaiōn G',
    chapters: 7, testament: 'old', tier: 'extended', section: 'orthodox-additions', order: 78,
    canons: ['orthodox'], sourceText: 'lxx', status: 'not-started',
  },
  {
    slug: '4-maccabees', name: '4 Maccabees',
    greekName: 'Μακκαβαίων Δʹ', transliteration: 'Makkabaiōn D',
    chapters: 18, testament: 'old', tier: 'extended', section: 'orthodox-additions', order: 79,
    canons: ['orthodox'], sourceText: 'lxx', status: 'not-started',
  },

  // ─── EXTENDED: Pre-Nicaea Canon ──────────────────────────────────────────
  // Books widely read by Second Temple Jewish communities and/or early Christians
  // before canon formalization at Nicaea (325 CE). See extended-library-direction.md.

  {
    slug: '1-enoch', name: '1 Enoch',
    transliteration: 'Henok', meaning: 'Book of Enoch',
    chapters: 108, testament: 'old', tier: 'extended', section: 'pre-nicaea-canon', order: 80,
    canons: ['ethiopian'], sourceText: 'ethiopic', status: 'not-started',
  },
  {
    slug: 'jubilees', name: 'Jubilees',
    transliteration: 'Kufale', meaning: 'Book of Jubilees',
    chapters: 50, testament: 'old', tier: 'extended', section: 'pre-nicaea-canon', order: 81,
    canons: ['ethiopian'], sourceText: 'ethiopic', status: 'not-started',
  },

  // ─── EXTENDED: Dead Sea Scrolls ──────────────────────────────────────────

  {
    slug: 'great-isaiah-scroll', name: 'Great Isaiah Scroll',
    hebrewName: '1QIsaᵃ', transliteration: '1QIsa-a', meaning: 'The oldest complete manuscript of any biblical book',
    chapters: 66, testament: 'old', tier: 'extended', section: 'dead-sea-scrolls', order: 82,
    canons: [], sourceText: 'dss', status: 'not-started',
  },
  {
    slug: 'community-rule', name: 'Community Rule',
    hebrewName: 'סֵרֶךְ הַיַּחַד', transliteration: 'Serekh HaYachad', meaning: '1QS — Rule of the Community',
    chapters: 11, testament: 'old', tier: 'extended', section: 'dead-sea-scrolls', order: 83,
    canons: [], sourceText: 'dss', status: 'not-started',
  },
  {
    slug: 'war-scroll', name: 'War Scroll',
    hebrewName: 'מִלְחֶמֶת בְּנֵי אוֹר', transliteration: 'Milchemet Bnei Or', meaning: '1QM — War of the Sons of Light',
    chapters: 19, testament: 'old', tier: 'extended', section: 'dead-sea-scrolls', order: 84,
    canons: [], sourceText: 'dss', status: 'not-started',
  },
  {
    slug: 'temple-scroll', name: 'Temple Scroll',
    hebrewName: 'מִקְדָּשׁ', transliteration: 'Miqdash', meaning: '11QT — Temple Scroll',
    chapters: 67, testament: 'old', tier: 'extended', section: 'dead-sea-scrolls', order: 85,
    canons: [], sourceText: 'dss', status: 'not-started',
  },
  {
    slug: 'damascus-document', name: 'Damascus Document',
    hebrewName: 'בְּרִית דַּמֶּשֶׂק', transliteration: 'Berit Dammeseq', meaning: 'CD — Covenant of Damascus',
    chapters: 20, testament: 'old', tier: 'extended', section: 'dead-sea-scrolls', order: 86,
    canons: [], sourceText: 'dss', status: 'not-started',
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

const dataRoot = join(process.cwd(), 'src', 'data');

export function loadChapter(book: string, num: number): Chapter {
  const file = join(dataRoot, book, `chapter-${String(num).padStart(2, '0')}.json`);
  return JSON.parse(readFileSync(file, 'utf-8'));
}

export function getBook(slug: string): BookInfo | undefined {
  return BOOKS.find((b) => b.slug === slug);
}

export function getAllChapterNums(book: string): number[] {
  const info = getBook(book);
  if (!info) return [];
  return Array.from({ length: info.chapters }, (_, i) => i + 1);
}

export function getBookVerseCount(book: string): number {
  let total = 0;
  for (const n of getAllChapterNums(book)) {
    total += loadChapter(book, n).verses.length;
  }
  return total;
}

export function getAvailableBooks(): BookInfo[] {
  return BOOKS.filter((b) => b.status === 'complete');
}

export function getBooksBySection(section: Section): BookInfo[] {
  return BOOKS.filter((b) => b.section === section).sort((a, b) => a.order - b.order);
}

export function getBooksByTestament(testament: Testament): BookInfo[] {
  return BOOKS.filter((b) => b.testament === testament && b.tier === 'standard').sort((a, b) => a.order - b.order);
}

export function getBooksByTier(tier: Tier): BookInfo[] {
  return BOOKS.filter((b) => b.tier === tier).sort((a, b) => a.order - b.order);
}

export function getCompletedBooks(): BookInfo[] {
  return BOOKS.filter((b) => b.status === 'complete').sort((a, b) => a.order - b.order);
}

export function getSections(tier?: Tier): SectionInfo[] {
  if (tier) return SECTIONS.filter((s) => s.tier === tier).sort((a, b) => a.order - b.order);
  return [...SECTIONS].sort((a, b) => a.order - b.order);
}

export function getSectionsByTestament(testament: Testament): SectionInfo[] {
  return SECTIONS.filter((s) => s.testament === testament && s.tier === 'standard').sort((a, b) => a.order - b.order);
}

export function getSection(id: Section): SectionInfo | undefined {
  return SECTIONS.find((s) => s.id === id);
}

export function getTotalChapters(books?: BookInfo[]): number {
  return (books ?? BOOKS).reduce((sum, b) => sum + b.chapters, 0);
}

export function getCompletedChapters(): number {
  return getCompletedBooks().reduce((sum, b) => sum + b.chapters, 0);
}

export const SOURCE_TEXT_LABELS: Record<SourceText, string> = {
  wlc: 'Westminster Leningrad Codex',
  sblgnt: 'SBL Greek New Testament',
  lxx: 'Septuagint (LXX)',
  dss: 'Dead Sea Scrolls',
  samaritan: 'Samaritan Pentateuch',
  ethiopic: 'Ge\'ez (Ethiopic)',
  targum: 'Targum (Aramaic)',
  jst: 'Joseph Smith Translation',
  vulgate: 'Latin Vulgate (Jerome)',
  peshitta: 'Peshitta (Syriac)',
};

export const EDITION_TIER_LABELS: Record<EditionTier, string> = {
  manuscript: 'Other manuscript traditions',
  'pre-nicaea-canon': 'Books read before the councils',
  interpretive: 'How traditions read this passage',
};
