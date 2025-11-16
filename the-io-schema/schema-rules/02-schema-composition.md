# Schema Composition

> Reuse and extension patterns for schemas.

## Patterns
- Reuse named schemas via `$schemaRef`
- Compose nested objects
- Extend by adding optional fields at the end (positional-safe)

## Evidence
- `io-js2/src/schema/schema.ts` (container semantics)
- `io-js2/src/schema/processing/member-processor.ts` (ordering/optionals)
