# Date

Derived from String, the Internet Object Date is an ISO 8601 compatible date format. It can be represented as `YYYY-MM-DD` or `YYYYMMDD` i.e It can be passed with or without separators `(- U+002D).` \


![The Date Structure](https://lh6.googleusercontent.com/EYPmjXE17lpouwo488q2k0UmTxQxq0sU6NaLhkK1VbPrQ4UOeCneaW\_1ir0xl4c1D3RDqohHhLwNv0mpF-EtT0lD0laOSCMEyiX5UzeI1f2vnEdIpbni76nCtGTGiSzVgO6EGMOp)

|  Value |                           Description                           | Optional | Default | Example |
| :----: | :-------------------------------------------------------------: | -------- | ------- | :-----: |
| `YYYY` | <p>Four-digit decimal number</p><p>(<code>0000-9999</code>)</p> | No       | `-`     |  `2020` |
|  `MM`  |                two-digit  decimal number (`01-12`)              | Yes      | `01`    |    `04` |
|  `DD`  |                two-digit decimal number (`01-31`)               | Yes      | `01`    |    `30` |

{% hint style="info" %}
The value for the year must be provided as it does not takes any default value.
{% endhint %}

It prescribes a minimum four-digit year format from a range `0000` to `9999` to avoid the year `2000` problem. However,  years from  a range `1583` to `9999` are automatically allowed by a standard, while years prior to `1583` can only be used by mutual agreement of the partners in information interchange.



| **Date with separators:**   | **Date without Separators:** |
| --------------------------- | ---------------------------- |
| `YYYY-MM-DD` = `2020-02-17` | `YYYYMMDD` = `20200217`      |
| `YYYY-MM` = `2020-02`       | `YYYYMM` = `202002`          |
| `YYYY` = `2020`             | `YYYY` = `2020`              |

Here is the code snippet demonstrates, how to define and use date type.

```yaml
# Defining date for registeredDate
registeredDate: date
---
~ 2020-09-17    
~ 20200917      # parsed as 2020-09-17
~ 2020-09       # parsed as 2020-09-01
~ 2019          # parsed as 2019-01-01

```

### MemberDef

The Date is derived from the String type, hence it shares the same [MemberDef](../#memberdef) as the String. However, Date enforces additional constraints with respective date format and the same is applicable to the Date MemberDef.
