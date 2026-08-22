---
status: candidate
description: The bigint type — arbitrary-precision integers.
---

# BigInt

The **`bigint`** type validates an arbitrary-precision integer — values too large for the
double-based `number` family (see [Numeric Types](README.md)). In data it is written with an
`n` suffix: `123n`, `0xFFn`.

> For the literal syntax, see [BigInt values](../../../the-structure/values/number/bigint.md).

## TypeDef

A `bigint` MemberDef accepts only the options below. Any other key is invalid.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `bigint`. First positional value. |
| `default` | bigint | Value used when the member is omitted. Second positional value. |
| `choices` | array of bigint | Restricts the value to a fixed set. |
| `min` | bigint | Minimum allowed value (inclusive). |
| `max` | bigint | Maximum allowed value (inclusive). |
| `multipleOf` | bigint | The value must be an exact multiple of this. |
| `format` | string | *Presentation, write-only.* Base used when writing: `decimal` (default), `hex`, `octal`, `binary`, `scientific`. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

### format

Selects the base a writer uses. It is [write-only](../../memberdef.md#constraints-and-presentation) —
any notation is still accepted as input.

The base prefix and the `n` suffix are both part of the written literal, so the output re-parses
as the same bigint:

```ruby
mask: { bigint, format: hex }
---
~ 255n                  # ✓ accepted — written back as 0xffn
~ 0xffn                 # ✓ the same value
```

| `format` | `255n` is written | `1200000n` is written |
| -------- | ----------------- | --------------------- |
| `decimal` (default) | `255n` | `1200000n` |
| `hex` | `0xffn` | `0x124f80n` |
| `octal` | `0o377n` | `0o4447600n` |
| `binary` | `0b11111111n` | `0b100100100111110000000n` |
| `scientific` | `255e0n` | `12e5n` |

> A bigint has no fractional part, so its scientific mantissa is an integer and its exponent is
> never negative: trailing zeros move into the exponent, and a value with none is written `e0`.

## Examples

```ruby
id: bigint
---
~ 123n                  # ✓
~ 0xFFn                 # ✓ (255)
~ 99999999999999999999999999999n   # ✓
```

```ruby
big: { bigint, min: 100n }
---
~ 50n     # ✗ mismatched-min
```

## Optional, nullable & defaults

Resolution follows the [common rules](README.md#optional-nullable--defaults):

```ruby
id?*: bigint    # optional + nullable
---
~ {}     # ✓ omitted → absent
~ N      # ✓ null
~ 7n     # ✓
```

## See Also

* [BigInt values](../../../the-structure/values/number/bigint.md)
* [Numeric Types](README.md) · [Decimal](decimal.md)
* [TypeDef](../../typedef.md) · [MemberDef](../../memberdef.md)
