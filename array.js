const arr = ["roy", "boy", "munna", "goi"];
const mix = [undefined, 7, [4, 77, 99], 89];
const arr1 = [6, 2, 3, 4, 5];
const num1 = [2, 4, 3, 6, 8];
const num2 = [3, 6, 9, 7, 5];

//-------------------------------------------Traversal---------------------------------------------------

// Traversal involves visiting each element of the array exactly once.
// It's commonly done using loops such as for loops or forEach method.

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// For loop in array
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// For of loop in array
for (let key of arr) {
  console.log(key);
}

// While loop in array
let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

// forEach method
arr.forEach((element) => console.log(element));
// Output: "roy", "boy", "munna", "goi" - executes a provided function once for each array element

//-------------------------------------------Searching------------------------------------------------

// Searching involves finding the index or presence of a specific element in the array.
// It can be done using methods like indexOf, find, findIndex, etc.

// Index of array
console.log(arr.indexOf("munna"));
// Output: 2

// Find method
console.log(arr1.find((element) => element > 3));
// Output: 6 - returns the value of the first element in the array that satisfies the provided testing function

// FindIndex method
console.log(arr1.findIndex((element) => element > 3));
// Output: 0 - returns the index of the first element in the array that satisfies the provided testing function

// // LastIndexOf method
// console.log(arr.lastIndexOf("munna")); // Output: 1 - returns the last index of "munna" in the array

//-----------------------------------------------Insertion-----------------------------------------------

// Insertion involves adding an element to the array.
// It can be done at the beginning, middle, or end of the array.

arr.push(4);
console.log(arr); // Output: [1, 2, 3, 4]

// Add data at the beginning of array
arr.unshift("koi");
console.log(arr); // Output: [ 'koi', 'boy', 'munna', 'goi' ]

// Concatenate arrays
const data = arr.concat(num1, num2);
console.log(data); // Output: [ 'koi', 'boy', 'munna', 'goi', 2, 4, 3, 6, 8, 3, 6, 9, 7, 5 ]

//-------------------------------------------Deletion-----------------------------------------------------

// Deletion involves removing an element from the array.
// It can be done at any position in the array.

arr.splice(2, 1); // Remove one element starting from index 2
console.log(arr); // Output: [1, 2, 4, 5]
// The splice method removes one element starting from index 2.

// Remove last element from array
arr.pop();
console.log(arr); // Output: [ 'roy', 'boy', 'munna', 'goi' ]

// Remove first element from array
arr.shift();
console.log(arr); // Output: [ 'boy', 'munna', 'goi' ]

// Slice method
const newarr = arr.slice(1, 3);
console.log(newarr); // Output: [ 'boy', 'munna' ]

// Splice method
const news = arr.splice(1, 2);
console.log(news); // Output: [ 'boy', 'munna' ]

// Fill method in array
const filledArray = arr.fill(12); //[ 12, 12, 12, 12 ]
console.log(filledArray);

const filledArrayWithStartIndex = arr.fill(1, 2); //[ '12', '12', 1, 1 ]
console.log(filledArrayWithStartIndex);

//----------------------------------------------Sorting-------------------------------------------------

// Sorting involves arranging the elements of the array in a particular order (e.g., ascending or descending).
// It can be done using methods like sort.

arr.sort((a, b) => a - b);
console.log(arr); // Output: [1, 2, 3, 4, 5]
// The sort method arranges the elements in ascending order based on the return value of the compare function.

//----------------------------------------------Transformation-------------------------------------------------

// Map method in array (returns a new array after applying a function to each element)
const mappedArray = arr1.map((p, q, r) => {
  return p > 1; // Returns an array with boolean values indicating whether each element is greater than 1
});
console.log(mappedArray);


// Filter method in array  (returns a new array with elements that satisfy the condition)
const filteredArray = arr1.filter((p, q, r) => {
  return p > 2; // Returns an array with elements greater than 2
});
console.log(filteredArray);


// Reduce method (reduces the array to a single value)
const reducedData = arr1.reduce((previous, item) => {
  return previous + item; // Returns the sum of all numbers in the array
});
console.log(reducedData);


