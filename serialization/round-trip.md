---
status: candidate
description: What serialization guarantees across a parse-write cycle, and what it does not.
---

# Round-Trip Guarantees

Round-tripping is the property that makes serialization testable: it turns "does this writer
behave correctly?" into a question with a mechanical answer.

## The two invariants

For any document `x` that parses without error, a conformant writer satisfies both:

**1. Value preservation.** Writing a parsed value and parsing the result yields the same value:

```
parse(write(parse(x)))  ==  parse(x)
```

Equality is over the **value model** — types, member names, order, and nesting — not over the
text.

**2. Output validity.** A writer's output always parses, with no errors:

```
parse(write(v))  succeeds
```

The second does not follow from the first, and it is the one that catches most real defects:
output that is *nearly* right — an unquoted key containing a colon, a string that loses its
trailing space, an object missing its enclosure — fails here immediately.

## Idempotence

Writing is a fixed point after the first pass. For a document that already carries a header:

```
write(parse(write(parse(x))))  ==  write(parse(x))
```

The first write normalizes; every later write changes nothing. An implementation whose output
keeps changing across cycles has a defect, even if each individual output re-parses.

## What is preserved

- every member — a writer never drops one, keyed or keyless
- each value's **type**, including bigint, decimal, datetime, and binary
- member **order**, and the positions of absent optional members
- names that a schema cannot recover
- the document's sections, their names, and their schema bindings

## What is deliberately not preserved

Round-tripping is defined over the **value model**, not the source text. These are expected to
change:

| Not preserved | Why |
| ------------- | --- |
| comments | not part of the value model |
| whitespace, indentation, line breaks | insignificant |
| the original quote style of a string | the writer picks the leanest valid form |
| a redundant record enclosure | normalized to the canonical form |
| a name that the schema can recover | omitted by design — that is the point of the format |
| the notation of a number written without a schema | `0xff` and `255` are one value; a schema-less number is written in decimal |
| the temporal literal of a value written without a schema | the kind is inferred from the instant — declare `date` / `time` to fix the spelling |

A consequence worth stating plainly: **text equality is not the test.** Comparing a writer's
output byte-for-byte against its input is expected to fail, and is not a conformance signal.
Compare parsed values.

## Testing a writer

The invariants above are directly executable, which makes them the backbone of a writer's test
suite:

1. For every document in the conformance corpus, assert invariant 1 and invariant 2.
2. Assert idempotence on the second write.
3. Generate documents across the value and schema space and assert the same three properties.

Generated round-trip testing is strongly recommended. Each of the writer defects listed as
known gaps in [Value Formatting](value-formatting.md) is caught by invariant 2 alone.

## See Also

- [Conformance Requirements](../conformance/requirements.md)
- [Value Formatting](value-formatting.md) · [Record & Document Output](document-output.md)
