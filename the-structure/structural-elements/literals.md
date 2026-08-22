---
status: candidate
description: Predefined constant values — booleans, null, and special numbers.
---

# Literals

Literals are predefined constant values that represent common data states and special values.
They offer a concise way to express boolean values, null states, and special numeric values
without quotes or extra syntax.

## Supported literals

Internet Object supports the following literals:

| Literal | Type | Represents | Case sensitive |
|---------|------|------------|----------------|
| `true` | Boolean | True value | Yes |
| `T` | Boolean | True value (short form) | Yes |
| `false` | Boolean | False value | Yes |
| `F` | Boolean | False value (short form) | Yes |
| `null` | Null | Null / empty value | Yes |
| `N` | Null | Null / empty value (short form) | Yes |
| `Inf` | Number | Positive infinity | Yes |
| `-Inf` | Number | Negative infinity | Yes |
| `NaN` | Number | Not a Number | Yes |

## Examples

```ruby
# Boolean literals
~ isActive: true, verified: F, isDeleted: false, visible: T

# Null literals
~ middleName: null, nickname: N

# Special numeric literals
~ maxValue: Inf, minValue: -Inf, result: NaN
```

## Rules

- **Case sensitive** — literals **MUST** use exact case; `True`, `FALSE`, and `NULL` are invalid.
- **No quotes** — literals are written without quotes; quoting one makes it an ordinary string.
- **Short forms** — `T`, `F`, and `N` are single-letter shortcuts for `true`, `false`, and
  `null`.

## See Also

- [Booleans](../values/booleans.md) — the boolean type in detail
- [Nulls](../values/null.md) — null and optional values
- [NaN and Infinity](../values/number/nan-and-infinity.md) — special numeric values
