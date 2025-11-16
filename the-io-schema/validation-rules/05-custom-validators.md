# Custom Validators

> Extending validation using TypeSchema and MemberDef hooks.

## Approaches
- Implement a new TypeSchema (v2)
- Wrap validation in compile(config) for hot paths
- Use choices/patterns/range constraints first when possible

## Evidence
- `io-js2/src/schema-v2/types/type-schema.ts` (contract)
- Existing types under `io-js2/src/schema/types/` as reference implementations
