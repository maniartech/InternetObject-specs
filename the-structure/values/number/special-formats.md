---
description: Hexadecimal, octal, binary, and scientific numeric literals.
---

# Special Numeric Formats

Besides ordinary decimal, a number may be written in **hexadecimal**, **octal**, **binary**,
or **scientific** notation. These are just different ways of writing the same numeric value —
the parser reads them all into one number.

| Notation | Prefix / form | Example | Value |
| -------- | ------------- | ------- | ----- |
| Decimal | *(none)* | `255` | 255 |
| Hexadecimal | `0x` | `0xFF` | 255 |
| Octal | `0o` | `0o377` | 255 |
| Binary | `0b` | `0b11111111` | 255 |
| Scientific | `e` exponent | `2.55e2` | 255 |

```ruby
dec: number, hex: number, oct: number, bin: number, sci: number
---
255, 0xFF, 0o377, 0b11111111, 2.55e2
```

All five fields above hold the value `255`.

## Notes

- A leading sign is allowed: `-0x1A`, `+1.5e3`.
- Notation is independent of the field's type — any number type accepts any notation as input.
- How a number is **written back** on serialization is controlled by the schema's `format`
  option (`decimal`, `hex`, `octal`, `binary`, `scientific`); see [Numeric Types](../../../schema-definition-language/data-types/number/README.md).
- For very large integers use [BigInt](bigint.md) (`123n`); for exact decimals use
  [Decimal](decimal.md) (`1.50m`).

## See Also

- [Number](number.md) · [BigInt](bigint.md) · [Decimal](decimal.md)
- [NaN and Infinity](nan-and-infinity.md)
