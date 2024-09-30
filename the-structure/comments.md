# Comments

Internet Object supports single-line comments. Internet Object comments start with a hash sign (`# U+0023`) and end when the line terminates. You can place comments anywhere inside the document, and any code written after the hash sign on the same line is ignored by the parser.

```ruby
# Internet Object Document: Personnel Records

# Address schema definition
~ $address: {street:string, zip:{string, maxLength:5}, city:string}

# Person schema definition
~ $schema: {
    name:string,               # Individual's full name
    age:int,                   # Age in years
    homeAddress?: $address,    # Optional home address
    officeAddress?: $address   # Optional office address
}

---
# Personnel Records
~ John Doe, 25, {Queens, 50010, NewYork}, {Bond Street, 50001, NewYork}
~ Jane Doe, 20, {Queens, 50010, NewYork}, {Bond Street, 50001, NewYork}
```

### Usage and Benefits

Comments in Internet Object serve multiple purposes:

1. **Document Structure Elucidation:** Providing context for different sections of the document.
2. **Schema and Field Description:** Offering explanations for data structures and individual fields.
3. **Metadata Provision:** Including information about the document itself, such as version or purpose.
4. **Code Segmentation:** Improving readability by logically separating different parts of the document.

**Best Practices:**

- **Be Clear and Concise:** Use comments to clarify complex sections, but avoid stating the obvious.
- **Keep Comments Updated:** Ensure that comments reflect any changes in the code to prevent misinformation.
- **Avoid Overusing:** Excessive comments can clutter the document. Use them judiciously to highlight important information.
- **Place Comments Appropriately:** Position comments near the relevant code or data structure to maintain context.

Effective use of comments enhances document comprehensibility and maintainability by providing contextual information and explanations for data structures and values.
