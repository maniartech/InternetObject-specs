---
description: Date and time values in Internet Object
---

# Date and Time

**Date and Time values** in Internet Object are represented using annotated strings that follow ISO 8601-compatible formats. These provide built-in support for temporal data with automatic parsing to native Date objects during deserialization. Internet Object supports three distinct temporal types: dates, times, and combined date-time values.

Date and time values are scalar values that represent temporal data. The content between the quotes must be valid according to their respective format specifications.

## Syntax

```ebnf
dateTimeValue = dateValue | timeValue | dateTimeValue
dateValue     = "d" (singleQuotedDate | doubleQuotedDate)
timeValue     = "t" (singleQuotedTime | doubleQuotedTime)
dateTimeValue = "dt" (singleQuotedDateTime | doubleQuotedDateTime)

singleQuotedDate = "'" dateContent "'"
doubleQuotedDate = '"' dateContent '"'
Date and time values use specific annotation prefixes followed by quoted content:

```ebnf
dateTimeValue = dateValue | timeValue | dateTimeValue
dateValue = "d" (singleQuotedDate | doubleQuotedDate)
timeValue = "t" (singleQuotedTime | doubleQuotedTime)
dateTimeValue = "dt" (singleQuotedDateTime | doubleQuotedDateTime)

singleQuotedDate = "'" dateContent "'"
doubleQuotedDate = '"' dateContent '"'
singleQuotedTime = "'" timeContent "'"
doubleQuotedTime = '"' timeContent '"'
singleQuotedDateTime = "'" dateTimeContent "'"
doubleQuotedDateTime = '"' dateTimeContent '"'

dateContent = yearPart [monthPart [dayPart]]
timeContent = hourPart [minutePart [secondPart [millisecondPart]]]
dateTimeContent = yearPart [monthPart [dayPart]] ["T" hourPart [minutePart [secondPart [millisecondPart]]]] [timeZone]

yearPart = digit4
monthPart = ["-"] (("0" digit1-9) | ("1" ("0" | "1" | "2")))
dayPart = ["-"] (("0" digit1-9) | (("1" | "2") digit0-9) | ("3" ("0" | "1")))
hourPart = [":"] (("0" | "1") digit0-9) | ("2" ("0" | "1" | "2" | "3"))
minutePart = [":"] (("0" | "1" | "2" | "3" | "4" | "5") digit0-9)
secondPart = [":"] (("0" | "1" | "2" | "3" | "4" | "5") digit0-9)
millisecondPart = "." digit3+
timeZone = "Z" | (("+" | "-") hourPart [minutePart])
```

## Structural Characters

The following characters are used to structure date and time values:

| Symbol | Name                 | Unicode   | Description                                 |
|--------|----------------------|-----------|---------------------------------------------|
| `d`    | Date Prefix          | U+0064    | Indicates date-only value                   |
| `t`    | Time Prefix          | U+0074    | Indicates time-only value                   |
| `dt`   | DateTime Prefix      | -         | Indicates combined date-time value          |
| `'`    | Single Quote         | U+0027    | Encloses temporal content                   |
| `"`    | Double Quote         | U+0022    | Encloses temporal content                   |
| `-`    | Hyphen               | U+002D    | Date separator (optional)                   |
| `:`    | Colon                | U+003A    | Time separator (optional)                   |
| `.`    | Period               | U+002E    | Millisecond separator                       |
| `T`    | Letter T             | U+0054    | Date-time separator                         |
| `Z`    | Letter Z             | U+005A    | UTC timezone designator                     |
| `+`    | Plus Sign            | U+002B    | Positive timezone offset                    |
| `-`    | Minus Sign           | U+002D    | Negative timezone offset                    |
| `0-9`  | Digits               | U+0030-U+0039 | Numeric components                   |

## Valid Forms

### Date Values (`d'...'`)

Examples of valid date values:

```ruby
d'2024-03-20'                          # Full date with separators
d'2024-03'                             # Year and month (day defaults to 01)
d'2024'                                # Year only (month and day default to 01)
d'20240320'                            # Full date without separators
d'202403'                              # Year and month without separators
d"2024-12-31"                          # Double quotes supported
```

