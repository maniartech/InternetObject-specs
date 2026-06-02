# Spec ↔ Implementation Reconciliation Log (D0)

Working doc (unpublished). Tracks every spec ↔ `io-js2` mismatch with a proposed
resolution. **Resolution flags:** `[code-as-truth]` = change spec to match code ·
`[spec-as-truth]` = keep spec, flag code as bug · `[needs decision]` = author chooses.

Status: **DRAFT — awaiting author sign-off on flagged decisions before spec pages change.**
Evidence cites `io-js2/src/...` (reference implementation) read directly.

---

## A. Type system

### A1. `byte` is documented but does not exist in code — DECIDED: add `byte ≡ uint8`
**Runtime-verified:** `{ b: byte }` → `IOSyntaxError: The type 'byte' is not supported.`
- Spec: `schema-definition-language/data-types/number/derived-types/byte.md`, and
  `data-types/README.md` / `derived-types/README.md` use `byte`.
- Code: `common-number.ts:9` registers `uint8`; **no `byte`**.
- Options: (a) add `byte` as an alias for `uint8` in code `[spec-as-truth]`; or
  (b) replace `byte` with `uint8` in the spec `[code-as-truth]`.
- **Recommendation:** (a) keep `byte` as a friendly alias for `uint8` (common, readable),
  document both. Needs a 1-line code change in `io-js2`.

### A2. Numeric types missing from spec — `[code-as-truth]`
- Code functional numeric types (verified `common-number.ts:9` + `number.ts:160-183`):
  `number, int, uint, float, int8, uint8, int16, uint16, int32, uint32, bigint, decimal`.
- Spec documents only `int, int16, int32, byte`.
- **Action:** document the full functional set (with ranges) in the schema type reference.

> ⚠️ Cross-impl note: playground sample `io-playground/src/sample-data/types/numbers.ts`
> *uses* `uint64`, `float64`, `float32` in schemas — implying the playground's impl (likely
> `io-js`, not `io-js2`) supports them. Reserved decision below follows **io-js2** (our
> reference). Flag: confirm which impl is canonical for these before final publish.

### A3. Reserved-but-non-functional numeric types — DECIDED: mark reserved
- `uint64, int64, float32, float64` appear in `NUMBER_TYPES` but `getTypeBounds`
  **throws `unsupportedNumberType`** (`number.ts:176-180`). They do not work today.
- **Decision (author):** mark them **"reserved (not yet supported)"** in the spec; revisit
  later. Do not present as usable.

### A4. `bigint` / `decimal` documented as value literals but absent from schema types — `[code-as-truth]`
- Spec: present under `the-structure/values/number/` (literals) but **not** in
  `schema-definition-language/data-types/`.
- Code: both are registered, validatable schema types with rich constraints
  (`decimal`: `precision`, `scale`, 4 validation modes, SQL `DECIMAL(p,s)`; both: `min/max/multipleOf`).
- **Action:** add `bigint` and `decimal` to the schema data-types section.

### A5. binary = value literal AND schema type — DECIDED: add binary TypeDef
- **Verified:** binary works as a **value literal** (`b'...'`/`b"..."` → bytes; handled in
  `parser/tokenizer/*`, `ast-parser.ts`) but **no `binary` schema TypeDef is registered**
  (`types/index.ts` registers only Any, Array, Boolean, Number, Object, String, DateTime).
- **Decision (author):** binary is both a value type and a schema type. **Add a `binary`
  TypeDef in `io-js2`** and **define its spec page + TypeDef**. Proposed TypeDef options
  (confirm at impl): `type, default, choices, len, minLen, maxLen, optional, null`
  (byte-length constraints). Terminology: prefer **`binary`** (rename/alias the `base64`
  page → `binary`; base64 is the encoding, binary is the type).

### A6. "six data types" miscount — `[code-as-truth]`
- `schema-definition-language/data-types/README.md:3` says "six data types" then lists ~15.
- **Action:** fix the count and align the list with the registry.

### A7. Integer-ness not enforced for the `int` family — `[spec-as-truth]` (DECIDED: fix code)
- `NumberDef.validateInteger` (`number.ts:113-155`) checks type + bounds + `multipleOf`
  but **does not reject fractional values** → `int`/`int8`/… currently accept `3.14`.
