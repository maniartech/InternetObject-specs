/**
 * Spec example verifier
 * ---------------------
 * Extracts Internet Object examples from the spec's Markdown files and runs them
 * through the reference parser, asserting that they behave as documented.
 *
 * Conventions (v1):
 *   - Only fenced blocks tagged ```ruby or ```io are considered.
 *   - A block is TESTED only if it is a complete document (contains a line that
 *     starts with `---`). Illustrative fragments without a `---` are skipped,
 *     UNLESS the block opts into per-line mode (below).
 *   - Expected errors are read from inline annotations:
 *       `# ✗ <error-code>`  → that validation/syntax error MUST occur
 *       `# ✗ <prose>`       → at least one error MUST occur (no specific code)
 *       (no `✗` in the block) → the document MUST parse with zero errors
 *     An assertion is EXACT: a block that names its codes must produce those and
 *     no others. Over-reporting is a failure, not a pass.
 *   - `<!-- io:test per-line -->` before a fence treats every non-empty, non-comment
 *     line as its own independent document, checked against that line's own
 *     annotation. Use it for the common "list of good and bad values" example, where
 *     testing the fence as one document is meaningless (consecutive bare records are
 *     not a legal document, so the block fails for a reason the example never meant).
 *
 * Errors are collected from BOTH `doc.errors` (where every syntax error outside a
 * collection lands) and the loaded object graph (where validation errors land, and
 * where a collection's syntax errors land as JSON-encoded strings). Reading only one
 * of the two is how a malformed document can be reported green.
 *
 * Usage (run with the reference implementation's tsx):
 *   IO_PARSER=/abs/path/io-js2/src/parser/index.ts \
 *   DOCS_ROOT=/abs/path/io-specs \
 *   npx tsx tools/check-examples.ts
 *
 * Exit code is non-zero if any example fails — suitable for CI.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const DOCS_ROOT = resolve(process.env.DOCS_ROOT || process.cwd())

// Resolve the reference parser. Prefer the linked `internet-object` package source
// (devDependency "internet-object": "file:../io-js2"); fall back to a sibling checkout.
function resolveParser(): string {
  const candidates = [
    process.env.IO_PARSER,
    resolve(DOCS_ROOT, 'node_modules', 'internet-object', 'src', 'parser', 'index.ts'),
    resolve(DOCS_ROOT, '..', 'io-js2', 'src', 'parser', 'index.ts'),
  ].filter(Boolean) as string[]
  const found = candidates.find((p) => existsSync(p))
  if (!found) {
    console.error('Could not locate the IO parser. Set IO_PARSER or run `npm install`.')
    process.exit(2)
  }
  return found
}
const PARSER = resolveParser()

const IGNORE = new Set(['.git', '.github', 'node_modules', '.notes', '.claude', '.gitbook'])

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (IGNORE.has(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, acc)
    else if (name.endsWith('.md')) acc.push(p)
  }
  return acc
}

const FENCE = /```(?:ruby|io)\r?\n([\s\S]*?)```/g
// `✗` marks an expected error. A hyphenated token after it is read as the error code
// (all IO error codes are hyphenated, e.g. out-of-range-integer); prose without a hyphen is ignored.
const EXPECT = /✗[ \t]*([a-z][a-z0-9]*(?:-[a-z0-9]+)+)?/g

function collectErrorCodes(value: any, acc = new Set<string>()): Set<string> {
  if (typeof value === 'string') {
    // A collection serializes its syntax-error nodes as JSON *strings*, while validation
    // errors in the same collection come through as real objects. Recover the former.
    if (value.startsWith('{') && value.includes('"__error"')) {
      try {
        collectErrorCodes(JSON.parse(value), acc)
      } catch {
        /* not an error node after all — ordinary text that happens to look like one */
      }
    }
    return acc
  }
  if (value && typeof value === 'object') {
    if ((value as any).__error) {
      const c = (value as any).errorCode
      if (c) acc.add(c)
    }
    for (const k of Object.keys(value)) collectErrorCodes((value as any)[k], acc)
  }
  return acc
}

/** Every code the document reports, from both places the implementation puts them. */
function errorsOf(parse: (t: string) => any, src: string): Set<string> {
  const acc = new Set<string>()
  try {
    const doc: any = parse(src)
    // `doc.errors` is where a syntax error outside a collection lands — and nowhere else.
    for (const e of (doc?.errors ?? []) as any[]) {
      if (e?.errorCode) acc.add(e.errorCode)
    }
    collectErrorCodes(doc?.toObject ? doc.toObject() : doc, acc)
  } catch (e: any) {
    acc.add(e?.errorCode || e?.constructor?.name || 'error')
  }
  return acc
}

/** Read the `✗ <code>` / `✗ <prose>` assertions out of a chunk of example text. */
function assertionsIn(src: string): { expected: Set<string>; invalidMarked: boolean } {
  const expected = new Set<string>()
  let invalidMarked = false
  let em: RegExpExecArray | null
  EXPECT.lastIndex = 0
  while ((em = EXPECT.exec(src))) {
    invalidMarked = true
    if (em[1]) expected.add(em[1])
  }
  return { expected, invalidMarked }
}

