# Data Types

Internet Object Schema supports a rich set of data types to validate and structure your data.

## Core Types

| Type | Description |
| :--- | :--- |
| [**any**](any.md) | Accepts any value. |
| [**array**](array.md) | An ordered list of values. |
| [**base64**](base64.md) | Binary data encoded as Base64. |
| [**bool**](bool.md) | Boolean values (`true`, `false`). |
| [**date-and-time**](date-and-time.md) | Temporal values (`datetime`, `date`, `time`). |
| [**number**](number/README.md) | Numeric values (integers, floats, decimals). |
| [**object**](object.md) | Structured data with key-value pairs. |
| [**string**](string/README.md) | Textual data (including `email`, `url`). |

## Type Hierarchy

* **Scalar Types**
  * `base64`
  * `bool`
  * `number` (includes `int`, `byte`, `decimal`, etc.)
  * `string` (includes `email`, `url`)
  * `datetime`, `date`, `time`
* **Collection Types**
  * `array`
  * `object`
* **Special Types**
  * `any`
