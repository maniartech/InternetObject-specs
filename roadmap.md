# Internet Object Specification Revamp — Roadmap

> **Goal:** Finalize existing structure and content first, then iteratively fill in the gaps. This roadmap is designed to be milestone-based and GitHub-issue-friendly.

---

## ✅ Phase 1: Finalize Existing Content (Top Priority)

### 🔹 Milestone: Lock Down Core Specs
- [ ] Review and refine all **data type specs** (null, bool, number, string, object, array, etc.)
- [ ] Finalize **document structure**: data section, header section
- [ ] Complete **definitions and collections** section
- [ ] Ensure **schema basics and rules** are finalized
- [ ] Normalize **frontmatter and titles** for all stable pages
- [ ] Ensure all folders have clear `README.md` as index

✅ Outcome: Core of the specification is "publishable and stable."

---

## 🟡 Phase 2: Add Placeholders for Known Gaps

### 🔹 Milestone: Define All Spec Sections
- [ ] Add **stub page** for "Schema Composition" (e.g., `schema-composition.md`)
- [ ] Add **stub page** for "Error Reporting Format"
- [ ] Add **stub page** for `$ref` and aliasing rules
- [ ] Add **stub glossary**
- [ ] Add **EBNF Grammar placeholder**
- [ ] Add **real-world examples** page
- [ ] Add **how to write schema** (step-by-step doc)
- [ ] Add **streaming examples** placeholder
- [ ] Add **conformance** placeholder

📌 Use headings, comment blocks, or `<!-- TODO -->` to label these as “Coming Soon” or “Draft”.

---

## 🔵 Phase 3: Expand Developer-Facing Docs

### 🔹 Milestone: Guide for Adoption & Usage
- [ ] How to write a schema from scratch
- [ ] Best practices for schema design
- [ ] Tips for tool authors (parsers, validators, linters)
- [ ] Examples for:
  - API requests/responses
  - Config files
  - Live data streaming

---

## 🔘 Phase 4: Final Touches & Publishing

### 🔹 Milestone: Prepare for Finalization
- [ ] Add revision history
- [ ] Add GitBook/Docusaurus-compatible navigation (`SUMMARY.md`)
- [ ] Tag stable pages with frontmatter status (`status: stable`)
- [ ] Write top-level `README.md` and contribution guide
- [ ] Final review/edit pass

---

## 🧩 Suggested Labels for GitHub Issues

| Label | Use |
|-------|-----|
| `spec:stable` | Pages that are finalized |
| `spec:draft` | Incomplete but structured pages |
| `needs:content` | Placeholder exists, content missing |
| `priority:high` | Core to spec stability |
| `editorial` | Fix naming, navigation, formatting |