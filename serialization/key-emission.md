---
status: candidate
description: When a member is written as a bare value and when it is written as key -- value.
---

# Key Emission

For every member a writer emits, it makes one decision: write the **value alone**, or write
**`key: value`**. This page defines that decision. It is the single largest source of drift
between implementations, so the rule is stated as a table rather than prose.

## Recoverable and unrecoverable names

A member's name is **recoverable** when a reader can reconstruct it without seeing it in the
data — because a schema in scope declares it at that position. A recoverable name is
redundant on the wire and is omitted.

A name is **unrecoverable** when no schema in scope declares it. It **MUST** be written
inline, or the value cannot be read back.

Two members never carry a name at all:

- a **keyless** (positional) member — it had no name to begin with;
- a member whose key equals its own ordinal index (`"0"` in slot 0) — position already says it.

## The three modes

A writer offers three key-emission modes. **`extras` is the default** and is the only mode
that is lossless in every case.

| Mode | Meaning |
| ---- | ------- |
| `none` | Never write a key. Values only — leanest, and **lossy** when a name is unrecoverable. |
| `extras` *(default)* | Write a key only when the name is unrecoverable. Lossless. |
| `all` | Write a key for every named member. Fully self-describing, larger output. |

## The decision table

| Member | `none` | `extras` *(default)* | `all` |
| ------ | ------ | -------------------- | ----- |
| keyless / positional | bare | bare | bare |
| declared by a schema in scope | bare | bare | `key: value` |
| **not** declared — open-schema extra, or no schema at all | bare *(lossy)* | `key: value` | `key: value` |
| not declared, schema is **closed** | error | error | error |

The last row is a validation failure, not a formatting choice: a closed schema has no place to
put the member, so the writer **MUST** raise `additional-values-not-allowed` rather than emit
something that will not read back.

## Examples

With a schema in scope, declared members are positional; only the mode changes that:

```ruby
# schema: { name: string, age: int }   value: John, 30
none      -> John, 30
extras    -> John, 30
all       -> name: John, age: 30
```

With **no** schema, every name is unrecoverable, so `extras` writes them all:

```ruby
# no schema                             value: { name: John, age: 30 }
none      -> John, 30            # lossy — the names are gone
extras    -> name: John, age: 30
all       -> name: John, age: 30
```

Under an **open** schema, declared members stay positional and extras are named:

```ruby
# schema: { name: string, * }           value: { name: John, city: NYC }
extras    -> John, city: NYC
```

A keyless member is always bare, and an explicit non-index key always survives:

```ruby
# no schema                             value: { Alice, "5": 100 }
none      -> Alice, 100          # lossy — the explicit key "5" is dropped
extras    -> Alice, "5": 100
all       -> Alice, "5": 100
```

> Mode `none` is lossy by design, for endpoints that already agree on every name. A writer
> **SHOULD NOT** use it as a default, and **MUST NOT** use it when any name is unrecoverable
> and the output is intended to round-trip.

### Depth

The mode applies at **every nesting level**: in `all`, a nested member declared by its
parent's shape is also written `key: value`; in `extras`, a nested extra is named just as a
record-level extra is.

```ruby
# schema: { p: { x: int, y: int } }     value: p = { x: 1, y: 2 }
extras    -> {{1, 2}}
all       -> p: {x: 1, y: 2}
```

Objects reached through an array are no exception — each element is keyed by its own shape.

## Ordering

Members are written in **schema order** when a schema is in scope: each declared member in the
order the schema declares it, followed by any extras in the order they appear in the value.
Without a schema, members are written in the order the value holds them.

A declared member that is absent, optional, and has no default **MUST** still hold its
position — see [Record & Document Output](document-output.md#absent-members-hold-their-place).

## See Also

- [Value Formatting](value-formatting.md) — how a key, once emitted, is written and quoted
- [Open & Dynamic Schemas](../schema-definition-language/dynamic-schema.md) — what counts as an extra
- [Objects](../the-structure/values/object.md) — keyed and unkeyed values in the data model
