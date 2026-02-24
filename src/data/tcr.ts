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

const dataDir = join(process.cwd(), 'src', 'data', 'genesis');

export function loadChapter(num: number): Chapter {
  const file = join(dataDir, `chapter-${String(num).padStart(2, '0')}.json`);
  return JSON.parse(readFileSync(file, 'utf-8'));
}

export function getAllChapterNums(): number[] {
  return Array.from({ length: 50 }, (_, i) => i + 1);
}

export function getChapterVerseCounts(): Record<number, number> {
  const counts: Record<number, number> = {};
  for (const n of getAllChapterNums()) {
    const ch = loadChapter(n);
    counts[n] = ch.verses.length;
  }
  return counts;
}
