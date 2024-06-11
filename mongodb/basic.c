//--------------------------------------- What is MongoDB?-------------------------------------

MongoDB is a NoSQL, document-oriented database designed for high performance, high availability, 
and easy scalability. It is known for its flexible schema design, allowing for the storage of data
in JSON-like documents, which can vary in structure. This flexibility makes MongoDB an ideal choice 
for applications that handle a wide variety of data types and structures.





//------- Features of MongoDB

// Document-Oriented Storage:

Data is stored in BSON (Binary JSON) format.
Documents (akin to rows in SQL) can have varying structures.

// Schema Flexibility:

No need for a predefined schema.
Schema can evolve over time without downtime.

// Scalability:

Supports horizontal scaling through sharding.
Easily scales out by distributing data across multiple servers.

// High Availability:

Automatic failover using replica sets.
Ensures data redundancy and reliability.

// Rich Query Language:

Supports a wide range of queries: field, range, and regular expression searches.
Aggregation framework for complex data processing.

// Indexing:

Supports various types of indexes (single field, compound, multi-key, text, geospatial).
Indexes improve query performance significantly.

// Aggregation Framework:

Allows for data transformation and aggregation similar to SQL’s GROUP BY.

// Built-in Replication:

Replication ensures data availability and disaster recovery.

// Transactions:

Supports ACID transactions for multiple document operations.

// Geospatial Capabilities:

Supports geospatial indexes for location-based search and queries.

// Community and Ecosystem:

Strong community support and extensive ecosystem.
MongoDB Atlas for cloud-based managed MongoDB services.





Use Cases of MongoDB

// Content Management Systems (CMS):
Flexible schema supports varied content types and structures.
Efficient handling of media files and rich content.

// Real-Time Analytics:
Fast read and write operations.
Aggregation framework supports real-time data analysis.

// Internet of Things (IoT):
Handles high-velocity data from numerous devices.
Scalability supports large-scale IoT deployments.

// Mobile Applications:
Syncing data between mobile devices and the cloud.
Offline data access and storage.

// E-commerce Platforms:
Flexible data model for product catalogs, customer data, and transactions.
Scalability to handle peak loads and large volumes of data.

// Social Networks:
Stores user profiles, connections, and activity logs.
Real-time updates and personalized content delivery.

// Gaming Applications:
Stores user profiles, scores, and game state.
Real-time data processing for leaderboards and matchmaking.




// Database Commands


show databases
// Lists all databases on the MongoDB server.

use myDatabase
// Switches to the database myDatabase. If it does not exist, it will be created upon inserting data.

db
// Displays the name of the current database.

show collections
// Lists all collections in the current database.

db.createCollection("myCollection")
// Creates a new collection named myCollection.

db.myCollection.drop()
// Deletes the collection myCollection.



// Document Commands


db.myCollection.insertOne({ name: "Alice", age: 25 })
// Inserts a single document into the collection myCollection.



db.myCollection.insertMany([{ name: "Bob", age: 30 }, { name: "Carol", age: 27 }])
// Inserts multiple documents into the collection myCollection.


db.myCollection.find()
// Retrieves all documents from the collection myCollection. 
// Show all data in collection


db.myCollection.find({ age: { $gte: 25 } })
// Retrieves documents where the age is greater than or equal to 25.


db.myCollection.findOne({ name: "Alice" })
// Retrieves a single document where the name is "Alice".


db.myCollection.updateOne({ name: "Alice" }, { $set: { age: 26 } })
// Updates the document where the name is "Alice" to set the age to 26.


db.myCollection.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } })
// Updates all documents where the age is less than 30, setting the status to "young".


db.myCollection.replaceOne({ name: "Alice" }, { name: "Alice", age: 26, status: "young" })
// Replaces the document where the name is "Alice" with the new document.



db.myCollection.deleteOne({ name: "Alice" })
// Deletes the document where the name is "Alice".


db.myCollection.deleteMany({ status: "young" })
// Deletes all documents where the status is "young".





// -----------------------------------ordered and unordered-------------------------------


In MongoDB, there are two types of insert operations: ordered and unordered.
 The difference between them lies in how they handle errors during the insertion of multiple documents.

// Ordered Insert Operations

db.myCollection.insertMany([
  { _id: 1, name: "Alice" },
  { _id: 2, name: "Bob" },
  { _id: 1, name: "Charlie" }, // Duplicate _id will cause an error
  { _id: 4, name: "David" }
], { ordered: true })

In this example, the third document with _id: 1 is a duplicate, so MongoDB will raise an error, and the insertion
 operation will stop. Only the first two documents will be inserted into the collection.



// Unordered Insert Operations

db.myCollection.insertMany([
  { _id: 1, name: "Alice" },
  { _id: 2, name: "Bob" },
  { _id: 1, name: "Charlie" }, // Duplicate _id will cause an error
  { _id: 4, name: "David" }
], { ordered: false })

In this example, although the third document with _id: 1 is a duplicate and will cause an error, 
MongoDB will continue attempting to insert the remaining documents. After completing the operation, 
it will return a report containing details of the error.








