---
description: Internet Object Schema Specification
---
# **Internet Object Schema Specification**

## **What is an Internet Object Schema?**

An **Internet Object Schema** defines the structure, types, and constraints of data in an Internet Object (IO) document. Think of it as a contract that describes what valid data looks like—field names, their types, whether they're required or optional, and any validation rules they must follow.

If you're familiar with JSON Schema, TypeScript interfaces, or database schemas, IO schemas serve the same purpose—but with a radically simpler syntax.

### **At a Glance**

Here's the simplest possible schema—just field names, it just checks the structure validly:

```ruby
# Schema: Define the fields of a person with an address
name, age, email, address: {street, city, state}
---
# Data: A valid person object
John Doe, 30, john@example.com, {Bond Street, New York, NY}
```

That's it. Field names define the structure, and nested objects use `{ }`. No types, no boilerplate.

**Adding Types**

When you need validation, add types:

```ruby
name: string, age: int, email: string, address: {street: string, city: string, state: string}
```

**Adding Optionality**

Make a field optional with `?`:

```ruby
name: string, age: int, email?: string, address?: {street: string, city: string, state: string}
```

**Adding Constraints**

Add validation rules inline:

```ruby
name: string, age: {int, min: 0, max: 120}, email?: string
```

The schema and data use the **same IO syntax**—no separate schema language to learn. You start simple and add complexity only when needed. For more information about the Internet Object syntax, see [The Structure](../the-structure/).

### **Why IO Schemas?**

Traditional schema languages are verbose and hard to read. Compare defining the same structure:

**JSON Schema (39 lines):**
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0, "maximum": 120 },
    "email": { "type": "string" }
  },
  "required": ["name", "age"]
}
```

**Internet Object Schema (1 line):**
```ruby
name: string, age: {int, min: 0, max: 120}, email?: string
```

IO schemas are:
- **Concise** — Express complex structures in minimal syntax
- **Readable** — Humans can author and review them easily
- **Unified** — Same syntax for both schema and data
- **Powerful** — Full support for types, constraints, nesting, and optionality

### **Who Is This For?**

This specification is for developers, API designers, and data engineers who want to:
- Define data contracts for APIs and data exchange
- Validate incoming/outgoing data
- Document data structures in a human-friendly format
- Generate code or convert to other schema formats

### **Prerequisites**

Before diving in, you should be familiar with:
- Basic Internet Object syntax (objects, arrays, values)
- General concepts of data validation and schemas

### **What You'll Learn**

This document covers:
1. **Schema Structure** — How to define fields, types, and nested objects
2. **Field Types & Constraints** — Built-in types and validation rules
3. **Optional & Nullable Fields** — Handling missing or null values
4. **Dynamic Fields** — Allowing extra/unknown fields
5. **Reusable Schemas** — Defining and referencing named schemas
6. **Interoperability** — Mapping to JSON Schema and other formats

---

## **Philosophy and Motivation**

Internet Object schemas are designed for **clarity**, **expressiveness**, and **minimalism**. They avoid the verbosity of traditional schema languages by using the same syntax for both data and schema. This makes it easy for humans to author, read, and maintain schemas, while keeping them fully machine-tractable for validation, tooling, and interoperation with other formats.

Schemas describe:

* Field names (and order, if needed)
* Types and constraints
* Nesting and composition
* Optional and dynamic fields (by convention)

## **Schema Structure and Syntax**

### **Schema as Object Shape**

A schema is written using the Internet Object **object syntax**:

* Fields are comma-separated: `name, age, address`
* Each field can be:

  * **Just a name** (defaults to "any" type)
  * **Typed** (`name: string`)
  * **Nested** (`address: { street: string, city: string }`)
  * **Constrained** (`score: {int, min: 0, max: 100}`)
* **Fields may be marked as optional or dynamic using conventions** (see "Semantic Field Modifiers").

#### **Examples:**

```ruby
# Minimal schema (all fields are "any" type)
name, age, address

# Typed schema
name: string, age: int, isActive: bool

# Nested schema
address: { street: string, city: string }

