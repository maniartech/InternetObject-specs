---
status: informative
description: >-
  Frequently asked questions about Internet Object — what it is, its features,
  interoperability, size and performance, status, and how to take part.
---

# FAQs

## Getting oriented

### Why do we need another data-interchange format?

Internet Object was created to address long-standing limitations of JSON — today's most common
interchange format — including keys repeated on every record, the absence of a built-in schema,
no comments, and no native streaming model. It keeps JSON's readability while removing that
redundancy and adding schema-driven validation, precise data types, comments, and streaming. For
the full background, [read the story](https://internetobject.org/the-story/).

### Why is it called "Internet Object"?

The name reflects its purpose: a compact, readable way to exchange **objects** — structured data
— across the **internet**. A document is treated as data plus the schema that gives it shape, so
the same objects travel efficiently between services, languages, and platforms.

### When should I use Internet Object, and when not?

Internet Object suits data that has a stable shape and is exchanged or stored repeatedly: APIs,
records and collections, logs, configuration, and high-volume or streamed data where size and
validation matter. It is less compelling for one-off, entirely ad-hoc data with no recurring
shape, where JSON's ubiquity may outweigh the savings. See
[Best Practices & Guidelines](best-practices.md) for guidance.

### Is Internet Object a replacement for JSON, or a complement?

Either, depending on your needs. It can replace JSON where its schema, compactness, comments,
precise types, or streaming are valuable, and it interoperates with JSON where you need to keep
using it — a wide subset of JSON parses directly as Internet Object. You can adopt it
incrementally rather than all at once.

## Features

### Is a schema required, or can I use it schemaless?

A schema is recommended but not required. Internet Object is **schema-first, not
schema-required**: a document with no schema is still valid, and its values map to positional
keys. Declare a schema once the data has a stable shape, leaves your control, or needs
validation. See [Schema-First Design](core-concepts/schema-first.md).

### Does it support comments, dates, and precise numbers?

Yes. Internet Object supports comments, native date and time values, and precise numeric types —
including exact decimals and big integers — that JSON either omits or represents loosely as
strings or floats. See [Comments](the-structure/comments.md),
[Date and Time](the-structure/values/date-and-time.md),
[Decimal](the-structure/values/number/decimal.md), and
[BigInt](the-structure/values/number/bigint.md).

### Does Internet Object support binary data?

Yes — as encoded binary. The wire form is text-based and human-readable, so it does not embed raw
bytes directly; instead it provides a `binary` type that carries binary data as base64 text
(`b'…'`), which a parser decodes to bytes. This keeps documents safe to transmit and read as
plain text while still representing binary payloads. See [Binary](the-structure/values/binary.md).

### Does it support streaming?

Yes. Because a collection is a sequence of independent records, Internet Object can be produced
and consumed incrementally — one record at a time, each validated on its own — without waiting for
the whole document. The framing, record model, and error handling are defined in the
[Streaming](streaming/README.md) chapter.

## Working with JSON and other formats

### Can an Internet Object parser read JSON, and can a schema validate it?

Largely, yes. JSON compatibility was not an original goal, but a wide subset of JSON parses
directly as Internet Object data; and because it parses as data, the same schema validates both an
Internet Object document and an equivalent JSON object. See
[JSON Compatibility](json-compatibility.md) for the exact rules and the lossy cases.

### Can I use Internet Object to validate my existing JSON API?

Yes. Because a wide subset of JSON parses directly as Internet Object data, you can write an
Internet Object schema and validate the JSON your API already sends and receives — without
changing the API itself. This makes adoption low-risk: keep your existing JSON on the wire and
gain schema-driven validation now, then move to the more compact Internet Object encoding later if
you choose. See [JSON Compatibility](json-compatibility.md).

### How do I convert to and from JSON or other formats?

Internet Object maps cleanly to and from JSON and other common formats. The
[Converting To/From Other Formats](interoperability/conversions.md) chapter covers the mapping
rules, and [JSON Compatibility](json-compatibility.md) covers the JSON specifics, including where
a conversion can lose precision.

## Size and performance

### Is an Internet Object document smaller than JSON?

Usually, and often by a wide margin. For record-heavy data an uncompressed Internet Object
document is commonly **40–60% smaller** than the equivalent JSON — and sometimes more — because
field names are declared once in the schema rather than repeated on every record. Once both are
gzipped the difference narrows and depends on the data.

### Is Internet Object faster to build and parse than JSON?

Building is very fast. The format is simple and straightforward, and a document can be produced by
plain string concatenation or interpolation — no special serializer is required.

Parsing is not a like-for-like comparison. A JSON parser only checks syntax, whereas an Internet
Object parser, in a single pass, also validates the data against the schema — types, constraints,
defaults, and required fields. You receive validated, structured data, not just parsed text. As
with any format, raw parsing speed depends more on the quality of the parser and the workload than
on the format itself.

## Status, ecosystem, and licensing

### Is Internet Object ready for production, and what is the current status?

The specification is at **1.0 Draft**, published alongside the **public beta** of the reference
implementation. The format is ready for evaluation and early adoption; the specification and the
implementation are still converging, so check the status notes on individual pages before relying
on a feature in production. Implementations version independently and declare the specification
version they conform to.

### Which languages have libraries?

A JavaScript/TypeScript reference implementation is available in public beta. Libraries for other
languages are planned, and the specification is deliberately language-agnostic so anyone can
implement it. See the [Roadmap](roadmap.md), and the contribution options below to help build one.

### How is Internet Object licensed?

The specification is licensed under **CC BY-ND 4.0** — free to share with attribution, with no
modified versions. Example snippets in the specification are dedicated to the public domain under
**CC0**, and the reference libraries are licensed under **Apache-2.0**. Full details are on the
[License](license.md) page.

## Community

### How can I contribute?

Contributions are welcome in many forms:

1. Join a team building an Internet Object library in your favorite language.
2. Write a blog post or article about Internet Object.
3. Help friends and colleagues get started with the format.
4. Help develop the technical documentation.
5. Proofread and help correct the specification and its language.
6. Translate the documentation into other languages.
7. Spread the word about Internet Object.

### How do I report an issue or propose a change?

Issues, corrections, and proposals are handled in the specification's repository at
[github.com/maniartech/InternetObject-specs](https://github.com/maniartech/InternetObject-specs).
Open an issue describing the problem or suggestion; substantive changes to the format are
discussed there before they enter the specification.

## See Also

- [Why Internet Object?](internet-object/why-internet-object.md) · [Getting Started](internet-object/getting-started.md)
- [JSON Compatibility](json-compatibility.md) · [Roadmap](roadmap.md)
- [License](license.md) · [Acknowledgments](contributors.md)
