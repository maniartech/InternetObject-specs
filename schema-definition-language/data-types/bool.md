---
status: candidate
description: The bool type — true/false values.
---

# Bool

The **`bool`** type validates a boolean value. In data it is written compactly as `T`/`F` or
verbosely as `true`/`false`.

> For the boolean *value* syntax, see [Booleans](../../the-structure/values/booleans.md).

## TypeDef

A `bool` MemberDef accepts only the options below. Any other key is invalid.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `bool`. First positional value. |
| `default` | bool | Value used when the member is omitted. Second positional value. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix on the key. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix on the key. |

## Examples

```ruby
active: bool
---
~ T        # ✓ true
~ false    # ✓
~ yes      # ✗ expected-boolean
```

Optional with a default:

```ruby
verified?: { bool, T }    # optional; defaults to true when omitted
---
~ {}        # ✓ verified resolves to T
~ F         # ✓ verified is F
```

Nullable:

```ruby
flag*: bool               # nullable (value may be N)
---
~ N         # ✓ null
~ T         # ✓
```

## Optional, nullable & defaults

| Input | Result |
| ----- | ------ |
| `T`/`true`/`F`/`false` | the boolean |
| any other token | `expected-boolean` error |
| `N`, key nullable (`*`) | `null` |
| `N`, not nullable | `forbidden-null` error |
| omitted, `default` set | the default |
| omitted, optional (`?`), no default | absent |
| omitted, required | `missing-value` error |

## See Also

* [Booleans (value syntax)](../../the-structure/values/booleans.md)
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
