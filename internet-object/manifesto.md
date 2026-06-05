---
status: informative
description: A declaration of the convictions behind Internet Object — why it exists and what it refuses to compromise.
---

# The Internet Object Manifesto

Data is the substance of the Internet, and we still move it wastefully.

JSON proved that humans must be able to read their data — and then it stayed wasteful, lossy, and
schemaless by default. The binary formats proved that the wire must be small — and then they made
data unreadable and forked their schemas into a separate toolchain. Both were half-right. We
accepted the choice between them for twenty years. We don't have to anymore.

Internet Object begins from a refusal: **we will not choose between readable and efficient,
between expressive and exact, between human and machine.** A format for the Internet must serve
all of them, at the scale the Internet actually runs.

These are the convictions it is built on.

**1. The wire is not free.** A format used everywhere, constantly, has no right to be wasteful.
Every key repeated on every record is bytes paid for again and again — in storage, in bandwidth,
in energy, in latency. We declare structure once and never repeat it.

**2. Structure is not data.** Keys, types, and constraints belong to the schema. A record carries
only its values. Conflating the two was the inherited mistake; separating them is what makes data
compact, validated, and self-describing all at once.

**3. The model is the contract, not the bytes.** A schema and its data are one truth, validated
one way. Whether that truth is serialized as human-readable text or as a compact binary form, it
means the same thing and validates the same way. The encoding is a choice; the meaning never
changes.

**4. Data must tell the truth.** A `decimal` is exact. A `bigint` is whole. A date is a date, and
binary is binary. No silent coercion, no precision lost in transit. Where other formats shrug,
Internet Object is precise.

**5. Meaning belongs in the format.** Validation is not a second language in a second file. The
shape of data — its types, its constraints — is declared with the data, in the same syntax as the
data, and enforced as a property of the format itself.

**6. The Internet is a stream, not a file.** Data arrives over time, in volume, between parties
who often already agree on its shape. Documents, collections, and streaming are first-class — not
features bolted onto a format that assumed everything fits in memory at once.

**7. Open to all. Locked to none.** Internet Object is an openly specified contract on the
wire, not a library in a language or a product from a vendor. Anyone can implement it; no one can
lock you into it. Data you store today will still be understood long after the tools that wrote it
are gone.

---

Internet Object is a promise: that data can be readable *and* small, expressive *and* validated,
precise *and* fast — bound to no language and no vendor.

Not a better library. **A better default.**

## See Also

- [Abstract](abstract.md) — the technical statement of what Internet Object is
- [The Poetic Principles](the-zen-of-internet-object.md) — the same values in verse
- [Objectives](objectives.md) — the concrete goals the format is designed to meet
- [Why Internet Object?](why-internet-object.md) — how it compares to JSON, CSV, and YAML
