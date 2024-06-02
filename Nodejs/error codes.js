//================================= 4xx Client Errors:================================

// 400 Bad Request

// Use: The server cannot process the request due to client error (e.g., malformed request syntax).


app.post('/data', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Bad Request: Name is required');
    } else {
        res.send('Data received');
    }
});


// 401 Unauthorized

// Use: The client must authenticate itself to get the requested response.


app.get('/protected', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized: Authentication is required');
    } else {
        res.send('Protected content');
    }
});


// 403 Forbidden

// Use: The client does not have access rights to the content.


app.get('/admin', (req, res) => {
    if (!req.user.isAdmin) {
        res.status(403).send('Forbidden: Access denied');
    } else {
        res.send('Admin content');
    }
});


// 404 Not Found


// Use: The server cannot find the requested resource.


app.get('/user/:id', (req, res) => {
    const user = getUserById(req.params.id);
    if (!user) {
        res.status(404).send('Not Found: User does not exist');
    } else {
        res.send(user);
    }
});


// 405 Method Not Allowed

// Use: The request method is known by the server but has been disabled and cannot be used.


app.post('/users', (req, res) => {
    res.send('Creating user');
});
app.all('/users', (req, res) => {
    res.status(405).send('Method Not Allowed: Use POST to create a user');
});


// 409 Conflict

// Use: The request could not be processed because of conflict in the current state of the resource.


app.post('/users', (req, res) => {
    if (isUserExists(req.body.username)) {
        res.status(409).send('Conflict: Username already exists');
    } else {
        createUser(req.body);
        res.send('User created');
    }
});




//===================================5xx Server Errors:================================


// 500 Internal Server Error

// Use: A generic error message when the server encounters an unexpected condition.


app.get('/error', (req, res) => {
    try {
        // Some code that throws an error
        throw new Error('Something went wrong');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});



// 501 Not Implemented

// Use: The server does not support the functionality required to fulfill the request.


app.post('/legacy', (req, res) => {
    res.status(501).send('Not Implemented: This operation is not supported');
});


// 502 Bad Gateway

// Use: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.


app.get('/proxy', (req, res) => {
    // Simulating a bad response from upstream server
    res.status(502).send('Bad Gateway: Invalid response from upstream server');
});



// 503 Service Unavailable


// Use: The server is not ready to handle the request (e.g., it is down for maintenance or overloaded).


app.get('/maintenance', (req, res) => {
    res.status(503).send('Service Unavailable: Server is under maintenance');
});



// 504 Gateway Timeout

// Use: The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.


app.get('/proxy-timeout', (req, res) => {
    // Simulating a timeout from upstream server
    res.status(504).send('Gateway Timeout: Upstream server did not respond in time');
});