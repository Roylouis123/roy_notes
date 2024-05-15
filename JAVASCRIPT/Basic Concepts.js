//-----------------------Variables------------------------------


// var:
// Function-Scoped
// Hoisting: Hoisted to top (initialized with value undefined)
// must be Initialized: No
// Reassign variable:yes
// Reassign value:yes
// Global Scope: Yes

// var example
var x = 10;
if (true) {
    var x = 20;
}
console.log(x);


// let:
// Block-Scoped
// Hoisting: Hoisted to top (not initialized accessing before initialization results in ReferenceError)
// must be Initialized: No
// Reassign variable: No
// Reassign value: yes
// Global Scope: No

// let example
let y = 10;
if (true) {
    let y = 20;
}
console.log(y);


// const:
// Block-Scoped
// must be Initialized: Yes
// Reassign variable: No
// Reassign value: No
// Must be Initialized: Constants declared with const must be initialized during declaration. Trying to declare a const without initialization will result in an error.
// Hoisting: Like let, const variables are hoisted to the top of their containing block but are not initialized.
// Global Scope: No

// const example
const z = 10;
// z = 20; // Error: Assignment to constant variable.



//-------------------------------Data Types------------------------------------


// Primitive Data Types
let name = "John";       // String: Represents a sequence of characters enclosed within single or double quotes.
let age = 30;            // Number: Represents numeric values, including integers and floating-point numbers.
let isStudent = true;    // Boolean: Represents a logical value - true or false.
let x;                   // Undefined: Represents a variable that has been declared but not assigned a value.
let y = null;            // Null: Represents the intentional absence of any value.
let symbol = Symbol();   // Symbol: Represents unique identifiers (introduced in ES6).

// Reference data types
let numbers = [1, 2, 3, 4, 5];  // Array: Represents a collection of elements, each identified by an index.
let person = {                 // Object: Represents a collection of key-value pairs.
    name: "Alice",
    age: 25,
    isStudent: false
};

function greet() {             // Function: Represents reusable blocks of code.
    console.log("Hello!");
}







////----------------------------------Arithmetic Operators:-------------------------------


let a = 10;
let b = 5;

let additionResult = a + b;  // 10 + 5 = 15
let subtractionResult = a - b;  // 10 - 5 = 5
let multiplicationResult = a * b;  // 10 * 5 = 50
let divisionResult = a / b;  // 10 / 5 = 2
let modulusResult = a % b;  // 10 % 5 = 0 (no remainder)
let incrementResult = ++a;  // Increment a by 1 (a becomes 11)
let decrementResult = --b;  // Decrement b by 1 (b becomes 4)


let x = 5;
let y = 10;

console.log(x == y);  // Output: false
console.log(x != y);  // Output: true
console.log(5 == '5');  // Output: true ( equality checks but doesnt check type of value)
console.log(x === '5');  // Output: false (strict equality checks type as well)
console.log(x !== '5');  // Output: true (strict inequality checks type as well)
console.log(x > y);  // Output: false
console.log(x < y);  // Output: true
console.log(x >= y);  // Output: false
console.log(x <= y);  // Output: true



let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin);  // Output: false
console.log(isLoggedIn || isAdmin);  // Output: true
console.log(!isLoggedIn);  // Output: false (opposite of true is false)



example
let num = 10;
num += 5;  // Equivalent to num = num + 5
console.log(num);  // Output: 15

let total = 100;
total -= 25;  // Equivalent to total = total - 25
console.log(total);  // Output: 75




///------------------------------------conditions-----------------------------------------



///------If Statements:

let hour = 15;
let greeting;

if (hour < 12) {
    greeting = "Good morning!";
} else if (hour < 18) {
    greeting = "Good afternoon!";
} else {
    greeting = "Good evening!";
}

console.log(greeting);  // Output depends on the value of 'hour'


//--------Switch Statement:

let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    default:
        dayName = "Unknown";
}

console.log(dayName);  // Output: "Wednesday"



///--------------------------- ------Loops---------------------------------------------------


// For Loop:
// The for loop repeats a block of code a specified number of times.

for (let i = 0; i < 5; i++) {
    console.log(i);  // Output: 0, 1, 2, 3, 4
}

// While Loop:
// The while loop repeats a block of code while a specified condition is true.

let i = 0;
while (i < 5) {
    console.log(i);  // Output: 0, 1, 2, 3, 4
    i++;
}

// Do-While Loop:
// The do-while loop is similar to the while loop, but the code block is executed at least once before the condition is tested.

let i = 0;
do {
    console.log(i);  // Output: 0
    i++;
} while (i < 0);


// Conditional (Ternary) Operator:
// The conditional operator (ternary operator) is a shorthand for the if...else statement. It assigns a value to a variable based on a condition.

let age = 20;
let status = (age >= 18) ? "Adult" : "Minor";
console.log(status);  // Output: "Adult"


// Closures:
// A closure is the combination of a function and the lexical environment within which that function was declared. Closures allow functions to access variables from their containing scope even after the scope has closed.

function outerFunction() {
    let outerVar = "I'm outer";

    function innerFunction() {
        console.log(outerVar); // innerFunction has access to outerVar
    }

    return innerFunction;
}

let closureFunc = outerFunction();
closureFunc(); // Output: I'm outer