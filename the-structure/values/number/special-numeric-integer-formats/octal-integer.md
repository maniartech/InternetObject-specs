# Octal Integer



Internet Object supports octal non-fractional integer values. The octal integer may be prefixed with optional plus or minus signs and must start with `0c` or `0C` literal characters. It is then followed by one or more octal digits.&#x20;

![The Structure of Octal Integer](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/PWmmXH90OO-B?a=21070\&x=5541\&y=867\&w=1630\&h=293\&store=1\&accept=image%2F\*\&auth=LCA%20bb61d7b947021a86446f7521ee23c0f248dab8d3-ts%3D1608455099)

| Chars            | Char Code            | Detail                       |
| ---------------- | -------------------- | ---------------------------- |
| `-`              | `U+2010`             | Minus Sign                   |
| `+`              | `U+002B`             | Plus Sign                    |
| `0`              | `U+0030`             | Zero                         |
| `C`              | `U+0043`             | Latin uppercase letter C     |
| `c`              | `U+0063`             | Latin lowercase letter c     |
| **Octal Digits** |                      |                              |
| `0-7`            | `U+0030` to `U+0037` | ASCII digits - zero to seven |

Some of the octal integer values are...

```ruby
0c421, 0C1057, 0C42, 0c5457, +0c754222, -0C454
```

{% hint style="info" %}
The octal format does not support fractional non-integer values!
{% endhint %}

