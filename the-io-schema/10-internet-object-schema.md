# Internet Object Schema

This page describes the schema container and its behavior. It does not duplicate literal syntax (see `the-structure/`) or collection mechanics (see `the-collections/`).

## What is a Schema?

A Schema defines the shape of an object using the same concise syntax as data. It consists of named members (fields), each described by a MemberDef that binds a type and constraints to a field name.

## V1 Runtime (Stable)

- Class: `Schema` in `io-js2/src/schema/schema.ts`
- Members stored in `names: string[]` and `defs: MemberMap`
- Open object semantics via `schema.open` (boolean | MemberDef)
- Builders: `Schema.create()` and legacy `Schema.fromLegacy()`

### Responsibilities
- Hold member definitions
- Control additional properties via `open`
- Provide accessors `get()`, `has()`, `memberCount`

## V2 Runtime (In Progress)

- Interface: `TypeSchema` in `io-js2/src/schema-v2/types/type-schema.ts`
- Phases: `parse(node)`, `load(value)`, `validate(value)`, `stringify(value)`
- Throw-on-failure contract (IOValidationError)
- Optional `compile(config)` for hot-path validation

## Open vs Closed Schema

Note: This section describes schema openness (whether extra fields are allowed by the schema). Do not confuse this with object literal syntax forms (open vs closed objects) defined in `the-structure/values/object.md`.

- Closed schema (default): only declared fields allowed
- Open schema (boolean): `*` → allow any extra fields
- Open schema (typed): `*: type` → extra fields must match MemberDef

## Positional vs Keyed Mapping

- Positional fields allowed only before any keyed field
- Once a `name: type` appears, remaining members must be keyed

## Reuse & References

- `$schema` references for reuse
- `@var` variable references resolved during parse/load
- Evidence: `io-js2/src/schema/utils/schema-resolver.ts`, v2 `utils/lazy-resolution.ts`

## Resolution & Validation (In Practice)

Order of operations:
1) Resolve `$name` and `@var` references in MemberDefs and nested TypeSchemas.
2) Validate values using the resolved schema tree (per-field for objects; per-element for arrays).
3) Apply container-level rules (object open policy, array length/uniqueness).

Error locality:
- Arrays: errors attach to the failing index; array-level violations attach to the array node.
- Objects: errors attach to the failing field; object-level violations attach to the object node.

See `schema-rules/01-schema-resolution.md` and `validation-rules/01-validation-model.md`.

## Collections (Not a Type)

Collections are root-level sections for streaming independent objects. They are not a field type and must not appear as a member value. See `the-collections/collection.md`.

## Best Practices

- Prefer explicit types; avoid bare `any`
- Minimize dynamic `*` unless necessary
- Canonicalize for interop (fully keyed & typed)

## References

- [MemberDef Specification](11-memberdef.md)
- [TypeSchema Interface](12-typeschema.md)
- [Schema Resolution](schema-rules/01-schema-resolution.md)
- [Validation Flow](schema-rules/04-validation-flow.md)
