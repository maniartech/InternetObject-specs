---
status: candidate
description: Errors that arise from header definitions and references.
---

# Error Handling in Definitions

Definitions are resolved after the **entire header** has been read, and references are checked
again as data is validated. Two errors are specific to definitions:

| Condition | Error code | Cause |
| --------- | ---------- | ----- |
| Reference to an undefined schema or type | `undefined-schema` | `$name` is used but no `$name` is defined anywhere in the header |
| Reference to an undefined variable | `undefined-variable` | `@name` is used but no `@name` is defined anywhere in the header |

> Error codes are stable; messages and positions may vary between implementations. Branch on
> the code, not the message.

## Undefined schema reference

A `$` reference must name a schema or type defined in the header. An undefined name fails with
`undefined-schema`:

```ruby
~ $schema: { name: string, home: $address }
---
~ John, { Main St, NYC }    # ✗ undefined-schema — $address is never defined
```

## Undefined variable reference

A `@` reference must name a variable defined in the header. An undefined name fails with
`undefined-variable`:

```ruby
~ $schema: { name: string, isActive: bool }
---
~ John, @active             # ✗ undefined-variable — @active is never defined
```

## Reference order

Because definitions resolve only after the whole header is read, **order within the header is
not significant** — a reference MAY appear before the definition it targets. The following
resolves even though `$address` is defined after the schema that uses it:

```ruby
~ $schema: { name: string, home: $address }
~ $address: { street, city }
---
~ John, { Main St, NYC }    # ✓
```

For readability you SHOULD still define a reference before you use it; doing so reads top to
bottom and makes the dependency obvious.

## See Also

* [Definitions](definitions.md) · [Schema References](schema-references.md) · [Variables](variables.md)
* [Error Model](../parsing-and-errors/error-model.md) — the full error catalogue
