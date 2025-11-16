# Internet Object Schema Specification - Directory Structure Plan

> **Created:** November 12, 2025
> **Purpose:** Detailed directory and file structure for professional schema specifications
> **Status:** Planning Phase

---

## 📁 Complete Directory Structure

> **Note:** The `the-io-schema/` section focuses exclusively on:
> - This will be a parallel directory to existing `schema-definition-language/`. Once the schema definition language is finalized, this new directory will replace the `schema-definition-language/` directory. It will focus on finalizing the schema specification, including...
> - Schema structure, rules, and validation
> - Type constraints and validation rules
> - Schema composition and resolution
>
> It does NOT duplicate structural elements covered in:
> - `the-structure/` (literals, whitespaces, structural characters, encoding)
> - `the-collections/` (collection creation, data streaming)
> - `the-definitions/` (complex schemas, definitions, variables)
> - `internet-object/` (abstract, introduction, objectives, zen)

```text
io-specs/
└── the-io-schema/
  │
  ├── README.md                       # ✅ Schema spec overview (links to the-structure, etc.)
  ├── 01-QUICKSTART.md                   # 🆕 Quick start (schema-focused)
  ├── (CHANGELOG deferred)               # ❌ Removed for draft stage
  │
  ├── 10-internet-object-schema.md       # ✏️ Schema definition & compilation
  ├── 11-memberdef.md                    # ✏️ MemberDef specification
  ├── 12-typeschema.md                   # ✏️ TypeSchema specification
  │
  ├── data-types/                        # ✏️ Type system (schema perspective, NOT syntax)
  │   ├── README.md                      # Type system overview (links to the-structure/values/)
  │   ├── 01-TYPE-INDEX.md               # Quick reference chart
  │   │
  │   ├── primitives/                    # Primitive type schemas
  │   │   ├── README.md                  # Primitives overview
  │   │   ├── 01-any.md                  # Any type TypeSchema & constraints
  │   │   ├── 02-boolean.md              # Boolean TypeSchema & constraints
  │   │   ├── 03-null.md                 # Null type semantics
  │   │   └── 04-undefined.md            # Undefined semantics
  │   │
  │   ├── string/                        # String type schema
  │   │   ├── README.md                  # String schema overview (refs the-structure/values/string/)
  │   │   └── 01-string.md               # String TypeSchema & constraints (minLen, maxLen, regex, patterns)
  │   │
  │   ├── number/                        # Number type schemas
  │   │   ├── README.md                  # Number schema overview (refs the-structure/values/number/)
  │   │   ├── 01-number.md               # Number TypeSchema & constraints (min, max, range, subtypes)
  │   │   ├── 02-bigint.md               # BigInt TypeSchema & constraints
  │   │   └── 03-decimal.md              # Decimal TypeSchema & constraints
  │   │
  │   ├── collections/                   # Collection type schemas
  │   │   ├── README.md                  # Collections overview (refs the-collections/)
  │   │   ├── 01-array.md                # Array TypeSchema & constraints
  │   │   └── 02-collection.md           # Collection (~) TypeSchema & constraints
  │   │
  │   ├── objects/                       # Object type schemas
  │   │   ├── README.md                  # Objects overview (refs the-structure/values/object.md)
  │   │   ├── 01-object.md               # Object TypeSchema & constraints
  │   │   └── 02-object-vs-memberdef.md  # Critical distinction: object TYPE vs MemberDef
  │   │
  │   └── advanced/                      # Advanced type schemas
  │       ├── README.md                  # Advanced types overview
  │       ├── 01-recursive-types.md      # Recursive schema TypeSchema
  │       ├── 02-union-types.md          # Union type constraints
  │       └── 03-custom-types.md         # User-defined TypeSchema creation
  │
  ├── schema-rules/                      # 🆕 Schema composition rules
  │   ├── README.md                      # Overview
  │   ├── 01-schema-resolution.md        # How schemas are resolved
  │   ├── 02-schema-composition.md       # Reuse and extension
  │   ├── 03-schema-references.md        # $schemaName references (refs the-definitions/)
  │   └── 04-validation-flow.md          # Validation execution model
  │
  ├── validation-rules/                  # ✏️ EXISTS - Validation specifications
  │   ├── README.md                      # Validation overview
  │   ├── 01-validation-model.md         # Parse vs validate vs load
  │   ├── 02-optional-nullable.md        # Optional (?) and nullable (*) semantics
  │   ├── 03-type-inference.md           # When and how types are inferred
  │   ├── 04-error-handling.md           # Validation errors and reporting
  │   └── 05-custom-validators.md        # User-defined validation logic

## 📁 Directory Trees by Scope

### 1. Current Schema Spec Draft (Simplified)

```text
io-specs/
└── the-io-schema/
    ├── README.md
    ├── 01-QUICKSTART.md
    ├── 10-internet-object-schema.md
    ├── 11-memberdef.md
    ├── 12-typeschema.md
    ├── data-types/
    │   ├── README.md
    │   ├── 01-TYPE-INDEX.md
    │   ├── primitives/
    │   │   ├── README.md
    │   │   ├── 01-any.md
    │   │   ├── 02-boolean.md
    │   │   ├── 03-null.md
    │   │   └── 04-undefined.md
    │   ├── string/
    │   │   ├── README.md
    │   │   └── 01-string.md
    │   ├── number/
    │   │   ├── README.md
    │   │   ├── 01-number.md
    │   │   ├── 02-bigint.md
    │   │   └── 03-decimal.md
    │   ├── collections/
    │   │   ├── README.md
    │   │   ├── 01-array.md
    │   │   └── 02-collection.md
    │   ├── objects/
    │   │   ├── README.md
    │   │   ├── 01-object.md
    │   │   └── 02-object-vs-memberdef.md
    │   └── advanced/
    │       ├── README.md
    │       ├── 01-recursive-types.md
    │       ├── 02-union-types.md
    │       └── 03-custom-types.md
    ├── schema-rules/
    │   ├── README.md
    │   ├── 01-schema-resolution.md
    │   ├── 02-schema-composition.md
    │   ├── 03-schema-references.md
    │   └── 04-validation-flow.md
    └── validation-rules/
        ├── README.md
        ├── 01-validation-model.md
        ├── 02-optional-nullable.md
        ├── 03-type-inference.md
        ├── 04-error-handling.md
        └── 05-custom-validators.md
