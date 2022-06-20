- $set update, not replace
- replace find() method to updateMany()
- $set updates multiple fields

  ```
  db.users.updateOne(
  { _id: ObjectId("62a298eefabe66e98083249f") },
  {
    $set: {
      age: 40,
      phone: 22233334444,
    },
  }
  );
  ```

- increment / decrement

  - $inc

  ```
  db.users.updateOne( { _id: ObjectId("62a298eefabe66e98083249f") }, { $inc: { age: 1 } });
  ```

- $inc and $set can be used at the same time, but same field update will be error

- $min

  - update if new value is minimum
  - conditional update
  - compare with current data
  - current - 30
  - $min: 35 - no update - min is 35 - no
  - $min: 20 - update - min is 20 - yes

  ```
  db.users.updateOne( { _id: ObjectId("62a298eefabe66e98083249f") }, { $min: { age: 20 } });
  ```

- $max

  - update if new value is max
  - compare with current data

- $mul

  - multiple current value to target

  ```
  db.users.updateOne( { _id: ObjectId("62a298eefabe66e98083249f") }, { $mul: { age: 1.5 } });
  ```

- drop field / $unset

  ```
  db.users.updateMany( { isSporty: true }, { $unset: { phone: "" } });
  ```

- rename field / $rename

```
db.users.updateMany( {}, { $rename: { age: "totalAge" } });
```

- try update and insert data if not exist

```
db.users.updateMany(
  { name: "Maria" },
  {
    $set: {
      age: 30,
      hobbies: [
        { title: "Good food", frequency: 3 },
        { title: "Good food", frequency: 3 },
      ],
      isSporty: true,
    },
  },
  {
    upsert: true,
  }
);
```

- update matched array element

  ```
   db.users.updateMany({hobbies: {$elemMatch: {title: "Sports", frequency: {$gte: 3}}}}, {$set: {"hobbies.$.highFrequency": true}})
  ```

- update matched array elements

  ```
  db.users.updateMany({totalAge: {$gt: 10}}, {$inc: {"hobbies.$[].frequency": 1}})
  ```

- update target element in array

```
db.users.updateMany(
  { "hobbies.frequency": { $gt: 2 } },
  { $set: { "hobbies.$[el].goodFrequency": true } },
  { arrayFilters: [{ "el.frequency": { $gt: 2 } }] }
);
```

- insert one data into array in document

```
db.users.updateOne(
  { name: "Maria" },
  { $push: { hobbies: { title: "Sports", frequency: 2 } } }
);

```

- insert multiple data into array in document

```
db.users.updateOne(
  { name: "Maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "Good Wine", frequency: 1 },
          { title: "Watch Movies", frequency: 2 },
        ],
      },
    },
  }
);

```
