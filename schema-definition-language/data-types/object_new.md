---
description: Complete Object Specification in Internet Object
---

# Object Type Specification

The **object** type is the fundamental building block for structured data in Internet Object schemas.
Parsing and syntax rules for objects are covered in **[Object Values](../../the-structure/values/object.md)**.
This page focuses on **schema-based validation** for objects.

## Canonical TypeDef

```ruby
type?     : {string, choices: [object]}
default?* : object                      # used only when field is omitted; may be N if null:T
choices?  : [object]                    # value must deep-equal one of these; shapes must match schema
schema?   : {object, default: {}}       # field map describing object shape
optional? : {bool, default: F}          # may be omitted
null?     : {bool, default: F}          # may be N
open?     : {any, default: F}           # F | T | <type schema> | [<type schema>, ...]
```

### Short forms → Canonical

```ruby
# All these forms are equivalent:
meta: object     → meta: {object, schema: {}}
meta: {}         → meta: {object, schema: {}}
meta: {object}   → meta: {object, schema: {}}

# With modifiers (order doesn't matter for ?*):
user?: object    → user: {object, schema: {}, optional: T}
data*: {}        → data: {object, schema: {}, null: T}
cfg?*: {object}  → cfg:  {object, schema: {}, optional: T, null: T}
cfg*?: {object}  → cfg:  {object, schema: {}, optional: T, null: T}  # same as ?*

# With schema shape:
user: {name: string}  → user: {object, schema: {name: string}}
```

## Object Definition Approaches

Internet Object provides **multiple equivalent ways** to define and work with objects:

### 1. Type String Declaration
For unconstrained objects accepting any structure:

```ruby
metadata: object     # Type string form
payload: {}          # Empty schema form
config: {object}     # MemberDef form

# All resolve to: {object, schema: {}}
# Accept any object: {}, {a:1}, {name:"John", items:[1,2,3]}
```

### 2. Direct Schema Shape Syntax
Define object structure directly (most common approach):

```ruby
# Basic structure
user: {name: string, age: int, email: string}

# With optional fields (? can be omitted)
profile: {name: string, bio?: string, avatar?: string}

# With nullable fields (* can be null)
contact: {email: string, phone*: string}

# With both optional and nullable (?* or *? - order doesn't matter)
settings: {theme?: string, debug?*: bool, timeout*?: int}

# Open schema patterns
user: {name: string, age: int, *}              # any extras allowed
config: {theme: string, *: string}             # extras must be strings
complex: {core: string, *: {name: string, value: int}}  # extras must be objects
```

### 3. MemberDef Syntax with Constraints
Use object as data type with additional validation:

```ruby
# Object with schema validation
user: {object, schema: {name: string, age: int}}

# Object with default values
config: {object, schema: {theme: string, debug: bool}, default: {theme: "light", debug: F}}

# Object with choices constraint
status: {object, choices: [
  {code: "active", label: "Active"},
  {code: "inactive", label: "Inactive"}
]}

# Open object with typed constraints
extensible: {object, open: string, schema: {core: string, version: int}}
```

### 4. Mixed Definition Approaches
Combine different approaches within the same schema:

```ruby
document: {
  # Direct schema for simple structure
  header: {title: string, date: string},

  # MemberDef for complex validation
  metadata: {object, schema: {author: string, tags: [string]},
             default: {author: "Unknown", tags: []}},

  # Simple type for flexible content
  content: object,

  # Open schema for extensible config
  settings: {theme: string, *: string}
}
```

## Field Modifiers

