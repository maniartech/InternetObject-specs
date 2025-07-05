---
description: Booleans in Internet Object
---

# Boolean

A **Boolean** in Internet Object represents a logical value that can be either true or false. Boolean values are scalar primitives used to express binary states, flags, or conditional logic.

Boolean values in Internet Object support both compact and verbose representations to balance readability and space efficiency.


## Syntax

A boolean value can be expressed in two forms:

```ebnf
boolean = compactBoolean | verboseBoolean
compactBoolean = "T" | "F"
verboseBoolean = "true" | "false"
```

## Structural Characters

| Symbol | Name            | Unicode  | Description                    |
| ------ | --------------- | -------- | ------------------------------ |
| `T`    | Uppercase T     | `U+0054` | Compact representation of true |
| `F`    | Uppercase F     | `U+0046` | Compact representation of false|
| `true` | Keyword true    | Multiple | Verbose representation of true |
| `false`| Keyword false   | Multiple | Verbose representation of false|

## Valid Forms

```ruby
T                    # Compact true
F                    # Compact false
true                 # Verbose true
false                # Verbose false
```

## Optional Behaviors

### Literal and Alternate Forms

Internet Object supports two equivalent representations for each boolean value:

- **Compact form**: `T` for true, `F` for false (recommended)
- **Verbose form**: `true` for true, `false` for false

```ruby
T        # ✅ Recommended compact form
true     # ✅ Verbose form (equivalent to T)
F        # ✅ Recommended compact form
false    # ✅ Verbose form (equivalent to F)
```

## Invalid Forms

```ruby
t        # ❌ Lowercase not allowed
f        # ❌ Lowercase not allowed
TRUE     # ❌ All caps not allowed
FALSE    # ❌ All caps not allowed
True     # ❌ Mixed case not allowed
False    # ❌ Mixed case not allowed
1        # ❌ Numeric representation not allowed
0        # ❌ Numeric representation not allowed
```

## See Also

* [Schema for Booleans](../../schema-definition-language/data-types/bool.md)
* [Values](../values/README.md)