```

### 2. Structural Elements (Already Exist - DO NOT DUPLICATE)

```text
the-structure/           # Covers: literals, whitespaces, structural chars, encoding
the-collections/         # Covers: collection creation, data streaming, validation rules
the-definitions/         # Covers: complex schemas, definitions, variables
internet-object/         # Covers: abstract, intro, objectives, zen
```

### 3. Future/Optional Sections (Not in Draft)

```text
examples/                # Complete working examples
tutorials/               # Step-by-step learning paths
comparison/              # Compare with other formats
interoperability/        # Working with other formats
practical-guides/        # How-to guides and patterns
reference/               # Complete reference materials
```

---

## 📊 File Statistics (Revised)

### Overall Counts

- **Total Directories:** 9
- **Total Files:** ~42 files (CHANGELOG deferred)
- **Existing Files to Update:** 3 (internet-object-schema.md, memberdef.md, typeschema.md)
- **New Files to Create:** ~39

### By Category

| Category | Directories | Files | Existing | New |
|----------|------------|-------|----------|-----|
| **Root** | 1 | 5 | 3 | 2 |
| **Data Types** | 6 | 26 | 0 | 26 |
| **Schema Rules** | 1 | 5 | 0 | 5 |
| **Validation Rules** | 1 | 6 | 0 | 6 |
| **TOTAL** | **9** | **42** | **3** | **39** |

---

## 🎯 File Priority Matrix (Revised)

### Priority 1: Critical (Must Have) - Week 1-2

**Root Files**
- ✅ README.md (update - link to existing dirs)
- ✅ 01-QUICKSTART.md (schema-focused)
- ✅ 10-internet-object-schema.md (update)
- ✅ 11-memberdef.md (update)
- ✅ 12-typeschema.md (update)

**Data Types - Core (12 files)**
- ✅ data-types/README.md
- ✅ data-types/01-TYPE-INDEX.md
- ✅ data-types/primitives/ (5 files: README + 4 types)
- ✅ data-types/string/ (2 files: README + string.md)
- ✅ data-types/number/ (4 files: README + 3 number types)

**Schema Rules (5 files)**
- ✅ schema-rules/README.md
- ✅ schema-rules/01-schema-resolution.md
- ✅ schema-rules/02-schema-composition.md
- ✅ schema-rules/03-schema-references.md
- ✅ schema-rules/04-validation-flow.md

**Total: 22 files**

---

### Priority 2: Important (Should Have) - Week 3

**Data Types - Collections & Advanced (12 files)**
- ✅ data-types/collections/ (3 files: README + 2 types)
- ✅ data-types/objects/ (3 files: README + 2 docs)
- ✅ data-types/advanced/ (4 files: README + 3 advanced types)

**Validation Rules (6 files)**
- ✅ validation-rules/README.md
- ✅ validation-rules/01-validation-model.md
- ✅ validation-rules/02-optional-nullable.md
- ✅ validation-rules/03-type-inference.md
- ✅ validation-rules/04-error-handling.md
- ✅ validation-rules/05-custom-validators.md

**Total: 18 files**

---

## 📋 File Templates

### Template: Type Documentation

```markdown
# Type Name

