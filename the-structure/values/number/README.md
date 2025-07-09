---
description: Numbers in Internet Object
---

# Numbers

**Numbers** in Internet Object provide accurate numerical representation for various applications, from simple counting to complex financial calculations. Internet Object supports three distinct numeric data types—**Number**, **BigInt**, and **Decimal**—each designed to meet different numerical requirements in modern applications.

## Number Types

- **[Number](./number.md)** (64-bit floating-point): Standard IEEE 754 double-precision numbers, ideal for general-purpose calculations and fractional values.
- **[BigInt](./bigint.md)**: Arbitrary-precision integers for extremely large whole numbers that exceed 64-bit limitations.
- **[Decimal](./decimal.md)**: Fixed-precision decimal values with exact arithmetic, essential for financial calculations and applications requiring precise decimal representation.

## Number Formats





Internet Object supports various number formats. The table below distinguishes between decimal integers and regular (floating-point) numbers, and provides recommendations:

> **Note:** Bases other than decimal (base 10)—that is, binary (base 2), octal (base 8), and hexadecimal (base 16)—can only represent integers, not fractional or decimal values. For non-integer values, use decimal (base 10) or scientific notation.

| Format                      | Supported Types           | Recommendation/Use Case                                                    |
|-----------------------------|--------------------------|----------------------------------------------------------------------------|
| Decimal integer (base 10)   | Number, BigInt           | BigInt: large integers, Number: general-purpose integers                   |
| Decimal (floating-point)    | Number, Decimal          | Decimal: financial/precise decimals, Number: general-purpose decimals      |
| Binary (base 2)             | Number, BigInt           | BigInt: large binary integers, Number: general binary values               |
| Octal (base 8)              | Number, BigInt           | BigInt: large octal integers, Number: general octal values                 |
| Hexadecimal (base 16)       | Number, BigInt           | BigInt: large hex integers, Number: general hex values                     |
| Scientific notation         | Number, Decimal          | Decimal: precise scientific/financial, Number: general scientific          |
| Special values              | Number only              | [NaN and Infinity](./nan-and-infinity.md) for undefined/infinite results   |

## Type Identification

Each number type uses a distinct suffix for identification:

```ruby
42          # Number (standard floating-point)
42n         # BigInt (arbitrary-precision integer)
42.50m      # Decimal (fixed-precision decimal)
```


## Special Numeric Values

See **[Special Numeric Values: NaN and Infinity](./nan-and-infinity.md)** for details on undefined and infinite results (supported only by Number).

> **Note**: Alternative base formats (binary, octal, hexadecimal) are documented within each number type specification.

## Type Selection Guide

| Use Case | Recommended Type | Reason |
|----------|------------------|---------|
| General calculations | Number | Standard performance and compatibility |
| Financial amounts | Decimal | Exact precision, no rounding errors |
| Large counters/IDs | BigInt | No precision limits for integers |
| Scientific notation | Number | Built-in floating-point support |
| Cryptographic values | BigInt | Handles arbitrarily large integers |

> **Note**: The term "decimal" is used in two contexts:
> - **Decimal (base-10)**: The common numeral system used by all number types
> - **Decimal (data type)**: A specific fixed-precision type for exact arithmetic

## See Also

* [Values](../README.md) - Overview of all Internet Object value types
* [Schema for Numbers](../../../schema-definition-language/data-types/number/README.md) - Number validation and constraints







