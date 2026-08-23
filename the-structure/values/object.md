---
status: candidate
description: Object value syntax — open and closed objects, keyed and unkeyed values.
---

# Objects

Objects are a fundamental element of Internet Object documents, providing a clear, compact way
to represent structured data.

An object is **a sequence of values and/or key-value pairs separated by commas** (`,`,
`U+002C`). For readability and flexibility, the format supports two object modes:

- **Open objects** — written without curly braces; allowed **only at the top level**.
- **Closed objects** — enclosed in `{}`; allowed at any level.

An object may contain:

- **Sequential (unkeyed) values**
- **Inline keyed values** (`key: value`)
- **Any combination and ordering** of keyed and unkeyed values

All values in an object are accessed by **position** (0-based). A value that has a key may also
be accessed by **key**, especially when a schema is applied.

> **Design note.** Internet Object began as a compact, expressive format for transmitting
> structured objects across the internet — an object-oriented serialization model structurally
> similar to JSON. As it evolved, it adopted a document-oriented approach with sections,
> schemas, metadata, and stream-friendly constructs. The object remains the core unit of
> structure, and the compact syntax still reflects that original vision.

> **Implementation note.** In many programming languages, "object" is a built-in or base type.
> To avoid clashes, an implementation MAY expose the Internet Object value under a distinct
> name (for example, `InternetObject`) while conforming fully to the object syntax and behavior
> defined here.

## Syntax

### Closed object

```ebnf
object         = "{" [ objectEntries ] "}"
objectEntries  = entry *( "," entry )

entry          = keyedValue | unkeyedValue
keyedValue     = key ":" value
unkeyedValue   = value

key            = string
value          = any valid Internet Object value
```

### Open object

```ebnf
objectOpen = objectEntries
```

> Keys must be valid [strings](string/README.md). Values must be valid
> [Internet Object values](README.md). Keyed and unkeyed values may appear in any order.

## Structural characters

| Symbol | Name                | Unicode  | Description                           |
| ------ | ------------------- | -------- | ------------------------------------- |
| `{`    | Open curly bracket  | `U+007B` | Begins a closed object                |
| `}`    | Close curly bracket | `U+007D` | Ends a closed object                  |
| `:`    | Colon               | `U+003A` | Separates a key from its value        |
| `,`    | Comma               | `U+002C` | Separates values or key-value entries |

## Valid forms

### Open object with unkeyed and keyed values (any order)

```ruby
name: John, Doe, 25
John, age: 25, gender: M
name: John, age: 25, gender: M, T
John Doe, 25, T
```

### Closed object with mixed values

```ruby
{name: John, Doe, 25}
{John, age: 25, gender: M}
{name: John, age: 25, gender: M, T}
{John Doe, 25, T}
```

### Fully keyed object

```ruby
{
  name: John Doe,
  age: 25,
  gender: M,
  isActive: T
}
```

### Keys as strings (quoted forms)

```ruby
{
  "name": John Doe,
  'isActive': T,
  address: {Bond Street, New York, NY}
}
```

### JSON-compatible object

The following Internet Object is also a valid JSON object:

```ruby
{"name": "John", "age": 30, "isActive": true}
```

> Keys are double-quoted strings and all values use standard JSON types.
> **Child objects MUST always be enclosed in curly braces `{}`.** Only the top-level object may
> use the open form; every nested or embedded object **MUST** use the closed form.

## Invalid forms

<!-- io:test per-line -->
```ruby
{John age: 25 gender: M}   # ✗ unexpected-token — a key cannot follow an unseparated value
```

A missing comma between two *values* is not an error, because an open string may contain spaces:

```ruby
---
{name: John Doe 25}        # → { name: "John Doe 25" } — one value, not three
```

## Member names are unique

A member name **MUST NOT** appear more than once in the same object. A document that repeats one
is invalid, and the error is [`duplicate-member`](../../parsing-and-errors/error-model.md).

<!-- io:test per-line -->
```ruby
{a: 1, a: 2}               # ✗ duplicate-member
{a: 1, "a": 2}             # ✗ duplicate-member — quoting is a spelling, not a different name
```

The rule holds **whether or not a schema is in force.** A schema decides what a member may
CONTAIN; it does not decide whether a name may be written twice. Nothing about an object changes
when a schema is absent, so nothing about this rule does either.

