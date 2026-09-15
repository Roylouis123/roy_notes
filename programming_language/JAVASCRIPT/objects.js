// =============================
// JAVASCRIPT OBJECTS - COMPLETE GUIDE
// =============================

// 1. CREATING OBJECTS
// ==================

// 1.1 Object Literals - The most common way to create objects
const person = {
  name: "John",
  age: 30,
  isEmployed: true,
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};
console.log(person); // { name: 'John', age: 30, isEmployed: true, greet: [Function: greet] }
console.log(person.greet()); // Hello, my name is John

// 1.2 Using the Object Constructor
const customer = new Object();
customer.name = "Sarah";
customer.age = 25;
customer.isActive = true;
console.log(customer); // { name: 'Sarah', age: 25, isActive: true }

// 1.3 Constructor Functions
function User(name, email, isVerified = false) {
  this.name = name;
  this.email = email;
  this.isVerified = isVerified;
  this.login = function() {
    return `${this.name} has logged in`;
  };
}
const user1 = new User("Mike", "mike@example.com");
const user2 = new User("Emma", "emma@example.com", true);
console.log(user1); // User { name: 'Mike', email: 'mike@example.com', isVerified: false, login: [Function] }
console.log(user2.login()); // Emma has logged in

// 1.4 Object.create() Method
const personProto = {
  greet() {
    return `Hello, my name is ${this.name}`;
  },
  introduce() {
    return `I am ${this.age} years old`;
  }
};
const employee = Object.create(personProto);
employee.name = "Alex";
employee.age = 35;
employee.position = "Developer";
console.log(employee.greet()); // Hello, my name is Alex
console.log(employee.introduce()); // I am 35 years old

// 1.5 ES6 Classes (Syntactic sugar over constructor functions)
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  
  getInfo() {
    return `${this.name} costs $${this.price}`;
  }
  
  applyDiscount(percentage) {
    this.price = this.price - (this.price * (percentage / 100));
    return this.price;
  }
}

const laptop = new Product("MacBook Pro", 1299);
console.log(laptop.getInfo()); // MacBook Pro costs $1299
console.log(laptop.applyDiscount(10)); // 1169.1
console.log(laptop.getInfo()); // MacBook Pro costs $1169.1

// 2. ACCESSING AND MODIFYING PROPERTIES
// ===================================

// 2.1 Dot Notation
console.log(person.name); // John
person.age = 31; // Update property
person.occupation = "Developer"; // Add new property
console.log(person.age); // 31
console.log(person); // Object with added occupation property

// 2.2 Bracket Notation - Useful when property names are dynamic or have special characters
console.log(person["name"]); // John

const propertyName = "age";
console.log(person[propertyName]); // 31

// You can use expressions inside brackets
const suffix = "Name";
person["first" + suffix] = "John";
person["last" + suffix] = "Doe";
console.log(person.firstName, person.lastName); // John Doe

// 2.3 Deleting Properties
delete person.isEmployed;
console.log(person.isEmployed); // undefined

// 3. OBJECT METHODS AND 'THIS' KEYWORD
// ==================================

const calculator = {
  read(a, b) {
    this.a = a;
    this.b = b;
  },
  sum() {
    return this.a + this.b;
  },
  multiply() {
    return this.a * this.b;
  },
  // Arrow function - 'this' refers to outer context (not recommended for methods)
  subtract: () => {
    return this.a - this.b; // 'this' doesn't refer to calculator
  }
};

calculator.read(5, 3);
console.log(calculator.sum()); // 8
console.log(calculator.multiply()); // 15
console.log(calculator.subtract()); // NaN - because 'this' is not bound to calculator

// 4. ITERATING THROUGH OBJECTS
// ==========================

const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
  color: "Blue",
  features: ["Bluetooth", "Backup Camera", "Lane Assist"]
};

// 4.1 for...in Loop
console.log("Properties using for...in:");
for (let key in car) {
  console.log(`${key}: ${car[key]}`);
}

// 4.2 Object.keys() - Returns an array of the object's keys
const carKeys = Object.keys(car);
console.log("Keys:", carKeys); // ['brand', 'model', 'year', 'color', 'features']

