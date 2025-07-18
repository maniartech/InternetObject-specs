# [Type] Type in Internet Object

## 1. Introduction

- What is this type?
- Where/why is it used in Internet Object?
- Example use cases.

## 2. TypeDef (Meta MemberDef)

- **Full canonical TypeDef** in Internet Object object syntax (code block).
- **Summary table**: All allowed members/options, descriptions, type, and example value.

## 3. TypeDef Member Details

For **each member/option** defined in the TypeDef:
- **Name** (e.g., `min`, `max`, `pattern`, `schema`)
- **Description:** What does it do?
- **Type/Allowed values:** What type/value is expected?
- **Rules & validation:** Constraints, defaults, interactions.
- **Examples** (IO syntax)
- **Notes/Edge Cases** (if any)

## 4. Common Patterns and Usage

- Canonical/typical usage for the type.
- “Open” form (for object: `{}`; for array: `[]`; omit for primitives).
- Strict/typed form (e.g., `{ min: 0, max: 100 }`).
- With default, optional, nullable, dynamic, etc.
- Nested and compositional forms.

## 5. Examples

- Realistic, annotated schema snippets showing:
  - Open/unrestricted use (if allowed)
  - Strict/typed use
  - Nested use
  - Optional/nullable/default use
  - Both correct and incorrect (with error reason) examples

## 6. Derived Types and Subtypes

- List official derived types (subtypes), their purpose, and additional constraint/rule/pattern/range.
- Table: Derived Type | Description | Constraint/Pattern/Range | Example
- Notes on inheritance (all base options/constraints also apply).
- Usage examples.

## 7. FAQ & Notes

- Common confusions, pitfalls, best practices.
- Mapping to other standards (if relevant).
- *If open forms `{}` or `[]` are not supported for this type, state so clearly:*
  > “This type does not have an open/any shorthand. Use the `any` type to accept any value.”

## 8. See Also

- [TypeDef reference](typedef.md)
- Related types (for array, link to object, any, etc.)
- Main [Internet Object Schema Spec](schema.md)

**Template Usage Notes:**
- **Section 4:** Only include “open” forms for object (`{}`) and array (`[]`).
  For primitives, clarify that open/wildcard forms do not exist—use `any` if desired.
- **Section 6:** Always include, even if the only derived type is the base itself.
- **Section 7:** Be explicit about open form support and related warnings.
