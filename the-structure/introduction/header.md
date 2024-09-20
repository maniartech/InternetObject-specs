# Header

The header of an Internet Object document is positioned at the beginning of the document and serves a crucial role in defining the schema or associated definitions for the data it contains. This section includes essential metadata, context, variables, and schema references for the document's content. It plays an important role in ensuring that the data is presented in a consistent format and provides the necessary information for accurate interpretation and processing.

\[ Header Image Placeholder ]

### Default Schema

The schema is a fundamental component of the Internet Object format, defining the structure and semantics of the data within an Internet Object document. When the header contains only a schema, it is referred to as a "default schema." This schema is typically used to outline the structure of the data included in the document, separating the structure definition from the data itself. This separation makes the data more compact, readable, and easier to process. For more detailed information about schemas, refer to [the Schema](../../schema-definition-language/untitled-1.md).

```ruby
name, age:int, address, isActive?, remark
---
```

In this schema example, five keys are defined with additional details:

1. **`name`**: Represents a standard key, expected to contain a value such as a string.
2. **`age:int`**: Specifies that the `age` key should contain an integer value, indicating the data type explicitly.
3. **`address`**: Another standard key, which could hold a more complex value like a string or an object, depending on the context.
4. **`isActive?`**: The question mark (`?`) signifies that the `isActive` key is optional, meaning it may or may not be present in the data.
5. **`remark`**: Represents a standard key, expected to contain a value, likely a string, which could hold additional comments or notes.

This schema not only defines the structure but also includes type annotations and optionality, enhancing the clarity and robustness of the data model. By using this schema, the document can ensure consistent and accurate data representation, making it easier to process and interpret across different systems.

See this page for more information about [the Schema](../../schema-definition-language/untitled-1.md).

### Definitions

Definitions, at their core, are collections of key-value pairs used to declare metadata, variables, complex schemas, and other key-value pairs within the header of an Internet Object document.

```ruby
~ pageSize: 1
~ currentPage: 1
~ recordCount: 4
~ $address: {street, city, state}
~ $schema: {name, age, $address}
---
```

In this example, the header contains response metadata and schema details presented as Definitions, rather than using a Default Schema as seen in the previous example. The Definitions provide metadata that specify the page size (`pageSize`), the current page number (`currentPage`), and the total record count (`recordCount`). Additionally, more complex structures are defined, such as an address schema (`$address`) with nested keys (`street`, `city`, `state`) and a higher-level schema (`$schema`) that references both simple and complex data types. The `$schema` is a reserved key used to define the default schema for the document.

For further information about [the Definitions](../../the-definitions/definitions.md), click the link.
