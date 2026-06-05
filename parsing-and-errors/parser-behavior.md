---
status: candidate
description: Boundary-bounded syntax-error recovery and processing options.
---

# Parser Behavior & Recovery

A conformant processor SHOULD recover from errors and continue, so that a single bad record
does not discard the rest of a document.

## Syntax-error recovery is bounded by structure

On a syntax error, the parser **skips tokens until the next boundary** and resumes there. The
boundaries are:

- the record separator `~` (start of the next collection item), and
- the section separator `---` (start of the next section),
- or end of input.

<!-- io:test skip -->
```ruby
~ $schema: { name: string, age: int }
---
~ John, 28              # parsed
~ Bad, { unclosed      # syntax error here; parser skips to the next ~
~ Bob, 35              # parsed — recovery resumed at this record
```

The malformed middle record is reported as an error; the records before and after it are
still parsed.

## Validation recovery is bounded by the object

Each record is validated independently. A validation error in one record does not stop
validation of the others (see [Collection Rules](../the-collections/collection-rules.md)).

## Processing options

A processor typically offers options that control recovery and output. Common ones:

- **continue-on-error** — collect errors and keep going (recommended), versus failing on the
  first error.
- **skip-errors** — omit error entries from the loaded result, returning only the records
  that succeeded.

> Option names and exact semantics are implementation-defined; this section describes the
> behaviors a conformant processor is expected to provide.

## Error nodes

When continuing past an error, a processor marks the failed record with an error placeholder
in the result so consumers can tell which records succeeded and which did not. See
[Error Accumulation](error-accumulation.md).

## See Also

- [Error Model](error-model.md) · [Error Accumulation](error-accumulation.md)
- [Syntax Errors](../the-structure/syntax-errors.md)
