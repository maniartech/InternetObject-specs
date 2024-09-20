# Regular Strings

Open strings are a simpler and beautiful way to represent textual data. In many cases, open strings do not fit. One such issue is, they can't start with whitespace, contain structural characters such as colon `(:)`, comma `(,)`, or supports complex escaping. Regular strings solve this problem by letting the user enclose the string in the quotation marks `(" U+0022)`. This makes a regular string look similar to the strings found in most programming languages.&#x20;

{% hint style="info" %}
Regular string preserves the whitespace, and structural characters if enclosed within the double quotes!
{% endhint %}

### A Regular String Walkthrough

Some of the examples of regular strings are...

```
"John Doe"
```

A string with leading and trailing white spaces

{% code fullWidth="false" %}
```
"   John Doe   "
```
{% endcode %}

A single quote within the regular strings doesn’t cause termination.

```
"Peter D'mello " 
```

Regular string represented using the Unicode characters.

```
"जॉन डो", "Can contain unicode characters 😃"
```

The new-line characters such as line-feed and carriage-return in the string are preserved while parsing.

```
"Lorem ipsum dolor sit amet consetetur sadipscing 
elitr sed diam nonumy eirmod. 

Tempor invidunt ut labore et dolore magna aliquyam 
erat sed diam voluptua"
```

### Escaping

Any character may be escaped using a regular string. The Regular String format support escaping any characters. The control characters and the double quotes inside the string must be escaped.

#### If the character is among the special code point

All the characters in the special code point shown in the table below may be escaped by placing Reverse solidus `(\ U+005C)` before that character.  If the character  is among the special code points and it is a double quotation mark `(" U+0022)` then it must be escaped.&#x20;

| Caracter | Description | Code Point                                                        |
| :------: | :---------: | ----------------------------------------------------------------- |
|    `"`   |   `U+0022`  | Quotation mark                                                    |
|    `b`   |   `U+0062`  | Backspace                                                         |
|    `f`   |   `U+0066`  | Form feed                                                         |
|    `r`   |   `U+0072`  | Carriage return                                                   |
|    `n`   |   `U+006E`  | Line feed                                                         |
|    `t`   |   `U+0074`  | Horizontal tab                                                    |
|    `u`   |   `U+0075`  | <p>Four-digit Unicode point. Where U is <br>case-insensitive</p>  |
|    `x`   |   `U+0078`  | <p>Two-digit Unicode point. Where X is</p><p>case-insensitive</p> |

{% hint style="info" %}
The character`"u"` will be escaped only if it is followed  by the four-digit hexadecimal number and character  `"x"` will escape if it is followed by the two-digit hexadecimal number.
{% endhint %}

#### Escaping special code point characters

Characters that are not included in the above table will not be escaped by the parser by placing Reverse solidus. In the following example, character `a`  will not be escaped as it is not a special code point character. Similarly, character `u` will not be escaped as it is not followed by a four-digit hexadecimal number.

```ruby
"\bmax"  # b will be escaped
"\fmax"  # f will be escaped
"\rmax"  # r will be escaped
"\amax"  # a will not be escaped 
"\umax"  # u will not be escaped
```



{% tabs %}
{% tab title=" Escaping special code point characters" %}
```ruby
"Some special chars such as \n \t can be escaped"
```
{% endtab %}
{% endtabs %}

In the above example, `\n` and `\t` will be escaped as it is among the special code point characters.

{% tabs %}
{% tab title="Example3: Escaping double quotation mark characters" %}
```ruby
"She said, \"I Love it\""
```
{% endtab %}
{% endtabs %}

A double quotation mark within the string must be escaped as shown in the above example because it will cause the string termination.

A backslash before any non-escapable character will not have any effect! In the following example, both values represent `"John Doe"`.

{% tabs %}
{% tab title="Example4: Blackslash will not escape charecters " %}
```ruby
"\John Do\e", "John doe"
```
{% endtab %}
{% endtabs %}

#### If the character is in the range from  (U+0000) to (U+00FF)

If the character is in the Basic Latin Unicode character range i.e from `(U+0000)` to `(U+00FF)` then it may be escaped by representing it as the reverse solidus followed by the lower case letter `"x"`, followed by two digits hexadecimal number.

{% tabs %}
{% tab title="Example: Escaping chrecters with two digit hexadecimal unicode representation " %}
```ruby
"\x3A"
"\x7F"
```
{% endtab %}
{% endtabs %}

#### If the character is in the range from  (U+0000) to (U+FFFF)

If the character is in the range i.e from `(U+0000)` to `(U+FFFF)`, then it may be escaped by representing it as a reverse solidus followed by a lower case letter `"u"`, followed by four hexadecimal digits. For example, `"\u00AF"`.&#x20;

{% tabs %}
{% tab title="Example: Escaping chrecters  with four digit hexadecimal unicode representation" %}
```ruby
"\uA45E" # valid
"\u00AF" # valid
```
{% endtab %}
{% endtabs %}

#### If the character is out of the range from  (U+0000) to (U+00FF)

Characters out of the above range are represented as the 12 Character sequence, i.e UTF-16 surrogate pair. So, for example, a string containing only the `"🎛"` [control knobs](https://www.compart.com/en/unicode/U+1F39B) character `(U+1F39B)` can be represented as `"\uD83C\uDF9B"`.

### String Comparison

The software implementation that parses the Internet Object text requires checking the string values in the objects and their members for equality. In order to achieve interoperability, the software implementations must ensure that the Unicode character units of the transformed textual data are compared code by code numerically with the other string. And at the same time, it must agree on all the cases of equality and inequality of two strings.

In order to compare two strings, the software implementations must first evaluate the strings and convert the escape characters into respective Unicode points and then compare them.

* `"cafe\u0301"` is the same as `"café"`&#x20;
* `"\u000A"` is the same as `"\n"`
* `"\x0A"` is the same as `"\n"`

The [emoji of Grinning Face](https://www.compart.com/en/unicode/U+1F600) 😀 `(U+1F600)` is represented using UTF-16  surrogate pair `\uD83D\uDE00`

* `"\ud83d\ude00"` is the same as `"😀"`
* `"\uD83D\uDE00"` is the same as `"😀"`

The [emoji of hundred point symbol](https://www.compart.com/en/unicode/U+1F4AF) `"💯"` `(U+1F4AF)` is represented using UTF-16  surrogate pair `"\uD83D\uDCAF"`.&#x20;

* `"\ud83d\udcaf"` is the same as `"💯"`
* `"\uD83D\uDCAF"` is the same as `"💯"`

###