# Typed with constraints (MemberDef)
name: {string, maxLen: 100}, age: {int, min: 0, max: 120}
```

### **Open and Closed Schema Objects**

* **Top-level schemas** may use the open object form (no braces):
  `name, age, address`
* **Nested objects** (schemas for nested fields) must use `{ ... }`:
  `address: { street: string, city: string }`

### **Keyed and Positional Fields**

* **Keyed fields**:
  Schema and data map fields by name (`name: value`).
* **Unkeyed (positional) fields**:
  Supported for compact, CSV-like data.
  *Recommendation:* Use positional mapping only when all fields are required and unambiguous.

#### **Mixed Mode**

* Unkeyed fields can appear **before** any keyed fields.
* Once a keyed field appears, all remaining fields **must be keyed**.

### **Nesting and Reuse**

* **Nested objects**:
  Use `{ ... }` for fields whose value is itself an object.

## **Schema Declaration Modes**

The IO document header supports two distinct modes for declaring schemas, each suited to different use cases.

### **Inline Schema Mode**

For simple schemas, write the schema directly in the header (without `~` prefix):

```ruby
name: string, age: int, address: {street: string, city: string}
---
John Doe, 30, {Bond Street, New York}
```

This is concise and works well for flat or moderately nested structures.

### **Definition Mode**

For complex or reusable schemas, use the definition syntax (with `~` prefix and `$` for schema variables):

```ruby
~ $address: {street: string, city: string}
~ $user: {name: string, age: int, address: $address}
~ $schema: $user
---
John Doe, 30, {Bond Street, New York}
```

The special `$schema` key designates the default schema used to validate the data section. In the example above, `$schema: $user` tells the parser to use the `$user` schema for validation.

Definition mode allows you to:
- **Reuse schemas** — Define once, reference multiple times with `$name`
- **Improve readability** — Break complex schemas into named parts
- **Define variables** — Create reusable values alongside schemas

For more details on definitions, see [Definitions](../the-definitions/).

### **Syntax Summary Table**

| Feature     | Example Syntax                              | Description                  |
| ----------- | ------------------------------------------- | ---------------------------- |
| Field       | `name`                                      | Unkeyed field, type is `any` |
| Typed Field | `name: string`                              | Keyed field, explicit type   |
| Constraint  | `age: {int, min: 0, max: 120}`              | With constraints             |
| Optional    | `remark?`                                   | Field may be omitted         |
| Nullable    | `address*`                                  | Field may be `null`          |
| Dynamic     | `*, *: string`                              | Allow extra fields           |
| Nested      | `address: { street: string, city: string }` | Nested object                |
| Reusable    | `$address`                                  | Reference to a named schema  |

### **Schema Grammar (EBNF)**

```ebnf
schema             = objectEntries
objectEntries      = memberDef *( "," memberDef )
memberDef          = [key] [fieldModifier] [":" typeOrDef]
key                = string
fieldModifier      = "?" | "*" | "?*" | "*?"
typeOrDef          = type | memberDef | ref
type               = "string" | "int" | "bool" | "object" | "array" | ...
ref                = "$" name
```

* *Note:* Modifiers and complex memberDefs are conventions, not core grammar.

## **Field Types and Constraints**

### **Built-in Types**

Internet Object supports the following built-in types:

* `string`, `int`, `bool`, `float`, `number`, `object`, `array`, and domain-specific types (`date`, `datetime`, etc.)
* Types may be **extended** or **customized** in a future version by user-defined type systems.

### **Constraints Reference**

* **min / max / minLen / maxLen**: For numbers, strings, arrays.
* **choices**: For enums. Example: `{string, choices: [A, B, C]}`
* **pattern**: For regex constraints on strings. Example: `{string, pattern: "^[a-z]+$"}`
* **default**: Assigns a default value if missing.

## **Semantic Field Modifiers (Conventions)**

Internet Object schemas use the following **conventions** (not syntax) for special field semantics:

* **Optional**: Suffix `?` on field name (e.g., `age?`).
  Means the field may be omitted in data.
* **Nullable**: Suffix `*` (e.g., `remark*`).
  Means the field can be `null`.
* **Dynamic/extra fields**: Use `*` at end (e.g., `name, age, *` or `*: string`).
* These are **interpreted by schema tooling**, not by the object parser itself.

### **Optional and Nullable Field Semantics**

* **Optional (****`?`****)**: Field can be omitted from the data object.
  If omitted, its value is undefined unless a default is provided.
* **Nullable (****`*`****)**: Field can explicitly be set to `null`.
* **Both (****`?*`**** or ****`*?`****)**: Field is both optional and nullable—it can be omitted from the data or explicitly set to `false`. Both orderings are equivalent and represent the canonical combination of these two modifiers.

**Examples:**

```ruby
email?: string           # May be omitted
nickname*: string        # May be null
bio?*: string            # May be omitted or null
```

### **Dynamic/Extra Fields**

* `*` at the end of a schema allows extra fields not specified in the schema.
* `*: type` constrains the type of all extra fields.

**Example:**

```ruby
name: string, *,         # Allow any extra fields
*: int                   # All extra fields must be int
```

### **Recommendations on Modifiers**

* For strict validation and best interoperability, avoid `*` unless required.
* For positional schemas, avoid optionals except at the end.

## **Mapping to Industry Standards (for Interoperability)**

* **Keyed schemas** map directly to "properties" in JSON Schema, Avro, etc.
* **Optionals (****`?`****)** are omitted from `"required"` arrays.
* **Dynamic fields (****`*`****)** map to `additionalProperties`.
* **Constraints** map to field-level attributes in target schema (e.g., minLength, enum).

### **Canonicalization for Tooling**

**Recommendation:**  For robust tooling and validation, always canonicalize Internet Object schemas to a fully-keyed, explicit, and type-complete form internally. This enables safe mapping to and from JSON Schema, Avro, or other industry formats.

### **Mapping Table: IO Schema → JSON Schema**

| IO Schema                     | JSON Schema Equivalent                                 |
| ----------------------------- | ------------------------------------------------------ |
| `foo: string`                 | `{ "foo": { "type": "string" } }`                      |
| `age?: int`                   | `{ "age": { "type": "integer" } }, "required": []`     |
| `*, *: string`                | `additionalProperties: true` or `{ "type": "string" }` |
| `{ foo: {string, minLen:2} }` | `{ "foo": { "type": "string", "minLength": 2 } }`      |

### **JSON Compatibility**

* A subset of Internet Object schemas and data are directly compatible with JSON and JSON Schema.
* For full compatibility, use quoted keys and JSON-legal values.

## **Best Practices**

* Prefer **explicit types** for all fields in production schemas.
* Use **fully-keyed schemas** for anything beyond trivial/CSV-like records.
* Use **optionals only at the end** if using positional mapping.
* Document and canonicalize mixed or dynamic schemas for robust tooling.

## **Common Schema Patterns**

* **Flat (CSV-like):**
  `name, age, score`
* **Typed object:**
  `name: string, age: int, score: float`
* **Nested:**
  `user: {name: string, address: {city: string}}`
* **Optional/nullable:**
  `comment?: string, timestamp*: datetime`
* **Dynamic:**
  `*, *: string`

## **Open Object and Array Forms**

Internet Object allows you to define fields that can accept *any object* or *any array* using open forms:

### **Any Object: `{}`**

- Use `{}` as a schema for a field that may contain any object, regardless of fields or structure.
- This matches objects of any shape, including empty objects.

```ruby
meta: {}         # 'meta' can be any object, equivalent to `meta: object`
payload?: {}     # 'payload' is optional, any object allowed
data: object     # 'data' can also be written as `data: {}` for any object
```

### **Any Array: `[]`**

```ruby
extras: []       # 'extras' can be any array. Same as `extras: array`
tags?: []        # 'tags' is optional, any array allowed
choices: array  # 'Can also be written as `choices: []` for any array'
```
* Use `[]` as a schema for a field that may contain any array, regardless of element type or length.
* This matches all arrays, including empty arrays.

```ruby
extras: []       # 'extras' can be any array
tags?: []        # 'tags' is optional, any array allowed
```

### **Why Use Open Forms?**

* Useful for fields where you expect unstructured, arbitrary data (e.g., "metadata," "extension," "blob," or raw API fields).
* No validation is performed on object keys or array elements—only the container type is enforced.

### **Contrast with Typed Forms**

* To restrict the allowed content, use typed or constrained schemas:

  * `[int]` for an array of integers
  * `{ name: string }` for an object with required fields
  * `[ { name: string } ]` for an array of objects with shape

| Syntax        | Meaning                             |
| ------------- | ----------------------------------- |
| `{}`          | Any object (no structure required)  |
| `[]`          | Any array (no type/length required) |
| `[type]`      | Array of the specified type         |
| `[MemberDef]` | Array validated by MemberDef        |
| `[{...}]`     | Array of objects with defined shape |

> **Note:** These open forms can also be used in MemberDefs for fields that may contain arbitrary objects or arrays.

```

