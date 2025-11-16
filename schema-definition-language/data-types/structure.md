# Data Types Structure and Organization

This document outlines the structural organization and formatting conventions for Internet Object schema data type specifications.

## Standard Structure

Each data type specification should follow this 8-section structure:

### 1. Introduction
- Brief explanation of the data type and its purpose
- Key characteristics and use cases
- Links to related parsing documentation

### 2. TypeDef (Meta MemberDef)
- Canonical TypeDef code block
- Short forms and their canonical equivalents
- Summary table of all TypeDef members

### 3. TypeDef Member Details
- Detailed explanation of each TypeDef member
- Purpose, valid values, defaults, and usage examples
- Cross-references to related concepts

### 4. Common Patterns and Usage
- Typical usage patterns and shortcuts
- Best practices and recommendations
- When to use different forms

### 5. Examples
- Comprehensive examples showing validation scenarios
- Both valid and invalid cases with explanations
- Real-world usage examples

### 6. Derived Types and Subtypes
- Table of derived types (if any)
- Explanation of type relationships
- Usage guidance for derived types

### 7. FAQ & Notes
- Common questions and pitfalls
- Best practices and recommendations
- Comparison to other standards (JSON Schema, etc.)

### 8. See Also
- Cross-references to related documentation
- Links to parsing specifications
- References to dependent specifications

## Enhanced Object Type Organization

Based on analysis of current object specification challenges, here's the recommended improved organization for object type documentation:

### Improved Section 1: Introduction
```markdown
# Object Type in Internet Object

## 1. Introduction

The **object** type represents structured data with named properties in Internet Object schemas. Objects are the primary mechanism for organizing related data into logical groups.

**Key characteristics:**
- Key-value pairs with typed properties
- Support for nested structures
- Flexible schema validation (open/closed)
- Optional and nullable field support

**Common use cases:**
- User profiles, configuration objects, API responses
- Nested data structures (address within user)
- Polymorphic data with shared base properties
```

### Enhanced Section 2: TypeDef with Summary Table
```markdown
## 2. TypeDef (Meta MemberDef)

### Canonical TypeDef
[TypeDef code block using `io` language tag]

### TypeDef Members Summary
| Member | Type | Default | Description |
|--------|------|---------|-------------|
| type | string | object | Enforces object type validation |
| default | object | - | Default value when field omitted |
| choices | [object] | - | Exact object matches allowed |
| schema | object | {} | Property definitions and structure |
| optional | bool | F | Field may be omitted |
| null | bool | F | Value may be N (null) |
| open | any | F | Additional properties policy |
```

### Systematic Section 3: Member Details
```markdown
## 3. TypeDef Member Details

### type
- **Purpose:** Validates the value is an object type
- **Values:** Must be `object`
- **Usage:** `{type: object}` or implied in `{object}`

### schema
- **Purpose:** Defines object structure and property validation
- **Values:** Object with property definitions
- **Default:** `{}` (any object structure allowed)
- **Usage:** `{schema: {name: string, age: int}}`

### open
- **Purpose:** Controls additional properties beyond schema
- **Values:** `F` (closed), `T` (any), type constraint, or array of types
- **Default:** `F` (closed - no additional properties)
- **Usage:** `{open: string}`, `{open: [string, int]}`

[Continue systematically for each member...]
```

### Focused Section 4: Common Patterns
```markdown
## 4. Common Patterns and Usage

### Basic Forms
- **Unconstrained:** `object`, `{}`, `{object}`
- **Direct schema:** `{name: string, age: int}`
- **MemberDef:** `{object, schema: {name: string, age: int}}`

### With Modifiers
- **Optional:** `user?: {name: string}`
- **Nullable:** `data*: {id: string}`
- **Both:** `config?*: {theme: string}`

### Open Schemas
- **Boolean open:** `{name: string, *}`
- **Typed open:** `{name: string, *: string}`
- **Union open:** `{name: string, *: string, *: int}`
```

### Streamlined Section 5: Examples
Focus on 3-4 key scenarios instead of exhaustive coverage:
- Closed schema validation
- Open schema with constraints
- Optional/nullable combinations
- One complex nested example

### Complete Section 6: Derived Types
```markdown
## 6. Derived Types and Subtypes

The `object` type has no official derived types. All object variations are achieved through:
- Schema constraints
- Open/closed policies
- Field modifiers

| Derived Type | Description | Example |
|--------------|-------------|---------|
| object | Base object type | `{name: string, age: int}` |

For specialized object validation, use schema constraints rather than derived types.
```

### Practical Section 7: FAQ & Notes
```markdown
## 7. FAQ & Notes

### Common Questions
**Q: When to use `{}` vs `object` vs `{object}`?**
A: All equivalent for unconstrained objects. Use `{}` for brevity, `{object}` when adding constraints.

**Q: Default behavior for additional properties?**
A: Closed by default (`open: F`). Use `*` syntax or `open: T` to allow extras.

**Q: Can I mix definition approaches?**
A: Yes, combine direct schema, MemberDef, and type strings within same schema.

### Best Practices
- Use direct schema syntax `{name: string}` for simple cases
- Use MemberDef `{object, schema: {...}, default: {...}}` for complex validation
- Always specify field optionality explicitly with `?` when intended

### Comparison to JSON Schema
- IO `open: F` ≈ JSON Schema `additionalProperties: false`
- IO `schema: {name: string}` ≈ JSON Schema `properties: {name: {type: "string"}}`
- IO `choices: [...]` ≈ JSON Schema `enum: [...]`
```

## Key Improvements for Object Type

1. **Standard structure** following the 8-section template
2. **Clear introduction** explaining what objects are conceptually
3. **Systematic TypeDef coverage** with summary table + detailed breakdown
4. **Focused examples** instead of exhaustive scenarios
5. **Practical FAQ** addressing real confusion points
6. **Better navigation** with predictable section organization

This organization:
- Makes the spec more scannable
- Reduces redundancy between main content and FAQ
- Follows established patterns for consistency
- Answers questions within the spec rather than requiring separate FAQ documents

## Implementation Notes

When applying this structure to existing object documentation:

1. **Reorganize existing content** into the 8 standard sections
2. **Add missing sections** (particularly introduction and member details)
3. **Consolidate examples** to focus on key scenarios
4. **Integrate FAQ content** into appropriate sections rather than maintaining separate FAQ documents
5. **Use consistent formatting** with proper code fence language tags (`io` for Internet Object syntax)
6. **Cross-reference effectively** between related concepts and external documentation
