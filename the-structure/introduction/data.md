# Data Sections

The data sections of an Internet Object Document consists of values or collections of values. These values can be simple, such as integers or strings, or more complex, such as arrays or objects. The data section is typically separated from the header section by the data separator "---", and is used to convey the actual data that is being transmitted within the document. The flexibility of the Internet Object format allows for a wide range of data types to be included within the data section, making it a versatile and powerful tool for transmitting and processing data over the internet.

![Internet Object Document Data Section Structure](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/GvgmgBMpLy15?a=21180\&x=107\&y=628\&w=733\&h=264\&store=1\&accept=image%2F\*\&auth=LCA%209d2327a7ed0659cf0f15a88d294b67962d09b855-ts%3D1609085429)

### Values

Values within the data section of an Internet Object document must fall into one of the following data types: `Object`, `Array`, `String`, `Number`, `Boolean`, and `Null`. The Internet Object format is designed to accommodate a wide range of data types and structures, making it a versatile and flexible tool for transmitting and processing data.

Check out the [Values](../../the-values/values.md) sections for more detail.

#### Objects

Objects are a data type that represents ordered collections of key-value pairs, used to represent structured data. In the example provided, an object representing a person is defined with three key-value pairs.

```ruby
{ John Doe, 25, {Bond Street,  New York, NY}}
```

#### Arrays

Arrays are a data type that represents lists of zero or more values, surrounded by square brackets \[]. Each value in the array is separated by a comma. Arrays can include values of any data type, including other arrays or objects.

```ruby
[43, 12, 45, 8]
```

#### Strings

Strings are a data type that represents sequences of Unicode points, which may or may not be enclosed in double or single quotation marks (`"` U+0022 or `'` U+0027). In addition to standard strings, the Internet Object format also supports raw strings, which are enclosed in the at-sign symbol `@` U+0040.

```ruby
~ Lorem ipsum dolor sit amet consetetur sadipscing mod
~ "Hello World, Welcome to Internet Objects!"
~ 'Hello World, Welcome to Internet Objects!'
~ @"E:\my Folder"

```

#### Numbers

The Internet Object format allows numbers to be represented using various formats, including Base 10 Decimal Numbers, Hexadecimal, Octal, and Binary integers, as well as IEEE 754 number values such as NaN and Infinity. This flexibility enables users to represent numeric data in the format that best suits their needs.

```ruby
~ 78955632
~ 125.221
~ -562.33
~ 0XAA21FF
~ 0b1011
~ 0c234
~ Inf
~ NaN
```

In the example provided, numbers are represented using a variety of formats, including standard decimal notation, hexadecimal notation (prefixed with "0X"), binary notation (prefixed with "0b"), and octal notation (prefixed with "0c"). The example also includes two special values defined by the IEEE 754 standard: Infinity (represented as "Inf") and Not a Number (represented as "NaN").

#### Boolean

Boolean values are represented in the Internet Object format using only two possible values: true and false. These values are typically represented using either the `T` or `F` characters, or using the keywords `true` and `false`.

```ruby
~ T
~ F
~ true
~ false
```

#### Null

The Null value is used to represent a deliberate absence of data and is typically represented using either the `N` character or the `null` keyword.

```ruby
~ N
~ null

```

### Collections

The Internet Object format includes a collection data type that can be used to represent one or more independent records within a single document. This data type is useful for transmitting or streaming a collection of individual records over a network or other communication channel.

```ruby
~ John Doe, 25, Male, {Bond Street, New York, NY}, [agile, swift]
~ Jane Doe, 20, Male, {Duke Street, New York, NY}
```

In the example provided, a collection of two records is represented using the Internet Object format. Each record is separated by a new line and consists of a series of values separated by commas. The use of collections can help to simplify the transmission and processing of large data sets and can be particularly useful in applications that require real-time or streaming data.

For more information on collections and their use within the Internet Object format, readers are directed to click [the collection](../../the-collections/untitled-1.md).
