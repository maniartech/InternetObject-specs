---
status: candidate
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
{ 1                      # ✗ expected-closing-bracket  (the '{' is never closed)
```

The unclosed `{` raises `expected-closing-bracket`. (The predicate `unterminated-` is reserved for
constructs the *tokenizer* closes, such as a quoted string; a bracket is closed by the parser.)

### Missing separators merge values

Values are comma-separated. Where a comma is omitted between two **values**, the text between them
is a single [open string](values/string/open-strings.md), and an open string may contain spaces —
so the result is one well-formed value, and there is nothing for a parser to reject:

```ruby
---
~ 101 Thomas 25      # → "101 Thomas 25" — one value, not three
```

A conformant parser **MUST NOT** report an error here, and **MUST NOT** insert the missing
separators. This is the one fault the format cannot diagnose for you, and it is the direct cost of
having open strings at all: the same property that lets `New York` be written without quotes is
what makes `101 Thomas 25` a single value.

The rule stops at values. A missing separator before a **key** is still an error, because a key
cannot follow an unseparated value:

<!-- io:test per-line -->
```ruby
{John age: 25 gender: M}   # ✗ unexpected-token
```

### Unterminated string

A quoted string with no closing quote raises `unterminated-string`. This applies to every quoted
form, including the annotated ones (`r'...'`, `b'...'`, `dt'...'`):

<!-- io:test per-line -->
```ruby
"John Doe            # ✗ unterminated-string
r'C:\path           # ✗ unterminated-string
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
