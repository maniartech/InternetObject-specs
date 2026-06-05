---
status: candidate
description: Temporal values — dates, times, and date-times as annotated strings.
---

# Date and Time

Temporal values are written as **annotated strings** in ISO 8601-compatible formats, with a
prefix that selects the kind: `d` for a date, `t` for a time, and `dt` for a combined
date-time. A parser converts them to native date/time objects on deserialization.

The content between the quotes must be valid for its kind.

## Syntax

```ebnf
temporalValue = dateValue | timeValue | dateTimeValue
dateValue     = "d"  ("'" dateContent "'"     | '"' dateContent '"')
timeValue     = "t"  ("'" timeContent "'"     | '"' timeContent '"')
dateTimeValue = "dt" ("'" dateTimeContent "'" | '"' dateTimeContent '"')

dateContent     = yearPart [monthPart [dayPart]]
timeContent     = hourPart [minutePart [secondPart [millisecondPart]]]
dateTimeContent = dateContent ["T" timeContent] [timeZone]

yearPart        = digit digit digit digit
monthPart       = ["-"] ( "0" digit | "1" ("0" | "1" | "2") )
dayPart         = ["-"] ( "0" digit | ("1" | "2") digit | "3" ("0" | "1") )
hourPart        = [":"] ( ("0" | "1") digit | "2" ("0" | "1" | "2" | "3") )
minutePart      = [":"] ("0" | "1" | "2" | "3" | "4" | "5") digit
secondPart      = [":"] ("0" | "1" | "2" | "3" | "4" | "5") digit
millisecondPart = "." digit digit digit
timeZone        = "Z" | ("+" | "-") hourPart [minutePart]
```

## Structural characters

| Symbol | Name | Unicode | Description |
|--------|------|---------|-------------|
| `d` | Date prefix | `U+0064` | Date-only value |
| `t` | Time prefix | `U+0074` | Time-only value |
| `dt` | DateTime prefix | — | Combined date-time value |
| `'` `"` | Quotes | `U+0027` `U+0022` | Enclose the temporal content |
| `-` | Hyphen | `U+002D` | Date separator (optional); also a negative offset |
| `:` | Colon | `U+003A` | Time separator (optional) |
| `.` | Period | `U+002E` | Millisecond separator |
| `T` | Letter T | `U+0054` | Separates the date and time |
| `Z` | Letter Z | `U+005A` | UTC designator |
| `+` | Plus | `U+002B` | Positive timezone offset |

## Valid forms

### Dates — `d'…'`

```ruby
d'2024-03-20'            # full date
d'2024-03'              # year and month (day defaults to 01)
d'2024'                # year only (month and day default to 01)
d'20240320'            # without separators
d"2024-12-31"          # double quotes
```

### Times — `t'…'`

```ruby
t'14:30:45.123'         # with milliseconds
t'14:30:45'             # hour, minute, second
t'14:30'                # hour and minute (second defaults to 00)
t'14'                   # hour only
t'143045'               # without separators
```

### Date-times — `dt'…'`

```ruby
dt'2024-03-20T14:30:45.123Z'   # full, UTC
dt'2024-03-20T14:30Z'          # without seconds
dt'2024-03-20T14:30:45+05:30'  # with a timezone offset
dt'2024-03-20'                 # date only (time defaults to 00:00:00.000)
dt"2024-12-31T23:59:59.999Z"   # double quotes
```

### A combined example

```ruby
---
d'2024-03-20', t'14:30:45.123', dt'2024-03-20T14:30Z'
```

## Format specifications

| Kind | With separators | Without separators | Partial forms | Defaults |
|------|-----------------|--------------------|---------------|----------|
| Date | `YYYY-MM-DD` | `YYYYMMDD` | `YYYY-MM`, `YYYY` | missing month/day → `01` |
| Time | `HH:mm:ss.SSS` | `HHmmss.SSS` | `HH:mm:ss`, `HH:mm`, `HH` | missing parts → `00` |
| DateTime | date `T` time `[zone]` | — | any date form + optional time | missing time → `00:00:00.000`; missing zone → UTC |

Hours use the 24-hour clock (`00`–`23`). A date-only value is treated as UTC midnight; a
time-only value uses a reference date and is treated as UTC.

## Invalid forms

Out-of-range or malformed temporals produce the stable error code `invalid-datetime`:

```ruby
---
d'2024-13-20'           # ✗ invalid-datetime
```

```ruby
t'25:00:00'             # ✗ invalid-datetime (hour out of range)
t'12:60:00'             # ✗ invalid-datetime (minute out of range)
dt'2024-03-20 14:30:00' # ✗ invalid-datetime (missing the T separator)
dt'2024-03-20T14:30+25:00'  # ✗ invalid-datetime (timezone offset out of range)
```

## Timezone handling

- **Explicit UTC** — `dt'2024-03-20T14:30:45Z'` is UTC.
- **Explicit offset** — `dt'2024-03-20T14:30:45+05:30'` carries that offset; its UTC
  equivalent is `2024-03-20T09:00:45Z`.
- **No timezone** — a date-time with no zone is treated as UTC.
- **Valid offset range** — offsets run from `-12:00` to `+14:00`; both `±HH:mm` and `±HHMM`
  are accepted on input.
- On serialization, an implementation SHOULD emit offsets in the `±HH:mm` form and round-trip
  explicit timezone information unchanged.

## Implementation status (beta)

The reference implementation has known gaps in temporal parsing; a conformant parser SHOULD
behave as specified above, not as the current implementation does:

- **DateTime drops the seconds component:** `dt'2024-03-20T14:30:45Z'` parses to
  `…T14:30:00.000Z` (the `45` is lost; milliseconds are kept). Time-only values are not
  affected — `t'14:30:45'` keeps its seconds.
- **Overflow dates are normalized rather than rejected:** `d'2024-02-30'` becomes
  `2024-03-01` instead of raising `invalid-datetime`.
- **Over-long fractions are truncated:** a millisecond field with more than three digits is
  truncated to three rather than rejected.

## See Also

- [Value Representations](README.md) — all value types
- [Numeric Values](number/README.md) — the numeric forms
- [Date and Time](../../schema-definition-language/data-types/date-and-time.md) — date/time schemas
