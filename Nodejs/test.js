const cluster = require("cluster")

const os = require("os");
const express = require("express");

const totalCpu = os.cpus().length;

if (cluster.isPrimary) {
    for (let i = 0; i < totalCpu; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const port = 3000
    app.get("/", (req, res) => {
        res.send(`Hello, World!${process.pid}`);
    });
    app.listen(port, () => {
        console.log("Server is running on port 3000");
    });
}