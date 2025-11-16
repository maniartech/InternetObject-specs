# String Type

Comprehensive guide to string type validation and constraints.

## Overview

The string type validates text values with optional length, pattern, and choice constraints.

## Basic Usage

```io
# Simple string
name: string

# Optional string
nickname?: string

# Nullable string
bio*: string
```

## TypeSchema (IO)

```io
type       : {string, choices: [string, url, email]}
default?   : string
choices?   : [string]
pattern?   : string
flags?     : string
len?       : {number, min: 0}
minLen?    : {number, min: 0}
maxLen?    : {number, min: 0}
format?    : {string, choices: [auto, open, regular, raw], default: auto}
escapeLines?: {bool, default: F}
encloser?  : {string, choices: ["\"", "'"], default: "\""}
optional?  : {bool}
null?      : {bool}
```

> Common fields like `type`, `default`, `choices`, `optional`, `null`, and string formatting hints (`format`, `escapeLines`, `encloser`, `flags`) are explained in `the-io-schema/data-types/00-common-fields.md`.

## Constraints

### Length Constraints

```io
# Minimum length
username: {string, minLen: 3}

# Maximum length
title: {string, maxLen: 100}

# Both
password: {string, minLen: 8, maxLen: 128}
```

### Pattern Constraints

```io
# Email pattern
email: {string, pattern: /^[^@]+@[^@]+\.[^@]+$/}

# Phone number
phone: {string, pattern: /^\d{3}-\d{3}-\d{4}$/}

# Alphanumeric with underscores
slug: {string, pattern: /^[a-z0-9_-]+$/}
```

### Choice Constraints (Enum)

```io
# Fixed set of values
status: {string, choices: [pending, active, archived]}
role: {string, choices: [admin, user, guest]}
theme: {string, choices: [light, dark, auto]}
```

## Combining Constraints

```io
# Username: 3-20 chars, alphanumeric + underscore
username: {string, minLen: 3, maxLen: 20, pattern: /^[a-zA-Z0-9_]+$/}

# Status with length bounds
status: {string, minLen: 1, maxLen: 50, choices: [pending, approved, rejected]}
```

## Validation Behavior

1. Type check: value must be a string.
2. Length check: if `minLen`/`maxLen` specified, validate length.
3. Pattern check: if `pattern` specified, test regex.
4. Choice check: if `choices` specified, value must be in list.

## Common Patterns

### User Data

```io
user: {
  username: {string, minLen: 3, maxLen: 20, pattern: /^[a-zA-Z0-9_]+$/},
  email: {string, pattern: /^[^@]+@[^@]+\.[^@]+$/},
  displayName: {string, minLen: 1, maxLen: 50},
  bio*: {string, maxLen: 500}
}
```

### Configuration

```io
config: {
  environment: {string, choices: [development, staging, production]},
  logLevel: {string, choices: [debug, info, warn, error]},
  region: {string, choices: [us-east-1, us-west-2, eu-west-1]}
}
```

### Content

```io
article: {
  title: {string, minLen: 1, maxLen: 200},
  slug: {string, pattern: /^[a-z0-9-]+$/},
  body: {string, minLen: 10},
  category: {string, choices: [tech, business, lifestyle, sports]}
}
```

## References

- `io-js2/src/schema/types/string.ts`
- `io-js2/src/schema-v2/types/string.ts`
- `the-structure/values/string.md`

