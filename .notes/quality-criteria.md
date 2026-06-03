# Internet Object Spec — Quality Assurance Criteria

**Status: FINALIZED — self-reviewed against best practice; in use to drive the QA tracker.**
(11 dimensions D1–D11, page-kind flexing, 5-perspective review, style-canon anchor.)
Purpose: define what "A+ grade" means for the Internet Object specification so every page can
be reviewed consistently and marked *quality-verified*. After approval this rubric drives the
QA tracking document (`.notes/quality-tracker.md`).

> Author feedback incorporated: D1–D10 approved; added **D11 — Depth & Explanation** (a
> MUST-level gate) to ensure every page carries *sufficient, properly explained detail in a
> professional manner*. This directly targets the observed failure mode where recent pages were
> correct and complete-in-coverage but thin and under-explained.

---

## 0. Page kinds (criteria flex by kind)

A single bar is wrong for a spec that mixes references, tutorials, and appendices. Each page is
classified, and some checks apply only to certain kinds:

| Kind | Examples | Emphasis |
|------|----------|----------|
| **Type reference** | data-types/* | TypeDef table, valid+invalid examples, resolution rules |
| **Syntax/structure** | the-structure/* | precise forms, lexical detail, examples |
| **Conceptual** | core-concepts/*, why-IO, getting-started | motivation, clarity, flow |
| **Normative/process** | conformance/*, parsing-and-errors/* | MUST/SHOULD/MAY, behavior |
| **Reference appendix** | grammar, glossary | precision, completeness, no prose bloat |
| **Index/overview** | README of a group | orientation + correct links |

---

## 1. Quality dimensions (the rubric)

Each check is **[M]** MUST (required for any publish) or **[S]** SHOULD (required for A+).

### D1 — Correctness & Verification
- [M] Every factual claim matches the reference implementation (or is explicitly flagged as
  in-progress with an *Implementation status* note).
- [M] Every runnable example passes `tools/check-examples.ts`.
- [M] No stale/contradicted syntax (e.g. `maxLength`, `items`, bare `$ref`, `0c`, `@"…"`).
- [S] Invalid examples assert the real error code (`# ✗ <code>`).

### D2 — Normativity & Precision
- [M] Behavior is unambiguous; no "by convention / maybe / in a future version" hand-waving.
- [S] (normative pages) Uses MUST/SHOULD/MAY per RFC 2119 where duties are stated.
- [S] States defaults, precedence, and edge-case behavior explicitly.
- [S] Normative requirements are distinguishable from informative material — examples, notes,
  and rationale read as non-normative; binding rules read as requirements.

### D3 — Completeness (topic coverage)
- [M] Covers the page's whole topic surface — no silent gaps (all options/forms/markers).
- [S] Covers optional/nullable/default resolution, edge cases, and error conditions for the topic.
- [S] Any deliberate omission/limitation is stated, not left implicit.

### D4 — Examples Quality
- [M] Examples are correct, minimal, and idiomatic; non-self-contained ones are `io:test skip`.
- [S] Shows valid AND invalid where the topic has failure modes.
- [S] Examples are realistic (plausible field names/values), not `foo/bar` noise.

### D5 — Clarity & Readability
- [M] Single, clear H1; logical section order; scannable (headings, tables, short paragraphs).
- [S] Defines terms on first use or links to the glossary; plain, direct language.
- [S] Opens with a one/two-sentence "what this is" before details.

### D6 — Consistency (one voice, one vocabulary, one shape across all pages)
*Every page must read as if written by one author. Consistency is checked against the single
house-style canon recorded in `.notes/style-canon.md` (see §7); that file is the reference, so
"same across all pages" is concrete, not subjective.*
- [M] **Nomenclature.** Terminology matches the canon exactly and is used identically on every
  page (TypeDef / MemberDef / SchemaDef; ref; `@` variable; record; section; …). No synonyms
  for canonical terms (e.g. not "field def" for MemberDef, not "object schema" for SchemaDef).
- [M] **Writing style & voice.** Same register across pages: present tense, active voice;
  reader addressed consistently (instructional "you" in guidance/tutorial pages, neutral
  third-person for normative duties — "a parser MUST…"); same convention for RFC 2119 keywords.
- [M] **Heading design.** Single H1 in Title Case matching the nav label; section headings
  (H2/H3) in **sentence case** — except established proper-noun labels (`TypeDef`, `MemberDef`,
  `SchemaDef`) and the fixed standard sections, which keep their canonical spelling ("TypeDef",
  "Constraints", "Examples", "Implementation status (beta)", "See Also"); correct, gap-free
  H-level hierarchy; standard sections spelled and ordered identically across pages.
- [M] **Markup.** Code fences use `ruby`; callouts use `>` blockquotes; tables, lists, and
  emphasis styled uniformly per the canon.
- [S] **Flow.** Section order follows the page-kind template (e.g. type pages: intro →
  family/contents → TypeDef → constraints → resolution → status → See Also), so pages of the
  same kind progress in the same order.

### D7 — Structure, Navigation & Links
- [M] Listed in `SUMMARY.md`; has front-matter `description`.
- [M] All internal links resolve (relative `.md`); a "See Also" with relevant cross-links.
- [S] Links to the canonical source for shared concepts instead of duplicating them.

### D8 — Rendering & GitBook Compatibility
- [M] No broken links; no token-bearing/expiring external images; markdownlint-clean.
- [S] Uses GitBook-safe constructs; images self-hosted in `.gitbook/assets`.
- [S] Accessible rendering: images carry descriptive alt text; link text is descriptive (never
  "here"/"click here"); tables use a header row.

### D9 — Audience Fit & Framing
- [M] Language-agnostic in normative text (no JS API names as the contract).
- [S] Serves both implementers and format users; motivates "why" where useful; dos/don'ts where relevant.

### D10 — Honesty & Maintainability
- [M] No overclaiming; in-flight behaviors carry an *Implementation status* note.
- [M] Error codes referenced are described as stable identifiers (branch on code, not message).
- [S] Self-contained and drift-resistant (reuses canon; no contradiction with sibling pages).

### D11 — Depth & Explanation (sufficient detail, professionally explained)
*Distinct from D3 (breadth of coverage) and D5 (readability): this measures whether what is
covered is actually **explained** — with enough substance that a reader understands and can
apply it without reading the source code or guessing.*
- [M] Every concept, option, rule, and marker the page introduces is **explained** — what it
  is, how it behaves, and when/why it is used — not merely named, listed, or tabulated.
- [M] No thin or skeletal pages: the page provides enough detail for its audience to fully
  understand and apply the topic. A bare table, a stub paragraph, or a list without
  accompanying explanation does **not** meet the bar.
- [M] Professional, authoritative register: complete sentences, well-formed paragraphs, no
  filler, no telegraphic notes standing in for prose.
- [S] Explains the **why and the mechanics** behind behavior (rationale for a constraint, how
  resolution/precedence proceeds, what happens at the edges) — not only the *what*.
- [S] Tables and lists are introduced and interpreted by prose; non-obvious entries carry
  explanatory notes or a short example.
- [S] Depth is **calibrated to page kind** (see §0): conceptual, type-reference, and normative
  pages are fully developed; reference appendices (grammar, glossary) stay precise and terse —
  for them, *completeness and precision* are the depth measure, and prose bloat is a defect,
  not a virtue.

---

## 2. Multi-perspective review (each page reviewed through every lens)

- **Newcomer** — can a first-time reader follow it without prior context, and is enough
  explained that they actually understand it (not just see it listed)?
- **Implementer** — could someone build a conformant parser/validator *for this topic* from
  this page alone, without falling back to the source code to fill gaps?
- **Adversary/skeptic** — is every claim true and verified? edge cases? overclaims? counter-examples?
- **Editor** — terminology, consistency, concision, grammar, scannability.
- **Maintainer** — will it drift? links valid? duplication vs canon?

A page is reviewed from all five before it can be marked verified.

---

## 3. Grading scale

- **A+** — all [M] AND all [S] for the page's kind; passes all five perspectives.
- **A**  — all [M]; ≥80% of [S]; no perspective shows a real problem.
- **B**  — all [M]; notable [S] gaps.
- **C / Not ready** — any [M] failing (not publishable). *Note: a thin or under-explained page
  fails D11[M] and is therefore C / Not ready, even if it is accurate (D1) and complete in
  coverage (D3).*

**Definition of Done (quality-verified):** grade is **A+**, verifier green, all five
perspectives pass, and tracker row filled with grade + reviewer notes.

---

## 4. QA tracking document (design)

`.notes/quality-tracker.md` — one row per ToC page:

| Column | Meaning |
|--------|---------|
| Page | path |
| Kind | from §0 |
| D1…D11 | ✓ / gaps / ✗ per dimension |
| Perspectives | which lenses passed |
| Grade | A+/A/B/C |
| Status | Draft / Reviewed / **Verified** |
| Notes | issues found / fixes / deferrals |

Pages are processed in ToC order; the tracker is the single source of truth for QA state.

---

## 5. Self-assessment — are these criteria suitable? (required before approval)

**Why these fit a normative, language-agnostic format spec that doubles as docs:**
- They pair **correctness/verification** (D1) with **normativity** (D2) — the two things a
  *spec* needs beyond ordinary docs — and keep **audience/clarity** (D5, D9) because it also
  serves as documentation.
- **Page-kind flexing** (§0) prevents the rubric from forcing tutorial criteria onto a grammar
  appendix or vice-versa — a common failure of one-size rubrics.
- **Verification is a hard MUST** (D1) and is *mechanically checkable* via the existing tool,
  so "A+" is not subjective for examples.
- **Multi-perspective review** (§2) catches what a checklist alone misses (e.g. a technically
  correct page a newcomer can't follow).
- **Honesty/status** (D10) suits a public beta where spec and impl are still converging.
- **Depth/explanation** (D11) is a hard MUST so a page cannot pass by being merely accurate and
  complete-in-coverage while remaining thin — the specific weakness observed in recent drafts.
  It is deliberately separated from D3 (breadth) and D5 (readability) so each can fail
  independently and be tracked.

**Deliberate exclusions / tradeoffs:**
- No prose-length or reading-grade *score* targets — judged qualitatively under D5 to avoid
  gaming.
- Performance/security review is **out of scope per page** (those are planned as their own
  later sections), not a per-page gate.
- SEO/marketing concerns are excluded — this is a spec.

**Known tension:** during the draft period some pages document *target* behavior ahead of the
implementation. D1 + D10 handle this via explicit *Implementation status* notes rather than
blocking the page — appropriate for a draft, to revisit when SoT flips to the spec.

**Best-practice cross-check (self-review).** The rubric was checked against IETF/RFC practice
(RFC 2119/8174; normative-vs-informative; conformance; EBNF grammar; security considerations),
W3C TR guidelines (conformance, maturity/at-risk marking, test suite, accessibility), ISO/IEC
Directives Part 2 (terms & definitions, terminology consistency), the Diátaxis documentation
model (mode separation), Google/Microsoft developer style guides (tense/voice/person,
descriptive links, scannability), and docs-as-code tested-sample practice. Result: strong
alignment, with the verified-examples gate and MUST/SHOULD severity model meeting or exceeding
typical spec practice. Two gaps were found and closed: **D2** now asks for a normative-vs-
informative distinction, and **D8** now asks for accessible rendering (alt text, descriptive
link text, table headers). Security/privacy considerations remain a *deliberately deferred*
dedicated normative section (not a per-page gate), honestly flagged below.

**Conclusion:** suitable for this artifact and consistent with recognized spec/documentation
best practice. Proceeding to apply it. Open questions for the author remain in §6.

---

## 6. For author verification
1. D1–D10 approved. **D11 — Depth & Explanation** added per author feedback — confirm the
   wording captures the intent (sufficient detail, properly explained, professional tone), or
   adjust.
2. **D6 strengthened** per author feedback to make cross-page consistency explicit and
   MUST-level: nomenclature, writing style/voice, heading design, markup, and flow — all
   checked against a single house-style canon (§7). Confirm this matches the intent.
3. Approve the A+ definition (all MUST + all SHOULD + 5 perspectives) — or relax/tighten?
4. Approve page-kind flexing (§0) and the deferral of perf/security to dedicated sections?
5. Approve the tracker design (§4) and the plan to write the style canon (§7) first?
6. Any other dimension to add before this rubric is locked and drives the tracker?

---

## 7. Style canon (the consistency reference) — to be written first

D6 needs something concrete to check "same across all pages" against. Before the page-by-page
review begins, I will distil a single **`.notes/style-canon.md`** from the existing strong
pages and the conventions already chosen (ruby fences, `>` blockquote callouts, the two type-
page templates). It records the *house style* every page must conform to:

| Area | Canon to record |
|------|-----------------|
| **Voice & tense** | present tense, active voice; "you" for guidance, third-person for normative duties |
| **RFC 2119** | when and how MUST/SHOULD/MAY are used and styled |
| **Nomenclature** | the canonical term list + banned synonyms (TypeDef, MemberDef, SchemaDef, ref, record, section, variable, …) |
| **Headings** | H1 Title Case (= nav label); H2/H3 sentence case except proper-noun/fixed labels; hierarchy rules; the fixed set/spelling/order of standard sections (intro lead, "Implementation status (beta)", "See Also") |
| **Markup** | `ruby` fences, `>` callouts, table style, link style (relative `.md`), front-matter `description` |
| **Page templates** | section order per page kind (§0) |
| **Examples** | naming/realism conventions, valid+invalid pairing, `io:test skip` rule |

This is a derivation/extraction task, not a new invention — it captures what the best current
pages already do so the rest can be brought into line. It becomes the objective reference the
tracker cites when scoring D6.
