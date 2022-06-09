# data structure

- database
  - collection / tables
    - document
    - document
    - document
  - collection
    - document
    - document
    - document

# setup database

- show dbs / show databases
- use flightsshow
- show tables / / show collections

# crete database

- use newDatabase
- db.collectionName.insertOne({name: 'Jack'})
- db.collectionName.find().pretty()

# CRUD

## Create

- insertOne(data, options)
- insertMany(data, options)

## Read

- find(filter, options) - return all
- findOne(filter, options) - return first one

## Update

- updateOne(filter, data, options)
- updateMany(filter, data, options)
- replaceOne(filter, data, options)

## Delete

- deleteOne(filter, options)
- deleteMany(filter, options)

## reset db

show dbs
use dbName
db.dropDatabase()
db.myCollection.drop()
