- export data

  ```
  mongoexport -h $MONGO_HOST --db $MONGO_DBNAME --collection $COLLECTION_NAME -o users.json
  ```

  ```
  mongoexport --db movieData --collection users -o users.json --jsonArray
  ```

- import data

  ```
  mongoimport users.json -d movieData -c users --jsonArray --drop
  ```
