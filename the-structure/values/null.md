---
description: The null value — an explicit absence of a value.
---

# Nulls

A **null** represents the absence of a value — data that is missing, unknown, or intentionally
empty. Null is a scalar value with a compact and a verbose form.

## Syntax

```ebnf
null        = compactNull | verboseNull
compactNull = "N"
verboseNull = "null"
```

## Structural elements

| Token | Name | Description |
| ----- | ---- | ----------- |
| `N` | Compact null | `null` in compact form |
| `null` | Verbose null | the verbose null keyword |

## Valid forms

The compact and verbose forms are equivalent; the compact form is recommended for terse data.

```ruby
---
N, null
```

## Null versus empty

Null is the *absence* of a value, distinct from an empty string or an empty array:

```ruby
N        # null — no value
""       # an empty string (a value)
[]       # an empty array (a value)
```

## Not null

Null keywords are **case-sensitive and spelled exactly**. Any other token is not an error — it
is parsed as an open string, so it is *not* null:

```ruby
n                    # open string "n", not null
NULL                 # open string "NULL", not null
Null                 # open string "Null", not null
nil                  # open string "nil", not null
undefined            # open string "undefined", not null
```

> To store one of these as text, that is exactly what happens. To express the absence of a
> value, write `N` or `null`.

## See Also

- [Value Representations](README.md) — all value types
- [Booleans](booleans.md) — true and false
- [Optional & nullable members](../../schema-definition-language/memberdef.md) — `?` and `*` in schemas
