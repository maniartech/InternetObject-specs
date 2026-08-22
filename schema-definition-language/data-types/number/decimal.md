---
status: candidate
description: The decimal type — fixed-precision decimal numbers.
---

# Decimal

The **`decimal`** type validates an exact, fixed-precision decimal — for money and other
values where binary floating point would lose accuracy. In data it is written with an `m`
suffix: `123.45m`.

> For the literal syntax, see [Decimal values](../../../the-structure/values/number/decimal.md).

## TypeDef

A `decimal` MemberDef accepts only the options below. Any other key is invalid.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `decimal`. First positional value. |
| `default` | decimal | Value used when the member is omitted. Second positional value. |
| `choices` | array of decimal | Restricts the value to a fixed set. |
| `precision` | int | Maximum total number of significant digits. |
| `scale` | int | Exact number of digits after the decimal point. |
| `min` | decimal | Minimum allowed value (inclusive). |
| `max` | decimal | Maximum allowed value (inclusive). |
| `multipleOf` | decimal | The value must be an exact multiple of this. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

### No format option

Unlike the other numeric types, `decimal` has **no `format` option** — and this is deliberate,
not an omission. A `format` selects among the literals that can express a value, and a decimal
has only one: `<digits>.<digits>m`. Radix notations cannot express a fractional value, and
[scientific notation is not part of the decimal literal](../../../the-structure/values/number/decimal.md)
(`1.23e2m` is invalid). With a single possible spelling there is nothing to select.

The `m` suffix is always written; without it the output would read back as a plain number.

## Precision & scale

`precision` and `scale` together give SQL-style `DECIMAL(precision, scale)` validation:

- **scale** — the number of fractional digits MUST equal `scale`.
- **precision** — the total significant digits MUST NOT exceed `precision`.

```ruby
price: { decimal, precision: 5, scale: 2 }
---
~ 123.45m    # ✓  (5 digits, 2 after the point)
```

```ruby
rate: { decimal, scale: 2 }
---
~ 1.5m       # ✗ mismatched-scale  (1 fractional digit, scale requires 2)
```

> With neither `precision` nor `scale`, a `decimal` is compared by its exact value.

## Optional, nullable & defaults

Resolution follows the [common rules](README.md#optional-nullable--defaults):

```ruby
amount?*: decimal
---
~ {}      # ✓ omitted → absent
~ N       # ✓ null
~ 9.99m   # ✓
```

## See Also

* [Decimal values](../../../the-structure/values/number/decimal.md)
* [Numeric Types](README.md) · [BigInt](bigint.md)
* [TypeDef](../../typedef.md) · [MemberDef](../../memberdef.md)
