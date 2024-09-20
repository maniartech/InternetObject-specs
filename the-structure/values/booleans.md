---
description: Booleans in Internet Object
---

# Bool

Boolean values are represented using `T` and `F`. `true` and `false`. The true values can be represented using `T` or `true` keywords. The false values can be represented using `F` or `false` keywords.&#x20;



![The Boolean Structure](https://lh6.googleusercontent.com/Y1tPl6h6Mv\_Rp9g76lfcDPUjK5VXYKM9p2tj28gcgaM3x6fzF-znsZj8cBwtpPXRZEGVeKRcAxrpQGNfZe5oCIxARgqmHmxWi0uX4O5aAAl2wn0VYJFemb9UUad4HFyYeZhVe1bS)

| Chars   | Char Code                     | Detail                   |
| ------- | ----------------------------- | ------------------------ |
| `T`     | `U+0054`                      | The uppercase letter `T` |
| `F`     | `U+ 0046`                     | The uppercase letter `F` |
| `true`  | `U+0074	U+0072	U+0075 U+0065` | The keyword `true`       |
| `false` | `U+0078`                      | The keyword `false`      |

{% hint style="info" %}
It is recommended that the keywords **T** and **F** keywords are preferred while denoting true and false values respectively.
{% endhint %}

In the following example, `isActive` is of boolean type and will accept only boolean values i.e `T`,  `F`,  `true` ,  `false`.

```ruby
name: string, age: number, isActive: bool
---
~ John Doe, 30, T
~ Jane Doe, 25, F,
~ Peter Peterson, 28, false
~ Jack Jackson, 30, true
```

