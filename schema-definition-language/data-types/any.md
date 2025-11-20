# Any Type

The `any` type is a flexible type that can accept values of any data type. It is useful when the type of a field is not known in advance or can vary.

## Syntax

```internet-object
# Simple
data: any

# With Constraints (MemberDef)
data: { any, optional: T }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for the `any` MemberDef itself.

```internet-object
type: { string, choices: [any] },
default?: any,
choices?: array,
anyOf?: { array, of: { type: any, __memberdef: T } },
isSchema?: { bool, default: F },
optional?: bool,
null?: bool
```

## Constraints

### Choices (`choices`)
The `choices` option restricts the value to a specific set of allowed values, which can be of mixed types.

```internet-object
# Accepts only specific values
status: { any, choices: [1, "active", T] }
```

### Union Types (`anyOf`)
The `anyOf` option allows the value to match one of several specified types or schemas.

```internet-object
# Accepts either a string or a number
id: { any, anyOf: [string, number] }

# Accepts either a specific object structure or null
config: { any, anyOf: [{ host: string, port: int }, null] }
```

## Examples

Any kind of value can be assigned to an `any` type field, subject to any constraints defined.

```internet-object
# Schema
data: any
---
# Valid Values
~ 42                # Valid: number
~ "Hello, World!"   # Valid: string
~ T                 # Valid: boolean
~ [1, 2, 3]        # Valid: array
~ { key: "value" }  # Valid: object
```

## Invalid Examples

```internet-object
# Schema
status: { any, choices: [1, "active"] }
---
# Invalid Values
~ 2           # Fail: Not in choices
~ "inactive"  # Fail: Not in choices
~ N           # Fail: Not nullable
```

```internet-object
# Schema
id: { any, anyOf: [string, number] }
---
# Invalid Values
~ T               # Fail: Boolean matches neither string nor number
~ {}              # Fail: Object matches neither string nor number
```

## Validation Behavior

1. **Type check**: Always passes (unless `anyOf` restricts it).
2. **Choice check**: If `choices` specified, value must be in list.
3. **AnyOf check**: If `anyOf` specified, value must validate against at least one of the provided types/schemas.

## Implementation Notes

* **Type Safety**: When using `any`, parsers should still validate the value against the constraints if provided (e.g., `choices` or `anyOf`).
* **AnyOf Validation**: For `anyOf`, the parser should try to match the value against each type/schema in the list. The first successful match determines the type.
