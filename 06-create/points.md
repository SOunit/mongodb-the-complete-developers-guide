# Points

- how to save data

  - `client` - `mongodb server` - `storage engine`
    - `storage engine`
      - `Memory` - fast but temporary only
      - `Data on desk` - heavy to write
      - `Journal` - todo list - actual file on desk - easy to write

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

- Atomicity

  - document level atomicity
    - if fail, rollback
  - database - collection - document
  - sample
    - insert 4 data
      - 1, success
      - 2, success
      - 3, fail - rollback
      - 4, success / fail / stop - depends on `insert order`

- Import data
  - work only in local `mongod` server
  - mongodb can import `json` data
  - `mongoimport`
    ```
    mongoimport data.json -d dbName -c collectionName --jsonArray --drop
    ```
