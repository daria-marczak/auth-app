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
userSchema.pre("save", function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err) }
      user.password = hash;
      next();
    });
  });
});



// Create the model class
const ModelClass = mongoose.model("user", userSchema);
// This loads the schema to mongoose and the schema corresponds to the "user" entry in DB.

// Export the model
module.exports = ModelClass;