---
status: candidate
description: The streaming error model — error categories, recoverable-versus-fatal disposition, and stream-absolute positions.
---

# Streaming Error Model

Streaming preserves the core error identity of everything semantic and defines its own errors
only for the transport and lifecycle it owns. This page specifies the **categories** an error
can have, the **disposition** that decides whether iteration continues or stops, and the
positioning rules that make a streamed error indistinguishable from the non-streaming one. The
core errors themselves are defined in [Error Model](../parsing-and-errors/error-model.md);
streaming references them and does not restate them.

> **Match on category and code, never on message.** Every error carries a stable category and a
> stable string code. Message text is non-contractual and MAY be localized. Tooling MUST branch
> on the category and code, not on the human-readable message.

## Error categories

Every error carries a **category** and a stable string **code**. The category is one of four
values, and it MUST be derived from the originating error's **class**, not from any
code-grouping (a code may sit in one core grouping yet be raised as a different class — the
class is authoritative):

| Category | Raised by |
| -------- | --------- |
| `syntax` | A tokenization or parsing failure. |
| `validation` | A schema validation failure. |
| `general` | Any other core error. |
| `stream` | A transport or lifecycle failure raised by the streaming layer. |

The `syntax`, `validation`, and `general` categories and their codes are defined by Internet
Object **core**; streaming preserves them unchanged. The `stream` category and its codes are
defined here, because transport and lifecycle are streaming's own domain.

## Disposition: recoverable versus fatal

Disposition — what happens to iteration — is distinct from category — what the error is. The
same category can be recoverable in one place and fatal in another.

### Recoverable record errors

A recoverable error is localized to one logical record. The default and normative behavior is
to emit one **record-error item** and continue to the next record. These carry a core category
(`syntax`, `validation`, or `general`). The rules:

- **Parse failures are boundary-based.** When parsing fails for one record and recovery
  advances to the next `~`, the next `---`, or end of stream, that record produces **one**
  record-error item, using the primary parse error for that boundary.
- **Validation may find several problems, but the item carries one.** Validation runs after a
  successful parse and MAY collect multiple errors for one record. The reader MUST still emit
  exactly **one** record-error item for that record; its public `error` is the **first**
  collected validation error in v1.
- **Core identity is preserved.** The emitted error MUST carry the same category (derived from
  the core error class) and the same code that the non-streaming path produces. Streaming MUST
  NOT remap codes, collapse the category distinction, or invent a stream-local taxonomy for core
  errors.
- **Truncated input is a syntax error.** If the source closes cleanly while a logical record is
  incomplete — a `~` frame began but end of stream arrived before the record could be fully
  parsed — the reader MUST emit one record-error item for the incomplete record, using the core
  parse error for truncated input (category `syntax`).
- **No partial fragments.** The reader MUST NOT emit partial record fragments before or instead
  of an error.
- **Warnings are not errors.** Non-fatal core warnings MUST NOT be promoted to record-error
  items in v1.

### Fatal stream errors

A fatal error terminates iteration. The conditions are invalid control state (an invalid
control frame, invalid header definitions, or an unknown schema switch), a source or transport
failure, cancellation, or a buffer-limit overflow. A fatal error:

- MUST terminate iteration. The platform signals this in its own idiom — an exception, a
  rejected promise, an error result — but iteration does not continue.
- MUST NOT be emitted as a record-error item.
- MAY carry a **core** category (for example, an unknown schema switch is fatal but preserves
  the core `validation` / `schema-not-defined` identity) **or** the `stream` category.

## Streaming fatal codes

The streaming layer defines exactly these fatal codes in v1, all category `stream`:

| Code | Raised when |
| ---- | ----------- |
| `stream-buffer-exceeded` | A single pending frame (one record, or the header) exceeds the implementation's buffer limit. The limit bounds one frame; crossing it means a correct record boundary can no longer be guaranteed. |
| `stream-source-error` | The underlying source or transport fails or errors. |
| `stream-aborted` | Iteration is cancelled cooperatively (for example, via an abort signal). |

These are the only `stream`-category codes in v1. Every other fatal error preserves a **core**
category and code:

- an unknown schema switch → `validation` / `schema-not-defined`;
- invalid header definitions → `syntax`;
- a partial frame at end of stream → `syntax`.

This preserves the governing principle: streaming defines codes only for its own
transport and lifecycle domain; everything semantic stays core's.

## Stream-absolute positions

Error positions — row, column, and offset — MUST be **stream-absolute**: measured from the
start of the stream, identical to what the non-streaming parser reports for the equivalent whole
document. The reader rebases each frame's local positions onto a running stream base across
chunk and frame boundaries. It MUST NOT report record-relative positions.

This is a direct consequence of the [equivalence rule](README.md#the-equivalence-rule): an error
from a streamed record must be indistinguishable — in category, code, and position — from the
same error produced by parsing the whole document at once.

## See Also

- [Error Model](../parsing-and-errors/error-model.md) — the core error categories and codes streaming preserves
- [Error Accumulation](../parsing-and-errors/error-accumulation.md) — why validation can collect several errors per record
- [Stream Items](stream-items.md) — how a recoverable error becomes a record-error item
- [Schema & State](schema-and-state.md) — why an unknown schema switch is fatal, not recoverable
