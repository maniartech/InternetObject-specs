# Data Types

The internet object schema defines six data types that include [string](string/), [number](number/), [int](number/derived-types/integer.md), [int32](number/derived-types/int32.md), [int16](number/derived-types/int16.md), [byte](number/derived-types/byte.md), [email](string/string-derived-types/email.md), [url](string/string-derived-types/url.md), [datetime](string/string-derived-types/datetime.md), [date](string/string-derived-types/date.md), [time](string/string-derived-types/time.md), [bool](bool.md), [object](object.md), [array ](array.md)or [any](any.md).

![Internet Object Data Types](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/SUfm\_UR89EBD?a=22456\&x=2657\&y=1364\&w=946\&h=792\&store=1\&accept=image%2F\*\&auth=LCA%20cf2ec801d5bc4f25cf66c288efe8e9b1d4d1069e-ts%3D1610795059)

{% hint style="info" %}
The types string and number have subtypes. The email, url, datetime, date and time are subtypes of string. The int, int32, int16, byte are subtypes of number.
{% endhint %}

### TypeDefs

Typedefs are a memberdef schema for the specified type. They define the constraints for the particular data type. The following example&#x20;



{% tabs %}
{% tab title="The $type definition" %}
```yaml
type: { string, choices: [
    string, email, url, datetime, date, time,
    number, int, int32, int16, byte,
    object, array, bool
  ]
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="The String TypeDef" %}
```ruby
type      : {string, choices: [string, email, url, datetime, date, time]},
default?  : string,
choices?  : [string],
pattern?  : string,
maxLen?   : {int, min:0},
len?      : {int, min:0},
optional? : {bool, F},
null?     : {bool, F}
```
{% endtab %}
{% endtabs %}

Some of the valid String MemberDef values are...

```ruby
# The name is string and default value is ""
name: {string, ""}

# The website is of url type!
website: {url, optional:T} 

# The rgb's default is red, and choices are red, green, blue
rgb: {string, red, [red, green, blue]}

# The description is string that can have maximum length of 500 characters 
description: {string, maxLen:500} # 
```

As shown in the example above, Objects, Numbers, Arrays, Boolean, and Any have their respective TypeDef. &#x20;
