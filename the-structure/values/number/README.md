---
description: Numbers in Internet Object
---

# Numbers in Internet Object

Internet Object accommodates three primary numeric data types: **Number**, **BigInt**, and **Decimal**. It supports a variety of number formats, allowing:

- Integers to be expressed in decimal (base 10), binary, octal, or hexadecimal.
- Floating-point numbers to be written using scientific notation.
- IEEE 754 special values such as NaN and Infinity to be represented.

[Diagram: The Number Values]

**Data Type Details:**

- **Number (64-bit floating-point):** Ideal for fractional or general floating-point values.
- **BigInt:** Suited for very large integers that exceed the 64-bit limit.
- **Decimal:** A fixed-precision type that stores exact numeric values with a set number of decimal places, making it critical for high-precision applications like financial calculations.

{% hint style="info" %}
Note: The term "decimal" is used in two contexts here:

- Decimal (base‑10): Refers to the common numeral system.
- Decimal (data type): A fixed-precision type (derived from RDBMS standards) used when exact precision is required, such as in financial calculations.
{% endhint %}









