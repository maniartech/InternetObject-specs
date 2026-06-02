---
description: Errors that arise from header definitions and references.
---

# Error Handling in Definitions

Definitions are resolved as the header is processed and as data is validated. The errors
specific to definitions are:

| Condition | Error | Cause |
| --------- | ----- | ----- |
| Reference to an undefined schema | `schema-not-defined` | `$name` used but no `$name` defined |
| Reference to an undefined variable | `variable-not-defined` | `@name` used but no `@name` defined |
| Forward reference | resolution error | a ref used before it is defined |

## Undefined reference

A `$` reference must name a schema defined earlier in the header:

```ruby
~ $schema: { name: string, home: $address }
---
~ John, { Main St, NYC }    # ✗ schema-not-defined — $address is never defined
```

## Forward references

A reference MUST appear **after** its definition. Define `$address` before the schema that
uses it:

```ruby
~ $address: { street, city }
~ $schema: { name: string, home: $address }
---
~ John, { Main St, NYC }    # ✓
```

## See Also

* [Definitions](definitions.md) · [Schema References](schema-references.md)
* [Error Model](../parsing-and-errors/error-model.md)
