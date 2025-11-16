# Type Index

> Quick reference of schema types and where they are implemented.

## Primitives
- any → permissive placeholder (validated per context)
- boolean → `io-js2/src/schema/types/boolean.ts`
- null, undefined → allowed via modifiers or explicit type semantics

## String
- string → `io-js2/src/schema/types/string.ts`
- Constraints: minLen, maxLen, pattern, choices

## Number
- number → `io-js2/src/schema/types/number.ts`
- bigint → `io-js2/src/schema/types/bigint.ts`
- decimal → `io-js2/src/schema/types/decimal.ts`

## Collections
- array → `io-js2/src/schema/types/array.ts`
- collection (~) → see `the-collections/`

## Objects
- object → `io-js2/src/schema/types/object.ts`
- Member vs Object → see `objects/02-object-vs-memberdef.md`

## Advanced
- recursive types → schema references + lazy resolution
- union types → modeled via choices / custom validators
- custom types → extend TypeSchema
