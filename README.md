## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:1343](http://localhost:1343) to view it in the browser.
.

### `dependencies`
    
To install dependencies:

npm install express --save
npm install websocket

### `Technical choices`
Node.js Express was used as a server to integrate with websocket.
One version of teh websocket was built with cosket.io and another with websocket. As this project only required a very simple websocket, the latter was
chosen in order to avoid problems with the nginx server. WebSocket's advantages are that it is a Web standard, it is very 
lightweight because it is natively supported by some browsers. 
Socket.IO supports more browsers and has more functionality, but also comes with some overhead. 
There were issues in implementing the socket.io server with nginx at this
stage, so until that is resolved the websocket version works fine.