- **Runtime-verified:** `{ n: int }` with `3.14` → `{"n":3.14}` (no error).
- **Decision (author):** integer-ness MUST be enforced during the schema type-validation
  stage. Fix `io-js2` so the `int`/`uint`/`intN`/`uintN` shortcuts reject non-whole numbers.
- **Spec:** define the `int` family normatively as "whole number within range."

### A8. Type model = base types + predefined constrained shortcuts (framing) — agreed
- `email`/`url` = `string` + preset pattern (`string.ts:13-20`); `int/uint/intN/uintN/byte`
  = `number` + preset bounds (+ integer). Implemented as one `StringDef` / one `NumberDef`.
- **Spec approach:** document a small set of base types + a single **closed normative
  registry** of built-in shortcuts (each defined as *base + constraints*). User-defined
  named constraints use header `$`-definitions (document-local). See proposed-toc framing.

---

## B. Schema semantics

### B1. Modifiers framed as "conventions, not core" — `[code-as-truth]` (make normative)
- Spec: `internet-object-schema.md:110,137,317` — `?`, `*`, defaults, choices described as
  "conventions… not the object parser," "interpreted by tooling," "do not change syntax."
- Code: these are **first-class, fully-implemented** schema features
  (`types/string.ts:22-37`, `memberdef.ts`, validators).
- **Action:** rewrite as normative MUST-level behavior.

### B2. Default-value syntax — DECIDED: 2nd positional value (or keyed `default:`)
- **Decision (author):** the default is the **2nd positional value** in a MemberDef
  (TypeDef position order: 1=type, 2=default, 3=choices). E.g.
  `name?: { string, anonymous }` → default `"anonymous"`. Equivalent keyed form:
  `{ string, default: anonymous }`. **There is no `key: type = value` (`=`) syntax.**
- Matches code/TypeDef positional model (`number.ts`/`string.ts` schemas; examples in
  `data-types/README.md`, `memberdef.md`). Document positional defaults + keyed `default:`.

---

## E. Refs (`$`-definitions): type-ref vs schema-ref

### E1. Top-level `$`-defs compile as object schemas only — DECIDED: make type-refs first-class
- A `$`-definition is a **ref**. Two intended forms:
  - **schema-ref**: object shape, e.g. `~ $address: { street: string, city: string }`.
  - **type-ref**: a reusable constrained type (= one MemberDef = base type + constraints),
    e.g. `~ $percent: { number, min: 0, max: 100 }`, `~ $shortText: { string, maxLen: 40 }`.
- **Current behavior (code):** `compileObject` → `parseObjectDef` (`compile-object.ts:44,242`)
  always treats a `$`-def body as an **object shape**. The MemberDef/type detection in
  `parseObjectOrTypeDef` (`compile-object.ts:48-129`) runs only for **nested** members.
- **Runtime-verified:** `~ $percent: { number, min: 0, max: 100 }` … `score: $percent` →
  `IOSyntaxError: Found '0' but expecting a data type definition` (it reads `min: 0` as a
  member whose *type* is `0`). So type-refs **do not compile** today. Schema-refs
  (`$address`) work correctly (verified).
- **Decision (author):** type-refs MUST be first-class. **Fix `io-js2`** so `compileObject`
  runs the same first-keyless-token type detection as `parseObjectOrTypeDef`: if a `$`-def
  body is `{ <registered-type-or-$ref>, ...constraints }`, compile it as a **MemberDef**
  (reusable type), else as a **Schema** (object shape). Usable anywhere a type is expected
  (`score: $percent`, `tags: [$shortText]`).
- **Spec:** define refs with two forms (type-ref / schema-ref). Frame built-in shortcuts
  (`uint8`, `email`) and user `$` type-refs as the same concept at different scopes
  (universal vs document-local). See [[A8]].

## F. MemberDef / TypeDef page mismatches (found in memberdef.md, typedef.md)

### F1. Array element-type keyword is inconsistent across spec; code uses `of` — `[code-as-truth]`
- Three different names appear: `memberdef.md:90` uses **`items`**; `array.md:8,39,131,159`
  uses **`schema`**; code's array TypeDef uses **`of`** (`array.ts:18`). Only `of` is
  recognized (plus the `[type]` bracket shorthand, which is the primary ergonomic form).
