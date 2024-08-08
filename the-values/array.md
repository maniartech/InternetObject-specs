---
description: Arrays in Internet Object
---

# Array

An array is represented using the pair of square brackets surrounding zero or more values. Each value is separated by commas. The array starts with an open square bracket `([ U+005B)` and ends with a close square bracket  `(] U+005D)`.&#x20;

![The Array Structure](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/0\_0?a=18531\&x=4123\&y=1635\&w=824\&h=341\&store=1\&accept=image%2F\*\&auth=LCA%201735d785667faea87b8a53f4a46a7c46f5cf3f10-ts%3D1608203761)

### An Array Walkthrough

A string array.

```
[one, two, three]
```

An object array.

```
[{ a, b, c }, {j, k, l}, { x, y, z }]
```

An array with mixed values.

```
[one, T, { a:10, b: -Inf, NaN } ]
```

#### Multi-dimensional Arrays

A Two-dimensional array represents rows and columns. &#x20;

```ruby
# Two-dimentional Array
[[1, 1, 1], [1, 1, 1], [1, 1, 1]]
```

A three-dimensional array is a multidimensional array that represents a collection of two-dimensional arrays.

```ruby
# Three-dimentionali Array
[
   [[10,20,30],[40,50,60],[70,80,90]], # elements of block 1   
   [[11,22,33],[44,55,66],[77,88,99]], # elements of block 2
   [[12,23,34],[45,56,67],[78,89,90]]  # elements of block 3
 ]
```

