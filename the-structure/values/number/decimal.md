---
description: Fixed-precision decimal values for financial and high-precision computations
---

# Decimal

A **Decimal** in Internet Object represents fixed-precision decimal values designed for applications that require exact numeric calculations, especially financial computations where floating-point precision issues could lead to significant errors. Decimal is a scalar primitive that stores exact numeric values with a defined precision and scale.

Unlike standard floating-point numbers (which may suffer from approximation issues), Decimal values maintain exact precision throughout arithmetic operations, ensuring accurate and predictable results.

## Syntax

A Decimal value is expressed as a number with the `m` suffix:

```ebnf
decimal = decimalValue | scientificDecimal

decimalValue = ["-" | "+"] digit+ ["." digit+] "m"
scientificDecimal = decimalValue ("e" | "E") ["-" | "+"] digit+

digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

## Structural Characters

| Symbol | Name           | Unicode  | Description                    |
| ------ | -------------- | -------- | ------------------------------ |
| `m`    | Decimal Suffix | `U+006D` | Identifies value as Decimal    |
| `0-9`  | Digits         | Multiple | Standard decimal digits        |
| `.`    | Decimal Point  | `U+002E` | Separates integer and fraction |
| `-`    | Minus Sign     | `U+002D` | Indicates negative numbers     |
| `e`/`E`| Exponent       | Multiple | Scientific notation exponent   |

## Valid Forms

### Basic Decimal Values

```ruby
123.45m              # Fractional decimal
123m                 # Integer decimal
0.001m               # Leading zeros
-789.01m             # Negative decimal
```

### Scientific Notation

```ruby
1.23e2m              # Equivalent to 123m
1.23e-2m             # Equivalent to 0.0123m
5e3m                 # Equivalent to 5000m
```

## Optional Behaviors

### Fixed-Precision Arithmetic

Decimal values maintain their precision throughout operations:

```ruby
0.1m + 0.2m          # 0.3m (exact representation)
# Compare with floating-point: 0.1 + 0.2 ≈ 0.30000000000000004
```

### Precision and Scale

Each Decimal value is defined by:
- **Precision**: Total number of significant digits
- **Scale**: Number of digits after the decimal point

```ruby
123.45m              # Precision: 5, Scale: 2
0.000123m            # Precision: 6, Scale: 6
```

### Empty Representation

Zero as a decimal:

```ruby
0m                   # Zero decimal
0.0m                 # Zero with scale
```


## Invalid Forms

```ruby
123.45               # ❌ Missing 'm' suffix (should be 123.45m)
123.45mm             # ❌ Multiple suffixes not allowed (should be 123.45m)
m123.45              # ❌ Suffix must be at the end (should be 123.45m)
.45m                 # ❌ Must have leading digit (should be 0.45m)
123.m                # ❌ Must have trailing digit if decimal point used (should be 123.0m or 123m)
```

## Preservation of Structure


Internet Object preserves:

- Exact decimal precision and scale
- The chosen representation form (standard vs scientific notation)
- Syntactic fidelity (as written, except that an explicit plus sign is not preserved)

However, it does **not** interpret:

* Rounding behavior for operations
* Domain-specific precision requirements
* Currency or unit semantics

Such semantics are the responsibility of the **schema layer**, **validators**, or **application logic**.

## See Also

- [Number Types Overview](./README.md) - Launcher for all number types and formats
- [Number](./number.md) - For standard floating-point numbers
- [BigInt](./bigint.md) - For arbitrary-precision integers
- [Values](../../values/README.md)