# Base64 (Binary) Type

The `base64` type represents raw binary data. In Internet Object format, binary data is encoded using Base64 string syntax but is parsed into a byte array (or Buffer) in the underlying implementation.

## Syntax

Binary literals are prefixed with `b` and enclosed in single `'` or double `"` quotes.

```internet-object
# Simple binary value
data: b"SGVsbG8gV29ybGQ="

# With Constraints (MemberDef)
avatar: { base64, maxLen: 10240 }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for the `base64` MemberDef.

```internet-object
type: { string, choices: [base64] },
default?: base64,
len?: { int, min: 0 },
minLen?: { int, min: 0 },
maxLen?: { int, min: 0 },
urlSafe?: { bool, default: F },
optional?: bool,
null?: bool
```

## Constraints

### Length Constraints (`len`, `minLen`, `maxLen`)
Constraints apply to the *byte length* of the decoded data, not the length of the Base64 string.

```internet-object
# Must be exactly 16 bytes (e.g., a UUID or key)
sessionId: { base64, len: 16 }

# Must be between 1KB and 5MB
upload: { base64, minLen: 1024, maxLen: 5242880 }
```

### URL Safe (`urlSafe`)
The `urlSafe` option allows the use of URL-safe Base64 characters (`-` and `_`) instead of standard Base64 characters (`+` and `/`).

```internet-object
# Allows URL-safe characters
token: { base64, urlSafe: T }
```

## Examples

```internet-object
# Schema
avatar: base64
file: { base64, maxLen: 1048576 }
---
# Valid Values
~ b"SGVsbG8="       # Valid: "Hello"
~ b"DATA..."        # Valid: If length <= 1MB
```

## Invalid Examples

```internet-object
# Schema
key: { base64, len: 4 }
---
# Invalid Values
~ b"MTIz"        # Fail: Decodes to 3 bytes ("123"), expected 4
~ "MTIzNDU2"     # Fail: Missing 'b' prefix (interpreted as string)
~ b"Invalid!!!"  # Fail: Invalid Base64 characters
```

## Validation Behavior

1. **Syntax check**: Value must start with `b` and be a valid string literal.
2. **Decode check**: String content must be valid Base64.
3. **Length check**: If `len`/`minLen`/`maxLen` specified, check the size of the *decoded* byte array.
4. **UrlSafe check**: If `urlSafe: F` (default), reject `-` and `_` characters.

## Implementation Notes

* **Parsing**: The tokenizer recognizes `b"..."` literals and validates them as Base64.
* **Storage**: Internally, these should be stored as binary data types appropriate for the host language.
* **Serialization**: When converting back to IO format, the serializer should encode the binary data as a Base64 string prefixed with `b`.
