---
description: How collections enable streaming of records.
---

# Data Streaming

Because a collection is a sequence of independent records, it is naturally **streamable**: a
producer can emit records over time and a consumer can process each as it arrives, without
waiting for the whole document.

```ruby
~ $schema: { name: string, address: { street, city, state }, active: bool }
---
~ John Doe, { Red Street, Phoenix, AZ }, T
~ Alex, { Carnival Street, San Francisco, CA }, T
```

Further records for the same collection can be sent later in additional batches; a processor
merges them into the same collection. Each record is validated on its own, so a malformed
record does not interrupt the stream.

> **Streaming is evolving.** The detailed streaming model (framing, readers/writers,
> backpressure, mid-stream schema changes) is under active development; the implementation
> currently leads the specification, and this section will be expanded as the design stabilizes.

## See Also

* [Collection](collection.md) · [Collection Rules](collection-rules.md)
* [Creating Collections](creating-collection.md)
