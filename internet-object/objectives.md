---
description: The design goals that shape the Internet Object format.
---

# Objectives

The Internet Object serialization format aims to redefine data interchange on the internet by addressing key challenges and limitations present in existing formats.

The inception of Internet Object began as a side project aimed at addressing limitations observed in the JSON format. Over time, it evolved into an independent research endeavor focused on tackling data-transfer challenges such as size, schema validation, data streaming, header and metadata support, and more. The design of the Internet Object format revolves around the following key objectives:

## Uninfluenced development

To optimize the format for internet wire transfer, Internet Object MUST be conceived and developed without being excessively influenced by existing mechanisms. However, it MAY draw inspiration from other formats as needed.

## Human friendly

Internet Object documents SHOULD be text-based, human-friendly, and easy to work with. Developers SHOULD be able to write these documents using plain-text IDEs without needing frameworks, libraries, or utilities.

## Minimal footprint

To ensure a small footprint, the Internet Object format SHOULD separate data and schema, allowing data to be sent alone over the network.

## Schema first

To uphold data integrity during wire transfer, the Internet Object format SHOULD prioritize a schema-first approach.

## Document oriented

Embracing a comprehensive document-oriented approach, the Internet Object format SHOULD facilitate the bundling of essential components—including records, data, definitions, schemas, and comments—within a single document. This approach helps keep related information together, improving organization and maintainability.

## Complex data types

Internet Object MUST support complex data types so that large numbers and complex data structures can be serialized and deserialized efficiently for the wire.

## Streaming friendly

The Internet Object format SHOULD support streaming of independent records, allowing for efficient and continuous data transfer. The failure of a single record MUST NOT affect the processing of other records.

## Platform and language independence

The Internet Object format SHOULD work seamlessly across platforms, operating systems, and programming languages to ensure broad adoption and versatility.

## Comments

By supporting inline comments, the Internet Object format allows users to document schemas and definitions directly within the data itself. This feature enhances readability and maintainability.

## Reusability

To increase adaptability, Internet Object SHOULD promote reusability through references and variables. This capability enables customization of data structures and more effective data manipulation.

## See Also

- [Abstract](abstract.md) — the format in one paragraph
- [Introducing Internet Object](introduction.md) · [Why Internet Object?](why-internet-object.md)
- [The Poetic Principles](the-zen-of-internet-object.md) — the same goals in verse
