---
description: Common syntax errors and how the parser recovers.
---

# Syntax Errors

A **syntax error** is a problem in the *shape* of the text — an unbalanced brace, a missing
comma, an unterminated string — detected while tokenizing or parsing, before any schema
validation. (Errors about *values* — wrong type, out of range — are validation errors; see
[Error Model](../parsing-and-errors/error-model.md).)

## Common syntax errors

### Unbalanced brackets

```ruby
pt: { object, schema: { x: int } }
---
{ 1                      # ✗ expecting-bracket  (the '{' is never closed)
```

The unterminated `{` raises `expecting-bracket`.

### Missing comma

Values must be comma-separated. Without commas, several tokens merge into one open string:

```ruby
~ 101 Thomas 25      # one value "101 Thomas 25", not three
```

### Unterminated string

A quoted string with no closing quote raises a tokenizer error:

```ruby
~ "John Doe          # missing closing quote
```

## Recovery is bounded by structure

On a syntax error the parser **skips ahead to the next boundary** — a record separator `~` or
a section separator `---` (or end of file) — records the error, and resumes. So one malformed
record does not prevent later records from being parsed. See
[Parser Behavior & Recovery](../parsing-and-errors/parser-behavior.md).

## See Also

- [Error Model](../parsing-and-errors/error-model.md)
- [Parser Behavior & Recovery](../parsing-and-errors/parser-behavior.md)
- [Comments](comments.md)
