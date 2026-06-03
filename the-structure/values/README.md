---
description: Overview of the value types Internet Object can represent.
---

# Value Representations

Internet Object supports a rich set of **value types**, from simple scalars such as numbers and
strings to structured values such as objects and arrays. Values are the fundamental building
blocks of every document.

All values are designed to be:

- **Human-readable** — easy to read and write by hand.
- **Machine-parseable** — efficient to process.
- **Type-clear** — each value has an unambiguous type.
- **Expressive** — rich enough to model complex data.

## Value categories

### Scalar values

Scalar values represent single, atomic data:

- [Numbers](number/README.md) — integers, floating-point, and special numeric values
- [Strings](string/README.md) — text in open, regular, and raw forms
- [Booleans](booleans.md) — true / false values
- [Nulls](null.md) — the absence of a value
- [Binary](binary.md) — binary data encoded as Base64
- [Date and Time](date-and-time.md) — temporal values with ISO 8601 compatibility

### Structured values

Structured values contain other values:

- [Objects](object.md) — key-value pairs representing entities
- [Arrays](array.md) — ordered collections of values

## String types

Internet Object provides three [string forms](string/README.md) for different text scenarios:

| Form | Syntax | Description | Typical use |
|------|--------|-------------|-------------|
| [Regular string](string/regular-strings.md) | `"text"` or `'text'` | Quoted string with escape sequences | General text, user input |
| [Open string](string/open-strings.md) | `unquoted text` | Unquoted string | Simple identifiers, plain words |
| [Raw string](string/raw-strings.md) | `r"text"` or `r'text'` | Literal string, no escape processing | File paths, regex, code |

## Numeric types

Internet Object supports several [numeric forms](number/README.md) for different precision and
range needs:

| Form | Syntax | Description | Range |
|------|--------|-------------|-------|
| [Number](number/number.md) | `42`, `3.14`, `1e10` | Standard floating-point number | IEEE 754 double precision |
| [BigInt](number/bigint.md) | `42n`, `0x1ABn` | Arbitrary-precision integer | Unbounded |
| [Decimal](number/decimal.md) | `42.5m`, `3.14159m` | High-precision decimal | Configurable precision |
| [Special values](number/nan-and-infinity.md) | `NaN`, `Inf`, `-Inf` | Non-finite numeric values | IEEE 754 special values |

## Temporal types

Internet Object has built-in [date and time values](date-and-time.md):

| Form | Syntax | Description | Example |
|------|--------|-------------|---------|
| Date | `d'2024-03-20'` | Date only | `d'2024-03-20'`, `d'2024'` |
| Time | `t'14:30:45'` | Time only | `t'14:30:45.123'`, `t'09:00'` |
| DateTime | `dt'2024-03-20T14:30:45Z'` | Combined date and time | `dt'2024-03-20T14:30:45.123Z'` |

## Binary data

For binary data, Internet Object uses a [Base64 byte string](binary.md) (`b'SGVsbG8='`), an
efficient way to carry bytes as text.

## Value syntax at a glance

```ruby
# Scalar values
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

# Structured values
{ name: "John Doe", age: 30, active: true }   # Object
[1, 2, 3, "four", true]                       # Array
```

## Type handling

Internet Object maintains strict type boundaries:

- **No implicit conversion** — values keep their declared types.
- **Syntax-driven typing** — a value's type follows from how it is written.
- **Validation** — type constraints are enforced during validation, against the schema.

## Comments and whitespace

Values can be annotated with comments and laid out with whitespace for readability:

```ruby
{
  # User information
  name: "John Doe",    # Full name
  age: 30,             # Age in years

  # Contact details
  email: "john@example.com"
}
```

## See Also

- [Internet Object Document](../introduction/README.md) — the overall document structure
- [Schema Data Types](../../schema-definition-language/data-types/README.md) — typing and validation
- [Best Practices & Guidelines](../../best-practices.md) — effective use of the format
