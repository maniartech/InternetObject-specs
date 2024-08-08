# Data Streaming

For frequently passing object data between the system over the internet there is a need to stream objects over a single connection.&#x20;

As the collection enables embedding more than one independent record in the document because of its nature it allows streaming real-time data changes. So that the application can react immediately to the changing events in real-time.

{% tabs %}
{% tab title="Schema" %}
```ruby
~ $address: {street, city, state}
~ $schema: {name, $address, isActive, * } 
```
{% endtab %}
{% endtabs %}

Multiple records can be sent in batches after validating with the schema as,

{% tabs %}
{% tab title="Batch 1" %}
```ruby

~ John Doe, {Red Street, Phoenix, US}, T              # valid 
~ Alex, {Carnival Street, San Fransisco, US}, T, Male # valid
~ Bob, {Green Street, Los Angeles, US}, T, Cool       # valid

# First batch of the record 
```
{% endtab %}
{% endtabs %}

After you have received the first batch of records, the collection allows you to receive more records for the same collection separately. The Internet Object processor should take care of merging the stream of data into the same collection.

{% tabs %}
{% tab title="Batch 2" %}
```ruby
~ Oliver, {Alpha Street, Denver, Colorado}, T, "77858"# valid 
~ Max, {Hill Street, Jacksonville, Florida}, T, 789445 # valid
~ James, { Elm Street, Los Angeles, California}, T, 24 # valid

# Second batch of the record 
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Internet Object does not prevent the number of records streamed over with a collection
{% endhint %}
