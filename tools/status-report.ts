/**
 * Spec maturity status report
 * ---------------------------
 * Single source of truth for feature readiness is the `status:` field in each
 * page's front matter. This tool reads those values and GENERATES the overview
 * page `versioning/feature-status.md` — so the dashboard can never drift from the
 * pages, because it is derived, never hand-edited.
 *
 * It groups pages by their section in `SUMMARY.md`, so the dashboard mirrors the
 * table of contents.
 *
 * Status vocabulary (front matter `status:`):
 *   stable       — part of the frozen contract
 *   candidate    — feature-complete, under review
 *   draft        — still evolving, may change
 *   deprecated   — scheduled for removal
 *   reserved     — not yet specified
 *   informative  — non-normative page (guides, meta, appendices)
 *
 * Usage:
 *   DOCS_ROOT=/abs/path/io-specs npx tsx tools/status-report.ts            # check (CI): every
 *       page must declare a valid status, and feature-status.md must be up to date.
 *   DOCS_ROOT=/abs/path/io-specs npx tsx tools/status-report.ts --write    # inject a default
 *       status into pages that lack one, then (re)generate feature-status.md.
 *
 * Exit code is non-zero in check mode if any page is missing/invalid or the
 * generated page is stale — suitable for CI.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'

const DOCS_ROOT = resolve(process.env.DOCS_ROOT || process.cwd())
const WRITE = process.argv.includes('--write')
const DEFAULT_STATUS = 'candidate'

const STATUSES: Record<string, string> = {
  stable: 'Stable',
  candidate: 'Candidate',
  draft: 'Draft',
  deprecated: 'Deprecated',
  reserved: 'Reserved',
  informative: 'Informative',
}

const SUMMARY = join(DOCS_ROOT, 'SUMMARY.md')
const GENERATED = 'versioning/feature-status.md' // root-relative; this file is generated

type Entry = { section: string; title: string; path: string }

/** Parse SUMMARY.md into ordered (section, title, path) entries for .md pages. */
function parseSummary(): Entry[] {
  const lines = readFileSync(SUMMARY, 'utf8').split(/\r?\n/)
  const entries: Entry[] = []
  let section = ''
  const linkRe = /^\s*[*-]\s+\[([^\]]+)\]\(([^)]+)\)/
  for (const line of lines) {
    const sec = line.match(/^##\s+(.+?)\s*$/)
    if (sec) {
      section = sec[1]
      continue
    }
    const link = line.match(linkRe)
    if (!link || !section) continue
    const title = link[1].trim()
    let path = link[2].trim()
    if (!path.endsWith('.md')) continue
    if (path === 'README.md') continue // the cover page is not a feature
    entries.push({ section, title, path })
  }
  return entries
}

/** Extract the front-matter `status:` of a page, or null if absent/no front matter. */
function readStatus(absPath: string): string | null {
  const text = readFileSync(absPath, 'utf8')
  if (!/^---\r?\n/.test(text)) return null
  const end = text.indexOf('\n---', 4)
  const fm = end === -1 ? text : text.slice(0, end)
  const m = fm.match(/^status:\s*([A-Za-z]+)\s*$/m)
  return m ? m[1].toLowerCase() : null
}

/** Inject `status: <DEFAULT_STATUS>` into a page that lacks one. Returns true if changed. */
function injectStatus(absPath: string): boolean {
  let text = readFileSync(absPath, 'utf8')
  if (/^---\r?\n/.test(text)) {
    const open = text.match(/^---(\r?\n)/)!
    const eol = open[1]
    text = text.replace(/^---\r?\n/, `---${eol}status: ${DEFAULT_STATUS}${eol}`)
  } else {
    text = `---\nstatus: ${DEFAULT_STATUS}\n---\n\n` + text
  }
  writeFileSync(absPath, text)
  return true
}

