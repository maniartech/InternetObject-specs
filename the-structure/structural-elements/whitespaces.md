---
status: candidate
description: Recognized whitespace characters and how the parser treats them.
---

# Whitespace & Indentation

In the Internet Object format, whitespace is any character with a Unicode code point less than
or equal to `U+0020` (the range `U+0000` to `U+0020`). This range covers both non-printable
control characters and common whitespace such as the horizontal tab (`U+0009`), newline
(`U+000A`), vertical tab (`U+000B`), form feed (`U+000C`), carriage return (`U+000D`), and
space (`U+0020`).

Because the format is not whitespace-sensitive, indentation carries no meaning: it is ordinary
whitespace between tokens. You may indent objects, arrays, and definitions freely for
readability without changing how a document parses.

## EBNF definition

```ebnf
whitespace         = ascii_whitespace | unicode_whitespace ;

ascii_whitespace   = ? any character with Unicode code point U+0000 to U+0020 ? ;
unicode_whitespace = U+1680 | U+2000 | U+2001 | U+2002 | U+2003 | U+2004
                   | U+2005 | U+2006 | U+2007 | U+2008 | U+2009 | U+200A
                   | U+2028 | U+2029 | U+202F | U+205F | U+3000 | U+FEFF ;
```

Beyond the `U+0000`–`U+0020` range, the format also treats characters in the Unicode whitespace
category as whitespace, such as the non-breaking space (`U+00A0`), em space (`U+2003`), and en
space (`U+2002`). Recognizing these makes the format easier to work with in languages that use
non-Latin scripts, such as Arabic, Chinese, or Japanese.

The format also recognizes the zero-width non-breaking space (`U+FEFF`) as whitespace. This
character is often used as a byte order mark (BOM) in Unicode-encoded documents.

## Whitespace characters

The following table lists the valid whitespace characters:

| Code points          | Description                                        | Notes                                                                                              |
| -------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `U+0000` to `U+0020` | Space, line feed, carriage return, tab, etc.       | Any character with code point `<= 0x20`. Includes the ASCII space and control characters.           |
| `U+1680`             | Ogham space mark                                   | Space used in Ogham script.                                                                        |
| `U+2000`             | En quad                                            | Space equal to the width of the lowercase letter "n".                                              |
| `U+2001`             | Em quad                                            | Space equal to the width of the uppercase letter "M".                                              |
| `U+2002`             | En space                                           | Space equal to half the width of the em space.                                                     |
| `U+2003`             | Em space                                           | Space equal to the width of the em space.                                                          |
| `U+2004`             | Three-per-em space                                 | Space equal to one-third of an em space.                                                           |
| `U+2005`             | Four-per-em space                                  | Space equal to one-quarter of an em space.                                                         |
| `U+2006`             | Six-per-em space                                   | Space equal to one-sixth of an em space.                                                           |
| `U+2007`             | Figure space                                       | Space equal to the width of a numeral.                                                             |
| `U+2008`             | Punctuation space                                  | Space used for punctuation.                                                                        |
| `U+2009`             | Thin space                                         | Space narrower than the regular space.                                                             |
| `U+200A`             | Hair space                                         | Very narrow space used for special purposes.                                                       |
| `U+2028`             | Line separator                                     | Separates lines of text.                                                                           |
| `U+2029`             | Paragraph separator                                | Separates paragraphs of text.                                                                      |
| `U+202F`             | Narrow no-break space                              | Non-breaking space narrower than the regular space.                                                |
| `U+205F`             | Medium mathematical space                          | Space used in mathematical notation.                                                               |
| `U+3000`             | Ideographic space                                  | Space used in East Asian scripts.                                                                  |
| `U+FEFF`             | Byte order mark (BOM)                              | Zero-width non-breaking space, often used as a BOM.                                                |

## Rules

- **Whitespace insensitive** — the parser ignores whitespace surrounding values and structural
  elements.
- **Preserved inside strings** — whitespace within a value or string is kept exactly as written.
- **Recognized by code point** — whitespace is identified by Unicode code point, per the table
  above.
- **Reserved** — these whitespace characters **MUST NOT** appear within identifiers or keys.

## Best practices

- **Aid readability** — use spaces and tabs to format a document so it is easy to read.
- **Avoid clutter** — excessive whitespace adds no meaning and reduces readability.
- **Stay consistent** — apply whitespace uniformly across a document for easier maintenance.
- **Watch for invisible characters** — zero-width and other invisible spaces can slip into
  keys or values unnoticed; avoid pasting them in.

## See Also

- [Encoding](../encoding.md) — Unicode handling and document encoding
- [Strings](../values/string/README.md) — whitespace handling inside strings
