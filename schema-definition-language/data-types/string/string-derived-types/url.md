---
description: The url type — a string validated as a URL.
---

# URL

`url` is a [`string`](../README.md) shortcut whose value MUST be a valid URL. It shares the
string [MemberDef](../../../memberdef.md) and adds URL-format validation.

> **Quote URL values.** A URL contains `:` and `/`, which end an unquoted (open) string, so
> URLs must be written as quoted strings.

```ruby
website: url
---
~ 'https://example.com'         # ✓
~ "https://example.com/p?q=1"   # ✓
~ 'not a url'                    # ✗ invalid-url
```

Restrict to a fixed set with `choices`:

```ruby
homepage: { url, choices: ['https://a.com', 'https://b.com'] }
---
~ 'https://a.com'    # ✓
```

## See Also

* [String Types](../README.md) · [Email](email.md)
* [MemberDef](../../../memberdef.md)
