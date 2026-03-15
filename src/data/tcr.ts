import { readFileSync } from 'fs';
import { join } from 'path';

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

export interface Chapter {
  meta: ChapterMeta;
  verses: Verse[];
}

export interface BookInfo {
  slug: string;
  name: string;
  hebrewName: string;
  transliteration: string;
  meaning: string;
  chapters: number;
}

export const BOOKS: BookInfo[] = [
  {
    slug: 'genesis',
    name: 'Genesis',
    hebrewName: 'בְּרֵאשִׁית',
    transliteration: 'Bereshit',
    meaning: 'In the beginning',
    chapters: 50,
  },
  {
    slug: 'exodus',
    name: 'Exodus',
    hebrewName: 'שְׁמוֹת',
    transliteration: 'Shemot',
    meaning: 'Names',
    chapters: 40,
  },
  {
    slug: 'leviticus',
    name: 'Leviticus',
    hebrewName: 'וַיִּקְרָא',
    transliteration: 'Vayiqra',
    meaning: 'And He called',
    chapters: 27,
  },
  {
    slug: 'numbers',
    name: 'Numbers',
    hebrewName: 'בְּמִדְבַּר',
    transliteration: 'Bemidbar',
    meaning: 'In the wilderness',
    chapters: 36,
  },
  {
    slug: 'deuteronomy',
    name: 'Deuteronomy',
    hebrewName: 'דְּבָרִים',
    transliteration: 'Devarim',
    meaning: 'Words',
    chapters: 34,
  },
];

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