- **Action:** unify all array docs to the **`[type]` shorthand** + keyed **`of:`** form;
  remove `items`/`schema` from array MemberDef docs.

### F2. `divisibleBy` vs `multipleOf` — `[code-as-truth]`
- `typedef.md:36,45` lists both `multipleOf?` and `divisibleBy?`. Code implements only
  **`multipleOf`** (`number.ts:144`). Drop `divisibleBy` (or add as alias — decision).

### F3. `required: [...]` array — `[code-as-truth]`
- `memberdef.md:89`: `{object, schema: {...}, required: ["author"]}`. Code has **no
  `required` array**; requiredness is per-member via `optional` (and `?`). Remove/replace.

### F4. TypeDef `number` example lists `byte` — tied to A1
- `typedef.md:30` uses `byte` in the number type choices; consistent once A1 adds `byte`.

### F5. Terminology: "Object Schema" vs "SchemaDef" — `[needs decision]`
- Spec uses "Object Schema"; author refers to "SchemaDef." Consider standardizing on the
  trio **TypeDef / MemberDef / SchemaDef** for naming symmetry.

## G. Authoritative TypeDefs (from code) — each TypeDef IS a `Schema` (`XxxDef.schema`)

The reference impl defines each type's TypeDef as a `Schema` object. These are the
**source of truth** for valid MemberDef options per type. The spec's per-type TypeDef tables
should match these (and ideally be generated/verified from them = drift-proof).

| Type (`*Def.schema`) | Options (keys) |
|---|---|
| `bool` (boolean.ts:12) | type, default, optional, null |
| `any` (any.ts:16) | type, default, choices, **anyOf**, **isSchema**, optional, null |
| `string` / email / url (string.ts:22) | type, default, choices, pattern, **flags**, len, **minLen**, maxLen, **format**(auto/regular/raw), **escapeLines**, **encloser**, optional, null |
| `number` (number.ts:15) | type, default, choices, min, max, multipleOf, **format**(decimal/hex/octal/binary/scientific), optional, null |
| `bigint` (bigint.ts:11) | type, default, choices, min, max, multipleOf, format(decimal/hex/octal/binary), optional, null |
| `decimal` (decimal.ts:11) | type, default, choices, **precision**, **scale**, min, max, multipleOf, optional, null |
| `datetime`/date/time (datetime.ts:15) | type, default, choices, min, max, optional, null |
| `array` (array.ts:14) | type, default, **of**, len, minLen, maxLen  — ⚠️ no `optional`/`null` |
| `object` (object.ts:17) | type, default, schema, optional, null |

> **DECIDED (author):** For now, **code is the source of truth** for each type's allowed
> options — transcribe the spec's per-type TypeDef tables from `XxxDef.schema` as-is.
> **Later**, once the spec stabilizes, source of truth flips to the spec and code follows.
> **No automatic drift-check for now** (revisit at the handover).

### G1. Documented TypeDefs are drifted/incomplete vs code — `[code-as-truth]`
- **number** (`typedef.md:30-39`): missing `format`; has stray `divisibleBy` (see F2).
- **string** (`data-types/README.md:33-41`): missing `flags, minLen, format, escapeLines,
  encloser`.
- **array**: `items` should be `of` (F1).
- **Action:** rewrite each per-type TypeDef table from the code's `*Def.schema`.

### G2. `array` TypeDef lacks `optional`/`null` keys — DECIDED: fix code
- Every other TypeDef lists `optional`/`null`; `array.ts:14` omits them, so `{array, optional: T}`
  / `{array, null: T}` may be rejected as unknown members.
- **Decision (author):** array DOES support `optional` + `null` (they're the most common
  options). **Fix `io-js2`** to add `optional`/`null` to the array TypeDef. Spec `array.md:13-14`
  already documents them (keep).

### G3. Union types live on `any` via `anyOf` — `[code-as-truth]` (document)
- `anyOf` is only in the `any` TypeDef (`any.ts:21`); `any.md` already documents it well
  (`{any, anyOf:[...]}`, accepts memberdefs/types/schemas). Keep/align.

### G4. `any` has `isSchema` flag — DECIDED: hide (internal plumbing)
- `isSchema` (any.ts:22) is internal-only; do NOT document it. `any.md` correctly omits it.

## H. Findings from running examples (verified against io-js2)

