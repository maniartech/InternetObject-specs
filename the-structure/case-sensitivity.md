---
description: Case sensitivity for keys, keywords, and type names.
---

# Case Sensitivity Rules

Internet Object is **case-sensitive** throughout. Keys, keywords, and type names must be
written with exact casing.

## Keys

Member keys are distinct by case — `Name` and `name` are two different fields:

```ruby
Name: string, name: string
---
{ Name: Alice, name: alice }
```

## Keywords

The literal keywords must be written exactly as defined. Their accepted forms are:

| Meaning | Accepted | Not accepted |
| ------- | -------- | ------------ |
| true | `T`, `true` | `t`, `True`, `TRUE` |
| false | `F`, `false` | `f`, `False` |
| null | `N`, `null` | `n`, `Null` |
| not-a-number | `NaN` | `nan`, `NAN` |
| infinity | `Inf`, `-Inf` | `inf`, `Infinity` |

```ruby
active: bool
---
~ T        # ✓
~ true     # ✓
~ t        # ✗ not-a-bool
```

## Type names

Built-in type names are lowercase: `string`, `int`, `uint8`, `bool`, `datetime`, `decimal`,
and so on. `String` or `INT` are not recognized types.

## See Also

- [Booleans](values/booleans.md) · [Nulls](values/null.md)
- [Structural Characters & Separators](structural-elements/structural-characters-n-keywords.md)
