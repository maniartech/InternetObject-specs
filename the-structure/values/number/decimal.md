---
description: Fixed-precision decimal values for financial and high-precision computations
---

# Decimal (Work In Progress)

## Overview

The **Decimal** type in Internet Object provides a fixed-precision decimal representation designed for applications that require exact numeric values, especially when dealing with financial calculations or other scenarios where floating-point precision issues could lead to significant errors.

Unlike standard floating-point numbers (which may suffer from approximation issues), Decimal types store exact numeric values with a defined precision and scale, ensuring accurate and predictable arithmetic operations.

## Representation and Syntax

A Decimal value in Internet Object is represented as a number with the `m` suffix:

```
123.45m
-98765.4321m
0.000123m
```

### Basic Decimal Literals

```
// Simple decimal values
123m         // Integer decimal
123.45m      // Fractional decimal
0.001m       // Leading zeros
-789.01m     // Negative decimal
```

### Scientific Notation

Decimal values also support scientific notation:

```
1.23e2m      // Equivalent to 123m
1.23e-2m     // Equivalent to 0.0123m
5e3m         // Equivalent to 5000m
```

## Key Concepts

### Precision and Scale

Each Decimal value is defined by two key properties:

- **Precision (M)**: The total number of significant digits in the number
- **Scale (D)**: The number of digits after the decimal point

For example, in `123.45m`:
- The precision is 5 (total digits: 1,2,3,4,5)
- The scale is 2 (decimal digits: 4,5)

### Fixed-Precision Arithmetic

Decimal values maintain their precision throughout operations, making them ideal for financial calculations where exact values are required:

```
// With regular floating-point:
0.1 + 0.2 ≈ 0.30000000000000004 // Approximation error

// With decimal type:
0.1m + 0.2m = 0.3m // Exact representation
```

### Rounding Behavior

When precision or scale constraints require rounding:

1. If a value has more decimal places than the specified scale, it's rounded using the "half up" rounding method (≥ 5 rounds up)
2. If the rounded value would exceed the precision, a validation error is raised

## Schema Definition and Validation

When used with Internet Object schemas, decimal types can be precisely defined and validated:

```
{
  amount: {
    type: decimal,
    precision: 15,    // Total digits
    scale: 4,         // Decimal places
    min: 0,           // Minimum value constraint
    max: 10000.0000   // Maximum value constraint
  }
}
```

The decimal type supports various validation properties:

- **precision**: Restricts the total number of significant digits
- **scale**: Controls the number of decimal places
- **min/max**: Validates value range
- **choices**: Limits valid values to a predefined set
- **optional**: Specifies if the field is optional
- **null**: Determines if null values are allowed

## Operations and Behavior

### Type Conversion

Internet Object provides mechanisms for converting between different numeric types:

```
// Converting to decimal from other formats
decimal("123.45")    // From string
decimal(123.45)      // From number
```

### Decimal Conversion and Compatibility

Decimal values with different precision/scale configurations can be converted to ensure compatibility during operations:

```javascript
// Converting between decimal configurations
123.45m.convert(8, 4)    // Converts to precision=8, scale=4 → 123.4500m
123.4567m.convert(5, 2)  // Converts to precision=5, scale=2 → 123.46m (rounds)
```

The `convert` method allows:

- **Increasing scale**: Adds zeros to the right (e.g., 123.45 → 123.4500)
- **Decreasing scale**: Truncates with rounding (e.g., 123.456 → 123.46)
- **Adjusting precision**: Ensures the new value fits within specified constraints

When working with decimals of different formats:
1. Two decimals must have the same precision and scale for direct comparison.
2. Decimals with different configurations must be converted to a common format.
3. Conversion may fail if the target precision cannot accommodate the value.

It's important to note that both the integer and fractional parts of a decimal must fit within the precision minus scale. For example:
```javascript
// This would fail because 12345 requires 5 digits, but precision(4)-scale(2)=2 only allows 2 integer digits
12345.67m.convert(4, 2)  // Error: Value exceeds precision

// This works because the value fits within the precision constraints
123.45m.convert(5, 2)    // 123.45m (no change needed)
```

Example of decimal comparison with conversion:

```javascript
let price = 19.95m;        // precision=4, scale=2
let newPrice = 19.95000m;  // precision=7, scale=5

// Cannot compare directly (different precision/scale)
// Must convert to a common format first:
price.convert(7, 5) == newPrice;  // true, both as precision=7, scale=5
```

### Comparisons

Decimal values can be compared with other decimal values as expected:

```
12.34m > 12.33m    // true
12.34m == 12.34m   // true
12.34m < 12.35m    // true
```

## Use Cases and Examples

Decimal types are particularly valuable in:

1. **Financial applications** - currency calculations, banking, accounting
2. **Scientific computing** - when exact decimal representation matters
3. **Regulatory compliance** - when calculations must be exactly reproducible
4. **Monetary APIs** - for consistent data exchange with financial systems

### Financial Transaction Example

```
{
  transactionId: "TX12345",
  amount: 1299.99m,
  currency: "USD",
  tax: 78.00m,
  total: 1377.99m
}
```

### Scientific Measurement Example

```
{
  experiment: "E-201",
  measurement: 0.00000123m,
  uncertainty: 0.00000002m,
  unit: "meters"
}
```

## Best Practices

1. **Explicitly Define Precision/Scale**: Always specify the precision and scale for decimal types in schemas to ensure data consistency.

2. **Use for Financial Data**: Prefer decimal type over floating-point for monetary values to avoid rounding errors.

3. **Consider Storage Implications**: Decimal types require more storage than standard numbers due to their exact representation.

4. **Range Validation**: Use min/max constraints to ensure decimal values stay within expected business bounds.

5. **Manage Precision/Scale When Combining Decimals**: When performing operations across decimals with different precision/scale, explicitly convert them to a common format or ensure your target format can accommodate the result.

## Technical Considerations

When implementing or working with decimal values, keep the following points in mind:

1. **Precision**: Decimal types preserve exact values without rounding errors, unlike floating-point numbers. This makes them ideal for financial and high-precision applications.

2. **Interoperability**: Decimal types are compatible with database systems and financial applications that require exact decimal arithmetic, ensuring seamless data exchange and integration.

3. **Performance**: While operations on decimal values may be slower than native floating-point operations, they provide guaranteed precision, which is crucial for applications where accuracy is paramount.

4. **Consistency**: Decimal calculations produce the same results regardless of the platform or implementation, ensuring reliable and predictable outcomes across different environments.

5. **Implementation Model**: The underlying implementation of the Decimal type uses a coefficient-exponent model, similar to database systems like SQL Server and Oracle. This provides a strong basis for interoperability with enterprise data systems and ensures consistent behavior.