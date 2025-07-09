---
description: Unbounded integer values for handling extremely large numbers
---

# BigInt

A **BigInt** in Internet Object represents arbitrary-precision integers that can handle numeric values exceeding the limitations of standard 64-bit number representations. BigInt is a scalar primitive used for extremely large whole numbers with perfect precision, such as in cryptographic operations, large-scale counting, or mathematical computations requiring unbounded integer arithmetic.

Unlike the regular Number type, which is limited to safe integers within approximately ±9 quadrillion (±2^53-1), BigInt can represent integers of arbitrary length, ensuring that large numerical operations remain exact regardless of magnitude.

## Syntax

A BigInt value is expressed as an integer with the `n` suffix:

```ebnf
bigint = ["-" | "+"] (decimalBigInt | binaryBigInt | octalBigInt | hexBigInt)

decimalBigInt = digit+ "n"
binaryBigInt = "0b" binaryDigit+ "n"
octalBigInt = "0o" octalDigit+ "n"
hexBigInt = "0x" hexDigit+ "n"

digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
binaryDigit = "0" | "1"
octalDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"
hexDigit = digit | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f"
```

## Structural Characters

| Symbol | Name           | Unicode  | Description                    |
| ------ | -------------- | -------- | ------------------------------ |
| `n`    | BigInt Suffix  | `U+006E` | Identifies value as BigInt     |
| `0-9`  | Digits         | Multiple | Standard decimal digits        |
| `-`    | Minus Sign     | `U+002D` | Indicates negative numbers     |
| `0b`   | Binary Prefix  | Multiple | Binary number indicator        |
| `0o`   | Octal Prefix   | Multiple | Octal number indicator         |
| `0x`   | Hex Prefix     | Multiple | Hexadecimal number indicator   |

## Valid Forms

### Decimal BigInt

```ruby
123n                 # Positive BigInt
-42n                 # Negative BigInt
0n                   # Zero as BigInt
9007199254740992n    # Beyond Number.MAX_SAFE_INTEGER
```

### Alternative Bases

```ruby
0b1010n              # Binary (10 in decimal)
0o7777n              # Octal (4095 in decimal)
0xFFn                # Hexadecimal (255 in decimal)
0xFFFFFFFFFFFFFn     # Large hex BigInt
```

## Optional Behaviors

### Literal and Alternate Forms

BigInt values support multiple equivalent representations:

```ruby
42n                  # ✅ Standard decimal BigInt
0x2An                # ✅ Hexadecimal BigInt (equivalent to 42n)
0b101010n            # ✅ Binary BigInt (equivalent to 42n)
0o52n                # ✅ Octal BigInt (equivalent to 42n)
```

### Integer-Only Operations

BigInt values represent whole numbers only and do not support fractional components:

```ruby
5n + 3n              # 8n (addition)
5n * 3n              # 15n (multiplication)
5n / 3n              # 1n (integer division, truncates toward zero)
5n % 3n              # 2n (remainder)
```

### Arbitrary Precision

BigInt values maintain exact precision regardless of magnitude:

```ruby
9007199254740991n + 1n    # 9007199254740992n (exact)
9007199254740991n + 2n    # 9007199254740993n (exact)
```


## Invalid Forms

```ruby
123                  # ❌ Missing 'n' suffix (should be 123n)
123.45n              # ❌ BigInt cannot have decimal point (use Decimal for fractions)
123nn                # ❌ Multiple suffixes not allowed (should be 123n)
n123                 # ❌ Suffix must be at the end (should be 123n)
0b                   # ❌ Missing binary digits (should be 0b1n)
0xn                  # ❌ Missing hex digits (should be 0x1n)
```

## Preservation of Structure


Internet Object preserves:

- The chosen representation form (decimal, binary, octal, hex)
- Exact integer precision regardless of magnitude
- Syntactic fidelity (as written, except that an explicit plus sign is not preserved)

However, it does **not** interpret:

* Mathematical relationships between values
* Domain-specific constraints on large integers
* Performance implications of arbitrary-precision arithmetic

Such semantics are the responsibility of the **schema layer**, **validators**, or **application logic**.

## See Also

- [Number Types Overview](./README.md) - Launcher for all number types and formats
- [Number](./number.md) - For standard floating-point numbers
- [Decimal](./decimal.md) - For fixed-precision decimal arithmetic
- [Values](../../values/README.md)
