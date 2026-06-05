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
> **Child objects must always be enclosed in curly braces `{}`.** Only the top-level object may
> use the open form; every nested or embedded object must use the closed form.

## Invalid forms

```ruby
{name: John Doe 25}        # ✗ missing commas between values
{John age: 25 gender: M}   # ✗ missing commas between values
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
- Keys do not affect a value's index position.
- Keys are optional but must be **well-formed strings**.

## Preservation of structure

Internet Object preserves:

- Value order and keyed/unkeyed structure
- Whitespace (non-significant)
- Optional comments

It does **not** enforce:

- Key uniqueness
- Key-based access without a schema
- The required presence of any key

## See Also

- [Value Representations](README.md) — all value types
- [Strings](string/README.md) — valid keys and string values
- [Object (SchemaDef)](../../schema-definition-language/data-types/object.md) — schemas for objects
- [Comments](../comments.md) — comment syntax
- [JSON Compatibility](../../json-compatibility.md) — round-tripping with JSON
