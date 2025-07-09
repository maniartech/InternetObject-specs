---
description: Regular strings in Internet Object
---

# Regular String

A **Regular String** in Internet Object is a sequence of Unicode codepoints enclosed in single quotes (`' U+0027`) or double quotes (`" U+0022`). Regular strings allow any character, including whitespace and structural characters, and support escaping for special codepoints. This makes them suitable for text that requires leading/trailing whitespace, structural characters, or complex escaping.

Regular strings are scalar values. They preserve all content as written, including whitespace and Unicode characters.

## Syntax

A regular string is enclosed in single or double quotes and may contain any Unicode codepoint, with support for escape sequences.

```ebnf
regularString     = '"' { dqChar | escapeSequenceDQ } '"' | '\'' { sqChar | escapeSequenceSQ } '\''
dqChar            = any Unicode codepoint except '"' or '\\'
sqChar            = any Unicode codepoint except '\'' or '\\'
escapeSequenceDQ  = '\\' ( '"' | '\'' | '\\' | 'b' | 'f' | 'r' | 'n' | 't' | unicodeEscape | hexEscape | other )
escapeSequenceSQ  = '\\' ( '\'' | '"' | '\\' | 'b' | 'f' | 'r' | 'n' | 't' | unicodeEscape | hexEscape | other )
unicodeEscape     = 'u' hex4
hexEscape         = 'x' hex2
hex4              = 4 hexadecimal digits (must form a valid Unicode codepoint)
hex2              = 2 hexadecimal digits
other             = any character except 'u' or 'x'
```

## Structural Characters

| Symbol | Name                 | Unicode   | Description                                 |
|--------|----------------------|-----------|---------------------------------------------|
| `"`    | Double Quote         | U+0022    | Encloses the string, must be escaped inside  |
| `'`    | Single Quote         | U+0027    | Encloses the string, must be escaped inside  |
| `\\`   | Reverse Solidus      | U+005C    | Escape character                            |
| (space, tab, etc.) | Whitespace         | Multiple  | Preserved as written                        |
| Any    | Any Unicode codepoint| Multiple  | Allowed, except unescaped enclosing quote    |

## Valid Forms
Examples of valid regular strings:

```text

"John Doe"
'John Doe'
"   John Doe   "
'   John Doe   '
"Peter D'mello"
'Peter D\'mello'  # Escaped single quote inside single-quoted string
"जॉन डो"
'Can contain unicode characters 😃'
"Lorem ipsum dolor sit amet consetetur sadipscing\nelitr sed diam nonumy eirmod.\n\nTempor invidunt ut labore et dolore magna aliquyam\nerat sed diam voluptua"
'Lorem ipsum dolor sit amet consetetur sadipscing\nelitr sed diam nonumy eirmod.\n\nTempor invidunt ut labore et dolore magna aliquyam\nerat sed diam voluptua'
"She said, \"I Love it\""
'She said, "I Love it"'
"\x3A"  # Escaped with two-digit hex
'\x3A'
"\u00AF" # Escaped with four-digit hex
'\u00AF'
"\uD83D\uDE00" # UTF-16 surrogate pair for emoji
'\uD83D\uDE00'
```

## Optional Behaviors
- **Whitespace**: Leading, trailing, and internal whitespace are preserved.
- **Escaping**: Only designated escape sequences are interpreted: `\n`, `\"`, `\\`, `\'`, `\b`, `\f`, `\r`, `\t`, `\u` (with exactly 4 hex digits and must be a valid Unicode codepoint), and `\x` (with exactly 2 hex digits). All others (e.g., `\o`) are left as a literal backslash and character. For example, `"hell\\o"` emits `hello`.
- **Multiline**: Newline and carriage return characters are preserved.
- **String Comparison**: Escaped and unescaped forms are equivalent if they represent the same Unicode codepoints.

## Comments
Comments are not allowed within regular strings, but may appear outside or between values as per Internet Object comment rules.

## Invalid Forms
Examples of invalid regular strings:

```text
John Doe         # ❌ Not quoted (should be "John Doe" or 'John Doe')
"John Doe        # ❌ Missing closing quote
'John Doe        # ❌ Missing closing quote
"John Doe""      # ❌ Extra quote at end
'John Doe''      # ❌ Extra quote at end
"She said, "I Love it"" # ❌ Unescaped internal quote (should be \"I Love it\")
'She said, 'I Love it'' # ❌ Unescaped internal quote (should be \'I Love it\')
"\q"             # ❌ Invalid escape sequence
'\q'             # ❌ Invalid escape sequence
```

## Preservation of Structure
Internet Object preserves:
- All Unicode codepoints and whitespace as written
- Escaped and unescaped forms (syntactic fidelity)

It does **not** interpret or enforce:
- Application-specific constraints
- Normalization of escape sequences (beyond equivalence)

## See Also
- [String Values Overview](./README.md)
- [Open String](./open-strings.md)
- [Raw String](./raw-strings.md)