### Time Values (`t'...'`)

Examples of valid time values:

```ruby
t'14:30:45.123'                        # Full time with milliseconds
t'14:30:45'                            # Hour, minute, second
t'14:30'                               # Hour and minute (second defaults to 00)
t'14'                                  # Hour only (minute and second default to 00)
t'143045123'                           # Without separators
t'143045'                              # Without separators, no milliseconds
t'1430'                                # Without separators, hour and minute
t"09:00:00"                            # Double quotes supported
```

### DateTime Values (`dt'...'`)

Examples of valid datetime values:

```ruby
dt'2024-03-20T14:30:45.123Z'           # Full datetime with timezone
dt'2024-03-20T14:30:45.123'            # Full datetime, no timezone
dt'2024-03-20T14:30:45'                # Without milliseconds
dt'2024-03-20T14:30'                   # Without seconds
dt'2024-03-20T14'                      # Without minutes
dt'2024-03-20'                         # Date only (time defaults to 00:00:00.000)
dt'20240320T143045123Z'                # Without separators
dt'2024-03-20T14:30:45+05:30'          # With timezone offset
dt'2024-03-20T14:30:45-08:00'          # Negative timezone offset
dt"2024-12-31T23:59:59.999Z"           # Double quotes supported
```

## Format Specifications

### Date Format
- **With separators**: `YYYY-MM-DD`
- **Without separators**: `YYYYMMDD`
- **Partial formats**: `YYYY-MM`, `YYYY`, `YYYYMM`
- **Defaults**: Missing month defaults to `01`, missing day defaults to `01`

### Time Format
- **With separators**: `HH:mm:ss.SSS`
- **Without separators**: `HHmmss.SSS`
- **Partial formats**: `HH:mm:ss`, `HH:mm`, `HH`
- **Defaults**: Missing components default to `00`
- **24-hour format**: Hours range from `00` to `23`

### DateTime Format
- **Combined**: Date + `T` + Time + optional timezone
- **Timezone**: `Z` (UTC) or `±HH:mm` or `±HHMM`
- **Partial**: Any valid date format + optional time components
- **Defaults**: Missing time defaults to `00:00:00.000`, missing timezone defaults to `Z`

## Optional Behaviors
- **Whitespace**: Leading and trailing whitespace around quotes are ignored
- **Separators**: Both separated (`2024-03-20`) and non-separated (`20240320`) formats are supported
- **Partial Values**: Missing components are filled with appropriate defaults
- **Timezone**: If no timezone is specified, UTC (`Z`) is assumed for datetime values
- **Validation**: Parser validates format compliance and logical date/time values
- **Quote Style**: Both single and double quotes are supported

## Invalid Forms
Examples of invalid date and time values:

```yaml
d2024-03-20                            # ✗ Missing quotes
d'2024-13-20'                          # ✗ Invalid month (13)
d'2024-02-30'                          # ✗ Invalid date for February
t'25:00:00'                            # ✗ Invalid hour (25)
t'12:60:00'                            # ✗ Invalid minute (60)
dt'2024-03-20 14:30:00'                # ✗ Missing T separator
dt'2024-03-20T14:30:00+25:00'          # ✗ Invalid timezone offset
d'2024-03-20T14:30:00'                 # ✗ Date prefix with time component
t'2024-03-20T14:30:00'                 # ✗ Time prefix with date component
dt'2024-03-20T14:30:00.123456'         # ✗ More than 3 millisecond digits
```

## Parsing Behavior
When processed by an Internet Object parser:
- Date values (`d'...'`) are parsed to Date objects with time set to `00:00:00.000Z`
- Time values (`t'...'`) are parsed to Date objects with date set to `1900-01-01`
- DateTime values (`dt'...'`) are parsed to complete Date objects
- Missing components are filled with appropriate defaults
- Invalid formats result in parsing errors
- The parsed Date object maintains the exact temporal representation

## Preservation of Structure
Internet Object preserves:
- The exact format as written (with or without separators)
- The choice of single or double quotes
- The specific annotation prefix (`d`, `t`, or `dt`)
- The timezone information for datetime values

