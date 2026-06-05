---
status: candidate
description: Single-line comments for annotating documents.
---

# Comments

Internet Object supports **single-line comments** for documenting and annotating data. A
comment starts with a hash sign (`#`) and runs to the end of the line.

## Syntax

- **Start character** — the hash sign (`#`, `U+0023`).
- **Scope** — a single line only.
- **Placement** — anywhere in the document.
- **Content** — everything after `#` on the same line is ignored by the parser.

## Examples

```ruby
# Internet Object document: personnel records

# Address schema definition
~ $address: {street:string, zip:{string, maxLen:5}, city:string}

# Person schema definition
~ $schema: {
    name:string,               # individual's full name
    age:int,                   # age in years
    homeAddress?: $address,    # optional home address
    officeAddress?: $address   # optional office address
}
---
# Personnel records
~ John Doe, 25, {Queens, "50010", NewYork}, {Bond Street, "50001", NewYork}
~ Jane Doe, 20, {Queens, "50010", NewYork}, {Bond Street, "50001", NewYork}
```

### Comment placement

A comment can stand on its own line or trail a value:

```ruby
{
    # person details
    name: John Doe, # inline comment
    age: 30,        # another inline comment

    # contact information
    contact: {
        email: 'john@example.com',
        phone: '+1-555-0123'
    }
}
```

## Rules

- A comment can appear on any line, standalone or trailing a value.
- A comment supports full Unicode text.
- A comment cannot span multiple lines.
- No escaping is needed inside a comment.
- A `#` inside a quoted string is literal text, not a comment.

## Best practices

- **Be clear and concise** — use direct language.
- **Explain why, not what** — focus on reasoning, not the obvious.
- **Keep comments current** — update them when the data or schema changes.
- **Stay consistent** — keep a uniform commenting style across documents.

## See Also

- [Internet Object Document](introduction/README.md) — overall document structure
- [Encoding](encoding.md) — Unicode support in text content
