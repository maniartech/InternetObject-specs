---
status: candidate
description: Changes to the Internet Object specification.
---

# Version History

This page records notable changes to the **specification**. Implementations
(e.g. `io-js2`) version independently and declare the spec version they conform to.

## 1.0 Draft (in progress)

The first complete specification of Internet Object. Highlights:

- Document model: header + data, multiple named sections.
- Values: open/regular/raw strings; `number` family with hex/octal/binary/scientific
  notation; `bigint` and `decimal`; `date`/`time`/`datetime`; `binary`; booleans and null.
- Schema language: SchemaDef (object shapes) and MemberDef (typed, constrained fields), each
  built-in type governed by a fixed TypeDef.
- Definitions: metadata, value variables (`@`), and references (`$`), including the `$schema`
  default and reusable schema/type refs.
- Collections and streaming of records.
- Open and dynamic schemas via `*`; union types via `anyOf`.
- A two-class error model (syntax and validation) with boundary-bounded recovery and error
  accumulation.
- Conformance requirements and a formal EBNF grammar.

> The specification is a work in progress during the 1.0 Draft period; sections may change as
> the format and its reference implementation converge.

## See Also

- [Conformance Requirements](../conformance/requirements.md) · [Roadmap](../roadmap.md)
