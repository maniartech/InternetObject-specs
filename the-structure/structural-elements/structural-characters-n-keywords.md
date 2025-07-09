# Structural Characters

Structural characters define the syntax and organization of data within an Internet Object document. These characters form the foundation of the format's grammar and control how data is parsed and interpreted.

## Character Set

| Symbol | Name | Unicode | Function | Context |
|--------|------|---------|----------|---------|
| `,` | Comma | `U+002C` | Value separator | Separates items in arrays and objects |
| `~` | Tilde | `U+007E` | Record delimiter | Indicates the start of a new record in collections |
| `:` | Colon | `U+003A` | Key-value separator | Separates keys from their corresponding values |
| `[` | Open Square Bracket | `U+005B` | Array start | Begins an array structure |
| `]` | Close Square Bracket | `U+005D` | Array end | Ends an array structure |
| `{` | Open Curly Bracket | `U+007B` | Object start | Begins an object or dictionary |
| `}` | Close Curly Bracket | `U+007D` | Object end | Ends an object or dictionary |
| `---` | Triple Hyphens | `U+002D` | Section separator | Separates header and data sections of the document |
| `#` | Hash | `U+0023` | Comment delimiter | Initiates a single-line comment |
| `"` | Double Quote | `U+0022` | String delimiter | Encloses string values |
| `'` | Single Quote | `U+0027` | String delimiter | Alternative string delimiter |

## Usage Examples

### Basic Structure
```ruby
# Surrounding braces define the object
# And key-value pairs are separated by colons and commas
~ { name: "John Doe", age: 30, active: true }

# Array with values surrounded by square brackets
~ [ "item1", "item2", "item3" ]
```

### Collections and Records
```ruby
# Schema definition
~ $person: {name: string, age: number}

# Triple hyphens separate sections
---

# Tilde marks new record in the collection
~ "Alice", 25
~ "Bob", 30
~ "Charlie", 35
```

### String Delimiters
```ruby
{
    message1: "Hello World",    # Double quotes
    message2: 'Hello World',    # Single quotes (equivalent)
    path: "C:\Program Files\"   # Escaped quotes when needed
}
```

## Structural Rules

- **Balanced Delimiters**: Opening brackets/braces must have corresponding closing ones
- **Proper Nesting**: Structures can be nested but must maintain proper hierarchy
- **Separator Consistency**: Commas separate elements within the same structure level
- **Section Division**: Triple hyphens (`---`) separate document sections
- **Comment Scope**: Hash (`#`) comments extend to end of line only
- **String Equivalence**: Single and double quotes are functionally equivalent

## Grammar Context

### Container Structures
- **Objects**: `{key: value, key: value}`
- **Arrays**: `[value, value, value]`
- **Mixed Nesting**: Objects and arrays can contain each other

### Collection Format
- **Header Section**: Schema definitions and metadata
- **Data Section**: Actual records preceded by `~`
- **Section Separator**: `---` divides header from data

### Comment Integration
- **Inline Comments**: `# Comment text`
- **Full Line Comments**: `# Complete line comment`
- **Documentation**: Comments can appear anywhere for annotation

## See Also
- **[Other Special Characters](./other-special-characters.md)** - Additional functional characters
- **[Literals](./literals.md)** - Predefined constant values
- **[Comments](../comments.md)** - Comment syntax and usage
- **[Collections](../../the-collections/)** - Collection structure and records
