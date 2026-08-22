---
status: candidate
description: Fixed-precision decimal values for exact, financial-grade arithmetic.
---

# Decimal

A **Decimal** is a fixed-precision decimal value for cases that demand exact numbers —
especially financial calculations, where floating-point approximation can introduce errors. A
Decimal stores an exact value with a defined precision and scale.

Unlike a standard floating-point Number, a Decimal does not approximate: `0.1m` is exactly
one-tenth, not the nearest binary fraction.

## Syntax

A Decimal is written as a number with the `m` suffix. It requires a leading digit and, if a
decimal point is present, at least one digit after it. Scientific notation is **not** supported.

```ebnf
decimal = ["-" | "+"] digit+ [ "." digit+ ] "m"

digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
```

## Structural characters

| Symbol | Name | Unicode | Description |
| ------ | ---- | ------- | ----------- |
| `m` | Decimal suffix | `U+006D` | Marks the value as a Decimal |
| `0`–`9` | Digits | Multiple | Decimal digits |
| `.` | Decimal point | `U+002E` | Separates the integer and fractional parts |
| `-` | Minus sign | `U+002D` | Negative value |

## Valid forms

```ruby
---
123.45m, 123m, 0.001m, -789.01m, 0m, 0.0m
```

- `123.45m` — fractional decimal
- `123m` — integer decimal
- `0.001m` — leading zeros preserved
- `-789.01m` — negative decimal
- `0m`, `0.0m` — zero, with and without a scale

## Precision and scale

Each Decimal carries a **precision** (the total number of significant digits) and a **scale**
(the number of digits after the decimal point):

```ruby
123.45m              # precision 5, scale 2
0.000123m            # precision 6, scale 6
```

A schema can constrain these; see [Decimal](../../../schema-definition-language/data-types/number/decimal.md).

## Invalid forms

A Decimal requires a leading digit and, with a decimal point, a trailing digit. Scientific
notation is rejected:

```ruby
---
1.23e2m              # ✗ scientific notation is not supported for Decimal
```

<!-- io:test per-line -->
```ruby
.45m                 # ✗ invalid-decimal — missing leading digit (use 0.45m)
123.m                # ✗ invalid-decimal — missing trailing digit (use 123.0m or 123m)
```

A **doubled** suffix is not an error. `123.45mm` is an [open string](../string/open-strings.md),
by the same rule that makes `12mm` one: nothing in it announced a decimal, because the `m` that
would have done so is followed by more text. See
[A number, or a word that begins with a digit?](number.md#a-number-or-a-word-that-begins-with-a-digit).

```ruby
---
123.45mm             # → "123.45mm" — a string; write "123.45m" for the decimal
```

> A plain `123.45` (no `m`) is a valid **Number**, not a Decimal — the `m` suffix is what
> selects fixed precision.

## Preservation of structure

Internet Object preserves:

- Exact decimal precision and scale
- Syntactic fidelity as written, except that an explicit `+` sign is not preserved

It does **not** interpret:

- Rounding behavior for operations
- Currency or unit semantics

Those semantics belong to the schema, the validator, or the application.

## See Also

- [Numeric Values](README.md) — all numeric forms
- [Number](number.md) — standard floating-point numbers
- [BigInt](bigint.md) — arbitrary-precision integers
