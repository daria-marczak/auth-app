module.exports = function(app) {
  app.get("/", function(req, res, next) {
    res.send(["waterbottle", "phone", "paper"]);
  });
}

// get maps exactly to HTTP request
// req is basically the request, res is response and next is mostly for error handling