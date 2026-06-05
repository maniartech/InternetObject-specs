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
