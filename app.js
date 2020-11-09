const express = require('express');
const app = express();
const server = require('http').createServer(app);
const stock = require('./stock');

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

const port = 1343;
io.origins(['https://www.traders-galore.asatirsen.me:443']);


// Answer on all http requests
app.use(function (req, res) {
  res.send({msg: "hello"});
});


//console.log(port);
//
// let pinkLady = {
//   name: "Pink Lady",
//   rate: 1.004,
//   variance: 0.4,
//   startingPoint: 18,
// };

let grannySmith = {
  name: "Granny Smith",
  rate: 1.00001,
  variance: 0.15,
  startingPoint: 20,
};

// let apples = [grannySmith, pinkLady]


io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

setInterval(function () {
  // apples.map((apple) => {
  //   apple["startingPoint"] = stock.getStockPrice(apple);
  //   console.log(apple)
  //   return apple;
  grannySmith["startingPoint"] = stock.getStockPrice(grannySmith);
  console.log( grannySmith["startingPoint"])
  io.emit("stocks", {
    time: new Date().toLocaleTimeString(),
    value: grannySmith["startingPoint"]
  });
  console.log(grannySmith)
}, 10000);



// Startup server
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
