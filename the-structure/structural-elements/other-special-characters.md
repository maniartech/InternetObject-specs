---
status: candidate
description: Functional modifiers — variable, schema, optional, nullable, and sign characters.
---

# Other Special Characters

Special characters work alongside structural characters and literals to add functionality or
context to an Internet Object document. Each has a specific semantic meaning and modifies the
behavior of schemas, values, or parsing.

## Special character set

| Symbol | Name | Unicode | Context | Application |
|--------|------|---------|---------|-------------|
| `@` | At sign | `U+0040` | Variable | Prefixed to a name, declares or references a variable |
| `$` | Dollar sign | `U+0024` | Schema | Prefixed to a name, declares or references a schema |
| `?` | Question mark | `U+003F` | Schema | Suffixed to a member name, marks the member optional |
| `*` | Asterisk | `U+002A` | Schema | Suffixed to a member name, marks the member nullable; also makes a schema accept undeclared members |
| `-` | Hyphen / minus | `U+002D` | Numeric | Marks a negative value |
| `+` | Plus | `U+002B` | Numeric | Marks a positive value |

## Usage examples

### Variable references and schema definitions

```ruby
# Variable declarations
~ @r: red
~ @g: green
~ @b: blue
# A schema using variables in an inline constraint
~ $schema: {
    name: string,
    email: email,
    joiningDt: date,
    color: {string, choices: [@r, @g, @b]}
}
---
# Data using variable references
~ John Doe, 'john.doe@example.com', d'2020-01-01', @r
```

### Schema modifiers

```ruby
# Optional and nullable member declarations
~ $user: {
    name: string,          # Required member
    email?: string,        # Optional member (may be omitted)
    avatar*: string,       # Nullable member (may be null)
    metadata*?: object     # Optional and nullable member
}

# A schema that accepts undeclared members
~ $flexible: {
    id: string,
    name: string,
    *                      # Accept additional, undeclared members
}
```

### Numeric signs

```ruby
# Positive and negative numbers
temperature: +23.5         # Explicit positive
balance: -150.75           # Negative value
elevation: +8848           # Positive integer
debt: -5000                # Negative integer
```

## Character rules

- **Context sensitive** — a character's meaning depends on its position and context.
- **Variable prefix** — `@` prefixes variable declarations and references.
- **Schema prefix** — `$` prefixes schema definitions and references.
- **Schema suffixes** — `?` and `*` are suffixed to member names in a schema.
- **Numeric prefixes** — `+` and `-` prefix numeric values to indicate sign.
- **Case sensitive** — all special characters are case-sensitive.
- **Reserved usage** — these characters are reserved for their specific functions.

## See Also

- [Definitions](../../the-definitions/definitions.md) — variables and schema references
- [Numeric Values](../values/number/README.md) — numeric formatting and signs
- [Structural Elements](README.md) — overview of all structural characters