> **Why this is stated so plainly.** The obvious implementation loads members into a map, and a map
> silently keeps the last write. An implementation that does the natural thing therefore accepts
> `{a: 1, a: 2}` as `{a: 2}`, discarding the first value with no diagnostic: the document says one
> thing and the loaded value is another. That is the failure this rule exists to prevent, and it is
> the reason the requirement is on the READER rather than only on the writer.

Uniqueness is per object, not per document. The same name at a different depth, in a different
record, or in a different array element is a different member:

```ruby
---
~ a: 1, o: {a: 2}          # ✓ two members named `a`, in two objects
~ x: [{a: 1}, {a: 2}]      # ✓ one per element
```

Positional members have no name and so can never collide:

```ruby
---
~ 1, 1, 1                  # ✓ three keyless members
```

## Optional behaviors

### Whitespace and formatting

Whitespace is allowed and ignored:

```ruby
{ name : John , age : 25 }
```

### Empty objects

```ruby
{}     # ✓ valid
```

### Empty values

Empty value positions (via `,,`) are valid:

```ruby
John Doe,,true,,{NY}
```

### Trailing commas

Trailing commas are allowed and ignored:

```ruby
John, 25, T,,,,
```

## Comments

Comments are allowed between entries or alongside values:

```ruby
{
  name: John,     # name of person
  age: 25,        # years old
  isActive: T
}
```

> Comments must not appear inside string literals or values.

## Access semantics

- All values are accessed by **position** (0-based).
- A keyed value **may also be accessed by key**, especially when a schema is applied.
- Keys are optional but must be **well-formed strings**.

## Member position

**With no schema in force**, a member's position is the position it was written at. Nothing else
could be meant: there is no other order to appeal to.

**With a schema in force**, position is decided by the SCHEMA, not by the document:

> A member the schema declares **MUST** occupy the position the schema declares it at, whatever
> order the document wrote it in. A member the schema does not declare — an extra permitted by an
> [open schema](../../schema-definition-language/dynamic-schema.md) — **MUST** follow every
> declared member, and extras keep the order they were written in relative to each other.

So these two records load to the same value, indistinguishable after reading:

<!-- io:test -->
```ruby
~ $schema: { name: string, age: int, city?: string }
---
~ Alice, 30, NYC              # positional
~ city: NYC, age: 30, name: Alice   # keyed, in no particular order
```

In both, `name` is at index 0, `age` at 1, `city` at 2.

> **Why this binds the reader, not just the writer.** Keyed values exist so a document does not
> have to know the schema's field order — that is the whole point of writing `age: 30` instead of
> counting commas. If the reader then preserved the document's order, position would silently mean
> two different things for the same data depending on how it was written, and code that reads by
> index would break on a document that is entirely valid. The schema is the single answer to
> "what is at index 1", and it must be the answer on every path into the value — parsed from
> text, loaded from a host language, or built up a member at a time.

