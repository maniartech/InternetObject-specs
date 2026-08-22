---
status: candidate
description: Overview of the parsing pipeline and the two error classes.
---

# Overview

Turning Internet Object text into validated data happens in stages:

1. **Tokenize** — split the text into tokens (values, separators, structural characters).
2. **Parse** — assemble tokens into a document tree (header, sections, records, values).
3. **Validate** — check the data against the schema.
4. **Load** — produce the final in-memory values.

Errors fall into **two classes**, matching the stages that produce them:

| Class | Stage | Example |
| ----- | ----- | ------- |
| **Syntax error** | tokenize / parse | unbalanced `{`, missing comma, unterminated string |
| **Validation error** | validate | wrong type, out of range, missing required field |

The distinction matters because the two classes recover differently:

- **Syntax errors** are bounded by **structure** — the parser skips to the next boundary
  (`~` or `---`) and continues.
- **Validation errors** are bounded by the **object** — each record is validated on its own
  and may report zero, one, or many errors, without affecting other records.

Whichever class it belongs to, every error reports the same three things: a stable **code**, a
human-readable **message**, and the **position** in the source. Only the code is part of this
specification — messages may be reworded or translated — so tooling branches on the code.

## In this section

- [Error Codes](error-codes.md) — how every code is named, and the closed vocabulary it draws from
- [Error Model](error-model.md) — the catalogue of codes, by class
- [Parser Behavior & Recovery](parser-behavior.md) — how recovery works; processing options
- [Error Accumulation](error-accumulation.md) — collecting many errors and partial output

## See Also

- [Syntax Errors](../the-structure/syntax-errors.md)
- [Collection Rules](../the-collections/collection-rules.md)
