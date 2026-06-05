# Table of contents

* [Internet Object 1.0](README.md)

## Internet Object

* [Abstract](internet-object/abstract.md)
* [The Poetic Principles](internet-object/the-zen-of-internet-object.md)
* [Objectives](internet-object/objectives.md)
* [Introducing Internet Object](internet-object/introduction.md)
* [Why Internet Object?](internet-object/why-internet-object.md)
* [Getting Started](internet-object/getting-started.md)

## Core Concepts

* [Document-Oriented Nature](core-concepts/document-oriented.md)
* [Schema-First Design](core-concepts/schema-first.md)

## Structure and Syntax

* [Internet Object Document](the-structure/introduction/README.md)
  * [Header](the-structure/introduction/header.md)
  * [Data Sections](the-structure/introduction/data.md)
* [Structural Elements](the-structure/structural-elements/README.md)
  * [Structural Characters & Separators](the-structure/structural-elements/structural-characters-n-keywords.md)
  * [Literals](the-structure/structural-elements/literals.md)
  * [Other Special Characters](the-structure/structural-elements/other-special-characters.md)
  * [Whitespace & Indentation](the-structure/structural-elements/whitespaces.md)
* [Value Representations](the-structure/values/README.md)
  * [Objects](the-structure/values/object.md)
  * [Arrays](the-structure/values/array.md)
  * [Strings](the-structure/values/string/README.md)
    * [Open Strings](the-structure/values/string/open-strings.md)
    * [Regular Strings](the-structure/values/string/regular-strings.md)
    * [Raw Strings](the-structure/values/string/raw-strings.md)
  * [Numeric Values](the-structure/values/number/README.md)
    * [Number](the-structure/values/number/number.md)
    * [BigInt](the-structure/values/number/bigint.md)
    * [Decimal](the-structure/values/number/decimal.md)
    * [Special Numeric Formats](the-structure/values/number/special-formats.md)
    * [NaN and Infinity](the-structure/values/number/nan-and-infinity.md)
  * [Binary](the-structure/values/binary.md)
  * [Date and Time](the-structure/values/date-and-time.md)
  * [Booleans](the-structure/values/booleans.md)
  * [Nulls](the-structure/values/null.md)
* [Case Sensitivity Rules](the-structure/case-sensitivity.md)
* [Comments](the-structure/comments.md)
* [Encoding](the-structure/encoding.md)
* [Syntax Errors](the-structure/syntax-errors.md)

## Definitions

* [Definitions](the-definitions/definitions.md)
* [Variables](the-definitions/variables.md)
* [Schema References](the-definitions/schema-references.md)
* [Error Handling in Definitions](the-definitions/error-handling.md)

## Collections

* [Collection](the-collections/collection.md)
* [Creating Collections](the-collections/creating-collection.md)
* [Collection Rules](the-collections/collection-rules.md)
* [Data Streaming](the-collections/data-streaming.md)

## Schema Definition Language

* [Overview](schema-definition-language/internet-object-schema.md)
* [Schema Representation](schema-definition-language/schema-representation.md)
* [Schema Data Types](schema-definition-language/data-types/README.md)
  * [Any](schema-definition-language/data-types/any.md)
  * [String Types](schema-definition-language/data-types/string/README.md)
    * [Email](schema-definition-language/data-types/string/string-derived-types/email.md)
    * [URL](schema-definition-language/data-types/string/string-derived-types/url.md)
  * [Numeric Types](schema-definition-language/data-types/number/README.md)
  * [BigInt](schema-definition-language/data-types/number/bigint.md)
  * [Decimal](schema-definition-language/data-types/number/decimal.md)
  * [Date and Time](schema-definition-language/data-types/date-and-time.md)
  * [Binary](schema-definition-language/data-types/binary.md)
  * [Object (SchemaDef)](schema-definition-language/data-types/object.md)
  * [Array](schema-definition-language/data-types/array.md)
  * [Bool](schema-definition-language/data-types/bool.md)
* Advanced Schema Concepts
  * [TypeDef](schema-definition-language/typedef.md)
  * [MemberDef](schema-definition-language/memberdef.md)
  * [Open & Dynamic Schemas](schema-definition-language/dynamic-schema.md)
  * [Union Types (anyOf)](schema-definition-language/union-types.md)
  * [Composition & Reuse](schema-definition-language/composition.md)

## Streaming

* [Overview](streaming/README.md)
* [Wire Format & Framing](streaming/wire-format.md)
* [Stream Items](streaming/stream-items.md)
* [Schema & State](streaming/schema-and-state.md)
* [Streaming Error Model](streaming/error-model.md)
* [Readers & Writers](streaming/readers-and-writers.md)

## Parsing & Errors

* [Overview](parsing-and-errors/README.md)
* [Error Model](parsing-and-errors/error-model.md)
* [Parser Behavior & Recovery](parsing-and-errors/parser-behavior.md)
* [Error Accumulation](parsing-and-errors/error-accumulation.md)

## Conformance

* [Validation Model](conformance/validation-model.md)
* [Conformance Requirements](conformance/requirements.md)

## Interoperability

* [JSON Compatibility](json-compatibility.md)
* [Converting To/From Other Formats](interoperability/conversions.md)

## Best Practices

* [Best Practices & Guidelines](best-practices.md)

## Appendices

* [Formal Grammar (EBNF)](appendices/grammar.md)
* [Glossary](appendices/glossary.md)
* [FAQs](faqs-1.md)
* [Roadmap](roadmap.md)
* [Version History](appendices/version-history.md)
* [Contributors](contributors.md)
* [License](license.md)
