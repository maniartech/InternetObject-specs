# Recursive Types

Self-referential schemas for tree structures and nested data.

## Overview

Recursive types allow schemas to reference themselves, enabling validation of hierarchical structures like trees, graphs, and nested comments.

## Syntax

Use `$schema` references to create recursive schemas:

```io
~ $node: {
  value: string,
  children?: [$node]
}
```

## Basic Examples

### Tree Structure

```io
~ $tree: {
  id: string,
  name: string,
  children?: [$tree]
}
---
# Data
{
  root,
  Root Node,
  [
    {child1, Child 1, []},
    {child2, Child 2, [
      {grandchild, Grandchild, []}
    ]}
  ]
}
```

### Nested Comments

```io
~ $comment: {
  id: string,
  text: string,
  author: string,
  replies?: [$comment]
}
---
{
  c1,
  Great post!,
  Alice,
  [
    {c2, Thanks!, Bob, []},
    {c3, Agreed., Carol, []}
  ]
}
```

## TypeSchema (IO)

Recursive types are expressed via `$name` references:

```io
# Recursive schema definition
~ $recursiveType: {
  field: string,
  nested?: [$recursiveType]
}

# Usage
data: $recursiveType
```

> Common fields like `optional` and `null` are explained in `the-io-schema/data-types/00-common-fields.md`.

## Validation Behavior

1. Resolve `$name` reference lazily (avoid infinite loops during schema construction).
2. Validate each level of nesting independently.
3. Array validation applies to each element recursively.
4. Errors attach to the specific nesting level where validation fails.

## Common Patterns

### Organizational Hierarchy

```io
~ $org: {
  id: string,
  name: string,
  manager?: string,
  reports?: [$org]
}
```

### File System

```io
~ $fsNode: {
  name: string,
  type: {string, choices: [file, directory]},
  children?: [$fsNode]
}
```

### Menu Structure

```io
~ $menu: {
  label: string,
  path?: string,
  submenu?: [$menu]
}
```

## Best Practices

- Use `?` for optional recursive fields to allow leaf nodes.
- Validate termination conditions (e.g., empty arrays).
- Consider depth limits for very deep structures (application-level).
- Document expected structure and nesting patterns.

## References

- `io-js2/src/schema/utils/schema-resolver.ts`
- `io-js2/src/schema-v2/utils/lazy-resolution.ts`
- `the-io-schema/schema-rules/01-schema-resolution.md`
