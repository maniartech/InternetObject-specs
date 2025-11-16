# Decimal Type

Arbitrary-precision decimal type for exact numeric calculations.

## Overview

The `decimal` type validates arbitrary-precision decimal numbers. Use it for financial calculations, measurements, or any scenario requiring exact decimal arithmetic without floating-point errors.

## Basic Usage

```io
# Simple decimal
price: decimal
amount: decimal

# With constraints
balance: {decimal, min: 0}
percentage: {decimal, min: 0, max: 100}
```

## TypeSchema (IO)

```io
type       : {string, choices: [decimal]}
default?   : decimal
choices?   : [decimal]
precision? : number
scale?     : number
min?       : decimal
max?       : decimal
optional?  : {bool}
null?      : {bool}
```

> Common fields like `type`, `default`, `choices`, `optional`, and `null` are explained in `the-io-schema/data-types/00-common-fields.md`.

## Constraints

### Range Constraints

```io
# Minimum only
nonNegative: {decimal, min: 0}

# Maximum only
capped: {decimal, max: 999999.99}

# Both
bounded: {decimal, min: 0, max: 100}
```

## Use Cases

### Financial Data

```io
# Exact monetary values
transaction: {
  amount: decimal,
  fee: {decimal, min: 0},
  tax: {decimal, min: 0},
  total: decimal
}

# Account balance
account: {
  balance: decimal,
  availableBalance: decimal,
  pendingBalance: decimal
}
```

### Measurements

```io
# Precise measurements
measurement: {
  value: decimal,
  precision: decimal,
  tolerance: {decimal, min: 0}
}
```

### Rates and Percentages

```io
# Interest rates
loan: {
  principal: decimal,
  interestRate: {decimal, min: 0, max: 100},
  apr: {decimal, min: 0}
}
```

## Validation Behavior

1. Type check: value must be a decimal.
2. Range check: if `min`/`max` specified, validate bounds (inclusive).
3. Precision: maintains arbitrary precision without rounding errors.

## Common Patterns

```io
# Invoice
invoice: {
  subtotal: decimal,
  tax: {decimal, min: 0},
  discount: {decimal, min: 0},
  total: decimal,
  paid: {decimal, min: 0},
  balance: decimal
}

# Product pricing
product: {
  basePrice: {decimal, min: 0},
  discount: {decimal, min: 0, max: 100},
  finalPrice: {decimal, min: 0}
}

# Scientific measurements
reading: {
  value: decimal,
  uncertainty: {decimal, min: 0},
  unit: string
}
```

## References

- `io-js2/src/schema/types/common-number.ts`
- `io-js2/src/schema-v2/types/decimal.ts`
- `the-structure/values/number.md`

