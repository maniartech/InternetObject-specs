---
status: candidate
description: Obligations of the reader and writer roles, plus adapters, transports, backpressure, and conformance.
---

# Readers & Writers

The protocol defines two roles — the **writer** that frames records onto a stream, and the
**reader** that consumes a stream and emits one item per record — together with the obligations
of the **adapters** and **transports** that connect them. These are abstract roles. A concrete
implementation may expose them under any names and any platform idioms, but it MUST honor the
duties below.

## Writer obligations

A writer is responsible for canonical framing. It MUST:

- **Serialize through core.** A writer MUST serialize record values using core's serializer. It
  MUST NOT introduce stream-only formatting for strings, defaults, nulls, arrays, or objects.
- **Emit the header at most once.** The header (if any) is emitted before the first data record,
  and the writer MUST emit the `---` terminator per [Wire Format & Framing](wire-format.md) —
  even for an empty header.
- **Switch schemas only when needed.** A writer SHOULD emit a schema switch only when the
  effective schema actually changes.
- **Never emit invalid control frames.** A writer MUST NOT emit midstream
  definition-mutation control frames in v1, nor unresolved or undefined schema switches.
- **Never emit the legacy headerless form.** A writer always emits the `---` terminator, so it
  never produces the buffer-to-end-of-stream legacy form described in
  [Wire Format & Framing](wire-format.md).
- **Write sequentially.** Writer calls MUST be issued sequentially; the protocol does not define
  concurrent-write framing in v1.

### Raw forwarding

A writer MAY forward pre-framed Internet Object text verbatim — a "raw forward" capability. When
it does, the caller is responsible for correct framing, and the writer's automatic
schema-switch tracking is no longer reliable for subsequent structured writes. After a raw
forward, the next structured write MUST carry an explicit schema selector if the active schema
may have changed.

## Reader obligations and lifecycle

A reader consumes the stream incrementally and emits items in wire order. It MUST:

- **Process incrementally.** A reader MUST process records incrementally and MUST NOT re-parse
  or re-materialize already-emitted records.
- **Stay bounded in memory.** A reader's memory growth MUST be bounded by pending undecoded
  bytes, the current incomplete frame (one record, or the header), and minimal lookahead — not
  by total stream history.
- **Reuse compiled state.** A reader MUST reuse accepted definitions and resolved schema objects
  across records; an unchanged schema context MUST NOT trigger repeated schema compilation.
- **Be single-consumption.** A reader is single-consumption in v1. Consuming it more than once
  has undefined behavior.
- **Be lazy.** A reader MUST advance the source only as the consumer requests the next item.
  This laziness is what provides read-side backpressure for pull-based sources.
- **Release on early termination.** When the consumer stops early, the reader MUST release the
  underlying source (for example, release a stream lock) and discard buffered-but-unemitted
  bytes.
- **Support cancellation.** A reader SHOULD support cooperative cancellation. When cancelled,
  iteration terminates fatally and the source is released; cancellation MUST NOT emit a
  record-error item.

## Adapters and transports

An **adapter** is a transport bridge — it moves bytes between a transport and the reader or
writer. A **transport** is the underlying channel. Their obligations keep the record protocol
intact end to end:

- Adapters are transport bridges **only**. They MUST NOT bypass, replace, or fork core parsing,
  validation, or serialization.
- Adapters MUST preserve record order and MUST NOT invent, merge, or discard logical records.
- Adapters that consume bytes MUST preserve correctness across chunk boundaries (see the
  encoding rules in [Wire Format & Framing](wire-format.md)).
- Adapters MUST NOT downgrade a fatal control-state error into a record-error item.
- A flow-controlled transport's write operation SHOULD resolve only after the transport has
  accepted the frame per that transport's backpressure model, and a writer MUST honor that
  backpressure.

## Performance and backpressure

- A large same-schema stream MUST keep parsing incrementally — without recompiling the schema
  per record and without retaining emitted records.
- **Read-side backpressure** is provided naturally by pull-based sources: a lazy reader only
  advances the source when the consumer asks for the next item.
- **Push-based sources** may lack producer backpressure. An implementation that offers a push
  source MUST document this, and producers MUST apply their own flow control.

## Conformance

An implementation is **conformant** if it satisfies every MUST and MUST NOT in this chapter and
passes the shared, language-neutral conformance corpus that accompanies the protocol.

Implementations SHOULD also verify the [equivalence rule](README.md#the-equivalence-rule)
directly against their own core: streamed output MUST equal non-streamed core output for the
same input and definitions, **including across arbitrary chunk boundaries**. The strongest form
of this test feeds the same input split every possible way — whole, per line, per byte, and at
random boundaries including mid-multibyte and mid-marker — and asserts that every split produces
identical items. This single property catches the overwhelming majority of streaming defects,
because it forces the framing layer to be invisible to the result.

## See Also

- [Wire Format & Framing](wire-format.md) — the framing the writer produces and the reader consumes
- [Stream Items](stream-items.md) — the items a reader emits
- [Streaming Error Model](error-model.md) — recoverable versus fatal disposition for the reader
- [Conformance Requirements](../conformance/requirements.md) — the format's broader conformance duties
