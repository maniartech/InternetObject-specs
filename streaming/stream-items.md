---
description: The two-kind stream-item model the reader emits, record indexing rules, and degenerate inputs.
---

# Stream Items

A reader emits a sequence of **stream items**, in wire order. Each item corresponds to exactly
one logical data record and is exactly one of two kinds: a **record** (success) or a
**record-error** (recoverable failure). This page defines that abstract model. The concrete
representation — object shape, field names, a sum type, an iterator of results — is chosen by
each platform, but every implementation MUST preserve the model described here.

> **Two kinds, never more.** Implementations MUST NOT introduce additional item kinds in v1.
> The discriminant names the *protocol event* — record versus record-error — not the type of
> the payload. New metadata MAY be added only as optional, additive fields that do not change
> the meaning of the fields below.

## The record item

A **record item** represents one successfully parsed and validated record. It carries:

| Field | Meaning |
| ----- | ------- |
| `kind` | `record` (success). |
| `recordIndex` | The zero-based position of this record in the stream (see below). |
| `schemaName` | Present **only** when an explicit schema selector applied; otherwise absent. See [Schema & State](schema-and-state.md). |
| `value` | The complete parsed record value — identical to what the non-streaming core path produces for that record. |

A record item MUST carry a complete record value. It MUST NOT carry an error.

## The record-error item

A **record-error item** represents one record that failed recoverably. Iteration continues to
the next record. It carries:

| Field | Meaning |
| ----- | ------- |
| `kind` | `record-error` (recoverable failure). |
| `recordIndex` | The zero-based position of this record — counted exactly as a successful one. |
| `schemaName` | Same rule as the record item: present only when an explicit selector applied. |
| `error` | The failure, preserving the core error identity (category + code). See [Streaming Error Model](error-model.md). |

A record-error item MUST carry no value. An item MUST NOT carry both a value and a recoverable
error — the two kinds are mutually exclusive.

## Record indexing

`recordIndex` is the stable identity of a record's position in the stream. Its rules are strict:

- It is **zero-based** and counts **logical data records** — not chunks, lines, or sections.
- It MUST increment for **both** kinds. A failed record consumes an index exactly as a
  successful one does, so indices are **dense and gap-free**.
- It is **stream-global**. It MUST NOT reset on a schema switch or on a bare `---`.
- Items MUST be emitted **in wire order**: the item with index *n* before the item with index
  *n+1*.

Consider a stream whose second record is malformed:

```text
---
~ { id: 1 }
~ { BROKEN
~ { id: 2 }
```

The reader emits three items in order: a `record` at index `0`, a `record-error` at index `1`,
and a `record` at index `2`. The bad record still consumes index `1`; the third record is `2`,
not `1`. The reader MUST NOT leak partial fragments of the broken record before its error item.

## Degenerate and empty inputs

The reader's behavior on trivial inputs follows directly from the framing rules and the
equivalence rule — these cases are specified so every implementation agrees:

- An **empty source** (zero bytes) MUST emit zero items and complete normally.
- A **whitespace-only or blank-line-only** source MUST emit zero items and complete normally.
- A **header-only stream** (definitions, then `---`, then end of stream with no records) MUST
  emit zero items and complete normally.
- A **trailing bare `---`** with no following records MUST NOT emit an item and MUST NOT error.
- A **bare `~`** with no payload (or `~` followed only by whitespace) is delegated to core like
  any other record. Under an active schema it yields whatever core produces — typically a
  validation failure, hence one `record-error` — and with no active schema it yields core's
  empty record. Streaming MUST NOT special-case it into a stream-only error, because that would
  diverge from the non-streaming parse of the same input.

## See Also

- [Schema & State](schema-and-state.md) — when `schemaName` is present and how selectors work
- [Streaming Error Model](error-model.md) — what a record-error item's `error` preserves
- [Wire Format & Framing](wire-format.md) — how `~` records and `---` frames are read off the wire
- [Collection](../the-collections/collection.md) — the record sequence each item maps to
