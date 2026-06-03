---
description: Composing and reusing schemas through references.
---

# Composition & Reuse

Large schemas are built by **composing** smaller, named pieces. Define a shape once in the
header as a `$` reference and reuse it wherever it's needed — across fields, arrays, and other
schemas.

## Reuse a shape across fields

```ruby
~ $address: { street, city }
~ $schema: { name: string, home: $address, office?: $address }
---
~ John, { Main St, NYC }, { 5th Ave, NYC }
~ Jane, { Oak Ave, LA }
```

## Compose schemas from other schemas

A reference can be used inside another reference, building larger shapes from smaller ones:

```ruby
~ $address: { street, city }
~ $person: { name: string, address: $address }
~ $schema: { lead: $person, members: [$person] }
---
~ { Ann, { Main St, NYC } }, [{ Bob, { Oak Ave, LA } }, { Cy, { 5th Ave, NYC } }]
```

Here `members` is an array whose element type is the `$person` schema.

## Set the default schema by reference

`$schema` may itself be a reference:

```ruby
~ $address: { street, city }
~ $person: { name: string, home: $address }
~ $schema: $person
---
~ John, { Main St, NYC }
```

## Guidance

- For readability, define a shape **before** you reference it. Order within the header is not
  significant — references resolve after the whole header is read (see
  [Schema References](../the-definitions/schema-references.md)).
- Reuse keeps documents consistent and small; change a shape once, everywhere updates.

## See Also

- [Schema References](../the-definitions/schema-references.md)
- [Object (SchemaDef)](data-types/object.md) · [Array](data-types/array.md)
