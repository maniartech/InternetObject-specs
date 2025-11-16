# MemberDef Specification

Field definition model for Internet Object schemas.

## Overview

A MemberDef describes one field (member) in a schema: its type, constraints, optionality, nullability, and defaulting rules. It binds a TypeSchema to a field name and augments it with field-level semantics.

## Shape (Conceptual)

- `type`: required type identifier or TypeSchema
- `optional`: boolean (derived from `?` convention)
- `null`: boolean (derived from `*` convention)
- `default`: optional default value
- `choices`: optional enumeration of allowed values
- `constraints`: type-specific options (min, max, minLen, maxLen, pattern, etc.)

## References

- V1 Types: `io-js2/src/schema/types/*.ts`
- Processing: `io-js2/src/schema/processing/member-processor.ts`
- Utils: `io-js2/src/schema/utils/validation-utils.ts`

## Semantics

- Optional (`?`) → field may be omitted
- Nullable (`*`) → field may be null
- Both (`?*`) → omitted or null
- Open extras (`*` or `*: type`) → controlled by schema-level `open`

Optional vs Nullable precedence
- Optional (`?`) controls presence (field may be omitted).
- Nullable (`*`) controls value domain (field may be null).
- They are orthogonal; `?*` allows both omission and null.

Defaults
- If `default` is provided, it is applied after omission/nullability checks and must itself be valid for the field’s TypeSchema.

## Examples

```io
# Basic
name: string

# With constraints
age: {int, min: 0, max: 120}

# Optional and nullable
email?: string
bio*: string
note?*: string

# Dynamic extras (schema-level)
*, *: string
```

## Validation

Validation is performed by the underlying TypeSchema of the MemberDef. For container types (arrays/objects), validation is applied to children first, then container-level rules are enforced. Error locality attaches to the field for objects and to indices for arrays.

## See Also

- [TypeSchema Interface](12-typeschema.md)
- [Schema Container](10-internet-object-schema.md)
