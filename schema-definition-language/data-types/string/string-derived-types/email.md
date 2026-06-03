---
description: The email type — a string validated as an email address.
---

# Email

`email` is a `string` shortcut (see [String Types](../README.md)) whose value MUST be a valid
email address. It shares the string [MemberDef](../../../memberdef.md) (`choices`, `pattern`,
`minLen`, …) and adds email-format validation.

```ruby
userEmail: email
---
~ test@example.com    # ✓
~ notanemail          # ✗ invalid-email
```

Restrict to a fixed set with `choices`:

```ruby
companyEmail: { email, choices: [info@acme.com, sales@acme.com] }
---
~ info@acme.com       # ✓
~ other@acme.com      # ✗ invalid-choice
```

## See Also

* [String Types](../README.md) · [URL](url.md)
* [MemberDef](../../../memberdef.md)
