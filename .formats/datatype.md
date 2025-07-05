# <Data Type Name>

## Overview
Brief description of the data type and its purpose in Internet Object.

Include:
- What this type represents conceptually.
- Whether it's a scalar (like number or string) or structured (like array or object).
- Any defining characteristics or constraints.

---

## Syntax
Describe how this data type is expressed structurally in Internet Object.

Include:
- A short narrative explanation.
- EBNF-style formal grammar for tool developers and validators.
- Optional note: diagrams or visual syntax may be added later.

---

## Structural Characters
Use this section *only if applicable* to the data type.

Include:
- A table listing characters used to structure this type (e.g., brackets, quotes, commas).
- Unicode code points for precision.

Example table format:
| Symbol | Name                 | Unicode   | Description                   |
|--------|----------------------|-----------|-------------------------------|
| `[`    | Open Square Bracket  | `U+005B`  | Begins the structure          |
| `,`    | Comma                | `U+002C`  | Separates values              |

---

## Valid Forms
Show valid usage examples for this type.

Include:
- A variety of examples that illustrate common and edge-case forms.
- Use single-line or multi-line formatting as needed.
- Represent escaped, raw, or literal variants if they exist.

---

## Optional Behaviors
This is a **generic container section** for any of the following, as applicable:

- **Whitespace and Formatting**
  - How whitespace is handled (ignored, significant, disallowed).
  - Examples with varying spacing.

- **Empty Representation**
  - Whether the type supports an empty value (e.g., `[]`, `""`, `N`).
  - How that is written and interpreted.

- **Literal and Alternate Forms**
  - If the type allows synonyms or alternate notations (`T`/`true`, `NaN`, `1e3`).

- **Escaping or Encoding Rules**
  - If the type supports escaping, quote forms, or binary representations.

- **Nesting or Composition**
  - If the type can contain or be contained by other values.

Include only what's applicable to the specific type.

---

## Comments
State whether comments are allowed around or within this type.

Include:
- Legal vs illegal usage examples.
- Rules for placement, interference, or parsing.

---

## Invalid Forms
List examples that violate the syntax rules of this data type.

Include:
- Examples that fail parsing or are explicitly disallowed.
- A corrected version or explanation of why they’re invalid.

---

## Preservation of Structure
Clarify that Internet Object serialization:

- Preserves written form and structure faithfully.
- Does **not** enforce interpretation (order, uniqueness, formatting, etc.).
- Leaves such concerns to **schemas**, **validators**, or **application logic**.

---

## See Also
Reference related types, rules, or supporting features:

- Sibling data types
- Escaping or encoding rules
- Schema constraints
- Value type overview
- Comment or whitespace specifications
