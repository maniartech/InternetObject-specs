# Encoding

The Internet Object format requires that the text is encoded in the UTF-8 format by default. While other encoding formats such as UTF-16, UTF-32, or ASCII may be used, support for them is not guaranteed by all implementations. However, support for UTF-8 is required by all implementations, while support for other formats is preferred.

{% hint style="info" %}
In cases where UTF-8 is not suitable, the Internet Object serialized text must be exchanged using the best suitable encoding format to ensure 100% interoperability. External libraries or code can be used to convert to and from UTF-8 if the implementation does not support the desirable encoding.
{% endhint %}

### Byte Order Mark

Adding a Byte Order Mark (`U+FEFF`) at the beginning of the Internet Object text is not significant as the parser will ignore it since it is a whitespace character.

###
