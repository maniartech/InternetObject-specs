# Quick Start: Internet Object Schema

Get up to speed with the schema model in minutes.

## 1) Define a simple schema

```io
name: string, age?: int, isActive: bool
```

- `?` makes a field optional
- Types are validated (string/int/bool)

Try it: see `io-playground/src/sample-data/simple/simple-object.ts`.

## 2) Add constraints (MemberDef)

```io
name: {string, minLen: 2, maxLen: 50}
age:  {int,    min: 0,  max: 150}
```

- Curly form `{type, ...constraints}` is a MemberDef: it binds a TypeSchema to a field with constraints.

References: `io-js2/src/schema/types/string.ts`, `.../common-number.ts`

## 3) Nest objects

```io
address: { street: string, city: string, zip?: int }
```

- Nested object must use `{ ... }`.

Reference: `io-js2/src/schema/types/object.ts`

## 4) Arrays (in objects) vs Collections (root sections)

```io
# Arrays are part of objects
skills: [string]
```

- `[type]` = array of type.

Reference: `io-js2/src/schema/types/array.ts`

```io
# Collection section (root-level; not a field value)
~ 2025-11-16T12:00:01Z, Started
~ 2025-11-16T12:00:02Z, Completed
```

- Collections are document sections composed of independent items.
- Do not use `~` as a member value (e.g., `logs: ~ [...]` is invalid).

See also: `the-collections/collection.md`, `io-playground/src/sample-data/simple/typed-collection.ts`

## 5) Optional, nullable, dynamic

```io
nick?: string   # optional
bio*:  string   # nullable (can be null)
*:     string   # dynamic extra fields must be string
```

- `?` optional, `*` nullable or dynamic (contextual).

Reference: `io-js2/src/schema/processing/member-processor.ts`

## 6) Reuse with $schemas and @vars

```io
~ $address: { street: string, city: string }
~ $user:    { name: string, address: $address }
```

References: `io-js2/src/schema/utils/schema-resolver.ts`, `io-js2/src/schema-v2/utils/lazy-resolution.ts`

## 7) Validation pipeline (v2)

- parse(Node) → validate(value) → load(value) → stringify(value)

Reference: `io-js2/src/schema-v2/types/type-schema.ts`

## Next steps

- Read the overview: [Internet Object Schema](10-internet-object-schema.md)
- See types: [Type Index](data-types/01-TYPE-INDEX.md)
- Learn validation: [Validation Model](../the-io-schema/validation-rules/01-validation-model.md)
