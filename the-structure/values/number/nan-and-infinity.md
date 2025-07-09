---
description: Special numeric values NaN and Infinity in Internet Object
---


# Special Numeric Values: NaN and Infinity

Special numeric values in Internet Object represent mathematical concepts of "Not a Number" and infinite values. These are used to handle edge cases in numerical computations, such as division by zero or invalid mathematical operations. These values follow IEEE 754 standards and provide a way to represent undefined or infinite results within numeric operations.

## Syntax

Special numeric values are expressed as literal keywords:

```ebnf
specialValue = nanValue | infinityValue
nanValue = "NaN"
infinityValue = ["+" | "-"] "Inf"
```

## Structural Characters

| Symbol | Name      | Unicode  | Description                    |
| ------ | --------- | -------- | ------------------------------ |
| `NaN`  | Not a Number | Multiple | Represents invalid numeric result |
| `Inf`  | Infinity  | Multiple | Represents infinite value      |
| `-`    | Minus Sign| `U+002D` | Indicates negative infinity    |
| `+`    | Plus Sign | `U+002B` | Optional positive indicator    |

## Valid Forms

```ruby
NaN                  # Not a Number
Inf                  # Positive infinity
-Inf                 # Negative infinity
+Inf                 # Positive infinity (explicit)
```

## Optional Behaviors

### Literal and Alternate Forms

Special values have fixed representations:

```ruby
NaN                  # ✅ Standard form
Inf                  # ✅ Positive infinity
-Inf                 # ✅ Negative infinity
+Inf                 # ✅ Explicit positive infinity
```

### Mathematical Behavior

Special values follow IEEE 754 semantics:

```ruby
# NaN comparisons always return false
NaN == NaN           # false
NaN != NaN           # true

# Infinity comparisons
Inf > 100            # true
-Inf < 0             # true
```


## Invalid Forms

```ruby
nan                  # ❌ Lowercase not allowed
NAN                  # ❌ All caps not allowed
inf                  # ❌ Lowercase not allowed
INF                  # ❌ All caps not allowed
infinity             # ❌ Full word not supported
-NaN                 # ❌ NaN cannot be signed
```


## Preservation of Structure


Internet Object preserves:

- The exact representation of special values
- Negative sign for negative infinity
- Syntactic fidelity (as written, except that an explicit plus sign is not preserved)

However, it does **not** interpret:

* The mathematical operations that led to these values
* Domain-specific handling of special cases
* Comparison or equality semantics

Such semantics are the responsibility of the **schema layer**, **validators**, or **application logic**.

## See Also

* [Number](./number.md) - For standard floating-point numbers
* [Values](../../values/README.md)

