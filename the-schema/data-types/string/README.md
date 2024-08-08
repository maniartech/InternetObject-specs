# String

A string type can be defined with the members such as `type`, `default`, `choices`, `pattern`, `minLen`, `maxLen`, `len`, `optional`, and `null` .  Schema of the string TypeDef should be  written as,

### TypeDef Schema

```yaml
type?    : {
  string, choices: [string, email, url, datetime, date, time]
  },
default? : string,
choices? : [string]
pattern? : string,
minLen?  : {int, min: 0},
maxLen?  : {int, min: 0},
len?     : {int, min: 0}
optional?: {bool, F}
null?    : {bool, F}

```

The TypeDef schema ensures the validity of `string` MemberDefs.

#### type&#x20;

The first member of the typedef is `type`. The string can define with a type `string` or its derived types i.e `email`, `url`,  `datetime`, `date`, `time`. Here the next snippet shows, how the string type and its derived types can be defined.

```yaml
# Defining string type 
a: string, b: {type: string}
---
```

```yaml
# Defining string derived types

# Set type to email
a: email, b: {type: email}

# Set type to url
a: url, b: {type: url}

# Set type to datetime
a: datetime, b: {type: datetime}

# Set type to date
a: date, b: {type: date}

# Set type to time
a: time, b: {type: time}
---
```

#### default

The second member in the `string` typedef is `default` . Here is how the default values can be defined for a string.

```yaml
# A string with default: Monday
a: {string, default: Monday, optional: T}, 


# A string with a null default
b: {string, default: N, optional: T, null: T}
---
```

#### **Rules for default:**

1. The default value is applicable only if no other value is provided for the key.
2. If for a key,  null is set to true then it must be replaced by its default value.
3. The default value when set must match with the data type of  a key.&#x20;

#### **Choices**

The next member in the `string` typedef is `choices` . If set, the choices must be an array of strings. Here the snippet shows how the `choices` can be added to member variables in a string so that it is restricted to the fixed set of available choices.

```yaml
# Add choices for the member 
a: {string,  choices: [abc, "123", "MH4458"]}
---
```

#### Pattern

The value of the `pattern` must be a String. The string value passed should be a valid Regular Expression. The data will be then validated according to the Regular Expression and passed accordingly. Regular Expression can be defined in the schema by using  `pattern`  in the schema of a string.

Different versions of schema can be created and executed for patterns in the programming environment. But to remain compatible with the host environment, it is better to stick to the constraints described below.

* A single Unicode character, other than the special characters specified below matches itself.
* (`.` `U+002E`): Matches any character except newline character (`U+000A`).&#x20;
* (`^` `U+005E`): Matches only at the start of the string.
* (`$` `U+0024`): Matches only at the end of the string.
* (`...`): Assembles the sequence of regular expressions into a single regular expression.
* (`|` `U+007C`): Matches the regular expression either preceding or following with the `"|"` symbol.
* `[abc]`: Matches any of the characters enclosed by the square brackets.
* `[a-z]`: Matches the range of characters enclosed by the square bracket.
* `[^abc]`: Matches any character not in the list.
* `[^a-z]`: Matches any character out of the given range.
* (`+` `U+002B`): repeats the preceding regular expression one or more times and is greedy as they match as many items as possible.
* (`*` `U+002A`): repeats the preceding regular expression zero or more times and greedy as they match as many items as possible.
* (`?` `U+003F`): makes the preceding regular expression optional. Greedy, matches zero or one preceding regular expression. &#x20;
* `+?`, `*?`, `??`: The `*`, `+`, and `?` qualifiers are used to match as much text as possible which is not always desired.&#x20;
* (`?!x`), (`?=x`): Negative and positive lookahead.
* `{x}`: Match exactly x occurrences of the preceding regular expression.
* `{x,y}`: Match at least x and at most y occurrences of the preceding regular expression.
* `{x,}`: Match x  or more occurrences of the preceding regular expression.
* `{x}?`, `{x,y}?`, `{x,}?`: Lazy versions of the above expressions.

```yaml
# Set pattern for the input string
a: {string, pattern:'^(\+[0-9]{3})?[0-9]{10}$'}
---
```

#### **maxLen**

The value of `maxLen` must be a non-negative integer. The string instance is valid only if the number of characters in the string will be less than or equal to the value of `maxLen`. Here is the snippet showing how to assign maxLen.

