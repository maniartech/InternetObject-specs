---
description: Definitions of key Internet Object terms.
---

# Glossary

**Document** — A complete Internet Object unit: an optional header, then data, optionally
split into sections.

**Header** — The part of a document before `---`, holding the schema, definitions, and
metadata.

**Data section** — The part after `---` holding the actual values: a single object or a
collection. A document may have multiple named sections.

**Section** — A named (or default) block of data with an associated schema, introduced by a
`---` separator.

**Collection** — An ordered sequence of records, each beginning with `~`.

**Record** — One item of a collection (an object).

**Object** — An ordered set of key/value members, written `{ … }` or, at top level, unbraced.

**Member** — One key/value pair (keyed) or value (positional) inside an object.

**Value** — A scalar (string, number, bigint, decimal, datetime, binary, boolean, null) or a
structured value (object, array).

**Schema** — A description of the shape and constraints of data, written in object syntax.

**SchemaDef** — A schema that describes an object's *shape* (its fields and their types).

**MemberDef** — A definition of a single field: its type plus constraints
(`{ string, maxLen: 40 }`).

**TypeDef** — The fixed contract for a built-in type: the options a MemberDef of that type may
use. Defined by the specification, not by authors.

**Type** — A named kind of value (`string`, `int`, `decimal`, …). Built-in types form a closed
set; some are shortcuts (e.g. `uint8`, `email`) over a base type plus constraints.

**Shortcut** — A built-in name that stands for a base type plus preset constraints (`int8` is
`int` with an 8-bit range; `email` is `string` with an email `pattern`). A true 1:1 rename
(e.g. `byte` for `uint8`) is an **alias**.

**Definition** — A header entry `~ key: value` — metadata, a variable, or a reference.

**Variable** — A reusable value defined with `@name` and used as `@name`.

**Reference (ref)** — A reusable schema or type defined with `$name` and used as `$name`.

**`$schema`** — The special reference naming a document's default schema.

**Open string / Regular string / Raw string** — The three ways to write text: unquoted,
quoted with escapes, and `r'…'` literal.

**Open schema** — A schema marked with `*` that accepts fields beyond those declared.

**Optional / Nullable** — A field marked `?` may be omitted; a field marked `*` may be `null`.

## See Also

- [Getting Started](../internet-object/getting-started.md) · [Formal Grammar](grammar.md)
