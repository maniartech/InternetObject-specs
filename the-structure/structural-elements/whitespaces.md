# Whitespaces

In the Internet Object format, whitespace refers to any character with a Unicode code point less than or equal to `U+0020` (i.e., characters in the range `U+0000` to `U+0020`). This range includes both non-printable control characters and common whitespace characters such as the horizontal tab (`U+0009`), newline (`U+000A`), vertical tab (`U+000B`), form feed (`U+000C`), carriage return (`U+000D`), and space (`U+0020`).

![](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/SUfm\_UR89EBD?a=22620\&x=15\&y=912\&w=990\&h=482\&store=1\&accept=image%2F\*\&auth=LCA%20f2a38fdb5e4fb58c2500aa4b23c3735c6b801c05-ts%3D1610795059)

In addition to the characters in the range `U+0000` to `U+0020`, the Internet Object format also includes characters in the Unicode whitespace category as whitespace. This includes characters such as the non-breaking space (`U+00A0`), em space (`U+2003`), and en space (`U+2002`), among others. Including Unicode whitespace characters can make it easier to work with text in languages that use non-Latin scripts, such as Arabic, Chinese, or Japanese.

It's also worth noting that the Internet Object format recognizes the zero-width non-breaking space (`U+FEFF`) as whitespace. This character is often used as a byte order mark (BOM) in Unicode-encoded documents. Incorporating a more comprehensive range of whitespace characters in Internet Object offers several advantages that can make the format easier to work with, more readable, and more compatible with different systems and programming languages.

The following table lists the valid whitespace characters:

| Code Points          | Description                                        | Notes                                                                                          |
| -------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `U+0000` to `U+0020` | Space, Line Feed, Carriage Return, Tab, Bell, etc. | Any character having charCode `<=0x20` such as space. Includes ASCII space and control characters. |
| `U+1680`             | Ogham Space Mark                                   | Space used in Ogham scripts.                                                                    |
| `U+2000`             | En Quad                                            | Space equal to the width of the lowercase letter "n".                                           |
| `U+2001`             | Em Quad                                            | Space equal to the width of the uppercase letter "M".                                           |
| `U+2002`             | En Space                                           | Space equal to half the width of the em space.                                                  |
| `U+2003`             | Em Space                                           | Space equal to the width of the em space.                                                       |
| `U+2004`             | Three-per-Em Space                                 | Space equal to one-third of an em space.                                                        |
| `U+2005`             | Four-per-Em Space                                  | Space equal to one-quarter of an em space.                                                      |
| `U+2006`             | Six-per-Em Space                                   | Space equal to one-sixth of an em space.                                                        |
| `U+2007`             | Figure Space                                       | Space equal to the width of a numeral character.                                                |
| `U+2008`             | Punctuation Space                                  | Space used for punctuation.                                                                     |
| `U+2009`             | Thin Space                                         | Space narrower than the regular space character.                                                |
| `U+200A`             | Hair Space                                         | Very narrow space used for special purposes.                                                    |
| `U+2028`             | Line Separator                                     | Character used to separate lines in text.                                                       |
| `U+2029`             | Paragraph Separator                                | Character used to separate paragraphs in text.                                                  |
| `U+202F`             | Narrow No-Break Space                              | Non-breaking space narrower than the regular space character.                                   |
| `U+205F`             | Medium Mathematical Space                          | Space used in mathematical notation.                                                            |
| `U+3000`             | Ideographic Space                                  | Space used in East Asian scripts.                                                               |
| `U+FEFF`             | Byte Order Mark (BOM)                              | Zero Width Non-Breaking Space, often used as a BOM.                                             |

### Notes

- **Case Sensitivity:** All whitespace characters are recognized based on their Unicode code points. Ensure that the correct character is used to avoid parsing issues.

- **Whitespace Sensitivity:** Internet Object is not whitespace-sensitive, meaning that the parser ignores the whitespaces surrounding the values and structural elements. However, any whitespace characters found within the values or strings themselves are preserved.

- **Reserved Characters:** All listed whitespace characters are reserved and should not be used as part of identifiers or keys to prevent conflicts and parsing errors.

- **Best Practices:**
  - **Enhance Readability:** Use whitespace characters like spaces and tabs to format your document for better readability.
  - **Avoid Unnecessary Whitespace:** While whitespace can improve readability, excessive or unnecessary whitespace can clutter the document.
  - **Consistent Formatting:** Maintain a consistent use of whitespace throughout the document to ensure uniformity and ease of maintenance.
  - **Be Mindful of Invisible Characters:** Some whitespace characters, like zero-width spaces, are invisible but can affect the parsing and rendering of the document. Use them only when necessary.