

const fs = require('fs');
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});



// lodash: Utility library for JavaScript.

const _ = require('lodash');
let numbers = [1, 2, 3, 4, 5];
let shuffled = _.shuffle(numbers);
console.log(shuffled);


// Custom Modules: Created within the project.

// math.js: Custom module for math operations.

// math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
// main.js
const math = require('./math');
console.log(math.add(5, 3)); // Output: 8
console.log(math.subtract(5, 3)); // Output: 2



// Summary
// Global Modules: Available globally without requiring explicit 
// import (e.g., console, process, __dirname, __filename).
// Non-Global (Local) Modules: Need to be imported using require or import. 
// These include core Node.js modules (e.g., fs, http), third-party modules (e.g., express, lodash),
//  and custom modules created within the project.





// getting data from command line arguments
console.log(process.argv)  // node index.js boyyyyy

[
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\reena\\Documents\\Newfolder\\Nodejs\\test.js',
    'boyyyyy'
]



// getting file local 

console.log(__dirname);

// Directory Name: /path/to/your/directory

console.log(__dirname, "public");

// Directory Name: /path/to/your/public

console.log(__filename);

// File Name: /path/to/your/directory/yourfile.js

