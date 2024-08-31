# Internet Object Document

The Internet Object format is a document-oriented format that emphasizes the separation of header and data. This structure is similar to that of HTML, and MIME, where the header is kept separate from the data or body.

In an Internet Object document, the header is optional but can be used to define schemas and definitions. The data section always starts with the `---` separator. This separator is the first element of the data section and is mandatory to distinguish it from the header.

**\[ Internet Object Document Structure Diagram ]**

### Internet Object Document Examples

#### Full Document

If an Internet Object document includes both a header and a data section you can call it a full document.

```ruby
# Header
name, age:int, address: {street, city, state}, active # Header

# Data Section
---
John Doe, 25, {Bond Street, New York, NY}, T
```

#### Data-only Document

When an Internet Object document contains only a data section, it is okay to omit the `---` separator. Such documents are sent to the server without any header because the schema is either not required or already known to the recipient.

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

In many cases, a query-generating document may not yield any results. In such cases, you can use the header with result metadata to send the query and the results. However, it is important to include the `---` separator to mark the end of the header and the start of the data section.

```ruby
# Header Record Metadata
~ reocordCount: 0
~ pageSize: 10
~ currentPage: 1
~ nexPage: N
~ prevPage: N

# Empty Data Section
---
```

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

Internet Object document structure is designed to be simple and flexible. The next section will discuss the Header and Data section in detail.
