---
status: candidate
description: The core characters that organize and delimit data in an Internet Object document.
---

# Structural Characters & Separators

Structural characters define the syntax and organization of data within an Internet Object
document. They form the foundation of the format's grammar and control how data is parsed and
interpreted.

## Character set

| Symbol | Name | Unicode | Function | Context |
|--------|------|---------|----------|---------|
| `,` | Comma | `U+002C` | Value separator | Separates items in arrays and objects |
| `~` | Tilde | `U+007E` | Record delimiter | Marks the start of a new record in a collection |
| `:` | Colon | `U+003A` | Key-value separator | Separates a key from its value |
| `[` | Open square bracket | `U+005B` | Array start | Begins an array |
| `]` | Close square bracket | `U+005D` | Array end | Ends an array |
| `{` | Open curly bracket | `U+007B` | Object start | Begins an object |
| `}` | Close curly bracket | `U+007D` | Object end | Ends an object |
| `---` | Triple hyphen | `U+002D` | Section separator | Separates the header and data sections |
| `#` | Hash | `U+0023` | Comment delimiter | Starts a single-line comment |
| `"` | Double quote | `U+0022` | String delimiter | Encloses a string value |
| `'` | Single quote | `U+0027` | String delimiter | Alternative string delimiter |

## Usage examples

### Basic structure

```ruby
# Surrounding braces define the object,
# and key-value pairs are separated by colons and commas
~ { name: "John Doe", age: 30, active: true }

# An array encloses its values in square brackets
~ [ "item1", "item2", "item3" ]
```

### Collections and records

```ruby
# Schema definition
~ $person: {name: string, age: number}
# Triple hyphens separate the header from the data
---
# A tilde marks each new record in the collection
~ "Alice", 25
~ "Bob", 30
~ "Charlie", 35
```

### String delimiters

```ruby
{
    message1: "Hello World",      # Double-quoted string
    message2: 'Hello World',      # Single-quoted (equivalent)
    quote: "She said \"hi\""      # Escape an inner quote with a backslash
}
```

For values that contain many backslashes — such as Windows paths or regular expressions — use a
[raw string](../values/string/raw-strings.md) (`r"C:\Temp\new"`), where backslashes are
literal.

## Structural rules

- **Balanced delimiters** — every opening bracket or brace must have a matching closing one.
- **Proper nesting** — structures may nest but must preserve a well-formed hierarchy.
- **Separator consistency** — commas separate elements at the same structural level.
- **Section division** — triple hyphens (`---`) separate the header and data sections.
- **Comment scope** — a hash (`#`) comment extends to the end of the line only.
- **String equivalence** — single and double quotes are functionally equivalent.

## See Also

- [Other Special Characters](other-special-characters.md) — variable, schema, and sign modifiers
- [Literals](literals.md) — predefined constant values
- [Comments](../comments.md) — comment syntax and usage
- [The Structure](../../the-collections/collection.md) — collection structure and records
