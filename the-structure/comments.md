# Comments

Internet Object supports single-line comments. IO comments start with a hash sign (# U+0023) and end when the line terminates. They can be placed anywhere inside the document, and any code written after the hash sign on the same line is ignored by the parser.

{% tabs %}
{% tab title="Complex Example with comments" %}
```ruby
# This is a comment
# IO supports only single-line comment
#
# The address definition
~ $address: {street:string, zip:{string, maxLength:5}, city:string}
#
# Comment can be placed anywhere inside the document 
# Comment must be placed after the significant token
#
# The person definition
~ $schema: {
    name:string,               # The person name
    age:int,                   # The person age
    homeAddress?: $address,    # The home address
    officeAddress?: $address   # The office address
  }
--- 
# Records
~ John Doe, 25, {Queens, 50010, NewYork}, {Bond Street, 50001, NewYork}
~ Jane Doe, 20, {Queens, 50010, NewYork}, {Bond Street, 50001, NewYork}

```
{% endtab %}
{% endtabs %}

In the example above, the comments are used to provide additional information about the document's structure and meaning. They are used to describe the address and person definitions, as well as to provide comments on the records. Comments can improve the readability and maintainability of the document by providing context and explanations for the data structures and values in the document.
