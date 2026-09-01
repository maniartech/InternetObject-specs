---
status: candidate
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
| `"` | Double quote | `U+0022` | **Not permitted anywhere in an open string** — see below |
| `'` | Single quote | `U+0027` | **Not permitted anywhere in an open string** — see below |

## Valid forms

### A quote ends the run, and starts an annotation

A quote character may **not** appear in an open string — not at the start, not in the middle, not
at the end. The run before a quote is read as an **annotation name**, because that is exactly the
shape of an [annotated string](raw-strings.md): `r'…'`, `b"…"`, `dt'…'`, `d'…'`, `t'…'`. The two
cannot both be true, and the annotation wins.

So an apostrophe in ordinary text is not writable open, however natural it looks:

| Written | Read as |
| ------- | ------- |
| `don't stop` | `unknown-annotation` — `don` is not an annotation |
| `o'clock` | `unknown-annotation` |
| `5'9` | `unexpected-token` |
| `r'raw'` | a raw string — the annotation this rule exists for |

**Quoting is the escape**, and the only one: `"don't stop"` is a regular string and carries the
apostrophe with no escaping, because a single quote needs none inside double quotes. A writer
quotes such a value automatically; see
[Value formatting](../../../serialization/value-formatting.md).

Examples of valid open strings:

<!-- io:test per-line -->
```ruby
John Doe
जॉन डो
Wow Great
😃
013ABSD
12mm
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

### Beginning with a digit

An open string may begin with a digit, and many everyday values do — measurements like `12mm`,
times like `3pm`, and part codes and identifiers like `013ABSD`. Digits followed by letters is
ordinary text, not a malformed number.

The one exception is a **base prefix**. `0x`, `0o` and `0b` announce hexadecimal, octal and binary,
so a run that begins with one and does not decode is a failed number rather than a string:

```ruby
---
013ABSD              # → an open string
```

<!-- io:test per-line -->
```ruby
0x123FG              # ✗ invalid-number — announced hex, and G is not a hex digit
```

Quoting settles it either way: `"0x123FG"` is a string, unambiguously. See
[A number, or a word that begins with a digit?](../number/number.md#a-number-or-a-word-that-begins-with-a-digit).

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

Neither of these is an **error**. Each is a perfectly good value — just not an open
string, which is what makes them worth showing: an open string is defined by what it may not
begin with.

```ruby
---
 John Doe      # leading space is trimmed → "John Doe"; to keep it, write " John Doe"
```

```ruby
---
"John Doe"     # a REGULAR string, not an open string
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
