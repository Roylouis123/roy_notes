import http from 'http';

const server = http.createServer((req, res) => {

    res.writeHead(200,{"content-type":"text/plain"})
    res.end("Hello roy.....")

})

server.listen(9000,()=>{
    console.log("You server is running...")
})