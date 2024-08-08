# int32

When a variable is classified as an `int32`  type in the schema then it will be classified as an integer with a size of 32 bits or 4 bytes. The range of values is from `-2,147,483,648` to `2,147,483,647`.

```yaml
# int32 type variable
# only accepts inputs in the range -2147483648 to +2147483647

Test_number: {type: int32}
---
~ 100567       # valid
~ 2147483647   # valid
~ -2147483647  # valid
~ -2147483650  # invalid
~ 8222353666   # invalid

```

### Member Def

The `int32` is derived from the number type that shares the same[ MemberDef ](../#memberdef)as the Number i.e `type`,  `default`,  `choices`,  `max`,  `min`,  `multipleOf`, `divisibleBy`,  `optional` and `null` while enforcing the additional constraint that the number must be of `int32` type.&#x20;

By default the `max` value of `byte` type variable is `2,147,483,647` and  and `min` is `-2,147,483,648`.
