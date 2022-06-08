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

- and

```
db.movies.find({
$and: [{ "rating.average": { $gt: 9 } }, { genres: "Drama" }],
});
```

- count

```
db.movies.countDocuments({$and: [{genres: "Drama"}]})
```

- exists - if data exists

```
db.users.find({age: {$exists: true, $ne: null}})
```
