---
description: Strings in Internet Object
---


# Strings in Internet Object

Strings in Internet Object represent sequences of Unicode codepoints. They are used for textual data and always preserve whitespace and formatting within their boundaries.

Internet Object supports three distinct string types, each with unique syntax and use cases:

```ebnf
stringValue = openString | regularString | rawString
```

| String Type      |  Description                                                                 | Example Syntax         |
|------------------|-----------------------------------------------------------------------------|-----------------------|
| [Open String](./open-strings.md)    | Unquoted, simplest form, ends at structural character or whitespace.         | `John Doe`            |
| [Regular String](./regular-strings.md) | Quoted with double quotes, supports escaping and structural characters.      | `"John Doe"`          |
| [Raw String](./raw-strings.md)      | Prefixed with `r`, quoted with single or double quotes, minimal escaping.    | `r'C:\path'` or `r"C:\path"` |

All string types preserve whitespace and Unicode content as written.

## When to Use Each String Type

- **Open String**: For simple, unstructured text without leading/trailing whitespace or special characters.
- **Regular String**: When you need to include structural characters, whitespace, or require escaping.
- **Raw String**: For text with many backslashes or quotes (e.g., file paths, regex), with minimal escaping and `r` prefix.

## See also

- [Schema for Strings](../../../schema-definition-language/data-types/string/README.md)
- [Number Types Overview](../number/README.md)
- [Values](../values/README.md)
