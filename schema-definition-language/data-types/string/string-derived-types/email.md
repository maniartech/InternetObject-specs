# Email

Other than regular string, raw string, and open string, a string can be passed as an Internet email as it is predefined in the parser. The email format is derived from the [HTML 5.1-Forms Email syntax](https://www.w3.org/TR/2016/REC-html51-20161101/sec-forms.html#email-state-typeemail) recommended by W3C.  Internet Object Email Format does not follow the RFC-5322 email representation as it is too strict to implement for the users.&#x20;

Email format follows the syntax specified in the [HTML 5.1 W3C recommendation under section  4.10.5.1.5. ](https://www.w3.org/TR/2016/REC-html51-20161101/sec-forms.html#email-state-typeemail)

The  code snippet shows how to define an `email-id` in the Internet Object Document.

```yaml
# Defining an Email
userEmail: email
---
test@example.com
```

```yaml
# Using  derived type email to pass email Information  
Subject: {
         string, 
         From: string, 
         To: string, senderEmail: email, 
         reciverEmail: email
         }
---
{    
     An official Email, 
     John Doe, Alex Wick, 
     johndoe@example.com,
     alexwick@example.com
}
```

### MemberDef

The Email is derived from the String type, hence it shares the same [MemberDef](../#memberdef) as the String. However, Email enforces additional constraints with the respective email format.&#x20;

#### **Choices**

The `choices` can be added to member variables in the email so that it is restricted to the fixed set of available choices. Choices must be an array of valid emails. Here, the snippet shows how to add choices for the string subtype email.&#x20;

```yaml
# Assign choices for a companyEmail.  
companyEmail: {
  type: email, 
  choices: [test@example.com, test2@example.com, 
              test3@example.com, test4@example.com]
}
---
test@example.com
```

#### pattern

User may specify `pattern` for the email by defining `pattern`  as shown in the snippet below.

```yaml
# Set pattern for referenceEmail with type email.
referenceEmail: {
  type: email , 
  pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
 }
---
~ johndoe@example.com
~ alexwick@example.com

```

&#x20;
