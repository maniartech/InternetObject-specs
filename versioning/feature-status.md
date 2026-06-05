---
description: The current stability tier of every Internet Object specification feature.
---

# Feature Status

The stability tier of every Internet Object specification feature. The tiers and their guarantees
are defined in the [Versioning Policy](README.md).

**Tiers:** `Stable` · `Beta` (feature-complete, under review) · `Experimental` (may change at any
time) · `Deprecated` · `Reserved` (not yet specified).

> **These tiers are conservative provisional defaults.** Nothing is treated as `Stable` until
> reviewed and locked. The **Confirmed** column is `pending` for every row; it becomes `yes` once a
> row's tier is reviewed. This is a living index that grows as sections are finalized — see the
> [Roadmap](../roadmap.md).

## The structure

| Feature | Tier | Confirmed | Notes |
| ------- | ---- | --------- | ----- |
| [Internet Object Document](../the-structure/introduction/README.md) | Beta | pending | Core structure; finalization ongoing |
| [Structural Elements](../the-structure/structural-elements/README.md) | Beta | pending | |
| [Comments](../the-structure/comments.md) | Beta | pending | |
| [Encoding](../the-structure/encoding.md) | Beta | pending | |

## Values and types

| Feature | Tier | Confirmed | Notes |
| ------- | ---- | --------- | ----- |
| [Objects](../the-structure/values/object.md) | Beta | pending | |
| [Arrays](../the-structure/values/array.md) | Beta | pending | |
| [Strings](../the-structure/values/string/README.md) | Beta | pending | Open, regular, raw |
| [Number](../the-structure/values/number/number.md) | Beta | pending | |
| [BigInt](../the-structure/values/number/bigint.md) | Beta | pending | |
| [Decimal](../the-structure/values/number/decimal.md) | Experimental | pending | precision/scale not finalized |
| [NaN and Infinity](../the-structure/values/number/nan-and-infinity.md) | Beta | pending | |
| [Binary](../the-structure/values/binary.md) | Beta | pending | |
| [Date and Time](../the-structure/values/date-and-time.md) | Beta | pending | |
| [Booleans](../the-structure/values/booleans.md) | Beta | pending | |
| [Nulls](../the-structure/values/null.md) | Beta | pending | |

## Collections and streaming

| Feature | Tier | Confirmed | Notes |
| ------- | ---- | --------- | ----- |
| [Collection](../the-collections/collection.md) | Beta | pending | Includes creating collections and collection rules |
| [Streaming](../streaming/README.md) | Beta | pending | Protocol v1, under real-world testing before being declared Stable |

## Definitions and references

| Feature | Tier | Confirmed | Notes |
| ------- | ---- | --------- | ----- |
| [Definitions](../the-definitions/definitions.md) | Beta | pending | |
| [Variables](../the-definitions/variables.md) | Experimental | pending | `@var` define and reference; resolution rules not finalized |
| [Schema References](../the-definitions/schema-references.md) | Experimental | pending | `$Name`, nested, recursive; reference rules under review |
| Default schema and forward references | Experimental | pending | Order-independence to confirm |
| External / preloaded definitions | Experimental | pending | Precedence rules to confirm |

## Schema definition language

| Feature | Tier | Confirmed | Notes |
| ------- | ---- | --------- | ----- |
| [Internet Object Schema](../schema-definition-language/internet-object-schema.md) | Beta | pending | Including schema representation |
| [Any](../schema-definition-language/data-types/any.md) | Experimental | pending | Semantics pending |
| [String Types](../schema-definition-language/data-types/string/README.md) | Beta | pending | Base type |
| String shortcuts: [Email](../schema-definition-language/data-types/string/string-derived-types/email.md), [URL](../schema-definition-language/data-types/string/string-derived-types/url.md) | Beta | pending | |
| [Numeric Types](../schema-definition-language/data-types/number/README.md) | Beta | pending | Base type |
| Sized numeric shortcuts (`int8`…`int64`, `uint*`, `float*`) | Experimental | pending | Range/overflow semantics not finalized |
| [Object](../schema-definition-language/data-types/object.md), [Array](../schema-definition-language/data-types/array.md), [Bool](../schema-definition-language/data-types/bool.md), [Binary](../schema-definition-language/data-types/binary.md), [Date and Time](../schema-definition-language/data-types/date-and-time.md) | Beta | pending | Option contracts: see MemberDef / TypeDef |
| [Open & Dynamic Schemas](../schema-definition-language/dynamic-schema.md) | Experimental | pending | |
| [Union Types (anyOf)](../schema-definition-language/union-types.md) | Experimental | pending | |
| [Composition & Reuse](../schema-definition-language/composition.md) | Experimental | pending | |
| [MemberDef](../schema-definition-language/memberdef.md) | Experimental | pending | Modifiers: optional, null, default, choices; model finalization in progress |
| [TypeDef](../schema-definition-language/typedef.md) | Experimental | pending | Per-type option set and naming not finalized |

## Validation rules

| Feature | Tier | Confirmed | Notes |
| ------- | ---- | --------- | ----- |
| Core constraints: `optional`, `null`, `default`, `choices` | Beta | pending | |
| String length and `pattern` constraints | Beta | pending | Canonical spellings |
| Number `min` / `max` | Beta | pending | |
| Decimal `precision` / `scale` | Experimental | pending | |
| [Error model](../parsing-and-errors/error-model.md) (codes and categories) | Beta | pending | Codes stable; messages and positions may vary |

## Reserved and planned

| Item | Tier | Notes |
| ---- | ---- | ----- |
| Sub-record (intra-record) incremental streaming | Reserved | Record-granularity streaming only today |
| Midstream definition mutation in streams | Reserved | Disallowed in the Streaming Protocol v1; may be defined later |
| Schema composition extensions | Reserved | Planned; see the Roadmap |
| Additional types and formats | Reserved | To be determined |

## Maintenance

Update this table in the same change as any status change, and keep each page's inline "Stability:"
line in sync (see the [Versioning Policy](README.md)). Day-to-day finalization is tracked in the
[Roadmap](../roadmap.md).

## See Also

- [Versioning Policy](README.md) — the tiers and rules behind this table
- [Roadmap](../roadmap.md) · [Version History](../appendices/version-history.md)
