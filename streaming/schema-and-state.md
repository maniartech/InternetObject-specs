---
description: How a stream resolves definitions atomically, selects schemas, and applies precedence with preloaded state.
---

# Schema & State

A stream carries state: header definitions, a default schema context, and the explicit schema
in effect for the current section. This page specifies how that state is established, how it is
selected per record, and how it composes with definitions supplied before the stream begins.
All of the *semantics* — what a definition means, how a schema resolves, how `default`,
optional, `null`, and `choices` behave — belong to core; streaming only governs *when* state is
resolved and *which* schema applies. See [Definitions](../the-definitions/definitions.md) and
[Schema References](../the-definitions/schema-references.md).

## The header is resolved atomically

The header is the definitions block before the first `---`. Definition references inside it are
**position-independent**: a definition at any position may reference another regardless of
order. Because of this:

> **The header MUST be buffered and resolved as a single atomic frame before any data record is
> processed.** The header MUST NOT be resolved piecemeal. A reader buffers from the start of the
> stream up to the terminating `---`, resolves the whole block at once, and only then begins
> emitting records.

Definitions are **header-only** in v1. After the first logical data record begins, the header
phase is over. There is no normative midstream definition-mutation syntax — a stream cannot add
or change definitions once data has started.

## Selecting a schema per record

A record is validated under exactly one schema context:

- `--- $Name` selects a named schema for the records that follow it.
- A bare `---` resets the active section to the **default schema context**.
- A record that carries no explicit selector is validated through the active default schema
  context.

The `schemaName` reported on a stream item reflects the **explicit** selector declared for that
record's section, and when present MUST include the leading `$` sigil:

- If an explicit selector applied (for example `$User`), `schemaName` is that name.
- If the record was validated only through the active default schema context with no explicit
  selector, `schemaName` MUST be **absent**. An implementation MUST NOT synthesize a name (such
  as `$schema`) merely because a default schema was active.

A schema switch changes the parsing and serialization context; it does not by itself produce a
stream item.

```ruby
~ $User: { name: string }
~ $Order: { id: int }
--- $User
~ Alice
--- $Order
~ 1001
```

Here the reader emits two record items: the first reports `schemaName` `$User`, the second
reports `$Order`. The two `---` control frames are applied but never emitted as items.

## Unknown schema switches are fatal

A `--- $Name` selector MUST reference an already-defined schema. A switch to an unknown or
invalid schema is **not** a recoverable per-record error — it is a **fatal** stream error,
because the section's records can no longer be validated against a known shape. The error
preserves its core identity (the `schema-not-defined` validation error); see
[Streaming Error Model](error-model.md).

If no default schema exists, a bare `---` selects the schemaless default context rather than
inventing a stream-only schema.

## Preloaded definitions and precedence

A reader MAY be constructed with preloaded definitions and an optional fallback default schema
context **before any stream bytes are read**. This is how out-of-band schemas — agreed once
between a publisher and a subscriber — are supplied to the reader. If none are provided, the
initial definitions state is empty.

Precedence MUST match core's external-definitions behavior:

- In-stream header definitions **override** matching preloaded keys.
- An in-stream `$schema` **overrides** the fallback default schema context.
- If the stream defines no `$schema`, the fallback default schema context **remains active**.

This is what makes the shared, out-of-band deployment mode work: the wire can carry only data
sections (or a header with metadata but no schema), while the reader validates against the
schema it already holds. For the two deployment modes — embedded versus shared — see
[Schema-First Design](../core-concepts/schema-first.md).

## State reuse

Header-defined definitions become shared stream state and apply to later records. A reader MUST
reuse accepted definitions and resolved schema objects across records: an unchanged schema
context MUST NOT trigger repeated schema compilation. All definition lookup, schema resolution,
default handling, and member validation MUST be delegated to core — a reader MUST NOT embed its
own copy of the rules for `default`, optional, `null`, `choices`, or open-schema handling.

## See Also

- [Definitions](../the-definitions/definitions.md) — the header definition block streaming resolves atomically
- [Schema References](../the-definitions/schema-references.md) — how `$name` references resolve
- [Schema-First Design](../core-concepts/schema-first.md) — embedded versus shared (out-of-band) schemas
- [Streaming Error Model](error-model.md) — why an unknown schema switch is fatal