// 4.3 Object.values() - Returns an array of the object's values
const carValues = Object.values(car);
console.log("Values:", carValues); // ['Toyota', 'Camry', 2022, 'Blue', Array(3)]

// 4.4 Object.entries() - Returns an array of [key, value] pairs
const carEntries = Object.entries(car);
console.log("Entries:", carEntries); // [['brand', 'Toyota'], ['model', 'Camry'], ...]

// 4.5 Iterating using forEach with Object methods
Object.keys(car).forEach(key => {
  console.log(`${key}: ${car[key]}`);
});

// 5. OBJECT PROPERTY FEATURES
// =========================

// 5.1 Property Descriptors - define property behavior
const account = {};

Object.defineProperty(account, 'balance', {
  value: 1000,
  writable: false, // Can't change the value
  enumerable: true, // Shows up in loops
  configurable: false // Can't delete or reconfigure
});

account.balance = 2000; // Won't change because writable: false
console.log(account.balance); // 1000

// Get property descriptor
const balanceDescriptor = Object.getOwnPropertyDescriptor(account, 'balance');
console.log(balanceDescriptor); // { value: 1000, writable: false, enumerable: true, configurable: false }

// 5.2 Getters and Setters
const temperatureObject = {
  _celsius: 0,
  
  get celsius() {
    return this._celsius;
  },
  
  set celsius(value) {
    this._celsius = value;
  },
  
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  },
  
  set fahrenheit(value) {
    this._celsius = (value - 32) * 5/9;
  }
};

temperatureObject.celsius = 25;
console.log(temperatureObject.celsius); // 25
console.log(temperatureObject.fahrenheit); // 77

temperatureObject.fahrenheit = 68;
console.log(temperatureObject.celsius); // 20

// 6. OBJECT OPERATIONS
// ==================

// 6.1 Checking if a property exists
console.log('brand' in car); // true
console.log(car.hasOwnProperty('model')); // true
console.log(car.hasOwnProperty('toString')); // false - toString is inherited

// 6.2 Freezing an object - prevents adding/removing/changing properties
const settings = {
  darkMode: true,
  fontSize: 16
};

Object.freeze(settings);
settings.darkMode = false; // Will be ignored
settings.newSetting = "value"; // Will be ignored
console.log(settings); // { darkMode: true, fontSize: 16 }
console.log(Object.isFrozen(settings)); // true

// 6.3 Sealing an object - prevents adding/removing properties but allows changing existing ones
const config = {
  apiKey: "abc123",
  timeout: 3000
};

Object.seal(config);
config.timeout = 5000; // Works
config.newProp = "value"; // Will be ignored
delete config.apiKey; // Will be ignored
console.log(config); // { apiKey: "abc123", timeout: 5000 }
console.log(Object.isSealed(config)); // true

// 7. OBJECT COPYING & MERGING
// =========================

// 7.1 Shallow Copy with Object.assign()
const original = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, original);
original.a = 10;
original.b.c = 20;
console.log(shallowCopy.a); // 1 - Primitive values are copied
console.log(shallowCopy.b.c); // 20 - Nested objects are referenced

// 7.2 Shallow Copy with Spread Operator
const spreadCopy = { ...original };
console.log(spreadCopy); // { a: 10, b: { c: 20 } }

// 7.3 Deep Copy using JSON (with limitations)
const deepCopy = JSON.parse(JSON.stringify(original));
original.b.c = 30;
console.log(deepCopy.b.c); // 20 - Deep copy, not affected

// 7.4 Merging Objects
const defaultSettings = { theme: "light", fontSize: 12, notifications: true };
const userSettings = { theme: "dark", fontSize: 14 };
const mergedSettings = { ...defaultSettings, ...userSettings };
console.log(mergedSettings); // { theme: "dark", fontSize: 14, notifications: true }

// 8. DESTRUCTURING & REST/SPREAD PROPERTIES
// ======================================

