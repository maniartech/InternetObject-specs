---
description: The string type and its email and url shortcuts.
---

# String Types

The **`string`** type validates text. It has two **predefined shortcuts** that are `string`
with a built-in pattern: [Email](string-derived-types/email.md) and
[URL](string-derived-types/url.md).

> `date`, `time`, and `datetime` are **not** string subtypes — they are their own types with
> their own values. See [Date and Time](../date-and-time.md).
>
> For how strings are *written* (open, quoted, raw), see
> [Strings](../../../the-structure/values/string/README.md).

## The string family

| Type | Is |
| ---- | -- |
| `string` | any text |
| `email` | `string` validated against an email pattern |
| `url` | `string` validated against a URL pattern |

```ruby
contact: email, site: url
---
~ a@b.com, 'https://example.com'    # ✓
~ notanemail, 'https://example.com' # ✗ invalid-email
```

> **Quote values containing `:` or spaces** (URLs, times-of-day, "Last, First"). An unquoted
> `https://x.com` is misread because the open string ends at `:`.

## TypeDef

A `string` MemberDef accepts only the options below. Any other key is invalid.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | `string`, `email`, or `url`. First positional value. |
| `default` | string | Value used when the member is omitted. Second positional value. |
| `choices` | array of string | Restricts the value to a fixed set. Third positional value. |
| `pattern` | string | A regular expression the value must match. |
| `flags` | string | Regex flags for `pattern` (e.g. `i`). |
| `len` | int ≥ 0 | Exact length in characters. |
| `minLen` | int ≥ 0 | Minimum length. |
| `maxLen` | int ≥ 0 | Maximum length. |
| `format` | string | Serialization form: `auto` (default), `regular`, `raw`. |
| `encloser` | string | Quote character used when serializing: `"` (default) or `'`. |
| `escapeLines` | bool | Whether to escape line breaks on serialization. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

> **`len` precedence.** When `len` is set, `minLen` and `maxLen` are ignored.

## Constraints

### minLen / maxLen / len

```ruby
name: { string, minLen: 5, maxLen: 20 }
---
~ Ethan              # ✓
~ Alexandra Daddario # ✓
~ Leo                # ✗ invalid-min-length
```

### pattern

A regular expression. Use a [raw string](../../../the-structure/values/string/raw-strings.md)
(`r'…'`) to avoid escaping backslashes.

```ruby
ssn: { string, pattern: r'^[0-9]{3}-[0-9]{2}-[0-9]{4}$' }
---
~ '123-45-6789'   # ✓
~ '12345678'      # ✗ invalid-pattern
```

### choices

```ruby
dept: { string, choices: [cs, mech, civil] }
---
~ cs     # ✓
~ art    # ✗ invalid-choice
```

> Quote choices that look like numbers or contain commas, e.g. `["19.02, 72.85"]`, so they
> are treated as strings.

## Optional, nullable & defaults

```ruby
nickname?*: { string, anonymous }   # optional + nullable, default "anonymous"
---
~ {}      # ✓ → "anonymous" (omitted, default applies)
~ N       # ✓ → null
~ John    # ✓ → "John"
```

| Input | Result |
| ----- | ------ |
| valid text | the string |
| fails a constraint | `invalid-*` error (`invalid-min-length`, `invalid-pattern`, …) |
| `N`, nullable (`*`) | `null` |
| `N`, not nullable | `null-not-allowed` error |
| omitted, `default` set | the default |
| omitted, optional (`?`) | absent |
| omitted, required | `value-required` error |

> **Use the `*` suffix for nullability** — keyed `null:` is not yet honored (see below).

## Implementation status (beta)

- Keyed `optional:` works; keyed `null:` is not yet honored — use the `*` suffix.

## See Also

* [Strings (value syntax)](../../../the-structure/values/string/README.md)
* [Email](string-derived-types/email.md) · [URL](string-derived-types/url.md)
* [Date and Time](../date-and-time.md)
* [TypeDef](../../typedef.md) · [MemberDef](../../memberdef.md)
