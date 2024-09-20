# The structure

In its simplest form, an object schema can be just a set of keys separated by a comma `","`. Such schema ensures that the object has values for all the required keys. Schema can be defined in the header section of the Internet Object document or maintained separately. The following example shows how easy to create a basic schema-first Internet Object document.

```ruby
id, department, employeeId, address # The schema
---
02, Marketing, 255, { X Street, New York, NY } # The object
```

The Internet Object schema does not enforce schema designer to provide the type of the member. If not provided, such members are marked as `any` type. That means, they can be assigned any [values](../the-structure/values/). For more information see the [any ](data-types/any.md)datatype.

### &#x20;Schema with Types

It is always recommended to define to which datatype members belong. Internet Object members can be assigned any allowed datatype such as [string](data-types/string/), [number](data-types/number/), [int](data-types/number/derived-types/integer.md), [int32](data-types/number/derived-types/int32.md), [int16](data-types/number/derived-types/int16.md), [byte](data-types/number/derived-types/byte.md), [email](data-types/string/string-derived-types/email.md), [url](data-types/string/string-derived-types/url.md), [datetime](data-types/string/string-derived-types/datetime.md), [date](data-types/string/string-derived-types/date.md), [time](data-types/string/string-derived-types/time.md), [bool](data-types/bool.md), [object](data-types/object.md), [array, ](data-types/array.md)or [any](data-types/any.md).

{% tabs %}
{% tab title="Example: Schema with  data type" %}
```yaml
name: string, 
age: int, 
address: {
  street: string, 
  city: string, 
  state: string,
  zipCode: int
}, 
isActive: bool, 
remark: string
```
{% endtab %}
{% endtabs %}

### The MemberDefs

