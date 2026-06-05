---
status: candidate
description: How the Internet Object specification is versioned, and the stability tiers that govern each feature.
---

# Versioning Policy

This page defines how the **Internet Object specification** is versioned and how the stability of
each feature is governed, so the specification can be published and evolve continuously without
being a perpetual draft. It follows the model used by mature standards (CSS module levels, TC39
stages, Kubernetes alpha/beta/GA): a written policy plus a per-feature status index, with stability
tracked per feature rather than as one global label. For where each feature currently stands, see
[Feature Status](feature-status.md).

## What is versioned

- **The format specification** carries a major version (for example, "Internet Object 1.0"). A
  backward-incompatible change to the format requires a new major version (2.0).
- **Sub-protocols** built on the format — for example [Streaming](../streaming/README.md) — carry
  their own version (the Streaming Protocol is at v1) and advance on their own clock.
- **Implementations** are not versioned by this document. They follow their own Semantic
  Versioning and declare which specification version they implement. The specification's clock and
  an implementation's release clock are independent.

## Stability tiers

Every feature carries exactly one tier. Tiers are tracked per feature, not per specification
release.

| Tier | Meaning | May change |
| ---- | ------- | ---------- |
| Stable | Part of the frozen specification contract. | Only in a new specification major |
| Candidate | Feature-complete and under review; intended to become Stable. Not yet part of the frozen contract. | With notice, before it graduates |
| Draft | Provisional; still evolving. Use at your own risk. | At any time |
| Deprecated | Still specified; scheduled for removal. | Removed in the next specification major |
| Reserved | Syntax or semantics reserved for future definition; not yet specified. | May be defined at any time |
| Informative | A non-normative page (guides, rationale, appendices); carries no maturity guarantee. | n/a |

As analogues: Draft is close to TC39 Stage 1–2 or Kubernetes alpha; Candidate to Stage 3
(candidate) or beta; Stable to Stage 4 or GA.

## Core rules

- A **Stable** feature MUST NOT change incompatibly except in a new specification major.
- A **Candidate** feature is feature-complete and SHOULD be treated as near-final, but MAY still
  change — with a changelog notice — before graduating to Stable.
- A **Draft** feature MAY change or be removed at any time and MUST be clearly marked.
- A feature MUST be **Deprecated** for at least one major cycle before removal.
- Each page declares its tier in a `status:` field in its front matter; the
  [Feature Status](feature-status.md) page is generated from those fields, so the dashboard never
  drifts from the pages. To change a status, edit the page's `status:` and regenerate.

## Graduation and deprecation lifecycle

```text
(proposed) → Draft → Candidate → Stable → Deprecated → Removed
                │         │
                └─────────┴── may still change while Draft or Candidate
```

- **Draft → Candidate:** the design is complete and reviewed.
- **Candidate → Stable:** behavior is final and consistent across implementations; graduation is
  announced in the changelog.
- **Stable → Deprecated → Removed:** with a replacement and a target major.

## Relationship to implementations

- An implementation MAY implement Candidate or Draft features but SHOULD mark them as such in its
  own API (for example, SemVer-exempt or `@experimental`).
- A feature is normally promoted to **Stable** only once it is interoperably implemented and
  verified — for example, by a shared conformance suite. Until then it stays Candidate.
- Implementations declare the specification version and which Candidate or Draft features they
  include.

## 1.0 readiness checklist

Declare a specification major (such as 1.0) final when:

- [ ] The Stable surface (structure, core values and types, collections, core schema and
      validation) is one the specification will commit to keeping until 2.0.
- [ ] Each Stable feature is interoperably implemented and verified.
- [ ] All not-yet-final features are explicitly marked Draft or Candidate, not silently shipped
      as Stable.
- [ ] [Feature Status](feature-status.md) is complete and reviewed.
- [ ] The deprecation and breaking-change process here is adopted.

## Changelog

Specification changes — especially anything affecting a Stable feature, and every feature
graduation — MUST be recorded in the [Version History](../appendices/version-history.md).
Day-to-day finalization work is tracked in the [Roadmap](../roadmap.md).

## See Also

- [Feature Status](feature-status.md) — the current tier of each feature
- [Roadmap](../roadmap.md) — the finalization plan
- [Version History](../appendices/version-history.md) — the specification changelog
- [Conformance Requirements](../conformance/requirements.md) — what a conformant implementation must do
