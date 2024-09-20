# byte

When a variable is classified as a `byte` then the data will be accepted only if it is an integer with the size of a byte or 8 bits. A byte may have, decimal, hexadecimal, octal or binary values. The range of values is from `-127` to `+128`.&#x20;

```yaml
# Byte type variable
testNumber: byte 
---
~ 100 
~ -120 
~ 0xFF        # Hexadecimal Representation
~ 0b01111111  # Binary Representation
~ 0c111       # Octal Representation

```

The `byte` is derived from the number type that shares the same[ MemberDef ](../#memberdef)as the Number i.e `type`, `default`, `choices`, `max`, `min`, `multipleOf`, `divisibleBy`, `optional` and `null` while enforcing the additional constraint that the number must be of byte type.  &#x20;

By default the `max` value of `byte` type variable is `128` and  and `min` is `-127`.
