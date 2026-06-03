---
description: Regular strings — quoted strings with escape sequences.
---

# Regular Strings

A **regular string** is a sequence of Unicode code points enclosed in single quotes
(`'`, `U+0027`) or double quotes (`"`, `U+0022`). Regular strings allow any character —
including whitespace and structural characters — and support escape sequences for special code
points. This makes them suitable for text that needs leading or trailing whitespace, structural
characters, or escaping.

Regular strings are scalar values. They preserve all content as written, including whitespace
and Unicode characters.

## Syntax

A regular string is enclosed in single or double quotes and may contain any Unicode code point,
with support for escape sequences.

```ebnf
regularString     = '"' { dqChar | escapeSequenceDQ } '"' | "'" { sqChar | escapeSequenceSQ } "'"
dqChar            = any Unicode code point except '"' or '\'
sqChar            = any Unicode code point except "'" or '\'
escapeSequenceDQ  = '\' ( '"' | "'" | '\' | 'b' | 'f' | 'r' | 'n' | 't' | unicodeEscape | hexEscape | other )
escapeSequenceSQ  = '\' ( "'" | '"' | '\' | 'b' | 'f' | 'r' | 'n' | 't' | unicodeEscape | hexEscape | other )
unicodeEscape     = 'u' hex4
hexEscape         = 'x' hex2
hex4              = 4 hexadecimal digits (must form a valid Unicode code point)
hex2              = 2 hexadecimal digits
other             = any character except 'u' or 'x'
```

## Structural characters

| Symbol | Name | Unicode | Description |
|--------|------|---------|-------------|
| `"` | Double quote | `U+0022` | Encloses the string; must be escaped inside |
| `'` | Single quote | `U+0027` | Encloses the string; must be escaped inside |
| `\` | Reverse solidus | `U+005C` | Escape character |
| (space, tab, etc.) | Whitespace | Multiple | Preserved as written |
| Any | Any Unicode code point | Multiple | Allowed, except an unescaped enclosing quote |

## Valid forms

Examples of valid regular strings:

```ruby
"John Doe"
'John Doe'
"   John Doe   "                 # leading/trailing whitespace preserved
"Peter D'mello"                  # single quote needs no escape in a double-quoted string
'Peter D\'mello'                 # escaped single quote in a single-quoted string
"जॉन डो"
'Can contain unicode characters 😃'
"She said, \"I Love it\""        # escaped double quotes
'She said, "I Love it"'          # double quotes need no escape in a single-quoted string
"Line one\nLine two"             # \n is interpreted as a newline
"\x3A"                           # two-digit hex escape -> ":"
"\u00AF"                         # four-digit unicode escape -> "¯"
"\uD83D\uDE00"                   # UTF-16 surrogate pair -> "😀"
```

## Optional behaviors

- **Whitespace** — leading, trailing, and internal whitespace are preserved.
- **Escaping** — only these escape sequences are interpreted: `\n`, `\"`, `\\`, `\'`, `\b`,
  `\f`, `\r`, `\t`, `\u` (exactly 4 hex digits, forming a valid code point), and `\x` (exactly
  2 hex digits). For any other sequence (e.g. `\o`), the backslash is dropped and the following
  character is kept literally — so `"hell\o"` emits `hello`.
- **Multiline** — newline and carriage-return characters are preserved.
- **Equivalence** — escaped and unescaped forms are equal when they represent the same code
  points.

## Comments

Comments are not allowed inside regular strings, but may appear outside or between values, per
the format's comment rules.

## Invalid forms

Examples of invalid regular strings:

```ruby
John Doe                  # ✗ not quoted (use "John Doe" or 'John Doe')
"John Doe                 # ✗ missing closing quote
"She said, "I Love it""   # ✗ unescaped inner quote (use \"I Love it\")
```

> **Lenient escapes.** An unrecognized escape such as `\q` is *not* an error — the backslash is
> dropped and the character is kept, so `"\q"` emits `q`. The genuine errors above are an
> unquoted value, an unterminated string, and an unescaped enclosing quote.

## Preservation of structure

Internet Object preserves:

- All Unicode code points and whitespace as written
- Escaped and unescaped forms (syntactic fidelity)

It does **not** interpret or enforce:

- Application-specific constraints
- Normalization of escape sequences beyond equivalence

## See Also

- [Strings](README.md) — the three string forms
- [Open Strings](open-strings.md) — the unquoted form
- [Raw Strings](raw-strings.md) — literal strings without escape processing
