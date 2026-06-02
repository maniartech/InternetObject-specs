# TypeDef

A **TypeDef** ("type definition") in Internet Object is the meta MemberDef for a data type. It is a formal Internet Object object that describes all the valid options, constraints, and validation rules for values of that type.

TypeDefs allow Internet Object to:

* Define strict, standard, and extensible contracts for each data type
* Interpret both positional and keyed members in user MemberDefs
* Ensure validation, code generation, and tooling are consistent for every field

TypeDefs themselves use the full Internet Object object syntax—so every rule that applies to IO objects also applies to TypeDefs.

### **TypeDef is the Meta MemberDef for Types**

* **TypeDef**: The "contract" or master MemberDef for a type; defines what is valid in MemberDefs for that type.
* **MemberDef**: What schema authors write for fields; always validated against the TypeDef of its declared type.
* **All rules for IO objects and MemberDefs apply to TypeDefs** (keyed/positional, optional, null, etc.).

### **TypeDef Format and Syntax**

A TypeDef is written as a valid Internet Object object.

* **Members are always treated as options** (usually optional, unless the type demands otherwise).
* **Both positional and keyed entries** can be defined, following IO object rules.
* **Conventions like `?` (optional) and `*` (nullable) are allowed**.

#### **TypeDef Example: number**

```ruby
type?       : {number, choices: [number, int, int16, int32, byte]},
default?    : number,
choices?    : [number],
min?        : number,
max?        : number,
multipleOf? : number,
format?     : {string, choices: [decimal, hex, octal, binary, scientific]},
null?       : {bool, F},
optional?   : {bool, F}
```

* **type?**: Allowed type(s) for this number MemberDef (including derived types).
* **default?**: Default value for the field (optional).
* **choices?**: Allowed set of values (optional).
* **min?**, **max?**: Numeric range constraints (optional).
* **multipleOf?**: Mathematical constraint (value must be a multiple). **format?**: serialization base.
* **null?**, **optional?**: Whether value may be null or optional.

### **Positional and Keyed Members**

TypeDefs support both positional and keyed options, based on the standard IO object rules.

* **Positional values** are interpreted in the order specified by the TypeDef.
* **Keyed options** can be provided in any order after positional values.

**For example:** The TypeDef for number expects:

* 1st position: type (`number`, `int`, etc.)
* 2nd position: default value
* 3rd position: choices array

User MemberDefs may use:

```ruby
age: {number, 20}                       # type=number, default=20
age: {int16, 20, [10,20,30,40,50]}      # type=int16, default=20, choices=[...]
age: {number, min: 10, max: 99}         # type=number, min/max set
age: {number, 10, [5,10,15], min:5}     # type=number, default=10, choices=[5,10,15], min=5
```

### **How TypeDefs Are Used**

When a schema author writes a MemberDef for a field (e.g. `age: {number, min:10}`), the validator:

1. Looks up the TypeDef for the declared type (`number`).
2. Interprets any positional values according to their order in the TypeDef.
3. Checks that all keys used are defined and valid in the TypeDef.
4. Applies all relevant validation logic and reports any errors.

**Invalid MemberDef Example:**

```ruby
age: {number, minimum: 10, maximum: 99}  # ❌ invalid: keys not in TypeDef
```

**Valid MemberDef Examples:**

```ruby
age: {number, min: 10, max: 99}
age: {int16, 20, [10, 20, 30, 40, 50]}
age: {number, min: 10, max: 99, null:T}
```

### **TypeDef vs. MemberDef: Quick Comparison**

| Role          | Who writes it   | Applies to           | Example                           |
| ------------- | --------------- | -------------------- | --------------------------------- |
| **TypeDef**   | IO Spec authors | All fields of a type | See example for number above      |
| **MemberDef** | Schema authors  | Individual fields    | `age: {number, min: 10, max: 99}` |

* **TypeDef is always validated as an IO MemberDef**.
* **User-written MemberDefs are always checked against the TypeDef for their type.**

### **Enforced Validation and Error Handling**

If a user provides any key or positional value in a MemberDef that is not present (or allowed) in the TypeDef, the schema will not validate.

**For example:**

```ruby
age: {number, minimum: 10}  # ❌ Error: "minimum" is not a valid key for number
score: {number, pattern: "\\d+"} # ❌ Error: "pattern" is not a valid key for number
```

### **Standardization and Portability**

* TypeDefs **cannot** be changed or extended by schema authors.
* Only IO spec maintainers can define TypeDefs for core types—ensuring consistency across systems and tools.

### **Finding TypeDefs**

* Each built-in type's documentation page in the IO spec includes its TypeDef (see "number", "string", "array", etc.).
* These are canonical, and are the only source of truth for valid constraints/options for a type.

### **FAQ**

**Q: Can I add new options to a TypeDef for a type in my own schema?** A: No. TypeDefs are fixed in the IO spec, ensuring standard validation everywhere.

**Q: Can positional values be used for all types?** A: Only if the TypeDef for that type defines them in a positional order.

**Q: How does the validator know how to interpret my MemberDef?** A: It uses the TypeDef for your field's type, and applies both positional and keyed rules accordingly.

**Q: Is TypeDef itself an IO object and memberdef?** A: Yes—TypeDef uses full Internet Object object/memberdef syntax and is parsed and validated the same way.

### See Also

* [MemberDef Reference](memberdef.md) - How to write MemberDefs for fields
* [Schema Definition Language](internet-object-schema.md) - Overview of Internet Object schema syntax
