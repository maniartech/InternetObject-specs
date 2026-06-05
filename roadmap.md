---
status: candidate
description: Planned directions for the Internet Object specification and ecosystem.
---

# Roadmap

This page outlines the direction of the Internet Object specification and its surrounding
ecosystem. It is **informative**, not normative: it describes intended work, not guaranteed
features or dates. Items may change as the format and its reference implementation converge
during the 1.0 Draft period.

## Specification

- **Converge the spec and the reference implementation.** Where the specification currently
  describes behavior ahead of the implementation (noted on the affected pages), close the gap
  in one direction or the other and remove the qualifier.
- **Finalize the formal grammar.** Fold the remaining lexical edge cases — precise open-string
  termination, the full escape-sequence set, and date/time sub-formats — into the
  [EBNF grammar](appendices/grammar.md) so it is complete and self-contained.
- **Complete the error catalogue.** Give every malformed literal and structural failure a
  stable, documented [error code](parsing-and-errors/error-model.md), so tooling can branch on
  codes for all failures rather than most.
- **Settle the numeric type set.** Confirm the final list of numeric shortcuts and their
  ranges, and mark any that remain reserved.
- **Finalize streaming.** Specify the framing and collection-merge rules for
  [streaming collections](the-collections/data-streaming.md) once the model stabilizes.

## Conformance

- **Publish a conformance test suite.** A language-independent set of documents and expected
  outcomes (valid data, error codes, positions) that any implementation can run to demonstrate
  conformance with the [requirements](conformance/requirements.md).

## Implementations and tooling

- **Reference implementation to 1.0.** Track the TypeScript/JavaScript implementation to a
  stable 1.0 aligned with the finalized specification.
- **Implementations in more languages.** Support community libraries for additional languages,
  each declaring the specification version it conforms to.
- **Authoring tooling.** Encourage formatters, linters, editor support (syntax highlighting,
  schema-aware completion), and converters to and from JSON, CSV, and YAML.

## See Also

- [Version History](appendices/version-history.md) · [Conformance Requirements](conformance/requirements.md)
- [Acknowledgments](contributors.md) · [FAQs](faqs-1.md)
