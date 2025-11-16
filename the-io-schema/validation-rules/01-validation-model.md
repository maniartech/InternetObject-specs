# Validation Model

How TypeSchemas validate values across parse, load, and stringify.

## Phases
- parse(Node): extract value from syntax and validate
- load(value): validate a JS value directly
- stringify(value): serialize a validated value to IO form

## Container Semantics

- Arrays: validate each element against the resolved item schema; then apply array-level constraints (length, uniqueness). Errors carry the failing index.
- Objects: validate each field per its MemberDef (required/optional, nullable, defaults, constraints). Schema open policy (`*` / `*: T`) applies to extra keys. Errors carry the field key.

## Throwing Contract

- Validators throw IOValidationError on failure.
- When processing collection sections, item errors are isolated and aggregated per item; non-failing items continue processing.

## References
- `io-js2/src/schema-v2/types/type-schema.ts`
- `io-js2/src/schema/validation/schema-validator.ts`
