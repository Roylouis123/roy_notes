// ---------------------------Node.js--------------------------------------



//Uses of Node.js 

// Web Servers: Building RESTful APIs and web applications.
// Real-Time Applications: Chat applications, live updates, and collaboration tools.
// Command Line Tools: Scripts to automate tasks.
// Microservices: Creating small, independent services that communicate over a network.
// Static File Serving: Serving static files like HTML, CSS, and JavaScript.
// Data Streaming: Handling real-time data streams (e.g., audio/video streaming).
// IoT: Managing Internet of Things devices.


// Introduction
// Node.js uses JavaScript as its scripting language, leveraging the V8 engine to execute JavaScript code outside the browser.
//  This allows developers to use JavaScript for server-side programming.

// V8 JavaScript Engine
// V8 Engine: Developed by Google for the Chrome browser, it compiles JavaScript directly to native machine code, making it extremely fast.
// Integration with Node.js: Node.js uses the V8 engine to run JavaScript code on the server. It provides a runtime environment that includes
//  a set of built-in libraries and APIs for file system access, networking, and other server-side functionalities.


// It is a single threaded language.
// It is asynchronous which doesnt wait it goes next code to execute.


// Node.js Modules
// Node.js includes several core modules implemented in JavaScript and C++:

// http: For creating HTTP servers and clients.
// fs: For interacting with the file system.
// path: For working with file and directory paths.
// os: For providing information about the operating system.



//---------------------------- Global modules --------------------------------------
// in Node.js are those that are available globally, meaning they can be accessed
//  from anywhere in the application without requiring a specific import.
//  These modules are usually part of the Node.js standard library.

// Examples of Global Modules
// console: Provides a simple debugging console.


// console.log("Hello, world!"); // Hello, World!
// process: Provides information and control over the current Node.js process.


// console.log(process.env);

// {
//     PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
//     USER: 'your_username',
//     HOME: '/Users/your_username',
//     // Other environment variables
//   }

// __dirname: The directory name of the current module.


// console.log(__dirname);

// Directory Name: /path/to/your/directory
// File Name: /path/to/your/directory/yourfile.js
// __filename: The file name of the current module.


// console.log(__filename);



//------------------------------Non-Global (Local) Modules------------------------------
// Non-global (local) modules need to be imported using the require or import statements.
//  These can be core Node.js modules, third-party modules installed via npm,
//  or custom modules created within the project.

// Examples of Non-Global Modules
// Core Modules: Part of the Node.js standard library but need to be imported.

// fs: File system module for file operations.


const fs = require('fs');
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});



// http: Module to create an HTTP server.

const http = require('http');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});
server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});



// Third-Party Modules: Installed via npm and need to be imported.

// express: Web framework for Node.js.

const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
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

