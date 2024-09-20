---
description: Work in Progress!
---

# Objects

Objects are a fundamental element in Internet Object documents, providing a clear and intuitive way to represent structured data.

An object is expressed as a sequence of values (and key/value pairs) separated by commas (`,` `U+002C`). For simplicity, clarity, and ease of reading, Internet Object supports two modes for objects: Open and Closed. The Open mode does not require enclosing values in curly brackets and is only supported for top-level objects.

## Syntax

### Open Object

<figure><img src="../../.gitbook/assets/image (2).png" alt=""><figcaption><p>Open Object Syntax</p></figcaption></figure>



### Closed Object

<figure><img src="../../.gitbook/assets/image (8).png" alt=""><figcaption><p>Closed Object Syntax</p></figcaption></figure>

### **Object Structural Characters**

| Symbol | Characters                        | Unicode  | Description               |
| ------ | --------------------------------- | -------- | ------------------------- |
| `,`    | Comma                             | `U+002C` | Used as a value separator |
| `:`    | Colon                             | `U+003A` | Key-value separator       |
| `[`    | Open Square Bracket               | `U+005B` | Begins an array boundary  |
| `]`    | Close Square Bracket              | `U+005D` | Closes an array boundary  |
| `{`    | <p>Open Curly </p><p>Bracket</p> | `U+007B` | Begins an object boundary |
| `}`    | Close Curly Bracket               | `U+007D` | Closes an object boundary |

### Characteristics

Objects can contain values of various types, including other objects, arrays, strings, numbers, boolean, and null. Keys can also be attached to all or some of the values to provide more information and make the objects more self-explanatory. The keys are valid Internet Object string values, and any format of string (Open, Regular, Raw) can be used to represent them.

#### **Basic object**

An object is essentially an ordered collection of values similar to CSV records.

```ruby
John Doe, 25, T
```

Objects with child objects and arrays.

```ruby
John Doe, 25, T, {Bond Street, New York, NY}, [extrovert]
```

An object is not required to be wrapped inside the curly braces unless it is a child object. However, putting them in between the braces will not make it invalid.

```ruby
{John Doe, 25, T, {Bond Street, New York, NY}, [extrovert]}
```

#### Object with Inline Keys

Object structure also supports unique inline keys. In the following example `isActive`, `address`, and `personalities` have associated keys.

```yaml
{
  John Doe,
  25,
  isActive: T,
  address: {Bond Street, New York, NY},
  personalities: [extrovert]
}
```

Inline keys can be attached to all the values or some of them. When an object contains both types of values (key value and non-key value), the key-value pair must be placed after the non-key values (sequential values).

```yaml
{
  name: John Doe,
  age: 25,
  isActive: T,
  address: {Bond Street, New York, NY},
  personalities: [extrovert]
}
```

As the object keys are valid Internet Object String values, any format of string ([Open](string/open-strings.md), [Regular](string/regular-strings.md), [Raw](string/raw-strings.md)) can be used to represent them.&#x20;

```yaml
{
  name: John Doe,                       # Open string key
  address: {Bond Street, New York, NY},
  peamlrsonalities: [extrovert],
  "age": 25,                             # A key in regular string!
  'isActive': T                          # A key wrapped in raw string!
}
```

#### Empty objects and empty trailing values

An empty object must be enclosed by curly braces.

```yaml
{} # An empty object
```

An object can contain empty values. The following object contains two empty values, after the name John Doe, and the second before the address.

```yaml
John Doe,,true,, {Bond Street, New York, NY}
```

Trailing empty commas are ignored.

```ruby
John Doe,,,,,
```

{% hint style="info" %}
Internet Object is a schema-first format. When a [schema](../../schema-definition-language/untitled-1.md) is applied, values can be accessed using their respective keys. Without the [schema](../../schema-definition-language/untitled-1.md), values without keys can be accessed using their respective index position; or through keys, if they are provided.
{% endhint %}

