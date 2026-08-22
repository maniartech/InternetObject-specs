---
status: candidate
description: Validation rules for collections — schema-less records, empty records, errors.
---

# Collection Rules

## Records without a schema

If no schema is defined, each record may have a different shape, and values are mapped to
positional indices (`0`, `1`, `2`, …):

```ruby
---
~ John Doe, 20, female
~ true, false
~ marketing, 123, { Z Street, Los Angeles, CA }
```

The first record loads as `{ "0": "John Doe", "1": 20, "2": "female" }`, and so on.

> It is good practice to define a schema even though collections allow schema-less records.

## Empty records

A record consisting of just `~` is an **empty object** (`{}`). It is valid only if **every**
field in the schema is optional and/or nullable:

```ruby
~ $schema: { name?*: string, age?*: { int, max: 25 } }
---
~ John, 25     # ✓
~ William      # ✓ (age omitted)
~              # ✓ (empty object; all fields optional/nullable)
```

If any field is required, an empty record fails:

```ruby
~ $schema: { name: string, age?*: { int, max: 25 } }
---
~ John, 25     # ✓
~              # ✗ missing-value — name is required
```

## Independent validation & error handling

Each record is validated independently. A failing record is marked as an error; the rest are
unaffected:

```ruby
~ $schema: { name: string, age: { int, max: 25 } }
---
~ James, 20    # ✓
~ Alex, 30     # ✗ mismatched-max — age exceeds 25
~ Bob, 22      # ✓
```

A conformant processor SHOULD collect per-record errors and continue, rather than stopping at
the first failure.

## See Also

* [Collection](collection.md) · [Creating Collections](creating-collection.md)
* [Parser Behavior & Recovery](../parsing-and-errors/parser-behavior.md)
