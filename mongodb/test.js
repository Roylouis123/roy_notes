const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/students')
.then(() => console.log("connected"))
.catch((err) => console.log(err));


const userSchema = new mongoose.Schema({
    name: String,
    age: Number
},{timestamps: true});

const User = mongoose.model("User", userSchema);

const app = express();

app.get("/", async (req, res) => {
    try {
        const user = await User.create({
            name: "John",
            age: 20
        });
        console.log(user);
        res.status(201).send("User added");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding user");
    }
});

app.get("/finduser", async (req, res) => {
    try {
        const user = await User.find({
            name: "John"});
        console.log(user);
        res.status(201).send("User added");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding user");
    }
});

app.listen(3000);

