---
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
sectionTag      = name [ ":" schemaRef ]          (* e.g.  employee : $employee *)
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
schemaMember    = name [ "?" ] [ "*" ] [ ":" ( type | memberDef | array | schemaRef ) ] ;
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

number          = [ sign ] ( decInt | hex | octal | binaryNum ) [ frac ] [ exp ] ;
hex             = "0x" hexDigit { hexDigit } ;
octal           = "0o" octDigit { octDigit } ;
binaryNum       = "0b" ( "0" | "1" ) { "0" | "1" } ;
bigint          = [ sign ] ( decInt | hex | octal | binaryNum ) "n" ;
decimal         = [ sign ] decInt [ frac ] "m" ;

datetime        = "dt" quoted | "d" quoted | "t" quoted ;  (* ISO-8601 inside quotes *)
binary          = "b" quoted ;                              (* base64 inside quotes *)

boolean         = "T" | "F" | "true" | "false" ;
null            = "N" | "null" ;
specialNumber   = "NaN" | "Inf" | "-Inf" ;

comment         = "#" { anyCharExceptNewline } ;
ws              = ? Unicode whitespace ? ;
name            = nameStart { nameChar } ;
```

> This grammar is a working draft for the 1.0 specification. Edge cases (precise open-string
> termination, escape sequences, and datetime sub-formats) are described in their respective
> chapters and will be folded in as the grammar is finalized.

## See Also

- [Structural Elements](../the-structure/structural-elements/README.md)
- [Value Representations](../the-structure/values/README.md)
- [Internet Object Schema](../schema-definition-language/internet-object-schema.md)
