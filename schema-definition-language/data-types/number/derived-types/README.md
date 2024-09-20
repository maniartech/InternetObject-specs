# Derived Types

Internet object specifies the following number derived types and also provides built-in support for them.



![The Number and Its Derived Types](https://documents.app.lucidchart.com/documents/076b4f9c-b79d-410c-8002-1ac23fdbb786/pages/PWmmXH90OO-B?a=22764\&x=9167\&y=328\&w=1169\&h=704\&store=1\&accept=image%2F\*\&auth=LCA%20df28f30ab343d5ca0de9d2ba165e4d58adccec48-ts%3D1611583184)

The following snippet represents a number and its derived types.

```yaml
# Number and its derived types
{ applicationNo: int, 
  rollNo: int32, 
  totalScore: int16,
  percentage: number,
   paperCode: byte
 }
---
{ 
8754489612, 
  125447,   
  566,      
  94.33,    
  48        
}
```

Here the  `applicationNo` is of integer type and will only accept integers. Similarly, `rollNo`, `totalScore`, `percentage` and `paperCode` are of different types such as `int32`, `int16`, `number`, and `byte`. Therefore they will only accept values with the defined types for the respective variable.
