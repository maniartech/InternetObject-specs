# Optional (?) and Nullable (*)

How optional and nullable modifiers control field presence and null values in schema validation.

## Overview

- `?` (optional): field may be omitted; omitted fields evaluate to undefined unless a default is provided.
- `*` (nullable): field value may be null.
- `?*` or `*?` (both): field may be omitted or null. Order does not matter.

## Examples

```io
# Optional field
name?: string

# Nullable field
bio*: string

# Both (omittable and nullable)
note?*: string
note*?: string  # equivalent
```

## Validation Order

1. Check presence: if field is omitted and not optional, validation fails.
2. Check null: if value is null and not nullable, validation fails.
3. Apply default: if field is omitted and a default exists, use the default.
4. Validate type: run the TypeSchema validation on the resolved value.

## Interaction with Defaults

- Defaults apply after optionality checks; a defaulted field behaves as if it were provided.
- Defaults must themselves be valid for the field's TypeSchema.

## References

- `io-js2/src/schema/processing/member-processor.ts`
- `io-js2/src/schema/utils/validation-utils.ts`
