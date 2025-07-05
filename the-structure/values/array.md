---
description: Arrays in Internet Object
---

# Arrays

## Overview

An **Array** in Internet Object represents an ordered collection of values enclosed in square brackets. Arrays are scalar containers used to express lists, sequences, and multi-dimensional tabular structures.

Each value in an array may be:
- A primitive (string, number, boolean, null),
- A structured value (object or another array).

Internet Object arrays are syntactically compact, support nesting, and avoid ambiguity by enforcing strict value presence and disallowing trailing or elided elements.

---

## Syntax

An array begins with `[` and ends with `]`, containing zero or more comma-separated values.

```ebnf
array = "[" [ value *("," value) ] "]"
```

In the above grammar, `value` refers to any valid Internet Object value as defined in the [Values section](../values/README.md). The exact syntax and behavior of each value type (e.g., strings, numbers, booleans, objects, arrays, null) are defined separately in their respective type specifications.

## Structural Characters

| Symbol | Name                 | Unicode  | Description                   |
| ------ | -------------------- | -------- | ----------------------------- |
| `[`    | Open Square Bracket  | `U+005B` | Starts an array               |
| `]`    | Close Square Bracket | `U+005D` | Ends an array                 |
| `,`    | Comma                | `U+002C` | Separates values within array |

## Valid Forms

```ruby
[]                       # Empty array
[apple, banana, cherry]  # String values
[1, 2, 3]                # Number values
[T, F, N]                # Boolean and null values
[{x:1}, {y:2}]           # Array of objects
[1, [2, 3], [4, [5, 6]]] # Nested arrays
[[1,2],[3,4]]            # 2D array
```

## Optional Behaviors

### Whitespace and Formatting

Whitespace is permitted around elements and structural characters for readability.

```ruby
[ a , b , c ]   # Valid
```

All forms with equivalent value structure are interpreted identically.

### Empty Representation

An empty array is written as:

```ruby
[]
```
This represents a valid array with no elements.

### Nesting

Arrays may contain other arrays, allowing arbitrarily deep structures.

```ruby
[1, [2, 3], [[4]]]
```

## Comments

Comments are allowed around and within arrays, as long as they comply with Internet Object's general comment syntax.

```ruby
[
  1, 2,  # inline comment
  3
]
```

> Comments must not break value boundaries. Embedded comment styles (like inside strings or object keys) are not permitted.

## Invalid Forms

```ruby
[a, b, ]     # ❌ Trailing comma
[a,,c]       # ❌ Elided value
[ , ]        # ❌ Missing value
[,a]         # ❌ Starts with comma
[a b c]      # ❌ Missing separators
```

### Corrected Versions

```ruby
[a, b]       # ✅ Valid
[a, null, c] # ✅ Use null for missing values
```

## Preservation of Structure

Internet Object preserves:

* Value order
* Whitespace (non-significant in interpretation)
* Syntactic fidelity (as written)

However, it does **not** interpret:

* The meaning of order
* Whether values must be unique

Such semantics are the responsibility of the **schema layer**, **validators**, or **application logic**.

## See Also

* [Schema for Arrays](../../schema-definition-language/data-types/array.md)

