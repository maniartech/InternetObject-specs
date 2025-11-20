# Number Type

The `number` type represents numeric values, including integers and floating-point numbers. It supports various subtypes for specific numeric ranges and behaviors.

## Syntax

```internet-object
# Simple
field: number

# With Constraints (MemberDef)
field: { number, option: value, ... }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for the `number` MemberDef itself. It ensures that when you define a number field in your schema, you are using valid options and constraints.

```internet-object
type: { string, choices: [number, int, byte, int16, int32, decimal, bigint] },
default?: number,
choices?: [number],
min?: number,
max?: number,
multipleOf?: number,
format?: { string, choices: [decimal, hex, octal, binary, scientific] },
optional?: bool,
null?: bool
```

## Subtypes

* **`number`**: Generic numeric type (includes floats and integers).
* **`int`**: Integer values only.
* **`byte`**: 8-bit integer.
* **`int16`**: 16-bit integer.
* **`int32`**: 32-bit integer.
* **`decimal`**: High-precision decimal numbers (useful for financial data).
* **`bigint`**: Arbitrary-precision integers.

## Constraints

### Range Constraints (`min`, `max`)
The `min` and `max` options restrict the numeric range of the value (inclusive).

```internet-object
# Age must be between 0 and 120
age: { int, min: 0, max: 120 }

# Probability must be between 0.0 and 1.0
probability: { number, min: 0.0, max: 1.0 }
```

### Multiples (`multipleOf`)
The `multipleOf` option ensures the value is a multiple of the specified number.

```internet-object
# Must be an even number
evenNumber: { int, multipleOf: 2 }

# Time in 15-minute intervals
minutes: { int, multipleOf: 15 }
```

### Choices (`choices`)
The `choices` option restricts the value to a specific set of allowed numbers (Enum).

```internet-object
# Only specific values allowed
status: { int, choices: [0, 1, -1] }
```

### Formatting (`format`)
The `format` option controls how the number is displayed when serialized. It does not affect the value itself, only its representation.

Supported formats: `decimal` (default), `hex`, `octal`, `binary`, `scientific`.

```internet-object
# Display as Hexadecimal (e.g., 0xFF)
color: { int, format: hex }

# Display in Scientific Notation (e.g., 1.5e+3)
distance: { number, format: scientific }
```

## Examples

```internet-object
# Schema
score: { int, min: 0, max: 100, multipleOf: 2 }
---
# Valid Values
~ 50    # Valid: Even and within range
~ 0     # Valid: Min value
~ 100   # Valid: Max value
```

## Invalid Examples

```internet-object
# Schema
age: { int, min: 0, max: 120 }
---
# Invalid Values
~ -1     # Fail: Less than min
~ 150    # Fail: Greater than max
~ 25.5   # Fail: Not an integer (subtype mismatch)
~ "25"   # Fail: Wrong type (string)
```

## Validation Behavior

1. **Type check**: Value must be a number.
2. **Subtype check**: If `int`, `byte`, etc., verify value fits the type (e.g., is an integer).
3. **Range check**: If `min`/`max` specified, verify value is within bounds.
4. **Multiple check**: If `multipleOf` specified, verify `value % multipleOf == 0`.
5. **Choice check**: If `choices` specified, value must be in list.

## Implementation Notes

* **Precision**: Implementations should handle the precision requirements of subtypes like `int`, `int32`, `decimal`, etc., appropriate to the host language.
* **BigInt**: The `bigint` type should be used for integers that exceed the safe integer limit of the host environment (e.g., > 2^53 - 1 in JavaScript).
* **Formatting**: The `format` option is primarily a hint for serialization. Parsers should be able to read numbers in any standard format regardless of the `format` constraint, unless strict mode is enforced.
