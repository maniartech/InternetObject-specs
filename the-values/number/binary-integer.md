# Binary Integer

Internet Object supports binary non-fractional integer values. The hexadecimal integer may be prefixed with optional plus or minus signs and must start with `"0b"` or `"0B"` literal characters. It is then followed by one or more `0` or `1` digits.



![The Structure of Binary Integer](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/PWmmXH90OO-B?a=21070\&x=7313\&y=885\&w=1478\&h=326\&store=1\&accept=image%2F\*\&auth=LCA%20613913d7a67dc84b5cc594e941d541e86eec8fd9-ts%3D1608455099)

| Chars             | Char Code            | Detail                     |
| ----------------- | -------------------- | -------------------------- |
| `-`               | `U+2010`             | Minus Sign                 |
| `+`               | `U+002B`             | Plus Sign                  |
| `0`               | `U+0030`             | Zero                       |
| `B`               | `U+0058`             | Latin uppercase letter B   |
| `b`               | `U+0078`             | Latin lowercase letter b   |
| **Binary Digits** |                      |                            |
| `0 or 1`          | `U+0030` to `U+0031` | ASCII digits - zero to one |

Some examples of Binary Integer values...

```ruby
0B01100010, 0b010010010, +0B1010101010, -0b0111111
```

{% hint style="info" %}
The binary format does not support fractional non-integer values!
{% endhint %}
