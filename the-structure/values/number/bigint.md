---
status: candidate
description: Arbitrary-precision integer values for very large whole numbers.
---

# BigInt

A **BigInt** is an arbitrary-precision integer — a whole number with no upper or lower size
limit. It suits values that exceed the safe range of a standard Number, such as cryptographic
quantities, large identifiers, and high-volume counters.

A standard Number is exact only for integers within roughly ±2^53−1 (about ±9 quadrillion). A
BigInt stays exact at any magnitude.

## Syntax

A BigInt is written as an integer with the `n` suffix:

```ebnf
bigint = ["-" | "+"] (decimalBigInt | binaryBigInt | octalBigInt | hexBigInt)

decimalBigInt = digit+ "n"
binaryBigInt  = "0b" binaryDigit+ "n"
octalBigInt   = "0o" octalDigit+ "n"
hexBigInt     = "0x" hexDigit+ "n"

digit       = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
binaryDigit = "0" | "1"
octalDigit  = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"
hexDigit    = digit | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f"
```

## Structural characters

| Symbol | Name | Unicode | Description |
| ------ | ---- | ------- | ----------- |
| `n` | BigInt suffix | `U+006E` | Marks the value as a BigInt |
| `0`–`9` | Digits | Multiple | Decimal digits |
| `-` | Minus sign | `U+002D` | Negative value |
| `0b` | Binary prefix | Multiple | Begins a binary BigInt |
| `0o` | Octal prefix | Multiple | Begins an octal BigInt |
| `0x` | Hex prefix | Multiple | Begins a hexadecimal BigInt |

## Valid forms

### Decimal BigInt

```ruby
123n                 # positive BigInt
-42n                 # negative BigInt
0n                   # zero
9007199254740992n    # beyond the safe Number range
```

### Alternative bases

A BigInt can also be written in binary, octal, or hexadecimal — each still ending in `n`. The
following are all equal to `42n`:

```ruby
---
42n, 0x2An, 0b101010n, 0o52n
```

## Invalid forms

These are genuine syntax errors:

<!-- io:test per-line -->
```ruby
0xn                  # ✗ invalid-number — missing hex digits
0bn                  # ✗ invalid-number — missing binary digits
```

A BigInt holds whole numbers only, so a fractional BigInt is an error:

```ruby
---
123.45n              # ✗ a BigInt cannot have a fractional part (use Decimal)
```

> **Lenient fallbacks.** A malformed suffix does not raise an error — it falls back to an open
> string. `123nn` parses as the text `"123nn"`, and `n123` as the text `"n123"`. A conformant
> parser SHOULD instead reject these; they are tracked as implementation issues.

## Preservation of structure

Internet Object preserves:

- The chosen notation (decimal, binary, octal, hex)
- Exact integer precision at any magnitude
- Syntactic fidelity as written, except that an explicit `+` sign is not preserved

It does **not** interpret:

- Mathematical relationships between values
- Domain-specific constraints on large integers

Those semantics belong to the schema, the validator, or the application.

## See Also

- [Numeric Values](README.md) — all numeric forms
- [Number](number.md) — standard floating-point numbers
- [Decimal](decimal.md) — fixed-precision decimal arithmetic
