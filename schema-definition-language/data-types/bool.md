# Bool Type

The `bool` type represents boolean values: `true` (or `T`) and `false` (or `F`).

## Syntax

```internet-object
# Simple
isActive: bool

# With Constraints (MemberDef)
isActive: { bool, default: F }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for the `bool` MemberDef itself.

```internet-object
type: { string, choices: [bool] },
default?: bool,
optional?: bool,
null?: bool
```

## Constraints

### Default Values
The `default` option specifies the value to use if the field is missing.

```internet-object
# Default to false if not provided
isVerified: { bool, default: F }
```

### Optionality and Nullability
Standard `optional` and `null` constraints apply.

```internet-object
# Optional boolean
hasAgreed?: bool

# Nullable boolean
decision*: { bool, null: T }
```

## Examples

```internet-object
# Schema
isAdmin: { bool, default: F }
isDeleted?: bool
---
# Valid Values
~ T     # Valid: true
~ F     # Valid: false
```

## Invalid Examples

```internet-object
# Schema
isActive: bool
---
# Invalid Values
~ "yes"     # Fail: String is not a boolean
~ 1         # Fail: Number is not a boolean
~ N         # Fail: Not nullable by default
```

## Validation Behavior

1. **Type check**: Value must be a boolean (`true`/`false` or `T`/`F`).
2. **Null check**: If value is `null`, check if `null: T` is set.

## Implementation Notes

* **Representation**: Booleans are represented as `T` (true) and `F` (false) in Internet Object format, but should map to the host language's native boolean type.
