const User = require("../models/user");
const jwt = require("jwt-simple");

const config = require("../config");

function tokenForUser(user) {
  const timeStamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
  // First argument is the information that we want to encode, the second argument is the secret that we're going to use to encrypt it.

  // sub - subject. Who is this token about?
  // The subject of this token is this very specific user
  // iat is issued at, another web token specifity
}

exports.signin = function(req, res, next) {
  // User has already had their email and assword auth'd
  // We just need to give them a token
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: "You must provide email and password" })
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err) }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use"});
      // This sets HTTP response which is unprocessable entity
    }

    //If a user with email does not exist, create and save the record

    const user = new User({
      email: email,
      password: password
    });

    // This only creates it, it does not save it

    user.save(function(err) {
      if (err) {
        return next(err);
      }

    // Respond to request, indicating the user was created
      res.json({ token: tokenForUser(user) });

      // We combine user id with a secret string -> this creates a JSON Web Token
      // In the future the user gives us the token, we decrypt it and we have the user id
    });

    // This saves it to the database


  });
};