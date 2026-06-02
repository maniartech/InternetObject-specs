---
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
| out of `min`/`max` | `invalid-range` error |
| `N`, nullable (`*`) | `null` |
| `N`, not nullable | `null-not-allowed` error |
| omitted, optional (`?`) | absent |
| omitted, required | `value-required` error |

## Implementation status (beta)

- **`datetime` currently drops the seconds component** on parse
  (`dt'…T14:30:45Z'` is read as `…14:30:00`). Under review.
- Keyed `null:` is not yet honored — use the `*` suffix.

## See Also

* [Date and Time (value syntax)](../../the-structure/values/date-and-time.md)
* [TypeDef](../typedef.md) · [MemberDef](../memberdef.md)
