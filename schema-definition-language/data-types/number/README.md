---
status: candidate
description: The number type and its family of integer, unsigned, and float shortcuts.
---

# Numeric Types

The **`number`** type validates a numeric value. It is the base of a small family of
**predefined shortcuts** — `int`, `uint`, `int8`, `byte`, and so on — where each shortcut is
simply `number` with a fixed set of constraints baked in. For example, `int8` is `number`
restricted to whole values in −128…127.

> Two related numeric types have their own pages: [BigInt](bigint.md) (arbitrary-precision
> integers, suffix `n`) and [Decimal](decimal.md) (fixed-precision decimals, suffix `m`).
> For how numbers are *written* (decimal, hex, octal, binary, scientific, `NaN`, `Inf`), see
> [Numeric Values](../../../the-structure/values/number/README.md).

## The number family

Each name below is the base `number` type plus preset constraints. A conformant validator
MUST recognize all of these names.

| Type | Whole number? | Range |
| ---- | ------------- | ----- |
| `number` | no | IEEE-754 double |
| `float` | no | IEEE-754 double |
| `int` | yes | unbounded integer |
| `uint` | yes | integer ≥ 0 |
| `int8` | yes | −128 … 127 |
| `uint8` / `byte` | yes | 0 … 255 |
| `int16` | yes | −32 768 … 32 767 |
| `uint16` | yes | 0 … 65 535 |
| `int32` | yes | −2 147 483 648 … 2 147 483 647 |
| `uint32` | yes | 0 … 4 294 967 295 |

`byte` is an alias for `uint8`. A value outside a type's range MUST be rejected with an
`invalid-range` error:

```ruby
age: int8
---
~ 200      # ✗ invalid-range — int8 max is 127
```

> **Whole-number rule.** The `int`/`uint`/`int8…32`/`uint8…32` shortcuts MUST reject values
> with a fractional part (`int` accepts `42`, not `42.5`). `number` and `float` accept any
> finite double.

> **Reserved (not yet supported).** `int64`, `uint64`, `float32`, and `float64` are reserved
> for future use; the reference implementation currently rejects them.

## TypeDef

A `number` MemberDef accepts only the options below. Any other key is invalid.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | Type name (`number` or any family member). First positional value. |
| `default` | number | Value used when the member is omitted. Second positional value. |
| `choices` | array of number | Restricts the value to a fixed set. Third positional value. |
| `min` | number | Minimum allowed value (inclusive). |
| `max` | number | Maximum allowed value (inclusive). |
| `multipleOf` | number | The value must be an exact multiple of this. |
| `format` | string | *Presentation, write-only.* Notation used when writing: `decimal` (default), `hex`, `octal`, `binary`, `scientific`. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix on the key. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix on the key. |

## Constraints

### min / max

Inclusive bounds. A value outside the bounds is rejected with `invalid-range`.

```ruby
age: { number, min: 18, max: 25 }
---
~ 18     # ✓
~ 25     # ✓
~ 35     # ✗ invalid-range
```

> An explicit `min`/`max` **replaces** a shortcut's built-in bound rather than narrowing it —
> e.g. `{ int8, min: -200 }` currently accepts −200. See *Implementation status* below.

### multipleOf

The value must be an exact multiple of the given number.

```ruby
rollNo: { number, multipleOf: 5 }
---
~ 10     # ✓
~ -10    # ✓
~ 12     # ✗ — must be a multiple of 5
```

### choices

Restricts the value to a fixed set. As the third positional value it may omit the key.

```ruby
code: { number, choices: [234, 245, 456] }
---
~ 245    # ✓
~ 5      # ✗ invalid-choice
```

### format

Controls how the number is **written** on serialization. It is
[write-only](../../memberdef.md#constraints-and-presentation): it does not restrict which input
notations are accepted (any [notation](../../../the-structure/values/number/README.md) is read).

```ruby
flags: { uint16, format: hex }      # written as 0xff
mask:  { uint8,  format: binary }   # written as 0b11111111
```

The base prefix is part of the written literal, and a sign precedes it (`-0xff`). A value with a
fractional part has no radix literal, so a radix `format` does not apply to it and the decimal
notation is written instead.

## Special values

`NaN` and `Inf`/`-Inf` are valid only for `number`/`float`. When combined with a numeric
bound, the reference implementation currently coerces them to `null` rather than validating
them — see *Implementation status*.

## Optional, nullable & defaults

How a member resolves (verified behavior):

| Input | Result |
| ----- | ------ |
| value present, valid | the value |
| value present, out of range | `invalid-range` error |
| value is `N` (null), key is nullable (`*`) | `null` |
| value is `N` (null), key is **not** nullable | `null-not-allowed` error |
| value omitted, `default` set | the default |
| value omitted, key optional (`?`), no default | absent |
| value omitted, required, no default | `value-required` error |

```ruby
a?: { number, 7 }    # optional with default 7  →  omitted yields 7
b*: number           # nullable  →  N yields null
c?*: number          # optional and nullable
```

> **Use the `*` suffix for nullability.** The keyed `null: T` option is part of the TypeDef
> but is **not currently honored** — only the `*` suffix enables null. (See below.)

## Implementation status (beta)

A few behaviors on this page describe the agreed target; the reference implementation is
catching up:

- **Whole-number enforcement** for the `int` family is not yet applied (`int` currently
  accepts `3.14`).
- **`byte`** alias is being added (currently only `uint8` is recognized).
- **Explicit `min`/`max`** can widen a shortcut's range (under review).
- **`NaN`/`Inf`** under a bound resolve to `null` (under review).
- **Keyed `null:`** is not honored; use the `*` suffix.

## Examples

A schema mixing notations and family members (adapted from the playground):

```ruby
~ $row: { hex: uint8, oct: uint8, bin: uint8, dec: number, sci: { number, min: 999999999 } }
--- rows: $row
~ 0x11, 0o2, 0b11, 10, 4.329e+10
~ 0x22, 0o3, 0b100, 20, 2.329e+20
```

Any input notation works for any number type — `0x11`, `0o21`, `0b10001`, and `17` all denote
the same value.

## See Also

* [Numeric Values](../../../the-structure/values/number/README.md) — how numbers are written
* [BigInt](bigint.md) · [Decimal](decimal.md) — related numeric types
* [TypeDef](../../typedef.md) · [MemberDef](../../memberdef.md) — how type options work
