// ------------------------------------Objects --------------------------------

// Creating Objects
// Object Literals

let person = {
  name: "John",
  age: 30,
  isEmployed: true
};
console.log(person); // Output: { name: 'John', age: 30, isEmployed: true }



// Using new Object()

let person = new Object(); // or {}
person.name = "John";
person.age = 30;
person.isEmployed = true;
console.log(person); // Output: { name: 'John', age: 30, isEmployed: true }


// Using a Constructor Function

function Person(name, age, isEmployed) {
  this.name = name;
  this.age = age;
  this.isEmployed = isEmployed;
}
let john = new Person("John", 30, true);
console.log(john); // Output: Person { name: 'John', age: 30, isEmployed: true }


// Using Object.create()

let proto = {
  greet() {
    console.log("Hello!");
  }
};
let person = Object.create(proto);
person.name = "John";
console.log(person); // Output: { name: 'John' }
person.greet(); // Output: Hello!


// Accessing Object Properties
// Dot Notation

console.log(person.name); // Output: John

// Bracket Notation

console.log(person["age"]); // Output: 30

// Modifying Object Properties
// Adding Properties

person.gender = "male";
console.log(person); // Output: { name: 'John', age: 30, isEmployed: true, gender: 'male' }


// Updating Properties

person.age = 31;
console.log(person.age); // Output: 31


// Deleting Properties

delete person.isEmployed;
console.log(person); // Output: { name: 'John', age: 31, gender: 'male' }


// Methods in Objects
// A method is a function stored as a property in an object.


let person = {
  name: "John",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};
person.greet(); // Output: Hello, my name is John


// this Keyword
// Refers to the object from which it was called.
// In global scope, this refers to the global object (window in browsers).
// Iterating over Object Properties



for...in Loop

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output:
// name: John
// age: 31
// gender: male


// Object.keys()

let keys = Object.keys(person);
console.log(keys); // Output: ['name', 'age', 'gender']


// Object.values()

let values = Object.values(person);
console.log(values); // Output: ['John', 31, 'male']
Object.entries()


let entries = Object.entries(person);
console.log(entries); // Output: [['name', 'John'], ['age', 31], ['gender', 'male']]


// Cloning and Merging Objects
// Shallow Clone

let clone = Object.assign({}, person);
console.log(clone); // Output: { name: 'John', age: 31, gender: 'male' }


// Deep Clone

let deepClone = JSON.parse(JSON.stringify(person));
console.log(deepClone); // Output: { name: 'John', age: 31, gender: 'male' }


// Merging Objects

let obj1 = {a: 1, b: 2};
let obj2 = {b: 3, c: 4};
let merged = Object.assign({}, obj1, obj2); // Output: {a: 1, b: 3, c: 4}
console.log(merged);


// Using Spread Operator

let clone = {...person};
let merged = {...obj1, ...obj2};
console.log(clone); // Output: { name: 'John', age: 31, gender: 'male' }
console.log(merged); // Output: {a: 1, b: 3, c: 4}


// Object Destructuring
// Extracting properties into variables.

let {name, age} = person;
console.log(name, age); // Output: John 31


Object Property Shorthand
If variable names match property names, you can use shorthand notation.


let name = "John";
let age = 30;
let person = {name, age}; // Equivalent to {name: name, age: age}
console.log(person); // Output: { name: 'John', age: 30 }


// Computed Property Names
// You can use expressions in brackets to create dynamic property names.


let prop = "name";
let person = {
  [prop]: "John"
};
console.log(person.name); // Output: John