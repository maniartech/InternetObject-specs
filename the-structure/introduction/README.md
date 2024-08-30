# Internet Object Document

The Internet Object format is a document-oriented format that emphasizes the separation of header and data. This structure is similar to that of HTML, and MIME, where the header is kept separate from the data or body.

In a typical Internet Object document, the header is optional but can be used to define schemas and definitions. The header may be followed by a data section, which must be separated from the header by the data separator `---`. The following is a valid Internet Object structure.

**\[ Internet Object Document Structure Diagram ]**

### Internet Object Document Examples

#### Full Document

If an Internet Object document includes both a header and a data section, they must be separated by the `---` operator. This requirement ensures that the header and data are clearly delineated and can be processed independently by the recipient of the document.

```ruby
# Header
name, age:int, address: {street, city, state}, active # Header

# Data Section
---
John Doe, 25, {Bond Street, New York, NY}, T
```

#### Data-only Document

When an Internet Object document contains only a data section, it may or may not include a data separator. In such cases, it is up to the sender and recipient to agree on how to handle the document. If the document does not include a data separator, the recipient should assume that the entire document is a data section.

**With Separator:**

```ruby
---
John Doe, 25, {Bond Street, New York, NY}, T # Data section
```

**Without Separator:**

```ruby
~ John Doe, 25, {Bond Street, New York, NY}, T
~ Jane Done, 48, {Malibu Point 10880, Malibu, CA}
```

#### Header-only Document

If an Internet Object document contains only a header section, it is important to include a data separator at the end. Without the data separator, the parser may mistakenly interpret the header section as data, leading to potential errors or issues. By including the data separator, the parser can accurately identify the end of the header and the start of the data section.

```ruby
~ reocordCount: 0
~ pageSize: 10
~ currentPage: 1
~ nexPage: N
~ prevPage: N
---
```

In many cases, a query-generating document may not yield any results. Overall, the inclusion or omission of the data separator in data-only or header-only documents underscores the flexibility and adaptability of the Internet Object format.

#### Document with Multiple Data Sections

Internet Object document can contain multiple data sections. This facility allows user to provide multiple types of data collection to be embedded in the single document.

```ruby
# Schema section
~ $address: {street, city, state, zip} # Adddress Schema
~ $person: {firstName, lastName, age, gender }

# The collection of person
--- $person
~ John, Doe, 25, M
~ Jane, Doe, 22, F

# The address
--- $address
~ Bond Street, New York, NY, 500001
~ Georeg Street, New York, NY, 500002
```
