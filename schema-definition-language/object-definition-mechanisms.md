# Object Definition Mechanisms

Internet Object provides multiple ways to define and work with objects, each suited for different use cases. This page explains all the mechanisms available for object definition and when to use each approach.

## Overview of Object Definition Methods

There are **three primary mechanisms** for working with objects in Internet Object:

1. **Direct Object Schema** - Define object structure directly
2. **Object MemberDef** - Use object as a data type with constraints
3. **Mixed Approach** - Combine both methods in the same schema

Each method serves different purposes and provides different levels of control over validation, defaults, and constraints.

## 1. Direct Object Schema

**Purpose**: Define the shape and structure of objects directly without additional constraints.

**Syntax**: `fieldName: {field1: type1, field2: type2, ...}`

**When to use**:
- Simple object structures
- No need for defaults, nullability, or validation constraints
- Quick prototyping
- Clear, readable schema definitions

### Examples

```ruby
# Simple user object
user: {name: string, age: int, email: string}

# Nested object structure
address: {
  street: string,
  city: string,
  state: string,
  coordinates: {lat: number, lng: number}
}

# Object with optional fields
profile: {
  name: string,
  bio?: string,
  avatar?: string,
  social?: {
    twitter?: string,
    linkedin?: string
  }
}

# Array of objects
employees: [{
  id: int,
  name: string,
  department: string,
  manager?: string
}]
```

### Characteristics
- **Concise syntax** - easy to read and write
- **No additional constraints** - only defines structure
- **No defaults** - all fields must be provided (unless optional with `?`)
- **No nullability control** - follows standard IO rules
- **Direct validation** - validates structure immediately

## 2. Object MemberDef

**Purpose**: Use object as a data type with additional constraints, validation, and options.

**Syntax**: `fieldName: {object, constraint1: value1, constraint2: value2, ...}`

**When to use**:
- Need default values
- Require nullability control
- Want validation constraints
- Need optionality with complex rules
- Schema evolution requirements

### Available Constraints

Based on the object TypeDef:
```ruby
type?     : {string, choices: [object]},
default?* : object,
schema?   : {object, default: {}},
optional? : {bool, default: F},
null?     : {bool, default: F}
```

### Examples

```ruby
# Object with schema constraint
user: {object, schema: {name: string, age: int, email: string}}

# Object with default values
config: {object, schema: {theme: string, debug: bool}, default: {theme: "light", debug: F}}

# Optional object with null default
settings?: {object, schema: {lang: string}, default: N, null: T}

# Object without schema (accepts any structure)
metadata: {object, default: {}}

# Nullable object with complex schema
profile*: {object, schema: {
  name: string,
  contact: {
    email: string,
    phone?: string
  }
}, null: T}

# Object with validation constraints
address: {object, schema: {
  street: string,
  city: string,
  state: {string, pattern: "^[A-Z]{2}$"},
  zip: {string, pattern: "^\\d{5}(-\\d{4})?$"}
}}
```

### Characteristics
- **Full constraint control** - defaults, nullability, optionality
- **Schema validation** - can define or omit structure validation
- **Explicit typing** - clearly indicates object data type
- **Flexible validation** - can accept any structure if no schema provided
- **Evolution friendly** - easy to add/remove constraints

## 3. Mixed Approach

**Purpose**: Combine direct schema and MemberDef approaches within the same schema.

**When to use**:
- Different fields have different constraint needs
- Some objects are simple, others need validation
- Gradual migration from direct to MemberDef syntax
- Complex schemas with varying requirements

### Examples

```ruby
# Mixed object definitions
user: {
  # Direct schema - simple structure
  name: string,
  age: int,

  # Object MemberDef - needs defaults and constraints
  preferences?: {object, schema: {
    theme: string,
    notifications: bool
  }, default: {theme: "light", notifications: T}},

  # Direct nested object - simple structure
  contact: {
    email: string,
    phone?: string
  },

  # Object MemberDef - needs nullability
  profile*: {object, schema: {
    bio: string,
    avatar: string
  }, null: T}
}

# E-commerce example with mixed approaches
product: {
  # Simple direct definitions
  id: string,
  name: string,
  price: number,

  # Object MemberDef for complex validation
  metadata?: {object, schema: {
    brand: string,
    category: string,
    tags: [string]
  }, default: {brand: "Unknown", category: "General", tags: []}},

  # Direct nested object
  dimensions: {
    width: number,
    height: number,
    depth: number,
    weight: number
  },

  # Object MemberDef with nullability
  reviews*: {object, schema: {
    average: number,
    count: int,
    latest: [{
      rating: int,
      comment: string,
      date: string
    }]
  }, null: T}
}
```

## Comparison Matrix

| Feature | Direct Schema | Object MemberDef | Mixed Approach |
|---------|---------------|------------------|----------------|
| **Syntax Complexity** | Low | Medium | Varies |
| **Default Values** | ❌ No | ✅ Yes | ✅ Selective |
| **Nullability Control** | ❌ Limited | ✅ Full | ✅ Selective |
| **Schema Validation** | ✅ Always | ✅ Optional | ✅ Selective |
| **Readability** | ✅ High | ❌ Medium | ❌ Varies |
| **Constraint Flexibility** | ❌ Low | ✅ High | ✅ High |
| **Evolution Support** | ❌ Limited | ✅ High | ✅ High |

## Decision Guide

### Use **Direct Object Schema** when:
- Object structure is simple and stable
- No need for default values or special nullability rules
- Prioritizing readability and simplicity
- Rapid prototyping or simple data structures

### Use **Object MemberDef** when:
- Need default values for objects
- Require nullability control (`null: T`)
- Want to accept any object structure (`{object}` without schema)
- Schema might evolve with additional constraints
- Building robust, production schemas

### Use **Mixed Approach** when:
- Different objects have different complexity needs
- Migrating from direct to MemberDef syntax gradually
- Want to optimize for both readability and functionality
- Working with complex, varied data structures

## Best Practices

### 1. **Consistency Within Schemas**
```ruby
# Good - consistent approach
user: {name: string, age: int}
profile: {bio: string, avatar: string}

# Good - consistent MemberDef approach
user: {object, schema: {name: string, age: int}}
profile: {object, schema: {bio: string, avatar: string}}

# Avoid - mixing without clear rationale
user: {name: string, age: int}
profile: {object, schema: {bio: string, avatar: string}}
```

### 2. **Use MemberDef for Production Systems**
For production systems, prefer Object MemberDef syntax as it provides more control and better evolution support.

### 3. **Document Your Approach**
When using mixed approaches, document why different mechanisms are used for different fields.

### 4. **Consider Schema Evolution**
Choose the mechanism that best supports your schema evolution needs:
- Direct Schema: Harder to evolve
- Object MemberDef: Easy to add constraints later

## Migration Strategies

### Direct Schema → Object MemberDef

```ruby
# Before (Direct Schema)
user: {name: string, age: int, email: string}

# After (Object MemberDef) - adds flexibility for future constraints
user: {object, schema: {name: string, age: int, email: string}}

# Later - easy to add defaults and constraints
user: {object, schema: {name: string, age: int, email: string}, default: {name: "Anonymous", age: 0, email: ""}}
```

This comprehensive approach gives you full flexibility in how you define objects while understanding the trade-offs of each method.
