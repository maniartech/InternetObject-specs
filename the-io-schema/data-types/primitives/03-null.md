# Null Type

Validates explicit null values.

## Overview

The `null` type validates that a value is explicitly null. It is typically used with the nullable modifier (`*`) rather than as a standalone type.

## Usage

```io
# Standalone null type (rare)
placeholder: null

# More common: nullable modifier
bio*: string  # can be string or null

# Optional and nullable
note?*: string  # can be omitted, string, or null
```

## TypeSchema (IO)

```io
type      : {string, choices: [null]}
optional? : {bool}
```

> Common fields are explained in `the-io-schema/data-types/00-common-fields.md`.

## Semantics

- Null represents an intentional absence of value.
- Differs from undefined (field omission) and empty string.
- Must be explicitly allowed via nullable modifier or null type.

## Common Patterns

```io
# Nullable fields for optional data
user: {
  name: string,
  middleName*: string,
  bio*: string
}

# Placeholder values
config: {
  theme: string,
  customLogo*: string  # null if no custom logo
}
```

## References

- `io-js2/src/schema/utils/validation-utils.ts`
- `the-io-schema/validation-rules/02-optional-nullable.md`
