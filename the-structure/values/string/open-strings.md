---
description: Open strings — the unquoted string form.
---

# Open Strings

An **open string** is the simplest string form: a sequence of Unicode code points with no
enclosing quotes. Open strings suit simple, unstructured text that does not begin or end with
whitespace and does not require escaping of special or structural characters.

Open strings are scalar values. They preserve all internal whitespace and Unicode content, but
cannot start or end with whitespace.

## Syntax

An open string begins with any non-whitespace code point and ends at the first whitespace or
structural character, or at the end of the document.

```ebnf
openString    = nonWhitespace (codepoint)*
nonWhitespace = any Unicode code point except whitespace
codepoint     = any Unicode code point except a structural character or document end
```

## Structural characters

| Symbol | Name | Unicode | Description |
|--------|------|---------|-------------|
| (space, tab, etc.) | Whitespace | Multiple | Terminates the string; cannot start or end it |
| `:` | Colon | `U+003A` | Structural character (terminates the string) |
| `,` | Comma | `U+002C` | Structural character (terminates the string) |
| `{` | Open curly bracket | `U+007B` | Structural character (terminates the string) |
| `}` | Close curly bracket | `U+007D` | Structural character (terminates the string) |
| `[` | Open square bracket | `U+005B` | Structural character (terminates the string) |
| `]` | Close square bracket | `U+005D` | Structural character (terminates the string) |
| `"` | Double quote | `U+0022` | Allowed; does not terminate or need escaping |
| `'` | Single quote | `U+0027` | Allowed; does not terminate or need escaping |

## Valid forms

Examples of valid open strings:

```ruby
John Doe
Peter D'mello
जॉन डो
Wow Great
😃
```

Multiple open strings in an object:

```ruby
जॉन डो, Wow Great, 😃
```

A multiline open string (no escaping required):

```ruby
Lorem ipsum dolor sit amet consetetur sadipscing elitr sed
diam nonumy eirmod.

Tempor invidunt ut labore et dolore magna aliquyam erat
sed diam voluptua
```

## Optional behaviors

- **Whitespace** — an open string cannot start or end with whitespace, but preserves all
  internal whitespace.
- **No escaping** — character escaping is not processed; quotes and other characters appear
  as-is.
- **Multiline** — an open string can span multiple lines as long as no structural character
  interrupts it.

## Comments

Comments are not allowed inside open strings, but may appear outside or between values, per the
format's comment rules.

## Invalid forms

Examples of invalid open strings:

```ruby
 John Doe      # ✗ starts with whitespace (use a regular string: " John Doe")
"John Doe"     # ✗ quoted (this is a regular string, not an open string)
```

## Preservation of structure

Internet Object preserves:

- All Unicode code points and internal whitespace as written
- The unquoted, open form of the string

It does **not** interpret or enforce:

- Escaping or encoding
- Leading or trailing whitespace (which is disallowed)
- Application-specific constraints

## See Also

- [Strings](README.md) — the three string forms
- [Regular Strings](regular-strings.md) — quoted strings with escaping
- [Raw Strings](raw-strings.md) — literal strings without escape processing
