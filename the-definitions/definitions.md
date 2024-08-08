# Definitions

Apart from the schema, the IO document header can have definitions. The definitions allow you to define schema, variables, metadata, and much more. In essence, the definitions are the collection of key-value pairs, with the following structure.



![The Defination Structure](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/GvgmgBMpLy15?a=22620\&x=3674\&y=161\&w=1881\&h=205\&store=1\&accept=image%2F\*\&auth=LCA%209433da9053044359ab00cbee570df59bbb4999ce-ts%3D1611059180)

{% hint style="info" %}
Whitespaces surrounding the tokens, keys, and values are optional.
{% endhint %}

The definition must start with a tidal symbol `(~ U+007E)` followed by a key-value pair. The key-value pair must be separated by a colon `(: U+003A)`.&#x20;

| Element | Unicode         | Details                                                                    |
| ------- | --------------- | -------------------------------------------------------------------------- |
| `~`     | `U+007E`        | Tilde - Starts the definition                                              |
| `:`     | `U+003A`        | Colon - Key and Value Separator                                            |
| Key     | N/A             | The string key, as defined in the [String section](../the-values/string/). |
| Value   | N/A             | The values as defined in the [Values section](../the-values/values.md).    |
| WS      | WhiteSpace Char | 0 or more white-space character                                            |

### A definition walkthrough

#### Simple definitions

Simple definitions such as meta-data declaration can be written as shown in the code snippet below.

```ruby
# The result meta-data
~ pageSize: 1
~ currentPage: 1
~ totalPages: 1
~ recordCount: 2
~ success: T
---
# The data
~ John Done, 25, {Bond Street, New York, NY}
~ Jane Doe, 20, {Bond Street, New York, NY}
```

#### Value and Schema definitions

Any value defined in the definition section can be used as a variable. The dollar $ prefix can be used to declare schema and/or consume the variable value. If the key starts with `$` a sign the variable will be treated as a schema and handled likewise.

```ruby
# Variables and schema definitions
~ y: yes # value var
~ n: no  # value var
~ $address: {street, city, state} # schema var
~ $schema: {name, age, $address, ready:{string, choices:[$y, $n]} # schema var
---
~ John Done, 25, {Bond Street, New York, NY}, $y
~ Jane Doe, 20, {Bond Street, New York, NY}, $y
```

Here in the code snippet, `y: yes`  and `n: no` are used as value definition similarly keys in the schema prefixed with `$` sign represents schema definitions.&#x20;

{% hint style="info" %}
An Internet object document may only contain the header section and not a data section.  In such a case, the header section must be separated from the data section by a data separator `"---".`
{% endhint %}

####

