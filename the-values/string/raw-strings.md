# Raw Strings

In some cases (such as representing regular expressions) open string or regular string is not quite an efficient way to represent the string. Raw strings encapsulate the series of Unicode characters inside a single quote `(' U+0027)` character.



![The Raw String](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/6ugmWkdfYNiK?a=23151\&x=3643\&y=1564\&w=1699\&h=346\&store=1\&accept=image%2F\*\&auth=LCA%2081085e36923bcf2b3e9d955bff2033d880eb1b3c-ts%3D1612689104)

### Use Cases

The raw string is used for representing text with complex characters. The following string represents an application path in the windows directory, it uses both characters i.e colon and backslash which makes it difficult to be represented using open strings and regular strings format.

```
'C:\program files\example\app.exe'
```

Raw strings format simplifies the complex string representation and enhances the readability by preventing escapes. The following regular expression is much more readable if represented using raw string format.

```
'^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$'
```

As with other format of strings, raw strings can also deligently handle Unicode characters.

```
'जॉन डो', 'Can contain Ucharacters 😃'
```

Raw string preserves structural characters, newline characters, and whitespace while parsing

```
'A Unicode string (😃) which does not force you to escape
characters like \, \n or anything except a single quote 
char ''.'
```

### Escaping

The Raw string does not support the character escaping with a reverse solidus. Every character inside the raw string is treated as exactly the same including reverse solidus `(\ U+005C)`.&#x20;

Only the single quote within the Raw string must be escaped to avoid string termination. To avoid the string termination, single quotes within the raw strings must be escaped using double single quotes.

```
'Jonas D''costa'
```

###

