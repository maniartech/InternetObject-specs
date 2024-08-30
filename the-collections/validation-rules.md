# Collection Rules

### Collection Without schema

If the schema is not defined, the records in the collection can have a different structure from each other across the document. Here is the code snippet,

```ruby
# Record in the Collection with different structure
---
~ John, 24, {X Street, New York, NY}        # valid
~ true, false                               # valid
~ a, b, c                                   # valid
~ 100, 56, abc                              # valid
~ test, one ,457                            # valid
~ XYZ, 99, female, {X Street, New York, NY} # valid
```

```ruby
# Parsing a collection when the schema is not defined
---
~ John Doe, 20, female
~ true, false
~ marketing, 123, {Z street, Los Angeles, LA}
```

In the above example, the schema is not defined for the collection records so it will be parsed as,

```ruby
# Parsing records in the collection to respective indices
{
"0": "John Doe";
"1": 20;
"2": "Female";
}
{
"0": true;
"1": false;
}
{
"0": "marketing";
"1": 123;
"2": {
      "0": "Z street";
      "1": "Los Angeles";
      "2": "LA";
     }
}

```

{% hint style="info" %}
Even though it is not necessary, it is good practice to define a schema for the collection records.
{% endhint %}

### **Empty Record in Collection**

Sending an empty record is valid only if all the variables defined in the schema are either set to `null` or `optional` or both.

```ruby
# Sending Empty record in the collection
~ A*, B*: {number, default:1}, C?
---
~ James, 36, Mumbai # valid
~ Viki              # valid
~                   # valid
```

Here in the above code snippet `A` and `B` is null and `C` is optional thus sending an empty record is valid. Because just sending a `"~"` means an empty object `{ }`.

```ruby
# Sending an empty record in the collection
~ $address: {street, city, state}
~ $schema: {
    A*, B?*: {
              number,
              default: 1,
              optional: true,
              null: true,
              max:100
              },
    C?: $address,
  }
---
~ James, 20, {X Street, New York, NY}# valid
~                                    # empty but valid
~ 100                                # valid
~ ABC                                # valid
~                                    # empty but valid
~ {Duck street, California, CA}      # valid
```

In the above example, `A` is null, `B` is null and optional and  `C` is optional. So all the keys are either `optional` or `null` or both thus sending an empty record is valid.  Because just sending a `"~"` means an empty object `{ }`.

```ruby
# Sending empty records
~ $schema: {
             name: string,
             age?*: {
                      type: int,
                      default: 1,
                      optional: true,
                      null: true,
                      max: 25
                     }
           }
---
~ John 25   #valid
~ William   #valid
~ Ronald    #valid
~           #invalid as name is not optional or null
~ George 20 #valid
```

In the above example, the invalid record fails while parsing as the name variable is not `optional` or `null`. On the other hand, the `age` variable is `optional` as well as `null` so it is valid to not pass any value for the age variable.&#x20;

### Handling Errors

The Collection enables the parser to parse the rest of the document even if the previous record fails to execute.

If the record fails while parsing, that record state becomes invalid and it does not stop parsing the rest of the document.

```ruby
# Error Handaling in Collections
~ $address: {street, city, state}
~ $schema: {
             name: string,
             age: {int, max:25},
             $address,
           }
---
# collection enables paser to parse next record even if the
# previous record fails to execute
~ James, 20, {X Street, New York, NY}                # valid
~ Alex, 30, {Z Street, Los Angeles, California}      # invalid
~ Bob, 20, {Melrose Street, San Fransisco, California} # valid
```
