# memo

- use aggregation library in mongodb to data manipulation
  - different format data
    - for data scientist
    - for customer
- aggregation framework

  - alternative of find method
  - aggregation pipelines
    - collection
    - $match
    - $sort
    - $group
    - $project
    - $unwind
    - output / list of documents

- aggregate

  - $match - filter data - same way in find

  ```
  db.persons.aggregate([
    {$match: {gender: "female"}}
  ])
  ```

  - $group - group data via filed / fields

  ```
  db.persons.aggregate([
    { $match: { gender: "female" } },
    {
      $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } },
    },
  ]).pretty();
  ```

  - $sort

  ```
  db.persons.aggregate([
    { $match: { gender: "female" } },
    {
      $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } },
    },
    { $sort: { totalPersons: -1 } }
  ]).pretty();
  ```

  - $project

    - like select
    - can used in find too
    - $concat

      - concat hardcode string

      ```
      db.persons.aggregate([
        {
          $project: {
            _id: 0,
            gender: 1,
            fullName: { $concat: ["hello", "world"] },
            },
        },
      ]).pretty();
      ```

      - concat

      ```

      db.persons.aggregate([
        {
          $project: {
              _id: 0,
              gender: 1,
              fullName: { $concat: ["$name.first", " ", "$name.last"] },
          },
        },
      ]).pretty();

      ```

      - uppercase

      ```

      db.persons.aggregate([
        {
          $project: {
              _id: 0,
              gender: 1,
              fullName: { $concat: [{$toUpper: "$name.first"}, " ", {$toUpper: "$name.last"}] },
          },
        },
      ]).pretty();

      ```

      - uppercase first character only

      ```
      db.persons.aggregate([
          {
            $project: {
              _id: 0,
              gender: 1,
              fullName: {
                $concat: [
                  { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
                  {
                    $substrCP: [
                      "$name.first",
                      1,
                      {
                        $subtract: [{ $strLenCP: "$name.first" }, 1],
                      },
                    ],
                  },
                  " ",
                  { $toUpper: "$name.last" },
                ],
              },
            },
          },
        ]).pretty();

      ```

- group / push

```
db.friends.aggregate([
  {
    $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } },
  },
]);

```

- $unwind
