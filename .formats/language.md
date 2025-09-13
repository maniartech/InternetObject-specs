# Internet Object Language Style Specification

Status: Normative (Style and Editorial Guidance)
Version: 1.0.0
Last Updated: 2025-09-13

This document defines the language style and editorial conventions for the Internet Object specifications and accompanying technical documentation. It is intended for specification editors, contributors, and implementers who need a consistent, industry-standard way to write, review, and consume Internet Object materials.

The requirements in this document use RFC 2119/RFC 8174 terminology to indicate conformance strength. Unless otherwise noted, guidance marked as “SHOULD” is strongly recommended and may be required for specific deliverables by project policy.

## 1. Scope and audience

- Scope: Language, tone, and editorial conventions for:
	- Normative specifications (protocols, data models, schema language).
	- Non-normative technical documents (guides, tutorials, design notes).
- Audience: Spec editors, reviewers, and developers implementing or using Internet Object. This document does not define product behavior; it defines how we describe behavior.
- Out of scope: This guide does not govern document structure or build tooling. The following are defined in separate documents/policies: table of contents generation, section ordering and numbering, document templates, repository layout, front matter, and publication workflow.

## 2. Normative keywords

The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “NOT RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119 and RFC 8174 when, and only when, they appear in all capitals. Where used in non-normative guidance, they express editorial strength, not protocol requirements.

References:
- RFC 2119: Key words for use in RFCs to Indicate Requirement Levels
- RFC 8174: Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words

## 3. Voice, tone, and clarity

- Precision: Prefer clear, testable statements. Avoid ambiguity, colloquialisms, and idioms.
- Voice: Use active voice by default. Example: “The parser validates the value” rather than “The value is validated.”
- Person:
	- Specifications: neutral, third person. Example: “An implementation MUST …”
	- Guides and tutorials: second person is acceptable. Example: “You can configure …”
- Concision: Eliminate unnecessary words. Each sentence SHOULD convey a single idea.
- Inclusivity: Use inclusive, respectful language. Avoid ableist, gendered, or exclusionary terms.
- Consistency: Use the same term for the same concept. Define terms once and link to definitions.

## 4. Terminology and definitions

- Each specification MUST include a “Terminology” or “Definitions” section for domain terms that are essential to understanding conformance and behavior.
- When referencing external standards (e.g., JSON, URI, Unicode), capitalize and cite them once in References, then use the capitalized form consistently (e.g., “JSON Text”, “URI”).
- Avoid introducing synonyms for defined terms. If a synonym is common, note it parenthetically at first use.

## 5. Normative vs non-normative content

- Mark non-normative sections as “Non-normative” or “Informative”.
- Examples and rationale are non-normative unless explicitly stated.
- Testable requirements MUST be stated normatively and be traceable from a Conformance section.

## 6. Grammar, capitalization, and punctuation

- Capitalization:
	- Proper nouns, standards, and defined terms are capitalized at first reference and consistently thereafter (e.g., “Internet Object”, “JSON”, “URI”).
	- Use sentence case for headings (capitalize first word and proper nouns only), unless existing series uses title case consistently.
	- Do not capitalize common nouns mid-sentence unless they are defined terms.
- Numbers and units:
	- Use SI units with a space between the number and unit (e.g., “10 ms”, “64 KiB”). Use binary prefixes (KiB, MiB) for powers of two.
	- Use a leading zero before a decimal point (e.g., “0.5”).
- Dates and times:
	- Use ISO 8601 for dates and times (e.g., 2025-09-13). Use UTC (“Z”) where possible.
- Lists:
	- Use parallel structure. Keep list items grammatically consistent.
- Punctuation:
	- Use the serial (Oxford) comma in lists of three or more items.
	- Prefer em dashes without surrounding spaces for breaks in thought—sparingly.
	- Periods go inside quotes only if the period is part of the quoted material.

## 7. Code, data, and pseudo-grammar conventions

- Code blocks:
	- Use fenced code blocks with a language tag where applicable (e.g., `json`, `yaml`, `typescript`, `bash`).
	- For Internet Object examples, use the most appropriate tag (e.g., `json` if JSON-like) or `io` if a dedicated highlighter exists.
	- Keep lines ≤ 100 characters where practical.
	- Include comments sparingly; prefer explanatory text near the example.
