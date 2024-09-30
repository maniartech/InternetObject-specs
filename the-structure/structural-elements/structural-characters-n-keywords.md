# Structural Characters

Structural characters define the structure of data within an Internet Object document. Below are the structural characters used in the Internet Object format:

| Symbol | Character(s)           | Unicode | Description                                  | Notes                                      |
|--------|------------------------|---------|----------------------------------------------|--------------------------------------------|
| `,`    | Comma                  | `U+002C`| Separator between values                     | Used to separate items in arrays and objects            |
| `~`    | Tilde                  | `U+007E`| Record delimiter in collections              | Indicates the start of a new record in collection       |
| `:`    | Colon                  | `U+003A`| Key-value separator                          | Separates keys from their corresponding values |
| `[`    | Open Square Bracket    | `U+005B`| Start of an array                            | Begins an array structure                    |
| `]`    | Close Square Bracket   | `U+005D`| End of an array                              | Ends an array structure                      |
| `{`    | Open Curly Bracket     | `U+007B`| Start of an object                           | Begins an object or dictionary               |
| `}`    | Close Curly Bracket    | `U+007D`| End of an object                             | Ends an object or dictionary                 |
| `---`  | Triple Hyphens         | `U+002D`| Header and data separator                    | Separates different sections of the document |
| `#`    | Hash                   | `U+0023`| Comment start                                | Initiates a single-line comment              |
| `"`    | Double Quote           | `U+0022`| String delimiter                             | Encloses string values                       |
| `'`    | Single Quote           | `U+0027`| String delimiter                             | Alternative to double quotes for strings     |
| `@`    | At Symbol              | `U+0040`| Variable                                     | Represents the start of vaiable              |
| `$`    | Dollar Sign            | `U+0024`| Schema                                       | Represents the start of a schema identifier  |
