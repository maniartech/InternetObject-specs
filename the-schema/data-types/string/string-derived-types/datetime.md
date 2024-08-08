# DateTime

Internet Object DateTime is inspired by the ISO 8601 format. DateTime can be passed as a string and is represented in the following ways, with or without separators.&#x20;

Date Time format with separator: `YYYY-MM-DDThh:mm:ss.SSSZ`&#x20;

Example : `1997-07-16T19:20:30.500+01:00`&#x20;

Date Time format without separator: `YYYYMMDDThhmmss.SSSZ`

Example: `19970716T192030.500+0100`

The DateTime is the string type and therefore there is no need to enclose it in the double quotation mark `(" U+0022)` as parser identifies it as a string.

Here, `T` is a delimiter used to separate the `date` from the `time`. The `time` portion in the `DateTime` object must be preceded by `T`.  `Z` represents the  time zone designator (`+hh:mm` or `-hh:mm`).\


![The DateTime Structure](https://lh5.googleusercontent.com/HZfCS7ZFKQQw-QG7mFfJSeHzQ3C53tnIWbLCab5EVlghVyn-ZMeNm0C7qifdI315eqZn5ifoRJ7rJ8R8NBTQeIAUGFFCy7bIju6SyenaKmU\_Ryr8T\_toC9DZrAVKUTDHjQxcbK-D)

### Legends&#x20;

| **Symbol** | Represents  | Range                   | Default Value |
| ---------- | ----------- | ----------------------- | ------------- |
| `YYYY`     | Year        | `1990, 1991...`         | `-`           |
| `MM`       | Date        | `01, 02 ... 11, 12`     | `01`          |
| `DD`       | Month       | `01, 02 ... 30, 31`     | `01`          |
| `HH`       | Hour        | `00, 01 ... 22, 23`     | `00`          |
| `mm`       | Minute      | `00, 01 ...  58, 59`    | `00`          |
| `ss`       | Second      | `00, 01 ... 58, 59`     | `00`          |
| `SSS`      | Millisecond | `000, 001 ... 998, 999` | `000`         |

{% hint style="info" %}
The Year field must be provided as it does not have any default value.
{% endhint %}

### Separator Legends

| **Symbol** | **Character**     | **Unicode** | **Description**                            |
| ---------- | ----------------- | ----------- | ------------------------------------------ |
| `-`        | Hyphen            | `U+002D`    | Used to separate parts of the date         |
| `:`        | Colon             | `U+003A`    | Used to different parts of time            |
| `.`        | Period            | `U+002E`    | Used to separate seconds from milliseconds |
| `T`        | Alphabet `"T"`    | `U+0054`    | DateTime separator                         |

{% hint style="info" %}
The Date must be complete such as YYYY-MM-DD or YYYYMMDD before providing the time.
{% endhint %}

### **Time Zone**

The Time Zone can be represented as `±hh: mm` or `±hhmm` i.e with or without separators. For example, `+00:00`, +`0000` or +`00`. However, representing `-00:00`, `-0000`, or `-00` is not permitted. While representing a Time Zone, a plus sign must be used for positive zero values and a minus sign for negative values.&#x20;

Time Zone is written at the end of a DateTime. It is not a separate data type on its own. It can only be passed when both date and time are passed to a DateTime object. `"Z"` can be directly added after time without space, where `"Z"` is the zone designator for the zero UTC offset. It defaults to Z or Zulu Time or Greenwich mean time (GMT) or `+0:00`.&#x20;

![The Structure of Time zone](https://lh3.googleusercontent.com/8FcFnhPMOD7gRgXIiY8Ov\_w0YQwMy-rV7MK4vc2OLhKdkrSsoQadwU46h1RumE2OP76pAsgGG1lC4JpkvoHpvS\_z581-N-x3HocwPJl9Q7XpqcdZeaDmfFX8wdch6NPPwnbP\_qmT)

| **Time Zone with separators:** | **Time Zone without Separators:** |
| ------------------------------ | --------------------------------- |
| `+HH:mm` = `+05:30`            | `+HHmm` = `+0530`                 |
| `+HH` = `+05`                  | `+HH` = `+05`                     |
| `-HH:mm` = `-12:30`            | `-HHmm` = `-1230`                 |
| `-HH` = `-12`                  | `-HH` = `-12`                     |

Valid date-time representation with separator separating date, time, and time-zone

```ruby
# DateTime with separators 
YYYY-MM-DDTHH:mm:ss.SSSZ = 2020-12-31T12:34:55.675Z # 2020-12-31T12:34:55.675Z
YYYY-MM-DDTHH:mm:ss.SSS	= 2020-12-31T12:34:55.675 # 2020-12-31T12:34:55.675
YYYY-MM-DDTHH:mm:ss = 2020-12-31T12:34:55 # 2020-12-31T12:34:55.000
YYYY-MM-DDTHH:mm = 2020-12-31T12:34 # 2020-12-31T12:34:00.000
YYYY-MM-DDTHH = 2020-12-31T12 # 2020-12-31T12:00:00.000
YYYY-MM-DD = 2020-12-31 # 2020-12-31T00:00:00.000
YYYY-MM = 2020-12 # 2020-12-01T00:00:00.000
YYYY = 2020 # parsed as 2020-01-01T00:00:00.000
```

Valid date-time representation without separator separating date, time, and time-zone.

```ruby
# DateTime without separators 
YYYYMMDDTHHmmssSSSZ	= 20201231T123455.675Z # 2020-12-31T12:34:55.675Z
YYYYMMDDTHHmmssSSS = 20201231T123455.675 # 2020-12-31T12:34:55.675
YYYYMMDDTHHmmss = 20201231T123455 # 2020-12-31T12:34:55.000
YYYYMMDDTHHmm = 20201231T1234 # 2020-12-31T12:34:00.000
YYYYMMDDTHH	= 20201231T12 # 2020-12-31T12:00:00.000
YYYYMMDD = 20201231 # 2020-12-31T00:00:00.000
YYYYMM = 202012 # 2020-12-01T00:00:00.000
YYYY = 2020 # parsed as 2020-01-01T00:00:00.000
```

Defining date time in the Internet Object Document.

```yaml
# Set loginDatetime type as datetime  
loginDatetime: datetime
---
~  2020-01-31T10:34:55.675
~  20200131T103855.324
```

Defining date time with timezone in the Internet object Document.

```yaml
# Set loginDatetime type as datetime 
# and pass datetime with timezone
loginDatetimezone: datetime
---
~  2020-01-31T10:34:55.675+05:30
~  20200131T103855.324+0530
```

{% hint style="info" %}
The date and time must be complete such as YYYY-MM-DDTHH:mm:ss.SSS or YYYYMMDDTHHmmssSSS before providing timezone.
{% endhint %}

### MemberDef

The DateTime is derived from the String type, hence it shares the same [MemberDef](../#memberdef) as the String. However, DateTime enforces additional constraints with the respective Datetime format and the same is applicable to the DateTime MemberDef.\
