const Authentication = require("./controllers/authentication");

module.exports = function(app) {
  app.post("/signup", Authentication.signup);
}

// get maps exactly to HTTP request
// req is basically the request, res is response and next is mostly for error handling