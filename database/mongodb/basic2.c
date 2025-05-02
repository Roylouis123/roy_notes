// Projections in MongoDB with Examples

/**
 * Projections in MongoDB allow you to specify which fields to include or exclude
 * in the returned documents when performing a query. This is useful for:
 * 1. Improving query performance
 * 2. Reducing the amount of data transferred over the network
 *
 * Syntax:
 * db.collection.find(query, projection)
 *
 * Example: Retrieve only the name and age fields from the users collection
 */

db.users.find(
  {}, // Query (empty to match all documents)
  {
    _id: 0,  // Exclude the _id field
    name: 1, // Include the name field
    age: 1   // Include the age field
  }
)

/**
 * Notes:
 * - Use 1 to include a field, 0 to exclude a field
 * - The _id field is included by default unless explicitly excluded
 * - You cannot mix inclusion and exclusion, except for the _id field
 * - When using inclusion, only specified fields (and _id) will be returned
 * - When using exclusion, all fields except the specified ones will be returned
 */


// Embedded Documents in MongoDB

/**
 * Embedded Documents in MongoDB:
 * - Allow storing related data within a single document
 * - Improve query performance by reducing the need for joins
 * - Enable complex data structures to be stored efficiently
 * - Are a key feature of MongoDB's document-oriented storage model
 */

/**
 * Benefits of Embedded Documents:
 * 1. Improved read performance: All related data is in one place
 * 2. Atomic operations: Updates to a single document are atomic
 * 3. Denormalization: Reduces the need for joins across collections
 * 4. Flexibility: Easily accommodate varying data structures
 */

// Example of an embedded document
{
  name: "John Doe",
  email: "john.doe@example.com",
  // Embedded document for address
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipcode: "12345"
  },
  // Array of embedded documents for orders
  orders: [
    {
      product: "Laptop",
      price: 999.99,
      date: new Date("2023-05-15")
    },
    {
      product: "Mouse",
      price: 25.00,
      date: new Date("2023-06-01")
    }
  ]
}

/**
 * Querying Embedded Documents:
 * - Use dot notation to access fields in embedded documents
 * - Allows for precise querying of nested data
 */

// Example query: Find users living in Anytown
db.users.find({ "address.city": "Anytown" })

// This query will return documents where the embedded 'address' document has 'city' field equal to "Anytown"

/**
 * Note: When designing with embedded documents, consider:
 * - Document size limits (16MB max in MongoDB)
 * - Query patterns and access frequency
 * - Data consistency and update patterns
 */
 *
 * Updating Specific Elements in Arrays
 *
 * To update a specific element in an array, you can use the positional operator "$":
 *
 * // Example: Update the price of a specific order for a user
 * db.users.updateOne(
 *   { name: "John Doe", "orders.product": "Laptop" }, // Find user John Doe with a Laptop order
 *   { $set: { "orders.$.price": 899.99 } }            // Update the price of the matched order
 * )
 *
 * // Explanation:
 * // - The first argument finds the document for John Doe with a Laptop in the orders array
 * // - The second argument uses $set to update the price
 * // - The $ in "orders.$.price" is the positional operator, it updates only the matched array element
 *
 * // This will update the price of the laptop order for the user "John Doe" to 899.99.
 * // If John Doe has multiple Laptop orders, only the first one found will be updated.
 *
 * // Note: The positional $ operator acts as a placeholder for the first element that matches the query condition.



 Using $all and $elemMatch in MongoDB

// $all Operator
// The $all operator is used to select documents where the value of a field is an array that contains
// all the specified elements. This is useful when you want to find documents that have multiple specific 
// elements in an array field.

// Example: Inserting sample data
db.users.insertMany([
  {
    name: "John Doe",
    interests: ["reading", "sports", "cooking"]
  },
  {
    name: "Jane Smith",
    interests: ["music", "sports", "travel"]
  },
  {
    name: "Emily Johnson",
    interests: ["reading", "music", "travel"]
  }
])

// Query: Find users who have both "reading" and "sports" as interests.
db.users.find({ interests: { $all: ["reading", "sports"] } })

// Output:
[
  {
    "_id": ObjectId("507f191e810c19729de860ea"),
    "name": "John Doe",
    "interests": ["reading", "sports", "cooking"]
  }
]

// Note: The $all operator ensures that all specified elements are present in the array,
// regardless of their order or the presence of additional elements.


$elemMatch Operator
// The $elemMatch operator is used to select documents if at least one element in an array field 
// matches all the specified criteria. This is useful when you need to match multiple conditions on
// elements within an array.

// Syntax:
db.collection.find({ field: { $elemMatch: { criteria1, criteria2, ... } } })

// Example: Inserting sample data for students with grades
db.students.insertMany([
  {
    name: "Alice",
    grades: [
      { subject: "Math", score: 85 },
      { subject: "English", score: 78 }
    ]
  },
  {
    name: "Bob",
    grades: [
      { subject: "Math", score: 92 },
      { subject: "English", score: 88 }
    ]
  },
  {
    name: "Charlie",
    grades: [
      { subject: "Math", score: 70 },
      { subject: "English", score: 95 }
    ]
  }
])