- Placeholders and metavariables:
	- Use `<placeholder>` for placeholders in syntax and `{var}` for named metavariables. Define them in accompanying text.
- Pseudocode and algorithms:
	- Present algorithms as ordered lists with imperative steps. Each step SHOULD be testable.
	- Use “If … then … else …” and “For each …” in plain, unambiguous language.
- Error examples:
	- When helpful, pair incorrect and corrected examples. Label with “Incorrect” and “Correct”.

## 8. Naming and casing

- Specification keywords (MUST/SHOULD/MAY) are uppercase.
- Identifiers in data models MUST follow the casing chosen by that specification:
	- If unspecified, prefer lowerCamelCase for JSON-like properties and kebab-case for CLI flags and file names.
	- Constants and symbolic flags MAY use SCREAMING_SNAKE_CASE.
	- Avoid mixing styles within a single surface unless required for compatibility.

## 9. Links, references, and citations

- Use relative links for intra-repo references; ensure stable anchors.
- Where a term first references an external standard, link that term and add a full citation in the References section.
- Maintain two reference lists:
	- Normative: documents required to implement the spec.
	- Informative: background and rationale.

## 10. Accessibility and internationalization

- Images MUST include alt text that conveys purpose. If decorative, use empty alt text.
- Tables MUST include header rows and, when helpful, scope attributes.
- Do not rely solely on color to convey meaning.
- Avoid culturally specific idioms. Prefer SI units and ISO standards for measurements and formats.
- For examples with natural language text, prefer English by default and avoid slang; localize only where the example requires it.

## 11. Security and privacy language

When discussing security or privacy:

- Be explicit about threats, impacts, and mitigations; avoid vague statements like “secure” or “safe”.
- Prefer normative phrasing for required mitigations (e.g., “Implementations MUST…”), and informative phrasing for context and rationale.
- Do not include sensitive operational details that would increase risk.
- Use precise terms: “authentication”, “authorization”, “confidentiality”, “integrity”, “availability”, “linkability”, “identifiability”.

## 12. Editorial mechanics (Markdown)

- Headings: Use sentence case for headings (capitalize only the first word and proper nouns). Avoid unnecessary title case.
- Anchors: Keep stable and human-readable (e.g., `#security-and-privacy-language`).
- Admonitions: Where supported, use standardized callouts (Note, Warning, Example). If not supported, emulate using bold labels.
- Line length: Soft wrap is acceptable; do not hard-wrap mid-sentence unless the toolchain requires it.
- Tables: Use simple, accessible Markdown tables; do not nest complex content.

## 13. Examples (non-normative)

Example (with notes below):

```io
# Schema
title: string, sku: string, quantity: int, metadata: { fragile: bool }
---
# Data
~ InventoryItem, ABC-123, 5, { T }
```

Notes:
- Property names in this example use lowerCamelCase consistently.
- Quantity is numeric, not a string.

Algorithm (normative style):

1. If `quantity` is absent, set it to 0.
2. If `quantity` is not an integer, the processor MUST raise a validation error.
3. If `metadata.fragile` is `true` and `quantity` > 0, the processor MAY apply special handling.

## 14. Style review checklist (editor quick reference)

- Terminology is defined at first use and used consistently
- Normative statements are testable and clearly scoped; informative text is labeled appropriately
- Algorithms are expressed as clear, imperative steps
- Examples are valid, labeled (Correct/Incorrect), and near related text
- Examples are valid and near related text; when helpful, pair with an “Incorrect” counterpart
- References and citations follow link and citation guidance; normative vs informative clearly separated when included
- Inclusive language; avoid idioms and ambiguity
- Casing, units, dates/times, and punctuation follow this guide
- Accessibility checks (alt text, table headers, no color-only meaning)

## 15. References

### Normative
- RFC 2119: Key words for use in RFCs to Indicate Requirement Levels.
- RFC 8174: Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words.
- ISO 8601: Date and time formats.

### Informative
- Unicode Standard Annex #35 (LDML) – for locale data and formatting.
- BCP 47: Tags for Identifying Languages.
- JSON (ECMA-404) – The JSON Data Interchange Syntax.

---

Editorial note: This document is itself normative for style. Where conflicts arise between individual specs and this guide, project maintainers decide the resolution; deviations SHOULD be documented in the spec’s SOTD.


