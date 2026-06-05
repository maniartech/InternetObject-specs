---
description: The on-the-wire framing of a streamed document — the mandatory terminator, control frames, and encoding.
---

# Wire Format & Framing

The streaming wire format **is** the existing Internet Object document grammar, consumed
incrementally. The markers `~`, `---`, and the header-definition grammar are core constructs;
streaming reuses them as its framing layer and does not define them. This page specifies the
*framing obligations* of a streamed document — what a producer must put on the wire and what a
consumer may rely on — not the grammar itself. For what the markers mean, see
[Internet Object Document](../the-structure/introduction/README.md) and
[Collection](../the-collections/collection.md).

> **Chunk boundaries are not semantic.** Transport may split or coalesce the byte stream
> however it likes. Splitting or coalescing chunks MUST NOT change the records a reader emits.
> Framing is determined by the markers below, never by where a packet happens to end.

## Records and the data marker

`~` is the only normative data-record marker. A writer MUST frame every logical data record
with `~`, and the reader emits exactly one item per `~`-introduced record. Quoted multiline
values remain part of the same logical record — a newline inside a quoted string does not start
a new record.

```ruby
~ $schema: { name: string, role: string }
---
~ Alice, admin
~ Bob, guest
```

This stream carries two logical records. Each `~` line is one record; the reader emits one item
for each.

## The mandatory header terminator

A stream MAY begin with header definitions, written in the core header-definition grammar. To
make the boundary between header and data unambiguous as bytes arrive, the terminator is
mandatory:

- A conforming writer **MUST emit an explicit `---` (or `--- $Schema`) before the first data
  record, even when the header is empty.** An empty header serializes to exactly `---`.
- This terminator is what opens the data section. It makes the first token unambiguous to the
  reader:
  - a stream beginning with `---` has no header (or an empty one), and its data MAY stream
    immediately;
  - a stream beginning with `~` is a header (definitions block) that the reader MUST buffer
    until the terminating `---`.

Only the **first** `---` is load-bearing for header-versus-data separation. Within the data
section, records use `~` alone; any later `---` is an ordinary schema switch, not a second
header boundary.

The smallest possible conforming stream with data is therefore a bare terminator followed by
records:

```ruby
---
~ Alice
~ Bob
```

## Control frames

A **control frame** is structural input that is not a data record: a header-definition block,
or a section marker. Control frames are never emitted as data items.

- `--- $Schema` selects the schema context for the records that follow.
- A bare `---` resets the active section to the default schema context.
- A header-definition block (everything before the first `---`) establishes shared stream
  state.

Because control frames carry state rather than data, the reader applies their effect but emits
nothing for them. The detailed rules for schema selection and definition state are in
[Schema & State](schema-and-state.md).

## The legacy headerless form

A document that begins directly with `~` data and contains no `---` is the ordinary
non-streaming collection form. A reader MAY accept it, so that a non-streaming document stays
equivalent under the reader. However:

- This form **cannot be emitted incrementally.** The reader must buffer it to end of stream to
  determine that it was data and not an unterminated header.
- A writer MUST NOT emit this form. A writer always emits the `---` terminator (the section
  above), which removes the ambiguity.

In short: readers tolerate the legacy form for compatibility; writers never produce it.

## Encoding

Streaming decodes the wire the same way the core format does, with the additional obligation
that decoding state survives chunk boundaries.

- Byte sources MUST be decoded as UTF-8, preserving multibyte decoder state across chunk
  boundaries so that a code point split across two chunks decodes correctly.
- A leading UTF-8 byte-order mark (`EF BB BF`) at the very start of the stream MUST be
  stripped. A BOM-like sequence anywhere else is ordinary content and MUST NOT be stripped.
- Newlines MUST be normalized for framing: `\r\n` and a lone `\r` are treated as `\n`. Record
  framing MUST NOT depend on the producer's newline convention.
- Text sources are already-decoded text and MUST NOT be re-decoded as bytes.
- Newline normalization is a framing concern only. It MUST NOT alter how core interprets bytes
  inside a quoted value.

For the full character-encoding rules of the format, see [Encoding](../the-structure/encoding.md).

## See Also

- [Stream Items](stream-items.md) — what the reader emits for each `~` record
- [Schema & State](schema-and-state.md) — how `---` and `--- $Schema` select schema context
- [Internet Object Document](../the-structure/introduction/README.md) — the header and data structure streaming reuses
- [Encoding](../the-structure/encoding.md) — the format's character-encoding rules
