---
status: candidate
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
~ John, { 1, two }          # ✗ expected-integer (y is not an int)
```

> In a record with several fields, write nested objects in the open positional form
> (`~ John, { 1, 2 }`). A record written wholly as `{ … }` maps its values to the *record's*
> fields, not to one field's object.

### Field names

A field name is written bare when it is identifier-like, and quoted otherwise — when it contains
a comma, a colon, a space, or begins with a digit, as names carried over from JSON routinely do:

```ruby
~ $schema: { name: string, "code:en": string, "a,b": number }
---
~ John, hello, 1
```

A quoted name is taken literally, so the `?` and `*` suffixes cannot follow it. *Optional,
nullable & defaults* below shows what a quoted field writes instead. The same literalness makes
`"*"` an ordinary field name rather than the wildcard — see
[Open & Dynamic Schemas](../dynamic-schema.md).

## TypeDef

An `object` MemberDef accepts only the options below.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | The type name `object`. |
| `default` | object | Value used when the member is omitted. |
| `schema` | SchemaDef or `$ref` | The object's shape, inline or referenced. Usually written as a bare `{ … }` or `$ref` instead. |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix on a bare name. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix on a bare name. |

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

## Untyped objects

A member declared as bare `object` (or `{}`) accepts **any** object value — any members, keyed or
positional, at any depth. No structural validation is applied to its contents:

```ruby
~ $schema: { metadata: object }
---
~ {any: thing, nested: {deeply: T}}     # ✓ accepted as-is
```

Because no schema can recover member names for an untyped object, writers serialize its members
**keyed** (`key: value`) — positional emission would be unrecoverable on re-parse.

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
| field fails its type | the field's error (e.g. `expected-integer`) |
| `N`, nullable (`*`) | `null` |
| `N`, not nullable | `forbidden-null` error |
| omitted, optional (`?`) | absent |
| omitted, required | `missing-value` error |

Because the suffixes are part of the bare-name token, a quoted field name states the same two
properties as keyed options — where `schema:` takes the reference that `home?*: $address` wrote
after the colon:

```ruby
~ $address: { street: string, city: string }
~ $schema: { name: string, "home,work": { object, schema: $address, optional: T } }
---
~ John, { Main St, NYC }     # ✓
~ Jane                       # ✓ omitted
```

The two forms are equivalent. [MemberDef](../memberdef.md#optional-nullable-and-default) gives the
rule in full.

## Interaction with record enclosure

An `object`-typed member — especially as a schema's **first** member — is what makes the record
enclosure question visible. For a row written as a single closed object, whether it is read as the
record itself or as a value for member 0 depends on the row's first key:

A key the schema **declares** — the row is the record:

```ruby
~ $schema: { o1: object, o2?: object }
---
{o1: {a: 1}}      # → o1 = { a: 1 }
```

A key it does **not** declare — the whole row is a value:

```ruby
~ $schema: { o1: object, o2?: object }
---
{key: val}        # → o1 = { key: val }
```

Both readings are well-defined, but the intent is implicit. See
[Record enclosure under schema validation](../../the-structure/values/object.md) for the full rule
and the best-practice forms (`{{…}}` or `o1: {…}`) that state it explicitly — writers always emit
the enclosed form.

## See Also

* [Objects (value syntax)](../../the-structure/values/object.md)
* [Open & Dynamic Schemas](../dynamic-schema.md) · [Schema References](../../the-definitions/schema-references.md)
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
