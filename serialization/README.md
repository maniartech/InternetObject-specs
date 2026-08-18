---
status: candidate
description: Overview of serialization — turning values back into Internet Object text.
---

# Overview

Serialization is the reverse of parsing: it turns an in-memory value back into Internet
Object text. A component that does this is a **writer**.

Where parsing is permissive — it accepts every form the grammar allows — serialization is
**narrow**. Many different texts parse to the same value, but a writer emits exactly one of
them. That chosen form is the **canonical output**, and pinning it down is what lets two
independent implementations agree.

## The core principle

Internet Object exists to move **data**, not **names**. A schema is a contract shared by the
endpoints; it does not have to travel with every payload. So the normal wire form is
**positional values** — the receiver already knows the schema, and repeating field names on
the wire is redundant. Removing that redundancy is the point of the format.

A name therefore appears in the output **only when it cannot be recovered any other way**:

> A member is written **positionally** (bare value) when its name is recoverable from a schema
> in scope — a document header, a section schema, or a parent MemberDef. A name is written
> **inline** (`key: value`) only when it is not recoverable. A name is never both hoisted into
> a schema *and* repeated inline.

## Two levels

Serialization happens at two levels, and they answer different questions:

| Level | Produces | Question it answers |
| ----- | -------- | ------------------- |
| **Value** | a data row — `John, 30` | how is each value written? |
| **Document** | header + `---` + data sections | does the schema travel with the data? |

Only a document has a header. A writer **MUST NOT** infer a schema during serialization: if a
document carries no schema, none is written, and the data is emitted schema-less.

## What a conformant writer must do

- **MUST** produce output that re-parses to an equivalent value — see
  [Round-Trip Guarantees](round-trip.md).
- **MUST** preserve each value's **type**, not merely its printed form — see
  [Value Formatting](value-formatting.md).
- **MUST NOT** drop a member. Every member present in the value appears in the output.
- **MUST NOT** invent a schema that the value did not carry.
- **SHOULD** honor schema serialization hints (for example a number `format`, or a string
  quote style).

## In this section

- [Key Emission](key-emission.md) — when a member is written bare and when it is written `key: value`
- [Value Formatting](value-formatting.md) — how each scalar, key, and string is written
- [Record & Document Output](document-output.md) — records, enclosure, headers, and sections
- [Round-Trip Guarantees](round-trip.md) — what is preserved, and what is deliberately not

## See Also

- [Parsing & Errors](../parsing-and-errors/README.md) — the input side of the same pipeline
- [Conformance Requirements](../conformance/requirements.md)
- [Readers & Writers](../streaming/readers-and-writers.md) — streaming writers delegate to these rules
