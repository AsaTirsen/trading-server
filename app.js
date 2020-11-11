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

let connections = [];
let currentPrice = null;

setInterval(function () {
    grannySmith.startingPoint = stock.getStockPrice(grannySmith);
    currentPrice = {
        time: new Date().toLocaleTimeString(),
        value: grannySmith.startingPoint
    }
    connections.forEach((c) => {
        c.send(JSON.stringify(currentPrice));
    })
}, 10000);

wsServer.on('request', function (request) {
    console.log("user connected");

    const connection = request.accept(null, request.origin);

    // Immediately send the current price
    if (currentPrice) {
        connection.send(JSON.stringify(currentPrice));
    }

    connections.push(connection);

    // user disconnected
    connection.on('close', function () {
        connections = connections.filter((c) => c !== connection);
        console.log("user disconnected");
    });
});


// Startup server
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

module.exports = server;
