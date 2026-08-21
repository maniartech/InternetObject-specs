---
status: candidate
description: The grammar of Internet Object in EBNF.
---

# Formal Grammar (EBNF)

This appendix gives the grammar of Internet Object in EBNF. It is the normative reference for
document structure; the prose chapters explain semantics. Lexical rules (whitespace, comments,
literals) are listed at the end.

> Notation: `=` defines a rule, `|` alternation, `[ ]` optional, `{ }` zero-or-more,
> `( )` grouping, `"…"` a literal. Whitespace and comments may appear between tokens unless a
> rule states otherwise.

## Document

```ebnf
document        = [ header "---" ] section { sectionBreak section }
                | value ;                         (* a bare, header-less value/object *)

header          = { definition } ;
section         = [ sectionTag ] ( collection | object ) ;
sectionBreak    = "---" [ sectionTag ] ;
sectionTag      = sectionName [ ":" schemaRef ]    (* e.g.  employee : $employee *)
                | schemaRef ;                      (* e.g.  $employee *)
```

## Header definitions

```ebnf
definition      = "~" key ":" defValue ;
key             = metaKey | variableKey | refKey ;
metaKey         = name ;                            (* metadata *)
variableKey     = "@" name ;                        (* value variable *)
refKey          = "$" name ;                        (* schema/type reference *)
defValue        = value | schema ;
schemaRef       = "$" name ;
```

## Collections and records

```ebnf
collection      = record { record } ;
record          = "~" [ recordBody ] ;             (* "~" alone = empty object {} *)
recordBody      = object | openObject | value ;    (* a bare value is promoted to an object *)
```

## Objects and arrays

```ebnf
object          = "{" [ memberList ] "}" ;
openObject      = memberList ;                      (* unbraced, top-level only *)
memberList      = member { "," member } [ "," ] ;
member          = [ key ":" ] value ;              (* keyed or positional *)

array           = "[" [ valueList ] "]" ;
valueList       = value { "," value } ;
```

## Values

```ebnf
value           = object | array | scalar | variableRef ;
variableRef     = "@" name | "$" name ;
scalar          = string | number | bigint | decimal
                | datetime | binary | boolean | null ;
```

## Schema (MemberDef and SchemaDef)

```ebnf
schema          = schemaDef | memberDef | refKey ;
schemaDef       = "{" memberDefList "}" | memberDefList ;   (* object shape *)
memberDefList   = schemaMember { "," schemaMember } [ "," "*" [ ":" memberDef ] ] ;
                                                    (* the wildcard `*` is BARE; a quoted "*"
                                                       is an ordinary memberName *)
schemaMember    = memberName [ ":" ( type | memberDef | array | schemaRef ) ] ;
memberName      = name [ "?" ] [ "*" ]              (* suffixes belong to the bare-name token *)
                | regularString | rawString ;       (* quoted: literal, no suffixes -- use
                                                       optional: / "null": in the memberDef *)
memberDef       = "{" type { "," option } "}" ;            (* type + constraints *)
option          = positionalValue | ( name ":" value ) ;   (* e.g. min: 0 *)
type            = "string" | "int" | "uint8" | "bool" | "datetime" | "decimal" | … ;
```

## Lexical

```ebnf
string          = openString | regularString | rawString ;
regularString   = '"' { char | escape } '"' | "'" { char | escape } "'" ;
rawString       = "r" ( '"' { rawChar } '"' | "'" { rawChar } "'" ) ;
openString      = unquotedChar { unquotedChar } ;          (* ends at a structural char *)

number          = [ sign ] ( decInt [ frac ] [ exp ]    (* frac/exp: base-10 only *)
                           | frac [ exp ]               (* leading-dot form, e.g. .5 *)
                           | hex | octal | binaryNum ) ;
hex             = ( "0x" | "0X" ) hexDigit { hexDigit } ;
octal           = ( "0o" | "0O" ) octDigit { octDigit } ;
binaryNum       = ( "0b" | "0B" ) ( "0" | "1" ) { "0" | "1" } ;
bigint          = [ sign ] ( decInt | hex | octal | binaryNum ) "n" ;
decimal         = [ sign ] ( decInt [ frac ] | frac ) "m" ;

datetime        = "dt" quoted | "d" quoted | "t" quoted ;  (* ISO-8601 inside quotes *)
binary          = "b" quoted ;                              (* base64 inside quotes *)

boolean         = "T" | "F" | "true" | "false" ;
null            = "N" | "null" ;
specialNumber   = "NaN" | "Inf" | "+Inf" | "-Inf" ;

comment         = "#" { anyCharExceptNewline } ;
ws              = ? Unicode whitespace ? ;
name            = nameStart { nameChar } ;
sectionName     = sectionChar { sectionChar } ;    (* ANCHORED: the whole name must match *)
sectionChar     = letter | mark | digit | "-" | "_" ;
```

> `sectionName` is narrower than `name`, and it is the one name in the format with **no quoted
> form** — the separator line runs to the end of the line, so nothing bounds the name. The rule is
> anchored on purpose: a parser must not match a prefix and leave the remainder to fail later, or
> `--- a,b: $x` would silently become a section named `a`. See
> [Data Sections](../the-structure/introduction/data.md#section-names-are-bare-names).

> This grammar is a working draft for the 1.0 specification. Edge cases (precise open-string
> termination, escape sequences, and datetime sub-formats) are described in their respective
> chapters and will be folded in as the grammar is finalized.

## See Also

- [Structural Elements](../the-structure/structural-elements/README.md)
- [Value Representations](../the-structure/values/README.md)
- [Internet Object Schema](../schema-definition-language/internet-object-schema.md)
