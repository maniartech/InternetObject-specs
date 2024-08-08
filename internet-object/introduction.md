# Introducing Internet Object

Internet Object (IO) is a document-oriented data serialization format designed to optimize data transmission over networks. This specification introduces IO as an alternative to existing formats such as JSON, offering a structured approach to data representation and exchange.

### Core Structure

The fundamental structure of IO is an ordered collection of values, analogous to CSV (Comma-Separated Values) but with extended capabilities. These capabilities include support for nested objects, arrays, and inline keys, providing enhanced expressiveness and flexibility.

### Key Features

* **Document-Oriented Design**: In contrast to value-oriented formats, IO adopts a document-centric approach, facilitating the separation of data from definitions to enhance clarity and maintainability.
* **Ordered Collection with Extended Functionality**: IO's core structure maintains an ordered collection of values while supporting complex data structures such as nested objects and arrays.
* **Schema-First Approach**: IO emphasizes schema-first design to ensure data consistency and predictability. While schemas are optional, their inclusion significantly enhances data integrity and validation.
* **Concise Syntax**: The syntax of IO is optimized for readability and efficiency, minimizing data size without compromising clarity.
* **Metadata Integration**: IO documents can incorporate metadata, variables, and multiple schemas within the header section, providing comprehensive context for the data.

### Illustrative Examples

#### Basic IO Document Structure <a href="#basic-io-document-structure" id="basic-io-document-structure"></a>

The following example demonstrates a basic IO document structure:

```yaml
name, age, active, address: {street, city}
---
John Doe, 25, T, {Bond Street, New York}
```

This structure illustrates IO's concise syntax and inherent schema support. For comparison, an equivalent JSON representation would be:

```json
{
  "name": "John Doe",
  "age": 25,
  "active": true,
  "address": {
    "street": "Bond Street",
    "city": "New York"
  }
}
```

#### IO Document with Collections and Data Types <a href="#io-document-with-collections-and-data-types" id="io-document-with-collections-and-data-types"></a>

IO supports collections and various data types, as demonstrated in the following example:

```yaml
name:string, age:int, active:bool, address: {street:string, city:string}
---
~ John Doe, 25, T, {Bond Street, New York}
~ Jane Doe, 20, T, {Main Street, San Francisco}
```

This example illustrates several key features:

* Explicit data type definitions in the schema (`string`, `int`, `bool`)
* Nested object structures (`address`)
* Collection of objects denoted by the tilde (`~`) prefix
* Correspondence between the order of values and the schema definition

The equivalent JSON representation would be:

```json
[
  {
    "name": "John Doe",
    "age": 25,
    "active": true,
    "address": {
      "street": "Bond Street",
      "city": "New York"
    }
  },
  {
    "name": "Jane Doe",
    "age": 20,
    "active": true,
    "address": {
      "street": "Main Street",
      "city": "San Francisco"
    }
  }
]
```

This comparison demonstrates IO's capacity to represent structured data collections efficiently, offering a compact and readable format while maintaining an ordered structure.

### Advanced Examples <a href="#advanced-examples" id="advanced-examples"></a>

#### Separate Schema and Document with Collection <a href="#separate-schema-and-document-with-collection" id="separate-schema-and-document-with-collection"></a>

In many scenarios, it's beneficial to define schemas separately from the data. This approach allows for schema reuse, versioning, and easier maintenance. Here's an example of a separate schema followed by a document using that schema:

1. Separate Schema (person.io)

```yaml
# Preson Schema
name:string, age:int, active:bool, address: {street:string, city:string}, skills:[string]
```

2. Document with Collection and Metadata

```
~ schemaUrl: "https://example.com/schemas/person.io"
~ recordCount: 3
~ page: 1
~ totalPages: 1
---
~ John Doe, 25, T, {Bond Street, New York}, [JavaScript, Python]
~ Jane Doe, 30, F, {Main Street, San Francisco}, [Java, C++, Rust]
~ Bob Smith, 28, T, {Park Avenue, Chicago}, [Ruby, Go]
```

In this example:

* The schema is defined separately, potentially in a file named "person.io".
* The document references the schema URL in its metadata.
* The document includes additional metadata such as record count and pagination information.
* The collection contains multiple records, each prefixed with `~`.
* Each record follows the structure defined in the schema, including an array of skills.

This structure allows for efficient data transmission, as the schema only needs to be sent once and can be cached by the receiving system. It also facilitates easy updates to the schema without necessarily changing the data format.

### Conclusion <a href="#conclusion" id="conclusion"></a>

Internet Object represents a significant advancement in data serialization technology. By combining the simplicity of ordered collections with the robustness of schema-based validation, Internet Object offers a powerful yet accessible solution for modern data exchange needs. Its key strengths include:

1. Efficiency in data transmission and storage
2. Clarity through its schema-first approach and document-oriented design
3. Flexibility in handling various data structures and types
4. Compatibility with existing JSON-based systems

These attributes make Internet Object suitable for a wide range of applications, from web-based and networked environments to data storage and interchange in diverse domains such as IoT, cloud computing, and enterprise systems.

The subsequent sections of this specification provide comprehensive details on Internet Object's syntax, schema definition language, supported data types, and advanced features. This information will enable developers, system architects, and data engineers to fully leverage the capabilities of Internet Object in their projects and applications.

As data exchange continues to play a crucial role in our interconnected world, Internet Object stands poised to address current challenges and anticipate future needs in data serialization and transmission.
