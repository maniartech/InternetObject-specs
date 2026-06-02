# Complex Schema

The header section of the internet object document can have single or multiple schema definitions

```ruby
~ $address: {
    street: string, 
    zip:{string, maxLength:5},
    city: string
  }
~ $person: {
    name:string,
    age:int,
    homeAddress?:$address,
    officeAddress?:$address
  }
~ $schema: $person
---
Spiderman, 25, {Queens, 50010, New York}, {Bond Street, 50001, New York}
```

In the above example, the schema definitions are created for reuse to improve the readability of a schema. The schema definition created for address is reused in the `person` schema definition.&#x20;
