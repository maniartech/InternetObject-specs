---
description: Defining Object Schema n Internet Object
---

# Object Type

The `object` type is the core building block for representing structured, complex data in Internet Object schemas.

## Syntax

```internet-object
# Simple
user: { name: string, age: int }

# With Constraints (MemberDef)
user: { object, schema: { name: string }, optional: T }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for the `object` MemberDef itself.

```internet-object
type: { string, choices: [object] },
default?: object,
schema?: { object, default: {} },
optional?: bool,
null?: bool
```


## Constraints

### Schema Constraints (Structure)
The `schema` option defines the expected structure of the object.

```internet-object
# Explicit schema definition
user: {
  object,
  schema: {
    name: string,
    age: int
  }
}

# Implicit schema (shorthand)
user: { name: string, age: int }
```

### Optionality and Nullability

```internet-object
# Optional object (can be omitted)
settings?: { theme: string }

# Nullable object (can be null)
profile*: { bio: string }

# Both
metadata?*: { version: int }
```

### Default Values

```internet-object
# Default empty object
config: { object, default: {} }

# Default with values
options: {
  object,
  schema: { verbose: bool },
  default: { verbose: T }
}
```

## Examples

```internet-object
# Schema
preferences?: {
  object,
  schema: { color: string, size: int },
  default: { color: "blue", size: 12 }
}
---
# Valid Values
~ { color: "red", size: 10 }  # Valid: Matches schema
~ {}                          # Valid: Uses defaults (if applied by parser)
```

## Invalid Examples

```internet-object
# Schema
user: { name: string, age: int }
---
# Invalid Values
~ { name: "Alice" }         # Fail: Missing required field 'age'
~ { name: "Bob", age: "X" } # Fail: 'age' must be an int
~ "Charlie"                 # Fail: Wrong type (string)
```

## Validation Behavior

1. **Type check**: Value must be an object (key-value pairs).
2. **Schema check**:
    * Validate that all required keys in `schema` are present.
    * Validate that all present keys are defined in `schema` (unless open schema).
    * Recursively validate each field against its MemberDef.
3. **Null check**: If value is `null`, check if `null: T` is set.
4. **Optional check**: If key is missing, check if `optional: T` is set or apply `default`.


## Implementation Notes

* **Structure**: Objects are unordered collections of key-value pairs.
* **Schema Validation**: When a `schema` is provided, the implementation must validate that all present keys exist in the schema (unless open schema rules apply) and that their values match the defined types.
* **Nullability**: An object field marked as `null: T` can store a null value. This is distinct from `optional: T`, which allows the key to be entirely missing.
