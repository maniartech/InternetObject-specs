/**
 * Update the README "Last updated" date
 * -------------------------------------
 * Sets the date in the `| Last updated | `YYYY-MM-DD` |` row of README.md to today
 * (UTC), so the published date reflects the latest change without a manual edit.
 * Intended to run in CI on every push to the gitbook branch.
 *
 * Usage:
 *   DOCS_ROOT=/abs/path/io-specs npx tsx tools/update-readme-date.ts
 *   README_DATE=2026-06-05 npx tsx tools/update-readme-date.ts   # override (for testing)
 *
 * Exit codes: 0 = updated or already current; 2 = the row could not be found.
 * Writes the file only when the date actually changes (no empty commits).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const README = resolve(process.env.DOCS_ROOT || process.cwd(), 'README.md')
const today = process.env.README_DATE || new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)

if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error(`Invalid date: ${today}`)
  process.exit(2)
}

const text = readFileSync(README, 'utf8')
const rowRe = /^(\|\s*Last updated\s*\|\s*)`\d{4}-\d{2}-\d{2}`(\s*\|.*)$/m

if (!rowRe.test(text)) {
  console.error('Could not find the "Last updated" row in README.md.')
  process.exit(2)
}

const updated = text.replace(rowRe, `$1\`${today}\`$2`)
if (updated === text) {
  console.log(`README "Last updated" is already ${today}; no change.`)
  process.exit(0)
}

writeFileSync(README, updated)
console.log(`Updated README "Last updated" to ${today}.`)
process.exit(0)
