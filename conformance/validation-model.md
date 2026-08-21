---
status: candidate
description: The parse, validate, load, and stringify pipeline.
---

# Validation Model

Processing an Internet Object document is defined as a pipeline of four stages. Each stage has
a clear input and output, so implementations behave consistently.

```
text ──parse──▶ document tree ──validate──▶ checked tree ──load──▶ values
                                                              ◀─stringify── values
```

## Parse

**Input:** UTF-8 text. **Output:** a document tree (header, sections, records, values).

Parsing checks only *syntax* — that the text is well-formed. It does not consult any schema.
Syntax errors are produced here (see [Error Model](../parsing-and-errors/error-model.md)).

## Validate

**Input:** the document tree + a schema. **Output:** the same tree, with each value checked.

Validation applies the schema: types, constraints (`min`, `maxLen`, `pattern`, `choices`, …),
optionality, and nullability. Validation errors are produced here. With no schema, data is
accepted structurally and mapped to positional keys.

### Entry points

An implementation will usually offer **two ways in**: validating a document read from text, and
validating values the host language already holds — an object from an API response, a row from a
database.

```
   IO text ──parse──▶ document tree ──┐
                                      ├──validate──▶ same outcome, either way
   native values ─────────────────────┘
```

These are two routes to one stage, not two stages. **Validation is defined on the logical value.**
For the same schema and the same logical value, both routes **MUST** reach the same outcome: the
same accept-or-reject decision, the same error codes, in the same order.

Two values are *the same logical value* when they hold the same members with the same names and
the same typed contents — regardless of spelling. Text `~ Alice, 15` under
`{name: string, age: int}` is the same logical value as the native `{name: "Alice", age: 15}`,
because positional binding is part of reading the text, not part of validating it.

This is worth stating because the two routes are commonly written as **separate code**, each
walking its own kind of input. Nothing forces them to stay in step, and a divergence is close to
undetectable from inside a single implementation: each route has its own tests, and both pass. It
surfaces only when the same data is sent both ways, or when a second implementation reads the
specification and builds **one** validator — at which point the specification can only describe one
of the two behaviors, and every user of the other one is affected.

> **Testing this.** Run the conformance corpus's validation cases through **every** entry point the
> implementation offers, asserting both produce the same codes. Sampling a handful of cases is not
> enough: the routes agree on the common shapes by construction, so the disagreements live in
> exactly the cases nobody thinks to pick.

## Load

**Input:** the validated tree. **Output:** in-memory values.

Loading converts checked values into their final representations (numbers, booleans, dates,
byte data, nested objects/arrays), applying defaults for omitted fields.

## Stringify

The inverse of the pipeline: in-memory values are serialized back to Internet Object text,
honoring schema hints such as a number's `format` or a string's quote style. A value that is
loaded and then stringified SHOULD round-trip to an equivalent document.

## See Also

- [Conformance Requirements](requirements.md)
- [Parsing & Errors](../parsing-and-errors/README.md)
