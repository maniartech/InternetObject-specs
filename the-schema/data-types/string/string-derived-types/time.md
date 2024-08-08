# Time

Time can be represented as, `HH:mm:ss.SSS` or `HHmmss.SSS` i.e it can be passed with or without separators `(: U+003A)`.&#x20;

It uses a 24-hour clock system. Midnight is a special case and it may be referred to as `"00:00"` or `"24:00"`. However, ISO 8601-1: 2019 no longer permits `"24:00"`.

![The Time Structure](https://lh4.googleusercontent.com/m063muXgLoy8GdTG95tZ2bgbdKPFdG4she8hUl9c3WQ1wEx0UHiDDZt6D6pNwoqr3Gd3H\_JMkuU901AcP-mspY2\_PcuPd32gwNYK78\_llRZGyQEwMZSpSDTjFWCpNtSXFle02OMg)

| Value |                      Description                     |   Example  |
| :---: | :--------------------------------------------------: | :--------: |
|  `HH` |             24-hour clock hour, (`00-23`)            |     `01`   |
|  `mm` |           Minutes, Decimal number (`00-59`)          |      `46`  |
|  `ss` |           Seconds, Decimal number (`00-59`)          |      `55`  |
| `SSS` | Milliseconds, three-digit decimal number (`000-999`) |      `500` |



| **Time with separators:**       | **Time without Separators:** |
| ------------------------------- | ---------------------------- |
| `HH:mm:ss.SSS` = `05:24:34.555` | `HHmmss.SSS`  = `052434.555` |
| `HH:mm:ss` = `05:24:34`         | `HHmmss`   = `052434`        |
| `HH:mm` = `05:24`               | `HHmm` = `0524`              |
| `HH` = `05`                     | `HH` = `05`                  |

The code snippet demonstrates how to define and use `time`  In the Internet Object Document.

```yaml
# Set transactionTime with derived type as time
transactionTime: time
---
~ 05:24:34:555
~ 05:24:34      # parsed as 05:24:34:000
~ 05:24       # parsed as 05:24:00:000
~ 05         # parsed as 05:00:00:000

```

### MemberDef

The Time is derived from the String type, hence it shares the same [MemberDef](../#memberdef) as the String. However, Time enforces additional constraints with the respective time format and the same is applicable to the Time MemberDef.\
