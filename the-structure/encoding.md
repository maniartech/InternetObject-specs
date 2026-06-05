---
status: candidate
description: Character encoding — UTF-8 is mandatory; Unicode, BOM, and line endings.
---

# Encoding

The Internet Object format uses **UTF-8** as its default and mandatory encoding for all text.
This ensures reliable interchange across platforms, systems, and programming languages.

## UTF-8 requirement

Every conformant implementation MUST support UTF-8. UTF-8 is chosen because it is:

- **Universal** — supported by virtually all modern systems and languages.
- **ASCII-compatible** — the ASCII range (0–127) is encoded identically.
- **Complete** — it can represent every Unicode character.
- **Byte-order independent** — no endianness concerns, unlike UTF-16 or UTF-32.
- **Self-synchronizing** — corruption of one character does not derail later parsing.

## Alternative encodings

UTF-8 is mandatory; an implementation MAY additionally support other encodings for specific
needs.

| Encoding | Support | Notes |
|----------|---------|-------|
| UTF-8 | **Mandatory** | Default and required everywhere |
| UTF-16 | Optional | Useful where the platform is natively UTF-16 |
| UTF-32 | Optional | Fixed width; larger files |
| ASCII | Optional | A compatible subset (basic characters only) |
| ISO-8859-1 | Optional | Legacy Latin-1 support |

> **UTF-8 is the baseline.** If another encoding fits your situation, convert to or from UTF-8
> at the boundary. Because UTF-8 is the only mandatory encoding, every parser and serializer
> must handle it.

## Unicode support

Internet Object supports the full Unicode character set through UTF-8:

- **Basic Multilingual Plane** — `U+0000` to `U+FFFF`.
- **Supplementary planes** — `U+10000` to `U+10FFFF`.
- **Control characters** — handled per the Unicode standard; in strings they should be escaped.

For normalization, **NFC** (Normalization Form Canonical Composed) is the recommended form. An
implementation should normalize consistently when comparing strings; the internal storage form
is unconstrained.

## Byte order mark (BOM)

- A UTF-8 BOM is the byte sequence `EF BB BF` (`U+FEFF`) at the start of a document.
- A parser treats a leading BOM as whitespace and ignores it, so a BOM never causes a parse
  error.
- A BOM is optional and not recommended for UTF-8; if you use one, do so consistently.

## Line endings

All common line-ending conventions are accepted and treated equivalently:

- **Unix/Linux** — LF (`\n`)
- **Windows** — CRLF (`\r\n`)
- **Classic Mac** — CR (`\r`)

Mixed line endings within one document are handled gracefully.

## Implementation guidance

A conformant parser SHOULD:

1. Accept UTF-8 input and skip a leading BOM if present.
2. Report a clear error for invalid UTF-8 byte sequences and reject overlong encodings.
3. Handle UTF-16 surrogate pairs correctly when decoding `\u` escape sequences.

A conformant serializer SHOULD:

1. Always emit valid UTF-8.
2. Be consistent about including or omitting a BOM for the target system.
3. Emit escape sequences for control characters where needed.

## See Also

- [Whitespace & Indentation](structural-elements/whitespaces.md) — recognized whitespace characters
- [Strings](values/string/README.md) — string representation and escaping
- [Comments](comments.md) — comment syntax and Unicode support