It does **not** interpret or enforce:
- Calendar-specific constraints beyond basic validity
- Leap year calculations during parsing (handled by Date constructor)
- Business logic constraints (e.g., working hours, holidays)

## Type Conversion
During parsing:
- All temporal values are converted to native date/time objects in the target platform
- Date-only values have time components set to midnight UTC
- Time-only values have date components set to a reference date (typically `1900-01-01`)
- Timezone information is preserved in the resulting date object
- Missing timezone defaults to UTC for datetime values

## Timezone Handling

### Deserialization (Parsing)
When parsing date-time values from Internet Object format:

**DateTime Values (`dt'...'`)**:
- **Explicit UTC (`Z`)**: `dt'2024-03-20T14:30:45.123Z'` → Represents UTC time
- **Explicit Offset**: `dt'2024-03-20T14:30:45.123+05:30'` → Represents time with specific timezone offset, Indian Standard Time (IST) in this case
- **No Timezone**: `dt'2024-03-20T14:30:45.123'` → Treated as UTC (default behavior)

**Date Values (`d'...'`)**:
- Always treated as UTC at midnight: `d'2024-03-20'` → `2024-03-20T00:00:00.000Z`
- No timezone information is preserved or needed for date-only values

**Time Values (`t'...'`)**:
- No timezone information is applicable for time-only values, will always be treated as UTC.

### Serialization (Stringification)
When converting native date/time objects back to Internet Object format:

**Date Objects to DateTime (`dt'...'`)**:
- UTC dates: Serialized with `Z` suffix → `dt'2024-03-20T14:30:45.123Z'`
- Dates with timezone info: Serialized with appropriate offset → `dt'2024-03-20T14:30:45.123+05:30'`
- Local dates: Should be converted to UTC and serialized with `Z` suffix

**Date Objects to Date (`d'...'`)**:
- Time components are omitted, timezone is not included → `d'2024-03-20'`
- Always represents the date portion regardless of original timezone

**Date Objects to Time (`t'...'`)**:
- Date components are omitted, timezone is not included → `t'14:30:45.123'`
- Represents the time portion regardless of original timezone

### Timezone Behavior Rules

1. **Default Timezone**: When no timezone is specified in datetime values, UTC is assumed
2. **Timezone Preservation**: Explicit timezone information in datetime values is preserved during round-trip operations
3. **Offset Interpretation**: Timezone offsets are interpreted according to ISO 8601 standards
4. **Range Validation**: Timezone offsets must be within valid ranges (`-12:00` to `+14:00`)
5. **Format Support**: Both `±HH:mm` and `±HHMM` offset formats are supported during parsing
6. **Serialization Consistency**: Serialization should use the `±HH:mm` format for timezone offsets

### Examples

**Parsing Examples**:
```ruby
dt'2024-03-20T14:30:45Z'           # → UTC time: 2024-03-20T14:30:45.000Z
dt'2024-03-20T14:30:45+05:30'      # → UTC equivalent: 2024-03-20T09:00:45.000Z
dt'2024-03-20T14:30:45-08:00'      # → UTC equivalent: 2024-03-20T22:30:45.000Z
dt'2024-03-20T14:30:45'            # → UTC time: 2024-03-20T14:30:45.000Z (default)
d'2024-03-20'                      # → Date: 2024-03-20 (time irrelevant)
t'14:30:45'                        # → Time: 14:30:45.000 (date irrelevant)
```

**Serialization Examples**:
```ruby
# UTC time: 2024-03-20T14:30:45.000Z
→ dt'2024-03-20T14:30:45.000Z'     # DateTime format
→ d'2024-03-20'                    # Date format
→ t'14:30:45'                      # Time format

# Time with offset: 2024-03-20T14:30:45.000+05:30
→ dt'2024-03-20T14:30:45.000+05:30' # DateTime format with offset
→ d'2024-03-20'                     # Date format (timezone ignored)
→ t'14:30:45'                       # Time format (timezone ignored)
```

## See Also
- [String Values Overview](./README.md)
- [Base64 Byte String](./base64.md)
- [Raw String](./raw-strings.md)
- [Regular String](./regular-strings.md)