/** Build the generated feature-status.md content from the live statuses. */
function generate(entries: Entry[], statusOf: (e: Entry) => string): string {
  const counts: Record<string, number> = {}
  for (const e of entries) counts[statusOf(e)] = (counts[statusOf(e)] || 0) + 1
  const order = Object.keys(STATUSES)
  const summary = order
    .filter((s) => counts[s])
    .map((s) => `${counts[s]} ${STATUSES[s]}`)
    .join(' · ')

  const out: string[] = []
  out.push('---')
  out.push('description: Generated overview of every specification page and its maturity status.')
  out.push(`status: ${DEFAULT_STATUS}`)
  out.push('---')
  out.push('')
  out.push('# Feature Status')
  out.push('')
  out.push('> **Generated file — do not edit by hand.** Produced by `tools/status-report.ts` from')
  out.push("> each page's `status:` front matter. To change a page's status, edit that page's")
  out.push('> `status:` field and regenerate with `npm run status:write`.')
  out.push('')
  out.push('**Maturity levels:** `Stable` (frozen contract) · `Candidate` (feature-complete, under')
  out.push('review) · `Draft` (still evolving) · `Deprecated` · `Reserved` · `Informative`')
  out.push('(non-normative). Defined in the [Versioning Policy](README.md).')
  out.push('')
  out.push(`**Totals:** ${summary}.`)
  out.push('')

  let currentSection = ''
  for (const e of entries) {
    if (e.section !== currentSection) {
      if (currentSection !== '') out.push('') // blank line closes the previous table
      currentSection = e.section
      out.push(`## ${currentSection}`)
      out.push('')
      out.push('| Page | Status |')
      out.push('| ---- | ------ |')
    }
    const href = e.path === GENERATED ? 'feature-status.md' : `../${e.path}`
    out.push(`| [${e.title}](${href}) | ${STATUSES[statusOf(e)]} |`)
  }
  out.push('')
  out.push('## See Also')
  out.push('')
  out.push('- [Versioning Policy](README.md) — the maturity levels and rules behind this table')
  out.push('- [Roadmap](../roadmap.md) · [Version History](../appendices/version-history.md)')
  out.push('')
  return out.join('\n')
}

function main() {
  if (!existsSync(SUMMARY)) {
    console.error(`SUMMARY.md not found at ${SUMMARY}`)
    process.exit(2)
  }
  const entries = parseSummary()

  // Resolve each entry's status (the generated page reports its own generator status).
  const problems: string[] = []
  let injected = 0
  const statusCache = new Map<string, string>()

  for (const e of entries) {
    if (e.path === GENERATED) {
      statusCache.set(e.path, DEFAULT_STATUS)
      continue
    }
    const abs = join(DOCS_ROOT, e.path)
    if (!existsSync(abs)) {
      problems.push(`missing file: ${e.path} (listed in SUMMARY)`)
      continue
    }
    let status = readStatus(abs)
    if (!status && WRITE) {
      injectStatus(abs)
      injected++
      status = DEFAULT_STATUS
    }
    if (!status) {
      problems.push(`no status: ${e.path}`)
      continue
    }
    if (!STATUSES[status]) {
      problems.push(`invalid status "${status}": ${e.path}`)
      continue
    }
    statusCache.set(e.path, status)
  }

  const statusOf = (e: Entry) => statusCache.get(e.path) || DEFAULT_STATUS
  const usable = entries.filter((e) => statusCache.has(e.path))
  const content = generate(usable, statusOf)
  const genAbs = join(DOCS_ROOT, GENERATED)

  if (WRITE) {
    writeFileSync(genAbs, content)
    console.log(`status: injected default into ${injected} page(s); wrote ${GENERATED}`)
    if (problems.length) {
      console.log('\nremaining problems:')
      for (const p of problems) console.log('  ' + p)
      process.exit(1)
    }
    process.exit(0)
  }

  // check mode
  let failed = false
  if (problems.length) {
    failed = true
    console.log('Status problems:')
    for (const p of problems) console.log('  ' + p)
  }
  const onDisk = existsSync(genAbs) ? readFileSync(genAbs, 'utf8') : ''
  if (onDisk.replace(/\r\n/g, '\n') !== content) {
    failed = true
    console.log(`\n${GENERATED} is out of date — run \`npm run status:write\` to regenerate.`)
  }

  const counts: Record<string, number> = {}
  for (const e of usable) counts[statusOf(e)] = (counts[statusOf(e)] || 0) + 1
  const summary = Object.keys(STATUSES)
    .filter((s) => counts[s])
    .map((s) => `${counts[s]} ${STATUSES[s]}`)
    .join(', ')
  console.log(`\nStatus: ${usable.length} pages — ${summary}.`)
  process.exit(failed ? 1 : 0)
}

main()
