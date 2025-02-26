---
description: Unbounded integer values for handling extremely large numbers
---

# BigInt (Work In Progress)

## Overview

The **BigInt** type in Internet Object represents arbitrary-precision integers that can handle numeric values exceeding the limitations of standard 64-bit number representations. This makes BigInt essential for applications that need to process extremely large whole numbers with perfect precision, such as cryptographic operations, large-scale counting, or mathematical computations requiring unbounded integer arithmetic.

Unlike the regular Number type, which is limited to safe integers within approximately ±9 quadrillion (±2^53-1), BigInt can represent integers of arbitrary length, ensuring that large numerical operations remain exact regardless of magnitude.

## Representation and Syntax

A BigInt value in Internet Object is represented as an integer with the `n` suffix:

```
123n
-9007199254740992n
0n
```

### Basic BigInt Literals

```
// Simple BigInt values
42n                    // Positive BigInt
-42n                   // Negative BigInt
0n                     // Zero as BigInt
9007199254740992n      // Beyond Number.MAX_SAFE_INTEGER
```

### Alternative Numeric Bases

BigInt values can be expressed in different numeric bases:

```
// Binary (base 2)
0b1010n               // 10 in decimal

// Octal (base 8)
0o7777n               // 4095 in decimal

// Hexadecimal (base 16)
0xFFn                 // 255 in decimal
0xFFFFFFFFFFFFFn      // 281474976710655 in decimal
```

## Key Concepts

### Arbitrary Precision

BigInt values are not subject to the precision limitations that affect standard floating-point numbers:

```
// With regular Number type
Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2  // true (precision loss)

// With BigInt type
9007199254740991n + 1n === 9007199254740991n + 2n           // false (exact precision)
9007199254740991n + 1n                                      // 9007199254740992n
9007199254740991n + 2n                                      // 9007199254740993n
```

### Integer-Only Operations

BigInt values represent whole numbers only and do not support fractional components:

```
// Valid BigInt operations
5n + 3n               // 8n
5n * 3n               // 15n
5n / 3n               // 1n (integer division, truncates toward zero)
5n % 3n               // 2n (remainder)
```

### Type Compatibility

BigInt is a distinct data type and cannot be implicitly mixed with regular numbers:

```
// Type mixing (not valid in Internet Object)
5n + 3                // Type mismatch error
5n == 5               // Type mismatch error
```

## Schema Definition and Validation

When used with Internet Object schemas, BigInt types can be defined and validated:

```
{
  counter: {
    type: bigint,
    min: 0n,             // Minimum value constraint
    max: 9999999999999n  // Maximum value constraint
  }
}
```

The BigInt type supports these validation properties:

- **min/max**: Validates value range
- **choices**: Limits valid values to a predefined set
- **optional**: Specifies if the field is optional
- **null**: Determines if null values are allowed

## Operations and Behavior

### Arithmetic Operations

BigInt supports these arithmetic operations:

```
// Addition
123n + 456n               // 579n

// Subtraction
123n - 456n               // -333n

// Multiplication
123n * 456n               // 56088n

// Division (integer division only)
456n / 123n               // 3n

// Remainder (modulo)
456n % 123n               // 87n

// Exponentiation
2n ** 64n                 // 18446744073709551616n
```

### Bitwise Operations

BigInt supports standard bitwise operations:

```
// Bitwise AND
0b1010n & 0b1100n         // 0b1000n (8n)

// Bitwise OR
0b1010n | 0b1100n         // 0b1110n (14n)

// Bitwise XOR
0b1010n ^ 0b1100n         // 0b0110n (6n)

// Bitwise NOT
~0b1010n                  // -11n (inversion includes sign)

// Left shift
0b1010n << 1n             // 0b10100n (20n)

// Right shift
0b1010n >> 1n             // 0b0101n (5n)
```

### Comparisons

BigInt values can be compared as expected:

```
123n > 456n               // false
123n < 456n               // true
123n === 123n             // true
```

## Use Cases and Examples

BigInt types are particularly valuable in:

1. **Cryptography** - key generation, hash calculations
2. **Large-scale counting** - web analytics, statistics
3. **Financial ledgers** - tracking very large monetary amounts
4. **Mathematical computations** - number theory, combinatorial calculations
5. **IDs and timestamps** - high-precision time tracking, unique identifiers

### Cryptographic Example

```
{
  algorithm: "RSA",
  publicKey: {
    modulus: 1867431611794592534620604166919008498448797009295n,
    exponent: 65537n
  },
  signature: 1452133446677997070585089536550796766870541628012n
}
```

### Analytics Counter Example

```
{
  pageViews: {
    total: 9007199254740992n,
    monthly: 751253271728n,
    weekly: 187813317932n,
    daily: 26830473990n
  }
}
```

## Best Practices

1. **Use for Whole Numbers Only**: BigInt is designed for integer operations and does not support fractional values.

2. **Consider Performance Implications**: BigInt operations may be slower than standard number operations, especially for very large values.

3. **Explicit Type Conversions**: When interfacing with systems that don't support BigInt, explicitly convert values to ensure compatibility.

4. **Range Constraints**: Even though BigInt can represent arbitrarily large values, consider setting practical min/max limits in schemas to prevent excessive resource usage.

5. **Avoid Mixing with Regular Numbers**: Maintain type consistency by not mixing BigInt with standard numbers in operations.

## Technical Considerations

When implementing or working with BigInt values, keep these points in mind:

1. **Memory Usage**: BigInt values can consume significantly more memory than standard numbers, especially for very large values.

2. **Serialization**: When serializing to formats that don't natively support BigInt (like standard JSON), values must be represented as strings or custom formats.

3. **Integer Division**: Division with BigInt always produces integer results (truncated toward zero), which may require special handling for fractional calculations.

4. **No Decimal Point**: BigInt does not support decimal points or fractional values; for such needs, use the Number or Decimal types.

5. **Implementation Model**: Many BigInt implementations use a variable-length sequence of bits to represent integers of arbitrary size, providing theoretical support for numbers limited only by available memory.
