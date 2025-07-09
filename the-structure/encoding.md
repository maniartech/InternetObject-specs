# Encoding

The Internet Object format uses **UTF-8** as the default and mandatory encoding for all text representation. This ensures universal compatibility and reliable interchange of data across different platforms, systems, and programming languages.

## UTF-8 Requirement

UTF-8 encoding is **mandatory** for all Internet Object implementations for the following reasons:

- **Universal Compatibility**: UTF-8 is supported by virtually all modern systems and programming languages
- **ASCII Compatibility**: All ASCII characters (0-127) are represented identically in UTF-8
- **Full Unicode Support**: Can represent all Unicode characters and symbols
- **Byte-Order Independence**: No endianness concerns unlike UTF-16 and UTF-32
- **Self-Synchronizing**: Corruption in one character doesn't affect parsing of subsequent characters

## Alternative Encodings

While UTF-8 is mandatory, implementations may optionally support additional encodings for specific use cases:

| Encoding | Support Level | Notes |
|----------|---------------|-------|
| **UTF-8** | **Mandatory** | Default and required for all implementations |
| UTF-16 | Optional | May be useful for systems with native UTF-16 support |
| UTF-32 | Optional | Fixed-width encoding, larger file sizes |
| ASCII | Optional | Subset compatibility (limited to basic characters) |
| ISO-8859-1 | Optional | Legacy support for Latin-1 character set |

{% hint style="info" %}
If UTF-8 doesn't work for your specific needs, choose an alternative encoding that best fits your situation while maintaining compatibility. You can use external libraries or tools to convert between UTF-8 and your preferred encoding if your implementation doesn't support it directly.

**All parsers and serializers must ensure that UTF-8 is supported**, as it is the only mandatory encoding for Internet Objects.
{% endhint %}

## Unicode Support

Internet Object fully supports the Unicode character set through UTF-8 encoding:

### Character Range
- **Basic Multilingual Plane (BMP)**: U+0000 to U+FFFF
- **Supplementary Planes**: U+10000 to U+10FFFF
- **Private Use Areas**: Supported but implementation-specific
- **Control Characters**: Handled according to Unicode standards

### Unicode Normalization
- **Recommended Form**: NFC (Normalization Form Canonical Composed)
- **Parser Behavior**: Should handle all normalized forms correctly
- **String Comparison**: Implementations should normalize for consistent comparison
- **Storage**: Internal representation may use any normalized form

## Byte Order Mark (BOM)

### BOM Handling
- **UTF-8 BOM**: `EF BB BF` (U+FEFF) at the beginning of files
- **Parser Behavior**: BOM is treated as whitespace and ignored during parsing
- **Recommendation**: BOM is optional and not required for UTF-8
- **Compatibility**: Including BOM won't cause parsing errors

### Example
```ruby
# File with BOM (invisible to parser)
﻿{
  name: "Example with BOM",
  content: "This file starts with UTF-8 BOM"
}
```

## Implementation Guidelines

### For Parser Implementers
1. **UTF-8 Detection**: Automatically detect UTF-8 encoding
2. **BOM Handling**: Skip UTF-8 BOM if present at file start
3. **Error Handling**: Provide clear errors for invalid UTF-8 sequences
4. **Normalization**: Consider Unicode normalization for string operations
5. **Validation**: Validate character sequences according to Unicode standards

### For Generator Implementers
1. **UTF-8 Output**: Always generate valid UTF-8 sequences
2. **BOM Decision**: Consistently include or exclude BOM based on target system
3. **Character Encoding**: Properly encode all Unicode characters
4. **Escape Sequences**: Generate escape sequences for control characters when needed
5. **Validation**: Verify output contains valid UTF-8 before writing

## Character Handling

### Whitespace Characters
Internet Object recognizes these whitespace characters:
- **Space**: U+0020 (ASCII space)
- **Tab**: U+0009 (horizontal tab)
- **Line Feed**: U+000A (LF, \n)
- **Carriage Return**: U+000D (CR, \r)
- **Form Feed**: U+000C (FF, \f)

### Line Endings
All standard line ending conventions are supported:
- **Unix/Linux**: LF (`\n`)
- **Windows**: CRLF (`\r\n`)
- **Classic Mac**: CR (`\r`)
- **Mixed**: Combinations are handled gracefully

### Control Characters
- **Printable Range**: U+0020 to U+007E (ASCII printable)
- **Control Characters**: U+0000 to U+001F, U+007F to U+009F
- **Handling**: Control characters in strings must be properly escaped
- **Null Character**: U+0000 should be avoided in text content

## Best Practices

### File Storage
- **Encoding Declaration**: Specify UTF-8 encoding in file metadata when possible
- **File Extension**: Use `.io` extension to indicate Internet Object format
- **BOM Consistency**: Be consistent about BOM usage within a project
- **Validation**: Validate UTF-8 encoding before processing

### Cross-Platform Compatibility
- **Always UTF-8**: Use UTF-8 for maximum compatibility
- **Line Endings**: Allow any line ending style during parsing
- **Character Validation**: Validate character sequences are legal Unicode
- **Encoding Detection**: Implement robust encoding detection mechanisms
- **Escape Sequences**: Use standard escape sequences for maximum interoperability

### Character Validation
- **Surrogate Pairs**: Properly handle UTF-16 surrogate pairs in escape sequences
- **Private Use**: Define handling of private use area characters
- **Noncharacters**: Decide treatment of Unicode noncharacter code points
- **Overlong Encoding**: Reject overlong UTF-8 sequences

## See Also
- **[Internet Object Structure](./README.md)** - Overall document structure
- **[String Values](./values/string/)** - String representation and escaping
- **[Comments](./comments.md)** - Comment syntax and Unicode support
