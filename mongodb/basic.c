/**
 * MongoDB is a NoSQL, document-oriented database designed for high performance, 
 * high availability, and easy scalability. It is known for its flexible schema 
 * design, allowing for the storage of data in JSON-like documents, which can 
 * vary in structure. This flexibility makes MongoDB an ideal choice for 
 * applications that handle a wide variety of data types and structures.
 */

// Features of MongoDB
// ---------------------

// Document-Oriented Storage:
// Data is stored in BSON (Binary JSON) format.
// Documents (akin to rows in SQL) can have varying structures.

// Schema Flexibility:
// No need for a predefined schema.
// Schema can evolve over time without downtime.

// Scalability:
// Supports horizontal scaling through sharding.
// Easily scales out by distributing data across multiple servers.

// High Availability:
// Automatic failover using replica sets.
// Ensures data redundancy and reliability.

// Rich Query Language:
// Supports a wide range of queries: field, range, and regular expression searches.
// Aggregation framework for complex data processing.

// Indexing:
// Supports various types of indexes (single field, compound, multi-key, text, geospatial).
// Indexes improve query performance significantly.

// Aggregation Framework:
// Allows for data transformation and aggregation similar to SQL’s GROUP BY.

// Built-in Replication:
// Replication ensures data availability and disaster recovery.

// Transactions:
// Supports ACID transactions for multiple document operations.

// Geospatial Capabilities:
// Supports geospatial indexes for location-based search and queries.

// Community and Ecosystem:
// Strong community support and extensive ecosystem.
// MongoDB Atlas for cloud-based managed MongoDB services.


// Use Cases of MongoDB
// ----------------------

// Content Management Systems (CMS):
// Flexible schema supports varied content types and structures.
// Efficient handling of media files and rich content.

// Real-Time Analytics:
// Fast read and write operations.
// Aggregation framework supports real-time data analysis.

// Internet of Things (IoT):
// Handles high-velocity data from numerous devices.
// Scalability to handle peak loads and large volumes of data.

// Mobile Applications:
// Syncing data between mobile devices and the cloud.
// Offline data access and storage.

// E-commerce Platforms:
// Flexible data model for product catalogs, customer data, and transactions.
// Scalability to handle peak loads and large volumes of data.

// Social Networks:
// Stores user profiles, connections, and activity logs.
// Real-time updates and personalized content delivery.

// Gaming Applications:
// Stores user profiles, scores, and game state.
// Real-time data processing for leaderboards and matchmaking.











// Database Commands

show databases
// Lists all databases on the MongoDB server.

use myDatabase
// Switches to the database named myDatabase. If it doesn't exist, it will be created when you first store data in it.

db
// Shows the name of the current database.

show collections
// Lists all collections in the current database.

db.createCollection("myCollection")
// Creates a new collection named myCollection in the current database.

db.myCollection.drop()
// Removes the collection named myCollection from the current database.



// Document Commands


db.myCollection.insertOne({ name: "Alice", age: 25 })
// Inserts a single document into the collection myCollection.

db.myCollection.insertMany([{ name: "Bob", age: 30 }, { name: "Carol", age: 27 }])
// Inserts multiple documents into the collection myCollection.

db.myCollection.find()
// Retrieves and displays all documents from the collection myCollection.

db.myCollection.find({ age: { $gte: 25 } })
// Retrieves documents from myCollection where the age is greater than or equal to 25.

db.myCollection.findOne({ name: "Alice" })
// Retrieves the first document from myCollection where the name is "Alice".

db.myCollection.updateOne({ name: "Alice" }, { $set: { age: 26 } })
// Updates the age to 26 for the first document in myCollection where the name is "Alice".

db.myCollection.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } })
// Adds a "status" field with value "young" to all documents in myCollection where the age is less than 30.

db.myCollection.replaceOne({ name: "Alice" }, { name: "Roy", age: 26, status: "young" })
// Replaces the first document in myCollection where the name is "Alice" with a new document.

