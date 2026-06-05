---
status: candidate
description: JSON compatibility in Internet Object.
---

# JSON Compatibility

Internet Object is designed to be friendly to JSON. A large subset of JSON values parses
directly, and most Internet Object data converts cleanly to JSON.

## JSON parses as Internet Object

Quoted-key object syntax and quoted strings, arrays, numbers, booleans, and `null` are valid
Internet Object. A JSON object can be used as a record as-is:

```ruby
---
{"name": "John", "age": 30, "active": true}
```

The idiomatic Internet Object form drops the quotes and repeated keys by moving them into the
schema:

```ruby
name, age, active: bool
---
John, 30, true
```

## Differences

- **Keys** — Internet Object keys may be unquoted; JSON requires quotes. Both are accepted.
- **Booleans / null** — Internet Object also allows the compact forms `T`, `F`, `N`.
- **Comments** — Internet Object allows `#` comments; JSON does not. Comments are dropped when
  converting to JSON.
- **Schema** — Internet Object carries an optional schema/header that JSON has no equivalent
  for; on conversion it becomes external (or is dropped).

## Lossy cases (IO → JSON)

Some Internet Object types have no exact JSON counterpart and convert approximately:

| Internet Object | JSON representation |
| --------------- | ------------------- |
| `decimal` (`1.50m`) | number or string (precision/scale not preserved by JSON numbers) |
| `bigint` (`123n`) | number (may lose precision) or string |
| `datetime` / `date` / `time` | ISO-8601 string |
| `binary` (`b'…'`) | base64 string |
| `NaN`, `Inf`, `-Inf` | not representable in JSON (often `null` or a string) |

For exact round-trips, keep the data in Internet Object form.

## See Also

- [Converting To/From Other Formats](interoperability/conversions.md)
- [Why Internet Object?](internet-object/why-internet-object.md)
