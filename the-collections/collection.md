---
description: The structure of a collection — an ordered sequence of records in a data section.
---

# Collection

A **collection** is an ordered sequence of **records** within a data section of a document.
Each record is an object, written on its own line and introduced by a tilde `~`. Collections
make it efficient to serialize, batch, and stream many objects — datasets, tables, event logs
— in a concise, uniform form.

> **Familiar parallels.** A collection is conceptually similar to a dataset in CSV, a stream in
> JSON Lines, or a record array in Avro — but each record is a full Internet Object object.

A collection is always part of a document, **not** a standalone document. A document has a
header and a data section; a data section holds either a single object or a collection of one
or more records. Records may be **homogeneous** (the same shape) or **heterogeneous** (each
shaped differently); each record is independent, so a failure in one does not affect the rest.

## Syntax

A collection is one or more records. Each record is a tilde `~` followed by an object:

```ebnf
collection     = collectionItem+
collectionItem = "~" [ object ]
```

Here `object` is an object as defined in the [Objects](../the-structure/values/object.md)
specification, in either open or closed form. An absent body (a bare `~`) is an **empty
record**. A bare scalar or array is promoted to an object — see [Type promotion](#type-promotion).

### Structural characters

| Symbol | Name | Unicode | Role |
| ------ | ---- | ------- | ---- |
| `~` | Tilde | `U+007E` | Begins a record |
| `,` | Comma | `U+002C` | Separates values within a record |
| `{` `}` | Curly braces | `U+007B`, `U+007D` | Enclose a closed-object record |

## Records

A **record** (also called a *collection item*) is the top-level object immediately following a
tilde in a collection. Every record is parsed as an object:

- A record MUST be a valid object — either open form (comma-separated values) or closed form
  (enclosed in `{ }`).
- A bare `~` is an **empty record** and loads as an empty object (`{}`).

### Type promotion

If a record looks like a single scalar (number, string, boolean, null) or an array, it is
promoted to an open object holding that value at positional index `0`. Unnamed values in an
open object always take positional keys (`0`, `1`, `2`, …):

```ruby
---
~ 1                   # record: { "0": 1 }
~ true                # record: { "0": true }
~ [red, green, blue]  # record: { "0": [red, green, blue] }
~ John Doe            # record: { "0": "John Doe" }
~ {1, 2}              # record: { "0": 1, "1": 2 }
~                     # empty record: {}
~ name: John Doe      # record: { "name": "John Doe" }
```

> Every record is an object, whether it is written as a scalar, an array, or an explicit
> object. A schema later maps these values to named members.

## Valid forms

### Open-object records (recommended)

Open form is the most concise and is the recommended style:

```ruby
---
~ 101, Thomas, 25, HR, {Bond Street, New York, NY}
~                                                    # empty record → {}
~ 102, George, 30, Sales, {Duke Street, New York, NY}
```

### Closed-object records

A record may be a closed object enclosed in `{ }`:

```ruby
---
~ {Jane Doe, 20, f, N/A, [0xFF0000, 0x0000FF], F}
```

### JSON-style records

Quoted keys and standard JSON punctuation are accepted, so JSON-shaped records read naturally:

```ruby
---
~ {"name": "John Doe", "address": {"street": "Main St", "city": "Seattle"}, "is_active": true}
~ {"name": "Eve", "age": 33, "location": {"city": "Dallas", "state": "TX"}, "is_active": false}
```

### Mixed records

Open and closed records may be mixed in one collection:

```ruby
---
~ Dave, 40, m, {Main St, Seattle, WA}, [purple], T
~ {Eve, 33, f, {Elm St, Dallas, TX}, [orange], F}
```

## Whitespace, commas, and comments

- Whitespace around the tilde, commas, and braces is insignificant.
- Records are usually separated by newlines, but any whitespace works.
- A trailing comma inside an object is allowed and ignored.
- Comments (`#` to end of line) may trail a record or stand alone; they are ignored.

## Invalid forms

Some inputs are genuine syntax errors; others parse without error but not the way you might
expect. Both are worth recognizing.

### Genuine errors

A record (`~`) cannot follow a bare, non-collection object in the same section:

```ruby
---
101, Thomas, 25        # a single (non-collection) object …
~ 102, George          # ✗ unexpected-token — a record cannot follow a bare object
```

An unterminated object or array, or stray tokens after a closed object, are also errors. (Each
is reported against the record it appears in; the surrounding records are unaffected.)

```ruby
~ {101, 25, HR} extra               # ✗ unexpected-token — tokens after a closed object
~ Alice, f, {Third St, NY, [green]  # ✗ expecting-bracket — object/array not closed
```

### Common mistakes

Missing separators do **not** raise an error — spaces never separate values, so a run of words
collapses into a single open string:

```ruby
---
~ 101 Thomas 25 HR     # one value: the open string "101 Thomas 25 HR"
~ 101, 25 HR           # two values: 101 and the open string "25 HR"
```

> If a record loads with fewer members than you expect, look for a missing comma — spaces alone
> never separate values.

## Independent validation

Each record is parsed and validated on its own. If a record fails — a syntax error or a
validation error — only that record is reported as an error; the records before and after it
still load:

```ruby
~ John, 28, m, {Main St, LA}, [red], T          # loads
~ Jane, N/A, f, {Second St, LA}, [blue], F      # loads
~ Alice, f, {Third St, NY, [green], T           # ✗ expecting-bracket — object not closed
~ Bob, 35, m, {Fourth St, NY}, [yellow], T      # loads — unaffected by the error above
```

A conformant processor SHOULD collect per-record errors and continue rather than stop at the
first failure. See [Collection Rules](collection-rules.md) for schema validation, empty-record
rules, and a worked example.

## Preservation of order

Record order is preserved exactly as written. Whitespace and comments are insignificant and do
not appear in the loaded result. How members are named, deduplicated, and mapped to fields is
governed by the schema — or, without a schema, by positional index.

## See Also

* [Objects](../the-structure/values/object.md) — the object grammar a record follows
* [Creating Collections](creating-collection.md) — collections with and without a schema
* [Collection Rules](collection-rules.md) — validation, empty records, and error handling
* [Data Streaming](data-streaming.md) — collections produced and consumed over time
* [Data Sections](../the-structure/introduction/data.md) — where a collection sits in a document
* [Schema Definition Language](../schema-definition-language/internet-object-schema.md) — validating records
