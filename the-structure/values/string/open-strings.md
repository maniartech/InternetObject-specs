# Open Strings

This is the simplest and the most basic type of format is the Open string format. As the name suggests, open strings are not enclosed within any sort of enclosures or quotation marks. This free and open type of string starts with any non-whitespace codepoint. They end when any structural character(s) is encountered or when the end of the document is reached.&#x20;

Open strings can not start or end with the whitespace character. However, whitespace characters within the strings are preserved. The quotation characters `( " U+0022 or ' U+0027)` do not require to be escaped.



![The Open String](https://lh5.googleusercontent.com/qMlHBw5J8nwUIbnuhlZvrlKy--2quLB9GCYqaQl968y34Zb1sC6BaeD9kn4zLDQppCcad\_GRhhspQjlNq91Jt01V6EwRTEowCyAtGKr7PoR9ah2kf\_H\_KIlvHAYkwGDCCLs9XP0x)

### An Open String Walkthrough

A simple open string. Notice it is not enclosed in any sort of enclosures.

```
John Doe
```

Quotes in the open strings don't cause termination.

```
Peter D'mello 
```

The following object contains three open string Unicode values.

```
जॉन डो, Wow Great, 😃
```

To create a multiline string, you don't need any escaping mechanism. In the following case, a string is spread over the five lines.

```
Lorem ipsum dolor sit amet consetetur sadipscing elitr sed 
diam nonumy eirmod. 

Tempor invidunt ut labore et dolore magna aliquyam erat 
sed diam voluptua
```

### Escaping

In order to keep things simple, the open string format does not support character escaping. If the text does not fit into open string format, other formats such as regular string can be used.

