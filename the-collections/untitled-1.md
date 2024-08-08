# Collection

A Collection is a record aggregator that allows sending multiple records over the internet without repetitively defining a key-value pair. The Collection embeds more than one independent record in the IO document.&#x20;

### Benefits

Collection reduces the complexity of defining key**-**value pairs every time a record is sent over the internet. Thus, simplify application development by offering data parallelism and operational simplicity.&#x20;

The collection permits an internet object document to have multiple records with different types and structures independent of each other.

### Collection Structure

The Collection must be represented with the tidal sign `(~ U+007E)` followed by the object and separated by the whitespace as shown in the Collection structure.&#x20;

![The Collection Structure](https://lh5.googleusercontent.com/nLLBJyQMPrxp3981hkXXVzXt\_YIPmOWTRznffghDqXO5PbAqf7ifUwo67PYdxuOtF5LgeGF2IAedZUDOdQ3zTWvu5K7nm-YQM9\_Bzq82t-ZaI1ffLeJA7eM73Ijnq5YfL-uD5vNB)

{% hint style="info" %}
Whitespaces surrounding the tokens, keys, and values are optional.
{% endhint %}

The tidal sign enables the parser to identify the next record. Here is a code snippet that shows how to represent a collection.

```yaml
# Representing a collection in the Internet Object document
~ Id, empName, age, department, Address  
---
# Following records represents Collection
~ 101, Thomas, 25, HR, {Bond Street, New York, NY} 
~ 102, George, 30, Sales, {Duke Street, New York, NY}
```



