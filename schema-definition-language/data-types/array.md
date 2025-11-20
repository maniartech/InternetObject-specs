# Array Type

The `array` type represents an ordered list of values. It can be constrained by the type of items it contains (`of`), its length (`len`, `minLen`, `maxLen`), and other standard options.

## Syntax

```internet-object
# Simple (Any array)
tags: array
# OR
tags: []

# Typed Array
scores: [int]

# With Constraints (MemberDef)
scores: { array, of: int, maxLen: 10 }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for the `array` MemberDef itself.

```internet-object
type: { string, choices: [array] },
default?: array,
of?: { any, __memberdef: T },
len?: { int, min: 0 },
minLen?: { int, min: 0 },
maxLen?: { int, min: 0 },
optional?: bool,
null?: bool
```

## Constraints

### Item Type (`of`)
The `of` option specifies the type or schema definition for the items in the array.

```internet-object
# Array of strings
tags: { array, of: string }

# Array of objects with schema
users: {
  array,
  of: {
    object,
    schema: { name: string, age: int }
  }
}
```

### Length Constraints (`len`, `minLen`, `maxLen`)
These options constrain the number of items in the array.

```internet-object
# Exact length (must have exactly 2 items)
coordinates: { [number], len: 2 }

# Range length (must have between 1 and 5 items)
tags: { [string], minLen: 1, maxLen: 5 }
```

## Examples

```internet-object
# Schema
tags: { [string], minLen: 1, maxLen: 10 }
---
# Valid Values
~ ["news", "tech"]  # Valid: Array of strings within length
~ ["one"]           # Valid: Min length
```

## Invalid Examples

```internet-object
# Schema
tags: { [string], minLen: 2 }
---
# Invalid Values
~ ["one"]       # Fail: Too few items (length 1)
~ [1, 2]        # Fail: Items are not strings
~ "not-array"   # Fail: Wrong type (string)
```

## Validation Behavior

1. **Type check**: Value must be an array (list).
2. **Length check**: If `len`/`minLen`/`maxLen` specified, verify array length.
3. **Item check**: If `of` is specified, iterate through all items and validate each against the `of` definition.

## Implementation Notes

* **Storage**: Arrays should be stored using the most efficient list/vector structure available in the host language.
* **Type Homogeneity**: While the `array` type itself can hold mixed types (if `of` is not specified or is `any`), it is best practice to use homogeneous arrays (same type for all items) for better performance and schema clarity.
* **Validation**: Parsers must validate every item in the array against the `of` definition.

