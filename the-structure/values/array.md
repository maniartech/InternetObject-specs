---
description: Arrays in Internet Object
---

# Arrays

An array is represented by a pair of square brackets, which may contain zero or more values. It begins with an open square bracket ([ U+005B) and ends with a close square bracket (] U+005D). Each value is separated by commas (`,` `U+002C`). Essentially, an array is expressed as **a sequence of values separated by commas** enclosed in square brackets.

## Syntax

<figure><img src="../../.gitbook/assets/array-structure.png" alt=""><figcaption><p>Array Syntax</p></figcaption></figure>

### **Array Structural Characters**

| Symbol | Characters          | Unicode  | Description               |
| ------ | ------------------ | -------- | ------------------------- |
| `,`    | Comma             | `U+002C` | Used as a value separator |
| `[`    | Open Square Bracket  | `U+005B` | Begins an array boundary  |
| `]`    | Close Square Bracket | `U+005D` | Closes an array boundary  |

## Characteristics

Arrays can contain values of various types, including objects, other arrays, strings, numbers, boolean, and null.

### Basic Arrays

A simple array of strings:

```ruby
[one, two, three]
```

An array of objects:

```ruby
[{ a, b, c }, {j, k, l}, { x, y, z }]
```

An array with mixed values:

```ruby
[one, T, { a:10, b: -Inf, NaN }]
```

### Multi-dimensional Arrays

Arrays can be nested to create multi-dimensional data structures.

#### Two-dimensional Arrays

Two-dimensional arrays represent rows and columns:

```ruby
[[1, 1, 1], [1, 1, 1], [1, 1, 1]]
```

#### Three-dimensional Arrays

Three-dimensional arrays represent collections of two-dimensional arrays:

```ruby
[
   [[10,20,30],[40,50,60],[70,80,90]], # elements of block 1
   [[11,22,33],[44,55,66],[77,88,99]], # elements of block 2
   [[12,23,34],[45,56,67],[78,89,90]]  # elements of block 3
]
```

### Empty Arrays and Empty Values

An empty array is represented by a pair of square brackets with no values:

```ruby
[]      # An empty array
```

Empty values between array elements are not permitted. To include a missing value, you must explicitly specify a valid value such as `null`. However, since the Internet Object specification neither assumes `null` by default nor supports `undefined`, any omission is strictly forbidden. Following are some examples of invalid array structures:

```ruby
[a,b,] # Trailing comma
[a,,c] # Array with an empty value in the middle
```
