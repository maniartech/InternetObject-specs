# Custom Types

User-defined validators for domain-specific validation rules.

## Overview

Custom types extend the IO type system with application-specific validation logic. Use custom types for business rules, external validators, or domain constraints not covered by built-in types.

## TypeSchema Contract

Custom types must implement the `TypeSchema` interface:

```typescript
interface TypeSchema {
  parse(node: ASTNode): any
  load(value: any): any
  validate(value: any): void  // throws IOValidationError on failure
  stringify(value: any): string
}
```

## Basic Example

### Email Validator

```typescript
class EmailTypeSchema implements TypeSchema {
  parse(node: ASTNode): string {
    return node.value as string
  }

  load(value: any): string {
    if (typeof value !== 'string') {
      throw new IOValidationError('Email must be a string')
    }
    return value
  }

  validate(value: any): void {
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/
    if (!emailRegex.test(value)) {
      throw new IOValidationError('Invalid email format')
    }
  }

  stringify(value: string): string {
    return value
  }
}

// Register custom type
registry.register('email', new EmailTypeSchema())
```

### Usage in Schema

```io
user: {
  name: string,
  email: email,  # custom type
  age: int
}
```

## TypeSchema (IO)

Custom types follow the same MemberDef syntax:

```io
# Custom type with constraints
email: email
email: {email, domain: "example.com"}

# With optional/nullable
email?: email
email*: {email, verified: T}
```

> Common fields like `optional` and `null` are explained in `the-io-schema/data-types/00-common-fields.md`.

## Validation Phases

Custom types integrate into the standard validation pipeline:

1. **Parse**: Convert AST node to runtime value
2. **Load**: Type-check and coerce if needed
3. **Validate**: Apply domain-specific rules (throws on failure)
4. **Stringify**: Convert value back to IO format

## Common Patterns

### URL Validator

```typescript
class URLTypeSchema implements TypeSchema {
  validate(value: any): void {
    try {
      new URL(value)
    } catch {
      throw new IOValidationError('Invalid URL')
    }
  }
  // ... other methods
}
```

### UUID Validator

```typescript
class UUIDTypeSchema implements TypeSchema {
  validate(value: any): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(value)) {
      throw new IOValidationError('Invalid UUID format')
    }
  }
  // ... other methods
}
```

### Business Rule Validator

```typescript
class AgeTypeSchema implements TypeSchema {
  validate(value: any): void {
    if (typeof value !== 'number') {
      throw new IOValidationError('Age must be a number')
    }
    if (value < 0 || value > 150) {
      throw new IOValidationError('Age must be between 0 and 150')
    }
    if (!Number.isInteger(value)) {
      throw new IOValidationError('Age must be an integer')
    }
  }
  // ... other methods
}
```

## Best Practices

- Extend built-in types when possible (e.g., string with pattern).
- Throw `IOValidationError` with clear messages.
- Document custom type semantics in schema comments.
- Register custom types before schema compilation.
- Keep validation pure (no side effects).
- Consider performance for frequently validated fields.

## Error Handling

```typescript
import { IOValidationError } from '@io/core'

class CustomType implements TypeSchema {
  validate(value: any): void {
    if (!isValid(value)) {
      throw new IOValidationError(
        'Validation failed',
        { field: 'customField', value, expected: 'valid format' }
      )
    }
  }
  // ... other methods
}
```

## References

- `io-js2/src/schema-v2/types/type-schema.ts`
- `the-io-schema/12-typeschema.md`
- `the-io-schema/validation-rules/05-custom-validators.md`
