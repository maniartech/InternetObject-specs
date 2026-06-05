---
status: candidate
description: Converting Internet Object to and from JSON and other formats.
---

# Converting To/From Other Formats

Internet Object interoperates with common data formats. This page summarizes how data maps in
each direction. For the JSON specifics, see [JSON Compatibility](../json-compatibility.md).

## JSON

- **JSON → IO** — direct: a JSON object/array is valid Internet Object data. Optionally lift
  repeated keys into a schema to shrink collections.
- **IO → JSON** — direct for the common types; lossy for `decimal`, `bigint`, `datetime`,
  `binary`, and `NaN`/`Inf` (see [JSON Compatibility](../json-compatibility.md)).

## CSV

- **CSV → IO** — a header row maps to a schema; each data row becomes a collection record:

  ```ruby
  # CSV:  name,age,active
  #       John,30,true
  name: string, age: int, active: bool
  ---
  ~ John, 30, true
  ```

- **IO → CSV** — flat collections export cleanly; nested objects/arrays must be flattened or
  encoded, since CSV has no nesting.

## YAML

YAML and Internet Object both support nesting and comments. Conversion is straightforward for
scalars, maps, and sequences; Internet Object adds schema and validation that YAML lacks, and
its richer scalar types (`decimal`, `bigint`, `datetime`, `binary`) map to YAML scalars.

## General guidance

- Converting **into** Internet Object is a good time to add a schema and tighten types.
- Converting **out** may be lossy for the precise types above — keep the canonical copy in
  Internet Object when exactness matters.

## See Also

- [JSON Compatibility](../json-compatibility.md) · [Why Internet Object?](../internet-object/why-internet-object.md)
