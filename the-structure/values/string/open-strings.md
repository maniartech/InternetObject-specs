---
description: Open strings in Internet Object
---

# Open String

An **Open String** in Internet Object is the simplest string format. It is a sequence of Unicode codepoints not enclosed in any quotes. Open strings are ideal for simple, unstructured text that does not begin or end with whitespace and does not require escaping of special or structural characters.

Open strings are scalar values. They preserve all internal whitespace and Unicode content, but cannot start or end with whitespace.

## Syntax
Open strings begin with any non-whitespace codepoint and end at the first whitespace or structural character, or at the end of the document.

```ebnf
openString    = nonWhitespace (codepoint)*
nonWhitespace = any Unicode codepoint except whitespace
codepoint     = any Unicode codepoint except structural characters or document end
```

## Structural Characters
| Symbol | Name                 | Unicode   | Description                                 |
|--------|----------------------|-----------|---------------------------------------------|
| (space, tab, etc.) | Whitespace         | Multiple  | Terminates or invalidates open string start/end |
| `:`    | Colon                | U+003A    | Structural character (terminates string)    |
| `,`    | Comma                | U+002C    | Structural character (terminates string)    |
| `{`    | Open Curly Brace     | U+007B    | Structural character (terminates string)    |
| `}`    | Close Curly Brace    | U+007D    | Structural character (terminates string)    |
| `[`    | Open Square Bracket  | U+005B    | Structural character (terminates string)    |
| `]`    | Close Square Bracket | U+005D    | Structural character (terminates string)    |
| `"`    | Double Quote         | U+0022    | Allowed, does not terminate or need escape  |
| `'`    | Single Quote         | U+0027    | Allowed, does not terminate or need escape  |

## Valid Forms
Examples of valid open strings:

```text
John Doe
Peter D'mello
जॉन डो
Wow Great
😃
```

Multiple open strings in an object:
```text
जॉन डो, Wow Great, 😃
```

Multiline open string (no escaping required):
```text
Lorem ipsum dolor sit amet consetetur sadipscing elitr sed
diam nonumy eirmod.

Tempor invidunt ut labore et dolore magna aliquyam erat
sed diam voluptua
```

## Optional Behaviors
- **Whitespace**: Open strings cannot start or end with whitespace, but preserve all internal whitespace.
- **No Escaping**: No character escaping is supported. Quotes and other characters are allowed as-is.
- **Multiline**: Open strings can span multiple lines if not interrupted by structural characters.

## Comments
Comments are not allowed within open strings, but may appear outside or between values as per Internet Object comment rules.

## Invalid Forms
Examples of invalid open strings:

```text
 John Doe      # ❌ Starts with whitespace (should be 'John Doe')
John Doe       # ❌ Ends with whitespace (should be 'John Doe')
"John Doe"     # ❌ Quoted (should be unquoted for open string)
.John          # ❌ Starts with a dot (if dot is structural in context)
```

## Preservation of Structure
Internet Object preserves:
- All Unicode codepoints and internal whitespace as written
- The unquoted, open form of the string

It does **not** interpret or enforce:
- Escaping or encoding
- Leading/trailing whitespace (disallowed)
- Application-specific constraints

## See Also
- [String Values Overview](./README.md)
- [Regular String](./regular-strings.md)
- [Raw String](./raw-strings.md)
