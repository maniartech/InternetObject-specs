---
status: candidate
description: Raw strings — literal strings where backslashes are not escapes.
---

# Raw Strings

A **raw string** is a sequence of Unicode code points prefixed with a lower-case `r` and enclosed
in single quotes (`'`, `U+0027`) or double quotes (`"`, `U+0022`). Raw strings suit text with
many backslashes, quotes, or structural characters — file paths or regular expressions, for
example. They process no escape sequences except the enclosing quote, which is written by
doubling it inside the string.

Raw strings are scalar values. They preserve all content as written, including whitespace,
newlines, and Unicode characters.

## Syntax

A raw string is prefixed with a lower-case `r` and enclosed in single or double quotes. The
prefix is **case-sensitive**, like everything else in Internet Object: `R'...'` is not a raw
string, and reports `unknown-annotation`. The same holds for every annotation prefix — `b`,
`d`, `t`, `dt`. The only
special rule is that the enclosing quote, when it appears inside the string, must be written as
two consecutive enclosing quotes.

```ebnf
rawString = "r" (singleQuotedRaw | doubleQuotedRaw)
singleQuotedRaw = "'" { character | doubleSingleQuote } "'"
doubleQuotedRaw = '"' { character | doubleDoubleQuote } '"'
character = any Unicode code point except the enclosing quote
doubleSingleQuote = "''" (a single quote inside a single-quoted raw string)
doubleDoubleQuote = '""' (a double quote inside a double-quoted raw string)
```

## Structural characters

| Symbol | Name | Unicode | Description |
|--------|------|---------|-------------|
| `r` | Raw prefix | `U+0072` | Marks the string as raw |
| `'` | Single quote | `U+0027` | Encloses the string; doubled inside to represent itself |
| `"` | Double quote | `U+0022` | Encloses the string; doubled inside to represent itself |
| (space, tab, etc.) | Whitespace | Multiple | Preserved as written |
| Any | Any Unicode code point | Multiple | Allowed, except an unescaped enclosing quote |

> **Backslash is literal.** The reverse solidus (`\`, `U+005C`) is always a literal character
> in a raw string — there is no backslash escaping.

## Valid forms

Examples of valid raw strings:

<!-- io:test per-line -->
```ruby
r'C:\program files\example\app.exe'
r"C:\program files\example\app.exe"
r'^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$'
r"^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$"
r'जॉन डो'
r"Can contain unicode characters 😃"
r'Jonas D''costa'        # a single quote inside, written as two single quotes
r"He said, ""Hello!"""   # a double quote inside, written as two double quotes
```

## Optional behaviors

- **Whitespace** — leading, trailing, and internal whitespace are preserved.
- **No escaping** — no escape sequences are processed except doubling the enclosing quote.
- **Multiline** — newline and carriage-return characters are preserved.

## Comments

Comments are not allowed inside raw strings, but may appear outside or between values, per the
format's comment rules.

## Invalid forms

<!-- io:test per-line -->
```ruby
r'Jonas D'costa'             # ✗ unexpected-token — unescaped quote
r"He said, "Hello!""         # ✗ unexpected-token — unescaped quote
r'Unclosed string            # ✗ unterminated-string — no closing quote
```

To hold a quote of the same kind, double it: `r'Jonas D''costa'` and
`r"He said, ""Hello!"""`.

Without quotes there is no annotation, so nothing marks the text as raw. That is not an error;
it is simply read by the ordinary rules — here as a keyed member, because of the colon:

```ruby
---
rC:\program files\app.exe    # → a member named `rC`, not a raw string
```

## Preservation of structure

Internet Object preserves:

- All Unicode code points and whitespace as written
- The doubled-quote convention for an embedded enclosing quote

It does **not** interpret or enforce:

- Application-specific constraints
- Any escaping beyond doubled enclosing quotes

## See Also

- [Strings](README.md) — the three string forms
- [Open Strings](open-strings.md) — the unquoted form
- [Regular Strings](regular-strings.md) — quoted strings with escaping