### H1. Array `{[type], …constraints}` combined form is INVALID — `[code-as-truth]`
- **Verified:** `{a:{[string], len:3}}` → `IOSyntaxError: "The key must be a string." (1:15)`.
  Working forms: pure shorthand `[string]`, nested `[[int]]`, or keyed
  `{array, of:string, len:3}`. The original `array.md` (and my first draft) used the invalid
  `{[string], len:5}` form throughout.
- **Action:** docs MUST use `[type]` (no extra constraints) OR `{array, of:type, …}`.
  *(Optional later DX: support `{[type], …}` in code — flag, not now.)*

### H2. Explicit `min`/`max` can WIDEN a typed shortcut's range — `[needs decision]` (likely bug)
- **Verified:** `{int8, min:-200}` accepts `-150` (int8 is −128…127). Code uses
  `memberDef.min ?? typeBound`, so a user min overrides (and can widen) the type bound.
- My number page claimed "cannot widen" — **false**. Decision: clamp/forbid widening (fix
  code) or document that explicit bounds override type bounds. Recommend forbid widening.

### H3. `NaN`/`Inf` coerced to `null` under numeric bounds — `[needs decision]` (likely bug)
- **Verified:** `{number, min:0}` with value `NaN` → `{"n":null}`; with `Inf` → `{"n":null}`.
  Special values silently become null instead of validating/erroring. Document or fix.

### H5. Keyed `null:` is silently IGNORED; only the `*` suffix enables null — `[spec-as-truth]` (bug)
- **Verified (number/string/any):** `{type, null:T}` and `{type, null:true}` with value `N`
  → `null-not-allowed`. Only the `*` suffix works: `a*:number` with `N` → `null`. Keyed
  `optional:T` **does** work; `null` is the odd one out.
- **Resolution:** fix code so keyed `null` is honored (parity with `optional` and `*`). Until
  then, docs lead with the `*` suffix + an implementation-status note.

### H6. Value-resolution rules (verified — to document as a small table)
- value present & valid → used; out of range → `invalid-range`.
- value `N`: allowed only if nullable (`*`) → `null`; else `null-not-allowed`.
- value omitted: if `default` → default; else if optional (`?`) → absent; else `value-required`.

### H4. Good news — these behave correctly (use as canonical/invalid examples)
- Element type enforcement: `[int]` with `[1, two, 3]` → validation error `invalid-type`.
- `len` violation → `invalid-length` "must have exactly N items, but has M".
- `choices` violation → `invalid-choice`. Array suffix `a?:`/`a*:` work. Positional default works.

## I. Spec-example verifier (`tools/check-examples.ts`) — first-run findings

Built a harness that extracts ` ```ruby `/` ```io ` blocks (complete docs only) and runs them
through io-js2, using `# ✗ <code>` annotations as assertions. First run on existing pages:
**38 pass / 22 fail / 129 skipped (fragments).** Triage of the 22:
- **Real drift bugs** (fix in Phase 2), e.g. `comments.md` uses `maxLength:5` (invalid; code
  wants `maxLen`); `creating-collection.md` data `Ironman, 20` violates its own `min:28`;
  `data.md` has a mismatched bracket `…NY]`.
- **False-positives from block isolation** — continuation examples reusing `$defs` from an
  earlier block (`schema-not-defined`). Fix by making blocks self-contained or adding
  `<!-- io:test skip -->`.
- **Action:** triage all 22 during Phase 2; add the verifier to CI (see decision pending).

## J. More verified findings (batch: string/bool/datetime/binary)

### J1. `datetime` drops seconds — `[spec-as-truth]` (bug)
- **Verified:** `dt'2024-03-20T14:30:45Z'` → `2024-03-20T14:30:00.000Z` (seconds 45 lost);
  `…:45.123Z` → `…:30:00.123Z` (seconds lost, ms kept). Real parser bug. Fix in io-js2.

### J2. URL/colon values must be quoted — document (expected)
- **Verified:** `u:url` with open `https://x.com` → `not-a-string` (open string breaks on `:`).
  Quoted works: `'https://x.com'`. Docs: quote URLs / values containing `:`.

