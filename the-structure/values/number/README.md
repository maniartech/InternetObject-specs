---
description: The numeric value forms — Number, BigInt, and Decimal.
---

# Numeric Values

Internet Object provides accurate numeric representation for everything from simple counting to
exact financial arithmetic. It supports three numeric forms — **Number**, **BigInt**, and
**Decimal** — each suited to a different requirement.

## Numeric forms

- [Number](number.md) — a 64-bit IEEE 754 double-precision value, for general-purpose
  calculations and fractional values.
- [BigInt](bigint.md) — an arbitrary-precision integer, for whole numbers beyond the 64-bit
  range.
- [Decimal](decimal.md) — a fixed-precision decimal with exact arithmetic, for financial
  values and other cases that require precise decimal representation.

## Number bases and notations

Internet Object accepts several notations. The table distinguishes integer-only bases from
fractional notations and gives a recommendation.

> **Integer-only bases.** Binary (base 2), octal (base 8), and hexadecimal (base 16) can
> represent only integers. For fractional values, use base-10 decimal or scientific notation.

| Notation | Supported forms | Recommendation |
|----------|-----------------|----------------|
| Decimal integer (base 10) | Number, BigInt | BigInt for large integers; Number for general use |
| Decimal fractional | Number, Decimal | Decimal for exact/financial values; Number otherwise |
| Binary (base 2) | Number, BigInt | BigInt for large binary integers; Number otherwise |
| Octal (base 8) | Number, BigInt | BigInt for large octal integers; Number otherwise |
| Hexadecimal (base 16) | Number, BigInt | BigInt for large hex integers; Number otherwise |
| Scientific notation | Number, Decimal | Decimal for precise values; Number otherwise |
| Special values | Number only | [NaN and Infinity](nan-and-infinity.md) for undefined/infinite results |

## Distinguishing the forms

Each form is identified by a distinct suffix (Number has none):

```ruby
42          # Number  (standard floating-point)
42n         # BigInt  (arbitrary-precision integer)
42.50m      # Decimal (fixed-precision decimal)
```

> **Two senses of "decimal".** *Decimal (base 10)* is the common numeral system used by all
> forms. *Decimal (the form)* is the fixed-precision type for exact arithmetic.

## Choosing a form

| Use case | Recommended form | Reason |
|----------|------------------|--------|
| General calculations | Number | Standard performance and compatibility |
| Financial amounts | Decimal | Exact precision, no rounding error |
| Large counters or IDs | BigInt | No precision limit for integers |
| Scientific notation | Number | Built-in floating-point support |
| Cryptographic values | BigInt | Handles arbitrarily large integers |

## See Also

- [Value Representations](../README.md) — all value types
- [NaN and Infinity](nan-and-infinity.md) — special numeric values (Number only)
- [Numeric Types](../../../schema-definition-language/data-types/number/README.md) — numeric schemas and constraints