```yaml
# Assign maxLen:30 for input string 
a: {string, maxLen: 30}
---
```

#### **minLen**

The value of `minLen` must be a non-negative integer. The string instance is valid only if the number of characters in the string will be greater than or equal to the value of `minLen`. Here is the snippet showing how to assign minLen.

```yaml
# Assign minLen:3 for input string 
a: {string, minLen: 3}
---
```

#### **len**

The value of length represented as `len`  must be a non-negative integer. The string instance is valid only if the number of characters in the string will be equal to the value of `len`.  The code snippet shows how to assign `len`.

```yaml
# Assign len: 9 for the input string
a: {string, len: 9}
---
```

{% hint style="info" %}
&#x20;The`len` have the highest precedence over `minLen` and `maxLen` constraints. When the `len` is set, the implementation must ignore `minLen` and `maxLen` constraints.&#x20;
{% endhint %}

#### **optional**

The member of a string type can be set to optional. Here is the code snippet that demonstrates how a string can be set to optional.

```yaml
# Set a to optional
a?: string 

# Assign optional: true for a 
a?: {string, optional: true}

```

#### **null**

A string when set to `null: true` will accept null values. The snippet below shows how to set a nullable string.

```yaml
# Set default value of string to null 
a*: {string, null: true}
```

### Examples

Here are some of the examples that demonstrate how to define string member definition.

```yaml
# String and its derived types
contactDetails : {string, address: {street: string, 
city: string, state: string, default: New York}, 
emailId: email, websiteUrl: url}
---

```

```yaml
#  A name with default value set to anonymous
 name?*: {string, anonymous, ,'[ a-z A-Z]', 5, 50}
---
~       # valid
~ N     # valid
~ John  # valid
```

In the above snippet, `name` can be kept `optional` and `null`. When no value is passed for the name then, its default value is set to `anonymous`. The  `name` should be a string containing characters from a to z (upper or lower case) with a minimum length of 5 and a maximum length of 50. \


```yaml
# Add choices for the department
department: {
             type: string, 
             choices: [computer_science, Mechanical,
             Civil, Electrical, Information_Technology]
             }
```

Here the code snippet shows that the users can only select the department provided in `choices` i.e  input is restricted to the set of available departments.

```yaml
# Add choices for the location
location: {
           type: string, 
           choices: ["19.020216, 72.853729" ,
           "19.242547, 73.130399" , 
           "28.649840, 77.233848"]
           }
```

In the above code snippet, users can select the location provided in `choices` i.e the input is restricted to the set of available locations ( locations are enclosed in double-quotes to pass numeric data as string ).

```yaml
# Add pattern that will only accept valid mobile number
mobileNumber: {string, pattern:'^(\+[0-9]{3})?[0-9]{10}$'}
---
~ "+915789654123" #valid
~ "5789654123"    #valid
~ "578965412"     #invalid as does not follows specified pattern
~ "915789654123"  #invalid as does not follows specified pattern

```

```yaml
# Add pattern that will only accept valid social security no. 
socialSecurityno: {
                   string, 
                 pattern: '^(\[0-9]{3})-\[0-9]{2}-\[0-9]{4}$'
               }
---
~ "123-45-6789" #valid
~ "235-26-0012" #valid
~ "1235-12"     #invalid as does not follows specified pattern
~ "123-12365"   #invalid as does not follows specified pattern
~ "12345678"    #invalid as does not follows specified pattern
```



```yaml
# Set maxLen of an input string to 30
name: {string, maxLen: 30}
---
John
```

```yaml
# Set minLen of an input string to 3
name: {string, minLen: 3}
---
Lee
```



```yaml
# A name with minLen: 5 and maxLen: 20 
name: {string, minLen: 5, maxLen: 20}
---
~ Ethan
~ Albert
~ Alexandra Daddario
~ Leonardo DiCaprio
# following input will not be accepted as minLen is 5
~ Leo 
~ Alex
# following input will not be accepted as maxLen is 20 
~ Venkata Narasimha Raju Vari Peta 
```

####

```yaml
# A name with len:9  
name: {string, len: 9}
---
Elisabeth
```



```yaml
# Set string to optional
address?: {string, optional: T}
---
```



```yaml
# Set string to null
address*: {string, null: T}
---
```



```yaml
# Set string to optional and null
address?*: {string, optional: T, null: T}
---
~ Mumbai India
~ New York US
~ N
~ California
```

###