// Some method (checks if at least one element satisfies the condition)
const someData = arr1.some((p) => {
  return p > 7; // Returns true if at least one element is greater than 7
});
console.log(someData);


// Every method (checks if all elements satisfy the condition)
const everyData = arr1.every((p) => {
  return p > 2; // Returns false if any element is not greater than 2
});
console.log(everyData);


// Find method (returns the value of the first element that satisfies the condition)
const foundData = arr1.find((p) => {
  return p === 2; // Returns 2 if it is present in the array
});
console.log(foundData);


// Flat method
const flattenedArray = mix.flat();
console.log(flattenedArray);
/* Output:
[ undefined, 7, 4, 77, 99, 89 ]
*/


// FlatMap method
const flatMapped = arr1.flatMap((x) => [x, x * 2]);
console.log(flatMapped); 
// Output: [6, 12, 2, 4, 3, 6, 4, 8, 5, 10] - Maps each element to an array and then flattens the result by one level


// ReduceRight method
const reducedRight = arr1.reduceRight((acc, curr) => acc - curr);
console.log(reducedRight);
// Output: 6 - Reduces the array from right to left, subtracting each element from the accumulator


// Entries method
const entries = arr.entries();
for (const entry of entries) {
  console.log(entry); 
  // Output: [0, "roy"], [1, "boy"], [2, "munna"], [3, "goi"] - returns a new Array Iterator object that contains the key/value pairs for each index in the array
}


// Entries method with destructuring
for (const [index, value] of arr.entries()) {
    console.log(index, value); // Output: 0 "roy", 1 "boy", 2 "munna", 3 "goi" - Iterates over key/value pairs of the array with destructuring
  }



// CopyWithin method with negative indices
const copiedArray = arr.copyWithin(-2, -4, -1);
console.log(copiedArray);
 // Output: ["boy", "boy", "munna", "goi"] - Copies elements from the second last element to the third last element and places them starting from the third last position


// Includes method
console.log(arr.includes("munna"));
// Output: true - checks if "munna" exists in the array


// Join method
console.log(arr.join(", "));
// Output: "roy, boy, munna, goi" - joins all elements of the array into a string separated by the specified separator


// Reverse method
console.log(arr.reverse());
// Output: ['goi', 'munna', 'boy', 'roy'] - reverses the order of elements in the array


// ToString method
console.log(arr1.toString());
// Output: "6, 2, 3, 4, 5" - converts the elements of the array into a string


// ToLocaleString method
console.log(arr1.toLocaleString("en-US"));
// Output: "6,2,3,4,5" - converts the elements of the array into a localized string representation



//---------------------------------------Spread operator----------------------------------------------
const spread = [...num1, ...num2];
console.log(spread);


//----------------------------------------Rest parameter----------------------------------------------
(function boy(...nums) {
  console.log(nums); // Prints all the arguments passed to the function as an array
})(...num1, ...num2);

// ToJSON method
console.log(arr1.toJSON()); // Output: [6, 2, 3, 4, 5] - Returns a JSON representation of the array











/////////////////////////////////////////////////////////////////////

// // 1. second largest number
// const arr=[3,26,43,43,63,22,5]

// const unique=[...new Set(arr)]

// const sortedArray=unique.sort((a, b) => a - b).reverse()[1]
// console.log(unique)

// const startTime = performance.now();

// const arr = [3, -26, 43, , 42, 43, 63, 22, 5];
// let first = -Infinity;
// let second = -Infinity;

// for (let num of arr) {
//   // Skip undefined elements
//   if (num === undefined) {
//     continue;
//   }

//   if (num > first) {
//     second = first;
//     first = num;
//   } else if (num > second && num !== first) {
//     second = num;
//   }
// }

// const endTime = performance.now();

// console.log(second);

// const executionTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds

// console.log("Execution time:", executionTime, "seconds");

// q.2 rotate the element to right

// const arr = [42, 43, 63, 22, 5];

// for (let i = 0; i < arr.length; i++) {
//    for(let j = 0; j < arr.length; j++) {
//     console.log(j)
//    }
// }
