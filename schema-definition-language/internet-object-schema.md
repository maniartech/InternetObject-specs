# Internet Object Schema

Internet Object is a schema first format! The Internet Object schema defines the shape and structure of Internet Object documents and helps the developers and designers to create the object definitions in a simple, concise, clear, and human-readable way.

The schema asserts the shape of the IO objects and ensures the validity of the data during the serialization and deserialization process.&#x20;

The schema may be attached and placed in the document header or kept separately. Internet Object schema provides a simple way to define the object structure!

![The schema structure (whitespaces are not shown)](https://lh4.googleusercontent.com/5dLQVGwOqEXVaPw-X33NBAB8fZtMrKEO1FTRr7LvHnKdwAl57YvsLehQ21mGtw0f1ExcaG1VhGbO\_bUHGOe\_kNY4VfhBYILCRCa6OtB38Zepu3r9-\_vLq\_Uax2pZvcA65ahERaLt)

In its simplest form, an object schema is just an object with a list of required members. The following example represents the schema with five keys i.e `name`, `age`, `address`, `isActive`, `remark`  which are separated by `","`.

```ruby
#Schema with the valid representation
name, age, address, isActive, remark 
```

A schema can be embedded in the IO document header or defined independently. The following example shows the schema embedded into the document itself. The upper section declares the schema while the lower section contains the object.

```ruby
# Schema with the valid representation
name, age, address, isActive, remark 
---
John Doe, 20, {Bond Street, New York}, T, Nothing
```

The schema in the previous example lacks the datatypes. Since the keys are not associated any data type, the default datatype is `any`. That means the value for the `name` field could be `John Doe`, `T` or `999` or anything.

We can attach types and sub-schema to the keys to add more constraints and clarity.

```yaml
# Schema with the members associated with types
name: string,
age: int, 
address: {
  street: string, 
  city: string, 
  state: string
}, 
isActive: bool, 
remark: string
```

Here `name`, `age`, `address`, `isActive`, and `remark`  are defined with the type `string`, `int`, `object`, `bool` and `string` respectively.