Defining members with simple types are good in some cases, however, they do not provide a mechanism to create complex constraints. In such cases, the MemberDefs (The member's definitions) are used to create complex type definitions. The memberDefs are objects designed to impose complex constraints on the associated member. For example, the following schema allows the member `phrases` to accept string values only if the length is between 20 and 200 characters. It will invalidate the value when the constraint is not match.

```yaml
phrase: {string, minLen: 20, maxLen: 200}
---
~ A quick brown fox jumps over the lazy dog # Valid value
~ Hello world! # Invalid, len < 20
```

Meberdef is generally represented by enclosing data types or schema followed by optional comma-separated-values,  and conditions: value pairs all inside the curly braces as shown below.

![General Representation of MemberDef ](https://lh4.googleusercontent.com/xPN50i\_1M7hqzgXyqyXh8dErR81vSgzHiPojZJgvbMfb7\_sfq1NAojHMrEUWKg4O7gxe1d3AbhAQJ-7HIdbd0bTULrXsAu1mZdm6inTXLc8jljzq3mw8xTeIuJGW000K7tPDAmTZ)

The following example represents a schema with MemberDef.

{% tabs %}
{% tab title="Example: A Schema with a MemberDefs" %}
```csharp
name: {string,  min: 20, max: 100},
age: {int, max: 20},           
gender: {string, choices: [Male, Female, NotDisclosed]}
```
{% endtab %}
{% endtabs %}

In the above example, the schema has a complex type definition which is created using MemberDef. The variable `name` has `type`, `min` and `max` as its members. The variable `age`  has `type`,  and `max` as its members. Similarly, `gender` has `type` and `choices` as its members.

The above representations are valid and will successfully validate the following object.

```ruby
Jane Doe, 20, Male
```

### Schema with nested objects and arrays

An object schema can be defined with the child objects and arrays schema. The child object defined in the schema definition must be enclosed inside the curly braces.

{% tabs %}
{% tab title="Example: An object schema with the child object and the array schema" %}
```ruby
 { 
    name: string, 
    age: int, 
    address: {
               street: string, 
               city : string,
               state: string, 
               zip: int
               },        
     gender: string,
     skills: {
              default: Null, 
              array: [strings]
              }
  }
```
{% endtab %}
{% endtabs %}

In the above example, the key variable `address` has a child object having four keys i.e `street`, `city`, `state` and `zip`.  Similarly, the key `skills` is defined with an array schema having a default value `null` and `array` of type `strings`.

The above representations are valid and will successfully validate the following object.

```ruby
{
  Jane Doe, 20, { X Street, New York, NY, 10005 }, 
  [Leadership, Problem-Solving]
}
```

### Multiple Schemas and Schema Reusability

Internet object documents may have multiple schemas. The document containing multiple schemas can be reused and/or nested to reduce code length in such a case the schema must be defined before use.&#x20;

The schema must be prefixed with a dollar sign (`$` `U+0024`) before reusing the schema in the multiple schemas definitions. So that the parser will identify the schema variable and will map values to the respective keys according to the Schema Definition.&#x20;

Schema Definition represents the collection of key-value pairs declared using schema in the header section of the document. For more details refer to [Definitions](../the-definitions/definitions.md).

{% tabs %}
{% tab title="Example1: Using Multiple Schema" %}
```ruby
~ $address: {street, city, state}
~ $personalDetails: {
             name: string, 
             age: int, 
             $address, 
             isActive: bool, 
             remark: string
            }
```
{% endtab %}
{% endtabs %}

In the above example, the `address` schema is represented using a dollar sign (`$` `U+0024`), so that it can be reused inside another schema `personalDetails`. &#x20;

{% tabs %}
{% tab title="Example2: Complex Multiple Schema representation" %}
```ruby

~ $address: {city, zipCode, state} 
~ $person:{
            name, 
            age, 
            currentAddress: $address, 
            permanentAddress: $address
          }
~ $accountDetails: { 
                     personDetails: $person, 
                     AccountNo:int
                   }
---
```
{% endtab %}
{% endtabs %}

In the above example, the header section has three schemas i.e `address`, `person` and `accountDetails` . The `address` schema is used inside the `person` schema and `person` schema is used inside the `accountDetails` schema making the schema representation nested.

The above representations are valid and will successfully validate the following object.

```ruby
{
  Jane Doe, 20, { X Street, New York, NY, 10005 },
  { Hills Street, Lake Peekskill, NY, 10537 }, 12344564567
}
```

### Default Schema

To map values from the data section to the variables in the header, the parser will first check the header section for the default schema definition that starts with the word `"schema"`. Once the parser finds out the default schema, all values will be checked by matching them with the variables. If they are matched then they will be mapped to the schema variables.&#x20;

If the values are not matched with the variables the parser will check for the other schema definition.

{% tabs %}
{% tab title="Example1: Default Schema" %}
```ruby
~ $address: {street, city, state}
~ $Schema: {
             name: string, 
             age: int, 
             $address, 
             isActive: bool, 
            }
 ---
 John Doe, 25, {X-street, California, US}, T
```
{% endtab %}
{% endtabs %}

In the above example, the parser will first check the header part for the schema definition with the word `"schema"`. Once it is found it will start validating all the variables in the schema i.e `name,` `age`, `address`, and `isActive` to the values in the data section if it matches then it will be mapped successfully.&#x20;

If the header section of the document does not contain schema definition and only contain the value definition and/or meta-data as shown in the example below. The values will be mapped to the positioned variables after getting the values from the value variable.

{% tabs %}
{% tab title="Example2: Header with meta-data, schema variables but without schema Definition" %}
```ruby
~ pageSize: 1
~ currentPage: 1
~ totalPages: 1
~ y: Yes
~ n: No
 ---
~ John Doe, 25, $y, {X-street, California, US}
~ Bob Redwood, 36, $n, {blue-street, New Jersey, US}
```
{% endtab %}
{% endtabs %}

```ruby
{
 "0": "John Doe", 
 "1": 25, 
 "2": "Yes",
 "3":{ "0": "X-street",
       "1": "California", 
       "2": "US"
     },
 }
 {
 "0": "Bob Redwood", 
 "1": 36, 
 "2": "No",
 "3":{ "0": "blue-street",
       "1": "New Jersey", 
       "2": "US"
     },
 }
```

If the header section in the document is empty, then the parser will map all values in the data section to the respectively positioned variables.

{% tabs %}
{% tab title="Example3: Empty Header" %}
```ruby
---
John Doe, 25, {X-street, California, US}
```
{% endtab %}
{% endtabs %}

```ruby
{
 "0": "John Doe", 
 "1": 25, 
 "2":{ "0": "X-street",
       "1": "California", 
       "2": "US"
     },
 }
```

If the header section does not contain a definition and only contains schema. In such a case the parser will map the values to schema variables as shown in the example below.

{% tabs %}
{% tab title="Example4: Header with Schema" %}
```ruby
name, age, address: {street, city, state}
---
John Doe, 25, {X-street, California, US}
```
{% endtab %}
{% endtabs %}

```ruby
{
 "name": John Doe, 
 "1": 25, 
 "address":{ "street": X-street,
               "city": California, 
              "state": US
     },
 }
```

### Optionals and Nullables

A schema may contain the optional and nullable key. The key can be set to `optional` by suffixing it with a question mark (`?` `U+003F`).  Similarly, the key can be set to null by suffixing it with an asterisk(`*` `U+002A`).

{% tabs %}
{% tab title="Example: Schema with optional and nullable keys" %}
```csharp
name: string,             
gender?*: {string, 
           null: true, 
           optional: true, 
           choices: [Male, Female]
           },
age?: {int, optional: true, max: 20}
```
{% endtab %}
{% endtabs %}

In the above example, the defined schema contains both nullable and optional keys. The key `gender` is set to `optional` as well as `null` and key `age` is set to `optional`.

### &#x20;&#x20;

###
