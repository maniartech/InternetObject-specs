---
status: candidate
description: Array value syntax — ordered, comma-separated collections of values.
---

# Arrays

An **array** is an ordered collection of values enclosed in square brackets. Arrays are
containers used to express lists, sequences, and multi-dimensional tabular structures.

Each value in an array may be:

- A scalar (string, number, boolean, null), or
- A structured value (an object or another array).

Arrays are syntactically compact, support nesting, and avoid ambiguity by requiring every
value to be present — trailing and elided elements are not allowed.

## Syntax

An array begins with `[` and ends with `]`, containing zero or more comma-separated values.

```ebnf
array = "[" [ value *("," value) ] "]"
```

Here, `value` is any valid Internet Object value, as defined in
[Value Representations](README.md). The syntax and behavior of each value type (strings,
numbers, booleans, objects, arrays, null) is defined in its own page.

## Structural characters

| Symbol | Name                 | Unicode  | Description                     |
| ------ | -------------------- | -------- | ------------------------------- |
| `[`    | Open square bracket  | `U+005B` | Starts an array                 |
| `]`    | Close square bracket | `U+005D` | Ends an array                   |
| `,`    | Comma                | `U+002C` | Separates values within an array |

## Valid forms

```ruby
[]                       # Empty array
[apple, banana, cherry]  # String values
[1, 2, 3]                # Number values
[T, F, N]                # Boolean and null values
[{x:1}, {y:2}]           # Array of objects
[1, [2, 3], [4, [5, 6]]] # Nested arrays
[[1,2],[3,4]]            # 2D array
```

## Optional behaviors

### Whitespace and formatting

Whitespace is permitted around elements and structural characters for readability.

```ruby
[ a , b , c ]   # Valid
```

All forms with an equivalent value structure are interpreted identically.

### Empty array

An empty array is written as a pair of brackets with nothing between them:

```ruby
[]
```

This is a valid array with no elements.

### Nesting

Arrays may contain other arrays, allowing arbitrarily deep structures.

```ruby
[1, [2, 3], [[4]]]
```

## Comments

Comments are allowed around and within arrays, following the format's general comment syntax.

```ruby
[
  1, 2,  # inline comment
  3
]
```

> Comments must not break value boundaries, and must not appear inside strings or object keys.

## Invalid forms

```ruby
[a, b, ]     # ✗ trailing comma
[a,,c]       # ✗ elided value
[ , ]        # ✗ missing value
[,a]         # ✗ starts with a comma
[a b c]      # ✗ missing separators
```

### Corrected versions

```ruby
[a, b]       # ✓ valid
[a, null, c] # ✓ use null for a missing value
```

## Preservation of structure

Internet Object preserves:

- Value order
- Whitespace (non-significant in interpretation)
- Syntactic fidelity (as written)

It does **not** interpret:

- The meaning of order
- Whether values must be unique

Those semantics belong to the schema, the validator, or the application.

## See Also

- [Value Representations](README.md) — all value types
- [Objects](object.md) — the other structured value
- [Array](../../schema-definition-language/data-types/array.md) — schemas for arrays
