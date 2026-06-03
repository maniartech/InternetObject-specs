---
description: >-
  Frequently asked questions about Internet Object, in no particular order —
  questions raised by the community after the concept was first previewed.
---

# FAQs

## Why do we need another data-interchange format?

As Heraclitus observed, "change is the only constant." Internet Object was created to address
limitations of JSON — today's most common interchange format — including repeated keys, the
absence of a built-in schema, no comments, and no native streaming model. It keeps JSON's
readability while removing that redundancy and adding schema-driven validation. For the full
background, [read the story](https://internetobject.org/the-story/).

## Does Internet Object support binary data?

Internet Object is a text-based, human-readable format, so it does not embed raw binary bytes
directly. Instead it provides a `binary` type that carries binary data as base64 text
(`b'…'`), which a parser decodes to bytes. This keeps documents safe to transmit and read as
plain text while still representing binary payloads.

## Can an Internet Object parser read JSON?

JSON compatibility was not an original goal, but the format turned out to be largely
JSON-compatible: a wide subset of JSON parses directly as Internet Object. See
[JSON Compatibility](json-compatibility.md) for the exact rules and the lossy cases.

## Can an Internet Object schema validate JSON objects?

Yes. Because JSON objects parse as Internet Object data, the same schema validates both an
Internet Object document and an equivalent JSON object.

## Is an Internet Object document smaller than JSON?

An uncompressed Internet Object document is typically around 40% smaller than the equivalent
JSON, because keys are declared once in the schema rather than repeated on every record. Once
both are gzipped the difference narrows and depends on the data — sometimes Internet Object is
smaller, sometimes the two are comparable.

## Is Internet Object faster to build and parse than JSON?

Internet Object is a simple format, and a document can often be built by straightforward
string concatenation, which is fast. Parsing speed depends on the parser and the workload more
than on the format itself: a well-written parser will outperform a poorly written one in any
format.

## How can I contribute?

Contributions are welcome in many forms:

1. Join a team building an Internet Object library in your favorite language.
2. Write a blog post or article about Internet Object.
3. Help friends and colleagues get started with the format.
4. Help develop the technical documentation.
5. Proofread and help correct the specification and its language.
6. Translate the documentation into other languages.
7. Spread the word about Internet Object.

## See Also

- [Why Internet Object?](internet-object/why-internet-object.md) · [Getting Started](internet-object/getting-started.md)
- [JSON Compatibility](json-compatibility.md) · [Contributors](contributors.md)
