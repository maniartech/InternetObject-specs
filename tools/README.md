# Spec tooling

## `check-examples.ts` — verify spec examples against the reference parser

Extracts Internet Object examples from the spec's Markdown and runs them through the
reference implementation, asserting each behaves as documented. This keeps every example in
the spec **verified and in good shape**.

### Run

Requires Node 18+. The reference parser is a dev dependency
(`"internet-object": "file:../io-js2"`):

```bash
npm install
npm run check:examples
```

The parser is resolved automatically (linked `internet-object` package source, then a sibling
`../io-js2` checkout). Override with `IO_PARSER=/abs/path/to/parser/index.ts` and the docs
root with `DOCS_ROOT=/abs/path`. Exit code is non-zero if any example fails (CI-friendly).

### How a block is judged

- Only ` ```ruby ` / ` ```io ` fenced blocks are considered.
- A block is **tested only if it is a complete document** (contains a line starting with
  `---`). Illustrative fragments without `---` are skipped automatically.
- Expectations come from the inline annotations the spec already uses:
  - `# ✗ <error-code>` → that error MUST occur (e.g. `# ✗ invalid-range`).
  - `# ✗ <prose>` (no code) → at least one error MUST occur.
  - no `✗` in the block → the document MUST parse with **zero** errors.

### Opt-out

Put this HTML comment immediately before a fence to skip it (renders invisibly in GitBook):

```markdown
<!-- io:test skip -->
```

Use it for **continuation examples** that reuse `$` definitions declared in an earlier block
(the verifier runs each block in isolation), or for intentionally-pseudocode snippets.

### Authoring guidance

- Prefer **self-contained** examples (include the schema/definitions the block needs) so they
  are verified rather than skipped.
- Annotate invalid lines with `# ✗ <error-code>` using the real code from the implementation.
- Run this tool before committing spec changes.

### Known limitations (v1)

- Each block is parsed independently — cross-block `$` references aren't resolved (use
  `io:test skip` or make the block self-contained).
- Coarse assertion: it checks that expected error codes are present, not their exact count or
  position.
