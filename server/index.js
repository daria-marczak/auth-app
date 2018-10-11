const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

// DB setup
mongoose.connect("mongodb://localhost:auth/auth");


const app = express();
// We create an instance of express which is app

// App setup

app.use(morgan("combined"));
// Morgan and bodyParser are middleware in Express. Any incoming request is going to be passed into morgan and bodyParser by default. "app.use" specifies the middleware to be used. Morgan is a logging framework. Its logging that there was a GET request and so on. Mostly for debugging.

app.use(cors());

app.use(bodyParser.json({ type: "*/*" }));
// It parses incoming request into JSON. It will attempt to do so no matter what its type is.
router(app);


// Server setup

const port = process.env.PORT || 3090;
// If there is environnment variable of PORT defined, use that, otherwise use 3090

const server = http.createServer(app);
// http is a library of Node. It creates a http server that knows how to receive a request and anything that comes in, forward it on to our express application.

server.listen(port);
console.log("Server listening on ", port)