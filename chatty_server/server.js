// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.clients.forEach(function(client) {
    client.send(JSON.stringify({type: "online", content: `${wss.clients.size} user(s) online`}));
  });

  console.log(wss.clients.size);
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    
    switch(message.type) {
      case "postMessage":
        message['id'] = uuidv1();
        message['type'] = "incomingMessage";
        console.log("incoming post message", message);
        console.log(`User ${message.username} said ${message.content}`);
        wss.clients.forEach(function(client) {
          client.send(JSON.stringify(message));
        });
        break;
      case "postNotification":
        message['type'] = "incomingNotification";
        console.log('incoming post notification', message);
        wss.clients.forEach(function(client) {
          client.send(JSON.stringify(message));
        });
        break;
      default:
        throw new Error("unknown event type " + message.type);
    }


  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function(client) {
      client.send(JSON.stringify({type: "online", content: `${wss.clients.size} user(s) online`}));
    });
  });

  
});





// // server.js

// const express = require('express');
// const SocketServer = require('ws').Server;

// // ... other code omitted

// // Create the WebSockets server
// const wss = new SocketServer({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // At this point in time wss.clients is a Set that includes
//   // the ws objects of all clients, including the one who just connected.
//   // Read more about Sets at https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set
//   // Because it is a Set, you cannot use .length on it.

//   ws.on('close', () => {
//     console.log('Client disconnected')

//     // At this point in time wss.clients no longer contains the ws object
//     // of the client who disconnected
//   });
// })
