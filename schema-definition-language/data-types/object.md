---
description: Defining Object Schema n Internet Object
---

# Object

The **object** type is the core building block for representing structured, complex data in Internet Object schemas. This page defines the schema rules, options, and best practices for defining the schema of `object` type in Internet Object.

### TypeDef Schema

The canonical TypeDef for `object` specifies all allowed constraints and options for this type:

```yaml
type?     : {string, choices: [object]},
default?  : object,
schema?   : {object, default: {}},
optional? : {bool, default: F},
null?     : {bool, default: F}
```

| Option   | Type/Allowed Values | Description                                                                                                | Example                            |
| -------- | ------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| type     | string (`"object"`) | Enforces type name for validation                                                                          | `type: object`                     |
| default  | object              | Default object value if omitted                                                                            | `default: {}`                      |
| schema   | object              | Allowed fields/structure for this object. If not provided, the default is `{}` (any object shape is valid) | `schema: {name: string, age: int}` |
| optional | bool                | Can this object field be omitted?                                                                          | `optional: T`                      |
| null     | bool                | Can the value be null?                                                                                     | `null: T`                          |

The TypeDef schema ensures the validity of `object` MemberDefs.

#### schema

The `schema` member defines the structure and validation rules for the object's properties. When defined, all object instances must conform to this schema. If not provided, the object accepts any structure (equivalent to `{}`).

```yaml
# Object with inline schema definition
address: {city, state, zip}

# Object with explicit schema member
address: {object, schema: {city, state, zip}}

# Object without schema (accepts any structure)
metadata: {}
metadata: object
```

#### type

The `type` member explicitly specifies that this MemberDef defines an object type. This is useful for clarity and validation.

```yaml
# Set type to object
user: object
profile: {type: object}
settings: {type: object, schema: {theme: string, lang: string}}
---
```

#### default

The `default` member specifies the default value for the object when it's optional and not provided. The default value must conform to the defined schema.

```yaml
# Set default value to empty object
config?: {object, default: {}}

# Set default value to null
settings?: {object, default: N, null: T}

# Set default with specific values
user?: {object, schema: {name: string, active: bool}, default: {name: "Anonymous", active: F}}
```

#### null

Setting `null` to `T` (true) allows the object to accept null as a valid value.This does not make the field optional—null must be explicitly provided if desired. Alternatively, you can make a member nullable by adding a `*` suffix to its name (e.g., `profile*`).

```yaml
# Object that can be null
profile*: {object, null: T}

# Object with schema that can be null
address*: {{street, city, state}, null: T}

# Optional object with null default
config?*: {object, default: N, null: T}

# Object with explicit null setting
metadata: {object, schema: {version: string}, null: T}
---
```

#### optional

The `optional` member specifies whether the object field may be omitted. When `optional` is set to `T` (true), the field does not need to be present in the data. You can also indicate optionality by adding a `?` suffix to the member name.

```yaml
# Set object to optional
config?: {}
settings?: object

# Set optional explicitly
profile: {object, optional: T}

# Optional object with default
preferences?: {object, default: {}, optional: T}

# Optional and nullable object
metadata?*: {object, optional: T, null: T}
---
```

### Designing Object Schemas

#### Empty Object

An empty object accepts any object structure without validation. This is useful for dynamic content, metadata, or when the object structure is not predetermined.

```yaml
# By setting the type as object
config: object

# By assigning the empty object syntax
config: {}

# By using member definition syntax
config: {object, schema: {}, default: {}, null: T}
```

#### Simple Object
A simple object defines a flat structure with specific fields and their types. This is the most common form of object schema.

```yaml
# All fields are mandatory and can accept any value, no type checking
user: { name, age, email }

# Simple object with typed fields
user: {name: string, age: int, email: string}
```

#### Object with MemberDef

Objects can be defined using MemberDef syntax to specify additional constraints, defaults, and validation rules.

```yaml
# Object with MemberDef constraints
address: {
  object,
  schema: {
    street: string,
    city: string,
    state: string,
    location?: {lng: number, lat: number}
  },
  default: N,
  null: T
}
```

#### Nested Objects

Objects can contain other objects as properties, creating hierarchical data structures. Each nested object can have its own schema and constraints.

```yaml
# Nested object structure
employee: {
  name: {string, maxLen: 50},
  office: {
    address: {
      street: string,
      city: string,
      state: string,
      location?: {lng: number, lat: number}
    },
    contact: {
      phone: string,
      fax?: string,
      emails: {
        primary: string,
        secondary?: string
      }
    }
  }
}
```


### Object Schema vs MemberDef

Objects can be defined using either direct schema syntax or MemberDef syntax, depending on whether additional constraints are needed.

```yaml
# Direct schema assignment (simple)
address: {street, city, state}

# MemberDef with additional options (flexible)
address?: {object, schema: {street, city, state}, default: N, null: T}

# Mixed approach
user: {
  name: string,                    # Direct type
  address?: {                      # MemberDef with constraints
    object,
    schema: {street, city, state},
    optional: T
  }
}
---
```

### Examples

#### Basic Object Usage

```yaml
# Simple user object
user: {name: string, age: int, active: bool}
---
{John Doe, 25, T}
```

#### Optional and Nullable Objects

```yaml
# Optional object with default
config?: {object, default: {theme: "light"}}

# Nullable object
metadata*: {object, null: T}

# Optional and nullable with schema
settings?*: {
  object,
  schema: {lang: string, debug: bool},
  default: N,
  null: T
}
---
{theme: "dark"}, N, {en, F}
```

#### Complex Nested Structure

```yaml
# E-commerce order object
order: {
  id: string,
  customer: {
    name: string,
    email: string,
    address: {
      street: string,
      city: string,
      country: string,
      postal: string
    }
  },
  items: [{
    product: string,
    quantity: int,
    price: number
  }],
  total: number,
  status: {string, choices: [pending, processing, shipped, delivered]}
}
---
{
  ORD-001,
  {John Doe, john@example.com, {123 Main St, New York, USA, 10001}},
  [{Widget A, 2, 19.99}, {Widget B, 1, 29.99}],
  69.97,
  pending
}
```
