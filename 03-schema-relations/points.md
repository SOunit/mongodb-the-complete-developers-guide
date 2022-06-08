# points (from summary video)

- things to consider

  - format to get
  - how often fetch and change?
  - the size of data
  - the relationship
  - duplicate?

- model schema
  - data type
- model relation

  - embedded / reference
    - one-to-one
      - user - profile
    - one-to-many
      - user - blog-post
      - user - order
    - many-to-many
      - user - book
      - use reference

- aggregate / lookup

  - fetch joined data
  - from - from author - foreign collection is author
  - localField - author field in books collection
  - foreignField - field name in author

  ```
  db.books.aggregate([{$lookup: {from: "authors", localField: "authors", foreignField: "_id", as: "test"}}])
  ```

- schema validation

  - validation level
    - strict
      - insert
      - update
    - moderate
      - insert
      - not update
  - validation action
    - error
    - warning

- schema validation sample

  - drop collection

  ```
  db.posts.drop()
  ```

  - setup validation when create a collection

  ```
  db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be a string and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be a string and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be a objectId and is required",
              },
            },
          },
        },
      },
    },
  },
  });

  ```

  - modify validation

  ```
  db.runCommand({
  collMod: 'posts',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectid and is required'
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objectid and is required'
              }
            }
          }
        }
      }
    }
  },
  validationAction: 'warn'
  });
  ```
