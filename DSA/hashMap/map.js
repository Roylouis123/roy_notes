Below is the solution Roy......

What is a Hash Map in JavaScript?
A hash map is a data structure that stores key-value pairs. In JavaScript, this functionality is often implemented using the Map object, which provides better performance and more features than plain objects ({}).

Key Features of Map in JavaScript:
Key-Value Pairs: Allows any data type (e.g., objects, functions, or primitive values) to be used as keys or values.
Insertion Order: Maintains the order of the elements.
Efficient Lookups: Provides a fast way to retrieve values using keys.


// Create a new Map
const map = new Map();

// Add key-value pairs
map.set('key1', 'value1');
map.set('key2', 'value2');

// Get a value
console.log(map.get('key1')); // Output: 'value1'

// Check if a key exists
console.log(map.has('key2')); // Output: true

// Delete a key-value pair
map.delete('key1');

// Get the size of the map
console.log(map.size); // Output: 1

// Clear all entries
map.clear();
Example: Using a Hash Map to Count Word Frequency





// Function to count word frequency
function countWordFrequency(text) {
    const words = text.split(' ');
    const wordMap = new Map();

    words.forEach(word => {
        word = word.toLowerCase(); // Make it case-insensitive
        if (wordMap.has(word)) {
            wordMap.set(word, wordMap.get(word) + 1);
        } else {
            wordMap.set(word, 1);
        }
    });

    return wordMap;
}




// Example usage
const text = "Hello world hello universe world";
const wordFrequency = countWordFrequency(text);

// Display word frequency
wordFrequency.forEach((count, word) => {
    console.log(`${word}: ${count}`);
});

// Output:
// hello: 2
// world: 2
// universe: 1




Iterating Over a Map

Edit
const map = new Map([
    ['name', 'Alice'],
    ['age', 25],
    ['country', 'USA']
]);

// Using `forEach`
map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// Using `for...of`
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}


// Output:
// name: Alice
// age: 25
// country: USA

Hash map is fast compare to object