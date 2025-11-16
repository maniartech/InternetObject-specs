# BigInt Type

Arbitrary-precision integer type for large whole numbers.

## Overview

The `bigint` type validates arbitrary-precision integers. Use it for IDs, timestamps, or any integer that exceeds JavaScript's safe integer range.

## Basic Usage

```io
# Simple bigint
userId: bigint
timestamp: bigint

# With constraints
id: {bigint, min: 1}
nonce: {bigint, min: 0}
```

## TypeSchema (IO)

```io
type      : {string, choices: [bigint]}
default?  : bigint
choices?  : [bigint]
min?      : bigint
max?      : bigint
format?   : {string, choices: [decimal, hex, octal, binary], default: decimal}
optional? : {bool}
null?     : {bool}
```

> Common fields like `type`, `default`, `choices`, `optional`, `null`, and serialization hints like `format` are explained in `the-io-schema/data-types/00-common-fields.md`.

## Constraints

### Range Constraints

```io
# Minimum only
positiveId: {bigint, min: 1}

# Maximum only
bounded: {bigint, max: 9999999999999999}

# Both
rangedId: {bigint, min: 1000000, max: 9999999}
```

## Use Cases

### Large IDs

```io
# Database IDs that exceed Number.MAX_SAFE_INTEGER
user: {
  id: bigint,
  accountId: bigint,
  organizationId: bigint
}
```

### Timestamps

```io
# High-precision timestamps
event: {
  timestamp: bigint,
  nanos: {bigint, min: 0}
}
```

### Counters

```io
# High-volume counters
analytics: {
  totalViews: bigint,
  uniqueVisitors: bigint,
  impressions: bigint
}
```

## Validation Behavior

1. Type check: value must be a bigint.
2. Range check: if `min`/`max` specified, validate bounds (inclusive).

## Common Patterns

```io
# User identifiers
user: {
  id: bigint,
  created: bigint,
  modified: bigint
}

# Financial ledger
entry: {
  transactionId: bigint,
  amount: decimal,
  timestamp: bigint
}

# Event tracking
event: {
  eventId: bigint,
  userId: bigint,
  timestamp: bigint,
  sequence: {bigint, min: 0}
}
```

## References

- `io-js2/src/schema/types/common-number.ts`
- `io-js2/src/schema-v2/types/bigint.ts`
- `the-structure/values/number.md`

