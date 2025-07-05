---
description: Nulls in Internet Object
---

# Null

A **Null** in Internet Object represents the absence of a value or an explicitly undefined state. Null is a scalar primitive used to indicate missing, unknown, or intentionally empty data.

Null values in Internet Object support both compact and verbose representations to balance readability and space efficiency.

## Syntax

A null value can be expressed in two forms:

```ebnf
null = compactNull | verboseNull
compactNull = "N"
verboseNull = "null"
```

## Structural Characters

| Symbol | Name         | Unicode  | Description                    |
| ------ | ------------ | -------- | ------------------------------ |
| `N`    | Uppercase N  | `U+004E` | Compact representation of null |
| `null` | Keyword null | Multiple | Verbose representation of null |

## Valid Forms

```ruby
N                    # Compact null
null                 # Verbose null
```

## Optional Behaviors

### Literal and Alternate Forms

Internet Object supports two equivalent representations for null values:

- **Compact form**: `N` (recommended)
- **Verbose form**: `null`

```ruby
N        # ✅ Recommended compact form
null     # ✅ Verbose form (equivalent to N)
```

### Empty Representation

Null explicitly represents the absence of a value, distinct from empty strings or empty arrays.

```ruby
N        # Null value
""       # Empty string (different from null)
[]       # Empty array (different from null)
```

## Invalid Forms

```ruby
n         # ❌ Lowercase not allowed
NULL      # ❌ All caps not allowed
Null      # ❌ Mixed case not allowed
nil       # ❌ Alternative keywords not allowed
undefined # ❌ Alternative keywords not allowed
```

## See Also

* [Values](../values/README.md)
* [Schema for Null Handling](../../schema-definition-language/)
