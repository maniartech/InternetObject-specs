---
description: >-
  This poem encapsulates the core guiding principles that shape the design and
  objectives of the Internet Object format.
---

# The Poetic Principles of Internet Object

This poem distils the foundational principles of Internet Object into a few memorable verses.
It is an informative companion to the specification: the lines below restate, in artistic form,
the design values explained throughout these pages — small size, readability, the separation of
data and definitions, the independence of records, and a healthy distrust of unvalidated input.

## Poem

Size holds weight, in bytes confined, \
Small prevails, large left behind.

Simplicity shines over complexity's shroud, \
Readability echoes, accurate and loud.

Reusability births productivity's rise, \
Verbosity's burden efficiency defies.

Data, definitions, separate ways, \
Together they clutter, apart they amaze.

Headers and data, distinctions drawn, \
Confusion dissolves, clarity's dawn.

Errors and statuses, data's divide, \
Their entanglement brings chaos inside.

Two lone records, states unswayed, \
No interference, connections unmade.

Trust not the sender, vigilance displayed, \
Expect the unanticipated, foundations laid.

Surprises, enchanting, yet beware, \
Not all of them good, handle with care.

## The principles behind the verses

The verses echo the format's [objectives](objectives.md):

- **Small over large** — compact payloads; keys live in the schema, not in every record.
- **Readability and simplicity** — plain text that is easy to read and to write by hand.
- **Separation of data and definitions** — the header holds schema and metadata; the data
  stays clean below it.
- **Record independence** — records do not depend on one another, so one bad record never
  breaks the rest.
- **Distrust the sender** — validate incoming data and expect the unexpected.

## See Also

- [Objectives](objectives.md) — the design goals stated plainly
- [Abstract](abstract.md) · [Introducing Internet Object](introduction.md)
