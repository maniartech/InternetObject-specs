# int16

When a variable is classified as an `int16` in the schema then it will be classified as an integer with a size of 16 bits or 2 bytes. The range of values is from `-32768` to `+32767`.

```yaml
# int16 type variable
# all the inputs from -32768 to +32767 will be accepted
TestNumber:{type: int16}
---
~ -32750 # valid
~ 12585  # valid
~ 32765  # valid
~ 32768  # invalid
~ -32770 # invalid

```

### Member Def

The `int16` is derived from the number type that shares the same[ MemberDef ](../#memberdef)as the Number i.e `type`, `default`, `choices`, `max`, `min`, `multipleOf`, `divisibleBy`, `optional` and `null` while enforcing the additional constraint that the number must be of `int16` type. &#x20;

&#x20;By default the `max` value of `byte` type variable is `+32767` and  and `min` is `-32767`.
