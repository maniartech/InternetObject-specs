# Validation Flow

> End-to-end flow across parse, validate, load, and stringify.

## V2 Pipeline
1. parse(Node) → JS value (with position info)
2. validate(value, config) → throws on failure
3. load(value, config) → JS programmatic validation
4. stringify(value, config) → IO text

## Error Handling
- Throw IOValidationError in validators
- Collections catch and aggregate per element

## Evidence
- `io-js2/src/schema-v2/types/type-schema.ts`
- `io-js2/src/schema/validation/schema-validator.ts`
