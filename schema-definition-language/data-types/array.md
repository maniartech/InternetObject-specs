---
status: candidate
description: The array type — ordered, typed collections of values.
---

# Array

The **`array`** type validates an ordered list of values. Unlike a scalar type, an array is a
**container**: besides constraining the list itself (its length), you declare the type of its
**elements**. An array with no element type accepts items of any type.

> For the array *value* syntax (`[a, b, c]`), see
> [Arrays](../../the-structure/values/array.md). This page covers the array *schema* type.

## Declaring the element type

There are two equivalent ways to declare what an array holds: the **`[ … ]` shorthand** and
the keyed **`of:`** form.

```ruby
tags: array                  # any array (elements unconstrained)
tags: []                     # same — any array
tags: [string]               # array of strings (shorthand)
tags: { array, of: string }  # array of strings (keyed form)
```

The element type may be any type, an inline object shape, or a
[reference](../../the-definitions/schema-references.md):

```ruby
people:  [{ name, age, role }]    # array of objects (inline shape)
authors: [$person]                # array of a referenced schema
```

> **The shorthand holds a *type*, not constraints.** Use `[ … ]` for a bare element type
> (`[string]`, `[[int]]`, `[{ name: string }]`). To add **list-level** constraints such as
> `len`, switch to the keyed form: `{ array, of: string, len: 3 }`. Writing constraints
> inside the brackets — `{ [string], len: 3 }` — is **not valid** and raises a syntax error.

## TypeDef

An `array` MemberDef accepts only the options below. Any other key is invalid.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `array`. |
| `default` | array | Value used when the member is omitted. |
| `of` | type / MemberDef | The element type. Equivalent to the `[ … ]` shorthand. |
| `len` | int ≥ 0 | Exact number of elements required. |
| `minLen` | int ≥ 0 | Minimum number of elements. |
| `maxLen` | int ≥ 0 | Maximum number of elements. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix on the key. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix on the key. |

> **`len` precedence.** When `len` is set, `minLen` and `maxLen` are ignored.

## Constraints

### Element type (`of`)

Each element MUST satisfy the element type, or validation fails per item:

```ruby
scores: [int]
---
~ [1, 2, 3]      # ✓
~ [1, two, 3]    # ✗ expected-integer on the second item
```

### len / minLen / maxLen

```ruby
top3: { array, of: string, len: 3 }
---
~ [a, b, c]      # ✓
~ [a, b]         # ✗ mismatched-len — must have exactly 3 items
```

```ruby
tags: { array, of: string, minLen: 1 }
---
~ []             # ✗ mismatched-min-len — must have at least 1 item
~ [a]            # ✓
```

### default

Applies only when the member is omitted; must be a valid array.

```ruby
tags?: { array, of: string, default: [] }
```

## Nested and multidimensional arrays

An element type may itself be an array, giving nested or fixed-size multidimensional arrays.
Both forms below are valid:

```ruby
# Array of arrays of integers (shorthand)
matrix: [[int]]
---
~ [[1, 2], [3, 4]]
```

```ruby
# Fixed 3×3 integer matrix (keyed form, with len)
grid: { array, of: { array, of: int, len: 3 }, len: 3 }
---
~ [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
```

## Optional, nullable & defaults

```ruby
tags?: [string]    # optional (key may be missing)
tags*: [string]    # nullable (value may be N)
tags?*: [string]   # optional and nullable
```

The suffixes attach to a bare member name. A name that has to be quoted uses the equivalent
options — `"a,b": { array, of: string, optional: T }` — as described in
[MemberDef](../memberdef.md#optional-nullable-and-default).

| Input | Result |
| ----- | ------ |
| value present, valid | the array |
| not an array | `expected-array` error |
| item count outside `minLen`/`maxLen`/`len` | `mismatched-min-len` / `mismatched-max-len` / `mismatched-len` error |
| an item fails `of` | the item type's own error, e.g. `expected-string` |
| value is `N` (null), key is nullable (`*`) | `null` |
| value is `N` (null), key is **not** nullable | `forbidden-null` error |
| value omitted, `default` set | the default |
| value omitted, key optional (`?`), no default | absent |
| value omitted, required, no default | `missing-value` error |

## Implementation status (beta)

- The `{ [type], …constraints }` combined form is not supported (use `{ array, of: type, … }`).

## Examples

Adapted from the playground (all forms below parse):

```ruby
anything:    array,                              # any array
strings:     [string],                           # array of strings
min2strings: { array, of: { string, minLen: 2 }, minLen: 2 },
objects:     { array, of: { name, age, role } }
---
[1, two], [aa, bbb], [aaa, bbbb], [{ John Doe, 25, Student }, { Jane Doe, 30, Teacher }]
```

## See Also

* [Arrays (value syntax)](../../the-structure/values/array.md)
* [Object (SchemaDef)](object.md) — for object element shapes
* [Schema References](../../the-definitions/schema-references.md) — reusable element types
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
