const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const config = require("../config");

// Some incoming request is going to hit the passport library and if the user is currently logged in, it will go to the route handler

// Passport is more of a echosystem of strategies (methods of authenticating users). Two of them are:
// 1) Verify user with a JWT
// 2) Verify user with a email and password

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user if it is the correct email and password
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false); // User not found
    }

    // Compare passwords - the password is salted and hashed. So we verify the submitted password with salt to see if they are the same
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err)
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Set up options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"), // Whenever a request comes in, look for the authorization header
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // This function is called whenever the user is logging in
  // Payload is decoded JWT token (so sub and issued at)

  // See if the user ID from the payload exists in our database
  // If it does, call "done" with that other
  // Otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false); // We cannot find the user so the second argument is not the user object but false
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }

  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);