// Query: Find students who have a grade in Math that is greater than 80 and less than 90.
db.students.find({ grades: { $elemMatch: { subject: "Math", score: { $gt: 80, $lt: 90 } } } })

// Output:
[
  {
    "_id": ObjectId("507f1f77bcf86cd799439014"),
    "name": "Alice",
    "grades": [
      { subject: "Math", score: 85 },
      { subject: "English", score: 78 }
    ]
  }
]

// Note: The $elemMatch operator is particularly useful when you need to match multiple criteria
// within a single array element. It ensures that all conditions are met by the same array element.



//----------------------------------------------------Aggregator-----------------------------------------


//  * Aggregation in MongoDB


MongoDBs aggregation framework is a powerful tool for data analysis and transformation. It allows
 you to process data records and return computed results. Aggregation operations group values from 
 multiple documents, perform various operations on the grouped data, and can return results in a variety of formats.

Key Concepts
Pipeline: The aggregation framework processes data through a series of stages in a pipeline.
 Each stage transforms the documents as they pass through.

Stages: Each stage in the pipeline performs a specific operation on the input documents.
Common stages include $match, $group, $sort, $project, and $limit.



db.sales.insertMany([
  { _id: 1, product: "Laptop", price: 1000, quantity: 2, date: new Date("2023-05-15"), category: "Electronics" },
  { _id: 2, product: "Phone", price: 500, quantity: 5, date: new Date("2023-06-01"), category: "Electronics" },
  { _id: 3, product: "Tablet", price: 300, quantity: 3, date: new Date("2023-06-10"), category: "Electronics" },
  { _id: 4, product: "Headphones", price: 100, quantity: 10, date: new Date("2023-06-15"), category: "Accessories" },
  { _id: 5, product: "Charger", price: 20, quantity: 50, date: new Date("2023-06-20"), category: "Accessories" }
])


//  * 1. $match

Filter documents to include only those that match specific criteria.
Example: Find all sales of electronics products.

db.sales.aggregate([
  { $match: { category: "Electronics" } }
])


// Output:
[
  { "_id": 1, "product": "Laptop", "price": 1000, "quantity": 2, "date": "2023-05-15T00:00:00Z", "category": "Electronics" },
  { "_id": 2, "product": "Phone", "price": 500, "quantity": 5, "date": "2023-06-01T00:00:00Z", "category": "Electronics" },
  { "_id": 3, "product": "Tablet", "price": 300, "quantity": 3, "date": "2023-06-10T00:00:00Z", "category": "Electronics" }
]



//*   2. $group

Group documents by a specified field and perform aggregations.
Example: Group sales by product and calculate the total quantity sold for each product.


db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalQuantity: { $sum: "$quantity" }
    }
  }
])

// Output:
[
  { "_id": "Laptop", "totalQuantity": 2 },
  { "_id": "Phone", "totalQuantity": 5 },
  { "_id": "Tablet", "totalQuantity": 3 },
  { "_id": "Headphones", "totalQuantity": 10 },
  { "_id": "Charger", "totalQuantity": 50 }
]



//*   3. $sort

Sort the documents based on a specified field.
Example: Sort products by total quantity sold in descending order.


db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalQuantity: { $sum: "$quantity" }
    }
  },
  { $sort: { totalQuantity: -1 } }
])


// Output:
[
  { "_id": "Charger", "totalQuantity": 50 },
  { "_id": "Headphones", "totalQuantity": 10 },
  { "_id": "Phone", "totalQuantity": 5 },
  { "_id": "Tablet", "totalQuantity": 3 },
  { "_id": "Laptop", "totalQuantity": 2 }
]


//*  4. $project


Include or exclude specific fields from the output documents.
Example: Project the product name and total revenue (price * quantity).


db.sales.aggregate([
  {
    $project: {
      product: 1,
      totalRevenue: { $multiply: ["$price", "$quantity"] }
    }
  }
])


// Output:
[
  { "_id": 1, "product": "Laptop", "totalRevenue": 2000 },
  { "_id": 2, "product": "Phone", "totalRevenue": 2500 },
  { "_id": 3, "product": "Tablet", "totalRevenue": 900 },
  { "_id": 4, "product": "Headphones", "totalRevenue": 1000 },
  { "_id": 5, "product": "Charger", "totalRevenue": 1000 }
]



//*   5. $limit

Limit the number of documents passed to the next stage.
Example: Limit the results to the top 3 products by total revenue.


db.sales.aggregate([
  {
    $project: {
      product: 1,
      totalRevenue: { $multiply: ["$price", "$quantity"] }
    }
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 3 }
])


// Output:
[
  { "_id": 2, "product": "Phone", "totalRevenue": 2500 },
  { "_id": 1, "product": "Laptop", "totalRevenue": 2000 },
  { "_id": 4, "product": "Headphones", "totalRevenue": 1000 }
]


//*   6. $lookup


Perform a left outer join to another collection.
Example: Assume there a products collection that contains additional product details.