This is the same order a writer emits (see
[Key Emission](../../serialization/key-emission.md#ordering)); one rule, stated once for reading
and once for writing, so a document round-trips through the value model unchanged.

## Preservation of structure

Internet Object preserves:

- Value order and keyed/unkeyed structure, subject to [Member position](#member-position) above
- Whitespace (non-significant)
- Optional comments

It does **not** enforce:

- Key-based access without a schema
- The required presence of any key

Note that member names ARE required to be unique — see
[Member names are unique](#member-names-are-unique). That is a rule about the document, not a
structure the format preserves.

## Record enclosure under schema validation

A top-level record (a `~` row or a single-object section) may be written either as an **open
object** (`x, 4`) or a **closed object** (`{x, 4}`) — the enclosing braces of the record itself
are optional and equivalent.

**Without a schema there is no ambiguity.** Every enclosure level is simply a value: keyless
members are accessed positionally, so `{{{key: val}}}` is a valid record whose first member is an
object whose first member is an object — `{ "0": { "0": { "key": "val" } } }`.

The interpretation question arises only **when a schema validates the record**, because the
validator must decide whether the row *is* the record or is a **value** for the record's first
member. The rule depends on the row's first member:

| Row's first member | Reading |
| ------------------ | ------- |
| Keyed with a name the schema declares (`{o1: {a: 1}}`) | the row **is the record**; members bind by name |
| Keyed with a name the schema does not declare (`{key: val}`) | the whole row is the **value of member 0** |
| Positional / un-keyed (`{x}`, `x, 4`) | the row **is the record**; members bind by position |

So under a schema whose first member expects an object:

```ruby
~ $schema: { o1: object, o2?: object }
---
{key: val}          # → o1 = { key: val }   (undeclared key `key` → value reading)
```

```ruby
~ $schema: { o1: object, o2?: object }
---
{o1: {key: val}}    # → o1 = { key: val }   (declared key `o1` → record reading)
```

```ruby
~ $schema: { o1: object, o2?: object }
---
{{key: val}}        # → o1 = { key: val }   (explicit enclosure)
```

All three decode identically here, but only the last two say so *explicitly* — see the
best-practice guidance below.

Disambiguation rules:

1. **Trailing content removes the ambiguity.** `{key: val}, 5` is a two-member record — the closed
   object binds to the first member, `5` to the second. No extra enclosure is needed.
2. **The reading does not depend on how many members the schema declares.** A one-member and a
   five-member strict schema treat the same row identically.
3. **Extensible schemas (`*`) differ:** an undeclared key is a *legal extra member*, so there is nothing
   to disambiguate and the row binds as the record — except where the schema declares exactly one
   member, which keeps the value reading.

**Writer guidance (normative for serializers).** When a record serializes to exactly one value and
that value's text begins with `{`, the writer MUST enclose the record (`{{…}}`). Writers must never
depend on the arity- or openness-dependent behavior above — always emit the unambiguous form.

## Best practice: preventing ambiguity

> **When a schema's first member is object-typed, do not write the record in the open form.**
> Close the object, or name the member. The reading above is well-defined, but the open form
> leaves the author's intent implicit; the closed and keyed forms state it.

This matters whenever a record's **first (position 0) member is object-typed**, because that is
when "the record's own enclosure" and "an object value for member 0" are both plausible readings of
the same text. Use one of the following unambiguous forms — each binds identically regardless of
schema arity or openness.

**1. Enclose the record explicitly (positional).** Outer braces for the record, inner for the value:

```ruby
~ $schema: { o1: object, o2?: object }
---
{{key: val}}          # o1 = { key: val }
```

**2. Name the target member** (recommended for hand-authored documents). A key removes the guess
entirely, and reads better:

```ruby
o1: {key: val}        # open record, keyed member
{o1: {key: val}}      # closed record, keyed member — same result
```

**3. Rely on trailing content only when it exists.** A record with more than one member is never
ambiguous — the closed object binds to member 0:

```ruby
~ $schema: { o1: object, n: number }
---
{key: val}, 5         # o1 = { key: val }, n = 5
```

### Silent-failure cases to watch for

The ambiguity does not always announce itself with an error. Two cases decode **successfully but
differently from the author's intent**:

- **Key collision.** If the intended value's keys happen to match schema member names, the record
  reading succeeds and produces a different shape — with no diagnostic:

  ```ruby
  ~ $schema: { o1: object, o2?: object }
  ---
  {o1: {a: 1}, o2: {b: 2}}     # → o1={a:1}, o2={b:2}     (record reading)
  {{o1: {a: 1}, o2: {b: 2}}}   # → o1={o1:{a:1},o2:{b:2}} (value reading — intended)
  ```

- **Extensible schemas.** When the schema is extensible (`*`) and declares more than one member, an undeclared
  key is a *legal extra member*, so the row is read as the record and the object the author meant
  as a value silently becomes extras:

  ```ruby
  ~ $schema: { o1?: object, o2?: object, * }
  ---
  {key: val}          # → { key: val } as an EXTRA — o1 and o2 are simply absent
  ```

  If the declared members are required, this surfaces as `missing-value` rather than pointing at
  the real mistake.

**Schema-design note.** Placing a non-object member first does *not* remove the hazard — the row is
still absorbed as that member's value, it just fails on type instead:

```ruby
~ $schema: { a: string, b?: string }
---
{key: val}            # ✗ expected-string — the whole row was bound to `a`
```

The reliable protections are the explicit forms above, not member ordering or member type.

## See Also

- [Value Representations](README.md) — all value types
- [Strings](string/README.md) — valid keys and string values
- [Object (SchemaDef)](../../schema-definition-language/data-types/object.md) — schemas for objects
- [Comments](../comments.md) — comment syntax
- [JSON Compatibility](../../json-compatibility.md) — round-tripping with JSON
