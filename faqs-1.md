---
description: >-
  Frequently Asked Questions about Internet Object (In no particular order).
  These are the questions that have been frequently asked after the concept was
  previewed to the community.
---

# FAQs

## Why do we need another data-interchange format?

As the Greek philosopher, Heraclitus, said: “change is the only constant.”. Internet Object was created to address some of the issues found in JSON which happens to be the most prominent data serialization format today. For more information, [please read the story](https://internetobject.org/the-story/).

## Does Internet Object support binary data?

One of the primary objectives of the Internet Object is to be solely a text-based human-readable serialization format. Hence, the current version of Intenet Object natively does not support direct binary data. Binary data may be escaped using the algorithms like Base64 so that it can be passed as a string value.

## Can the Internet Object parser parse the JSON object?

JSON support was not one of the objectives of creating the Internet Object. However, the final format turned out to be JSON compatible. So yes, Internet Object understands the JSON format.

## Can the Internet Object Schema validate JSON objects?

Yes, Internet Object schema can validate an Internet Object document as well as a JSON object.

## When compared with JSON, is Internet Object smaller?

The uncompressed (non-gzipped) IO document is generally 40% smaller. When compared with gzipped versions of JSON and IO documents, we saw unpredicatable results. Sometimes IO document was smaller than JSON, sometimes it was around the same size. On a few occasions, the JSON document was a bit smaller than the IO version.

## When compared with JSON, is Internet Object document building and parsing is faster?

Internet Object is a very simple format. It is very easy to build the document just by concatenating the strings! In such cases, it is very fast to build the document. However, in reality, the performance of the parsing depends upon the parser and other factors. A well-written parser will be faster than poorly written parsers.

## I would like to contribute. How do I do that?

Great, that you would like to support Internet Object. You can contribute in many ways.

**Some of them are...**

1. Join the team that is developing an Internet Object library in your favorite language.
2. Write a blog or article about the Internet Object
3. Help friends and colleagues get started with the concept
4. Help us develop various technical documentations
5. Be a proofreader and help us correct the specification and document language
6. Translate the documentation in various languages
7. Spread the word about Internet Object