/** Compare one document's actual codes against its assertion. */
function judge(
  expected: Set<string>,
  invalidMarked: boolean,
  actual: Set<string>
): { ok: boolean; why: string } {
  if (expected.size > 0) {
    const missing = [...expected].filter((c) => !actual.has(c))
    const extra = [...actual].filter((c) => !expected.has(c))
    if (missing.length)
      return {
        ok: false,
        why: `missing expected error(s): ${missing.join(', ')}; got: ${[...actual].join(', ') || 'none'}`,
      }
    // An assertion names what the example produces. Anything else is a claim the page
    // does not make, and silently tolerating it is how a broken document reads green.
    if (extra.length) return { ok: false, why: `unexpected extra error(s): ${extra.join(', ')}` }
    return { ok: true, why: '' }
  }
  if (invalidMarked) {
    return actual.size > 0
      ? { ok: true, why: '' }
      : { ok: false, why: 'block marked invalid (✗) but parsed clean' }
  }
  return actual.size === 0
    ? { ok: true, why: '' }
    : { ok: false, why: `unexpected error(s): ${[...actual].join(', ')}` }
}

async function main() {
const mod = (await import(pathToFileURL(PARSER).href)) as { default: (t: string) => any }
const parse = mod.default

/** First line of a block, for identifying it in the skipped listing. */
const firstLine = (src: string): string => (src.trim().split(String.fromCharCode(10))[0] ?? '')

let pass = 0
let fail = 0
let skip = 0
const failures: string[] = []
/** Every block that is NOT executed, with where it is and why — see --list-skipped. */
const skipped: Array<{ rel: string; block: number; why: string; head: string }> = []
const LIST_SKIPPED = process.argv.includes('--list-skipped')

for (const file of walk(DOCS_ROOT)) {
  const text = readFileSync(file, 'utf8')
  const rel = relative(DOCS_ROOT, file)
  let m: RegExpExecArray | null
  let block = 0
  FENCE.lastIndex = 0
  while ((m = FENCE.exec(text))) {
    block++
    const src = m[1]
    // Opt-out: an HTML comment immediately before the fence.
    //   <!-- io:test skip -->  (e.g. continuation examples that reuse $defs from another block)
    if (/<!--\s*io:test\s+skip\s*-->\s*$/.test(text.slice(0, m.index))) {
      skip++
      skipped.push({ rel, block, why: 'opted out (io:test skip)', head: firstLine(src) })
      continue
    }
    // Per-line mode: a "list of good and bad values" example, where each line is its
    // own document. Testing such a fence as one document is meaningless — consecutive
    // bare records are not a legal document, so it would fail for a reason the example
    // never meant, or (worse) pass while asserting nothing about the lines themselves.
    if (/<!--\s*io:test\s+per-line\s*-->\s*$/.test(text.slice(0, m.index))) {
      const lines = src.split(/\r?\n/)
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (!line.trim()) continue
        if (/^\s*#/.test(line)) continue // a whole-line comment is prose, not a document
        if (/^\s*---/.test(line)) continue // a bare separator carries no value of its own

        const { expected, invalidMarked } = assertionsIn(line)
        const { ok, why } = judge(expected, invalidMarked, errorsOf(parse, line))
        if (ok) pass++
        else {
          fail++
          failures.push(`FAIL  ${rel}  [block ${block}, line ${i + 1}]  ${line.trim()}
        ${why}`)
        }
      }
      continue
    }

    if (!/^---/m.test(src)) {
      skip++
      skipped.push({ rel, block, why: 'fragment (no --- , so not a document)', head: firstLine(src) })
      continue
    }

    const { expected, invalidMarked } = assertionsIn(src)
    const { ok, why } = judge(expected, invalidMarked, errorsOf(parse, src))

    if (ok) pass++
    else {
      fail++
      failures.push(`FAIL  ${rel}  [block ${block}]  ${why}`)
    }
  }
}

if (LIST_SKIPPED) {
  // A skipped block is an UNVERIFIED CLAIM: it looks as authoritative as the 240 that run, and
  // nothing checks it. Each wants a decision -- make it executable, mark it deliberately
  // illustrative, or delete it.
  console.log('')
  console.log('Skipped blocks -- unverified claims:')
  console.log('')
  let last = ''
  for (const s of skipped) {
    if (s.rel !== last) { console.log('  ' + s.rel); last = s.rel }
    console.log('     [block ' + String(s.block).padStart(2) + '] ' + s.why.padEnd(38) + ' ' + s.head.slice(0, 46))
  }
  const byFile = new Set(skipped.map((s) => s.rel))
  console.log('')
  console.log('  ' + skipped.length + ' skipped across ' + byFile.size + ' files')
}

console.log(`\nSpec examples: ${pass} passed, ${fail} failed, ${skip} skipped (fragments)\n`)
for (const f of failures) console.log(f)

// A ratchet, not a target. Every skipped block is a claim the spec makes and nothing checks, so
// the number may FALL freely and may not rise: a new unverified example has to be a deliberate
// act, with this line edited and a reason in the commit. Run with --list-skipped to see them.
const SKIP_BUDGET = 87
if (skip > SKIP_BUDGET) {
  console.error('Unverified example blocks rose from ' + SKIP_BUDGET + ' to ' + skip + '.')
  console.error("Make it executable (add a '---', or '<!-- io:test per-line -->' for a list of")
  console.error("values), mark it illustrative with '<!-- io:test skip -->', or lower the budget.")
  process.exit(1)
}

process.exit(fail > 0 ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(2)
})
