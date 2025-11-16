# The IO Schema

> **Status:** Draft Specification
> **Purpose:** Comprehensive Internet Object Schema documentation
> **Evidence Base:** Implementation in io-js2/src/schema & io-js2/src/schema-v2

---

## Overview

This section documents the **Internet Object Schema system** - how schemas are defined, validated, and used to structure IO documents. All content is derived from the actual implementation and real-world usage examples.

## What is an IO Schema?

An Internet Object schema defines the **structure ("shape") of objects** in IO documents. Unlike verbose map-based standards (JSON Schema, XML Schema), IO schemas use the **same concise syntax** as the data itself, making them both human-friendly and machine-tractable.

### Core Principles

1. **Schema as Data**: Schemas use the same object syntax as actual data
2. **Type Safety**: Built-in type validation with constraints
3. **Progressive Enhancement**: Start simple (untyped), add constraints as needed
4. **Composition**: Nested schemas and reusable definitions
5. **Validation Pipeline**: Parse → Validate → Load → Stringify

## Schema Components

An IO schema consists of:

- **MemberDef**: Field definitions with types, constraints, and modifiers
- **TypeSchema**: Type validators implementing parse/load/validate/stringify
- **Schema**: Container for member definitions with open/closed semantics
- **Definitions**: Named schemas and variables for reuse

## Quick Examples

### Minimal Schema (Untyped)
```io
name, age, address
```
All fields default to `any` type.

### Typed Schema
```io
name: string, age: int, isActive: bool
```

### With Constraints (MemberDef)
```io
name: {string, maxLen: 100}, age: {int, min: 0, max: 120}
```

### Nested Schema
```io
address: { street: string, city: string, zip?: int }
```

### Closed Schema (default)
```io
user: { id: string, name: string }  # only declared keys allowed
```

### Open Schema
```io
# Boolean open: allow any extra keys
user: { id: string, name: string, * }

# Typed open: extra keys must match the given TypeSchema
config: { theme: string, *: string }
```

Note: This is schema openness (allowing extra fields). Do not confuse with object literal open/closed forms described in `the-structure/values/object.md`.

### Reusable Schema
```io
~ $address: {street: string, city: string}
~ $user: {name: string, age: int, address: $address}
```

## Documentation Structure

This section is organized as follows:

### Core Concepts
- **[10-internet-object-schema.md](10-internet-object-schema.md)** - Schema definition & compilation
- **[11-memberdef.md](11-memberdef.md)** - Field definitions (MemberDef specification)
- **[12-typeschema.md](12-typeschema.md)** - Type validators (TypeSchema interface)

### Type System
- **[data-types/](data-types/)** - All built-in types with constraints and examples
  - Primitives: any, boolean, null, undefined
  - String: patterns, lengths, constraints
  - Number: int, float, bigint, decimal with ranges
  - Collections: arrays and collections
  - Objects: nested structures
  - Advanced: recursive, union, custom types

### Schema Rules
- **[schema-rules/](schema-rules/)** - Composition, resolution, references
  - Schema resolution and lazy loading
  - Schema composition and reuse
  - $schema references and variables
  - Validation flow and pipeline

### Validation
- **[validation-rules/](validation-rules/)** - Validation specifications
  - Validation model (parse vs validate vs load)
  - Optional (?) and nullable (*) semantics
  - Type inference rules
  - Error handling and reporting
  - Custom validators

## Evidence Sources

All documentation is based on:

1. **Implementation**: `io-js2/src/schema` (Schema v1) and `io-js2/src/schema-v2` (TypeSchema v2)
2. **Examples**: `io-playground/src/sample-data` (Real usage patterns)
3. **Existing Docs**: `schema-definition-language/` (Partial specifications)

## Key Differences: Schema v1 vs v2

### Schema v1 (Current Stable)
- Located in: `io-js2/src/schema`
- Uses: `Schema` class with `MemberDef` objects
- Pattern: Mutable schema construction
- Status: Production-ready, 1,400+ tests

### Schema v2 (TypeSchema Interface)
- Located in: `io-js2/src/schema-v2`
- Uses: `TypeSchema` interface with functional validators
- Pattern: Parse → Validate → Load → Stringify
- Status: Work in progress, architectural foundation

**This documentation covers both versions** where they differ significantly.

## Navigation

### Quick Start
- [QUICKSTART.md](01-QUICKSTART.md) - Get started with schemas in 5 minutes

### Core Documentation
1. **Schema Fundamentals**
   - [Internet Object Schema](10-internet-object-schema.md)
   - [MemberDef Specification](11-memberdef.md)
   - [TypeSchema Interface](12-typeschema.md)

2. **Type System**
   - [Type Index](data-types/01-TYPE-INDEX.md)
   - [Primitives](data-types/primitives/)
   - [Strings](data-types/string/)
   - [Numbers](data-types/number/)
   - [Collections](data-types/collections/)
   - [Objects](data-types/objects/)
   - [Advanced Types](data-types/advanced/)

3. **Schema Rules**
   - [Schema Resolution](schema-rules/01-schema-resolution.md)
   - [Schema Composition](schema-rules/02-schema-composition.md)
   - [Schema References](schema-rules/03-schema-references.md)
   - [Validation Flow](schema-rules/04-validation-flow.md)

4. **Validation**
   - [Validation Model](validation-rules/01-validation-model.md)
   - [Optional & Nullable](validation-rules/02-optional-nullable.md)
   - [Type Inference](validation-rules/03-type-inference.md)
   - [Error Handling](validation-rules/04-error-handling.md)
   - [Custom Validators](validation-rules/05-custom-validators.md)

## Related Sections

This schema documentation complements:

- **[the-structure/](../the-structure/)** - Literals, whitespace, structural characters, encoding
- **[the-collections/](../the-collections/)** - Collection creation, data streaming
- **[the-definitions/](../the-definitions/)** - Complex schemas, definitions, variables
- **[internet-object/](../internet-object/)** - Abstract, introduction, objectives, zen

## Contributing

When documenting schemas:

1. ✅ **Evidence-based**: Reference actual implementation code
2. ✅ **Examples first**: Show real usage from io-playground
3. ✅ **Progressive**: Simple examples → complex patterns
4. ✅ **Cross-reference**: Link to related syntax/structure docs
5. ❌ **No invention**: Document what exists, not what could exist

---

**Next Steps:**
- New to schemas? Start with [QUICKSTART.md](01-QUICKSTART.md)
- Need reference? See [Type Index](data-types/01-TYPE-INDEX.md)
- Building validators? Read [TypeSchema Interface](12-typeschema.md)