**Summary:**
- Put this new section right after "Common Schema Patterns" and before your "Full Example."
- This order introduces specific patterns, then the open (most general) forms, then illustrates usage in a complete example.

## **Full Example**

### **Complete Schema Example with Comments**

```ruby
# User schema
name: string,                # Required
age?: int,                   # Optional
email: {string, pattern:"^[^@]+@[^@]+$"},  # Required, pattern constraint
isActive: bool,              # Required
address?: {                  # Optional nested object
  street: string,
  city: string,
  zip?: int                  # Optional zip code
},
*: string                    # Allow extra string fields
```

**Valid Data:**

```ruby
{
  name: John Doe,
  isActive: T,
  address: {
    street: Bond Street,
    city: New York
  },
  nickname: Johnny
}
```

## **Appendix: Object Syntax Reference**

(Refer to your `object.md` for formal object syntax and EBNF.)

## **Object Syntax EBNF (from Object Spec)**

> See \[object.md] for formal definition; include diagrams or syntax trees as appendix if desired.

## **FAQ & Clarifications**

* `*` and `?` are **schema conventions**—they do **not** change object syntax.
* All schema fields are mapped to data fields using either position (unkeyed) or name (keyed).
* For compatibility, always provide a canonical, fully-keyed, fully-typed version of the schema for external tooling.
* **Can I mix positional and keyed fields?**
  Yes, but only unkeyed fields before any keys. Once a key is present, all subsequent fields must be keyed.
* **What happens if a required field is missing?**
  Validation fails unless the field is optional (`?`) or has a default.
* **Are keys case-sensitive?**
  Yes. `"Name"` and `"name"` are distinct.
* **How are unknown fields handled?**
  If `*` is present in the schema, unknown fields are accepted (and optionally typed); otherwise, they are rejected by validators.

## **Versioning and Evolution (Future Section)**

* **Schema evolution, migration, backward compatibility** best practices can be addressed in future versions.
