# TypeSchema Interface

The validation core for data types (string, number, boolean, array, object, etc.).

## Contract

Every type implements the same contract:

- `parse(node, config, defs?)` → value  (from IO source via AST)
- `load(value, config, defs?)`  → value  (from JS value)
- `validate(value, config, node?, defs?)` → value or throw
- `stringify(value, config)` → IO-encoded string
- Optional: `compile(config)` → fast validator; `getDefaultValue(config)`

## Design Principles

1. Throw on validation failure (no result wrappers)
2. Shared validation core used by parse/load
3. Node-based errors carry position info
4. Deterministic & stateless per call

## Example (String)

```ts
// Pseudocode outline inspired by io-js2 implementation
class StringType implements TypeSchema<StringConfig, string> {
  readonly typeName = 'string';
  validate(value: unknown, config: StringConfig): string {
    if (typeof value !== 'string') throw Error('not a string');
    if (config.minLen && value.length < config.minLen) throw Error('minLen');
    if (config.maxLen && value.length > config.maxLen) throw Error('maxLen');
    return value;
  }
  parse(node, config) { /* extract string token, then validate */ }
  load(value, config)  { return this.validate(value, config); }
  stringify(value)     { return value; /* escape per string rules */ }
}
```

## Containers and MemberDef

- MemberDef references a TypeSchema (directly or by type name) and applies constraints.
- Arrays: TypeSchema is applied to each element; array-level rules enforce length/uniqueness.
- Objects: each field’s TypeSchema validates the field; object-level rules enforce open policy and dynamic fields (`*`).

## See Also

- [MemberDef](11-memberdef.md)
- [Types](data-types/01-TYPE-INDEX.md)
- Source: `io-js2/src/schema-v2/types/type-schema.ts`