### J3. Binary literal + schema type both unavailable today — ties to A5
- **Verified:** `b'SGVsbG8='` / `b"SGVsbG8="` → syntax error `unexpected-token`; `binary`
  schema type → `type 'binary' is not supported`. Binary is in-progress (A5). Write the
  binary page as design + "implementation status," and `io:test skip` its examples.

### J4. Verified-good error codes (for invalid examples)
- string: `invalid-min-length`, `invalid-pattern`, `invalid-choice`, `invalid-email`.
- bool: `not-a-bool` (category runtime). datetime ok for date/time/datetime literals.

## K. Rollout status — schema data-type pages (A+ template applied + verified)

**Done & verified (examples pass `tools/check-examples.ts`):** number, array, bool, string,
date-and-time, bigint, decimal, email, url, object (SchemaDef), any. binary written as
design + status (examples `io:test skip`, type/literal in progress per A5). typedef &
memberdef: drift fixed (`divisibleBy`→`format`; `items`→`of`; removed `required:[]`).

**Deferred to Phase 2:**
- string-derived `date`/`time`/`datetime` pages (`…/string/string-derived-types/`) wrongly
  say "derived from String" and use bare literals (`~ 2020-09-17`) instead of `d'…'`/`t'…'`/
  `dt'…'`. They are their own types (DateTimeDef), not string subtypes. Action: move their
  rich format content to the value-level Date/Time page, convert these to pointers, and
  correct examples. (Not string subtypes → also revisit their place under "String Types".)
- 21 remaining verifier failures are all in definitions/collections/structure pages — triage
  in those Phase-2 passes (real drift like `maxLength`→`maxLen`, data violating own schema,
  bracket typo; plus block-isolation false-positives needing `io:test skip`).

## C. Values / syntax (verify against published pages — risk of stale drafts)

### C2 below are flagged from the stale `.notes/temp-wip.md` (raw strings as `@"..."`,
octal `0c`). Current code uses `r'...'`/`r"..."` and `0o`. Audit published pages for any
surviving stale syntax.

### C1. Octal prefix — verify
- Confirm published number docs use `0o` (code) not legacy `0c`/`0C`.

### C2. Raw string delimiter — verify
- Confirm published string docs use `r'...'`/`r"..."` (code) not legacy `@"..."`.

---

## D. Meta

### D1. Version / status — DECIDED: spec & implementations versioned independently
- **Decision (author):** the **spec** has its own version (currently **"1.0 Draft"**);
  **implementations** (io-js2, etc.) carry their **own** versions (e.g. 0.2.x → 1.0.0-beta)
  and declare which spec version they conform to.
- **Action:** keep spec version "1.0 Draft"; add a short note that library versions differ
  and a conformance line ("implements Internet Object 1.0"). No forced version sync.

---

## Decisions — status: ALL RESOLVED ✅

**Code fixes required in `io-js2`:**
- A1 — add `byte` as alias for `uint8`.
- A7 — enforce integer-ness for the `int`/`uint`/`intN`/`uintN` family at validation.
- E1 — make top-level `$` type-refs compile as MemberDefs (apply the MemberDef-vs-SchemaDef rule).
- G2 — add `optional`/`null` to the array TypeDef.
- A5 — add a `binary` schema TypeDef.

**Spec authoring rules (code = source of truth for now; flips to spec later, no auto-check):**
- A2 — document full functional numeric set; A3 — mark `uint64/int64/float32/float64` reserved.
- A4 — add `bigint`/`decimal` to schema types; A5 — add `binary` type page (rename base64→binary).
- A6 — fix "six types" miscount; A8 — base types + closed shortcut registry + `$` type/schema-refs.
- B1 — modifiers (`?`,`*`,default,choices) are normative, first-class.
- B2 — default = 2nd positional value (or keyed `default:`); no `=` syntax.
- F1 — array element type via `[type]` shorthand + `of:` (drop `items`/`schema`).
- F2 — drop `divisibleBy` (use `multipleOf`); F3 — remove `required:[...]`; F5 — adopt "SchemaDef".
- G1 — transcribe per-type TypeDef tables from `XxxDef.schema`; G3 — document unions via `{any, anyOf}`.
- G4 — `isSchema` is internal; do not document.
- D1 — spec version independent of library versions; add conformance line.

**Still to verify during authoring (not blocking):** C1 octal `0o`, C2 raw-string `r'...'`
in published pages (stale-draft check).