db.myCollection.deleteOne({ name: "Alice" })
// Deletes the first document in myCollection where the name is "Alice".

db.myCollection.deleteMany({ status: "young" })
// Deletes all documents in myCollection where the status is "young".





// -----------------------------------Ordered and Unordered Insert Operations-------------------------------

// MongoDB offers two types of insert operations: ordered and unordered.
// These differ in how they handle errors when inserting multiple documents.

// 1. Ordered Insert Operations
// - Inserts documents in the order they are specified
// - Stops at the first error encountered

// Example of Ordered Insert:
db.myCollection.insertMany([
  { _id: 1, name: "Alice" },
  { _id: 2, name: "Bob" },
  { _id: 1, name: "Charlie" }, // Duplicate _id - This will cause an error
  { _id: 4, name: "David" }
], { ordered: true })

// Note: In this case, only Alice and Bob will be inserted.
// The operation stops when it encounters the duplicate _id for Charlie.
// After the error, the remaining documents are not inserted.


// 2. Unordered Insert Operations
// - Attempts to insert all documents, regardless of errors
// - Continues insertion even if some documents fail

// Example of Unordered Insert:
db.myCollection.insertMany([
  { _id: 1, name: "Alice" },
  { _id: 2, name: "Bob" },
  { _id: 1, name: "Charlie" }, // Duplicate _id - This will cause an error
  { _id: 4, name: "David" }
], { ordered: false })

// Note: In this case, Alice, Bob, and David will be inserted.
// Charlie will be skipped due to the duplicate _id, but the operation continues.
// MongoDB will return a report with details of any errors after completion.




//------------------------------IMporting json file into mongodb--------------------------


mongoimport C:\Users\rolouis\desktop\students.json -d databaseName -c collectionName



//--------------------------------Operators in MongoDB-----------------------------------
1. $eq (Equal)
// Matches documents where the value of a field is equal to the specified value.
db.myCollection.find({ age: { $eq: 30 } })
// Finds documents where the age field is equal to 30.
// Example output:
// { "_id": ObjectId("..."), "name": "Bob", "age": 30 }

2. $ne (Not Equal)
// Matches documents where the value of a field is not equal to the specified value.
db.myCollection.find({ age: { $ne: 30 } })
// Example output:
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
//   { "_id": ObjectId("..."), "name": "David", "age": 40 }
// ]

3. $gt (Greater Than)
// Matches documents where the value of a field is greater than the specified value.
db.myCollection.find({ age: { $gt: 30 } })
// Example output:
// [
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
//   { "_id": ObjectId("..."), "name": "David", "age": 40 }
// ]

4. $gte (Greater Than or Equal To)
// Matches documents where the value of a field is greater than or equal to the specified value.
db.myCollection.find({ age: { $gte: 30 } })
// Example output:
// [
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
//   { "_id": ObjectId("..."), "name": "David", "age": 40 }
// ]

5. $lt (Less Than)
// Matches documents where the value of a field is less than the specified value.
db.myCollection.find({ age: { $lt: 30 } })
// Example output:
// { "_id": ObjectId("..."), "name": "Alice", "age": 25 }

6. $lte (Less Than or Equal To)
// Matches documents where the value of a field is less than or equal to the specified value.
db.myCollection.find({ age: { $lte: 30 } })
// Example output:
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30 }
// ]

7. $in (In) // Matches any value in an array
// Matches documents where the value of a field equals any value in the specified array.
db.myCollection.find({ age: { $in: [25, 35] } })
// Example output:
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35 }
// ]

8. $nin (Not In) // Does not match any value in an array
// Matches documents where the value of a field does not equal any value in the specified array.
db.myCollection.find({ age: { $nin: [25, 35] } })
// Example output:
// [
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
//   { "_id": ObjectId("..."), "name": "David", "age": 40 }
// ]


//------------------ Cursor Methods ------------------------

