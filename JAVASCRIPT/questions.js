
//----------------------------Event Loop --------------------------------

// The Event Loop in JavaScript is a fundamental concept that helps us understand how asynchronous operations are handled in single-threaded environments like JavaScript's runtime environment. Although explaining the Event Loop in detail goes beyond the scope of a brief answer, I'll provide a high-level overview with an example to illustrate the core concepts.
// The Event Loop consists of three main components:
// Call Stack: This stack holds the currently executing function calls. When a function invokes another function, the latter becomes part of the stack.
// Event Queue (Task Queue): This queue contains tasks that were scheduled outside the regular flow of execution. Tasks in the queue are executed whenever the Call Stack is empty.
// Microtasks Queue: Microtasks are short tasks that are executed immediately after the current macrotask finishes running. Macrotasks include things like timers, I/O operations, and UI rendering.
// Now, let's look at an example:

console.log('Start');

setTimeout(() => {
  console.log('Set Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise Resolved');
});

console.log('End');

// Output:
// Start
// End
// Promise Resolved
// Set Timeout


//---------------------------Curring-----------------------

// Currying in JavaScript is a technique where a function with multiple arguments is transformed into a sequence of nested functions, each taking a single argument. This allows you to partially apply arguments to a function and create new functions with specific behavior. Currying helps in creating more reusable and flexible functions.
// Here's an example of currying in JavaScript:
// javascript
// Non-curried function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // Outputs: 6

// Curried version of the add function
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // Outputs: 6

// Using currying for partial application
const addTwo = curriedAdd(2);
const addThree = addTwo(3);

console.log(addThree(4)); // Outputs: 9


//---------------------------Generators------------------------

// A generator in JavaScript is a special kind of function that yields control 
// to the caller periodically during its execution. Unlike normal functions, generator
//  functions use the function* syntax and employ the yield keyword to pause execution 
//  and pass values back to the caller. Generators are particularly helpful when dealing with 
//  long-running computations or asynchronous operations, allowing you to break down complex algorithms into smaller steps.

 function* myGenerator() {
    yield 1;
    yield 2;
    yield 3;
  }

  const gen = myGenerator();
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // 3
  console.log(gen.next().value); // undefined
