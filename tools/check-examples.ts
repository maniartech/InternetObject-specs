/**
 * Spec example verifier
 * ---------------------
 * Extracts Internet Object examples from the spec's Markdown files and runs them
 * through the reference parser, asserting that they behave as documented.
 *
 * Conventions (v1):
 *   - Only fenced blocks tagged ```ruby or ```io are considered.
 *   - A block is TESTED only if it is a complete document (contains a line that
 *     starts with `---`). Illustrative fragments without a `---` are skipped.
 *   - Expected errors are read from inline annotations:
 *       `# ✗ <error-code>`  → that validation/syntax error MUST occur
 *       `# ✗ <prose>`       → at least one error MUST occur (no specific code)
 *       (no `✗` in the block) → the document MUST parse with zero errors
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
// (all IO error codes are hyphenated, e.g. invalid-range); prose without a hyphen is ignored.
const EXPECT = /✗[ \t]*([a-z][a-z0-9]*(?:-[a-z0-9]+)+)?/g

function collectErrorCodes(value: any, acc = new Set<string>()): Set<string> {
  if (value && typeof value === 'object') {
    if ((value as any).__error) {
      const c = (value as any).errorCode
      if (c) acc.add(c)
    }
    for (const k of Object.keys(value)) collectErrorCodes((value as any)[k], acc)
  }
  return acc
}

async function main() {
const mod = (await import(pathToFileURL(PARSER).href)) as { default: (t: string) => any }
const parse = mod.default

let pass = 0
let fail = 0
let skip = 0
const failures: string[] = []

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
      continue
    }
    if (!/^---/m.test(src)) {
      skip++
      continue
    }

    const expected = new Set<string>()
    let invalidMarked = false
    let em: RegExpExecArray | null
    EXPECT.lastIndex = 0
    while ((em = EXPECT.exec(src))) {
      invalidMarked = true
      if (em[1]) expected.add(em[1])
    }

    const actual = new Set<string>()
    try {
      const doc: any = parse(src)
      collectErrorCodes(doc.toObject ? doc.toObject() : doc, actual)
    } catch (e: any) {
      actual.add(e?.errorCode || e?.constructor?.name || 'error')
    }

    let ok: boolean
    let why = ''
    if (expected.size > 0) {
      const missing = [...expected].filter((c) => !actual.has(c))
      ok = missing.length === 0
      if (!ok) why = `missing expected error(s): ${missing.join(', ')}; got: ${[...actual].join(', ') || 'none'}`
    } else if (invalidMarked) {
      ok = actual.size > 0
      if (!ok) why = 'block marked invalid (✗) but parsed clean'
    } else {
      ok = actual.size === 0
      if (!ok) why = `unexpected error(s): ${[...actual].join(', ')}`
    }

    if (ok) pass++
    else {
      fail++
      failures.push(`FAIL  ${rel}  [block ${block}]  ${why}`)
    }
  }
}

console.log(`\nSpec examples: ${pass} passed, ${fail} failed, ${skip} skipped (fragments)\n`)
for (const f of failures) console.log(f)
process.exit(fail > 0 ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(2)
})