> **Type Category:** Primitive | String | Number | Collection | Object | Advanced
> **Since:** v1.0 | v2.0
> **Status:** Stable | Experimental
> **Related:** [link], [link]

## Overview

Brief 2-3 sentence description of the type.

## Basic Usage

### Simple Example

\`\`\`io
schema
---
data
\`\`\`

**Output:** Description of what happens

### Syntax

\`\`\`io
fieldName: type
fieldName: {type, constraint: value}
\`\`\`

## Type Definition (TypeSchema)

### Schema

\`\`\`io
type?     : {type, choices: [...]},
default?  : type,
optional? : {bool, F},
null?     : {bool, F},
...
\`\`\`

### Positional Values

1. Position 1: type variant
2. Position 2: default value
3. Position 3: choices array

## Constraints

| Constraint | Type | Default | Description | Example |
|------------|------|---------|-------------|---------|
| ... | ... | ... | ... | ... |

## Derived Types

(If applicable)

List of derived types with brief descriptions.

## Examples

### Basic Example

\`\`\`io
schema
---
data
\`\`\`

### With Constraints

\`\`\`io
schema
---
data
\`\`\`

### Complex Example

Real-world example from io-playground.

## Edge Cases

### Special Values

How the type handles null, undefined, default, etc.

### Validation Behavior

Edge cases in validation.

## Common Mistakes

### ❌ Wrong

\`\`\`io
// Invalid code
\`\`\`

**Error:** Error message

**Why:** Explanation

### ✅ Right

\`\`\`io
// Correct code
\`\`\`

**Explanation:** Why this is correct

## Performance Notes

- Tips for efficient usage
- Performance characteristics
- Best practices

## Interoperability

### JSON

How this type maps to/from JSON.

### TypeScript

TypeScript equivalent type.

### Other Formats

Avro, Protobuf, etc. if relevant.

## Related Topics

- [Related Type 1](link)
- [Related Feature 1](link)
- [Constraint Reference](link)

## See Also

- [Type Reference](../reference/type-reference.md)
- [Examples](../examples/)
```

---

### Template: Feature Documentation

```markdown
# Feature Name

> **Feature Category:** Syntax | Schema | Advanced
> **Since:** v1.0 | v2.0
> **Status:** Stable | Experimental
> **Related:** [link], [link]

## Overview

Brief description of what this feature enables.

## When to Use

Scenarios where this feature is useful.

## Basic Usage

### Simple Example

\`\`\`io
example code
\`\`\`

**Explanation:** What this does

## Syntax

### Grammar (EBNF)

\`\`\`ebnf
rule = production
\`\`\`

### Variations

Different ways to use the feature.

## Detailed Explanation

In-depth explanation of how the feature works.

### Implementation Details

How it's implemented under the hood (if relevant).

## Examples

### Example 1: [Description]

\`\`\`io
code
\`\`\`

### Example 2: [Description]

\`\`\`io
code
\`\`\`

### Real-World Example

From io-playground or actual use case.

## Best Practices

- ✅ DO: Recommendation
- ❌ DON'T: Anti-pattern

## Common Patterns

Typical usage patterns.

## Edge Cases

### Case 1: [Description]

How feature behaves in unusual situations.

## Limitations

What this feature cannot do.

## Performance Considerations

Impact on parsing, validation, serialization.

## Version Compatibility

| Version | Support | Notes |
|---------|---------|-------|
| v1.0 | ✅ Full | ... |
| v2.0 | ✅ Enhanced | ... |

## Related Topics

- [Related Feature 1](link)
- [Related Type 1](link)

## See Also

- [Reference](link)
- [Examples](link)
```

---

## 🔄 File Dependencies

### Dependency Graph

```
README.md (hub)
  ├─→ QUICKSTART.md
  ├─→ internet-object-schema.md
  │    ├─→ memberdef.md
  │    ├─→ typeschema.md
  │    └─→ data-types/
  ├─→ memberdef.md
  │    ├─→ typeschema.md
  │    └─→ data-types/
  ├─→ typeschema.md
  │    └─→ data-types/
  ├─→ data-types/
  │    ├─→ primitives/ → typeschema.md
  │    ├─→ string/ → data-types/primitives/
  │    ├─→ number/ → data-types/primitives/
  │    ├─→ collections/ → data-types/primitives/
  │    ├─→ objects/ → memberdef.md
  │    └─→ advanced/ → data-types/
  ├─→ schema-rules/
  │    ├─→ schema-resolution.md → the-definitions/
  │    ├─→ schema-composition.md → data-types/
  │    ├─→ schema-references.md → the-definitions/
  │    └─→ validation-flow.md → validation-rules/
  └─→ validation-rules/
       ├─→ validation-model.md → internet-object-schema.md
       ├─→ optional-nullable.md → memberdef.md
       ├─→ type-inference.md → data-types/
       ├─→ error-handling.md
       └─→ custom-validators.md → typeschema.md
```

