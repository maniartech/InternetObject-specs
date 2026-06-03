---
description: Accumulating per-object validation errors and per-region syntax errors.
---

# Error Accumulation

Rather than stopping at the first problem, a conformant processor **accumulates** errors and
returns them together, alongside whatever data parsed successfully. This gives authors a full
picture in one pass.

## Per-object validation errors

Each record is validated independently and may contribute **zero, one, or many** errors. A
failing record is marked as an error; the others are unaffected:

```ruby
~ $schema: { name: string, age: { int, max: 25 } }
---
~ James, 20    # ✓
~ Alex, 30     # ✗ invalid-range
~ Bob, 22      # ✓
```

The result contains two valid records and one error entry — not a single fatal failure.

## Per-region syntax errors

Syntax errors are accumulated per recovered region (between boundaries). One unparsable record
yields one error, and parsing resumes at the next `~` or `---`.

## Partial output

Because errors are accumulated rather than thrown, the loaded result includes the records that
succeeded. Consumers can render valid data and surface the error list side by side (for
example, editor markers at each error's position).

## Duplicate section names

When two sections share a name, the duplicate is reported and **automatically renamed**
(`users` → `users_2` → `users_3`), so the rest of the document still loads.

## See Also

- [Error Model](error-model.md) · [Parser Behavior & Recovery](parser-behavior.md)
- [Collection Rules](../the-collections/collection-rules.md)
