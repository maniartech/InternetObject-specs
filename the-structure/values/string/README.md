---
status: candidate
description: The three string forms — open, regular, and raw.
---

# Strings

Strings represent sequences of Unicode code points. They carry textual data and preserve
whitespace and formatting within their boundaries.

Internet Object supports three string forms, each with its own syntax and use cases:

```ebnf
stringValue = openString | regularString | rawString
```

| Form | Description | Example |
|------|-------------|---------|
| [Open string](open-strings.md) | Unquoted; the simplest form; ends at a structural character or whitespace. | `John Doe` |
| [Regular string](regular-strings.md) | Quoted with single or double quotes; supports escaping. | `"John Doe"` |
| [Raw string](raw-strings.md) | Prefixed with `r`; quoted; backslashes are literal. | `r'C:\path'` or `r"C:\path"` |

All three forms preserve whitespace and Unicode content as written.

## When to use each form

- **Open string** — simple, unstructured text with no leading or trailing whitespace and no
  structural characters.
- **Regular string** — text that needs structural characters, leading/trailing whitespace, or
  escape sequences.
- **Raw string** — text with many backslashes or quotes (file paths, regular expressions),
  where escaping would be cumbersome.

## See Also

- [String Types](../../../schema-definition-language/data-types/string/README.md) — schemas for strings
- [Numeric Values](../number/README.md) — the numeric forms
- [Value Representations](../README.md) — all value types
