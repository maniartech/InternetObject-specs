---
status: candidate
description: The special numeric values NaN and Infinity.
---

# NaN and Infinity

The special numeric values represent "Not a Number" and infinite quantities, following IEEE
754. They model the edge cases of numeric computation — an undefined result, or a value beyond
the finite range. Only the Number form supports them; BigInt and Decimal do not.

## Syntax

The special values are written as fixed keywords:

```ebnf
specialValue  = nanValue | infinityValue
nanValue      = "NaN"
infinityValue = ["+" | "-"] "Inf"
```

## Structural elements

| Token | Name | Description |
| ----- | ---- | ----------- |
| `NaN` | Not a Number | An undefined or unrepresentable numeric result |
| `Inf` | Infinity | A value beyond the finite range |
| `-` | Minus sign | Negative infinity (`-Inf`) |
| `+` | Plus sign | Explicit positive infinity (`+Inf`); not preserved |

## Valid forms

```ruby
NaN                  # Not a Number
Inf                  # positive infinity
-Inf                 # negative infinity
+Inf                 # positive infinity (explicit sign, not preserved)
```

## Not the special value

The special values are **case-sensitive and spelled exactly**. Any other spelling is not an
error — it is simply parsed as an open string (text), so it is *not* the numeric special value:

```ruby
nan                  # open string "nan", not NaN
INF                  # open string "INF", not Inf
infinity             # open string "infinity", not Inf
-NaN                 # open string "-NaN" — NaN cannot be signed
```

> To store one of these as a number, write it exactly: `NaN`, `Inf`, `-Inf`, or `+Inf`. To
> store the word as text, quote it: `"infinity"`.

## Preservation of structure

Internet Object preserves:

- The exact special value written
- The sign of negative infinity
- Syntactic fidelity as written, except that an explicit `+` sign is not preserved

It does **not** interpret:

- The operations that produced these values
- Comparison or equality semantics (for example, that `NaN` equals nothing, including itself)

Those semantics belong to the application.

## See Also

- [Number](number.md) — standard floating-point numbers
- [Numeric Values](README.md) — all numeric forms