//------------------------------IMporting json file into mongodb--------------------------


mongoimport C:\Users\rolouis\desktop\students.json -d databaseName -c collectionName



//--------------------------------Operators in MongoDB-----------------------------------


1. $eq (Equal)
// Matches documents where the value of a field is equal to the specified value.

db.myCollection.find({ age: { $eq: 30 } })
// Finds documents where the age field is equal to 30.

{ "_id": ObjectId("..."), "name": "Bob", "age": 30 }



2. $ne (Not Equal)
// Matches documents where the value of a field is not equal to the specified value.

db.myCollection.find({ age: { $ne: 30 } })

// Output:
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
  { "_id": ObjectId("..."), "name": "David", "age": 40 }
]


3. $gt (Greater Than)
// Matches documents where the value of a field is greater than the specified value.


db.myCollection.find({ age: { $gt: 30 } })

// Output:
[
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
  { "_id": ObjectId("..."), "name": "David", "age": 40 }
]



4. $gte (Greater Than or Equal To)
// Matches documents where the value of a field is greater than or equal to the specified value.

db.myCollection.find({ age: { $gte: 30 } })

// Output:
[
  { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
  { "_id": ObjectId("..."), "name": "David", "age": 40 }
]


5. $lt (Less Than)
// Matches documents where the value of a field is less than the specified value.

db.myCollection.find({ age: { $lt: 30 } })
// Output:

{ "_id": ObjectId("..."), "name": "Alice", "age": 25 }


6. $lte (Less Than or Equal To)
// Matches documents where the value of a field is less than or equal to the specified value.

db.myCollection.find({ age: { $lte: 30 } })
Output:


[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
  { "_id": ObjectId("..."), "name": "Bob", "age": 30 }
]

7. $in (In)
// Matches documents where the value of a field equals any value in the specified array.

db.myCollection.find({ age: { $in: [25, 35] } })

[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35 }
]

8. $nin (Not In)
// Matches documents where the value of a field does not equal any value in the specified array.


db.myCollection.find({ age: { $nin: [25, 35] } })
Output:


[
  { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
  { "_id": ObjectId("..."), "name": "David", "age": 40 }
]


$eq: Equal to
$ne: Not equal to
$gt: Greater than
$gte: Greater than or equal to
$lt: Less than
$lte: Less than or equal to
$in: Matches any value in an array
$nin: Does not match any value in an array


//------------------ cursor methods ------------------------


Basic Cursor Methods: hasNext(), next(), forEach(), map(), toArray().
Query Modification Methods: sort(), limit(), skip(), count(), size(), batchSize(), explain().



hasNext() 
// Checks if there are more documents left to iterate in the cursor.
const cursor = db.myCollection.find();
while (cursor.hasNext()) {
  printjson(cursor.next());
}


cursor.next()
// Returns the next document in the cursor.

const cursor = db.myCollection.find();
while (cursor.hasNext()) {
  printjson(cursor.next());
}

// Example:
cursor.hasNext() and cursor.next():

const cursor = db.myCollection.find();
while (cursor.hasNext()) {
  printjson(cursor.next());
}

// Output:
{ "_id": ObjectId("..."), "name": "Alice", "age": 25 }
{ "_id": ObjectId("..."), "name": "Bob", "age": 30 }
{ "_id": ObjectId("..."), "name": "Charlie", "age": 35 }
{ "_id": ObjectId("..."), "name": "David", "age": 40 }





cursor.forEach():
// Iterates over all documents in the cursor and applies a function to each document.

db.myCollection.find().forEach(doc => printjson(doc));

// Output:
{ "_id": ObjectId("..."), "name": "Alice", "age": 25 }
{ "_id": ObjectId("..."), "name": "Bob", "age": 30 }
{ "_id": ObjectId("..."), "name": "Charlie", "age": 35 }
{ "_id": ObjectId("..."), "name": "David", "age": 40 }


cursor.map():
// Applies a function to each document in the cursor and returns an array of the results.

const names = db.myCollection.find().map(doc => doc.name);
print(names);

// Output:
[ "Alice", "Bob", "Charlie", "David" ]


cursor.toArray():
// Converts the cursor to an array of documents.

const docs = db.myCollection.find().toArray();
printjson(docs);

// Output:
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
  { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
  { "_id": ObjectId("..."), "name": "David", "age": 40 }
]


cursor.sort():
// Sorts the documents in the cursor by the specified field(s).

db.myCollection.find().sort({ age: 1 }).toArray();


// Output:
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
  { "_id": ObjectId("..."), "name": "Bob", "age": 30 },
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
  { "_id": ObjectId("..."), "name": "David", "age": 40 }
]


cursor.limit():
// Limits the number of documents returned by the cursor.

db.myCollection.find().limit(2).toArray();


// Output:
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25 },
  { "_id": ObjectId("..."), "name": "Bob", "age": 30 }
]


cursor.skip():
// Skips the specified number of documents in the cursor.


db.myCollection.find().skip(2).toArray();


// Output:
[
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35 },
  { "_id": ObjectId("..."), "name": "David", "age": 40 }
]


