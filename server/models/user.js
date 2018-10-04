const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Schema is what we use when we tell mongoose about the fields that a particular model is going to have

// Define the modal
const userSchema = new Schema({
  email: { type: String, unique: true, lowecase: true },
  password: String
});

// Mongoose before saving the record to the database will first verify if the email is unique also taking into account lowercase, as without this declaration it would allow capitalcase to be different from lowercase

// On Save hook, encrypt password
// Before saving a model, run this function
userSchema.pre("save", function(next) {
  const user = this;
  // The context is the user model


  // Generate a salt, what takes some amount of time, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // Encrypt the password using the salt, what also takes some amount of time
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err) }

      // Overwrite plain text password with encrypted password
      user.password = hash;

      // This basically means: go ahead and save the model
      next();
    });
  });

  // When saving a password, we generate a salt (a randomly generator string of characters). By combining it with the plain password, we get the encrypted password.
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model("user", userSchema);
// This loads the schema to mongoose and the schema corresponds to the "user" entry in DB.

// Export the model
module.exports = ModelClass;