// Cursor methods are used to iterate over the results of a query.

// Basic Cursor Methods: hasNext(), next(), forEach(), map(), toArray()
// Query Modification Methods: sort(), limit(), skip(), count(), size(), batchSize(), explain()

// hasNext()
// Checks if there are more documents left to iterate in the cursor.
const cursor = db.myCollection.find();
while (cursor.hasNext()) {
  printjson(cursor.next());
}

// next()
// Returns the next document in the cursor.
const cursor = db.myCollection.find();
while (cursor.hasNext()) {
  printjson(cursor.next());
}

// Example: Using hasNext() and next() together
const cursor = db.myCollection.find();
while (cursor.hasNext()) {
  printjson(cursor.next());
}
// Output:
// { "_id": ObjectId("..."), "name": "Alice", "age": 25 }
// { "_id": ObjectId("..."), "name": "Bob", "age": 30 }
// { "_id": ObjectId("..."), "name": "Charlie", "age": 35 }
// { "_id": ObjectId("..."), "name": "David", "age": 40 }

// forEach()
// Iterates over all documents in the cursor and applies a function to each document.
db.myCollection.find().forEach(doc => printjson(doc));
// Output:
// { "_id": ObjectId("..."), "name": "Alice", "age": 25 }
// { "_id": ObjectId("..."), "name": "Bob", "age": 30 }
// { "_id": ObjectId("..."), "name": "Charlie", "age": 35 }
// { "_id": ObjectId("..."), "name": "David", "age": 40 }

// map()
// Applies a function to each document in the cursor and returns an array of the results.
const names = db.myCollection.find().map(doc => doc.name);
print(names);
// Output:
// [ "Alice", "Bob", "Charlie", "David" ]

// toArray()
// Converts the cursor to an array of documents.
const docs = db.myCollection.find().toArray();
printjson(docs);
// Output:
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
//   { "_id": ObjectId("..."), "name": "David", "age": 40 }
// ]

// sort()
// Sorts the documents in the cursor by the specified field(s). 1 for ascending, -1 for descending.
db.myCollection.find().sort({ age: 1 }).toArray();
// Output:
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
//   { "_id": ObjectId("..."), "name": "David", "age": 40 }
// ]

// limit()
// Limits the number of documents returned by the cursor.
db.myCollection.find().limit(2).toArray();
// Output:
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30 }
// ]

// skip()
// Skips the specified number of documents in the cursor.
db.myCollection.find().skip(2).toArray();
// Output:
// [
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
//   { "_id": ObjectId("..."), "name": "David", "age": 40 }
// ]

// count()
// Returns the count of documents in the cursor.
const count = db.myCollection.find().count();
print(count);
// Output:
// 4

// size()
// Returns the number of documents in the cursor, excluding those skipped.
const size = db.myCollection.find().skip(1).size();
print(size);
// Output:
// 3

// batchSize()
// Controls the number of documents MongoDB returns in a single batch.
db.myCollection.find().batchSize(2).toArray();
// Note: This controls the number of documents returned in each batch but doesn't affect the final output.

// explain()
// Provides information on the execution plan of the query.
const explanation = db.myCollection.find().explain();
printjson(explanation);
// Output:
// {
//   "queryPlanner": {
//     "plannerVersion": 1,
//     "namespace": "myDatabase.myCollection",
//     "indexFilterSet": false,
//     ...
//   },
//   ...
// }


//------------------------------Logical Operators-----------------------------------

// $and Example:
// Joins query clauses with a logical AND, returns documents that satisfy all specified conditions.
db.myCollection.find({
  $and: [
    { age: { $gt: 25 } },
    { city: "New York" }
  ]
})

// Output:
// { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "city": "New York" }


// $or Example:
// Joins query clauses with a logical OR, returns documents that satisfy at least one of the specified conditions.
db.myCollection.find({
  $or: [
    { age: { $lt: 30 } },
    { city: "Los Angeles" }
  ]
})

