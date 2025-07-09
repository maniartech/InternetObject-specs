# Comments

Internet Object supports **single-line comments** for documenting and annotating data. Comments start with a hash sign (`#`) and continue to the end of the line.

## Syntax

- **Start Character**: Hash sign (`#` U+0023)
- **Scope**: Single line only
- **Placement**: Can appear anywhere in the document
- **Content**: Everything after `#` on the same line is ignored by the parser

## Examples

```ruby
# Internet Object Document: Personnel Records

# Address schema definition
~ $address: {street:string, zip:{string, maxLength:5}, city:string}

# Person schema definition
~ $schema: {
    name:string,               # Individual's full name
    age:int,                   # Age in years
    homeAddress?: $address,    # Optional home address
    officeAddress?: $address   # Optional office address
}

---
# Personnel Records
~ John Doe, 25, {Queens, 50010, NewYork}, {Bond Street, 50001, NewYork}
~ Jane Doe, 20, {Queens, 50010, NewYork}, {Bond Street, 50001, NewYork}
```

### Comment Placement

```ruby
# Person data with comments
{
    # Person details
    name: John Doe, # Inline field comment
    age: 30,        # Another inline comment

    # Contact information
    contact: {
        email: 'john@example.com',
        phone: '+1-555-0123'
    }
}
```

## Rules

- Comments can appear on any line
- Can be standalone or inline after data
- Support full Unicode text
- Cannot span multiple lines
- No special escaping needed

## Best Practices

- **Be Clear and Concise**: Use simple, direct language
- **Explain Why, Not What**: Focus on reasoning rather than obvious facts
- **Keep Comments Updated**: Update comments when data structures change
- **Use Consistently**: Maintain uniform style throughout documents

## See Also
- **[Internet Object Structure](./README.md)** - Overall document structure
- **[Encoding](./encoding.md)** - Unicode support in text content
