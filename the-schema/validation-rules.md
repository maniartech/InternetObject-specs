# Dynamic Schema

### Variable Number of Members in Schema

Internet Object allows passing extra values in the dynamic record using an asterisk sign `(*  U+002A)` without explicitly defining them in the schema definition.  &#x20;

#### Passing extra values using the asterisk sign

&#x20;It is invalid to pass extra values in the record without using `"*"` sign in the schema definition.   &#x20;

{% tabs %}
{% tab title="Example1:  Invalid way of passing extra values in record " %}
```ruby
~ $address: {street, city, state, zip}
~ $schema: {name, age, $address, isActive}
---
# valid as no extra values are passed
~ John Doe, 30, {Grant road, Mumbai, Maharashtra, 400007}, T

# Invalid as extra values are passed
~ Alex, 25, {Elphiston Road, Mumbai, Maharashtra, 400007}, T, Male, cool 
```
{% endtab %}
{% endtabs %}

In the above example, extra values are passed without using a `"*"` sign which is invalid.

In order to send the extra values in the dynamic record,  the `"*"` sign must be placed after the last field in the schema as shown in the example below.&#x20;

{% tabs %}
{% tab title="Example2: Valid way of sending extra values in the record" %}
```ruby
~ $address: {street, city, state, zip}

#now it is valid to pass extra values using '*'sign
~ $schema: {name, age, $address, isActive, * } 
---
~ John Doe, 30, {Grant road, Mumbai, Maharashtra, 400007}, T # valid 
~ Alex, 25, {Elphiston Road, Mumbai, Maharashtra, 400007}, T, Male, cool # valid 
```
{% endtab %}
{% endtabs %}

In the above example placing the `"*"` sign after the last kay field enables the parser to map extra values to the positioned number as,

```ruby
{
name: John Doe,
age: 30,
address: { street: Grant Road,
           city: Mumbai,
           state: Maharashtra,
           zip: 400007

          },
isActive: T                   
}

{
name: Alex,
age: 25,
address: { street: Elphiston Road,
           city: Mumbai,
           state: Maharashtra,
           zip: 400007

          },
isActive: T,
5: Male,
6: Cool                   
}
```

The above example shows that the extra values passed in the second record are mapped to positions `5` and `6` respectively.

#### Passing Extra values using key-value pairs

Extra values can be passed using key-value pair in the data section and using`"*"` in the header.

{% tabs %}
{% tab title="Example1: Passing extra values using key-value pair" %}
```ruby
name, age, address, isActive, * 
---
{
 John Doe, 30, Mumbai, T, nature: cool, available: T, 
 requestid: 122120
}
```
{% endtab %}
{% endtabs %}

In the above example, extra values are passed using key-value pairs. The values will be mapped to the respective keys defined in the schema as well as in the record as shown below,

```ruby
{
name: John Doe,
age: 30,
address: Mumbai,
isActive: T,
nature: cool, # valid
available: T, # valid
requestid: 122120 # valid                  
}
```



#### Defining TypeDef for extra values

The TypeDef can be defined for the extra values in the schema.  So that the values can be passed according to TypeDef.

{% tabs %}
{% tab title="Example1: Specifying typedef for extra values" %}
```ruby
name, age, address, isActive, *: string 
---
John Doe, 30, Mumbai, T, nature: cool, requestid: 122120
```
{% endtab %}
{% endtabs %}

The values must be passed according to the TypeDef defined in the schema otherwise it will throw an error.&#x20;

The values will be mapped to the respective keys defined in the schema as shown below,

```ruby
{
name: John Doe,
age: 30,
address: Mumbai,
isActive: T,
nature: cool, # valid
requestid: 122120 # invalid
# as the defined type for extra values is string                   
}
```

In the above example, the extra values must be of string type thus passing other values are invalid.

#### Defining schema constraints for extra values

The schema constraints can be defined for the extra values in the schema.  So that the values can be passed accordingly.

{% tabs %}
{% tab title="Example1: Defining Schema Constraint for the Extra Values" %}
```ruby
{ 
  name, age, address, isActive,
 *: {string, maxLen:20, minLen: 4}
} 
---
{
  John Doe, 30, Mumbai, T, nature: cool, 
  department: Human Resource, requestid: "12"
}
```
{% endtab %}
{% endtabs %}

The values must be passed according to the defined constraints in the schema otherwise it will throw an error.

The values will be mapped to the respective keys defined in the schema as shown below,

```ruby
{
name: John Doe,
age: 30,
address: Mumbai,
isActive: T,
nature: cool, # valid
department: Human Resource,  # valid  
requestid: "12" # invalid as minimum lenth of string is 4                  
}
```

In the above example the `request id: "12"` is a string but the minimum length is less than that defined in the schema constrain hence it becomes invalid.&#x20;

### When to use curly braces while defining the schema

While defining a schema the object is not required to be wrap in the curly braces unless it is a child object or the schema of an array. As the schema is the valid object the same is applicable to the schema. &#x20;

The schema may be wrapped in curly braces. While defining the schema, key members must be enclosed in the curly braces if the number of members is more than one.&#x20;

{% tabs %}
{% tab title="Example1: Invalid way of defining schema" %}
```ruby
name, age, address: street, city, state, isActive #invalid
```
{% endtab %}
{% endtabs %}

In the above example, the address will only contain `street`; `city` and `state` are independent keys. To add `street`, `city` and `state` in the `address`, it must be included in the curly braces as shown below,

{% tabs %}
{% tab title="Example2: Valid way of defining schema " %}
```ruby
name, age, address: {street, city, state}, isActive #valid 
```
{% endtab %}
{% endtabs %}

Curly braces are optional if the associated schema accepts less than two values.

{% tabs %}
{% tab title="Example3: When to use Curly braces " %}
```ruby
~ $schema: {
             name, 
             age, 
             address:{street?, city?, state?}, 
             isActive
            }
---
~ John Doe, 30, Elphiston street, T #valid
~ Thomas, 24, z street, California, T #invalid
~ Roy, 22, {River Street, London}, T # valid
~ Alex, 25, {X street, Los Angeles, LA}, T # valid 
```
{% endtab %}
{% endtabs %}

In the above example, line no `9` is invalid as the number of values passed for the address schema is more than one. The `z-street, California` must be included in the curly braces as, `{z-street, California}`

### Optional and Nullable Members in Schema

The multiple optional and nullable members in the same schema should be defined with care as it may lead to invalid mapping.

{% tabs %}
{% tab title="Example: Defining optional keys" %}
```ruby
~ $schema: {
             name, 
             age, 
             address:{street?, city, state?}, 
             isActive
            }
---
~ John Doe, 30, Mumbai, T #invalid
~ Roy, 22, {River Street, London}, T # valid
```
{% endtab %}
{% endtabs %}

In the above example, the `street` is `optional` .  Value `Mumbai` is  passed for the city but it will be assigned to `street` .This is because, if the value is passed it will be first assigned to `optional` key. Therefore it is essential to define schema carefully while using optional keys.&#x20;

### Dynamic Types and Values

&#x20;Many time a member in the schema need to accept values from multiple types. One option would be to use `any` type so that members can accept any value. However, the best option is to use `anyOf` the constraint provided by the `any` type. In the following example, the member `test` can accept any string or number value.

```ruby
test: {any, anyOf:[string, number]}
---
~ One    # valid
~ 1      # valid
~ Two    # valid
~ Three  # valid
~ 2      # valid
~ 3      # valid
```

