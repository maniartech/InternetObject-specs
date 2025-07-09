# Other Special Characters

Special characters are used in conjunction with structural characters and literals to provide additional functionality or context within an Internet Object document. These characters have specific semantic meanings and modify the behavior of schemas, values, or parsing.

## Special Character Set

| Symbol | Name | Unicode | Context | Application |
|--------|------|---------|---------|-------------|
| `@` | At Sign | `U+0040` | Variable | When prefixed to a key name, declares a variable reference |
| `$` | Dollar Sign | `U+0024` | Schema | When prefixed to a key name, declares a schema reference |
| `?` | Question Mark | `U+003F` | Schema | Shortcut for declaring optional member when suffixed to the key name in object schema |
| `*` | Asterisk | `U+002A` | Schema | Shortcut for declaring nullable member when suffixed to the key name in object schema. Also used to make schema accept undeclared variables |
| `-` | Hyphen / Minus | `U+002D` | Numeric | Represents negative value |
| `+` | Plus | `U+002B` | Numeric | Represents positive value |

## Usage Examples

### Variable References and Schema Definitions
```ruby
# Variable declarations
~ @r: red
~ @g: green
~ @b: blue

# Schema definitions using variables
~ $color: {string, choices: [@r, @g, @b]}
~ $schema: {
    name: string,
    email: email,
    joiningDt: date,
    color: $color
}

---
# Data using variable references
~ John Doe, 'john.doe@example.com', d'2020-01-01', @r
```

### Schema Modifiers
```ruby
# Optional and nullable field declarations
~ $user: {
    name: string,          # Required field
    email?: string,        # Optional field (may be omitted)
    avatar*: string,       # Nullable field (may be null)
    metadata*?: object     # Optional and nullable field
}

# Schema with undeclared variables acceptance
~ $flexible: {
    id: string,
    name: string,
    *                      # Accept additional undeclared fields
}
```

### Numeric Signs
```ruby
# Positive and negative numbers
temperature: +23.5         # Explicit positive
balance: -150.75          # Negative value
elevation: +8848          # Positive integer
debt: -5000               # Negative integer
```

## Character Rules

- **Context Sensitive**: Characters have different meanings based on position and context
- **Variable Prefixes**: `@` prefixes variable declarations and references
- **Schema Prefixes**: `$` prefixes schema definitions and references
- **Schema Suffixes**: `?` and `*` must be suffixed to field names in schema definitions
- **Numeric Prefixes**: `+` and `-` prefix numeric values to indicate sign
- **Case Sensitive**: All special characters are case-sensitive
- **Reserved Usage**: These characters are reserved for their specific functions

## See Also
- **[Schema Definition](../../the-definitions/)** - Detailed schema syntax and modifiers
- **[Number Values](../values/number.md)** - Numeric value formatting and signs
- **[Structural Elements](./README.md)** - Overview of all structural characters
