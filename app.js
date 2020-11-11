const express = require('express');
const http = require("http");
const app = express();
const webSocketServer = require('websocket').server;
const server = http.createServer(app);
const wsServer = new webSocketServer({
    httpServer: server
});
const port = 1343;
const stock = require('./stock');


// Answer on all http requests
app.use(function (req, res) {
    res.send({msg: "hello"});
});

let grannySmith = {
    name: "Granny Smith",
    rate: 1.00001,
    variance: 0.05,
    startingPoint: 10,
};



wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
    })

    setInterval(function () {
        grannySmith["startingPoint"] = stock.getStockPrice(grannySmith);
        let stocks = {
            time: new Date().toLocaleTimeString(),
            value: grannySmith["startingPoint"]
        }
        console.log(grannySmith["startingPoint"])
        connection.send(JSON.stringify(stocks));
        console.log(grannySmith)
    }, 50000);

    console.log("user connected");
    // user disconnected
    connection.on('close', function () {
        console.log("user disconnected");
    });
});


// Startup server
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

module.exports = server;
