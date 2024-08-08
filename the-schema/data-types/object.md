# Object

An object is the fundamental unit of Internet Object document, it can be defined  with the members such as `schema`, `type`,  `default`,  `optional` and `null`. &#x20;

### &#x20;TypeDefs Schema

```yaml
schema?   : {any, anyof: [string, object]},
default?  : {},
type?     : {string, choices: [object]},
optional? : {bool, default: F},
null?     : {bool, default: F}
```

The TypeDef schema ensures the validity of `object` MemberDefs.

#### schema

In the internet object document, the object may or may not be defined with the member called `schema`. But it is always recommended to define the schema for an object.&#x20;

If the schema is not defined then the user can pass an object with values of  `any` type i.e `anyOf: [string, object]`.  &#x20;

```yaml
# An object with schema
a: {{city, state, zip}, ...}

# Assigning schema through memberdef
b: {default: N, schema: {city, state, zip}, null: T}
```

The above code snippet represents how the object can be defined with the typedef member `schema` .&#x20;

#### type

The second member of the typedef is `type`. By default, the object can be of string or an object type. Here the next snippet shows how the object type can be defined.

```yaml
# Set type to object
a: object, b: {type: object}
---
```

#### default

The next member in the `object` typedef is `default` . Here is how the default values can be defined for an object.

```yaml
# Set default value to null for a and b
a?: {object, N}, b?: {object, default: N}
---
```

####

#### null

The Object when set to `null` will accept null values. Here the code snippet demonstrates the way how an object can accept a null value.

```yaml
# Set an empty object to null.
a*: {}

#Assign null value to empty object by setting null: T. 
b: {{}, null: T}

# Set default value of an empty object to null.
c?*: {{}, default: N}

# Set default value of object {x, y, z} to null.
d?*: {{x, y, z}, N}
---
```

#### optional

&#x20;A member of an object type can be set to optional. Here are some of the ways through which a member of an object type can be made optional.

```yaml
# Set an empty object to optional
a?: {}
b?: object

# Set optional: T  for empty object 
b: {{}, optional: T}

# Assign optional value to empty object 
c: {{}, default: N, null: T, default: T}

# Set obect {x, y, z} to optional and null
d*?: {{x, y, z}, N}
---
```

### Designing Object Schema

#### Empty Object

An empty object is useful for accepting any object value irrespective of its structure. The empty object definitions can be created using empty curly braces syntax or ignoring schema. Here are some ways in which empty object definitions can be created.

```yaml
# Defining an empty object
address: {}
#or
address: object
#or
address: {schema:{}}
---
```

#### Simple Object

A simple object is an ordered collection of key-value pair that avoids nesting of the object and may or may not contain a child object as shown in the code snippet.

```yaml
# A simple object as a schema
name, age, address, tags
---
```

```yaml
# A simple object with child object  
address: { street: string, city: string, state: string }
---
```

#### With Memberdef

An object can be defined with the MemberDef as shown in the snippet below.

```yaml
# Defining meberdef for an object
address: {
  schema: {
    street: string, 
    city: string, 
    state: string,
    location*: {
      { lng: number, lat: number }
    default: N,
    null: T
    }
  },
  default: N,
  null: T
}
---
```

#### Nested Object

An Object can be nested inside another object. Accessing a nested object is similar to accessing a nested array. Here is the code snippet that shows how objects can be nested.

```yaml
# Nested object
name: {string, maxLen: 20},
office: { 
  address: {
    street: string, 
    city: string, 
    state: string,
    location*: {
      { lng: number, lat: number }
      default: N,
      null: T
    }
  }, 
   contact: {
   mobile: number,
   fax: number,  
   emails: {
     primary: email,
     secondary: email
    }
  }  
}
```

#### Dynamic Schema

Defining dynamic schema allows users to add a dynamic object as shown in the snippet below.

```yaml
# Defining dynamic schema for an object
address: {
  any, 
  anyOf: [
    {city: string, state: {string: len: 2}}, 
    {street: string, 
     city: string, 
     state: {string: len: 2}, zip?: string}
  ]
}
```

#### Schema or MemberDef

The object can be represented as [MembeDef or Schema](../memberdef.md) as shown here.

```yaml
# The schema directly assigned to the address
address: {street, city, state}

# The schema assinged through the memberDef. This approach 
# allows designer to set additional options such as default.
address?: {{street, city, state}, default: N}
```