* `?` (**optional**): property may be omitted from the object
* `*` (**nullable**): value may be `N` (null)
* `?*` or `*?`: both optional and nullable (order doesn't matter)

```ruby
contact: {
  name: string,        # Required
  email?: string,      # Optional (can be omitted)
  phone*: string,      # Nullable (can be N)
  fax?*: string,       # Optional and nullable (? before *)
  mobile*?: string     # Optional and nullable (* before ?) - same behavior
}

# Valid data examples:
{name: "John", email: "john@ex.com", phone: "123-456", fax: "789", mobile: "555"}  # all present
{name: "John", phone: "123-456"}                                                   # email, fax, mobile omitted
{name: "John", phone: N, fax: N, mobile: N}                                       # phone, fax, mobile null
{name: "John", email: "john@ex.com", phone: N, mobile: "555"}                     # mixed omitted/null/present
```

## Open vs Closed Schemas

Default is **closed** (`open: F`): only properties declared in `schema` are allowed.

- **Open Schema**: welcomes additional properties beyond those explicitly defined
- **Closed Schema**: strict, does not welcome new fields beyond the defined structure

### Boolean Open

```ruby
# Closed (default)
user: {name: string, age: int}                              # only name, age allowed
user: {object, schema: {name: string, age: int}, open: F}   # explicit closed

# Open (any extras)
user: {object, schema: {name: string, age: int}, open: T}   # any additional properties
user: {name: string, age: int, *}                           # direct syntax equivalent
```

### Typed Open (single type)

```ruby
# Additional properties must be strings
cfg: {object, schema: {theme: string}, open: string}
cfg: {theme: string, *: string}                             # direct syntax equivalent

# Additional properties with constraints
profile: {object, schema: {name: string}, open: {string, minLen: 5}}
profile: {name: string, *: {string, minLen: 5}}             # extras: strings ≥5 chars
```

### Typed Open (union/multiple types)

```ruby
# Multiple type constraints
mixed: {object, schema: {id: string}, open: [string, int, bool]}
mixed: {id: string, *: string, *: int, *: bool}            # direct syntax with multiple *:

# Rule: Additional properties are valid if they satisfy ANY listed type (union)
```

### Object/Array Typed Open

```ruby
# Additional properties must be objects
metadata: {version: string, *: object}
metadata: {object, schema: {version: string}, open: object}

# Additional properties must be arrays
lists: {primary: [string], *: [string]}
lists: {object, schema: {primary: [string]}, open: [string]}

# Additional properties must match specific object schema
complex: {core: string, *: {name: string, value: int, active?: bool}}
complex: {object, schema: {core: string}, open: {
  name: string,
  value: int,
  active?: bool
}}
```

## Validation: Order and Rules

1. **Parse** value (see Object Values for syntax rules)
2. **Type check**: value must be object unless `N` with `null: T`
3. **Choices check** (if present): object must deep-equal one of the listed objects
4. **Required keys**: all non-optional fields in `schema` must be present
5. **Field typing**: each declared field validated against its type/constraints
6. **Additional properties**:
   - if `open: F` → none allowed
   - if `open: T` → any value allowed
   - if `open: <type>` → each extra must satisfy that type
   - if `open: [...]` or multiple `*:` → extra must satisfy **at least one** type
7. **Default application**: used only when property is omitted and `optional: T`

### Choices Validation

The `choices` field enforces exact object matching:

```ruby
status: {object, choices: [
  {code: "active", label: "Active"},
  {code: "inactive", label: "Inactive"}
]}

# Valid: exactly matches a choice
{code: "active", label: "Active"}     # ✅

# Invalid: doesn't match any choice
{code: "pending", label: "Pending"}   # ❌ not in choices
{code: "active"}                      # ❌ missing 'label' field
```

Rules for choices validation:
- Key set and values must match exactly
- Array order matters; object key order does not
- `N` must match `N`
- Shape of choice values must match the object schema

## Comprehensive Examples

### Unconstrained Objects

```ruby
# All equivalent forms
payload: object
metadata: {}
config: {object}

# Accept any object structure:
{}
{key: "value"}
{name: "John", age: 30, items: [1,2,3], nested: {active: T}}
```

### Closed Schema Validation

```ruby
account: {id: string, username: string, email: string}

# Valid data
{id: "u123", username: "john", email: "john@example.com"}   # ✅ exact match

# Invalid data
{id: "u123", username: "john", email: "john@example.com", city: "NYC"}  # ❌ extra 'city'
{id: "u123", username: "john"}                              # ❌ missing 'email'
```

### Open Schema with Type Constraints

```ruby
config: {theme: string, debug: bool, *: string}

# Valid data
{theme: "dark", debug: T}                                   # ✅ no extras
{theme: "dark", debug: T, lang: "en"}                      # ✅ string extra
{theme: "dark", debug: T, lang: "en", region: "US"}        # ✅ multiple string extras

# Invalid data
{theme: "dark", debug: T, timeout: 5000}                   # ❌ timeout must be string
{theme: "dark", debug: T, retries: T}                      # ❌ retries must be string
```

### Complex Open Schema Examples

```ruby
# Object schema constraints for additional properties
metadata: {version: string, *: {name: string, value: int, active?: bool}}

# Valid data
{version: "1.0",
 feature1: {name: "auth", value: 1, active: T},
 feature2: {name: "cache", value: 2}}                      # ✅ valid object extras

# Invalid data
{version: "1.0", feature1: {name: "auth"}}                 # ❌ missing 'value' in extra
{version: "1.0", feature1: "simple string"}               # ❌ extra must be object
```

### Union Type Constraints

```ruby
flexible: {id: string, *: string, *: int, *: bool}

# Valid data - extras can be any of the allowed types
{id: "u123", name: "John", age: 25, active: T}            # ✅ string, int, bool extras
{id: "u123", score: 95}                                   # ✅ int extra
{id: "u123", verified: T}                                 # ✅ bool extra

# Invalid data
{id: "u123", items: [1,2,3]}                             # ❌ array not in union
{id: "u123", meta: {nested: "object"}}                   # ❌ object not in union
```

### Optional and Nullable Combinations

```ruby
profile: {
  name: string,           # Required
  bio?: string,          # Optional (can be omitted)
  avatar*: string,       # Nullable (can be N)
  status?*: string,      # Optional and nullable (?* order)
  notes*?: string        # Optional and nullable (*? order - same behavior)
}

# Valid combinations
{name: "John", bio: "Dev", avatar: "pic.jpg", status: "active", notes: "Some notes"}  # all present
{name: "John"}                                             # bio omitted, avatar/status/notes omitted
{name: "John", avatar: N, status: N, notes: N}           # bio omitted, others null
{name: "John", bio: "Dev", avatar: N, notes: "Notes"}    # mixed omitted/null/present
```

## Recursive Objects

Objects may reference themselves via named schema references for hierarchical structures.
Use `?`, `*`, or both to ensure termination:

```ruby
~ $employee: {
  name: string,
  age: {int, min: 18},
  isActive: bool,
  reportingTo?*: $employee    # optional and nullable to allow termination
}
~ $schema: $employee

# Valid hierarchical data
{name: "Alice", age: 30, isActive: T, reportingTo: {
  name: "Bob", age: 45, isActive: T, reportingTo: N        # terminates with null
}}

{name: "Carol", age: 28, isActive: T}                      # terminates with omission
```

Full `$name` / `$ref` resolution and cycle handling are covered in the **Schema Reference** section.

## Common Validation Errors

> **Note:** The following error codes are placeholders. Final codes will be standardized across the Internet Object specification.
> All codes are lowercase, hyphen-separated, with no prefix.

* **`extra-field`** – Additional property found in closed schema (`open: F`)
* **`invalid-additional-property`** – Additional property failed the typed-open validator
* **`missing-required-field`** – A required field is absent in the object
* **`invalid-field-value`** – A field's value violates its type or constraint
* **`choice-mismatch`** – Object does not match any value in `choices` (deep equality failed)
* **`null-not-allowed`** – Value is `N` but `null: F` in the schema
* **`schema-shape-mismatch`** – Choice value shape doesn't match the object schema

## See Also

- [Object Values](../../the-structure/values/object.md) – Object syntax and parsing rules
- [Schema Definition Language](../internet-object-schema.md) – Complete schema specification
- [Object Definition Mechanisms](../object-definition-mechanisms.md) – All approaches for working with objects
- [TypeDef Specification](../typedef.md) – Understanding TypeDef concepts
- [MemberDef Specification](../memberdef.md) – Understanding MemberDef concepts
