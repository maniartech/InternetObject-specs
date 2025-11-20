# String Type

The `string` type represents a sequence of characters. It is one of the most fundamental types in Internet Object Schema, supporting a wide range of validation options including length constraints, regex patterns, and enumerations.

## Syntax

```internet-object
# Simple
field: string

# With Constraints (MemberDef)
field: { string, option: value, ... }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for the `string` MemberDef itself. It ensures that when you define a string field in your schema, you are using valid options and constraints.

```internet-object
type: { string, choices: [string, email, url] },
default?: string,
choices?: [string],
pattern?: string,
flags?: string,
len?: { int, min: 0 },
minLen?: { int, min: 0 },
maxLen?: { int, min: 0 },
format?: { string, choices: [auto, open, regular, raw], default: auto },
escapeLines?: { bool, default: F },
encloser?: { string, choices: ["'", '"'], default: '"' },
optional?: bool,
null?: bool
```

## Subtypes

* `string` (Base type)
* `email` (Validates email format)
* `url` (Validates URL format)

## Constraints

The following constraints are available for the `string` type and its subtypes.

### Length Constraints

```internet-object
# Minimum length
username: {string, minLen: 3}

# Maximum length
title: {string, maxLen: 100}

# Both
password: {string, minLen: 8, maxLen: 128}
```

### Pattern Constraints

```internet-object
# Email pattern
email: {string, pattern: "^[^@]+@[^@]+\\.[^@]+$"}

# Phone number
phone: {string, pattern: "^\\d{3}-\\d{3}-\\d{4}$"}

# Alphanumeric with underscores
slug: {string, pattern: "^[a-z0-9_-]+$"}
```

### Choice Constraints (Enum)

```internet-object
# Fixed set of values
status: {string, choices: [pending, active, archived]}
role: {string, choices: [admin, user, guest]}
theme: {string, choices: [light, dark, auto]}
```

## Examples

```internet-object
# Schema
username: {string, minLen: 3, maxLen: 20, pattern: "^[a-zA-Z0-9_]+$"}
status: {string, minLen: 1, maxLen: 50, choices: [pending, approved, rejected]}
---
# Valid Values
~ "user123"         # Valid: Matches pattern and length
~ "pending"         # Valid: In choices
```

## Invalid Examples

```internet-object
# Schema
username: {string, minLen: 3, maxLen: 10}
---
# Invalid Values
~ "ab"          # Fail: Too short (length 2)
~ "abcdefghijk" # Fail: Too long (length 11)
~ 123           # Fail: Wrong type (number)
```

```internet-object
# Schema
email: {string, pattern: "^[^@]+@[^@]+\\.[^@]+$"}
---
# Invalid Values
~ "invalid-email"  # Fail: Does not match pattern
```

## Validation Behavior

1. **Type check**: Value must be a string.
2. **Length check**: If `minLen`/`maxLen` specified, validate length.
3. **Pattern check**: If `pattern` specified, test regex.
4. **Choice check**: If `choices` specified, value must be in list.

## Special Types and Formatting

### Email and URL
```internet-object
contactEmail: email
website: url
```

### Formatting Options
These options primarily affect how the data is written back (serialized) to IO format.

```internet-object
# Force serialization with double quotes
description: { string, encloser: '"', format: regular }
```

## Implementation Notes

* **Encoding**: Strings should be handled as Unicode sequences (typically UTF-8 or UTF-16 depending on the environment).
* **Pattern Matching**: The `pattern` constraint typically relies on the host environment's Regular Expression engine. Schema authors should stick to standard regex features for maximum portability.
* **Serialization**: The `format` option guides the serializer on how to represent the string (e.g., unquoted `open` string vs quoted `regular` string), but implementations may override this to ensure valid syntax (e.g., forcing quotes if the value contains delimiters).
