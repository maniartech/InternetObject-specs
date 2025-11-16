# Number Type

Standard numeric type for integers and floating-point values.

## Overview

The `number` type validates numeric values including integers and floating-point numbers. Use constraints to enforce ranges and create semantic subtypes.

## Basic Usage

```io
# Simple number
count: number
price: number

# With constraints
age: {number, min: 0, max: 150}
percentage: {number, min: 0, max: 100}
```

## TypeSchema (IO)

```io
type      : {string, choices: [bigint, decimal, int, uint, float, number, int8, int16, int32, uint8, uint16, uint32, uint64, float32, float64]}
default?  : number
choices?  : [number]
min?      : number
max?      : number
format?   : {string, choices: [decimal, hex, octal, binary, scientific]}
optional? : {bool}
null?     : {bool}
```

> Common fields like `type`, `default`, `choices`, `optional`, `null`, and number `format` are explained in `the-io-schema/data-types/00-common-fields.md`.

## Constraints

### Range Constraints

```io
# Minimum only
score: {number, min: 0}

# Maximum only
discount: {number, max: 100}

# Both
temperature: {number, min: -273.15, max: 1000000}
```

## Semantic Subtypes

Use constraints to create domain-specific types:

```io
# Integer (validated via application logic)
age: {number, min: 0, max: 150}
quantity: {number, min: 1}

# Positive number
amount: {number, min: 0}

# Percentage
rate: {number, min: 0, max: 100}

# Rating
stars: {number, min: 1, max: 5}
```

## Validation Behavior

1. Type check: value must be a number (int or float).
2. Range check: if `min`/`max` specified, validate bounds (inclusive).

## Common Patterns

### Counters and IDs

```io
post: {
  id: number,
  views: {number, min: 0},
  likes: {number, min: 0},
  comments: {number, min: 0}
}
```

### Measurements

```io
product: {
  weight: {number, min: 0},
  height: {number, min: 0},
  width: {number, min: 0},
  depth: {number, min: 0}
}
```

### Financial (simple)

```io
# For simple cases; use decimal for precision
transaction: {
  amount: {number, min: 0},
  tax: {number, min: 0},
  total: {number, min: 0}
}
```

### Configuration

```io
settings: {
  timeout: {number, min: 0, max: 300000},
  retries: {number, min: 0, max: 10},
  batchSize: {number, min: 1, max: 1000},
  cacheSize: {number, min: 0}
}
```

## References

- `io-js2/src/schema/types/common-number.ts`
- `io-js2/src/schema-v2/types/number.ts`
- `the-structure/values/number.md`
