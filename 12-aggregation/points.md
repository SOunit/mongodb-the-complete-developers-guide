- access nested data using "$data.nested"

- uppercase:

  - {$toUpper: "this will be upper case"}

- substring characters:

  - {$substrPC: ["target character", 0, 1]}
  - {$substrPC: ["target character", startPos, targetCount]}

- get length

  - { $strLenCP: "$name.first" }

- subtract 10 - 1

  - {$subtract: [10, 1]}

- can repeat same stage

```
db.persons.aggregate([
  { $project: { _id: 0, name: 1, email: 1 } },
  { $project: {} },
]);
```
