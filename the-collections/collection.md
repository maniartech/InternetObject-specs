---
description: Collections in Internet Object
---

# Collection

A **Collection** in Internet Object is an ordered sequence of *collection items* (objects) within a section of a document. Collections enable efficient serialization, batching, and streaming of multiple objects—such as datasets, tables, or event logs—in a concise, flexible format.

Collections are always part of an Internet Object document, **not** standalone documents.
An Internet Object document consists of a header and a body. The body contains one or more sections. A section can contain either a single object or a **collection** (multiple objects as collection items).

Collections support both **homogeneous** and **heterogeneous** data. Each item in the collection is independent; failure of one item does not affect others.

## Syntax

A collection section consists of one or more collection items, each beginning with a tilde `~` (`U+007E`) followed by an object.

```ebnf
collection = collectionItem *(collectionItem)
collectionItem = "~" object
````

> `object` is as defined in the [Objects specification](../the-structure/values/object.md). Both open and closed object forms are permitted, though open form is recommended for clarity.

### Structural Characters

| Symbol | Name         | Unicode            | Description                         |
| ------ | ------------ | ------------------ | ----------------------------------- |
| `~`    | Tilde        | `U+007E`           | Begins a new collection item        |
| `,`    | Comma        | `U+002C`           | Separates values within an object   |
| `{}`   | Curly Braces | `U+007B`, `U+007D` | For closed object syntax (optional) |

## Definition of Collection Item

A **collection item** is the top-level object immediately following a tilde (`~`) in a collection section.

* Each collection item **must be a valid Internet Object object**—either in open form (comma-separated values) or closed form (enclosed in `{}`).
* If the item is empty (`~` alone), it is called an **empty item** and is interpreted as an empty object (`{}`).

### Type Promotion of Collection Items

If a collection item appears syntactically to be a single primitive value (number, string, boolean, null) or an array,
it is **implicitly promoted** to an open object containing that value as its only field.

**Examples:**

```ruby
~ 1                   # Interpreted as: { 1 }
~ true                # Interpreted as: { true }
~ [a, b, c, d]        # Interpreted as: { [a, b, c, d] }
~ John Doe            # Interpreted as: { John Doe }
~ {1, 2}              # Remains: { 1, 2 }
~                     # Empty item, parsed as: {}
~ name: John Doe      # Interpreted as: { name: John Doe }
```

> **Rule:** Every collection item is parsed as an object, regardless of whether it appears to be a primitive, array, or explicit object.

## Valid Forms

### Collection of Open Objects (Recommended)

```ruby
~ 101, Thomas, 25, HR, {Bond Street, New York, NY}
~                         # Empty item; parsed as {}
~ 102, George, 30, Sales, {Duke Street, New York, NY}
```

### Collection of Closed Objects

```ruby
~ {Jane Doe, 20, f, N/A, [0xFF0000, 0x0000FF], F}
```

### Collection with JSON like object syntax

```ruby
~ {"name": " John Doe", "address": {"street": "Main St", "city": "Seattle"}, "favorite_colors": ["purple"], "is_active": true}
~ {"name": "Eve", "age": 33, "gender": "female", "location": {"city": "Dallas", "state": "TX"}, "favorite_colors": ["orange"], "is_active": false}
```

### Mixed

```ruby
~ Dave, 40, m, {Main St, Seattle, WA}, [purple], T
~ {Eve, 33, f, {Elm St, Dallas, TX}, [orange], F}
```

## Optional Behaviors

### Whitespace and Formatting

* Whitespace is allowed around the tilde, commas, and within objects.
* Collection items are typically separated by newlines, but any whitespace may be used.
* Trailing commas within objects are allowed and ignored.

### Empty Items

* An empty item (just `~`) is always interpreted as an empty object (`{}`).
* If a schema is present, an empty item is valid only if all fields are optional or nullable; otherwise, it is invalid.

### Nesting or Composition

* Each collection item must be a top-level object (open or closed).
* Objects may contain nested arrays or child objects as fields.

## Invalid Forms

```ruby
# ✗ Missing tilde
101, Thomas, 25, HR, ...

# ✗ Missing commas between values, all values are considered as a single value
~ 101 Thomas 25 HR ...

# ✗ Missing comma between values
~ 101, 25 HR, ...

# ✗ Trailing data outside object
~ {101, 25, HR} extra
```

## Collection Item Independence and Error Handling

Each collection item (object) is parsed and validated **independently**:

* If a collection item fails to parse or validate, **only that item is marked as an error**.
* All other items remain unaffected and are processed as usual.
* Implementations may provide modes for "fail fast" (stop on first error) or "parse all" (continue and collect errors); **it is recommended to parse all items** and report errors per item.
* If a collection item contains nested child objects, failure means the entire top-level object (the collection item) is in error, not just the child.

**Example:**

```ruby
~ John, 28, m, {Main St, LA}, [red], T        # valid
~ Jane, N/A, f, {Second St, LA}, [blue], F    # valid
~ Alice, OOPS, f, {Third St, NY, [green], T   # Error: unclosed object, invalid
~ Bob, 35, m, {Fourth St, NY}, [yellow], T    # valid
```

The third item is invalid, but the others are unaffected.

## Preservation of Structure

* Collection item order and structure are preserved as written.
* Whitespace and comments are preserved (but ignored for parsing).
* Interpretation, key uniqueness, and field mapping are determined by schemas, validators, or application logic.

## See Also

* [Objects](../the-structure/values/object.md)
* [Schema Definition Language](../schema-definition-language/)
* [Validation Rules](../validation-rules/)
* [Document Structure](../the-structure/structure-of-document)
* [Comments](../the-structure/structural-elements/comments)
