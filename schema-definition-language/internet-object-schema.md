---
description: Internet Object Schema Specification
---
# **Internet Object Schema Specification**

Internet Object schemas define the structure ("shape") of objects in IO documents. Unlike verbose, map-based standards, IO schemas use the same concise object syntax as actual data, making them both human-friendly and machine-tractable.

### **Philosophy and Motivation**

Internet Object schemas are designed for clarity, expressiveness, and minimalism. They avoid the verbosity of traditional schema languages (like JSON Schema or XML Schema) by using the same syntax for both data and schema. This makes it easy for humans to author, read, and maintain schemas, while keeping them fully machine-tractable for validation, tooling, and interoperation with other formats.

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
* **Reusable schemas**:
  Named with `$` in the schema header; referenced as `$name`.

#### **Example:**

```ruby
~ $address: {street: string, city: string}
~ $user: {name: string, age: int, address: $address}
```

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
fieldModifier      = "?" | "*" | "?*"
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
* **Both (****`?*`****)**: Field can be omitted or set to `null`.

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
