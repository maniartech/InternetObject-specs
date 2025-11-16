# TypeSchema Common Fields

Shared semantics for fields that appear across multiple data types. Use this as the single source of truth for how core, constraint, and serialization fields behave.

## Overview

TypeSchema entries combine:
- Core identity and presence fields.
- Constraint fields that drive validation (can fail a value).
- Serialization/formatting hints that affect stringify/print behavior (do not fail a valid value).

## Core Fields

- `type` (string): Declares the data type (e.g., `string`, `number`, `bigint`, `decimal`).
- `default?`: Value used when the field is omitted. Must itself be valid for the TypeSchema.
- `choices?`: Enumerated allowed values. Acts as a constraint (value must be one of the listed items).

## Presence Modifiers

- `optional?` (bool): Field may be omitted. See Validation Rules: Optional/Nullable.
- `null?` (bool): Field may take `null` as a value.

Validation order (simplified): presence → nullability → defaults → type/constraints. See `validation-rules/02-optional-nullable.md` for details.

## Constraint Fields (by theme)

These fields are validated against input values and may cause validation to fail when violated.

- Length (strings): `len?`, `minLen?`, `maxLen?`
- Pattern (strings): `pattern?` (regex), with optional `flags?` controlling regex behavior
- Range (numbers): `min?`, `max?` for `number`, `bigint`, and `decimal`
- Choices (all): `choices?` (also listed under core because it’s ubiquitous)

## Serialization & Formatting Hints

These fields guide how values are printed/stringified or parsed for display I/O. They are not validation constraints and should not cause a valid value to fail validation.

- Numbers (including `bigint`):
  - `format?`:
    - `number`: `{decimal, hex, octal, binary, scientific}` (exact set may vary by implementation)
    - `bigint`: `{decimal, hex, octal, binary}`
    - Purpose: controls stringify/print format (e.g., show a bigint in hex). Does not change the numeric value.

- Strings:
  - `format?`: `{auto, open, regular, raw}`
  - `escapeLines?` (bool): whether to escape newlines when printing
  - `encloser?`: one of `"` or `'` to prefer when quoting strings
  - `flags?` with `pattern?`: affects regex compilation (behavioral for pattern matching, but not a separate constraint)

Notes:
- Unknown or unsupported `format` should be treated as a schema authoring error (schema-time), not a value error (data-time).
- Serialization hints apply during stringify/emit; they do not alter validation outcomes.

## Validation vs. Serialization

- Validation: checks type + constraints (e.g., `min`, `max`, `minLen`, `pattern`, `choices`).
- Serialization: applies formatting preferences for display/IO after validation succeeds.

## Examples

```io
# BigInt printed in hex, but validated only as bigint and range
id: {bigint, min: 1, format: hex}

# String with max length, printed using single quotes
title: {string, maxLen: 120, encloser: '\''}

# Number shown in scientific notation for readability
mass: {number, min: 0, format: scientific}
```

## References

- `the-io-schema/validation-rules/02-optional-nullable.md`
- `the-io-schema/data-types/string/01-string.md`
- `the-io-schema/data-types/number/01-number.md`
- `the-io-schema/data-types/number/02-bigint.md`
- `the-io-schema/data-types/number/03-decimal.md`
