# summary

- what you can do

  - filter
    - include
    - equal
    - condition
    - array / nest
  - skip
  - limit
  - sort

# points

- structure

  - methods
    - findOne
    - findMany
  - filters
    - single: {age: 30}
    - range: {age: {$gt: 30}}
  - operators

    - $gt

    - `db.collection.method(filter)`

- overview

  - query selectors
    - comparison
    - logical
    - element
    - evaluation
    - array
    - comments
    - geoSpatial
  - projection
    - $
    - $elemMatch
    - $meta
    - $slice

- find / findOne

  - major read command
  - not findMany
  - find returns cursor?

- operators

  - less than

  ```
  db.movies.find({runtime: {$lt: 60}})
  ```

  - not equal

  ```
  db.movies.find({runtime: {$ne: 60}})

  ```

- query on embedded document

  - "rating.average"

  ```
  db.movies.find({"rating.average": {$gt: 7}})
  ```

- array query

  - array include "Drama"

  ```
  db.movies.find({genres: "Drama"})
  ```

  - array exact "Drama"

  ```
  db.movies.find({genres: ["Drama"]})
  ```

- $and

```
db.movies.find({
$and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }],
});
```

- count

```
db.movies.countDocuments({ genres: "Drama" });
```

- exists - if data exists

```

db.users.find({age: {$exists: true, $ne: null}})

```

- $type

```

db.users.find({age: {$type: "number"}})

```

- $expr

  - to compare 2 values in a document
    - add $ to field to reference

```

db.sales.find({$expr: {$gt: ["$volume", "$target"]}})

```

- complex sample

```
db.sales.find({
  $expr: {
    $gt: [
      {
        $cond: {
          if: { $gte: ["$volume", 190] },
          then: { $subtract: ["$volume", 30] },
          else: "$volume",
        },
      },
      "$target",
    ],
  },
});
```

- array query

  - major search

    - test data

    ```
    {name: "Jack", hobbies: [{title: "Sports", frequency: 3}]}
    ```

    - db.users.find({"hobbies.title": "Sports"})
      - return data
      - this search data including hobbies.title is "Sports"
    - db.users.find({hobbies: {title: "Sports"}})
      - return no data
      - this search exact match, hobbies = {title: "Sports"}

  - $size

    - exact match only, no $gt or $lt
    - sample

    ```
    db.movies.find({genres: {$size: 3}})
    ```

  - $all

    - to get all data, order do not matter
    - this returns data with order match

    ```
    db.movies.find({genres: ["Drama", "Anime"]})
    ```

    - this returns all data, no order check

    ```
    db.movies.find({ genres: { $all: ["Anime", "Drama"] } })
    ```

- $elemMatch

  - this return `partial match` / `or match`
  - `title = Sports` or `frequency >= 2`

  ```
  db.users.find({
  $and: [{ "hobbies.title": "Sports" }, { "hobbies.frequency": { $gte: 2 } }],
  });
  ```

  - this return match data only

  ```
  db.users.find({
  hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } },
  });
  ```

- cursor

  - mongodb uses js syntax and can save cursor in variable

  ```
  const dataCursor = db.movies.find()
  ```

  - get all data

  ```
  dataCursor.forEach(doc => {printjson(doc)})
  ```

  - check if next exist

  ```
  dataCursor.hasNext()
  ```

  - sort with cursor
    - 1 - ascending
    - -1 - descending

  ```
  db.movies.find().sort({"rating.average": 1, runtime: -1})
  ```

  - skip

    - mongoDB automatically execute command in right order
      - sort - skip - limit

    ```
    db.movies.find().sort({"rating.average": 1, runtime: -1}).skip(10)
    ```

  - limit
    ```
    db.movies.find().sort({"rating.average": 1, runtime: -1}).skip(10).limit(10)
    ```

- projection

  ```
  db.movies.find({}, {name: 1, genres: 1, runtime: 1, rating: 1, _id: 0, "schedule.time": 1})
  ```

  - get highest rate

  ```
  db.movies.find({}, {name: 1, genres: 1, runtime: 1, rating: 1}).sort({"rating.average": -1}).limit(1)
  ```

- projection of array

  ```
  db.movies.find({genres: "Drama"}, {"genres.$": 1})
  ```

  - complex case

  ```
  db.movies.find({genres: "Drama"}, {genres: {$elemMatch: {$eq: "Horror"}}})
  ```

  ```
  db.movies.find({"rating.average": {$gt: 9}}, {genres: {$elemMatch: {$eq: "Horror"}}})
  ```

- $slice

  - get first 2 item in array

  ```
  db.movies.find({"rating.average": {$gt: 9}}, {genres: {$slice: 2}, name: 1})
  ```

  - skip 1 and get 2 item in array

  ```
  db.movies.find({"rating.average": {$gt: 9}}, {genres: {$slice: [1, 2]}, name: 1})
  ```
