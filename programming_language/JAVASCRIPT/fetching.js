
// -----------------------Synchronous
// It means code runs in a particular sequuence of instruction 
// and waits for it to exceute so that to move next step.


// -----------------------Asynchronous
// Due to some delay in the exceution it exceute the next instruction
// and later if first one is executed.




//-----------------------------------Fetch Api---------------------------------------


// Fetch API
// The Fetch API is a modern replacement for XMLHttpRequest.
//  It provides a more powerful and flexible feature set for making asynchronous requests, 
//  and it uses Promises, which makes it easier to work with compared to callbacks.

// pros
// Modern API: Cleaner and more readable syntax using Promises.
// Chaining: Easier to chain and handle multiple asynchronous operations.
// Response Handling: Built-in methods for various response types (json(), text(), blob(), etc.).
// Streaming: Support for streaming responses via the Response object.


fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


// Fetch with Authorization Headers:

fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));




// Handling Errors and Status Codes:

fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Fetch error:', error));




// ---------------------------------promise in js-------------------------------------

// A promise in Javascript is an object which represent the eventual completion or failure of an asynchronous operation.

// A promise can have 3 states which are the following:

// Pending: This is the initial state of the promise, the promise is now waiting for either to be resolved or rejected. For example, when are reaching out to the web with an AJAX request and wrapping the request in a promise. Then the promise will be pending in the time window in which the request is not returned.
// Fulfilled: When the operation is completed succesfully, the promise is fulfilled. For example, when we are reaching out to be web using AJAX for some JSON data and wrapping it in a promise. When we are succesfully getting data back the promise is said to be fulfilled.
// Rejected: When the operation has failed, the promise is rejected. For example, when we are reaching out to be web using AJAX for some JSON data and wrapping it in a promise. When we are getting a 404 error the promise has been rejected.


// ======================================Promise.all===================================

// Promise.all takes an iterable of promises (typically an array) and returns a single promise. 
// This promise resolves when all the input promises have resolved, or it rejects as soon as any one of the input promises rejects.

const promise1 = Promise.resolve('First promise');
const promise2 = Promise.resolve('Second promise');
const promise3 = Promise.resolve('Third promise');

Promise.all([promise1, promise2, promise3])
    .then((values) => {
        console.log(values); // ["First promise", "Second promise", "Third promise"]
    })
    .catch((error) => {
        console.error(error);
    });

// Key Points:
// Resolves when all promises resolve.
// Rejects immediately if any promise rejects.
// The result is an array of resolved values in the same order as the input promises.
//=========================================Promise.allSettled==================================

// Promise.allSettled takes an iterable of promises and returns a promise that resolves after 
// all the given promises have either resolved or rejected, with an array of objects that each describe the outcome of each promise.

const promise1 = Promise.resolve('First promise');
const promise2 = Promise.reject('Second promise failed');
const promise3 = Promise.resolve('Third promise');

Promise.allSettled([promise1, promise2, promise3])
    .then((results) => {
        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                console.log(`Fulfilled: ${result.value}`);
            } else {
                console.log(`Rejected: ${result.reason}`);
            }
        });
    });

// Key Points:
// Resolves when all promises have settled (either resolved or rejected).
// Does not short-circuit; it waits for all promises.
// The result is an array of objects with each object indicating the status (fulfilled or rejected) and the value or reason.


// ===========================================Promise.race==========================================
// Promise.race takes an iterable of promises and returns a promise that resolves or rejects as soon as 
// one of the promises in the iterable resolves or rejects.


const promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'First promise'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'Second promise'));

Promise.race([promise1, promise2])
    .then((value) => {
        console.log(value); // "Second promise"
    })
    .catch((error) => {
        console.error(error);
    });
// Key Points:
// Resolves or rejects as soon as any promise resolves or rejects.
// The result is the value or reason of the first settled promise.


// =========================================Promise.any==============================================
// Promise.any takes an iterable of promises and returns a promise that resolves as soon as any 
// one of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill
//  (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of
//  Error that groups together individual errors.


const promise1 = Promise.reject('First promise failed');
const promise2 = Promise.resolve('Second promise');
const promise3 = Promise.reject('Third promise failed');

Promise.any([promise1, promise2, promise3])
    .then((value) => {
        console.log(value); // "Second promise"
    })
    .catch((error) => {
        console.error(error); // AggregateError: All promises were rejected
    });

// Key Points:
// Resolves as soon as any promise fulfills.
// Rejects only if all promises are rejected.
// The result is the value of the first fulfilled promise or an AggregateError if all are rejected.


// Summary
// Promise.all: Waits for all promises to resolve or any to reject; returns an array of results or a single error.
// Promise.allSettled: Waits for all promises to settle (resolve or reject); returns an array of result objects indicating the status and value/reason.
// Promise.race: Resolves or rejects as soon as any promise resolves or rejects; returns the value or reason of the first settled promise.
// Promise.any: Resolves as soon as any promise fulfills; returns the value of the first fulfilled promise or an AggregateError if all promises are rejected.



// -----------------------------Async await ---------------------------------

const AsyncAwait = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: 'John', age: 30 };
        resolve(data);
      }, 2000);
    });
  };
  
  const getData = async () => {
    try {
      const data = await AsyncAwait();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  getData();


  