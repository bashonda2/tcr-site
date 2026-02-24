# The Covenant Rendering — Source of Truth

**Version:** 1.2 · **Last updated:** February 24, 2026
**Maintainer:** Aaron Blonquist · **Domain:** thecovenantrendering.com
**GitHub:** https://github.com/bashonda2/the-covenant-rendering

---

> This document is the authoritative reference for The Covenant Rendering (TCR). Any AI agent or human picking up this project for the first time should start here. It supersedes chat history, comments, and READMEs.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Positioning](#2-positioning)
3. [Translation Philosophy](#3-translation-philosophy)
4. [Theologically Rich Terms Register](#4-theologically-rich-terms-register)
5. [Data Structure](#5-data-structure)
6. [Current Content Status](#6-current-content-status)
7. [Tech Stack & Infrastructure](#7-tech-stack--infrastructure)
8. [Site Structure](#8-site-structure)
9. [GitHub Repositories](#9-github-repositories)
10. [Relationship to EVM](#10-relationship-to-evm)
11. [Generation Workflow](#11-generation-workflow)
12. [Roadmap](#12-roadmap)
13. [Open Questions / Decisions Pending](#13-open-questions--decisions-pending)

---

## 1. Project Overview

### What It Is

The Covenant Rendering (TCR) is a free, open-source, modern English translation of the Bible produced directly from the original language source texts:

- **Old Testament:** Westminster Leningrad Codex (WLC) — the standard Masoretic Hebrew text
- **New Testament:** SBL Greek New Testament (SBLGNT) — the standard critical Greek text

Every verse includes:
- **`text_hebrew`** — the full Hebrew (or Greek) source with vowel pointing
- **`text_kjv`** — the KJV text as a reference comparison (not a translation source)
- **`rendering`** — the modern English translation
- **`translator_notes`** — an array of strings documenting every significant translation decision
- **`key_terms`** — Hebrew terms with transliteration, semantic range, and scholarly notes
- **`expanded_rendering`** — (select verses) plain English explanation of what theologically rich terms actually mean, for readers without Hebrew

### The Problem It Solves

The NIV, ESV, NASB, and NLT are the dominant modern English translations — but all of them are under active copyright. Displaying these translations on websites, in apps, or in educational materials requires licensing fees or explicit permission from the copyright holder. For independent developers, researchers, educators, and open-source projects, this is a wall.

The KJV is in the public domain but its 17th-century English is a barrier to modern readers. For 400 years, there has been no serious, rigorously scholarly, modern-English Bible translation that anyone can use without restriction.

TCR exists to fill that gap.

### The Mission

A scholarly, transparent, modern English Bible translation that anyone can:
- Display on a website without a license
- Quote in an app without permission
- Fork, remix, and build on without restriction
- Cite in research without attribution complexity

**License:** Creative Commons Attribution 4.0 International (CC-BY-4.0).
**Attribution requirement:** "The Covenant Rendering, thecovenantrendering.com, CC-BY-4.0" — in any reasonable format, in any medium.

### Open-Source Philosophy

All translation data is stored as clean JSON in the public GitHub repository. The generation prompt, methodology, and model parameters are fully disclosed. TCR is not just open-source in license — it is transparent in method. AI-generated with full disclosure. Every decision documented. Nothing hidden.

---

## 2. Positioning

### Ecumenical

TCR is **not affiliated with any denomination, church, or religious organization**. It is not an LDS translation. It is not an evangelical translation. It is not a Catholic or Orthodox translation. Translation decisions follow the Hebrew/Greek text and scholarly consensus, not theological tradition. Where interpretive tension exists, it is documented openly — not resolved in favor of any confession.

TCR is useful to all Christians, to Jewish readers, to academics, and to anyone studying the Bible. It makes no creedal assumptions.

### Scholarly but Accessible

- **Reading level:** 9th–10th grade (comparable to the ESV)
- Clean, modern, literary English
- Sentences should feel natural when read aloud
- Not dumbed down; not academic jargon
- Preserves the dignity and weight of the text

### Translation Approach

**Formal equivalence** (word-for-word) as the baseline. Prioritizes correspondence to the source text over idiomatic English smoothness. Closer to NASB than NIV on the spectrum, but without wooden literalism. When English grammar requires additions, they are noted.

### AI-Generated with Full Methodology Disclosure

TCR is produced using Claude (Anthropic) — specifically `claude-opus` quality class, which produces the level of Hebrew scholarship, nuance, and translator-note depth the project requires. This is disclosed fully and without apology. The generation prompt is public. The model version is recorded in the `meta.model` field of every chapter JSON. The methodology can be reviewed, critiqued, and improved.

AI-assisted translation is a new frontier. TCR is one of the first systematic, methodologically transparent attempts to apply it to a biblical corpus.

---

## 3. Translation Philosophy

### Source Texts

| Testament | Source Text | Notes |
|-----------|------------|-------|
| Old Testament | Westminster Leningrad Codex (WLC) | Standard Masoretic text; used by ESV, NASB, most modern OT translations |
| New Testament | SBL Greek New Testament (SBLGNT) | Standard critical Greek text |
| Reference only | King James Version (KJV) | Provided alongside each verse for familiarity — NOT a translation source |

The KJV is **never** the source for TCR. It is a reference comparison to help readers orient to a familiar text. All translation is from the Hebrew or Greek directly.

### What Makes TCR Different

| Comparison | KJV | NIV | ESV | TCR |
|------------|-----|-----|-----|-----|
| Copyright | Public domain | ©Biblica | ©Crossway | CC-BY-4.0 |
| Reading level | ~12th grade | ~7th grade | ~10th grade | 9th–10th grade |
| Translation approach | Formal equiv. | Dynamic equiv. | Formal equiv. | Formal equiv. |
| Methodology disclosed | No | No | No | Yes — fully |
| Translator notes per verse | None | None | None | Yes — every verse |
| Key terms with Hebrew | None | None | None | Yes — all significant terms |
| Free to use commercially | Yes | No | No | Yes |

### The Two-Layer Model

TCR is designed with a **reading layer** and a **study layer**:

**Reading layer** — clean, unadorned modern English. The `rendering` field. A reader can open Genesis 1 and read straight through without interruption. The rendering stands alone.

**Study layer** — the full scholarly apparatus. Translator notes documenting every significant decision. Key terms with Hebrew, transliteration, semantic range, and notes. Expanded rendering for theologically rich terms. This layer is always available but never forced on the reader.

This two-layer model is what allows TCR to serve both casual readers (Bible study apps, devotional reading) and serious students (seminaries, academic research, commentary writing).

### Core Translation Principles

1. **Translate from the source text, not from the KJV or any other English version.**
2. **Formal equivalence as baseline** — word-for-word where English allows; clarity over woodenness.
3. **Preserve ambiguity** — if the Hebrew is genuinely ambiguous, do not resolve it. Render the ambiguity and document it in `translator_notes`.
4. **Modernize vocabulary, not theology** — "behold," "lo," "hath," "unto" all have modern equivalents. Theological meaning is never softened or updated.
5. **Handle Hebrew narrative markers naturally** — `וַיְהִי` (vayyehi) is rendered contextually ("then," "some time later," "after this"), not as mechanical "and it was."
6. **Render Hebrew idioms meaningfully** — "He knew his wife" → "He slept with his wife" — but document the original idiom in `translator_notes`.
7. **Preserve key theological terms**: `LORD` (small caps) for YHWH, `God` for Elohim in reference to the God of Israel, `covenant` for berit, `atonement` for kippur, `righteousness` for tsedaqah, `glory` for kavod, `salvation` for yeshuah.
8. **Distinguish between sin, transgression, and iniquity**: חַטָּאת (sin/missing the mark), פֶּשַׁע (transgression/rebellion), עָוֹן (iniquity/guilt) — preserve the distinctions.
9. **Weights and measures** — render in original units (cubits, shekels) with a translator note giving the modern metric/imperial equivalent.

---

## 4. Theologically Rich Terms Register

These Hebrew terms require expanded treatment when they appear in a theologically significant context. They are too rich, too layered, and too covenantally loaded to reduce to a single English word without loss. When these terms appear in a significant verse, the verse should include both a `key_terms` entry and an `expanded_rendering`.

---

### חֶסֶד (chesed)

**Standard rendering:** "faithful love" or "steadfast love" (context-dependent)

**What it actually means:** A covenantal love and loyalty between bound parties — God's unwavering commitment to those who have entered a covenant with Him, and their reciprocal devotion to Him. It encompasses love, mercy, faithfulness, kindness, and loyalty, but only within the framework of a covenant relationship. It is not generic love — it is *bound* love.

**What to avoid:** Never render as only "mercy" or only "kindness" — these lose the covenantal dimension. The KJV's "lovingkindness" captures warmth but misses the binding obligation.

**When to use expanded treatment:** Whenever chesed appears in a covenantally significant context (Psalms, Hosea, Ruth, Exodus 34).

---

### בְּרִית (berit)

**Standard rendering:** "covenant"

**What it actually means:** A solemn, binding agreement between two parties — not a contract that can be broken by mutual consent, but a sacred bond sealed by oath, often involving sacrifice. The Hebrew root may relate to "cutting" — as in "cutting a covenant" (כָּרַת בְּרִית), referencing the ancient practice of cutting animals in two and passing between the halves (cf. Genesis 15). A berit creates a new relationship with permanent obligations and permanent promises.

**When to use expanded treatment:** When berit appears in a covenant-making or covenant-renewal context (Genesis 15, 17; Exodus 19–24; Deuteronomy).

---

### כִּפֶּר (kippur) / כַּפֹּרֶת (kapporet)

**Standard rendering:** "atone" / "mercy seat" or "atonement cover"

**What it actually means:** To cover, to ransom, to make reconciliation. The root carries the sense of covering over sin or guilt so that it is no longer visible before God — not erasing it, but covering it through a substitutionary act. The kapporet (mercy seat / atonement cover) on the Ark of the Covenant was the place where this covering was enacted annually on Yom Kippur.

**When to use expanded treatment:** Leviticus, the Ark passages, Yom Kippur references.

---

### קָדוֹשׁ (qadosh)

**Standard rendering:** "holy"

**What it actually means:** Set apart, separated, consecrated — fundamentally about *distinction* and dedication to God. Holiness in Hebrew is not primarily a moral quality (though it includes that) but a *status* of being set apart from the common for God's purposes. When God is called qadosh, it means He is utterly distinct from everything else that exists. The trishagion ("Holy, holy, holy" in Isaiah 6) is the most intensive form of this distinction.

**When to use expanded treatment:** Theophanies, holiness codes (Leviticus 17–26), prophetic visions.

---

### תְּשׁוּבָה (teshuvah)

**Standard rendering:** "repentance" or "return"

**What it actually means:** A turning back — a return to God. The Hebrew concept of repentance is fundamentally spatial: it is about *returning* to a relationship, turning around and going back to where you belong. It is not primarily about guilt or punishment but about homecoming. The prodigal son narrative in Luke is a perfect Greek expression of the Hebrew teshuvah concept.

**When to use expanded treatment:** The prophets (especially Hosea, Jeremiah, Isaiah), Deuteronomic call-to-return passages.

---

### גָּאַל (ga'al) / גֹּאֵל (go'el)

**Standard rendering:** "redeem" / "redeemer" (or "kinsman-redeemer")

**What it actually means:** To act as a kinsman who reclaims what was lost — to buy back a family member from slavery, to reclaim family land that was sold, to avenge a family member's blood, to marry a deceased brother's widow to preserve his name. The go'el is not a stranger who helps — he is *family* who is *obligated* by blood to rescue. When God is called Israel's Go'el, it means He considers Himself their closest kin, bound by family obligation to rescue them.

**When to use expanded treatment:** Ruth (central to the entire narrative), Isaiah 40–55 (God as Redeemer), Job 19:25.

---

### שָׁלוֹם (shalom)

**Standard rendering:** "peace"

**What it actually means:** Wholeness, completeness, well-being, harmony, flourishing — the state where everything is functioning as God intended. Shalom is not merely the absence of conflict but the *presence of fullness*. When a prophet speaks shalom over Israel, he is invoking a vision of total restoration — physical, relational, political, spiritual.

**When to use expanded treatment:** Prophetic announcements of restoration (Isaiah, Jeremiah, Ezekiel), priestly blessing (Numbers 6:24–26), covenant-of-peace texts.

---

### צֶדֶק / צְדָקָה (tsedeq / tsedaqah)

**Standard rendering:** "righteousness" / "justice"

**What it actually means:** Right relationship, right order, faithfulness to the obligations of a relationship. In Hebrew thought, righteousness is not abstract moral perfection — it is *relational faithfulness*. A righteous person is one who fulfills their obligations to God and to others. A righteous king governs justly. A righteous God keeps His promises. Tsedeq and tsedaqah overlap with justice and mercy in ways that do not map cleanly onto English moral categories.

**When to use expanded treatment:** The Psalms, Isaiah's servant songs, prophetic justice literature, Abraham's righteousness passages (Genesis 15:6).

---

### עוֹלָם (olam)

**Standard rendering:** "forever" / "everlasting" / "eternal"

**What it actually means:** A long duration whose limits are *hidden from view* — not necessarily "infinite" in the philosophical sense, but "beyond what can be seen." When God's covenant is called an olam covenant, it means its end cannot be seen — it stretches beyond the horizon of human perception. The concept is more about hiddenness and vastness than mathematical infinity.

**When to use expanded treatment:** Covenant-permanence contexts, eternal kingdom passages, "everlasting" promises.

---

### אֱמוּנָה (emunah)

**Standard rendering:** "faithfulness" or "faith" (context-dependent)

**What it actually means:** Firmness, steadfastness, covenantal loyalty expressed through action. From the root א.מ.ן ("to be firm"). Emunah is not mere belief or intellectual assent — it is *active, enduring, relational trust* between covenant partners. It encompasses covenantal loyalty (Psalm 89:24), active commitment (1 Chronicles 9:22), steadfast endurance (Exodus 17:12 — Moses' arms held up as emunah), relational trust (Psalm 33:4), and divine reliability (Deuteronomy 32:4).

When Habakkuk writes "the righteous shall live by his emunah" (2:4), he means covenantal fidelity lived out in action — not passive belief.

**What to avoid:** "Faith" loses the covenantal bond, the active commitment, and the steadfast endurance. "Faithfulness" is closer but can sound merely behavioral rather than relational.

**When to use expanded treatment:** Habakkuk 2:4 (critical — this verse grounds Paul's argument in Romans and Galatians), Psalm 89, any verse where the theological weight of living trust vs. intellectual assent matters.

---

### כָּבוֹד (kavod)

**Standard rendering:** "glory"

**What it actually means:** Weight, heaviness, substance, significance. From the root כ.ב.ד ("to be heavy"). When the Bible says God's kavod filled the temple, it means His weighty, tangible, overwhelming presence — not an abstract glow but a substance so real it had *mass*. When God says "no one can see my kavod and live," He means His full, unfiltered reality is too much for mortal beings to bear. When a person has kavod, they carry *weight* — authority, honor, significance. The opposite of kavod is "light" or "trivial" (qalal). To glorify God is to treat Him as *heavy* — as the weightiest reality in your life.

**What to avoid:** "Glory" in English has drifted toward brightness, sparkle, and visual splendor. Kavod is *heavier* than that — literally.

**When to use expanded treatment:** Theophanies (Exodus 33–34, Isaiah 6, Ezekiel 1), temple-filling passages, the incarnation prologue in John 1.

---

### שְׁכִינָה (Shekhinah) — Conceptual Note

The Shekhinah is not a word that appears directly in the biblical text, but the *concept* appears whenever God's dwelling presence fills the tabernacle or temple. The root is שׁ.כ.נ ("to dwell, to tabernacle"). Note the Shekhinah concept in `translator_notes` when the text describes God's glory filling a space — no `expanded_rendering` needed since the term itself does not appear in the verse.

---

## 5. Data Structure

### Chapter File Format

Each book is stored as individual JSON files per chapter. Naming convention: `chapter-01.json`, `chapter-02.json`, etc. (zero-padded to two digits).

```json
{
  "meta": {
    "project": "The Covenant Rendering",
    "version": "1.0.0",
    "book": "Genesis",
    "chapter": 1,
    "source_text": "Westminster Leningrad Codex (WLC)",
    "reference_text": "KJV",
    "model": "claude-opus-4-6",
    "generated_at": "2026-02-23T00:00:00Z",
    "prompt_version": "1.0",
    "license": "CC-BY-4.0"
  },
  "verses": [ /* array of Verse objects */ ]
}
```

### Verse Object — Full Schema

```json
{
  "verse": 1,
  "text_hebrew": "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃",
  "text_kjv": "In the beginning God created the heaven and the earth.",
  "rendering": "In the beginning, God created the heavens and the earth.",
  "translator_notes": [
    "String documenting a translation decision, lexical choice, or interpretive option.",
    "Each element is one complete note. Arrays can be empty but should not be for significant verses."
  ],
  "key_terms": [
    {
      "hebrew": "בָּרָא",
      "transliteration": "bara",
      "rendered_as": "created",
      "semantic_range": "to create, to shape, to bring into being",
      "note": "This verb is used exclusively with God as its subject in the Hebrew Bible. Only God 'bara.' It implies creation that is uniquely divine."
    }
  ],
  "expanded_rendering": "Optional. Plain English explanation of what a theologically rich term means for readers without Hebrew. See Section 4 for when to include this field.",
  "reading_level": "9th grade"
}
```

### Field Definitions

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `verse` | integer | Always | 1-indexed verse number |
| `text_hebrew` | string | Always | Full WLC Hebrew with vowel pointing and cantillation marks |
| `text_kjv` | string | Always | KJV text for reference comparison only |
| `rendering` | string | Always | The modern English translation — the reading layer |
| `translator_notes` | string[] | Always | Array of note strings. May be empty `[]` for simple verses, but should never be empty for verses with complex lexical or grammatical issues |
| `key_terms` | KeyTerm[] | Always (may be empty) | All significant Hebrew/Greek terms in the verse. Empty array `[]` if no notable terms |
| `expanded_rendering` | string | Optional | Include only when a theologically rich term (see Section 4) appears in a context where the English rendering loses essential meaning |
| `reading_level` | string | Optional | Flesch-Kincaid or subjective grade estimate (e.g., "9th grade") |

### KeyTerm Object — Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `hebrew` | string | Always | Hebrew (or Greek) term with pointing |
| `transliteration` | string | Always | Standard academic transliteration |
| `rendered_as` | string | Always | The English word used in the `rendering` field |
| `semantic_range` | string | Always | Brief comma-separated list of possible meanings |
| `note` | string | Always | Scholarly note on the term's usage, significance, and why it was rendered this way |

---

## 6. Current Content Status

### Completed

| Book | Chapters | Verses | Status |
|------|----------|--------|--------|
| Genesis | 50 | 1,534 | ✅ Complete |

### In Progress

None currently. Genesis is the only book generated.

### Planned (in order)

| Book | Chapters | Verses | Status |
|------|----------|--------|--------|
| Exodus | 40 | 1,213 | Planned |
| Leviticus | 27 | 859 | Planned |
| Numbers | 36 | 1,288 | Planned |
| Deuteronomy | 34 | 959 | Planned |
| *Full Old Testament* | 929 | ~23,000 | Long-term |
| *New Testament* | 260 | ~7,957 | Long-term (Greek source: SBLGNT) |

### File Locations

| Location | Contents |
|----------|----------|
| `/Users/aaronblonquist/The Covenant Rendering/genesis/` | Source JSON files (`chapter-01.json` through `chapter-50.json`) — master copies |
| `/Users/aaronblonquist/TCR/src/data/genesis/` | Build-time copies used by the Astro site (confirmed path — data loads from here at build time via `src/data/tcr.ts`) |
| `/Users/aaronblonquist/EVM/content/tcr/genesis/` | Copy used by the EVM pipeline for verse toggle feature |
| `/Users/aaronblonquist/The Covenant Rendering/prompts/covenant_rendering_prompt.md` | Master generation prompt (v1.0) |

**Important:** The authoritative source files live at `/Users/aaronblonquist/The Covenant Rendering/genesis/`. When generating new content, save there first, then copy to the site and EVM trees.

---

## 7. Tech Stack & Infrastructure

### Website

| Component | Choice | Notes |
|-----------|--------|-------|
| Framework | Astro (static) | Output: `static`. Same stack as EVM. |
| CSS | Tailwind CSS v4 | Via `@tailwindcss/vite` plugin |
| Verse font | Cormorant Garamond | Google Fonts — serif, scholarly feel |
| UI font | Inter | Google Fonts — clean sans-serif |
| Hebrew font | Noto Serif Hebrew | Google Fonts — full RTL support, vowel pointing renders correctly |
| Accent color | Deep teal `#1e6b5a` | Distinct from EVM's gold/parchment palette |
| Background | Warm cream `#fafaf8` | |

### VPS / Hosting

| Property | Value |
|----------|-------|
| Provider | VPS at 209.74.80.143 |
| SSH access | `ssh root@209.74.80.143` |
| Web server | Nginx 1.24.0 (Ubuntu) |
| Web root | `/var/www/tcr/` |
| Nginx config | `/etc/nginx/sites-available/thecovenantrendering.com` |
| SSL | Let's Encrypt via certbot. Expires 2026-05-25. Auto-renews. |
| Domain registrar | Namecheap |
| DNS | A records → 209.74.80.143 (both `thecovenantrendering.com` and `www`) |

This is the same VPS as EveryVerseMatters.com. Other sites on this server include emree.io, chat.emree.ai, and the EVM site at `/var/www/evm/`.

### Deployment

```bash
# From ~/TCR — builds and deploys in one command
./deploy.sh

# Manually:
npm run build
rsync -avz --delete dist/ root@209.74.80.143:/var/www/tcr/
```

The site builds in ~520ms and deploys 110+ files via rsync. Zero downtime.

### Local Development

```bash
cd ~/TCR
npm run dev     # http://localhost:4321
npm run build   # builds to dist/
```

---

## 8. Site Structure

All pages are statically generated at build time from the JSON source data. No server-side rendering. No database. No API.

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/pages/index.astro` | Homepage: hero, live Genesis 1:1–2 example (Hebrew + rendering + key terms), problem/solution pitch, design principles, current status CTA |
| `/genesis` | `src/pages/genesis/index.astro` | Chapter grid — all 50 chapters with verse counts and first-verse previews |
| `/genesis/[n]` | `src/pages/genesis/[chapter].astro` | Full verse-by-verse chapter display. Each verse shows Hebrew, rendering, KJV comparison, and a collapsible "Notes & Key Terms" panel with translator notes and key term cards |
| `/about` | `src/pages/about.astro` | Full methodology, source text notes, AI generation disclosure, CC-BY-4.0 license details, translation philosophy, and roadmap |

### Key Components

| Component | File | Purpose |
|-----------|------|---------|
| Layout | `src/layouts/Layout.astro` | Base HTML, fonts, nav, footer, SEO meta |
| VerseCard | `src/components/VerseCard.astro` | Single verse display — Hebrew, rendering, KJV, collapsible notes |
| Data utility | `src/data/tcr.ts` | `loadChapter(n)`, `getAllChapterNums()`, TypeScript types for Verse, KeyTerm, Chapter |

---

## 9. GitHub Repositories

| Repo | URL | Contents |
|------|-----|----------|
| The Covenant Rendering (data) | https://github.com/bashonda2/the-covenant-rendering | Translation JSON data, generation prompt, methodology |
| EveryVerseMatters (sister project) | https://github.com/bashonda2/every-verse-matters | EVM site source — uses TCR data |
| TCR Website | https://github.com/bashonda2/tcr-site | Astro site source (`~/TCR`) |

---

## 10. Relationship to EVM

**EveryVerseMatters.com** (EVM) is an LDS Come, Follow Me study platform — a distinct, denominationally affiliated project. TCR is completely separate and ecumenical.

The relationship between the two:

1. **EVM uses TCR data.** The EVM verse display includes a KJV/TCR toggle, allowing LDS readers to compare the traditional KJV with TCR's modern rendering. TCR content for the current EVM study weeks is copied to `/Users/aaronblonquist/EVM/content/tcr/genesis/`.

2. **EVM's AI commentary pipeline uses TCR as context.** When EVM generates weekly commentary, TCR translator notes and key terms are fed into the context window to inform the commentary's Hebrew word studies.

3. **Cross-linking.** The two sites cross-link: EVM links to TCR for fuller study context; TCR's homepage will eventually surface EVM as an example of a project built on TCR.

4. **Independence at scale.** When TCR expands beyond Genesis, it will stand fully independent of EVM. The ecumenical mission of TCR is distinct from EVM's LDS focus. Do not blur this distinction in any TCR-facing content. TCR is for everyone.

---

## 11. Generation Workflow

### Master Prompt Location

```
/Users/aaronblonquist/The Covenant Rendering/prompts/covenant_rendering_prompt.md
```

This is the v1.0 prompt. It contains the full system instructions: translation philosophy, source text handling, theologically rich terms register, Hebrew idiom handling, narrative marker conventions, and chapter generation instructions. **Always use this prompt in full** when generating new chapters.

### The v1.1 Addendum — Not Yet Written as a File

During the TCR project's development, a set of methodological refinements emerged that deepen the v1.0 prompt. These principles are reflected in this SOT (particularly Section 4) but have not yet been formalized as a standalone `covenant_rendering_prompt_v1.1.md` file.

**The addendum should capture:**

1. **The two-layer reading/study model** — the clean `rendering` field is the reading layer; `translator_notes`, `key_terms`, and `expanded_rendering` are the study layer. The reading layer must stand alone without the study layer. This principle governs which decisions belong in the rendering vs. in notes.

2. **The expanded rendering methodology** — `expanded_rendering` is not commentary or devotional reflection. It is specifically what a Hebrew reader would naturally understand that an English reader misses. It bridges the English rendering and the Hebrew original without adding theological interpretation.

3. **The President Nelson model for chesed** — The teaching that *hesed* represents a covenantal love that cannot be captured by any single English word is the paradigmatic example of how TCR handles theologically rich terms. When uncertain whether a term warrants expanded treatment, ask: would a Hebrew reader know something about this word that an English reader cannot infer from the rendering alone?

**Action required:** Before generating Exodus, write `covenant_rendering_prompt_v1.1.md` incorporating these principles alongside the v1.0 content. Save it to `/Users/aaronblonquist/The Covenant Rendering/prompts/`. Update this SOT when done.

### Model

Use **`claude-opus`** quality class (the highest available). Do not use Haiku or Sonnet for generation — quality of translator notes, key term analysis, and Hebrew scholarship degrades significantly at lower capability tiers. TCR's value is in the depth of the study layer; skimping on the model undermines the entire project.

### How to Generate a New Book

1. **Prepare.** Have the master prompt at hand. Know the book name and chapter count.

2. **Generate chapter by chapter.** For each chapter:
   ```
   [Paste full prompt as context]
   Generate The Covenant Rendering for [Book] Chapter [N]
   ```

3. **Validate.** Confirm the output is valid JSON. Check that:
   - Every verse is present (no gaps)
   - `text_hebrew` has vowel pointing
   - `translator_notes` is populated for complex verses (not empty on straightforward ones either)
   - `key_terms` is populated for any significant Hebrew term
   - `expanded_rendering` is included wherever a theologically rich term from Section 4 appears in a significant context
   - `meta.model` records the actual model used

4. **Save.**
   - **Primary:** `/Users/aaronblonquist/The Covenant Rendering/[book]/chapter-NN.json`
   - **Site:** Copy to `/Users/aaronblonquist/TCR/src/data/[book]/chapter-NN.json`
   - **EVM:** Copy to `/Users/aaronblonquist/EVM/content/tcr/[book]/chapter-NN.json`

5. **Update the Astro site.** If adding a new book:
   - Update `src/data/tcr.ts` to include the new book's chapter count
   - Add a new browse page at `src/pages/[book]/index.astro`
   - Add a new chapter page at `src/pages/[book]/[chapter].astro`
   - Add the book to the navigation and footer

6. **Build and deploy.**
   ```bash
   cd ~/TCR
   ./deploy.sh
   ```

### Naming Convention

- Files: `chapter-01.json` (zero-padded to 2 digits)
- Directories: lowercase book names (`genesis`, `exodus`, `leviticus`, etc.)
- New Testament books: same convention (`matthew`, `mark`, `luke`, etc.)

---

## 12. Roadmap

### Phase 1 — Complete ✅
- Genesis fully translated (50 chapters, 1,534 verses)
- thecovenantrendering.com launched
- SSL, Nginx, deploy pipeline operational
- EVM integration live (verse toggle feature)

### Phase 2 — Next
- Generate Exodus (40 chapters, 1,213 verses)
- Add `/exodus` and `/exodus/[n]` pages to the site
- Update Genesis/Exodus chapter index page

### Phase 3
- Complete the Pentateuch: Leviticus, Numbers, Deuteronomy
- Site-wide book navigation

### Phase 4
- Full Old Testament
- Site search (full-text search across all verses)
- Individual verse permalinks (`/genesis/1/1`)

### Phase 5
- New Testament (Greek source: SBLGNT)
- NT-specific terms register (pistis, agape, logos, soteria, etc.)

### Long-Term Vision
- thecovenantrendering.com as the definitive free scholarly Bible resource
- PDF/print edition (CC-BY-4.0)
- API endpoint for developers
- Verse embed widget (for third-party sites)
- Multiple English rendering tiers (e.g., formal equiv. + dynamic equiv. variants)

---

## 13. Open Questions / Decisions Pending

### Prompt v1.1 Addendum

The two-layer model, expanded rendering methodology, and President Nelson chesed paradigm are documented in this SOT (Section 4 and Section 11) but have not been written as a formal prompt file. Write `covenant_rendering_prompt_v1.1.md` before generating Exodus. See Section 11 for what it must contain.

### Email

`aaron@thecovenantrendering.com` — DNS domain is on Namecheap. Email forwarding not yet configured. Needs either Namecheap email forwarding setup or a transactional email provider (Postmark, Resend, etc.) for a contact form.

### Site Search

No search on the site yet. Appropriate when content expands beyond Genesis. Options to evaluate when ready: Pagefind (static, zero-cost, Astro-native), Algolia DocSearch (free for open source), or server-side search via the VPS.

### PDF / Print Edition

A CC-BY-4.0 print edition of Genesis has been discussed but not built. Format decision pending (LaTeX, Typst, or Pandoc pipeline). Should include all translator notes and key terms in a two-column study Bible format.

### Verse Permalinks

Individual verse URLs (`/genesis/1/1`) are not yet built. Valuable for SEO, sharing, and linking from EVM. Would generate ~1,534 additional static pages for Genesis alone. Low build-time cost; implement when content warrants it.

### NT Source Text Finalization

SBLGNT is the planned source for the New Testament. Confirm before beginning Matthew whether to use SBLGNT or NA28 (Nestle-Aland 28th edition). Both are suitable critical texts; SBLGNT is more freely available.

### Denominational Content Boundaries

When TCR reaches books with heavy theological freight (Leviticus, Deuteronomy, the Psalms, the prophets), maintain the ecumenical discipline established in Genesis. Do not let EVM's LDS context bleed into TCR translation decisions. If a translation decision is informed by denominational tradition, document it in `translator_notes` and present alternatives.

---

*This document is the source of truth for The Covenant Rendering. Update it whenever the project state changes in a material way: new books generated, infrastructure changes, design decisions, or roadmap updates.*

*"For the word of God is living and active, sharper than any two-edged sword." — Hebrews 4:12*
