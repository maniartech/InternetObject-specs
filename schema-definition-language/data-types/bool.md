# Bool

A boolean data type is used to assign boolean values to the variable i.e True and False. A boolean can be defined  with the members such as `type`, `default`, `optional` and `null`. Schema of the array TypeDef should be  written as,&#x20;

### TypeDef Schema

```yaml
type?     : {string, choices: [bool]} 
default?  : bool,
optional? : {bool, F},
null?     : {bool, F}
```

The TypeDef schema ensures the validity of `bool` MemberDefs.

#### type

The first member of the  `bool` typedef is `type`. The next snippet shows how to define a boolean type. We can pass only two values i.e true or false. It can be represented as `T`, `true`, `F`, `false`.

```yaml
# Set type to bool 
a: bool, b: {type: bool}
---
```

#### default

The next member of the `bool` typedef is `default`.  The code snippet shows how to define a default for the `bool` type. The default values are used during the processing of data/instructions if a value is not provided for a key.

```yaml
# Boolean a and b with default value set to false
a?: {bool, false}, b?: {bool, default: false}
---
```

#### optional

A member can be marked as optional. If `optional` is set to true. The value of an `optional` must be boolean type i.e `true` or `false`.  Here, are some ways the the member of bool type can be marked as optional.

```yaml
# Boolean a and b set to optional
a?: bool, b?: {bool, optional: true}
---
```

#### null

When  `null` is set to true, a member can accept null values. The following snippet shows how to set a member of the bool type to null.&#x20;

```yaml
# Set a, b so that it will accept null values  
a*: bool, b*: {bool, null: true }
---
```

### Examples

Here are some valid examples of members with `bool` type...

```yaml
# The members accOpen and verified are assign to bool type
accOpen: bool, Verified: {type: bool}

# The exServicemen is of bool type and default value is false
exServicemen: {bool, false}

# The regClose is set to optional and null.
regClose?*: {bool, optional: true, null: true} 

```
