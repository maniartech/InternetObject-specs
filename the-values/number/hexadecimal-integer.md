# Hexadecimal Integer

Internet Object supports hexadecimal non-fractional integer values. The hexadecimal integer may be prefixed with optional plus or minus signs and must start with `"0X"` or `"0x"` literal characters. It is then followed by one or more hexadecimal digits. The hexadecimal number from `A` through `F` can be lower or upper case.&#x20;

![The Structure of Hexadecimal Integer](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/PWmmXH90OO-B?a=21070\&x=5420\&y=567\&w=1757\&h=293\&store=1\&accept=image%2F\*\&auth=LCA%20110ce57b4aec39beb0215c4f3796cb719ee990d5-ts%3D1608455099)

| Chars                  | Char Code          | Detail                                 |
| ---------------------- | ------------------ | -------------------------------------- |
| `-`                    | `U+002D`           | Minus Sign                             |
| `+`                    | `U+002B`           | Plus Sign                              |
| `0`                    | `U+0030`           | Zero                                   |
| `X`                    | `U+0058`           | Latin uppercase letter `X`             |
| `x`                    | `U+0078`           | Latin lowercase letter `x`             |
| **Hexadecimal Digits** |                    |                                        |
| `0`-`9`                | `U+0030 to U+0039` | ASCII digits - zero to nine            |
| `A`-`F`                | `U+0041 to U+0046` | Latin alphabets uppercase - `A` to `F` |
| `a`-`f`                | `U+0061 to U+0066` | Latin alphabets lowercase - `a` to `f` |

Some examples of Hexadecimal Integer values...

```ruby
0XFF00FF, 0xff00ff, +0XAA21FF, -0X010408
```

{% hint style="info" %}
The hexadecimal format does not support fractional non-integer values!
{% endhint %}
