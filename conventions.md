---
status: candidate
description: How to read this specification — requirement keywords, examples, and error codes.
---

# Conventions

## Requirement keywords

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**,
**SHOULD NOT**, **RECOMMENDED**, **MAY**, and **OPTIONAL** in this document are to be interpreted as
described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) and
[RFC 8174](https://www.rfc-editor.org/rfc/rfc8174), and only when they appear in all capitals.

They apply to **every chapter**, not only to
[Conformance Requirements](conformance/requirements.md). Where a chapter states a rule in ordinary
prose — "a section name must be unique" — the requirement is the same; the capitals mark where the
wording has been made precise, and their absence is not permission.

## Normative and informative

Every page carries a `status` in its front matter:

| `status` | Meaning |
| -------- | ------- |
| `candidate` | **Normative.** An implementation is measured against it. Still open to change before 1.0. |
| `informative` | Explanatory. Rationale, comparisons, history — nothing here constrains an implementation. |

Where the two disagree, the normative page wins. If you find such a disagreement, it is a defect in
this specification, not a choice.

## Examples

Examples are written in Internet Object and marked ` ```ruby `, whose highlighting happens to suit
the format. They are **executable**: a checker runs every complete example against the reference
implementation on each change, so an example that contradicts the text fails the build rather than
sitting quietly on the page.

Two annotations carry meaning inside an example:

| Marker | Means |
| ------ | ----- |
| `# ✗ <error-code>` | this line **is rejected**, with that code |
| `# → <value>` | this line loads to that value |

The cross means an **error**, never "not the form we are discussing". Where a line is legal but not
the construct under discussion, the example says so in words instead — a distinction worth keeping,
because most such lines are perfectly good values of some other kind.

A fenced block without a `---` separator is a **fragment**: it illustrates shape and is not executed.

## Error codes

Every reported error carries a stable **code**. Codes are normative; the messages that accompany
them are not, and may be reworded or translated freely. Tooling **MUST** branch on the code and
**MUST NOT** parse the message.

How codes are named — and the closed vocabulary they draw from — is
[Error Codes](parsing-and-errors/error-codes.md). The codes themselves are catalogued in
[Error Model](parsing-and-errors/error-model.md).

## Terminology

Two pairs of words are easy to confuse, because each names a different axis:

| | |
| - | - |
| **open** / **closed** object | written **without** braces / **with** braces. A question of syntax. |
| **strict** / **extensible** schema | rejects undeclared members / accepts them (`*`). A question of validation. |

All four combinations occur, and a document may hold them at once. See the
[Glossary](appendices/glossary.md).

## See Also

- [Conformance Requirements](conformance/requirements.md)
- [Error Codes](parsing-and-errors/error-codes.md)
- [Glossary](appendices/glossary.md)
