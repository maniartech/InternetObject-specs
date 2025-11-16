# Optional (?) and Nullable (*)

> Conventions interpreted by schema processors (not parser syntax).

## Semantics
- `?` optional → field may be omitted (undefined unless defaulted)
- `*` nullable → field may be null
- `?*` both → omitted or null. The order does not matter, e.g., `*?` is equivalent.

## Evidence
- `io-js2/src/schema/processing/member-processor.ts`
- `io-js2/src/schema/utils/validation-utils.ts`
