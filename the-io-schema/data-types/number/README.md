# Number Types

Number type schemas including number, bigint, and decimal with range constraints.

## Overview

Internet Object supports three core number types:
- `number`: standard numeric values (int, float)
- `bigint`: arbitrary-precision integers
- `decimal`: arbitrary-precision decimals

## Basic Usage

```io
# Standard number
age: number
price: number

# BigInt for large integers
userId: bigint
timestamp: bigint

# Decimal for precise calculations
amount: decimal
percentage: decimal
```

## Constraints

All number types support range constraints:

| Constraint | Type | Description | Example |
|------------|------|-------------|---------|
| `min` | number | Minimum value (inclusive) | `min: 0` |
| `max` | number | Maximum value (inclusive) | `max: 100` |

## Subtypes (via Constraints)

Use constraints to create semantic subtypes:

```io
# Integer (via validation)
age: {number, min: 0, max: 150}

# Positive number
score: {number, min: 0}

# Percentage
rate: {number, min: 0, max: 100}
```

## Common Patterns

```io
# User data
user: {
  id: bigint,
  age: {number, min: 0, max: 150},
  score: {number, min: 0}
}

# Financial data
transaction: {
  amount: decimal,
  fee: {decimal, min: 0},
  balance: decimal
}

# Configuration
config: {
  timeout: {number, min: 0, max: 300000},
  retries: {number, min: 0, max: 10},
  batchSize: {number, min: 1, max: 1000}
}
```

## References

- `io-js2/src/schema/types/common-number.ts`
- `io-js2/src/schema-v2/types/number.ts`
- `the-structure/values/number.md`
