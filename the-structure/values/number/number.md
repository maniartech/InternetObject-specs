---
description: Standard 64-bit floating-point numbers in Internet Object
---

# Number

A **Number** in Internet Object represents a 64-bit double-precision floating-point value conforming to the IEEE 754 standard. Numbers are scalar primitives used to express integers, fractional values, and special numeric constants.

Numbers in Internet Object support various representations including different bases (binary, octal, hexadecimal), scientific notation, and special values like NaN and Infinity.

## Syntax

A number can be expressed in multiple forms:

```ebnf
number = ["-" | "+"] (
    decimalNumber
  | binaryNumber
  | octalNumber
  | hexNumber
  | scientificNumber
) | specialValue

decimalNumber = digit+ ["." digit+]
binaryNumber = "0b" binaryDigit+
octalNumber = "0o" octalDigit+
hexNumber = "0x" hexDigit+
scientificNumber = (digit+ ["." digit+] | "." digit+) ("e" | "E") ["-" | "+"] digit+
specialValue = "NaN" | "Inf" | "-Inf" | "+Inf"

digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
binaryDigit = "0" | "1"
octalDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"
hexDigit = digit | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f"
```

## Structural Characters

| Symbol | Name           | Unicode  | Description                    |
| ------ | -------------- | -------- | ------------------------------ |
| `0-9`  | Digits         | Multiple | Standard decimal digits        |
| `.`    | Decimal Point  | `U+002E` | Separates integer and fraction |
| `-`    | Minus Sign     | `U+002D` | Indicates negative numbers     |
| `+`    | Plus Sign      | `U+002B` | Optional positive indicator    |
| `e`/`E`| Exponent       | Multiple | Scientific notation exponent   |
| `0b`   | Binary Prefix  | Multiple | Binary number indicator        |
| `0o`   | Octal Prefix   | Multiple | Octal number indicator         |
| `0x`   | Hex Prefix     | Multiple | Hexadecimal number indicator   |

## Valid Forms

### Decimal Base Number

Numbers in decimal format can include integers and fractional values, with optional sign prefixes:

```ruby
# Simple integers
42                   # Integer
-17                  # Negative integer
+17                  # Positive integer (explicit)

# Fractional numbers
3.14159              # Fractional number
-0.5                 # Negative fractional
+0.5                 # Positive fractional (explicit)

# Zero
0                    # Zero
+0                   # Positive zero (explicit)
-0                   # Negative zero (explicit)
```

A decimal number consists of one or more digits, optionally preceded by a sign (+ or -), and optionally including a decimal point followed by one or more digits.

### Alternative Bases

Numbers can be expressed in binary, octal, or hexadecimal notation:

#### Binary Numbers (Base-2)
Binary representation uses `0b` or `0B` prefix followed by binary digits (0-1):

```ruby
0b1010               # Binary 1010 (10 in decimal)
0B1111               # Binary 1111 (15 in decimal)
0b0                  # Binary 0
-0b1010              # Negative binary (-10 in decimal)
+0B1100              # Positive binary (12 in decimal)
```

#### Octal Numbers (Base-8)
Octal representation uses `0o` or `0O` prefix followed by octal digits (0-7):

```ruby
0o755                # Octal 755 (493 in decimal)
0O644                # Octal 644 (420 in decimal)
0o0                  # Octal 0
-0o755               # Negative octal (-493 in decimal)
+0O377               # Positive octal (255 in decimal)
```

#### Hexadecimal Numbers (Base-16)
Hexadecimal representation uses `0x` or `0X` prefix followed by hex digits (0-9, A-F):

```ruby
0xFF                 # Hexadecimal FF (255 in decimal)
0x10                 # Hexadecimal 10 (16 in decimal)
0XDeadBeef           # Mixed case hex (3735928559 in decimal)
-0xFF                # Negative hex (-255 in decimal)
+0x10                # Positive hex (16 in decimal)
```

#### Case Sensitivity
- **Prefixes**: Both lowercase (`0b`, `0o`, `0x`) and uppercase (`0B`, `0O`, `0X`) are supported
- **Hex digits**: Both uppercase (`A-F`) and lowercase (`a-f`) are valid

```ruby
0xFF                 # ✅ Lowercase prefix, uppercase digits
0XFF                 # ✅ Uppercase prefix, uppercase digits
0xff                 # ✅ Lowercase prefix, lowercase digits
0Xff                 # ✅ Mixed case (all equivalent)
```

### Scientific Notation

Scientific notation expresses numbers using exponential form with `e` or `E`:

```ruby
1.23e4               # 1.23 × 10⁴ = 12300
1.23E4               # Same as above (case insensitive)
1.23e-4              # 1.23 × 10⁻⁴ = 0.000123
-2.5e+3              # -2.5 × 10³ = -2500
5e3                  # 5 × 10³ = 5000
.5e2                 # 0.5 × 10² = 50
6.022e23             # Avogadro's number
1e-10                # Very small number
-3.14159e0           # -3.14159 × 10⁰ = -3.14159
```

#### Scientific Notation Components
- **Mantissa**: The significant digits (before `e`/`E`)
- **Exponent marker**: `e` or `E` (case insensitive)
- **Exponent**: The power of 10 (can be positive, negative, or zero)

```ruby
# Format: [sign]mantissa[e|E][sign]exponent
1.5e+10              # Explicit positive exponent
1.5e-10              # Negative exponent
1.5e10               # Implicit positive exponent
```


## Optional Behaviors

### Literal and Alternate Forms

Numbers support multiple equivalent representations:

```ruby
42                  # ✅ Standard decimal
0x2A                # ✅ Hexadecimal (equivalent to 42)
0b101010            # ✅ Binary (equivalent to 42)
0o52                # ✅ Octal (equivalent to 42)
4.2e1               # ✅ Scientific notation (equivalent to 42)
```

## Invalid Forms

```ruby
.5                  # ❌ Must have leading digit
5.                  # ❌ Must have trailing digit if decimal point used
0b                  # ❌ Missing binary digits
0b12                # ❌ Invalid binary digit '2'
0o89                # ❌ Invalid octal digits '8' and '9'
0x                  # ❌ Missing hex digits
0xGH                # ❌ Invalid hex digits 'G' and 'H'
1.2.3               # ❌ Multiple decimal points
0b 1010             # ❌ Space between prefix and digits
0o 755              # ❌ Space between prefix and digits
0x FF               # ❌ Space between prefix and digits
1e                  # ❌ Missing exponent in scientific notation
1e+                 # ❌ Missing exponent digits
1.23ee4             # ❌ Multiple exponent markers
1.2.3e4             # ❌ Multiple decimal points in mantissa
```

## Preservation of Structure

Internet Object preserves:

- The chosen representation form (decimal, binary, octal, hex, scientific)
- Whitespace (non-significant in interpretation)
- Syntactic fidelity (as written, except that an explicit plus sign is not preserved)

However, it does **not** interpret:

* Mathematical relationships between values
* Precision requirements beyond IEEE 754
* Domain-specific numeric constraints

Such semantics are the responsibility of the **schema layer**, **validators**, or **application logic**.

## See Also

- [Number Types Overview](./README.md) - Launcher for all number types and formats
- [BigInt](./bigint.md) - For arbitrary-precision integers
- [Decimal](./decimal.md) - For fixed-precision decimal arithmetic
- [Special Numeric Values](./nan-and-infinity.md) - NaN and Infinity
- [Schema for Numbers](../../../schema-definition-language/data-types/number/README.md)
- [Values](../../values/README.md)
