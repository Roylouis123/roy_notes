const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log("Root route hit");
    console.log(req.query); // Try visiting: http://localhost:3000/?id=11
    res.send("Root route");
});

app.get('/user/:id', (req, res) => {
    console.log(req.params); // Try visiting: http://localhost:3000/user/11
    res.send(`User ID from params: ${req.params.id}`);
});

app.listen(port, () => {
    console.log("Server is listening");
});
