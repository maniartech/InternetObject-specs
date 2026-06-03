---
description: The header's definition section — metadata, variables, and references.
---

# Definitions

Besides the schema, an Internet Object document's **header** can hold *definitions*. A
definition is a key–value pair on its own line, introduced by a tilde `~`:

```ruby
~ key: value
```

There are three kinds of definition, distinguished by the key's prefix:

| Prefix | Kind | Purpose |
| ------ | ---- | ------- |
| *(none)* | **Metadata** | Document-level data (paging, status, …). Surfaces in the output header. |
| `@` | **Value variable** | A reusable value referenced as `@name`. See [Variables](variables.md). |
| `$` | **Reference (ref)** | A reusable schema or type referenced as `$name`. See [Schema References](schema-references.md). |

The special key **`$schema`** names the document's default schema.

## Metadata

Bare keys carry document metadata. They appear under a `header` in the loaded result,
separate from the data:

```ruby
~ pageSize: 10
~ success: T
~ $schema: { name: string }
---
~ John
~ Jane
```

## Variables and references

`@` defines a value variable; `$` defines a reusable schema (a ref). Both are then used by
name:

```ruby
~ @active: T
~ $address: { street, city }
~ $schema: { name: string, addr: $address, isActive: bool }
---
~ John, { Main St, NYC }, @active
~ Jane, { Oak Ave, LA }, @active
```

> **A document may be header-only.** If there is no data, the header still ends with the
> `---` separator.

## See Also

* [Header](../the-structure/introduction/header.md) — where definitions live in a document
* [Variables](variables.md) — value variables (`@`)
* [Schema References](schema-references.md) — schema and type refs (`$`)
* [Internet Object Schema](../schema-definition-language/internet-object-schema.md)
