# Creating Collection

A collection may be created with or without explicitly defining schema definition for the records. However, it is always recommended to define a schema for the collections of records.&#x20;

### Simple Collection &#x20;

A Simple Collection can be created in the data section of the Internet object document by prefixing each record with a tidal sign `(~ U+007E)`.  It enables the parser to identify the next record when multiple records are sent.&#x20;

In the Simple Collection as the schema is not defined the type and the structure of collection records can differ. &#x20;

```ruby
# Creating a simple Collection
---
~ Ironman, 20, Male, {Bond Street, New York, NY}
~ Spiderman, 25, Male, {Duke Street, New York, NY}, cool

```

### **Explicit Collection**

An Explicit Collection is created by explicitly defining the schema for the collection of records. Prefixing schema with the tidal sign  `(~ U+007E)` enables the parser to understand the multiple records that may be sent according to a particular schema definition.&#x20;

```ruby
# Creating an Explicit Collection
~ $address: {street, city, state}
~ $schema: { 
            name: string, 
            age: {int, min:28}, 
            gender: {string, choices: [Male, Female]}, 
            $address
            }
---
~ Ironman, 20, Male, {Bond Street, New York, NY}
~ Spiderman, 25, Male, {Duke Street, New York, NY}
~ Wonderwoman, 25, Female, {Z street, San Francisco, California}
```

Here in the code snippet,  multiple records are passed in the data section of the document using Collections.&#x20;
