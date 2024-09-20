# Number

A number type can be defined with the members such as `type`,  `default`, `choices`,  `min`,  `max`,  `multipleOf`,  `divisibleBy`,  `optional` and `null`.  Schema of the number TypeDef should be  written as,&#x20;

### TypeDefs Schema

```yaml
type?       : {number, 
  choices: [number, int, int16, int32, byte]},
default?    : number,
choices?    : [number],
min?        : number,
max?        : number,
multipleOf? : number,    
divisibleBy?: number,
null?       : {bool, F}
optional?   : {bool, F}
```

The TypeDef schema ensures the validity of `number` MemberDefs.

#### type&#x20;

The first member of the typedef is `type`. The number can be of type `number` or its derived types i.e `int`, `int16`,  `int32`, `byte`. Here the next snippet shows how the `number` type and its derived types can be defined.

```yaml
# Set type to number
a: {type: number} 
# OR 
a: number
---
```

```yaml
# Defining number derived types

# Set type to int
a: int, 

# Set type to int16
b: int16, 

# Set type to int32
c: int32, 

# Set type to byte
d: byte, 
---

```

#### **default**

The second member in the `number` typedef is `default` . Here is how the default values can be defined for a number.

```yaml
# Assign default value for a as 1.
a: {number, default: 1, optional: T}


# Set b with a null default
b: {number, default: N, optional: T, null: T}
---
```

**Rules for default:**

1. The default value is applicable only if no other value is provided for the key.
2. If for a key,  null is set to true then it must be replaced by its default value.
3. The default value when set must match with the data type of a key.&#x20;

#### **choices**&#x20;

The `choices` can be added to member variables in numbers so that the input values are restricted to the fixed set of available choices.  Choices must be an array of numbers. The code snippet shows how to add choices.

```yaml
# Adding choices 
a: {number, choices: [234, 245, 456, 324]}
---
```

#### **max**

The `max` represents the maximum value of a key, that must be a number. The numeric instance  `max` is valid only if its value is less than or equal to the value of the `max`. Here is the snippet that shows how to set `max`  value for a number.

```yaml
# Set max: 25 for a number
a: {number, max: 25}
---
```

#### min

The `min` represents the minimum value of a key, that must be a number. The numeric instance  `min` is valid only if its value is greater than or equal to the value of the `min`. Here is the snippet that shows how to set `min`  value for a number.

```yaml
 # Set min: 3 for a number
 a: {number, min: 3}
```

#### multipleOf

The  `multipleOf` is used to restrict the value to multiples of a given number. The Value of `multipleOf`  must be a positive integer. The code snippet shows how to restrict the input value to the multiple of the desired number.&#x20;

```yaml
 # Set member def multipleOf: 5 for number
 a: {number, multipleOf: 5}
 ---
```

#### **divisibleBy**

The `divisibleBy` is used to restrict the value to divisible by of a given number as shown below.

```yaml
 # Set member def divisibleBy: 5 for a number
 a: {number, divisibleBy: 5}
---
```

#### **optional**

The member of a number type can be set to `optional`. Here is the code snippet that demonstrates how a number can be set to optional.

```yaml
# Set number to optional
a?: number

# Assign otional: true to number
a?: {number, optional: true}

# Set number to optional using optional and null
a?: {number, default: N, null: T}

```

### null

A number when set to `null: true` will accept null values. The snippet below shows how to set a nullable number.

```yaml
# Set number to null 
a*: {number, null: true}
```

### Examples

Here are some of the examples that demonstrate how to define number member definition.

```yaml
# Add choices to subjectCode 
subjectCode: {number, choices: [234, 245, 456, 324]}
```

```yaml
 # Set max value for age
  age: {number, max:25}, 
---
~  18 # valid
~  25 # valid
~  35 # invalid as the value is greater than max value
```

```yaml
# Set min value for age 
  age: {number, min: 18}, 
---
~ 25, Male # valid
~ 17, Male # invalid
```

```yaml
# Set multipleOf: 5 for the input value of rollNo
rollNo: {number, multipleOf: 5}
---
~ 10 # valid
~ 25 # valid
~ 30 # valid
~ 95 # valid
~ -10 # valid
~ 34 # invalid
~ 12 # invalid
```

```yaml
# Set divisibleBy: 12 for a rollNo
rollNo: {number, divisibleBy: 12}
---
~ 48 # valid
~ 60 # valid
~ 96 # valid
~ 120 # valid
~ -36 # valid
~ 8 # invalid
~ 55 # invalid
```

```yaml
#Set age to optional
age?: {type: number, default: 1, optional: true, max: 30}

```

```yaml
 # Set age to null
 age*: {type: number, default: 1, null: true, max: 30}
```

```yaml
# Set age to optional with default: 1 and max: 30
age?*: { number, 
        default: 1, 
        optional: true,
        null: true,  
        max: 30}
---
~ 20 #valid
~ 30 #valid
~ N  #valid
~ 15 #valid
```

###

####

####
