# Literals

Literals are specific values that can be used within an Internet Object document. They represent special values and basic data indicators. Below are the literals used in the Internet Object format:

| Literals | Represents                      | Notes                                |
| -------- | ------------------------------- | ------------------------------------ |
| `T`      | Boolean value True (short)      | Case-sensitive                       |
| `true`   | Boolean value True              | Use interchangeably with `T`         |
| `F`      | Boolean value False (short)     | Case-sensitive                       |
| `false`  | Boolean value False             | Use interchangeably with `F`         |
| `Inf`    | Number value Infinity           | Represents positive infinity         |
| `-Inf`   | Number value Negative Infinity  | Represents negative infinity         |
| `NaN`    | Number value Not a Number       | Represents an undefined or unrepresentable value |
| `N`      | Null value (short)              | Case-sensitive                       |
| `null`   | Null value                      | Use interchangeably with `N`         |

### Usage Examples

```ruby
# Boolean literals
~ isActive: true, isVerified: F

# Special number literals
~ maxValue: Inf, minValue: -Inf, result: NaN

# Null literals
~ middleName: null, nickname: N
```

### Notes

- **Case Sensitivity:** All literals are case-sensitive. For example, `True` or `FALSE` are not recognized as valid literals.
- **Short vs. Long Forms:** The short forms (`T`, `F`, `N`) are convenient for brevity, while the long forms (`true`, `false`, `null`) enhance readability and compatibility with JSON.
