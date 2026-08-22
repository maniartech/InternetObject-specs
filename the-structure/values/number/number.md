---
status: candidate
description: Standard 64-bit IEEE 754 floating-point numbers.
---

# Number

A **number** is a 64-bit double-precision floating-point value conforming to IEEE 754. Numbers
are scalar values used to express integers, fractional values, and special numeric constants.

Numbers support several representations: decimal, the alternative bases (binary, octal,
hexadecimal), scientific notation, and the special values `NaN` and `Inf`.

## Syntax

A number can be written in several forms:

```ebnf
number = ["-" | "+"] (
    decimalNumber
  | binaryNumber
  | octalNumber
  | hexNumber
  | scientificNumber
) | specialValue

decimalNumber    = digit+ [ "." digit* ] | "." digit+
binaryNumber     = "0b" binaryDigit+
octalNumber      = "0o" octalDigit+
hexNumber        = "0x" hexDigit+
scientificNumber = ( digit+ [ "." digit* ] | "." digit+ ) ("e" | "E") ["-" | "+"] digit+
specialValue     = "NaN" | "Inf" | "-Inf" | "+Inf"

digit       = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
binaryDigit = "0" | "1"
octalDigit  = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"
hexDigit    = digit | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f"
```

## Structural characters

| Symbol | Name | Unicode | Description |
| ------ | ---- | ------- | ----------- |
| `0`–`9` | Digits | Multiple | Decimal digits |
| `.` | Decimal point | `U+002E` | Separates the integer and fractional parts |
| `-` | Minus sign | `U+002D` | Negative value |
| `+` | Plus sign | `U+002B` | Explicit positive value (not preserved on output) |
| `e` / `E` | Exponent | Multiple | Scientific-notation exponent |
| `0b` | Binary prefix | Multiple | Begins a binary number |
| `0o` | Octal prefix | Multiple | Begins an octal number |
| `0x` | Hex prefix | Multiple | Begins a hexadecimal number |

## Valid forms

### Decimal numbers

Decimal numbers may be integers or fractional values, with an optional sign. A leading or
trailing decimal point is allowed (`.5` and `5.`).

```ruby
# Integers
42                   # integer
-17                  # negative integer
+17                  # positive integer (explicit sign, not preserved)

# Fractional
3.14159              # fractional
-0.5                 # negative fractional
.5                   # leading dot -> 0.5
5.                   # trailing dot -> 5

# Zero
0
+0
-0
```

### Alternative bases

Numbers can be written in binary, octal, or hexadecimal. The prefix is case-insensitive, and
hex digits may be upper or lower case.

```ruby
# Binary (0b / 0B), digits 0-1
0b1010               # 10
0B1111               # 15
-0b1010              # -10

# Octal (0o / 0O), digits 0-7
0o755                # 493
0O644                # 420

# Hexadecimal (0x / 0X), digits 0-9 A-F
0xFF                 # 255
0XDeadBeef           # 3735928559
0xff                 # 255 (lower-case digits)
```

### Scientific notation

Scientific notation uses `e` or `E` (case-insensitive) for the exponent, which may be signed.

```ruby
1.23e4               # 1.23 × 10^4  = 12300
1.23e-4              # 1.23 × 10^-4 = 0.000123
-2.5e+3              # -2.5 × 10^3  = -2500
5e3                  # 5 × 10^3     = 5000
.5e2                 # 0.5 × 10^2   = 50
6.022e23             # Avogadro's number
```

### Equivalent forms

The same value can be written in several bases and notations:

```ruby
---
42, 0x2A, 0b101010, 0o52, 4.2e1
```

All five values above are `42`.

## A number, or a word that begins with a digit?

[Open strings](../string/open-strings.md) may begin with a digit, and people write such values
constantly: `3pm`, `12mm`, `007th`, part codes like `013ABSD`, version strings like `1.2.3`,
addresses like `10.0.0.1`. So a reader needs a rule for when a run of characters is a **broken
number** rather than ordinary text — and it cannot be "it looks numeric", because most of those do.

Two rules decide it.

> ### Rule 1 — all or nothing
>
> A run is a number **only if the entire run is a valid number literal.** If anything is left over,
> the whole run is an [open string](../string/open-strings.md).

> ### Rule 2 — a marker is a claim
>
> The base prefixes `0x`, `0o`, `0b` and the type suffixes `m`, `n` can only mean *number*. A run
> that carries one and is not a valid literal of that type is an **error**, not a string.

| Written | Read as | Which rule |
| ------- | ------- | ---------- |
| `0xFF`, `1.2`, `12e5`, `123.45m` | a number | Rule 1 — the whole run is valid |
| `013ABSD`, `12mm`, `3pm` | open string | Rule 1 — no marker, so nothing is claimed |
| `1.2.3`, `10.0.0.1`, `2024.01.15` | open string | Rule 1 — likewise; a version is not a number |
| `1e`, `1.23ee4`, `5em` | open string | Rule 1 — incomplete, so not a number at all |
| `0x123FG`, `0b`, `0oz` | **`invalid-number`** | Rule 2 — `0x`/`0b`/`0o` claimed a number |
| `.45m`, `123.m` | **`invalid-decimal`** | Rule 2 — `m` claimed a decimal |
| `12.3n` | **`invalid-bigint`** | Rule 2 — `n` claimed a bigint |

Rule 1 is what keeps a partial parse from **inventing a value**. `1e` is not a complete number, so
it is the string `"1e"` — never the number `1`, which is what an implementation produces if it
keeps the part it managed to read and discards the rest. That is the failure the rule exists to
prevent, and it needs no error to prevent it: text that stays text loses nothing.

Rule 2 is why `0oz` is rejected while `013ABSD` is not. Nothing in `013ABSD` says *number*; `0o`
says nothing else. Quoting is the escape hatch and is always available — `"0oz"` is simply a
string — and a writer is
[required to quote](../../../serialization/value-formatting.md#strings) any string that would
otherwise read back as a broken literal, so a value that arrives as text leaves as text.

## Invalid forms

<!-- io:test per-line -->
```ruby
0x                   # ✗ invalid-number — claimed hex, gave no digits
0b                   # ✗ invalid-number — claimed binary, gave no digits
0b 1010              # ✗ invalid-number — the space does not rescue the claim
0xGH                 # ✗ invalid-number — G and H are not hex digits
0o89                 # ✗ invalid-number — 8 and 9 are not octal digits
```

And the runs that are **not** errors, because nothing in them claims to be a number:

<!-- io:test per-line -->
```ruby
1.2.3                # → "1.2.3"      a version string
10.0.0.1             # → "10.0.0.1"   an address
1e                   # → "1e"         incomplete, so not a number
013ABSD              # → "013ABSD"    a part code
```

## Preservation of structure

Internet Object preserves:

- The chosen notation (decimal, binary, octal, hex, scientific)
- Whitespace (non-significant)
- Syntactic fidelity as written, except that an explicit `+` sign is not preserved

It does **not** interpret:

- Mathematical relationships between values
- Precision beyond IEEE 754
- Domain-specific numeric constraints

Those semantics belong to the schema, the validator, or the application.

## See Also

- [Numeric Values](README.md) — all numeric forms and notations
- [BigInt](bigint.md) — arbitrary-precision integers
- [Decimal](decimal.md) — fixed-precision decimal arithmetic
- [NaN and Infinity](nan-and-infinity.md) — special numeric values
- [Numeric Types](../../../schema-definition-language/data-types/number/README.md) — numeric schemas
