# Type Inference

> How types are determined when omitted or partially specified.

## Rules
- Bare field name → `any`
- `{ type, ... }` → explicit
- Arrays `[type]` infer element type

## Evidence
- `io-js2/src/schema/types/common-type.ts`
- `io-js2/src/schema/types/array.ts`