### Must-Write-First Files

1. **README.md** - Navigation hub (links to existing sections)
2. **internet-object-schema.md** - Schema definition & compilation
3. **memberdef.md** - MemberDef specification
4. **typeschema.md** - TypeSchema specification
5. **data-types/README.md** - Type system overview

### Can-Write-In-Parallel Files

- All type documentation (independent)
- All feature documentation (mostly independent)
- All examples (reference completed docs)

---

## 📝 Writing Order Recommendation (Revised)

### Phase 1: Foundation (Week 1)

**Day 1-2: Root & Schema Core**
1. README.md (link to existing dirs: the-structure, the-collections, the-definitions)
2. 01-QUICKSTART.md (schema-focused quickstart)
3. 10-internet-object-schema.md (update - schema definition & compilation)

**Day 3-4: Schema Rules**
4. 11-memberdef.md (update)
5. 12-typeschema.md (update)
6. schema-rules/README.md
7. schema-rules/01-schema-resolution.md
8. schema-rules/02-schema-composition.md

**Day 5-7: Schema References & Validation Flow**
9. schema-rules/03-schema-references.md (reference the-definitions/)
10. schema-rules/04-validation-flow.md

---

### Phase 2: Data Types (Week 2)

**Day 1-3: Core Data Types**
1. data-types/README.md
2. data-types/01-TYPE-INDEX.md
3. data-types/primitives/README.md
4. data-types/primitives/01-any.md
5. data-types/primitives/02-boolean.md
6. data-types/primitives/03-null.md
7. data-types/primitives/04-undefined.md

**Day 4-7: String & Number Types**
8. data-types/string/README.md
9. data-types/string/01-string.md
10. data-types/number/README.md
11. data-types/number/01-number.md
12. data-types/number/02-bigint.md
13. data-types/number/03-decimal.md

---

### Phase 3: Collections, Objects & Advanced Types (Week 3)

**Day 1-3: Collections & Objects**
1. data-types/collections/README.md
2. data-types/collections/01-array.md
3. data-types/collections/02-collection.md
4. data-types/objects/README.md
5. data-types/objects/01-object.md
6. data-types/objects/02-object-vs-memberdef.md

**Day 4-5: Advanced Types**
7. data-types/advanced/README.md
8. data-types/advanced/01-recursive-types.md
9. data-types/advanced/02-union-types.md
10. data-types/advanced/03-custom-types.md

**Day 6-7: Validation Rules**
11. validation-rules/README.md
12. validation-rules/01-validation-model.md
13. validation-rules/02-optional-nullable.md
14. validation-rules/03-type-inference.md
15. validation-rules/04-error-handling.md
16. validation-rules/05-custom-validators.md

---

## 🎯 Success Criteria

### Per-File Criteria

Each file must have:
- ✅ Clear title and metadata
- ✅ Overview section
- ✅ Basic usage examples
- ✅ Syntax/grammar (if applicable)
- ✅ Detailed explanation
- ✅ Multiple examples (simple → complex)
- ✅ Common mistakes section
- ✅ Related topics links
- ✅ Cross-references

### Overall Criteria

- ✅ No broken links
- ✅ Consistent terminology
- ✅ Progressive disclosure (simple → complex)
- ✅ Complete coverage (no gaps)
- ✅ Examples tested against implementation
- ✅ Grammar matches parser
- ✅ Version markers where applicable

---

## 📊 Progress Tracking

### Tracking Spreadsheet

Create a tracking spreadsheet with:
- File name
- Priority
- Status (Not Started | In Progress | Review | Complete)
- Word count target
- Actual word count
- Dependencies
- Reviewer
- Completion date

### Status Dashboard

Visual progress dashboard:
- Overall completion %
- By priority level
- By category
- By week

---

## 🤝 Review Process

### Per-File Review

1. **Self-review** - Author checks against template
2. **Technical review** - Verify accuracy against implementation
3. **Clarity review** - Test with user unfamiliar with topic
4. **Copy edit** - Grammar, spelling, formatting
5. **Final approval** - Sign-off for publication

### Batch Review

- Review related files together (e.g., all string types)
- Ensure consistency across related topics
- Check cross-references are accurate
- Verify examples work together

---

**Status:** Ready for implementation ✅

**Next Action:** Begin Phase 1 - Create README.md and core files

**Author:** AI Copilot
**Date:** November 12, 2025
**Version:** 1.0
