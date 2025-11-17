# Boolean Type

Validates true or false values.

## Overview

The `boolean` type accepts only `true` or `false` values. It is strict and does not coerce other types.

## Usage

```io
# Basic boolean
isActive: boolean

# With optional/nullable modifiers
hasAccess?: boolean
isVerified*: boolean
```

## Literal Syntax

```io
# True values
T, true

# False values
F, false
```

See `the-structure/values/boolean.md` for complete literal syntax.

## TypeSchema (IO)

```io
type      : {string, choices: [boolean, bool]}
default?  : bool
choices?  : [bool]
optional? : {bool}
null?     : {bool}
```

> Common fields like `default`, `choices`, `optional`, and `null` are explained in `the-io-schema/data-types/00-common-fields.md`.

## Constraints

The boolean type has no additional constraints beyond type validation.

## Common Patterns

```io
# Feature flags
features: {
  darkMode: boolean,
  notifications: boolean,
  analytics?: boolean
}

# Status fields
user: {
  isActive: boolean,
  isVerified: boolean,
  isAdmin: boolean
}
```

## References

- `io-js2/src/schema-v2/types/boolean.ts`
- `the-structure/values/boolean.md`
