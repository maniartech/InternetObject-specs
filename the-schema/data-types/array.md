# Array

An  Internet Object array can be defined  with the members such as `type`, `default`,  `len`,  `minLen`,  `maxLen`,  `optional` and `null`.  Schema of the array TypeDef should be written as,&#x20;

### TypeDef Schema

```yaml
schema?   : {[$type, $memberdef, [any]], default:[any]}
default?  : array,
minLen?   : {int, minLen: 0},
maxLen?   : {int, minLen},
len?      : {int, minLen: 0},
null?     : {bool, F}
optional? : {bool, F}
type?     : {string, choices:[array]}
---
```

The TypeDef schema ensures the validity of `array` MemberDefs.

#### schema

The first member of the internet object array is a schema. When the schema is defined all array items must be validated against the schema. The code snippet demonstrates how the array can be defined with the schema.

```yaml
# An array that can hold any values
a: [],

# An array of number
a: [number],

# An array of address object
c: [{street, city, state}],

# A fixed sized array (len 5) of string that can accept maxLen of 10 characters
d: {[{string, maxLen:10}], len: 5},

# A fixed sized array (len 5) of string
e: {default: [], schema: {[string], len: 5}, optional: T}
---
```

#### default

The next member in the `array` typedef is `default` . Here is how the default values can be defined for an array.

```yaml
# An array with an [] default
a: {array, default: [], optional: T}, 


# An array with a null default
b: {[string], default: N, optional: T, null: T}
---
```

#### **minLen**

The value of `minLen` must be a non-negative integer. The array instance is valid only if,  number of items in the array will be greater than or equal to the value of `minLen`. The code snippet shows how to define `minLen` for an array.

```yaml
# A variable sized array of string with minLen: 3
a: {[string], minLen: 3}
---
```

#### **maxLen**

The value of `maxlen` must be a non-negative integer. The array instance is valid only if, number of items in the array will be less than or equal to the value of the  `maxlen`. Here the code snippet shows how to define `maxLen` for an array.&#x20;

```yaml
# A variable sized array of string witn maxLen:5
a: {[string], maxlen: 5}
---
```

#### **len**

The next member in the `array` typedef is length represented as `len` , it must be a non-negative integer.  The Array instance is valid only if, the number of items in the array will be exactly equal to the value of `len`. Here is how the `len` can be defined for an array.

```yaml
# A fixed sized array with length 5
a: {[string], len: 5}
---
```

{% hint style="info" %}
The `len` has higher precedence over `minLen` and `maxLen` constraints. That is when the `len` is set, the implementations must ignore `minLen` and `maxLen` constraints.&#x20;
{% endhint %}

#### **null**

An array when set to `null` will accept null values. Here the code snippet demonstrates the way how an array can accept a null value.

```yaml
# An array set to null 
a?*: {array, default: N}

# An array that will accept any values.
b: {[], null: T}
---
```

#### optional

&#x20;A member of an array type can be set to optional. Here a code snippet demonstrates different ways how an array can be set to optional

```yaml
# Set an array to optional
a?: []
b?: array

# Assign optional value to an array using optional: T
b: {[], optional: T}

# Set an array to option using default and null 
c: {[], default: N, null: T, default: T}
---
```

#### **type**&#x20;

An array type can be specified as shown in the snippet below.

```yaml
# Set an array type for a, b, c
a: array

b: {type: array}

c: {type: array, schema:[number]}
---
```

### Examples

Some of the valid examples of members with array type are...

```yaml
# Defining an array of numbers
numArray: [number] 
---
[63, 45, 66, 80, 74] 
```



```yaml
# Defining an array of strings
stringArray: [string] 
---
[English, Maths, Physics, Computer Science]
```



```yaml
# An alphanumeric array with a schema
alphaNumArray: {array, schema: {any, anyOf: [string, int]}}
---
[1, a, 2, b, 3, c]
```

The above example can be simplified as,

```yaml
tags: [string, int]
---
[1, a, 2, b, 3, c]
```

An array can have mixed values as shown in the snippet below.

```yaml
# An array that will accept mixed values
mixedArray: [ ] 
---
[one, T, { a:10, b: -Inf, NaN } ]
```

```yaml
# Assigning default: [] to the array of string
~ optionalStringArray?: {[strings], default: [ ]}
---
~ [Eggs, Green salad]            # String Array
~                                # Default is empty array []
```

```yaml
# Assigning default  and schema to the array
object?: {array, default: [{N, N}], schema: [{ header*, footer*}]}
---
~ [{Hello, World}]      # array of object       
~                       # default is array of null object
```



```yaml
# A fixed sized array of string with len: 5 
fixedSizedStringArray: {[string], len: 5}
---
[ Wings of Fire,
  Ignited Minds, 
  Indomitable Spirit, 
  India 2020, 
  Turning Points ]
```



```yaml
# A variable sized array of objects with maxLen: 4.
address:{
  [{street: string, city: string, zip: {string, len: 5}], 
  maxLen: 4
}
---
 [ {Bond street, New York, 50001}, 
   {X street, Hollywood, 30001}, 
   {Maple street, Tennessee, 80007},
   {Union street, Montclair, 45003} ]
```

### Nested Arrays

An array containing another array represents a nested array as shown in the code snippet.

```yaml
# Nested array 

enggDepartment: [
  {deptName: string, 
    deptSubject: {[string], maxLen: 5}}
    ]
---
[computer Science, {[data structure, Language Processing]}]
 
```

### Multidimensional Array

A multidimensional array is an array with more than one dimension. Two and three-dimensional arrays are called multidimensional arrays. Here is the code snippet that demonstrates how a multidimensional array is represented.&#x20;

```yaml
# Two-Dimensional array
matrix: {[{[int], len:3}], len: 3}
---
[[1, 1, 1], [1, 1, 1], [1, 1, 1]]
```

```yaml
# Three-Dimensional array 
matrix: {[[{[int], len:3}], len: 3], len: 3}
---
[
  [[5, 1, 2], [2, 2, 1], [8, 5, 1]],
  [[4, 1, 8], [4, 6, 2], [4, 0, 2]],
  [[9, 1, 5], [1, 8, 1], [4, 2, 2]]
]
```

