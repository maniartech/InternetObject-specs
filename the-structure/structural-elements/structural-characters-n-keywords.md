# Structural Characters and Literals

The Internet Object format includes several structural characters and literals that are used to structure and delimit data within a document. These characters are used in conjunction with objects, strings, arrays, numbers, and whitespace to create complex and flexible data structures.

### Structural Characters

Structural characters are used to define the structure of the data within an Internet Object document. The following are the structural characters used in the Internet Object format.

<table><thead><tr><th width="155.09116809116807">Symbol</th><th width="198">Characters</th><th width="150">Unicode</th><th>Description</th></tr></thead><tbody><tr><td><code>,</code></td><td>Comma</td><td><code>U+002C</code></td><td>Separator between values</td></tr><tr><td><code>~</code></td><td>Tilde</td><td><code>U+007E</code></td><td>Record delimiter in collection</td></tr><tr><td><code>:</code></td><td>Colon</td><td><code>U+003A</code></td><td>Key-value separator</td></tr><tr><td><code>[</code></td><td>Open Square Bracket</td><td><code>U+005B</code></td><td>Start of array</td></tr><tr><td><code>]</code></td><td>Close Square Bracket</td><td><code>U+005D</code></td><td>End of array</td></tr><tr><td><code>{</code></td><td><p>Open Curly </p><p>Bracket</p></td><td><code>U+007B</code></td><td>Start of object</td></tr><tr><td><code>}</code></td><td>Close Curly Bracket</td><td><code>U+007D</code></td><td>End of object</td></tr><tr><td><code>---</code></td><td>Hyphens</td><td><code>U+002D</code></td><td>Header and data separator</td></tr><tr><td><code>#</code></td><td>Hash</td><td><code>U+0023</code></td><td>Comment start</td></tr><tr><td><code>"</code></td><td>Double Quote</td><td><code>U+0022</code></td><td>String delimiter</td></tr><tr><td><code>'</code></td><td>Single Quote</td><td><code>U+0027</code></td><td>String delimiter</td></tr><tr><td><code>@</code></td><td>At Symbol</td><td><code>U+0040</code></td><td>Starts the raw string</td></tr></tbody></table>

### Literals

Literals are specific values that can be used within an Internet Object document. The following are the literals used in the Internet Object format.

| Literals  | Represents                  |
| --------- | --------------------------- |
| `T`       | Boolean value True (short)  |
| `true`    | Boolean value True          |
| `F`       | Boolean value False (short) |
| `false`   | Boolean value False         |
| `Inf`     | Number value Infinity       |
| `NaN`     | Number value Not a Number   |
| `N`       | Null value (short)          |
| `null`    | Null value                  |

### Other Special Characters

Special characters are used in conjunction with structural characters and literals to provide additional functionality or context within an Internet Object document. The following are the special characters used in the Internet Object format.

<table><thead><tr><th width="150">Symbol</th><th width="186.44883815735832">Characters</th><th width="150">Unicode </th><th>Application</th></tr></thead><tbody><tr><td><code>?</code></td><td>Question Mark</td><td><code>U+003F</code></td><td>Shortcut for declaring optional member when suffexed to the key name in object schema</td></tr><tr><td><code>*</code></td><td>Asterisk</td><td><code>U+002A</code></td><td>Shortcut for declaring nullable member when suffexed to the key name in object schema. Also used to make schema accept undeclared variables.</td></tr><tr><td><code>-</code></td><td>Hyphen / Minus</td><td><code>U+002D</code></td><td>Represents negative value</td></tr><tr><td><code>+</code></td><td>Plus</td><td><code>U+002B</code></td><td>Represents positive value</td></tr><tr><td><code>$</code></td><td>Doller</td><td><code>U+0024</code></td><td>Denotes a variable</td></tr></tbody></table>

