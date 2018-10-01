const User = require("../models/user");

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
      res.json({ success: true });
    });

    // This saves it to the database


  });
};