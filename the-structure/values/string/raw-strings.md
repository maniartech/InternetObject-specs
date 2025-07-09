---
description: Raw strings in Internet Object
---

# Raw String
A **Raw String** in Internet Object is a sequence of Unicode codepoints prefixed with `r` or `R` and enclosed in either single quotes (`' U+0027`) or double quotes (`" U+0022`). Raw strings are ideal for text containing many backslashes, quotes, or structural characters, such as file paths or regular expressions. They do not support escape sequences except for the enclosing quote, which can be represented by doubling the enclosing quote character inside the string.

Raw strings are scalar values. They preserve all content as written, including whitespace, newlines, and Unicode characters.

## Syntax
A raw string is prefixed with `r` or `R` and enclosed in either single or double quotes. The only special rule is that the enclosing quote character inside the string must be represented as two consecutive enclosing quotes.

```ebnf
rawString = "r" (singleQuotedRaw | doubleQuotedRaw)
singleQuotedRaw = "'" { character | doubleSingleQuote } "'"
doubleQuotedRaw = '"' { character | doubleDoubleQuote } '"'
character = any Unicode codepoint except the enclosing quote
doubleSingleQuote = "''" (represents a single quote inside a single-quoted raw string)
doubleDoubleQuote = '""' (represents a double quote inside a double-quoted raw string)
```

## Structural Characters

The following characters are used to structure raw strings:

| Symbol | Name                 | Unicode   | Description                                 |
|--------|----------------------|-----------|---------------------------------------------|
| `r`    | Raw Prefix           | U+0072    | Indicates raw string type                |
| `'`    | Single Quote         | U+0027    | Encloses string, doubled inside for escape   |
| `"`    | Double Quote         | U+0022    | Encloses string, doubled inside for escape   |
| (space, tab, etc.) | Whitespace         | Multiple  | Preserved as written                        |
| Any    | Any Unicode codepoint| Multiple  | Allowed, except unescaped enclosing quote    |

> **Note:** The reverse solidus (`\\` U+005C) is always treated as a literal character in raw strings—there is no escaping with backslash.

## Valid Forms
Examples of valid raw strings:

```ruby
r'C:\program files\example\app.exe'
r"C:\program files\example\app.exe"
r'^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$'
r"^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$"
r'जॉन डो'
r"Can contain Ucharacters 😃"
r'A Unicode string (😃) which does not force you to escape\ncharacters like \, \n or anything except a single quote char ''''.'
r"A Unicode string (😃) which does not force you to escape\ncharacters like \, \n or anything except a double quote char \"\"."
r'Jonas D''costa'  # Contains a single quote inside
r"He said, ""Hello!"""  # Contains a double quote inside
```

## Optional Behaviors
- **Whitespace**: Leading, trailing, and internal whitespace are preserved.
- **No Escaping**: No escape sequences are supported except for doubling the enclosing quote to represent it inside the string.
- **Multiline**: Newline and carriage return characters are preserved.

## Comments
Comments are not allowed within raw strings, but may appear outside or between values as per Internet Object comment rules.

## Invalid Forms
Examples of invalid raw strings:

```yaml
rC:\program files\example\app.exe     # ✗ Missing quotes (should be r'...') or r"..."
r'Jonas D'costa'                      # ✗ Unescaped single quote inside (should be r'Jonas D''costa')
r"He said, "Hello!""                  # ✗ Unescaped double quote inside (should be r"He said, ""Hello!"")
r'Unclosed string                     # ✗ Missing closing quote
r'Contains \\ escapes'                # ✗ Backslash is not an escape, just literal
```

## Preservation of Structure
Internet Object preserves:
- All Unicode codepoints and whitespace as written
- The use of doubled enclosing quotes for embedded quotes

It does **not** interpret or enforce:
- Application-specific constraints
- Escaping beyond doubled enclosing quotes
## See Also
- [String Values Overview](./README.md)
- [Open String](./open-strings.md)
- [Regular String](./regular-strings.md)
