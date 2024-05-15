//------------------------ Objects------------------------------------

// 1. Object Creation:
// Object Literal Syntax: Objects can be created using curly braces {} and specifying key-value pairs.


let person = {
    name: "John",
    age: 30
};
// Constructor Functions and Classes: Objects can also be created using constructor functions or ES6 classes.

function Person(name, age) {
    this.name = name;
    this.age = age;
}



// 2. Accessing Properties:
// Dot Notation: Use dot notation (objectName.propertyName) to access properties.



console.log(person.name); // Output: John

// Bracket Notation: Use bracket notation (objectName['propertyName']) to access properties, especially when the property name is dynamic or contains special characters.



console.log(person['age']); // Output: 30

// 3. Adding and Modifying Properties:
// New properties can be added or existing properties can be modified by simply assigning values to them.


// person.city = "New York"; // Adding a new property
// person.age = 35; // Modifying an existing property
// 4. Object Methods:
// Methods are functions stored as object properties. They allow objects to encapsulate behavior.


let person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log("Hello, my name is " + this.name);
    }
};

// person.greet(); // Output: Hello, my name is John


// 5. Iterating Over Object Properties:
// Use for...in loop or Object.keys() method to iterate over object properties.


for (let key in person) {
    console.log(key + ": " + person[key]);
}

// Using Object.keys()
Object.keys(person).forEach(function(key) {
    console.log(key + ": " + person[key]);
});


// 6. Object Destructuring:
// Object destructuring allows you to extract properties from an object and assign them to variables.


let { name, age } = person;
// console.log(name); // Output: John
// console.log(age); // Output: 30



// 7. Object Prototypes:
// Objects in JavaScript are linked to a prototype object, allowing them to inherit properties and methods from it.
// javascript

Person.prototype.greet = function() {
    console.log("Hello, my name is " + this.name);
};


// 8. ES6 Classes:
// ES6 introduced class syntax for defining objects and their behaviors in a more structured way.


class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log("Hello, my name is " + this.name);
    }
}