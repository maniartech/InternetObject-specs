---
description: Frequently Asked Questions about Object Type in Internet Object
---

# Object Type FAQs

This document contains frequently asked questions about the object type in Internet Object schemas. These questions are organized by topic for easy reference and discussion.

## Basic Concepts

**Q: What's the difference between `{}`, `object`, and `{object}`?**
- Answer: [To be discussed]

**Q: When should I use direct schema syntax vs MemberDef syntax?**
- Answer: [To be discussed]

**Q: Can I mix different object definition approaches in the same schema?**
- Answer: [To be discussed]

## Open vs Closed Schemas

**Q: What's the difference between open and closed schemas?**
- Answer: [To be discussed]

**Q: How do I allow additional properties in an object?**
- Answer: [To be discussed]

**Q: What happens if I add extra fields to a closed schema?**
- Answer: [To be discussed]

**Q: Can I restrict the type of additional properties in open schemas?**
- Answer: [To be discussed]

## Field Modifiers

**Q: What's the difference between `?` and `*` modifiers?**
- Answer: [To be discussed]

**Q: Can I use both `?` and `*` on the same field? Does order matter?**
- Answer: [To be discussed]

**Q: What happens when I omit an optional field vs setting it to null?**
- Answer: [To be discussed]

## Validation and Constraints

**Q: How does `choices` validation work for objects?**
- Answer: [To be discussed]

**Q: Do object keys need to match exactly in `choices` validation?**
- Answer: [To be discussed]

**Q: Can I have default values for object fields?**
- Answer: [To be discussed]

**Q: What's the validation order for object properties?**
- Answer: [To be discussed]

## Schema Definition

**Q: Can I define nested objects within object schemas?**
- Answer: [To be discussed]

**Q: How do I reference other schema definitions in objects?**
- Answer: [To be discussed]

**Q: Can objects be recursive? How do I prevent infinite loops?**
- Answer: [To be discussed]

## Open Schema Types

**Q: What's the difference between `open: T` and `open: string`?**
- Answer: [To be discussed]

**Q: Can I allow multiple types for additional properties?**
- Answer: [To be discussed]

**Q: How do union types work in open schemas (`*: string, *: int`)?**
- Answer: [To be discussed]

## Comparison to Other Standards

**Q: How do Internet Object objects compare to JSON Schema objects?**
- Answer: [To be discussed]

**Q: What's the equivalent of JSON Schema's `additionalProperties`?**
- Answer: [To be discussed]

**Q: How does this compare to TypeScript interfaces or OpenAPI schemas?**
- Answer: [To be discussed]

## Common Pitfalls

**Q: Why am I getting "extra-field" errors in my closed schema?**
- Answer: [To be discussed]

**Q: Can I use arrays as additional property types in open schemas?**
- Answer: [To be discussed]

**Q: What happens if my default object doesn't match the schema?**
- Answer: [To be discussed]

**Q: Do I need to specify `optional: T` for fields with defaults?**
- Answer: [To be discussed]

## Performance and Best Practices

**Q: Should I prefer direct schema syntax or MemberDef for performance?**
- Answer: [To be discussed]

**Q: When should I use unconstrained objects (`object` type)?**
- Answer: [To be discussed]

**Q: How do I migrate from JSON Schema to Internet Object schemas?**
- Answer: [To be discussed]

## Advanced Usage

**Q: Can I use schema references (`$ref`) in object definitions?**
- Answer: [To be discussed]

**Q: How do I handle polymorphic objects (different shapes based on a discriminator)?**
- Answer: [To be discussed]

**Q: Can I validate object property names with patterns?**
- Answer: [To be discussed]

**Q: How do I handle deeply nested object validation?**
- Answer: [To be discussed]

## Error Handling

**Q: What error codes can object validation produce?**
- Answer: [To be discussed]

**Q: How do I debug "choice-mismatch" errors?**
- Answer: [To be discussed]

**Q: What's the difference between "missing-required-field" and omitting optional fields?**
- Answer: [To be discussed]

---

## Notes for Discussion

- Questions are organized by topic for systematic review
- Each answer placeholder can be filled in during discussion
- Categories can be reordered based on priority
- Additional questions can be added to relevant sections
- Some questions may need to be merged or split based on complexity

## See Also

- [Object Type Specification](data-types/object_new.md) - Complete object documentation
- [TypeDef Specification](typedef.md) - Understanding TypeDef concepts
- [MemberDef Specification](memberdef.md) - Understanding MemberDef concepts