//------------------------------useMemo--------------------------------

// The useMemo hook in React is used for memoization. 

//  It memoizes the result of a function so that it can be reused
//  In dependence the state value will be provided, it returns the cached result instead of recalculating it.
//  If the state value is changed then the function will call.
//  This can help optimize performance by preventing unnecessary re-renders or recalculations. 

import React, { useState, useMemo } from 'react';

const ExpensiveComponent = ({ count }) => {
  const expensiveFunction = (count) => {
    console.log("Calculating...");
    let result = 0;
    for (let i = 0; i < count; i++) {
      result += i;
    }
    return result;
  };

  // Memoize the result of the expensive function based on the 'count' prop
  const memoizedResult = useMemo(() => expensiveFunction(count), [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Result: {memoizedResult}</p>
    </div>
  );
};

const App = () => {
  const [count, setCount] = useState(5);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ExpensiveComponent count={count} />
    </div>
  );
};

export default App;






//------------------------------------useCallback--------------------------------
// The useCallback hook in React is similar to useMemo
//  but it memoizes functions instead of values.
//   It returns a memoized callback function.
//    This can be useful when passing callbacks to child components that rely on reference equality
//     to prevent unnecessary re-renders.



import React, { useState, useCallback } from 'react';

const ChildComponent = ({ handleClick }) => {
  return <button onClick={handleClick}>Click me</button>;
};

const App = () => {
  const [count, setCount] = useState(0);

  // Define a callback function that increments count
  const increment = () => {
    setCount(count + 1);
  };

  // Memoize the callback function using useCallback
  const memoizedIncrement = useCallback(increment, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent handleClick={memoizedIncrement} />
    </div>
  );
};

export default App;



// Without useCallback:

const increment = () => {
    setCount(count + 1);
  };

  // Memoize the callback function using useCallback
  const memoizedIncrement = useCallback(increment, [count]);

// In the first example, the increment function is created every time ParentComponent renders, even if count hasn't 
// changed. This can lead to unnecessary re-renders of ChildComponent.



// With useCallback:
const increment = () => {
    setCount(count + 1);
  };

  // Memoize the callback function using useCallback
  const memoizedIncrement = increment;

// In the second example, we wrap the increment function with useCallback and pass [count]
//  as a dependency array. Now, increment is only recreated when count changes, preventing unnecessary re-renders of ChildComponent.