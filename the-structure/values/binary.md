---
description: Binary values written as Base64 byte strings.
---

# Binary

A **binary value** is a sequence of raw bytes carried as text. It is written as a Base64 byte
string: the prefix `b` followed by Base64 content in single or double quotes. Binary values
suit images, encrypted content, cryptographic keys, or any arbitrary byte sequence in an
otherwise text-based document.

The content between the quotes is Base64 per RFC 4648. *Base64* is the encoding; *binary* is
the value type.

> **Implementation status (beta).** Binary literals are **not yet available** in the reference
> implementation: `b'…'` and `b"…"` currently raise a syntax error (`unexpected-token`), and no
> `binary` schema type is registered. This page documents the intended design; the examples
> below are illustrative and are not yet executable. Track progress in the
> [Roadmap](../../roadmap.md).

## Syntax

A binary value is prefixed with `b` and enclosed in single or double quotes; the content must
be valid Base64.

```ebnf
binaryValue = "b" (singleQuotedBase64 | doubleQuotedBase64)
singleQuotedBase64 = "'" base64Content "'"
doubleQuotedBase64 = '"' base64Content '"'
base64Content   = { base64Character }
base64Character = "A"…"Z" | "a"…"z" | "0"…"9" | "+" | "/" | "="
```

## Structural characters

| Symbol | Name | Unicode | Description |
|--------|------|---------|-------------|
| `b` | Byte prefix | `U+0062` | Marks the value as a Base64 byte string |
| `'` | Single quote | `U+0027` | Encloses the Base64 content |
| `"` | Double quote | `U+0022` | Encloses the Base64 content |
| `A`–`Z`, `a`–`z`, `0`–`9` | Base64 alphabet | — | Base64 data characters |
| `+`, `/` | Base64 alphabet | `U+002B`, `U+002F` | Base64 data characters |
| `=` | Padding | `U+003D` | Base64 padding |

## Valid forms

```ruby
b'SGVsbG8gV29ybGQ='        # "Hello World"
b"SGVsbG8gV29ybGQ="        # same, with double quotes
b'QWxhZGRpbjpvcGVuIHNlc2FtZQ=='   # "Aladdin:open sesame"
b'TWFu'                    # "Man"  (no padding needed)
b'TWE='                    # "Ma"   (one pad)
b'TQ=='                    # "M"    (two pads)
b''                        # empty byte string
```

## Invalid forms

```ruby
bSGVsbG8=                  # ✗ missing quotes
b'SGVsbG8 gV29ybGQ='       # ✗ space within the Base64 content
b'SGVsbG8@V29ybGQ='        # ✗ invalid character '@'
B'SGVsbG8gV29ybGQ='        # ✗ prefix must be lower-case b
```

## Behavior

- **Whitespace** — leading and trailing whitespace around the quotes is ignored; whitespace
  inside the Base64 content is not allowed.
- **Prefix case** — the prefix must be lower-case `b`; the Base64 content is case-sensitive.
- **Padding** — standard `=` padding is required for correct decoding.
- **Decoding** — a parser decodes the content into a byte sequence (commonly a byte array or
  buffer) and preserves the exact bytes; invalid Base64 is a parse error.

Internet Object does not interpret the structure of the decoded bytes — any format, compression,
or application meaning is the application's concern.

## See Also

- [Value Representations](README.md) — all value types
- [Binary](../../schema-definition-language/data-types/binary.md) — the binary schema type
- [Strings](string/README.md) — text values (open, regular, raw)
