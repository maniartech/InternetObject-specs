# Advanced Types

Complex type patterns for recursive structures, unions, and custom validators.

## Overview

Advanced types extend the IO type system with patterns for:
- **Recursive types**: Self-referential schemas (trees, graphs)
- **Union types**: Multiple type alternatives
- **Custom types**: User-defined validators

## Contents

- [01-recursive-types.md](01-recursive-types.md) — Self-referential schemas
- [02-union-types.md](02-union-types.md) — Multiple type alternatives
- [03-custom-types.md](03-custom-types.md) — User-defined validators

## When to Use

- Recursive: tree structures, nested comments, organizational hierarchies
- Union: polymorphic data, variant types, multiple allowed formats
- Custom: domain-specific validation, business rules, external validators

## References

- `io-js2/src/schema-v2/types/type-schema.ts`
- `the-io-schema/validation-rules/05-custom-validators.md`
