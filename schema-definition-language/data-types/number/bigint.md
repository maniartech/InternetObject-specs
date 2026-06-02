---
description: The bigint type — arbitrary-precision integers.
---

# BigInt

The **`bigint`** type validates an arbitrary-precision integer — values too large for the
double-based [`number`](README.md) family. In data it is written with an `n` suffix: `123n`,
`0xFFn`.

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
| `format` | string | Serialization base: `decimal` (default), `hex`, `octal`, `binary`. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

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
~ 50n     # ✗ invalid-range
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

## Implementation status (beta)

- Keyed `null:` is not yet honored — use the `*` suffix.

## See Also

* [BigInt values](../../../the-structure/values/number/bigint.md)
* [Numeric Types](README.md) · [Decimal](decimal.md)
* [TypeDef](../../typedef.md) · [MemberDef](../../memberdef.md)
