# Schema Resolution

How `$schema` and `@var` references are resolved during parse/load, and the order in which resolution happens before validation.

## Overview
- `$name` resolves to a named schema defined in section headers.
- `@var` resolves to a variable value available in context.
- Resolution completes before type validation begins.

## Resolution Order
1) Collect named schemas and variables from headers/context.
2) Resolve `$name` and `@var` references in MemberDefs and nested TypeSchemas.
3) Produce a fully-resolved schema tree for validation.

## Containers: Arrays and Objects
Arrays and objects are container types with nested resolution:

- Arrays: resolve the item schema first, then validate each element. Apply array-level constraints (e.g., minLen, maxLen, unique) after element validation.
- Objects: resolve each field’s TypeSchema (including nested containers), then validate fields (required/optional, nullable, defaults, constraints). Schema open policy (`*` / `*: T`) resolves its target schema before validating extra keys.

Error locality
- Arrays: attach errors to the failing index; array-level violations attach to the array node.
- Objects: attach errors to the failing field; object-level violations (e.g., unknown field policy) attach to the object node.

## References
- V1: `io-js2/src/schema/utils/schema-resolver.ts`
- V2: `io-js2/src/schema-v2/utils/lazy-resolution.ts`
- See also: `the-io-schema/validation-rules/01-validation-model.md`, `the-io-schema/11-memberdef.md`
