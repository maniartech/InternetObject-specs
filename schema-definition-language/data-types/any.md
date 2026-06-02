---
description: The any type — accepts any value, optionally constrained by anyOf or choices.
---

# Any

The **`any`** type accepts a value of **any** type. It is the default when a field is declared
without a type (`name` is the same as `name: any`). You can still narrow it with `choices` or,
for a union of types, `anyOf`.

```ruby
a, b: any, c: { type: any }
---
~ hello, 42, T        # ✓ — anything goes
```

## Declaring alternatives (anyOf)

`anyOf` lets a field accept any one of several types or MemberDefs — Internet Object's union
type.

```ruby
id: { any, anyOf: [string, int] }
---
~ 42        # ✓ matches int
~ abc       # ✓ matches string
```

```ruby
flag: { any, anyOf: [bool, int] }
---
~ hello     # ✗ matches neither
```

Each alternative may be a full MemberDef or a SchemaDef:

```ruby
value: { any, anyOf: [{ int, multipleOf: 5 }, { int, multipleOf: 3 }] }
---
~ 10        # ✓ multiple of 5
~ 9         # ✓ multiple of 3
```

## TypeDef

An `any` MemberDef accepts only the options below.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `any`. |
| `default` | any | Value used when the member is omitted. |
| `choices` | array | Restricts the value to a fixed set (of any type). |
| `anyOf` | array of MemberDef/type | The value must match one of these. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

## choices

```ruby
pick: { any, choices: [1, One, T] }
---
~ One       # ✓
~ Two       # ✗ invalid-choice
```

## Optional, nullable & defaults

```ruby
note?*: any
---
~ {}        # ✓ omitted → absent
~ N         # ✓ null
```

## Implementation status (beta)

- Keyed `null:` is not yet honored — use the `*` suffix.

## See Also

* [Union Types (anyOf)](../union-types.md)
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
