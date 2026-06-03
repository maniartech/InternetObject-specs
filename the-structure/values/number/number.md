---
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

## Invalid forms

The following are genuine syntax errors (the parser reports an error):

```ruby
---
0o89                 # ✗ invalid octal digit
```

```ruby
0b                   # ✗ missing binary digits
0x                   # ✗ missing hex digits
0xGH                 # ✗ invalid hex digits
0b 1010              # ✗ space between the prefix and the digits
```

## Implementation status (beta)

The reference implementation is currently lenient with some malformed numeric tokens. These
are tracked as implementation issues; a conformant parser SHOULD reject them rather than accept
or coerce them:

- An incomplete exponent is accepted instead of rejected: `1e` and `1e+` both yield `1`.
- A token that begins like a number but is ill-formed falls back to an open string instead of
  raising an error: `0b12` → `"0b12"`, `1.2.3` → `"1.2.3"`, `1.23ee4` → `"1.23ee4"`.

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
