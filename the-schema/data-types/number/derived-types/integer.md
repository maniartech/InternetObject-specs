# int

When a variable is classified as an `int` then it will accept all the integers including signed and unsigned integers. It will not accept float values.&#x20;

The Integer must be represented  using one or more ASCII digits (`0 U+0030` to `9 U+0039`),  prefixed with or without the minus sign `(- U+002D)`. The integer must not contain a decimal point as some language validators will accept it and some will not.

```yaml
# Set testNumber to int   
testNumber: int
---
~ 101254666452                         # valid
~ -12125987566459963311323664566130236 # valid
~ 12546632.4254563                     # invalid
~ 20.0                                 # invalid
~ 123645.2536                          # invalid
```

### MemberDef

The `int` is derived from the number type that shares the same[ MemberDef ](../#memberdef)as the Number i.e `type`, `default`, `choices`, `max`, `min`, `multipleOf`, `divisibleBy`, `optional` and `null` while enforcing the additional constraint that the number must be of integer type.  &#x20;





####



####