db.products.insertMany([
  { name: "Laptop", category: "Electronics", manufacturer: "BrandA" },
  { name: "Phone", category: "Electronics", manufacturer: "BrandB" },
  { name: "Tablet", category: "Electronics", manufacturer: "BrandC" },
  { name: "Headphones", category: "Accessories", manufacturer: "BrandD" },
  { name: "Charger", category: "Accessories", manufacturer: "BrandE" }
])

db.sales.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product",
      foreignField: "name",
      as: "productDetails"
    }
  }
])

// Output:
[
  {
    "_id": 1,
    "product": "Laptop",
    "price": 1000,
    "quantity": 2,
    "date": "2023-05-15T00:00:00Z",
    "category": "Electronics",
    "productDetails": [
      { "name": "Laptop", "category": "Electronics", "manufacturer": "BrandA" }
    ]
  },
  {
    "_id": 2,
    "product": "Phone",
    "price": 500,
    "quantity": 5,
    "date": "2023-06-01T00:00:00Z",
    "category": "Electronics",
    "productDetails": [
      { "name": "Phone", "category": "Electronics", "manufacturer": "BrandB" }
    ]
  },
  // Additional documents...
]


//*  7. $unwind


Deconstructs an array field from the input documents to output a document for each element.
Example: Unwind an array field in documents (assuming productDetails is an array).



db.sales.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product",
      foreignField: "name",
      as: "productDetails"
    }
  },
  {
    $unwind: "$productDetails"
  }
])

// Output:
[
  {
    "_id": 1,
    "product": "Laptop",
    "price": 1000,
    "quantity": 2,
    "date": "2023-05-15T00:00:00Z",
    "category": "Electronics",
    "productDetails": { "name": "Laptop", "category": "Electronics", "manufacturer": "BrandA" }
  },
  {
    "_id": 2,
    "product": "Phone",
    "price": 500,
    "quantity": 5,
    "date": "2023-06-01T00:00:00Z",
    "category": "Electronics",
    "productDetails": { "name": "Phone", "category": "Electronics", "manufacturer": "BrandB" }
  },
  // Additional documents...
]


// * $push


Example: Group Sales by Category and Push Products into an Array
Well group the sales by category and use $push to create an array of products sold in each category.

db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      products: { $push: "$product" },
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  }
])



// Output:

[
  {
    "_id": "Electronics",
    "products": ["Laptop", "Phone", "Tablet"],
    "totalRevenue": 5400
  },
  {
    "_id": "Accessories",
    "products": ["Headphones", "Charger"],
    "totalRevenue": 2000
  }
]



// * $addToSet


Example: Group Sales by Category and Add Unique Products into an Array
Well group the sales by category and use $addToSet to create an array of unique products sold in each category.


db.sales.aggregate([
  {
    $group: {
      _id: "$category",
      products: { $addToSet: "$product" },
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  }
])


// Output:
[
  {
    "_id": "Electronics",
    "products": ["Laptop", "Phone", "Tablet"],
    "totalRevenue": 5400
  },
  {
    "_id": "Accessories",
    "products": ["Headphones", "Charger"],
    "totalRevenue": 2600
  }
]



//* $filter 

operator in MongoDBs aggregation framework allows you to selectively filter elements of
an array based on specified conditions. This is particularly useful when you need to refine
arrays within documents based on certain criteria.

Example Data
Lets consider a collection named orders with documents representing orders, each containing an array of items:


{
  "_id": 1,
  "customer": "Alice",
  "items": [
    { "name": "Laptop", "quantity": 1, "price": 1000 },
    { "name": "Phone", "quantity": 2, "price": 500 }
  ]
}


Example: Filter Items with Quantity Greater Than 1
Suppose we want to filter items within each order document where the quantity is greater than 1.

db.orders.aggregate([
  {
    $project: {
      customer: 1,
      filteredItems: {
        $filter: {
          input: "$items",
          as: "item",
          cond: { $gt: ["$$item.quantity", 1] }
        }
      }
    }
  }
])


// Output:
[
  {
    "_id": 1,
    "customer": "Alice",
    "filteredItems": [
      { "name": "Phone", "quantity": 2, "price": 500 }
    ]
  }
]







//* Comprehensive Example
Lets combine all these stages into a single aggregation pipeline. The goal is to find the total
 sales revenue for each product category in 2023, sorted by revenue in descending order,
  and include product details.


db.sales.aggregate([
  // Match sales in 2023
  {
    $match: {
      date: { $gte: new ISODate("2023-01-01"), $lt: new ISODate("2024-01-01") }
    }
  },
  // Lookup product details
  {
    $lookup: {
      from: "products",
      localField: "product",
      foreignField: "name",
      as: "productDetails"
    }
  },
  // Unwind the productDetails array
  {
    $unwind: "$productDetails"
  },
  // Group by category and calculate total revenue
  {
    $group: {
      _id: "$productDetails.category",
      totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
    }
  },
  // Sort by total revenue in descending order
  {
    $sort: { totalRevenue: -1 }
  },
  // Project the category and total revenue
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalRevenue: 1
    }
  }
])


// Output:
[
  { "category": "Electronics", "totalRevenue": 5400 },
  { "category": "Accessories", "totalRevenue": 2000 }
]