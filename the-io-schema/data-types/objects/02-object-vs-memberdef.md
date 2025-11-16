# Object Type vs MemberDef

Clarifying the difference between an object TypeSchema and a MemberDef bound to a field.

## Overview

- TypeSchema (object): describes a shape `{ key: MemberDef, ... }`, possibly with open policy (`*` or `*: T`).
- MemberDef: binds a type (including object TypeSchema) to a field name and augments it with optionality, nullability, defaults, and constraints.

## Examples

```io
# Object TypeSchema used directly as a field type
address: { street: string, city: string }

# MemberDef adds optional/nullable
address?: { street: string, city: string }
info*:    { k: string, v: string }

# MemberDef with default
settings: { { *: string }, default: { theme: 'dark' } }
```

In the last example, `{ *: string }` is the object TypeSchema and `default` belongs to the MemberDef that binds it to `settings`.

## Validation Flow

1. MemberDef checks presence (`optional`) and nullability (`null`).
2. If omitted and `default` exists, use default.
3. Validate the value against the object TypeSchema:
   - Declared members first
   - Then open/closed policy for extra keys

## References

- `the-io-schema/11-memberdef.md`
- `the-io-schema/10-internet-object-schema.md`
- `the-io-schema/validation-rules/01-validation-model.md`
