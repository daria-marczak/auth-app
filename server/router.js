const passport = require("passport");

const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
// We don't want it to create cookie so the session is false, we're using JWT token

const requireSignin = passport.authenticate("local", { session: false });
// This intercepts request ahead of time

module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signing", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
}

// get maps exactly to HTTP request
// req is basically the request, res is response and next is mostly for error handling