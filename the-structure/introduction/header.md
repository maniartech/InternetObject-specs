# Header

The header section of an Internet Object document is located at the top of the document and is used to define the schema or definitions associated with the data. This section typically includes metadata that provides additional context and structure for the data contained in the document. For example, the header may define the data types and structures used in the data section, specify any variables or other parameters that need to be considered when processing the document, or provide other relevant details.

[ Header Image Placeholder ]

### Schema

The schema is a fundamental component of the Internet Object format and is used to define the structure and semantics of the data contained within an Internet Object document. The schema typically consists of a set of keys and values that define the attributes and data types of the data that will be included in the document. This definition is expressed in a human-readable format and can be attached to the document header or maintained separately.

```ruby
name, age, address, isActive, remark
---
```

In the example provided, the schema consists of five keys that are separated by a comma. These keys define the structure of the data that will be included in the document and provide a standardized format for the data that is compatible with other systems and applications.

See this page for more information about [the Schema](../../the-schema/untitled-1.md).

### Definitions

Definitions, in their most basic form, are collections of key-value pairs that can be used to declare metadata, variables, complex multiple schemas, and key-values within the header of an Internet Object document.

<pre class="language-ruby"><code class="lang-ruby"><strong>~ pageSize: 1
</strong>~ currentPage: 1
~ recordCount: 4
~ $address: {street, city, state}
~ $schema: {name, age, $address}
---
</code></pre>

In the provided example, the definitions include key-value pairs that define the page size, current page, and record count, as well as more complex schemas for addresses and objects. The use of definitions can help to ensure that the data contained in the document is properly formatted and structured, and can aid in the processing and interpretation of the data by the recipient.

For further information about [the Definitions](../../the-definitions/definitions.md) click the link.
