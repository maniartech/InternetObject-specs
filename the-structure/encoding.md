# Encoding

The Internet Object format uses **UTF-8** as the default and mandatory encoding. This ensures that all implementations can reliably read and write text consistently. While you can use other encodings like UTF-16, UTF-32, or ASCII, keep in mind that not all systems might support them.

{% hint style="info" %}
If UTF-8 doesn't work for your needs, choose the encoding that best fits your situation to maintain compatibility. You can use external libraries or tools to convert between UTF-8 and your preferred encoding if your implementation doesn't support it directly.
{% endhint %}

### Byte Order Mark (BOM)

Adding a Byte Order Mark (`U+FEFF`) at the start of your Internet Object text won’t cause issues—the parser will simply treat it as a space. However, it's generally a good idea to omit the BOM unless you have a specific reason to include it.
