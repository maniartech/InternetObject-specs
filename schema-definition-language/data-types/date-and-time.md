# Date and Time Types

Internet Object supports three temporal types: `datetime`, `date`, and `time`.

## Syntax

Annotated string literals are used to represent temporal values: `dt` for datetime, `d` for date, and `t` for time.

```internet-object
# Simple
created: datetime
dob: date
alarm: time

# With Constraints (MemberDef)
event: { datetime, min: dt"2023-01-01T00:00:00Z" }
```

## TypeDef Schema

The **TypeDef Schema** defines the structure and validation rules for `datetime`, `date`, and `time` MemberDefs.

```internet-object
type: { string, choices: [datetime, date, time] },
default?: datetime,
choices?: [datetime],
min?: datetime,
max?: datetime,
optional?: bool,
null?: bool
```

## Constraints

### Range Constraints (`min`, `max`)
The `min` and `max` options restrict the temporal range of the value.

```internet-object
# DateTime range
meeting: {
  datetime,
  min: dt"2024-01-01T09:00:00Z",
  max: dt"2024-12-31T17:00:00Z"
}

# Time range (e.g., business hours)
shift: { time, min: t"09:00:00", max: t"17:00:00" }
```

### Choices (`choices`)
The `choices` option restricts the value to a specific set of allowed dates or times.

```internet-object
# Only specific dates allowed
holidays: { date, choices: [d"2024-01-01", d"2024-12-25"] }
```

## Examples

```internet-object
# Schema
created: datetime
dob: { date, min: d"1900-01-01", max: d"2024-12-31" }
---
# Valid Values
~ dt"2023-10-27T10:00:00Z"  # Valid: datetime
~ d"2000-05-15"             # Valid: date within range
```

## Invalid Examples

```internet-object
# Schema
meeting: { datetime, min: dt"2024-01-01T00:00:00Z" }
---
# Invalid Values
~ dt"2023-12-31T23:59:59Z" # Fail: Before min
~ "2024-01-02T00:00:00Z"   # Fail: Missing annotation (interpreted as string)
~ dt"invalid-date"         # Fail: Invalid ISO 8601 format
```

## Validation Behavior

1. **Syntax check**: Value must start with `dt`, `d`, or `t` and be a valid string literal.
2. **Format check**: Verify the string content matches the specific type (`date`, `time`, or `datetime`) and ISO 8601 format.
3. **Range check**: If `min`/`max` specified, compare timestamps.
4. **Choice check**: If `choices` specified, value must be in list.

## Implementation Notes

* **Parsing**: The tokenizer recognizes `dt"..."`, `d"..."`, and `t"..."` literals.
* **ISO 8601**: Implementations should strictly adhere to ISO 8601 standards for parsing the string content.
* **Timezones**: `datetime` values should preserve timezone information if provided, or default to UTC if not specified, depending on the implementation's configuration.
