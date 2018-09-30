const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
// We create an instance of express which is app

// App setup



// Server setup

const port = process.env.PORT || 3090;
// If there is environnment variable of PORT defined, use that, otherwise use 3090

const server = http.createServer(app);
// http is a library of Node. It creates a http server that knows how to receive a request and anything that comes in, forward it on to our express application.

server.listen(port);
console.log("Server listening on ", port)