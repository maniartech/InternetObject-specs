---
description: Nulls in Internet Object
---

# Null

The null values are represented using `N` and `null` keywords.



![The Null Structure](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/O-oxmHkf2XQ6?a=18531\&x=939\&y=278\&w=910\&h=275\&store=1\&accept=image%2F\*\&auth=LCA%20bfa5c0300e7ac4b3ad1f29c307da9156bfb7b11e-ts%3D1608203761)

| Chars  | Char Code                  | Detail                   |
| ------ | -------------------------- | ------------------------ |
| `N`    | `U+2010`                   | The uppercase letter `N` |
| `null` | `U+006E` `U+0075` `U+006C` | The Keyword `null`       |

{% hint style="info" %}
It is recommended that null values are represented using **`N`** keyword instead of the **`null`** keyword.
{% endhint %}

In the following example, the null value can be passed for age.&#x20;

{% tabs %}
{% tab title="Example 1: Setting key value to null" %}
```ruby
name, age: {int, null: true, max: 30}
---
~ John Doe, 25
~ Spiderman, N
~ Ironman, null
```
{% endtab %}
{% endtabs %}

