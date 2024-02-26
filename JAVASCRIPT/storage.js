// ------------------------Cookies------------------------------

// Cookies in JavaScript refer to small text files stored locally on users
//  browsers. These cookies can be set by websites to store information about 
//  user preferences, session management, authentication, etc.


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // 1 day * hours * minutes * seconds * milliseconds
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}`;
  }
  
  // Example usage:
  setCookie("myCookie", "someValue", 7); // Sets myCookie with value someValue expiring in 7 days

//   deleting cookies
function removeCookie(name) {
    setCookie(name, "", -1);
  }
  
  removeCookie("myCookie"); // Removes myCookie cookie







//   --------- ------------------------Sessions---------------------------------

//   Setting session data:
// When a user logs into your app, generate a unique identifier (session ID), save it both in the server's session storage and in localStorage or a cookie on the client side. Then, include the session ID in every subsequent request made by the client.

function loginUser(credentials) {
  // Make a POST request to the server to authenticate the user
  fetch('/login', {
    method: 'post',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(userInfo => {
      if (userInfo && userInfo.success) {
        // Generate a unique session ID
        const sessionId = Math.random().toString(36).substr(2, 9);
        
        // Save the session ID in localStorage or a cookie
        saveSessionId(sessionId);
        
        // Send the session ID with all future requests
        addSessionIdToRequests(sessionId);
      }
    });
}

function saveSessionId(id) {
  localStorage.setItem('session_id', id);
}

function addSessionIdToRequests(id) {
  // Add the session ID to any outgoing requests
  fetchOptions.headers['X-Session-ID'] = id;
}

// Getting session data:
// Retrieve the session ID from localStorage or a cookie and include it in every request sent to the server. On the server side, check the received session ID against the active sessions to determine the associated user.

function getSessionUserId() {
  const sessionId = localStorage.getItem('session_id');
  if (!sessionId) throw Error('No session ID found.');
  
  return fetch('/check-session?session_id=' + encodeURIComponent(sessionId))
    .then(res => res.json())
    .then(userInfo => {
      if (userInfo && userInfo.userId) {
        return userInfo.userId;
      }
      throw Error('Invalid session ID.');
    });
}

// Clearing session data:
// Remove the session ID from localStorage or a cookie and revoke the session on the server side.

function logoutUser() {
  localStorage.removeItem('session_id');
  fetch('/revoke-session', {
    method: 'delete',
    headers: {
      'X-Session-ID': localStorage.getItem('session_id'),
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.ok) {
      window.location.reload();
    }
  });
}




// -------------------------------Local Storage-----------------------

// Local Storage in JavaScript is a mechanism provided by modern browsers to store simple data values persistently on the client-side. You can use local storage to keep track of user preferences, shopping cart items, or even small amounts of application state.
// Here's an example of working with local storage in JavaScript:
// Saving data:
function saveData(key, value) {
  localStorage.setItem(key, value);
}

saveData('theme', 'dark'); // Saves theme preference as dark


function getData(key) {
  return localStorage.getItem(key);
}

const savedTheme = getData('theme'); // Returns 'dark' if available
if (savedTheme !== null) {
  // Use savedTheme here...
}


function updateData(key, newValue) {
  const oldValue = getData(key);
  if (oldValue !== null) {
    localStorage.setItem(key, newValue);
  }
}

updateData('theme', 'light'); // Updates theme preference to light


function removeData(key) {
  localStorage.removeItem(key);
}

removeData('theme'); // Deletes theme preference