cursor.count():
// Returns the count of documents in the cursor.

const count = db.myCollection.find().count();
print(count);


// Output:
4


cursor.size():
// Returns the number of documents in the cursor, excluding those skipped.

const size = db.myCollection.find().skip(1).size();
print(size);


// Output:
3


cursor.batchSize():
// Controls the number of documents MongoDB returns in a single batch.

db.myCollection.find().batchSize(2).toArray();

// This controls the number of documents returned in each batch but doesn't affect the output in this example.



cursor.explain():
// Provides information on the execution of the query.

const explanation = db.myCollection.find().explain();
printjson(explanation);

// Output:
{
  "queryPlanner": {
    "plannerVersion": 1,
    "namespace": "myDatabase.myCollection",
    "indexFilterSet": false,
    ...
  },
  ...
}


//------------------------------Logical Operators-----------------------------------

$and Example:
// Joins query clauses with a logical AND, requiring all clauses to be true for a document to be included in the result set.

db.myCollection.find({
  $and: [
    { age: { $gt: 25 } },
    { city: "New York" }
  ]
})

// Output:
{ "_id": ObjectId("..."), "name": "Charlie", "age": 35, "city": "New York" }


$or Example:
// Joins query clauses with a logical OR, requiring at least one of the clauses to be true for a document to be included in the result set.

db.myCollection.find({
  $or: [
    { age: { $lt: 30 } },
    { city: "Los Angeles" }
  ]
})

// Output:
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25, "city": "New York" },
  { "_id": ObjectId("..."), "name": "David", "age": 40, "city": "Los Angeles" }
]


$nor Example:
// Joins query clauses with a logical NOR, requiring both clauses to be false for a document to be included in the result set.

db.myCollection.find({
  $nor: [
    { age: { $lt: 30 } },
    { city: "San Francisco" }
  ]
})


// Output:
[
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": ObjectId("..."), "name": "David", "age": 40, "city": "Los Angeles" }
]


$not Example:
// Inverts the effect of a query expression and returns documents that do not match the query expression.

db.myCollection.find({
  age: { $not: { $gte: 30 } }
})


// Output:
{ "_id": ObjectId("..."), "name": "Alice", "age": 25, "city": "New York" }



Combining Logical Operators
Logical operators can be combined to form more complex queries.


Example:

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
[
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "city": "New York" },
  { "_id": ObjectId("..."), "name": "David", "age": 40, "city": "Los Angeles" }
]









//------------------------------Elements Operator-----------------------------------


db.myCollection.insertMany([
  { name: "Alice", age: 25, tags: ["student", "athlete"], address: { city: "New York", zip: "10001" } },
  { name: "Bob", age: 30, tags: ["engineer", "musician"], address: { city: "San Francisco", zip: "94101" } },
  { name: "Charlie", age: 35, tags: ["teacher"], address: { city: "New York", zip: "10002" } },
  { name: "David", age: 40, tags: ["doctor", "artist"], address: { city: "Los Angeles", zip: "90001" } }
])



$exists
// The $exists operator matches documents that have the specified field.

db.myCollection.find({ address: { $exists: true } })


// Output:
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } },
  { "_id": ObjectId("..."), "name": "Bob", "age": 30, "tags": ["engineer", "musician"], "address": { "city": "San Francisco", "zip": "94101" } },
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "tags": ["teacher"], "address": { "city": "New York", "zip": "10002" } },
  { "_id": ObjectId("..."), "name": "David", "age": 40, "tags": ["doctor", "artist"], "address": { "city": "Los Angeles", "zip": "90001" } }
]



$type

// The $type operator matches documents where the field is of the specified BSON type.

db.myCollection.find({ age: { $type: "int" } })


[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } },
  { "_id": ObjectId("..."), "name": "Bob", "age": 30, "tags": ["engineer", "musician"], "address": { "city": "San Francisco", "zip": "94101" } },
  { "_id": ObjectId("..."), "name": "Charlie", "age": 35, "tags": ["teacher"], "address": { "city": "New York", "zip": "10002" } },
  { "_id": ObjectId("..."), "name": "David", "age": 40, "tags": ["doctor", "artist"], "address": { "city": "Los Angeles", "zip": "90001" } }
]



$size
// The $size operator matches documents where the array field is of the specified length.


db.myCollection.find({ tags: { $size: 2 } })

// Output:
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } },
  { "_id": ObjectId("..."), "name": "Bob", "age": 30, "tags": ["engineer", "musician"], "address": { "city": "San Francisco", "zip": "94101" } },
  { "_id": ObjectId("..."), "name": "David", "age": 40, "tags": ["doctor", "artist"], "address": { "city": "Los Angeles", "zip": "90001" } }
]




$regex
// The $regex operator provides regular expression capabilities for pattern matching strings in queries.

db.myCollection.find({ name: { $regex: /^A/ } })

// Output:
{ "_id": ObjectId("..."), "name": "Alice", "age": 25, "tags": ["student", "athlete"], "address": { "city": "New York", "zip": "10001" } }
