# URL

Similar to Email, an URL can also be passed as a string.  The URL format is derived from the [HTML 5.1-Forms Email syntax](https://www.w3.org/TR/2016/REC-html51-20161101/sec-forms.html#email-state-typeemail) recommended by W3C. &#x20;

URL format follows the syntax specified in the [HTML 5.1 W3C recommendation under section  4.10.5.1.4. ](https://www.w3.org/TR/2016/REC-html51-20161101/sec-forms.html#email-state-typeemail)

The code snippet shows how to define an  `url` In the Internet Object Document.

```yaml
# Defining an url
website: url
---
https://example.com

```

{% hint style="info" %}
In the case of the `url` format, the data must be valid URL.
{% endhint %}

```yaml
# valid and Invaliid url
website: url
---

https://example.com # the input will be accepted by the IO parser

Example.com # input will not be accepted as it is not a valid url 

```

### MemberDef

The Email is derived from the String type, hence it shares the same [MemberDef](../#memberdef) as the String. However, URL enforces additional constraints with the respective url format.

#### **Choices**

The `choices` can be added to member variables in the  `url` so that it is restricted to the fixed set of available choices. Choices must be an array of valid `url`. The code snippet here shows how to add choices for the url.&#x20;

```yaml
# Set the choices for companyWeburl
companyWeburl: {
  type: url, 
    choices: [https://example1.com, 
     https://example2.com, https://example3.com]           
}
---
https://example1.com
```

#### pattern

User may specify `pattern` for the `url` by defining `pattern` as,

```yaml
# Set pattern for the referenceUrl
referenceUrl: {
  type: url, 
   pattern: 'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+'
 }
---
http://example.com, http://example2.com
```

&#x20;
