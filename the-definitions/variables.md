---
description: Value variables — reusable values referenced with @.
---

# Variables

A **value variable** is a reusable value defined in the header with an `@`-prefixed key and
used anywhere a value is expected by writing `@name`. Variables reduce repetition, shrink
payloads, and let you keep sensitive values in one place.

> `@` is for **values**. For reusable *schemas and types*, use `$` references — see
> [Schema References](schema-references.md).

## Defining and using

```ruby
~ @active: T
~ $schema: { name: string, isActive: bool }
---
~ John, @active
~ Jane, @active
```

## In schema constraints

A variable can supply a constraint value, such as a `choices` list:

```ruby
~ @r: red
~ @g: green
~ @b: blue
~ $schema: { name: string, color: { string, choices: [@r, @g, @b] } }
---
~ John, red
```

## Use cases

### Reduce size and repetition

Define a value once and reference it many times:

```ruby
~ @co: 'ACME Corporation'
~ $schema: { name: string, employer: string }
---
~ John, @co
~ Jane, @co
```

### Keep sensitive values together

Variables let you isolate secrets/keys in the header instead of scattering them through the
data:

```ruby
~ @key: 'sk_live_8f3a9c2b'
~ $schema: { account: string, apiKey: string }
---
~ acct_001, @key
```

## See Also

* [Definitions](definitions.md) · [Schema References](schema-references.md)
