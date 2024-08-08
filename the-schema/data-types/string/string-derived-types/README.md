# String Derived Types

Internet object specifies `email`, `url`, `datetime`, `date` and `time` as derived types of string and also provides built-in support for them.

![                                The strings and its derived types](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/6ugmWkdfYNiK?a=22764\&x=7747\&y=341\&w=1169\&h=858\&store=1\&accept=image%2F\*\&auth=LCA%2063bf229be300f5f33c295a9cb9212556cc5d2e58-ts%3D1611281570)

The following snippet represents a string and its derived types.

```yaml
# Strings and its derived types
{ 
  name: string, 
  emailId: email, 
  profileUrl: url,
  journyDate: date,
  departureTime: time,
  bookingDatetime: datetime
   
 }
---
{ 
 Christopher Andrews,                                # string
 christopher.andrews01@xyz.com,                      # email
 https://www.abc.com/in/christopher-andrew-06528b155 #url
 2021-02-09                                          # date
 06:30:00                                            # time
 2020-12-30T12:39:48.545                             #datetime
}
  
```

Here the, `name` is of string type and will only accept strings. Similarly, `emailId`, `profileUrl`, `journyDate` `departureTime` and `bookingDatetimedate` are of different types such as `email`, `url`, `date`, `time`, `datetime`. Therefore they will only accept values with the defined types for the respective variable.

