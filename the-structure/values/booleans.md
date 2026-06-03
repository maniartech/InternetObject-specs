---
description: Boolean values — true and false, in compact and verbose forms.
---

# Booleans

A **boolean** is a logical value, either true or false. Booleans are scalar values used for
flags, binary states, and conditions.

Each value has a compact and a verbose form, letting you trade brevity for explicitness.

## Syntax

```ebnf
boolean        = compactBoolean | verboseBoolean
compactBoolean = "T" | "F"
verboseBoolean = "true" | "false"
```

## Structural elements

| Token | Name | Description |
| ----- | ---- | ----------- |
| `T` | Compact true | `true` in compact form |
| `F` | Compact false | `false` in compact form |
| `true` | Verbose true | the verbose true keyword |
| `false` | Verbose false | the verbose false keyword |

## Valid forms

The compact and verbose forms are equivalent; the compact form is recommended for terse data.

```ruby
---
T, F, true, false
```

## Not a boolean

Boolean keywords are **case-sensitive and spelled exactly**. Any other token is not an error —
it is parsed as a different value type, so it is *not* a boolean:

```ruby
t                    # open string "t", not true
TRUE                 # open string "TRUE", not true
True                 # open string "True", not true
1                    # the number 1, not true
0                    # the number 0, not false
```

> Under a `bool` schema, a non-boolean value fails validation with `not-a-bool`. Without a
> schema, the values above are simply kept as their parsed type (string or number).

## See Also

- [Value Representations](README.md) — all value types
- [Nulls](null.md) — the absence of a value
- [Bool](../../schema-definition-language/data-types/bool.md) — the boolean schema type
