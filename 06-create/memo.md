# Points

- insert vs. insertOne / insertMany

  - `insertOne / insertMany` is better
    - return object id
    - clear what happens
    - recommended way
  - `insert` is old way

- Order insert / insert data if some fail

  - insert order
    - default, ordered insert.
    - if error, stop insertion
  - sample

    ```
    db.persons.insertMany([{name: "Jack", age: 38}, {name: "Jack", age: 38}], {ordered: false})
    ```

  - if order false, that means mongodb try to insert data even if some data fail

- Write concern
  - for data security, more process, but more secure, less performance
  - journal is todo list, lighter operation than writing database directly
  - use journal, and check journal, more security
    - default
    ```
    insertOne({},{writeConcern: {w:1, j: undefined}})
    ```
    - use journal / more secure
    ```
    insertOne({},{writeConcern:{w:1, j: true}})
    ```
    - set timeout, is good for not wait too long and want to try again later
    ```
    insertOne({},{writeConcern:{w:1, wtimeout: 200, j: true}})
    ```
    - no check, super fast
      - {w: 0} means no wait for id generation and etc.
    ```
    insertOne({},{writeConcern: {w:0}})
    ```
