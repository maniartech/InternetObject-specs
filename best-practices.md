---
description: Practical guidance for authoring Internet Object documents and schemas.
---

# Best Practices

## Schemas

- **Type your fields in production.** Prefer `name: string, age: int` over bare `name, age`;
  types catch bad data and document intent.
- **Use keyed schemas beyond trivial records.** Positional (CSV-like) data is great for flat,
  fully-required records; reach for keyed fields once shapes get richer.
- **Put optional fields last in positional schemas.** A leading optional field can swallow the
  next value (the first value provided fills the optional slot).
- **Reuse with references.** Define a shape once as `$address` and reference it; change it in
  one place. See [Composition & Reuse](schema-definition-language/composition.md).

## Values

- **Quote ambiguous values.** Quote strings that look like numbers, booleans, or null
  (`"123"`, `"true"`, `"N"`), contain commas, or contain `:` / `/` (URLs, times).
- **Pick the right number type.** Use `int`/`uint`/`intN` for whole numbers, `decimal` (`m`)
  for money, `bigint` (`n`) for very large integers — not `number` for everything.
- **Mark nullability explicitly** with the `*` suffix; mark optionality with `?`.

## Documents

- **Keep the schema in the header**, data below `---`. Use metadata keys for paging/status.
- **Use collections for many similar records**; one schema validates them all.
- **Comment the why.** Use `#` to explain intent, not to restate the obvious.

## Interoperability

- **Stay in Internet Object when exactness matters.** `decimal`, `bigint`, `datetime`, and
  `binary` can be lossy when converted to JSON — see [JSON Compatibility](json-compatibility.md).

## See Also

- [Schema-First Design](core-concepts/schema-first.md) · [Getting Started](internet-object/getting-started.md)
