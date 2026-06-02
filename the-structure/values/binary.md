---
description: Base64 byte strings in Internet Object
---

# Base64 Byte String
A **Base64 Byte String** in Internet Object is a sequence of binary data encoded in Base64 format, prefixed with `b` and enclosed in either single quotes (`' U+0027`) or double quotes (`" U+0022`). Byte strings are ideal for representing binary data such as images, encrypted content, cryptographic keys, or any arbitrary sequence of bytes in a text-based format.

Base64 byte strings are scalar values that represent binary data. The content between the quotes must be valid Base64 encoding according to RFC 4648.

## Syntax
A Base64 byte string is prefixed with `b` and enclosed in either single or double quotes. The content must be valid Base64 encoding.

```ebnf
base64String = "b" (singleQuotedBase64 | doubleQuotedBase64)
singleQuotedBase64 = "'" base64Content "'"
doubleQuotedBase64 = '"' base64Content '"'
base64Content = { base64Character }
base64Character = "A" | "B" | "C" | ... | "Z" | "a" | "b" | ... | "z" | "0" | "1" | ... | "9" | "+" | "/" | "="
```

## Structural Characters

The following characters are used to structure Base64 byte strings:

| Symbol | Name                 | Unicode   | Description                                 |
|--------|----------------------|-----------|---------------------------------------------|
| `b`    | Byte Prefix          | U+0062    | Indicates Base64 byte string type          |
| `'`    | Single Quote         | U+0027    | Encloses Base64 content                     |
| `"`    | Double Quote         | U+0022    | Encloses Base64 content                     |
| `A-Z`  | Uppercase Letters    | U+0041-U+005A | Base64 alphabet                      |
| `a-z`  | Lowercase Letters    | U+0061-U+007A | Base64 alphabet                      |
| `0-9`  | Digits               | U+0030-U+0039 | Base64 alphabet                      |
| `+`    | Plus Sign            | U+002B    | Base64 alphabet                             |
| `/`    | Forward Slash        | U+002F    | Base64 alphabet                             |
| `=`    | Equals Sign          | U+003D    | Base64 padding character                    |

> **Note:** Only valid Base64 characters are allowed within the quotes. Invalid characters will result in a parsing error.

## Valid Forms
Examples of valid Base64 byte strings:

```ruby
b'SGVsbG8gV29ybGQ='                    # "Hello World" in Base64
b"SGVsbG8gV29ybGQ="                    # Same as above with double quotes
b'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='  # PNG image data
b'QWxhZGRpbjpvcGVuIHNlc2FtZQ=='        # "Aladdin:open sesame" in Base64
b''                                    # Empty byte string
b""                                    # Empty byte string (double quotes)
b'TWFu'                                # "Man" in Base64
b'TWE='                                # "Ma" in Base64 (with padding)
b'TQ=='                                # "M" in Base64 (with padding)
```

## Optional Behaviors
- **Whitespace**: Leading and trailing whitespace around the quotes are ignored. Internal whitespace within the Base64 content is not allowed.
- **Empty Representation**: Empty byte strings are supported (`b''` or `b""`).
- **Case Sensitivity**: The prefix must be lowercase `b`. The Base64 content is case-sensitive as per RFC 4648.
- **Padding**: Proper Base64 padding with `=` characters is required for correct decoding.
- **Validation**: The parser validates that the content is valid Base64 and can be decoded to binary data.

## Invalid Forms
Examples of invalid Base64 byte strings:

```yaml
bSGVsbG8=                             # ✗ Missing quotes
b'SGVsbG8 gV29ybGQ='                  # ✗ Space within Base64 content
b'SGVsbG8@V29ybGQ='                   # ✗ Invalid character '@' in Base64
b'SGVsbG8'                            # ✗ Invalid Base64 (missing padding)
b'SGVsbG8gV29ybGQ'                    # ✗ Invalid Base64 (incomplete)
B'SGVsbG8gV29ybGQ=                    # ✗ Missing closing quote
b''SGVsbG8gV29ybGQ=''                 # ✗ Double quotes around content
```

## Preservation of Structure
Internet Object preserves:
- The exact Base64 encoding as written
- The choice of single or double quotes
- The lowercase `b` prefix

It does **not** interpret or enforce:
- The format or structure of the decoded binary data
- Application-specific constraints on the binary content
- Compression or encoding within the binary data

## Decoding Behavior
When processed by an Internet Object parser:
- The Base64 content is decoded into a sequence of bytes
- The resulting binary data is typically represented as a byte array or buffer
- Invalid Base64 content results in a parsing error
- The decoded data maintains the exact binary representation

## See Also
- [Values Overview](./README.md)
- [Binary Schema](../../schema-definition-language/data-types/binary.md)
