# NaN and Infinity

Internet Object supports NaN (Not a Number) and Infinity values. Not a number and the Infinity must be represented as literal characters `NaN` and `Inf`. The Infinity value may be prefixed with an optional plus or minus sign.&#x20;

![The Structure for NaN and Inf values](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/PWmmXH90OO-B?a=21070\&x=5739\&y=61\&w=910\&h=424\&store=1\&accept=image%2F\*\&auth=LCA%201ee460760bc130d3b2d28a6edef4b6334520c37b-ts%3D1608455099)



| Chars | Char Code              | Detail            |
| ----- | ---------------------- | ----------------- |
| `-`   | `U+2010`               | Minus Sign        |
| `+`   | `U+002B`               | Plus Sign         |
| `Inf` | `U+006C U+006E U+0066` | The keyword `Inf` |
| `NaN` | `U+004E U+0061`        | The keyword `NaN` |

### Valid Values

```ruby
NaN, Inf, -Inf, +Inf
```

