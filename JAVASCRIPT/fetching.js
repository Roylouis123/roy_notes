
// -----------------------Synchronous
// It means code runs in a particular sequuence of instruction 
// and waits for it to exceute so that to move next step.


// -----------------------Asynchronous
// Due to some delay in the exceution it exceute the next instruction
// and later if first one is executed.






// ---------------------------------promise in js-------------------------------------

// A promise in Javascript is an object which represent the eventual completion or failure of an asynchronous operation.

// A promise can have 3 states which are the following:

// Pending: This is the initial state of the promise, the promise is now waiting for either to be resolved or rejected. For example, when are reaching out to the web with an AJAX request and wrapping the request in a promise. Then the promise will be pending in the time window in which the request is not returned.
// Fulfilled: When the operation is completed succesfully, the promise is fulfilled. For example, when we are reaching out to be web using AJAX for some JSON data and wrapping it in a promise. When we are succesfully getting data back the promise is said to be fulfilled.
// Rejected: When the operation has failed, the promise is rejected. For example, when we are reaching out to be web using AJAX for some JSON data and wrapping it in a promise. When we are getting a 404 error the promise has been rejected.

const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: 'John', age: 30 };
        resolve(data);
      }, 2000);
    });
  };
  
  fetchData()
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });



// -----------------------------Async await ---------------------------------

const AsyncAait = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { name: 'John', age: 30 };
        resolve(data);
      }, 2000);
    });
  };
  
  const getData = async () => {
    try {
      const data = await AsyncAait();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  getData();


  