---
description: Overview of value types in Internet Object
---

# Values

Internet Object supports a rich set of **value types** that represent different kinds of data. Values are the fundamental building blocks of Internet Object documents, ranging from simple scalar values like numbers and strings to complex structured values like objects and arrays.

All values in Internet Object are designed to be:
- **Human-readable**: Easy to read and write by humans
- **Machine-parseable**: Efficiently processed by computers
- **Type-safe**: Clear distinction between different data types
- **Expressive**: Rich enough to represent complex data structures

## Value Categories

Internet Object values are organized into several categories:

### Scalar Values
Scalar values represent single, atomic pieces of data:

- **[Numbers](./number/)** - Numeric values including integers, floats, and special numeric types
- **[Strings](./string/)** - Text data with various encoding and formatting options
- **[Booleans](./booleans.md)** - True/false values
- **[Null](./null.md)** - Absence of value
- **[Base64 Byte Strings](./base64.md)** - Binary data encoded as Base64
- **[Date and Time](./date-and-time.md)** - Temporal values with ISO 8601 compatibility

### Structured Values
Structured values contain other values and provide organization:

- **[Objects](./object.md)** - Key-value pairs representing entities
- **[Arrays](./array.md)** - Ordered collections of values

## String Types

Internet Object provides several [string types](./string/) to handle different text scenarios:

| Type | Syntax | Description | Use Cases |
|------|--------|-------------|-----------|
| **[Regular Strings](./string/regular-strings.md)** | `"text"` or `'text'` | Standard quoted strings with escape sequences | General text, user input, formatted content |
| **[Open Strings](./string/open-strings.md)** | `unquoted text` | Strings without quotes | Simple identifiers, natural language |
| **[Raw Strings](./string/raw-strings.md)** | `r"text"` or `r'text'` | Literal strings without escape processing | File paths, regex patterns, code snippets |

## Numeric Types

Internet Object supports various [numeric types](./number/) for different precision and range requirements:

| Type | Syntax | Description | Range |
|------|--------|-------------|-------|
| **[Numbers](./number/number.md)** | `42`, `3.14`, `1e10` | Standard floating-point numbers | IEEE 754 double precision |
| **[BigInt](./number/bigint.md)** | `42n`, `0x1ABn` | Arbitrary precision integers | Unlimited |
| **[Decimal](./number/decimal.md)** | `42.5m`, `3.14159m` | High-precision decimal numbers | Configurable precision |
| **[Special Values](./number/nan-and-infinity.md)** | `NaN`, `Inf`, `-Inf` | Non-finite numeric values | IEEE 754 special values |

## Temporal Types

Internet Object provides built-in support for [date and time values](./date-and-time.md):

| Type | Syntax | Description | Example |
|------|--------|-------------|---------|
| **Date** | `d'2024-03-20'` | Date-only values | `d'2024-03-20'`, `d'2024'` |
| **Time** | `t'14:30:45'` | Time-only values | `t'14:30:45.123'`, `t'09:00'` |
| **DateTime** | `dt'2024-03-20T14:30:45Z'` | Combined date and time | `dt'2024-03-20T14:30:45.123Z'` |

## Binary Data

For binary data representation, Internet Object uses:

- **[Base64 Byte Strings](./base64.md)** (`b'SGVsbG8='`) - Efficient encoding of binary data as text

## Value Syntax Overview

Here's a quick reference of value syntax in Internet Object:

```ruby
# Scalar Values
42                                     # Number
"Hello, World!"                        # Regular string
'Single quotes work too'               # Regular string
unquoted string                        # Open string
r"C:\Users\file.txt"                   # Raw string
true                                   # Boolean
false                                  # Boolean
null                                   # Null
b'SGVsbG8gV29ybGQ='                    # Base64 byte string
d'2024-03-20'                          # Date
t'14:30:45'                            # Time
dt'2024-03-20T14:30:45Z'               # DateTime

# Structured Values
{                                      # Object
  name: "John Doe",
  age: 30,
  active: true
}

[1, 2, 3, "four", true]                # Array
```

## Type Coercion and Conversion

Internet Object maintains strict type boundaries:

- **No implicit conversion**: Values retain their declared types
- **Explicit parsing**: Type conversion happens during parsing based on syntax
- **Validation**: Type constraints are enforced during processing
- **Preservation**: Original format and type information is maintained

## Comments and Whitespace

Values can be accompanied by:

- **Comments**: `# This is a comment`
- **Whitespace**: Flexible spacing and indentation
- **Line breaks**: Multi-line value formatting

```ruby
{
  # User information
  name: "John Doe",    # Full name
  age: 30,             # Age in years

  # Contact details
  email: "john@example.com"
}
```

## Encoding and Character Support

Internet Object values support:

- **Unicode**: Full Unicode character set (UTF-8 encoding)
- **Escape sequences**: Standard escape codes in regular strings
- **Raw representation**: Literal character preservation in raw strings
- **Normalization**: Unicode normalization for consistent processing

## Navigation

### Quick Links
- **Scalar Types**: [Numbers](./number/) • [Strings](./string/) • [Booleans](./booleans.md) • [Null](./null.md) • [Binary Data](./base64.md) • [Date & Time](./date-and-time.md)
- **Structured Types**: [Objects](./object.md) • [Arrays](./array.md)

### By Use Case
- **Text Data**: [String Types](./string/) - Regular, Open, and Raw strings
- **Numeric Data**: [Number Types](./number/) - Standard, BigInt, Decimal, and Special values
- **Temporal Data**: [Date and Time](./date-and-time.md) - Dates, times, and datetimes
- **Binary Data**: [Base64 Byte Strings](./base64.md) - Encoded binary content
- **Logical Data**: [Booleans](./booleans.md) and [Null](./null.md)
- **Complex Data**: [Objects](./object.md) and [Arrays](./array.md)

## See Also

- **[Internet Object Structure Overview](../)** - Understanding the overall document structure
- **[Schema Definition Language](../../schema-definition-language/)** - Type definitions and validation
- **[Best Practices](../../best-practices.md)** - Guidelines for effective Internet Object usage
