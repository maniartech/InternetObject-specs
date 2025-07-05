---
description: Objects in Internet Object
---

# Objects

Objects are a fundamental element in Internet Object documents, providing a clear and intuitive way to represent structured data.

An object is expressed as **a sequence of values (and key/value pairs) separated by commas** (`,` `U+002C`). For simplicity, clarity, and ease of reading, Internet Object supports two modes for objects:

- **Open Objects** — do not require curly braces and are allowed **only at the top level**.
- **Closed Objects** — are enclosed in `{}` and may appear at any level.

Objects may contain:
- **Sequential (unkeyed) values**
- **Inline keyed values** (`key: value`)
- A combination — but only if **unkeyed values appear before any keys**

All values in an object are accessed by **position** (0-based).
If a value has a key, it may also be accessed by **key** — especially when a schema is applied.

> Once a keyed value appears, all subsequent values **must also be keyed**.
> Mixing unkeyed values **after** a key is **invalid**.

🧩 **Design Note:**
In the early stages of its design, Internet Object was envisioned as a compact, expressive serialization format focused on transmitting structured objects across the internet. The name “Internet Object” was born out of this **object-oriented serialization** model — structurally similar to formats like JSON.

As the format evolved, it adopted a **document-oriented approach**, enabling richer representation through sections, schemas, metadata, and stream-friendly constructs. However, the object remains the core unit of structure, and the compact syntax continues to reflect its original vision.

⚙️ **Implementation Note:**
In many programming languages, the term `Object` refers to a built-in or base type. To avoid conflicts, libraries and parsers implementing Internet Object may use a distinct class or type name such as `InternetObject`.
For example, in JavaScript:

```js
const obj = new InternetObject()
````

Here, `obj` is an instance of a class that represents an Internet Object — conforming fully to the object syntax and behavior defined in this specification.

---

## Syntax

### Closed Object

```ebnf
object         = "{" [ objectEntries ] "}"
objectEntries  = [ unkeyedSegment [ "," keyedSegment ] ]

unkeyedSegment = unkeyedValue *( "," unkeyedValue )
keyedSegment   = keyedValue *( "," keyedValue )

unkeyedValue   = value
keyedValue     = key ":" value

key            = string
value          = any valid Internet Object value
```

### Open Object

```ebnf
objectOpen = objectEntries
```

> Keys must be valid [strings](../string.md).
> Values must be valid [Internet Object values](../values/README.md).
> Once a keyed value appears, no unkeyed values may follow.

---

## Structural Characters

| Symbol | Name                | Unicode  | Description                           |
| ------ | ------------------- | -------- | ------------------------------------- |
| `{`    | Open Curly Bracket  | `U+007B` | Begins a closed object                |
| `}`    | Close Curly Bracket | `U+007D` | Ends a closed object                  |
| `:`    | Colon               | `U+003A` | Separates keys from values            |
| `,`    | Comma               | `U+002C` | Separates values or key–value entries |

---

## Valid Forms

### Open Object with Unkeyed Values

```ruby
John Doe, 25, T
```

### Closed Object with Unkeyed Values

```ruby
{John Doe, 25, T}
```

### Mixed (Unkeyed → Keyed)

```ruby
John Doe, age: 25, gender: M
```

```yaml
{
  John Doe,
  25,
  isActive: T,
  address: {Bond Street, New York, NY}
}
```

### Fully Keyed Object

```yaml
{
  name: John Doe,
  age: 25,
  gender: M,
  isActive: T
}
```

### Keys as Strings (Quoted Forms)

```yaml
{
  "name": John Doe,
  'isActive': T,
  address: {Bond Street, New York, NY}
}
```

### JSON-Compatible Object Example

The following Internet Object is also a valid JSON object:

```ruby
{"name": "John", "age": 30, "isActive": true}
```

> Keys are double-quoted strings and all values use standard JSON types.

> 🔒 **Child objects must always be enclosed in curly braces `{}`.**
> Only the top-level object may use the open form. All nested or embedded objects must use **closed object syntax**.

---

## Invalid Forms

```ruby
~ name: John, Doe, 25        # ❌ Unkeyed values after a key
~ {a: 1, b}                  # ❌ Unkeyed value follows keyed entry
~ {1, 2, x: 3, y: 4, 5}      # ❌ Final value is unkeyed
```

---

## Optional Behaviors

### Whitespace and Formatting

Whitespace is allowed and ignored:

```ruby
{ name : John , age : 25 }
```

### Empty Objects

```ruby
{}     # ✅ Valid
```

### Empty Values

Empty value positions (via `,,`) are valid:

```ruby
John Doe,,true,,{NY}
```

### Trailing Commas

Trailing commas are allowed and ignored:

```ruby
John, 25, T,,,,
```

---

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

---

## Access Semantics

* All values are accessed by their **position** (0-based).
* If a key is provided, the value **may also be accessed via key**, especially when schema is applied.
* Keys do not affect the value’s index position.
* Once a **key appears**, all following values **must be keyed**.
* Keys are optional but must be **well-formed strings**.

---

## Preservation of Structure

Internet Object preserves:

* Value order and keyed/unkeyed structure
* Whitespace (non-significant)
* Optional comments

It does **not** enforce:

* Key uniqueness
* Key-based access without schema
* Required presence of keys

## See Also

* [Values](../values/README.md)
* [Strings (Keys)](./string/README.md)
* [Schema for Objects](../../schema-definition-language/data-types/object.md)
* [Comments](../syntax/comments.md)
* [JSON Compatibility](../../json-compatibility.md)
