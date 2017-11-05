Chatty App
=====================

Chatty App allow users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.   

Week5 day1- day5 at lighthouse labs.

### Functional information:

* Primarily a client-side SPA (single-page app) built with ReactJS.  

   * Styles Based on HTML and CSS.  
   * Contains a chat log displaying messages and notifications. 
   * Contains an input field to change your name and an input field to send a message. 
  
* The client-side app communicates with a server via WebSockets for multi-user real-time updates. 
* No persistent database is involved; the focus is on the client-side experience

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

###  Start
To start Chatty App, clone or download this repository,
install the dependencies for Webpack, Websocket and start the server.

In the main folder:  

```
npm install
npm start
open http://localhost:3000
```

In chatty_server folder:

```
npm install
npm start
open http://localhost:3001
```

### Dependencies
Webpack:  

* babel-core
* [babel-loader](https://github.com/babel/babel-loader)
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* react
* react-dom
* webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

Websocket:  

* express
* ws
* uuid
