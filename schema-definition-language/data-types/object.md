---
description: The object type — structured key/value data described by a SchemaDef.
---

# Object (SchemaDef)

The **`object`** type validates structured key/value data. Like an array, it is a
**container**: you declare its **shape** — the set of fields and their types. That shape is
called a **SchemaDef**.

> For the object *value* syntax (`{ … }`), see
> [Objects](../../the-structure/values/object.md).

## Declaring the shape (SchemaDef)

```ruby
addr: { street: string, city: string }   # inline SchemaDef
meta: {}                                  # any object (no fixed shape)
meta: object                              # same as {}
home: $address                            # a referenced SchemaDef
```

A field may itself be any type, nested object, array, or [reference](../../the-definitions/schema-references.md).

```ruby
name: string, location: { x: int, y: int }
---
~ John, { 1, 2 }            # ✓ location = { x: 1, y: 2 }
~ John, { 1, two }          # ✗ invalid-type (y is not an int)
```

> In a record with several fields, write nested objects in the open positional form
> (`~ John, { 1, 2 }`). A record written wholly as `{ … }` maps its values to the *record's*
> fields, not to one field's object.

## TypeDef

An `object` MemberDef accepts only the options below.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `object`. |
| `default` | object | Value used when the member is omitted. |
| `schema` | SchemaDef | The object's shape. Usually written inline (`{ … }`) instead. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

## Nesting

Objects nest to any depth:

```ruby
~ $address: { street: string, city: string }
~ $schema: { name: string, home: $address }
---
~ John, { Main St, NYC }     # ✓
```

## Open and dynamic objects

An empty SchemaDef (`{}` or `object`) accepts any object. To allow **extra** fields beyond
those declared, add `*` to the shape — see [Open & Dynamic Schemas](../dynamic-schema.md):

```ruby
~ $schema: { name: string, * }
---
~ John, extra1, extra2       # ✓ extra fields accepted
```

## Optional, nullable & defaults

```ruby
~ $address: { street: string, city: string }
~ $schema: { name: string, home?*: $address }
---
~ John, { Main St, NYC }     # ✓
~ Jane, N                    # ✓ home is null
```

| Input | Result |
| ----- | ------ |
| valid object | the object |
| field fails its type | the field's error (e.g. `invalid-type`) |
| `N`, nullable (`*`) | `null` |
| `N`, not nullable | `null-not-allowed` error |
| omitted, optional (`?`) | absent |
| omitted, required | `value-required` error |

## Implementation status (beta)

- Keyed `null:` is not yet honored — use the `*` suffix.

## See Also

* [Objects (value syntax)](../../the-structure/values/object.md)
* [Open & Dynamic Schemas](../dynamic-schema.md) · [Schema References](../../the-definitions/schema-references.md)
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
