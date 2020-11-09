const express = require('express');
const app = express();
const server = require('http').createServer(app);
const stock = require('./stock');

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

const port = 1343;
//io.origins(['https://traders-galore.asatirsen.me:443 https://traders-galore.asatirsen.me https://traders-galore.asatirsen.me:* 46.101.140.183:*']);
io.origins(['localhost:3000']);



let grannySmith = {
  name: "Granny Smith",
  rate: 1.00001,
  variance: 0.15,
  startingPoint: 20,
};



io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

setInterval(function () {
  grannySmith["startingPoint"] = stock.getStockPrice(grannySmith);
  console.log( grannySmith["startingPoint"])
  io.emit("stocks", {
    time: new Date().toLocaleTimeString(),
    value: grannySmith["startingPoint"]
  });
  console.log(grannySmith)
}, 30000);



// Startup server
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

module.exports = server;
