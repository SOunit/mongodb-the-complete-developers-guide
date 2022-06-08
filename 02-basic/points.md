# points (copy from summary)

- databases, collections, documents

  - created lazily, more flexible than SQL
  - database - collections - documents
  - structure
    - databases
      - collections
        - documents
        - documents
        - documents
        - documents
      - collections
        - documents
        - documents
        - documents
        - documents

- Document structure

  - each document has unique ID
  - can have data like json format, embedded document and array

- CRUD

  - find returns a cursor!
  - filter to find specific document
  - filter to limit documents
  - projection for limit fields

- Projection

```
db.passengers.find({}, {name: 1}).pretty()
```

- cursor object
  - find returns cursor object
  - not all documents, only first 20
  - cycle through the data
  - toArray() gives back all data
  - forEach() is also common approach
  - pretty() is function on cursor, that's why findOne do not support
