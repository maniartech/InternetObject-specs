---
description: Fixed-precision decimal values for financial and high-precision computations
---

# Decimal

## Overview

The **Decimal** type in Internet Object provides a fixed-precision decimal representation designed for applications that require exact numeric values, especially when dealing with financial calculations or other scenarios where floating-point precision issues could lead to significant errors.

Unlike standard floating-point numbers (which may suffer from approximation issues), Decimal types store exact numeric values with a defined precision and scale, ensuring accurate and predictable arithmetic operations.

## Representation

A Decimal value in Internet Object is represented as a number with the `m` suffix:

```
123.45m
-98765.4321m
0.000123m
```

## Key Concepts

### Precision and Scale

Each Decimal value is defined by two key properties:

- **Precision (M)**: The total number of significant digits in the number
- **Scale (D)**: The number of digits after the decimal point

For example, in `123.45m`:
- The precision is 5 (total digits: 1,2,3,4,5)
- The scale is 2 (decimal digits: 4,5)

### Internal Implementation

Internally, Decimal values are stored using a coefficient (BigInt) and exponent (number) combination to ensure exact representation:

```typescript
// Conceptual representation
{
  coefficient: 12345n, // All significant digits as a BigInt
  exponent: 2         // Scale/number of decimal places
}
```

This implementation ensures that decimals can represent values with exact precision, unlike floating-point numbers which can introduce rounding errors.

## Features

### Fixed-Precision Arithmetic

Decimal values maintain their precision throughout operations, making them ideal for financial calculations where exact values are required:

```
// With regular floating-point:
0.1 + 0.2 ≈ 0.30000000000000004 // Approximation error

// With decimal type:
0.1m + 0.2m = 0.3m // Exact representation
```

### Schema Validation

When used with Internet Object schemas, decimal types support:

- **Precision** definition - restricting the total number of digits
- **Scale** definition - controlling the number of decimal places
- **Range validation** - with `min` and `max` constraints
- **Format options** - for displaying the decimal values

```
// Schema example with decimal type
{
  price: {type: decimal, precision: 10, scale: 2, min: 0}
}
```

## Syntax

### Basic Decimal Literals

```
// Simple decimal values
123m
123.45m
0.001m
-789.01m
```

### Scientific Notation

Decimal values also support scientific notation:

```
1.23e2m  // Equivalent to 123m
1.23e-2m // Equivalent to 0.0123m
```

### With Schema Definition

In schema definitions, decimal types are specified with precision and scale:

```
{
  amount: {type: decimal, precision: 15, scale: 4}  // Up to 15 digits with 4 decimal places
}
```

## Conversion and Compatibility

### Type Conversion

Internet Object provides mechanisms for converting between different numeric types:

```
// Converting to decimal from other formats
decimal("123.45")    // From string
decimal(123.45)      // From number
```

### Comparisons

Decimal values can be compared with other decimal values as expected:

```
12.34m > 12.33m  // true
12.34m == 12.34m // true
12.34m < 12.35m  // true
```

## Use Cases

Decimal types are particularly valuable in:

1. **Financial applications** - currency calculations, banking, accounting
2. **Scientific computing** - when exact decimal representation matters
3. **Regulatory compliance** - when calculations must be exactly reproducible
4. **Monetary APIs** - for consistent data exchange with financial systems

## Rounding Behavior

When precision or scale constraints require rounding:

1. If a value has more decimal places than the specified scale, it's rounded using the "half up" rounding method (≥ 5 rounds up)
2. If the rounded value would exceed the precision, a validation error is raised

## Best Practices

1. **Explicitly Define Precision/Scale**: Always specify the precision and scale for decimal types in schemas to ensure data consistency.

2. **Use for Financial Data**: Prefer decimal type over floating-point for monetary values to avoid rounding issues.

3. **Consider Storage Implications**: Decimal types require more storage than standard numbers due to their exact representation.

4. **Range Validation**: Use min/max constraints to ensure decimal values stay within expected business bounds.

## Example Uses

### Financial Transaction

```
{
  transactionId: "TX12345",
  amount: 1299.99m,
  currency: "USD",
  tax: 78.00m,
  total: 1377.99m
}
```

### Scientific Measurement

```
{
  experiment: "E-201",
  measurement: 0.00000123m,
  uncertainty: 0.00000002m,
  unit: "meters"
}
```

### Schema Definition

```
{
  price: {
    type: decimal, 
    precision: 10, 
    scale: 2, 
    min: 0, 
    max: 1000000.00
  }
}
```

## Technical Details

The underlying implementation of the Decimal type uses a coefficient-exponent model, similar to database systems like SQL Server and Oracle, providing a strong basis for interoperability with enterprise data systems.

