---
status: candidate
description: TypeDef — the fixed option contract that every MemberDef of a type is validated against.
---

# TypeDef

A **TypeDef** is the fixed option contract for a built-in type. It defines exactly which options
a [MemberDef](memberdef.md) of that type may use, the order of its positional values, and the
type of each option. A TypeDef is itself written in Internet Object object syntax, so the same
rules that apply to objects apply to it.

> **TypeDef vs. MemberDef.** A *TypeDef* is the spec-defined contract for a type; a *MemberDef*
> is what a schema author writes for one member. Every MemberDef is validated against the TypeDef
> of its declared type.

## Positional and keyed options

A TypeDef fixes the meaning of each positional value. For every type the order is:

1. **type** — the type name (`number`, `int16`, `string`, …)
2. **default** — the value used when the member is omitted
3. **choices** — the allowed set of values

Any further options are written as keyed entries (`min: 0`, `pattern: …`) in any order after the
positional ones. So all of these are valid `number` MemberDefs:

```ruby
~ $schema: {
    a: { number, 20 },                        # type + default
    b: { int16, 1, [1, 2, 3] },               # type + default + choices
    c: { number, 50, min: 10, max: 99 },      # default + keyed options
    d: { number, 10, [5, 10, 15], min: 5 }    # default + choices + keyed option
}
---
~                       # all omitted → defaults a 20, b 1, c 50, d 10
~ 25, 3, 60, 15         # a 25, b 3, c 60, d 15
```

A TypeDef written out looks like an ordinary object whose members are the options (most of them
optional). Illustratively, the `number` TypeDef is shaped like this:

```ruby
type?       : string,        # a number-family name (see Numeric Types)
default?    : number,
choices?    : [number],
min?        : number,
max?        : number,
multipleOf? : number,
format?     : { string, choices: [decimal, hex, octal, binary, scientific] },
optional?   : { bool, F },
null?       : { bool, F }
```

Each type page lists its own TypeDef in full; that table is the authoritative source of the
options a type accepts.

## Validation against the TypeDef

A MemberDef may use **only** the options its type's TypeDef defines. An unknown option is
rejected with `unknown-member`:

```ruby
age: { number, minimum: 10 }
---
42                       # ✗ unknown-member — number has no option "minimum" (use min)
```

This is what makes options portable: because the contract is fixed, the same MemberDef validates
identically in every conformant implementation.

## TypeDefs are fixed

A schema author cannot change or extend a built-in type's TypeDef — the option set is defined by
this specification. To build a reusable, document-local type (a base type plus preset
constraints), define a **type reference** in the header instead; see
[Schema References](../the-definitions/schema-references.md).

## See Also

* [MemberDef](memberdef.md) — how authors write a member's type and constraints
* [Schema Data Types](data-types/README.md) — every type's TypeDef table
* [Numeric Types](data-types/number/README.md) · [String Types](data-types/string/README.md) — example TypeDefs
