---
description: The binary type — byte data written as base64.
---

# Binary

The **`binary`** type validates a sequence of bytes. In data, binary is written as a base64
literal with a `b` prefix: `b'SGVsbG8='`. (Base64 is the *encoding*; `binary` is the *type*.)

> For the literal value syntax, see [Binary values](../../the-structure/values/binary.md).

## TypeDef

A `binary` MemberDef accepts the options below.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `binary`. First positional value. |
| `default` | binary | Value used when the member is omitted. |
| `choices` | array of binary | Restricts the value to a fixed set. |
| `len` | int ≥ 0 | Exact length in bytes. |
| `minLen` | int ≥ 0 | Minimum length in bytes. |
| `maxLen` | int ≥ 0 | Maximum length in bytes. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

## Example

<!-- io:test skip -->
```ruby
avatar: { binary, maxLen: 65536 }
---
~ b'SGVsbG8='
```

## Implementation status (beta)

> **Binary is under development.** The `binary` schema type is being added to the reference
> implementation (it is not yet registered), and the `b'…'` value literal is not yet accepted
> by the parser. The design above is the agreed target; examples are not yet executable and are
> excluded from the example verifier.

## See Also

* [Binary values](../../the-structure/values/binary.md)
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