// 8.1 Basic Destructuring
const { brand, model, year } = car;
console.log(brand, model, year); // Toyota Camry 2022

// 8.2 Destructuring with Aliases
const { brand: carBrand, model: carModel } = car;
console.log(carBrand, carModel); // Toyota Camry

// 8.3 Default Values
const { engine = 'V4', brand: make } = car;
console.log(engine, make); // V4 Toyota

// 8.4 Nested Destructuring
const student = {
  name: "John",
  scores: { math: 95, science: 80 }
};
const { name, scores: { math, science } } = student;
console.log(name, math, science); // John 95 80

// 8.5 Rest Operator in Object Destructuring
const { brand: carMake, ...carDetails } = car;
console.log(carMake); // Toyota
console.log(carDetails); // { model: 'Camry', year: 2022, color: 'Blue', features: [...] }

// 9. OBJECT METHODS IN MODERN JAVASCRIPT
// ===================================

// 9.1 Object.fromEntries() - Convert array of entries back to object
const entries = [['name', 'Alice'], ['age', 28]];
const entriesObject = Object.fromEntries(entries);
console.log(entriesObject); // { name: 'Alice', age: 28 }

// 9.2 Object.hasOwn() - Safer property check (ES2022)
console.log(Object.hasOwn(car, 'brand')); // true
console.log(Object.hasOwn(car, 'toString')); // false

// 9.3 Object.is() - Compare two values
console.log(Object.is(0, -0)); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is({}, {})); // false (different references)

// 10. PROTOTYPES AND INHERITANCE
// ===========================

// 10.1 Understanding Prototypes
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function() {
  return "Some generic sound";
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.makeSound = function() {
  return "Woof!";
};

// Add dog-specific method
Dog.prototype.fetch = function() {
  return `${this.name} is fetching`;
};

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.name); // Rex
console.log(rex.makeSound()); // Woof!
console.log(rex.fetch()); // Rex is fetching

// Check inheritance
console.log(rex instanceof Dog); // true
console.log(rex instanceof Animal); // true

// 11. OPTIONAL CHAINING
// ==================

const user = {
  name: "Alice",
  // address isn't defined
};

// Traditional way (prone to errors)
// const city = user.address ? user.address.city : undefined;

// With optional chaining
const city = user.address?.city;
console.log(city); // undefined (no error)

// Optional chaining with method calls
const result = user.getAddress?.(); // Won't throw if method doesn't exist

// 12. NULLISH COALESCING WITH OBJECTS
// ================================

const userDefaults = {
  name: "Guest",
  points: 0,
  isActive: false
};

const userData = {
  name: "Tom"
};

// Get user properties with fallbacks
const userName = userData.name ?? userDefaults.name; // "Tom"
const userPoints = userData.points ?? userDefaults.points; // 0
const userActive = userData.isActive ?? userDefaults.isActive; // false

console.log(userName, userPoints, userActive);

// 13. PRACTICAL EXAMPLES
// ===================

// 13.1 Object as a Configuration
function createWidget(config) {
  const defaultConfig = {
    width: 300,
    height: 200,
    color: "blue",
    border: true
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  // Create widget using finalConfig...
  
  return finalConfig;
}

console.log(createWidget({ width: 500, color: "red" }));
// { width: 500, height: 200, color: "red", border: true }

// 13.2 Object as a Cache/Memoization
function createMemoizedCalculator() {
  const cache = {};
  
  return {
    calculate(a, b) {
      const key = `${a}-${b}`;
      
      if (key in cache) {
        console.log("Retrieved from cache");
        return cache[key];
      }
      
      console.log("Calculated freshly");
      // Simulate expensive calculation
      const result = a * b * Math.random();
      cache[key] = result;
      return result;
    },
    
    clearCache() {
      Object.keys(cache).forEach(key => delete cache[key]);
    },
    
    getCacheSize() {
      return Object.keys(cache).length;
    }
  };
}

const calculator = createMemoizedCalculator();
calculator.calculate(5, 10); // Calculated freshly
calculator.calculate(5, 10); // Retrieved from cache
console.log(calculator.getCacheSize()); // 1