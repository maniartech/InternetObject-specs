# Variables

The Internet Object document promotes reusability through variables. It allows defining variables that can be applied to simplify schema and definitions, obfuscate values, or reduce the data size. Every key defined in the definition section can be used as a variable.&#x20;

### Types of Variables

Internet Object variables can be categorized into two groups.&#x20;

1. Value Variables
2. Schema Variables

#### Value Variable

The Value variables are used to directly access and reuse values.

```ruby
# Defining value variables 
~ record: 123
~ y: yes
~ n: no
~ rgb: [red, green, blue]
---
```

In the above snippet `records`, `y`, `n`, and `rgb` are the value variables.&#x20;

#### Schema Variable

The schema variables start with `$`sign and it is used to directly access and reuse schema.

```ruby
# Defining schema variables
~ $address: {
    street: string, 
    zip: {string, maxLength: 5}, 
    city: string
  }
~ $person: {
    name: string,
    age: int,
    homeAddress?: $address,
    officeAddress?: $address
  }
 ---
```

In the above code snippet, the schema variable `address` is reused in another schema variable named `person` .&#x20;

### Advantages and Use Cases

#### Reuse Definitions

The value variables and schema variables enable the reuse of definition.

```ruby
# Reusing value variable and schema variable
~ y: yes
~ n: no
~ rgb: [red, green blue]
~ $address: { 
            street: string, 
            zip: {string, maxLength: 5}, 
            city: string }
~ $person: {
    name: string,
    age: int,
    seniorCitizen: {choices: [$y, $n]}
    color: {string, choices: $rgb},
    homeAddress?: $address,
    officeAddress?: $address
       }
---
Spiderman, 25, $n, red, {Queens, 50010, New York}, {Bond Street, 50001, New York}
```



```ruby
# Reusing value variable and schema variable
~ $person: {
    name: string,
    age: int,
    seniorCitizen: {choices: [yes, no]}
    color: {string, choices: [red, green, blue},
    homeAddress?: {
      street: string, 
      zip: {string, maxLength: 5}, 
      city: string
    },
    officeAddress?: {
      street: string, 
      zip: {string, maxLength: 5}, 
      city: string
    }
  }
---
Spiderman, 25, no, red, {Queens, 50010, New York}, {Bond Street, 50001, New York}
```

#### Obfuscate Data

Variables are also used for hiding critical information with modified content to enforce data protection and security.&#x20;

The following example demonstrates how one can pass critical information over the internet using variables.

```ruby
# Key saved on the client side
~ s: ghhhj456nhghhhy11569bbbgtxxcv123654897
~ a: jk889456llkhynnnk12364lkkkhuk4125336nk
```

The above code snippet represents `secrectKey` as  `s` and `activationKey` as `a` saved on the client-side. This information is securely passed over the internet using variables as shown below, &#x20;

```ruby
# Information passed on the server
~ y: yes
~ n: no
~ rgb: [red, green blue]
~ $address: {city, zipCode, state} 
~ $person: {
             name, 
             age, 
             currentAddress: $address, 
             permanentAddress: $address
            }
~ $accountDetails: {
                    name,
                    phoneNo, 
                    currentAddress: $address, 
                    secretKey, activationKey
                    }
---
Spiderman, 7855423656,  {Queens, 50010, New York}, $s, $a
```

The receiver will receive the following information without compromising on data security.&#x20;

```ruby
# Information Received by the receiver
{
  name: "Spiderman",
  phoneNo: 7855423656,
  currentAddress:{
                   city: "Queens",
                   zipCode: 50010,
                   state: "New York"
                 }
secretKey: "ghhhj456nhghhhy11569bbbgtxxcv123654897",
activationKey: "jk889456llkhynnnk12364lkkkhuk4125336nk"      
}
```

#### Reduce data size

The use of variables helps to reduce the code size as it enables definition reuse that ultimately reduces bandwidth utilization.

```ruby
#  Reduce the code length by facilating code reuse
~ rgb: [red, green blue]
~ $address: {
             street: string, 
             zip: { string, maxLength:5 }, 
             city: string 
             }
~ $accountDetails: {branchName:string, accountNo, IFSCcode}   
~ $person: {
             name: string,
             age: int,
             bankaccountInfo: $accountDetails,
             color: { string, choices: $rgb },
             homeAddress?: $address,
             officeAddress?: $address
            }
---
{ Spiderman, 25, red, 
   {Queens, 50010, New York}, 
     {Bond Street, 50001, New York}
     }

```

In the above code snippet, the schema variable `address` and `accountDetails` are used in the `person` schema definition. So, rather than creating a similar schema multiple times for `address` it can be created once and reused multiple times in the document.

#### Improves schema readability&#x20;

Variables improve schema readability by grouping similar and reusable codes and limiting line length.&#x20;

