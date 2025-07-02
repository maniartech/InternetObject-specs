# Objectives

The inception of the Internet Object began as a side project aimed at addressing the limitations observed in the JSON format. Over time, it evolved into an independent research endeavor, focusing on effectively tackling data-transfer challenges such as size, schema validation, data streaming, header, and metadata support, among others. The design of the Internet Object format revolves around the following key objectives:

## Uninfluenced Development

To optimize the format for internet wire transfer, the Internet Object must be conceived and developed without being excessively influenced by existing mechanisms. However, it may draw inspiration from other formats as needed.

Human Friendly


Internet Object documents must be text-based, human-friendly, and easy to work with. Developers should be able to write these documents using plain text IDEs without needing any frameworks, libraries, or utilities.

## Minimal Footprint

To ensure a small footprint, the Internet Object format should separate data and schema, allowing data to be sent alone over the network.

Schema First


To uphold data integrity during wire transfer, the Internet Object format should prioritize a schema-first approach.

## Document Oriented

Embracing a comprehensive document-oriented approach, the Internet Object format should facilitate the bundling of all essential components - including records, data, definitions, schemas, and comments - within a single document. This approach ensures that all related information is conveniently stored together, promoting the efficient organization and streamlined management of data and its associated elements. Moreover, it enhances maintainability and simplifies collaboration among team members, as they can easily access and understand the complete context within a single, unified document.

Complex Data Types


The Internet Object must support complex data types so that any kind of data whether large number or complex data structure can be easily serialized and deserialized for the wire.

Streaming Friendly


The Internet Object format should support the streaming of independent records, allowing for efficient and continuous data transfer. With this feature, the failure of a single record will not affect the processing of other records, ensuring more resilient data transmission.

Platform and Language independence


The Internet Object format should be designed to work seamlessly across different platforms, operating systems, and programming languages. This universal compatibility ensures broad adoption and versatility, enabling developers to easily integrate the format into their projects without limitations.

Comments


By providing support for inline comments, the Internet Object format allows users to document schemas and definitions directly within the data itself. This feature enhances readability and maintainability, making it easier for users to understand and manage complex data structures.

## Reusability

To increase the format's adaptability, the Internet Object should promote reusability through concepts like references and variables. This dynamic feature allows for the customization of data structures and enables users to manipulate data more effectively, catering to various needs and scenarios.

