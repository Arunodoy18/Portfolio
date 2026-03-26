# FULL SEO AUDIT REPORT

Date: 2026-03-27
Project: aruno.buildc3.tech (Next.js App Router, static export)
Audit Mode: Local codebase audit (file-level), based on seo-audit SKILL scoring framework and weights.

## Executive Summary

Overall SEO Health Score: **76 / 100**
Business Type Detected: **Personal developer portfolio**

This codebase has solid foundational SEO implementation (metadata, canonical, robots/sitemap routes, Person JSON-LD, and crawler fallback text). However, the current architecture is still heavily single-route and canvas-driven, which limits indexable depth and AI citability unless additional crawlable pages and structured entities are introduced.

## Scoring Breakdown

Scoring source weights from SKILL.md:
- Technical SEO: 22%
- Content Quality: 23%
- AI Search Readiness: 10%
- E-E-A-T: evaluated as a deep-dive quality modifier within content and authority signals

### Category Scores

- Technical SEO: **82 / 100**
- Content Quality: **78 / 100**
- E-E-A-T: **74 / 100**
- AI Search Readiness (GEO): **70 / 100**

### Overall Score Method

Base weighted score from strict weighted categories available in this local audit:
- Technical + Content + AI (normalized) => **78.1**

E-E-A-T modifier (trust, authority, verifiability, citation quality):
- Modifier: **-2.1**

Final overall SEO Health Score: **76 / 100**

## Top Critical Issues To Fix Right Now

1. **Only one indexable page exists (`src/app/page.tsx`)**
- Severity: Critical
- Why it matters: Search engines and AI systems have limited URL-level context. Profile, projects, open-source work, and contact information are not represented as distinct crawlable pages.
- Fix now: Add real routes such as `/about`, `/projects`, `/open-source`, `/contact` with unique metadata, headings, and schema per page.

2. **No `llms.txt` for AI crawler guidance**
- Severity: Critical
- Why it matters: GEO systems (AI answer engines) benefit from explicit machine-readable discovery and policy hints.
- Fix now: Add `public/llms.txt` describing site purpose, canonical URL, authoritative profile links, and preferred citation pages.

3. **Authority data is limited to one schema type (`Person`)**
- Severity: Critical
- Why it matters: AI engines and rich search contexts perform better with entity graph depth.
- Fix now: Add `WebSite` schema at root and page-level schema (for example `ProfilePage`, `CreativeWork`/project entities), linking back to the same `Person` entity via `@id`.

4. **Hidden fallback text is useful but over-relied on**
- Severity: Critical
- Why it matters: A canvas-first UX with most narrative in `sr-only` can weaken trust signals if visible and crawlable narratives diverge.
- Fix now: Add visible semantic HTML summaries (not only hidden text) on key pages, especially project proof sections with dates, outcomes, and links.

5. **Social preview image strategy is weak for distribution channels**
- Severity: Critical
- Why it matters: Current metadata uses `/window.svg`; many platforms index best with a dedicated 1200x630 JPG/PNG OG image.
- Fix now: Add a branded static Open Graph image (PNG/JPG), then update Open Graph and Twitter image URLs to that asset.

## Technical SEO Findings

### What is implemented well
- `metadataBase` configured in root layout (`src/app/layout.tsx`)
- Canonical configured (`alternates.canonical`)
- Open Graph and Twitter metadata present
- Static metadata routes created for robots and sitemap:
  - `src/app/robots.ts`
  - `src/app/sitemap.ts`
- Static export compatibility added (`dynamic = "force-static"`)

### Gaps
- Single-page crawl topology (only one page route under `src/app`)
- Robots/sitemap quality is currently minimal (only homepage in sitemap)

## Content Quality Findings

### Strengths
- Main page includes structured semantic fallback with headings, paragraphs, and lists
- Content includes role clarity, skill clusters, and intent (GSoC 2026)

### Gaps
- Most primary UX remains non-semantic/canvas-first and state-driven
- Limited project-level textual depth as independently indexable documents

## E-E-A-T Findings

### Strengths
- Clear named identity in metadata and JSON-LD (`Arunodoy Banerjee`)
- `sameAs` links to GitHub and LinkedIn in `Person` schema

### Gaps
- Limited proof-of-work structure in indexable route pages
- Missing explicit experience evidence blocks (project outcomes, timeline, metrics)
- No dedicated trust/contact/about pages as first-class crawlable URLs

## AI Search Readiness (GEO) Findings

### Strengths
- Person JSON-LD exists
- Semantic fallback content exists for crawler readability
- Explicit social profile links are present

### Gaps
- No `llms.txt`
- No multi-entity schema graph (`WebSite`, `ProfilePage`, `CreativeWork`/projects)
- Citation targets are weak because only one crawlable page exists

## Immediate Action Plan (7-Day)

1. Create route pages: `/about`, `/projects`, `/open-source`, `/contact`.
2. Add route-specific metadata for each page (title, description, canonical, OG/Twitter).
3. Add `public/llms.txt` with citation-friendly guidance.
4. Expand schema graph:
- Root: `WebSite` + `Person`
- About: `ProfilePage`
- Projects: `CreativeWork` or `SoftwareSourceCode` entries with links
5. Replace OG image with `public/og/arunodoy-portfolio-1200x630.png` and update metadata.
6. Keep `sr-only` fallback, but also add visible semantic summaries on each key page.

## Evidence Snapshot (Files Reviewed)

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/components/GameShell.tsx`
- `src/components/screens/LobbyScreen.tsx`
- `src/components/screens/MainMenu.tsx`
- `next.config.ts`
- `netlify.toml`

## Final Verdict

Your codebase has moved from a fragile SEO baseline to a strong foundation. The remaining gap to a 90+ score is mainly **indexable information architecture** and **AI-citation structure depth**, not basic meta tags.
