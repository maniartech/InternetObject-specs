# Literals

Literals are predefined constant values in Internet Object that represent common data states and special values. They provide a concise way to express boolean values, null states, and special numeric values without requiring quotes or additional syntax.

## Supported Literals

Internet Object supports the following literal values:

| Literal | Type | Represents | Case Sensitive |
|---------|------|------------|----------------|
| `true` | Boolean | True value | Yes |
| `T` | Boolean | True value (short form) | Yes |
| `false` | Boolean | False value | Yes |
| `F` | Boolean | False value (short form) | Yes |
| `null` | Null | Null/empty value | Yes |
| `N` | Null | Null/empty value (short form) | Yes |
| `Inf` | Number | Positive infinity | Yes |
| `-Inf` | Number | Negative infinity | Yes |
| `NaN` | Number | Not a Number | Yes |

## Examples

```ruby
# Boolean literals
~ isActive: true, verified: F, isDeleted: false, visible: T

# Null literals
~ middleName: null, nickname: N

# Special numeric literals
~ maxValue: Inf, minValue: -Inf, result: NaN
```

## Rules

- **Case Sensitive**: All literals must use exact case (`True`, `FALSE`, `NULL` are invalid)
- **No Quotes**: Literals are written without quotes
- **Short Forms**: Single-letter shortcuts available for brevity

## See Also
- **[Boolean Values](../values/booleans.md)** - Detailed boolean type specification
- **[Null Values](../values/null.md)** - Null type and optional values
- **[Number Literals](../values/number/nan-and-infinity.md)** - Numeric types including special values
