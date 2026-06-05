---
description: Streaming — an incremental, record-oriented transport over the Internet Object data model.
---

# Streaming

**Streaming** is Internet Object consumed incrementally. A producer frames records onto a
byte or text stream, and a consumer reads them back one logical record at a time as the bytes
arrive — without waiting for the whole document. It is not a separate format or a second
parser: it is the *same* data model, the *same* grammar, and the *same* validation, delivered
over time.

> **Streaming is part of the format, not an add-on.** It adds only three things — framing,
> transport coordination, and an emission envelope around each record. It defines no new type,
> no new validation rule, and no new serialization behavior. Those all come from the core
> specification, unchanged.

This chapter is the **language-neutral, normative** contract for Internet Object streaming. It
governs every implementation in every language and on every platform. It uses the requirement
keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY as defined in RFC 2119 and RFC 8174. A
conformant implementation satisfies every MUST and MUST NOT.

## What streaming is

Streaming is an **incremental, record-oriented transport**. A producer frames Internet Object
records onto a stream; a consumer reads them back one logical record at a time as bytes arrive.

The governing requirement: streaming MUST behave like a **record protocol**, not a raw chunk
parser. Transport chunk boundaries carry no meaning — splitting or coalescing the bytes MUST
NOT change the records a consumer sees. What the consumer observes is a sequence of *records*,
each either a successfully parsed value or a recoverable error, in wire order.

The protocol defines two roles:

- the **reader** — consumes a stream and emits one item per logical data record;
- the **writer** — frames records onto a stream.

It also places obligations on **adapters** (transport bridges) and **transports**. All of
these are abstract roles, not the API of any one library — see [Readers & Writers](readers-and-writers.md).

## Relationship to the core specification

Internet Object **core** is the single authority for data semantics. The streaming protocol is
subordinate to it and inclusive of it.

- **Subordinate on semantics.** Streaming MUST NOT redefine, reinterpret, or override any
  Internet Object semantics — what a type means, how values coerce, whether a value validates,
  how `default`, optional, `null`, and `choices` resolve, how open and closed schemas behave,
  how values serialize, or what an error's identity is.
- **Inclusive, not bolt-on.** Streaming MUST reuse core. It MUST NOT fork, shadow, or partially
  re-implement core parsing, schema resolution, validation, or serialization.

Everything streaming adds is *around* the core result: framing before it, transport beneath it,
and an envelope after it.

### The equivalence rule

A single test enforces the relationship above. It is the heart of the protocol:

> For the same record text and the same definitions state, a streamed record MUST produce the
> **same parsed record value, and the same error identity**, that the non-streaming core path
> (parse → schema processing → validation) produces for an equivalent one-record document.

If a behavior cannot be derived from "run core over this record's text," it is out of scope for
streaming. The protocol references the core type, schema, validation, and serialization rules;
it never restates them. When you need those rules, follow the links to the relevant chapter —
for example [Validation Model](../conformance/validation-model.md),
[Internet Object Schema](../schema-definition-language/internet-object-schema.md), and
[Error Model](../parsing-and-errors/error-model.md).

## Terminology

These terms have precise meanings throughout this chapter:

| Term | Meaning |
| ---- | ------- |
| **Logical record** | One Internet Object collection record, introduced on the wire by `~`. The unit the reader emits. |
| **Header** | The definitions block at the start of a stream, before the first `---`. |
| **Section** | A run of records sharing one schema context, introduced by a `---` control frame. |
| **Control frame** | A header-definition block or a section marker (`---` / `--- $Schema`). Control frames are never emitted as data items. |
| **Stream item** | The envelope the reader emits per logical record (see [Stream Items](stream-items.md)). |
| **Frame** | A contiguous span of stream text the reader buffers and resolves as a unit — one record, or the whole header. |
| **Default schema context** | The active schema used to validate records that carry no explicit schema selector. |

## How this chapter is organized

| Page | Covers |
| ---- | ------ |
| [Wire Format & Framing](wire-format.md) | The on-the-wire grammar, the mandatory `---` terminator, control frames, and UTF-8 encoding. |
| [Stream Items](stream-items.md) | The two-kind item model, record indexing, and degenerate inputs. |
| [Schema & State](schema-and-state.md) | Atomic header resolution, preloaded definitions, precedence, and schema switching. |
| [Streaming Error Model](error-model.md) | Error categories, recoverable-versus-fatal disposition, and stream-absolute positions. |
| [Readers & Writers](readers-and-writers.md) | Reader and writer obligations, lifecycle, adapters, backpressure, and conformance. |

## Versioning

This is **Streaming Protocol v1**. The two-kind item model, the framing rules, and the error
model are frozen for v1. Additive, optional metadata MAY be introduced without a version bump;
breaking changes require a new major version. The protocol is versioned independently of any
implementation, and an implementation declares which protocol version it implements. See the
[Version History](../appendices/version-history.md).

## See Also

- [Collection](../the-collections/collection.md) — the record sequence streaming transports
- [Data Streaming](../the-collections/data-streaming.md) — how collections motivate streaming
- [Validation Model](../conformance/validation-model.md) — the parse → validate → load pipeline streaming reuses
- [Error Model](../parsing-and-errors/error-model.md) — the core error identities streaming preserves