// Output:
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25, "city": "New York" },
//   { "_id": ObjectId("..."), "name": "David", "age": 40, "city": "Los Angeles" }
// ]


// $nor Example:
// Joins query clauses with a logical NOR, returns documents that fail all specified conditions.
db.myCollection.find({
  $nor: [
    { age: { $lt: 30 } },
    { city: "San Francisco" }
  ]
})

// Output:
// [
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "city": "New York" },
//   { "_id": ObjectId("..."), "name": "David", "age": 40, "city": "Los Angeles" }
// ]


// $not Example:
// Inverts the effect of a query expression, returns documents that do not match the query expression.
db.myCollection.find({
  age: { $not: { $gte: 30 } }
})

// Output:
// { "_id": ObjectId("..."), "name": "Alice", "age": 25, "city": "New York" }


// Combining Logical Operators
// Logical operators can be combined to form more complex queries.

// Example:
// Find documents where the age is greater than 25 and the city is either "New York" or "Los Angeles":
db.myCollection.find({
  $and: [
    { age: { $gt: 25 } },
    { $or: [
      { city: "New York" },
      { city: "Los Angeles" }
    ]}
  ]
})

// Output:
// [
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "city": "New York" },
//   { "_id": ObjectId("..."), "name": "David", "age": 40, "city": "Los Angeles" }
// ]





//------------------------------Elements Operators-----------------------------------

// Sample data insertion for demonstration purposes
db.myCollection.insertMany([
  { name: "Alice", age: 25, tags: ["student", "athlete"], address: { city: "New York", zip: "10001" } },
  { name: "Bob", age: 30, tags: ["engineer", "musician"], address: { city: "San Francisco", zip: "94101" } },
  { name: "Charlie", age: 35, tags: ["teacher"], address: { city: "New York", zip: "10002" } },
  { name: "David", age: 40, tags: ["doctor", "artist"], address: { city: "Los Angeles", zip: "90001" } }
])

$exists operator
// Matches documents that have the specified field, regardless of its value
db.myCollection.find({ address: { $exists: true } })

// Output: All documents in the collection, as they all have an 'address' field
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } },
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30, "tags": ["engineer", "musician"], "address": { "city": "San Francisco", "zip": "94101" } },
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "tags": ["teacher"], "address": { "city": "New York", "zip": "10002" } },
//   { "_id": ObjectId("..."), "name": "David", "age": 40, "tags": ["doctor", "artist"], "address": { "city": "Los Angeles", "zip": "90001" } }
// ]

$type operator
// Matches documents where the specified field is of the given BSON type
db.myCollection.find({ age: { $type: "int" } })

// Output: All documents in the collection, as 'age' is an integer in all documents
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } },
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30, "tags": ["engineer", "musician"], "address": { "city": "San Francisco", "zip": "94101" } },
//   { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "tags": ["teacher"], "address": { "city": "New York", "zip": "10002" } },
//   { "_id": ObjectId("..."), "name": "David", "age": 40, "tags": ["doctor", "artist"], "address": { "city": "Los Angeles", "zip": "90001" } }
// ]

$size operator
// Matches documents where the specified array field has the given number of elements
db.myCollection.find({ tags: { $size: 2 } })

// Output: Documents where the 'tags' array has exactly 2 elements
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } },
//   { "_id": ObjectId("..."), "name": "Bob", "age": 30, "tags": ["engineer", "musician"], "address": { "city": "San Francisco", "zip": "94101" } },
//   { "_id": ObjectId("..."), "name": "David", "age": 40, "tags": ["doctor", "artist"], "address": { "city": "Los Angeles", "zip": "90001" } }
// ]

$regex operator
// Provides regular expression capabilities for pattern matching strings in queries
db.myCollection.find({ name: { $regex: /^A/ } })

// Output: Documents where the 'name' field starts with 'A'
// [
//   { "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } }
// ]
