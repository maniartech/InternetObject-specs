# Error Handling

> Error model for validators and processors.

## Principles
- Validators throw IOValidationError immediately on failure
- Error messages carry code + position (when from parse)
- Collection processors aggregate element errors

## Evidence
- `io-js2/src/schema/validation/schema-validator.ts`
- `io-js2/src/schema-v2/utils/test-helpers.ts`
