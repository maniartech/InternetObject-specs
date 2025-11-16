# IO Type System (Schema Perspective)

## Overview

This section explains how types are defined and validated via TypeSchema + MemberDef, and how container types (arrays/objects) apply validation to their contents.

- Primitives: any, boolean, null, undefined
- String: constraints (minLen, maxLen, pattern, choices)
- Number: number, bigint, decimal (ranges via constraints)
- Arrays: array item schema + array-level constraints
- Objects: object type vs MemberDef (field rules)
- Advanced: recursive, union, custom

## Scope and Non-Goals

- Types here are schema constructs (not literal syntax). For literals, use `the-structure/values/`.
- Collections are not a type. They are root-level sections for streaming multiple objects; see `the-collections/`.

## Container Types

Arrays and objects are container types with their own validation semantics:

- Arrays: resolve the item schema first; validate each element; then apply array-level constraints (e.g., length bounds, uniqueness) to the whole array.
- Objects: resolve each field’s TypeSchema (including nested containers); enforce optional/nullable/defaults and constraints; apply dynamic field rules (`*`) for extra keys.

## Cross-References

- Literal representation: `the-structure/values/`
- Collections (not a type): see `the-collections/` for root-level collection sections and streaming. Do not use `~` as a field value.
- Reuse/variables: `the-definitions/`
