const express = require('express');

const app = express();
const path = require('path');


// ---------------------------Middleware -----------------------------------------

const requestFilter=(req, res,next)=>{
    if(!req.query.age){
        res.send('Enter age: ');
    }else if(req.query.age < 18){
        res.send("Sorry you are not allowed");
    }else if(req.query.age > 18){
        next()
    }
    
}


app.use(requestFilter)


//-------- also we can keep routes in different file and use like example below

const Middleware=require('./middleware')
const route= express.route()
route.use(middleware)

route.get('/home', (req, res) => {
    res.send('Hello, World!');
});


//--------- or

app.get('/home',requestFilter, (req, res) => {
    res.send('Hello, World!');
});


// ---------------------------Run api end ponts-------------------------------------

// localhost/3000
app.get('/home', (req, res) => {
    res.send('Hello, World!');
});


// localhost/3000/?name=royservice
app.get('/about', (req, res) => {

    console.log(req.query.name)  // royservice
    res.send('About Page');
});



// localhost/3000/hyubub

app.get('*', (req, res) => {
    res.sendFile(__dirname, 'public/pagenotfound.html');
});



//--------------------------- To run html file------------------------------

const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));





app.listen(3000, () => {
    console.log('Server is running on port 3000');
});