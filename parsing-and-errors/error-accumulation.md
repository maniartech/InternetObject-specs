---
status: candidate
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
~ Alex, 30     # ✗ mismatched-max
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

When two sections share a name, the duplicate is **automatically renamed** so the rest of the
document still loads. A recovering parser **MUST NOT** drop a section, and **MUST NOT** let one
overwrite another: either would lose data with nothing to show for it.

The renaming rule, stated exactly, because two implementations that disagree here produce
differently-named sections from the same document:

> On encountering a section whose name is already in use, append `_2` to the **original** name. If
> that name is also in use, try `_3`, then `_4`, and so on, until an unused name is found. The
> counter is **per name**, not per document, and it counts *names already taken* — including
> names a later section spelled out for itself.

So a document with three `users` sections yields `users`, `users_2`, `users_3`; and a document with
sections named `a`, `b`, `a`, `b` yields `a`, `b`, `a_2`, `b_2` — not `a_2`, `b_3`.

Because the rule counts names already taken, an explicit name cannot be silently displaced:

```
--- users        → users
--- users_2      → users_2   (written that way by the author)
--- users        → users_3   (skips users_2, which is taken)
```

This applies to sections that carry no name of their own, too: they take the default name `data`,
so three unnamed sections become `data`, `data_2`, `data_3`.

The document is still invalid: [section names must be
unique](../the-structure/introduction/data.md#rules-for-section-names-and-schemas), and the error is
reported alongside the recovered data. The error is `duplicate-section-name` — a **structural**
fault, not a lexical one, since every character in the document is valid.

## See Also

- [Error Codes](error-codes.md) · [Error Model](error-model.md) · [Parser Behavior & Recovery](parser-behavior.md)
- [Collection Rules](../the-collections/collection-rules.md)
