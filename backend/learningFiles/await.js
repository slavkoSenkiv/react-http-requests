/* 
Async functions in JavaScript provide a way to work with asynchronous code more easily and intuitively. 
Asynchronous code is code that doesn't necessarily execute in a linear fashion from top to bottom. 
Instead, it may involve tasks like fetching data from a server, reading a file from disk, or waiting for a user interaction.

The traditional way of dealing with asynchronous code in JavaScript has been through callbacks, promises, 
and more recently, async/await syntax. Async functions are a part of this async/await syntax, introduced in ECMAScript 2017 (ES8).

Async functions are particularly useful for handling asynchronous code in a more readable and maintainable way, 
especially when dealing with multiple asynchronous operations that need to be executed sequentially or in parallel.*/

async function fetchData() {
  // Simulating fetching data from a server
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve('Data fetched successfully');
      }, 2000);
  });
}


/* 
await keyword blocks not only all the visually dependent statemets executions
(like for const data = await fetchData(); dependent is console.log(data);)
but execution of the whole function, 
so even thout console.log('Data processing complete.'); has nothing to do with "data variable"
it won't be executed immidiately (like it would be the case if data is simple timeout)
*/
async function processData() {
  try {
      console.log('Fetching data...');
      /* 
      Await Keyword: Within an async function, you can use the await keyword before an asynchronous operation. 
      This tells JavaScript to wait for the operation to complete before continuing with the execution of the function. 
      The await keyword can only be used inside async functions. */
      const data = await fetchData();
      console.log(data);
      console.log('Data processing complete.');
  } catch (error) {
      console.error('Error:', error);
  }
}

processData();

/* 
so the console loggin for this code will look the next:
Fetching data...
Promise {<pending>}
VM157:37 Data fetched successfully
VM157:38 Data processing complete.*/

/* 
more on promises
In JavaScript, a Promise is an object representing the eventual completion 
or failure of an asynchronous operation. 
It's a way to handle asynchronous operations more elegantly than traditional callback functions.

A Promise can be in one of three states:

Pending: Initial state, neither fulfilled nor rejected.
Fulfilled: The operation completed successfully.
Rejected: The operation failed.
Promises have two main methods:

then(): Used to handle a successful completion of a promise. 
It takes two optional callback functions as arguments, 
one for fulfillment (onFulfilled) and one for rejection (onRejected).
catch(): Used to handle a failed promise. 
It's a shorthand for handling only the rejection of a promise. */