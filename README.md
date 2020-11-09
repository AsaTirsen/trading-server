## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:1343](http://localhost:1343) to view it in the browser.
.

### `dependencies`
    
To install dependencies:

npm install express --save
npm install socket.io

### `Technical choices`
Node.js Express was used as a server to integrate with socket.io.
Socket.io was chosen as websocket as it is a wrapper for websocket and provides opportunities to use more features if the functionality were to be further developed, such as broadcasting to multiple sockets, storing data associated with each client, and asynchronous I/O.

