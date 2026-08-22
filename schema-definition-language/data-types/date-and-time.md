---
status: candidate
description: The datetime, date, and time types.
---

# Date and Time

Internet Object has three temporal types, each with its own literal value:

| Type | Literal | Captures |
| ---- | ------- | -------- |
| `date` | `d'2024-03-20'` | calendar date |
| `time` | `t'14:30:45'` | time of day |
| `datetime` | `dt'2024-03-20T14:30:45Z'` | date + time (ISO 8601) |

> For the literal value syntax in detail, see
> [Date and Time](../../the-structure/values/date-and-time.md).

```ruby
created: datetime, birthday: date, opensAt: time
---
~ dt'2024-03-20T14:30:00Z', d'1990-05-01', t'09:00:00'   # ✓
```

## TypeDef

These types share one TypeDef. A MemberDef accepts only the options below.

| Option | Type | Description |
| ------ | ---- | ----------- |
| `type` | string | `datetime`, `date`, or `time`. First positional value. |
| `default` | datetime | Value used when the member is omitted. |
| `choices` | array | Restricts the value to a fixed set. |
| `min` | datetime | Earliest allowed value (inclusive). |
| `max` | datetime | Latest allowed value (inclusive). |
| `optional` | bool | If `true`, the member may be omitted. Shorthand: `?` suffix. |
| `null` | bool | If `true`, the member may be `null`. Shorthand: `*` suffix. |

There is deliberately **no `format` option**. For the numeric and string types a `format` selects
a spelling for one unchanging value, but a date is not a datetime — the three temporal types are
genuinely different, so the choice lives in the **type name**, which both constrains the value and
selects its literal. See
[Constraints and presentation](../memberdef.md#constraints-and-presentation).

A writer therefore emits the literal matching the declared type: `date` → `d"…"`, `time` →
`t"…"`, `datetime` → `dt"…"`. Where no schema applies, the kind is inferred from the value
instead — see [Temporal kind](../../serialization/value-formatting.md#temporal-kind).

## Constraints

### min / max

```ruby
when: { datetime, min: dt'2024-01-01T00:00:00Z', max: dt'2024-12-31T00:00:00Z' }
---
~ dt'2024-06-01T00:00:00Z'    # ✓
```

## Optional, nullable & defaults

```ruby
deletedAt?*: datetime   # optional + nullable
---
~ {}    # ✓ omitted → absent
~ N     # ✓ null
```

| Input | Result |
| ----- | ------ |
| valid temporal literal | the value |
| below `min` / above `max` | `mismatched-min` / `mismatched-max` error |
| `N`, nullable (`*`) | `null` |
| `N`, not nullable | `forbidden-null` error |
| omitted, optional (`?`) | absent |
| omitted, required | `missing-value` error |

## See Also

* [Date and Time (value syntax)](../../the-structure/values/date-and-time.md)
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
