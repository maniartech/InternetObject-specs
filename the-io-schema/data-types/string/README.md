# String Type

String type schema with length, pattern, and choice constraints.

## Overview

The string type validates text values and supports constraints for length bounds, regex patterns, and enumerated choices.

## Basic Usage

```io
# Simple string
name: string

# With constraints
username: {string, minLen: 3, maxLen: 20}
email: {string, pattern: /^[^@]+@[^@]+\.[^@]+$/}
role: {string, choices: [admin, user, guest]}
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

| Constraint | Type | Description | Example |
|------------|------|-------------|---------|
| `minLen` | int | Minimum length (inclusive) | `minLen: 3` |
| `maxLen` | int | Maximum length (inclusive) | `maxLen: 100` |
| `pattern` | regex | Regex pattern match | `pattern: /^\d{3}-\d{4}$/` |
| `choices` | array | Allowed values (enum) | `choices: [red, blue, green]` |

## Literal Syntax

String literals use double quotes or unquoted tokens. See `the-structure/values/string.md` for escaping and multiline strings.

## Common Patterns

```io
# Email validation
email: {string, pattern: /^[^@]+@[^@]+\.[^@]+$/}

# Enum-like choices
status: {string, choices: [pending, active, archived]}

# Username constraints
username: {string, minLen: 3, maxLen: 20, pattern: /^[a-zA-Z0-9_]+$/}

# Short text with bounds
title: {string, minLen: 1, maxLen: 200}
```

## References

- `io-js2/src/schema/types/string.ts`
- `io-js2/src/schema-v2/types/string.ts`
- `the-structure/values/string.md`

