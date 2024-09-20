# Any

Any data type is used to assign any type of value to the variables. It is useful in the case where either the actual type is not known or types are needed to be dynamically assigned. Thus for undefined type, the default type will be always set to  `any` . &#x20;

Any type can be defined with the members such as `type`,  `default`,  `choices`, `anyOf`, `optional`, and `null` .  Schema of `any` TypeDef should be  written as,

### TypeDef Schema

```yaml
type?     : {string, default: any, choices: [any]},
default?  : any,
choices?  : [any],
anyOf?    : [$memberDef],
null?     : {bool, default: F},
optional? : {bool, default: F}
---
```

The TypeDef schema ensures the validity of `any` MemberDefs.

#### type

As with most of the types in Internet Object, the first member of typedef is `type`. The next snippet shows different ways to define the members `a`, `b`, and `c` as `any`.

```yaml
# Type set to any
a, b: any, c: {type: any}
---
```

#### default

The second member in the `any` typedef is `default` . Here is how the default values can be defined.

```yaml
# Set default value for a and b
a?: {any, Monday}, b?: {any, default: N}
---
```

Here, the default value for `a` is  `Monday` and default value for `b` is `null` .

#### choices

The `choices` restricts the member to be strictly bound with the unique constant values. If set, the choices must be an array of any type of value. The code snippet shows how `choices` can be defined for the `any` type.&#x20;

```yaml
# Defining choices for member
a: {any, choices: [1, One, 2, Two, 3, Three]}
---
```

#### anyOf

In some cases, a member must accept different kinds of values. Such as, a number could be a multiple of 3 or a multiple of 5; they could be a string or number but not that of other types; two different formats of the schema. The`anyOf` allows schema designers to define members that can accept different kinds of constrained values. It accepts an array of MemberDef and/or schema and types.

```yaml
member: {any, anyOf?: [$memberDef, type, schema]}
---
```

This snippet explains how `a` , `b` and `c` can accept various kinds of values.&#x20;

```yaml
# Can accept multipole of 5 or multiple of 3
a: {any, anyOf: [{int, multipleOf: 5}, {int, multipleOf: 3}]},

# Can accept string or number values
b: {any, anyOf: [string, number]

# Can accept any of two type of address!
c: {any, anyOf: [{city, state}, {street, city, state}]}
---
```

#### null

When set `null` to true, a member can accept null values. Here are some of the ways through which a member of any type can accept null values.

```yaml
# Set default value of a, b, c, d to null
a*, b*: any, c: {any, null: T}, d: {any, null: true}
---
```

#### optional

When set `optioanl` to true, a member can be marked as optional. Here are some of the ways through which a member of any type can be made optional.

```yaml
# Set a, b, c, and d to optional
a?, b?: any, c: {any, optional: T}, d: {any, optional: true}
---
```

### Examples

Some of the valid examples of members with `any` are...

```yaml
# The members a, b, and are by default assigned the any type.
a, b, c

# The name is any and default value is null
name: {any, N}

# The numWord can accept any string or number value.
numWord: {any, anyOf: [string, number]} 
```

&#x20;
